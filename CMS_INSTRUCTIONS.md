# Blog Management with Sanity

Your website is now powered by **Sanity CMS**. This is a headless CMS, meaning your content lives in Sanity's cloud, and your website fetches it on the fly.

## How to Add or Edit Blogs

### Option 1: Run Locally (Studio)
This is how you have been doing it so far.
1.  Open your terminal in VS Code (in the `studio-dighekulkarni` folder).
2.  Run: `npx sanity start`.
3.  Go to `http://localhost:3333` in your browser.
4.  Add, edit, or delete posts.
5.  Click **Publish**.
    *   **Result:** Changes appear on your live website IMMEDIATELY. You do **not** need to touch the code or deploy anything to Vercel.

### Option 2: Deploy the Studio (Recommended)
You can upload the Studio interface to the web so you can access it from anywhere (like `your-name.sanity.studio`).
1.  Open terminal in `studio-dighekulkarni`.
2.  Run: `npx sanity deploy`.
3.  Follow the prompts to choose a hostname.
4.  Use that URL to manage your content in the future.

## Key Features
- **Live Updates**: Content changes are instant.
- **Rich Text**: Use the editor for bold, bullets, headers, etc.
- **Images**: Upload images directly in the Studio; they are optimized automatically.
- **Reading Time**: You can now manually set "Reading Time" or let it auto-calculate.
