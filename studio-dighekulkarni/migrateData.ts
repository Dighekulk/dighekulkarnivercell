import { createClient } from '@sanity/client'
import { basename, join } from 'path'
import { readFileSync, existsSync } from 'fs'

// Initialize the client
const client = createClient({
    projectId: 'y712d3ne',
    dataset: 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_TOKEN
})

// Path setup
const rootDir = join(__dirname, '..')
const blogsJsonPath = join(rootDir, 'blogs.json')
const blogsDir = join(rootDir, 'blogs')
const imagesDir = join(rootDir)

async function uploadImage(imagePath: string) {
    try {
        if (!existsSync(imagePath)) {
            console.warn(`Image not found: ${imagePath}`)
            return null
        }
        const buffer = readFileSync(imagePath)
        const asset = await client.assets.upload('image', buffer, {
            filename: basename(imagePath)
        })
        return asset
    } catch (error) {
        console.error('Image upload failed:', error)
        return null
    }
}

function parseBody(markdown: string) {
    // Robust frontmatter removal handling various line endings
    // Matches --- at start, content, ---, and following newlines
    const contentMap = markdown.replace(/^---[\r\n]+[\s\S]*?[\r\n]+---[\r\n]+/, '')

    const blocks = []
    const lines = contentMap.split(/\r?\n/)

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()

        if (!line) continue

        // Header
        if (line.startsWith('### ')) {
            blocks.push({
                _type: 'block',
                style: 'h3',
                children: [{ _type: 'span', text: line.replace('### ', '') }]
            })
        }
        // Bullet list
        else if (line.startsWith('* ')) {
            blocks.push({
                _type: 'block',
                style: 'normal',
                listItem: 'bullet',
                children: [{ _type: 'span', text: line.replace('* ', '') }]
            })
        }
        else {
            // Check for bold parts
            const children = []
            const parts = line.split(/(\*\*.*?\*\*)/g)

            parts.forEach(part => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    children.push({
                        _type: 'span',
                        text: part.slice(2, -2),
                        marks: ['strong']
                    })
                } else if (part) {
                    children.push({
                        _type: 'span',
                        text: part
                    })
                }
            })

            blocks.push({
                _type: 'block',
                style: 'normal',
                children: children.length ? children : [{ _type: 'span', text: line }]
            })
        }
    }
    return blocks
}

async function migrate() {
    if (!existsSync(blogsJsonPath)) {
        console.error('blogs.json not found')
        return
    }

    // 1. DELETE EXISTING DATA to avoid duplicates and fix bad data
    console.log('Deleting existing posts...')
    try {
        await client.delete({ query: '*[_type == "post"]' })
        console.log('Deleted all existing posts.')
    } catch (err) {
        console.warn('Failed to delete existing posts (might be empty or permissions issue):', err)
    }

    // 2. MIGRATE NEW DATA
    const blogs = JSON.parse(readFileSync(blogsJsonPath, 'utf8'))

    for (const blog of blogs) {
        console.log(`Migrating: ${blog.title}`)

        // Read markdown file
        const mdPath = join(blogsDir, `${blog.slug}.md`)

        if (!existsSync(mdPath)) {
            console.warn(`Markdown file not found for slug: ${blog.slug}`)
            continue
        }

        const markdown = readFileSync(mdPath, 'utf8')
        const bodyBlocks = parseBody(markdown)

        // Upload image
        const imagePath = join(imagesDir, blog.image)
        const imageAsset = await uploadImage(imagePath)

        const doc = {
            _type: 'post',
            title: blog.title,
            slug: {
                _type: 'slug',
                current: blog.slug
            },
            publishedAt: new Date(blog.date).toISOString(),
            excerpt: blog.excerpt,
            mainImage: imageAsset ? {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: imageAsset._id
                },
                alt: blog.title
            } : undefined,
            body: bodyBlocks
        }

        try {
            const result = await client.create(doc)
            console.log(`Created document ${result._id}`)
        } catch (err) {
            console.error(`Failed to create document for ${blog.title}:`, err)
        }
    }
}

migrate()
