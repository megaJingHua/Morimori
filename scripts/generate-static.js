const fs = require('fs');
const path = require('path');

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const SRC_DIR = path.join(__dirname, '../src');

// Base routes that are always present
const BASE_ROUTES = [
  'Morimori',
  'parenting',
  'games',
  'toolkit',
  'tech',
  'english',
  'member'
];

function extractIdsFromFile(filePath, regex, prefix) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Warning: Source file not found: ${filePath}`);
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const ids = [];
  let match;
  
  // Create a new regex with global flag to find all matches
  const globalRegex = new RegExp(regex, 'g');
  
  while ((match = globalRegex.exec(content)) !== null) {
    if (match[1]) {
      ids.push(`${prefix}/${match[1]}`);
    }
  }
  
  return ids;
}

async function generateStaticStructure() {
  console.log('🏗️  Starting static site generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // 1. Get all routes including dynamic ones from article data
  // Regex updated to be more robust with whitespace: id\s*:\s*...
  const techArticleIds = extractIdsFromFile(
    path.join(SRC_DIR, 'app/data/techArticles.tsx'),
    /id\s*:\s*"([^"]+)"/, // Matches: id: "vue-1" or id : "vue-1"
    'tech'
  );

  const parentingArticleIds = extractIdsFromFile(
    path.join(SRC_DIR, 'app/data/articles.tsx'),
    /id\s*:\s*(\d+)/, // Matches: id: 5 or id : 5
    'parenting'
  );

  const allRoutes = [
    ...BASE_ROUTES,
    ...techArticleIds,
    ...parentingArticleIds
  ];

  console.log(`📊 Found ${allRoutes.length} routes to generate:`);
  console.log(`   - Base routes: ${BASE_ROUTES.length}`);
  console.log(`   - Tech articles: ${techArticleIds.length}`);
  console.log(`   - Parenting articles: ${parentingArticleIds.length}`);

  // 2. Read the main index.html
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  // 3. Process each route
  allRoutes.forEach(route => {
    const routeDir = path.join(DIST_DIR, route);
    
    // Create directory
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Calculate relative path back to root (e.g., "parenting" -> "../")
    // If route is nested "tech/vue-1", it would be "../../"
    const depth = route.split('/').length;
    const relativePrefix = '../'.repeat(depth);

    // Replace asset paths in index.html
    // 1. Replace src="./" with src="../"
    // 2. Replace href="./" with href="../"
    // 3. Replace content="./" with content="../" (for og:image etc)
    // 4. Handle assets/ prefix if vite base is './'
    
    let routeHtml = indexHtml
      .replace(/src="\.\//g, `src="${relativePrefix}`)
      .replace(/href="\.\//g, `href="${relativePrefix}`)
      .replace(/content="\.\//g, `content="${relativePrefix}`)
      .replace(/src="assets\//g, `src="${relativePrefix}assets/`)
      .replace(/href="assets\//g, `href="${relativePrefix}assets/`);

    // Write the file
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
    // console.log(`✅ Generated: /${route}/index.html`); // Commented out to reduce noise
  });

  console.log('🎉 Static site structure generated successfully!');
}

generateStaticStructure();
