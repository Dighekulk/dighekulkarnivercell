const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '../blogs');
const outputFile = path.join(__dirname, '../blogs.json');

// Simple frontmatter parser
function parseFrontmatter(content) {
    const match = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (!match) return null;
    
    const yaml = match[1];
    const metadata = {};
    
    yaml.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            // Handle values that might contain colons (like dates or urls), join safely
            let value = parts.slice(1).join(':').trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            metadata[key] = value;
        }
    });
    
    return metadata;
}

if (!fs.existsSync(blogsDir)) {
    console.log('No blogs directory found.');
    fs.writeFileSync(outputFile, '[]');
    process.exit(0);
}

const files = fs.readdirSync(blogsDir);
const blogs = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
        const content = fs.readFileSync(path.join(blogsDir, file), 'utf-8');
        const metadata = parseFrontmatter(content);
        if (metadata) {
            metadata.slug = file.replace('.md', '');
            return metadata;
        }
        return null;
    })
    .filter(blog => blog !== null)
    // Sort by date descending
    .sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outputFile, JSON.stringify(blogs, null, 2));
console.log(`Generated blogs.json with ${blogs.length} posts.`);
