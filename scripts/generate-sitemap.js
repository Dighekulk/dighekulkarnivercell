const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.dighekulkarni.com';
const BUILD_DATE = new Date().toISOString().split('T')[0];

const staticPages = [
    '',
    'index.html',
    'about.html',
    'organization-design.html',
    'culture-activation.html',
    'people-systems.html',
    'leadership-assessments.html',
    'blogs.html',
    'careers.html',
    'contact.html'
];

const blogsDir = path.join(__dirname, '../blogs');
const outputFile = path.join(__dirname, '../sitemap.xml');

// Function to get blog slugs
function getBlogSlugs() {
    if (!fs.existsSync(blogsDir)) return [];

    return fs.readdirSync(blogsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
}

const blogSlugs = getBlogSlugs();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
staticPages.forEach(page => {
    // Normalize URL: remove index.html for root, keep others
    let url = `${BASE_URL}/${page}`;
    if (page === 'index.html') url = `${BASE_URL}/`;
    if (page === '') url = `${BASE_URL}/`;

    // Deduplicate root
    if (page === 'index.html') return;

    xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
});

// Add blog pages
blogSlugs.forEach(slug => {
    xml += `  <url>
    <loc>${BASE_URL}/blogs/${slug}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

xml += `</urlset>`;

fs.writeFileSync(outputFile, xml);
console.log(`Generated sitemap.xml with ${staticPages.length - 1 + blogSlugs.length} URLs.`);
