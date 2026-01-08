import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-92f3175c`;

export interface ArticleStats {
  [articleId: string]: {
    views: number;
    likes?: number;
  };
}

export interface PlayRecord {
  id: string;
  articleId: string;
  quizScore: number;
  completedAt: string;
}

export interface UserData {
  profile: {
    email: string;
    displayName?: string;
    avatarUrl?: string;
    lastLogin: string;
  };
  bookmarks: string[];
  playRecords: PlayRecord[];
}

export interface SystemSettings {
  maxUsers: number;
  maxBookmarksPerUser: number;
}

// Helper to get headers
const getHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  };
  if (token) {
    headers['X-Access-Token'] = token;
  }
  return headers;
};

export const getArticleStats = async (): Promise<ArticleStats> => {
  try {
    const res = await fetch(`${BASE_URL}/articles/counts`, {
      headers: getHeaders(),
    });
    if (!res.ok) return {};
    const data = await res.json();
    // Convert flat counts to structure
    const stats: ArticleStats = {};
    for (const [id, count] of Object.entries(data.counts)) {
      stats[id] = { views: Number(count) };
    }
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
};

export const incrementArticleView = async (articleId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}/view`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error('Error incrementing view:', error);
    return 0;
  }
};

export const getUserData = async (userId: string, token: string): Promise<UserData | null> => {
  // This is a composite fetch because the server stores things separately
  try {
    const [collectionsRes, recordsRes] = await Promise.all([
      fetch(`${BASE_URL}/articles/user-collections`, { headers: getHeaders(token) }),
      fetch(`${BASE_URL}/game/records`, { headers: getHeaders(token) })
    ]);

    const collections = collectionsRes.ok ? (await collectionsRes.json()).collections : [];
    const records = recordsRes.ok ? (await recordsRes.json()).records : [];

    return {
      profile: { email: '', lastLogin: '' }, // Profile is handled by Supabase Auth
      bookmarks: collections,
      playRecords: records
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const toggleBookmark = async (userId: string, articleId: string, token: string): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/articles/${articleId}/collect`, {
      method: 'POST',
      headers: getHeaders(token),
    });
    
    if (!res.ok) {
       const err = await res.json();
       throw new Error(err.error || 'Failed to toggle bookmark');
    }
    
    const data = await res.json();
    return data.collected;
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
};

export const savePlayRecord = async (userId: string, record: any, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/game/record`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(record)
    });
    return res.ok;
  } catch (error) {
    console.error('Error saving record:', error);
    return false;
  }
};

export const getSystemSettings = async (token?: string): Promise<SystemSettings> => {
  try {
    const res = await fetch(`${BASE_URL}/admin/system-settings`, {
      headers: getHeaders(token),
    });
    if (!res.ok) return { maxUsers: 50, maxBookmarksPerUser: 10 };
    return await res.json();
  } catch (error) {
    return { maxUsers: 50, maxBookmarksPerUser: 10 };
  }
};

export const saveSystemSettings = async (settings: SystemSettings, token: string) => {
  await fetch(`${BASE_URL}/admin/system-settings`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(settings)
  });
};

export const getAllUserIds = async (token?: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: getHeaders(token),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.userIds || [];
  } catch {
    return [];
  }
};

export const registerUser = async (userId: string, email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: getHeaders(), // Public endpoint (or auth protected? Index.tsx didn't check auth for register)
      body: JSON.stringify({ userId, email })
    });
    const data = await res.json();
    if (!res.ok) {
        return { success: false, message: data.error || 'Registration failed' };
    }
    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};
