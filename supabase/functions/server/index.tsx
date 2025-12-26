import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.47.10";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Access-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper for creating Supabase client
const getSupabase = (key: string) => {
  return createClient(
    Deno.env.get('SUPABASE_URL') || '',
    key,
    { auth: { persistSession: false } }
  );
};

// Helper to extract access token from headers (supports Bearer or X-Access-Token)
const getAccessToken = (c: any) => {
    const authHeader = c.req.header('Authorization');
    const customHeader = c.req.header('X-Access-Token');
    
    // If Custom Header is present, use it (it contains the USER token)
    // If not, try to extract from Authorization header (but this might be Anon Key if sent by frontend to bypass gateway)
    if (customHeader) return customHeader;
    
    // Fallback: Check if Authorization is a Bearer token
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // If the token matches the Anon Key, and no Custom Header was provided, then we effectively have NO user token.
        // But we can't easily check against Anon Key env var here without reading it.
        // Let's just return it and let getUser fail if it's an anon key.
        return token;
    }
    return null;
}

// Health check endpoint
app.get("/make-server-92f3175c/health", (c) => {
  return c.json({ status: "ok" });
});

// Visitor Count Endpoint
app.get("/make-server-92f3175c/visit-count", async (c) => {
  const key = "visit_count";
  try {
    const currentCountStr = await kv.get(key);
    let count = currentCountStr ? parseInt(currentCountStr) : 0;
    count++;
    await kv.set(key, count.toString());
    return c.json({ count });
  } catch (error) {
    console.error("Error updating visit count:", error);
    return c.json({ error: "Failed to update visit count" }, 500);
  }
});

// Get all article counts
app.get("/make-server-92f3175c/articles/counts", async (c) => {
  try {
    const values = await kv.getByPrefix("article_count_");
    const counts: Record<string, number> = {};
    for (const val of values) {
      if (val && typeof val === 'object' && val.id) {
        counts[val.id] = parseInt(val.count || "0");
      }
    }
    return c.json({ counts });
  } catch (error) {
    console.error("Error fetching article counts:", error);
    return c.json({ error: "Failed to fetch counts" }, 500);
  }
});

// Increment article count
app.post("/make-server-92f3175c/articles/:id/view", async (c) => {
  const id = c.req.param("id");
  const key = `article_count_${id}`;
  try {
    const currentVal = await kv.get(key);
    let count = 0;
    
    if (currentVal && typeof currentVal === 'object' && currentVal.count) {
       count = parseInt(currentVal.count);
    } else if (currentVal && (typeof currentVal === 'string' || typeof currentVal === 'number')) {
       count = parseInt(currentVal.toString());
    }

    count++;
    await kv.set(key, { id, count });
    return c.json({ count });
  } catch (error) {
    console.error(`Error incrementing count for article ${id}:`, error);
    return c.json({ error: "Failed to increment count" }, 500);
  }
});

// Signup Route
app.post("/make-server-92f3175c/signup", async (c) => {
  const { email, password, name } = await c.req.json();
  const supabaseAdmin = getSupabase(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '');

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
    email_confirm: true
  });

  if (error) {
    console.error("Signup error:", error);
    return c.json({ error: error.message }, 400);
  }

  return c.json({ data });
});

// Get all article like counts
app.get("/make-server-92f3175c/articles/likes", async (c) => {
  try {
    const values = await kv.getByPrefix("article_like_count_");
    const counts: Record<string, number> = {};
    for (const val of values) {
      if (val && typeof val === 'object' && val.id) {
        counts[val.id] = parseInt(val.count || "0");
      }
    }
    return c.json({ counts });
  } catch (error) {
    console.error("Error fetching article like counts:", error);
    return c.json({ error: "Failed to fetch like counts" }, 500);
  }
});

// Get user likes
app.get("/make-server-92f3175c/articles/user-likes", async (c) => {
  const accessToken = getAccessToken(c);
  if (!accessToken) return c.json({ error: "Unauthorized: Missing token" }, 401);

  const supabase = getSupabase(Deno.env.get('SUPABASE_ANON_KEY') || '');
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
      console.error("Auth error in user-likes:", error);
      return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }

  try {
    const userLikesKey = `user_likes_${user.id}`;
    const userLikesStr = await kv.get(userLikesKey);
    let userLikes = [];
    if (typeof userLikesStr === 'string') {
        try { userLikes = JSON.parse(userLikesStr); } catch { userLikes = [] }
    } else if (Array.isArray(userLikesStr)) {
        userLikes = userLikesStr;
    }
    return c.json({ likes: userLikes });
  } catch (error) {
    console.error("Error fetching user likes:", error);
    return c.json({ error: "Failed to fetch user likes" }, 500);
  }
});

// Toggle Like
app.post("/make-server-92f3175c/articles/:id/like", async (c) => {
  const accessToken = getAccessToken(c);
  if (!accessToken) return c.json({ error: "Unauthorized: Missing token" }, 401);

  const supabase = getSupabase(Deno.env.get('SUPABASE_ANON_KEY') || '');
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
      console.error("Auth error in like:", error);
      return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }

  const articleId = c.req.param("id");
  const userLikesKey = `user_likes_${user.id}`;
  const countKey = `article_like_count_${articleId}`;

  try {
    const userLikesRaw = await kv.get(userLikesKey);
    let userLikes: string[] = [];
    if (typeof userLikesRaw === 'string') {
        try { userLikes = JSON.parse(userLikesRaw); } catch {}
    } else if (Array.isArray(userLikesRaw)) {
        userLikes = userLikesRaw;
    }

    const liked = userLikes.includes(articleId);
    if (liked) {
      userLikes = userLikes.filter((id) => id !== articleId);
    } else {
      userLikes.push(articleId);
    }
    
    await kv.set(userLikesKey, JSON.stringify(userLikes));

    const currentCountVal = await kv.get(countKey);
    let count = 0;
    if (currentCountVal && typeof currentCountVal === 'object' && currentCountVal.count) {
       count = parseInt(currentCountVal.count);
    } else if (currentCountVal && (typeof currentCountVal === 'string' || typeof currentCountVal === 'number')) {
       count = parseInt(currentCountVal.toString());
    }

    if (liked) {
        count = Math.max(0, count - 1);
    } else {
        count++;
    }
    
    await kv.set(countKey, { id: articleId, count });
    return c.json({ liked: !liked, count });
  } catch (error) {
    console.error(`Error toggling like for article ${articleId}:`, error);
    return c.json({ error: "Failed to toggle like" }, 500);
  }
});

// Get all article collection counts
app.get("/make-server-92f3175c/articles/collection-counts", async (c) => {
  try {
    const values = await kv.getByPrefix("article_collection_count_");
    const counts: Record<string, number> = {};
    for (const val of values) {
      if (val && typeof val === 'object' && val.id) {
        counts[val.id] = parseInt(val.count || "0");
      }
    }
    return c.json({ counts });
  } catch (error) {
    console.error("Error fetching article collection counts:", error);
    return c.json({ error: "Failed to fetch collection counts" }, 500);
  }
});

// Get user collections
app.get("/make-server-92f3175c/articles/user-collections", async (c) => {
  const accessToken = getAccessToken(c);
  if (!accessToken) return c.json({ error: "Unauthorized: Missing token" }, 401);

  const supabase = getSupabase(Deno.env.get('SUPABASE_ANON_KEY') || '');
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
      console.error("Auth error in user-collections:", error);
      return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }

  try {
    const userCollectionsKey = `user_collections_${user.id}`;
    const userCollectionsStr = await kv.get(userCollectionsKey);
    let userCollections = [];
    if (typeof userCollectionsStr === 'string') {
        try { userCollections = JSON.parse(userCollectionsStr); } catch { userCollections = [] }
    } else if (Array.isArray(userCollectionsStr)) {
        userCollections = userCollectionsStr;
    }
    return c.json({ collections: userCollections });
  } catch (error) {
    console.error("Error fetching user collections:", error);
    return c.json({ error: "Failed to fetch user collections" }, 500);
  }
});

// Toggle Collection
app.post("/make-server-92f3175c/articles/:id/collect", async (c) => {
  const accessToken = getAccessToken(c);
  if (!accessToken) {
      console.log("Collect error: Missing token");
      return c.json({ error: "Unauthorized: Missing token" }, 401);
  }

  const supabase = getSupabase(Deno.env.get('SUPABASE_ANON_KEY') || '');
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error) {
      console.error("Collect error: getUser failed", error);
      return c.json({ error: `Unauthorized: ${error.message}` }, 401);
  }
  if (!user) {
      console.error("Collect error: No user found");
      return c.json({ error: "Unauthorized: Invalid user" }, 401);
  }

  const articleId = c.req.param("id");
  const userCollectionsKey = `user_collections_${user.id}`;
  const countKey = `article_collection_count_${articleId}`;

  try {
    const userCollectionsRaw = await kv.get(userCollectionsKey);
    let userCollections: string[] = [];
    if (typeof userCollectionsRaw === 'string') {
        try { userCollections = JSON.parse(userCollectionsRaw); } catch {}
    } else if (Array.isArray(userCollectionsRaw)) {
        userCollections = userCollectionsRaw;
    }

    const collected = userCollections.includes(articleId);
    if (collected) {
      userCollections = userCollections.filter((id) => id !== articleId);
    } else {
      userCollections.push(articleId);
    }
    
    await kv.set(userCollectionsKey, JSON.stringify(userCollections));

    const currentCountVal = await kv.get(countKey);
    let count = 0;
    if (currentCountVal && typeof currentCountVal === 'object' && currentCountVal.count) {
       count = parseInt(currentCountVal.count);
    } else if (currentCountVal && (typeof currentCountVal === 'string' || typeof currentCountVal === 'number')) {
       count = parseInt(currentCountVal.toString());
    }

    if (collected) {
        count = Math.max(0, count - 1);
    } else {
        count++;
    }
    
    await kv.set(countKey, { id: articleId, count });
    return c.json({ collected: !collected, count });
  } catch (error) {
    console.error(`Error toggling collection for article ${articleId}:`, error);
    return c.json({ error: "Failed to toggle collection" }, 500);
  }
});

Deno.serve(app.fetch);