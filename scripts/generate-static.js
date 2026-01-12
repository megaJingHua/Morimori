const fs = require('fs');
const path = require('path');

// Configuration
const DIST_DIR = path.join(__dirname, '../dist');
const ROUTES = [
  'Morimori',
  'parenting',
  'games',
  'toolkit',
  'tech',
  'english',
  'member'
];

async function generateStaticStructure() {
  console.log('🏗️  Starting static site generation...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Read the main index.html
  const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

  // Process each route
  ROUTES.forEach(route => {
    const routeDir = path.join(DIST_DIR, route);
    
    // Create directory
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }

    // Calculate relative path back to root (e.g., "parenting" -> "../")
    // If route is nested "games/matching", it would be "../../"
    const depth = route.split('/').length;
    const relativePrefix = '../'.repeat(depth);

    // Replace asset paths in index.html
    // 1. Replace src="./" with src="../"
    // 2. Replace href="./" with href="../"
    // 3. Replace content="./" with content="../" (for og:image etc)
    
    // Note: We assume vite.config.ts has base: './' so paths start with "./" or just "assets/"
    // If base is "./", vite outputs: <script src="./assets/...">
    
    let routeHtml = indexHtml
      .replace(/src="\.\//g, `src="${relativePrefix}`)
      .replace(/href="\.\//g, `href="${relativePrefix}`)
      .replace(/content="\.\//g, `content="${relativePrefix}`)
      .replace(/src="assets\//g, `src="${relativePrefix}assets/`)
      .replace(/href="assets\//g, `href="${relativePrefix}assets/`);

    // Write the file
    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
    console.log(`✅ Generated: /${route}/index.html`);
  });

  console.log('🎉 Static site structure generated successfully!');
}

generateStaticStructure();
