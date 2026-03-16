# Blog page not working on production

If the blog page 404s, shows the wrong content, or fails only in production, use this checklist.

## 1. Apply custom routes in production

The theme expects the **blog archive** at `/blog/` and the **homepage** at `/`. That only works if Ghost’s **Routes** are set the same in production as in development.

**Fix:**

1. Log in to **production** Ghost Admin (the live site).
2. Go to **Settings → Labs**.
3. Under **Routes**, download your current routes (backup).
4. Upload or paste the contents of **[routes-blog-archive.yaml](routes-blog-archive.yaml)** from this repo (same file used for local/dev).
5. Save.

After saving, `/blog/` should show the post listing (index) and `/` should show the custom homepage.

**Why it breaks:** If production still has default routes, the front page may be the post index and there is no collection at `/blog/`, so a link to `/blog/` returns 404.

## 2. Check navigation link

In **Settings → Design → Navigation**, ensure you have a link that points to the blog:

- **Label:** e.g. “Blog” or “Writing”.
- **URL:** `/blog/` (trailing slash is fine; Ghost accepts both).

If the link points to `/` or another path, users won’t reach the blog.

## 3. Theme build and upload

The blog uses the same theme as the rest of the site. If the blog is the only page that looks broken (e.g. no styles or scripts):

- Rebuild the theme: from the theme repo run `yarn zip`.
- In production Ghost Admin → **Settings → Design**, upload the new `dist/manny-roy.zip` and activate it.

That ensures `built/screen.css` and `built/main.min.js` are present in the theme package.

## 4. Still not working?

- **404 on `/blog/`** → Routes not applied or reverted (repeat step 1).
- **Blank or partial page** → Check the browser console (F12) for errors; confirm the theme zip was built with `yarn zip` and re-upload.
- **Wrong content on `/blog/`** → Confirm the Routes YAML matches [routes-blog-archive.yaml](routes-blog-archive.yaml) (collection at `/blog/` with template `index`).

For the exact routes format and how they’re applied, see [routes-blog-archive.yaml](routes-blog-archive.yaml) and the comments in that file.
