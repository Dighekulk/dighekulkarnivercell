# CMS and Blog Management Instructions

## 1. Setup

Your website is now configured to use Netlify CMS (Decap CMS) for blog management.
The content is stored in the `blogs/` folder as Markdown files.
The `blogs.html` page dynamically loads these files using `blogs.json`.

### Directories Created
- `admin/`: Contains the CMS entry point (`index.html`) and configuration (`config.yml`).
- `blogs/`: Stores the blog posts as `.md` files.
- `scripts/`: Contains `generate-blog-index.js` to update the blog list.
- `images/uploads/`: Default location for images uploaded via the CMS.

## 2. Managing Blogs (Local or Drag-and-Drop)

Since you are using Netlify Drag-and-Drop (or a static setup without a build server), you must **manually** generate the blog listing index before deploying.

### Steps to Add/Edit a Blog:
1.  **Via CMS** (Once deployed):
    - Go to `your-site.com/admin/`.
    - Login (requires Netlify Identity setup).
    - Create/Edit posts.
    - **Note**: The CMS commits changes to your Git repository. If you are *not* using a connected Git repository with Netlify (i.e., pure drag-and-drop), the CMS **will not work** effectively as it needs a backend API (GitHub/GitLab) to save files.
    - *If you are using drag-and-drop only*: You must edit the `.md` files in `blogs/` directly on your computer.
    - *Recommendation*: Connect your folder to a GitHub repository and link it to Netlify. This enables the full CMS experience.

2.  **Manually (files)**:
    - Create a new file in `blogs/` (e.g., `my-new-post.md`).
    - Copy the format from `blogs/org-design-strategic-lever.md`.

### BEFORE DEPLOYING (Critical):
Every time you add or edit a blog post file locally, you MUST update the `blogs.json` index so the website knows about it.

1.  Open Terminal/PowerShell.
2.  Run: `node scripts/generate-blog-index.js`
3.  Check that `blogs.json` was updated.

## 3. Deployment

**Option A: Git (Recommended)**
- Commit all changes (including `blogs.json`).
- Push to GitHub.
- Netlify auto-deploys.
- *Bonus*: Set Build Command to `node scripts/generate-blog-index.js` in Netlify to auto-generate the index on the server.

**Option B: Drag-and-Drop**
- Run `node scripts/generate-blog-index.js` locally.
- Drag the **entire project folder** to Netlify Drop.

## 4. Netlify Configuration

In your Netlify Dashboard:
1.  **Identity**: Go to **Site Settings > Identity**. Enable Identity.
2.  **Registration**: Allow open registration (or invite only).
3.  **Git Gateway**: Go to **Site Settings > Identity > Services** and enable **Git Gateway** (requires linking a Git repo).

## 5. Clean URLs
We included a `_redirects` file that maps `/blogs/*` to `/blog-details.html`. This ensures your links look like `/blogs/my-post` but load the dynamic template.
