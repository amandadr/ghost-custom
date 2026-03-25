# Plan: Ghost Application / scout landing page

This document defines the content model, posts strategy, and supporting infrastructure for the **scout and reviewer landing page** at `/ghost-application/`, as part of the [site overhaul](site%20overhaul.md) and [opportunities](site-opportunities-improvement.md).

**Note:** The page uses slug **ghost-application** (not `ghost`) because `/ghost/` is reserved for the Ghost admin portal.

---

## 1. Purpose and audience

- **URL:** `/ghost-application/` (one Ghost page with slug `ghost-application`, using template `page-ghost-application.hbs`).
- **Audience:** Recruiters, hiring managers, and technical reviewers (“scouts”) exploring the site to gauge depth of work; also useful for anyone who wants a guided map before reading docs or posts.
- **Goals:** Act as a professional entry point: map capabilities to evidence (theme, docs, performance, AI, ops, communication); link directly to the docs hub, blog, about, and contact; optionally list posts tagged for this page.

---

## 2. Page structure and content

The page is built from **theme custom settings** (Ghost Admin → Settings → Design → Theme) so copy can be updated without editing the template. Structure:

| Section | Purpose | Content source |
|--------|---------|----------------|
| **Hero** | Positioning and one-line value prop | Theme settings: `ghost_hero_title`, `ghost_hero_subtext` |
| **Responsibility-to-proof matrix** | Map each role area to proof points | Hardcoded in template (Ghost theme limit: 20 custom settings total) |
| **Implementation highlights** | 4 standout deliverables (theme, docs, performance, AI) | Hardcoded in template |
| **Related posts** | Build logs, lessons learned, technical writeups | Ghost **posts** with tag `ghost-application` (built-in) |
| **Links** | Docs, Blog, Contact | Hardcoded in template (Documentation, Blog, Contact) |
| **CTA** | Single clear next step | Theme settings: `ghost_cta_headline`, `ghost_cta_button` |

Design rhythm follows existing site: Cream → Paper → Olive → Paper → Maroon (CTA), per [colurs.md](colurs.md) and [sop-design.md](sop-design.md).

---

## 3. Posts strategy (Ghost built-in system)

### 3.1 Tag for “application” content

- **Tag name:** e.g. **Ghost Application** (slug: `ghost-application`).
- **Usage:** Assign this tag in Ghost Admin to any post that supports the application story (build logs, lessons learned, architecture notes, “what I built” writeups).
- **Theme:** The landing page uses `{{#get "posts" filter="tag:ghost-application" limit="5"}}` to show the latest 5 tagged posts. If no tag exists or no posts are tagged, the section is hidden or shows a short “Posts will appear here once published and tagged” message.

**Steps for you:**

1. In Ghost Admin → **Tags**, create a tag: name **Ghost Application**, slug **ghost-application**.
2. When publishing a post that belongs on the application page, add the tag **Ghost Application**.
3. (Optional) Add a tag description for your own reference (e.g. “Posts featured on the Ghost application landing page”).

### 3.2 Optional: secondary tags for categories

- You can add more tags (e.g. **Build log**, **Architecture**, **Performance**) and use them for filtering or future features (e.g. “Build logs” vs “Technical notes”). The landing page can stay simple with a single `ghost-application` tag; secondary tags are for organization only unless we add filtered sections later.

### 3.3 Custom post templates (optional)

- Ghost allows **custom post templates** (e.g. `custom-ghost-build-log.hbs`). If you want a distinct layout for “build log” posts (e.g. date + phase + takeaways), we can add a template and you assign it in the post editor.
- For v1, the default post template is sufficient; custom templates can be added when you have a clear layout need.

---

## 4. Theme settings (custom config)

Ghost limits themes to **20 custom settings total**. The application page uses 5 of them; the rest of the page (matrix, highlights, link labels) is hardcoded in `page-ghost-application.hbs`. Editable under **Settings → Design → Theme**, group **ghost**:

| Key | Purpose |
|-----|--------|
| `ghost_hero_title` | Hero headline (default: “Applying to Ghost”) |
| `ghost_hero_subtext` | Hero subtext (one sentence) |
| `ghost_cta_headline` | CTA section headline |
| `ghost_cta_button` | CTA button label (e.g. “Get in touch”) |
| `ghost_posts_heading` | Heading above related posts (e.g. “Build logs & technical writing”) |

Responsibility matrix (5 rows), implementation highlights (4 cards), and Explore links (Documentation, Blog, Contact) are fixed in the template. To change that copy, edit `page-ghost-application.hbs`.

---

## 5. Supporting infrastructure

### 5.1 Navigation

- **Header/footer:** Add a nav item **Ghost** (or “Application”) pointing to `/ghost-application/` via Ghost Admin → **Settings → Design → Navigation**. The theme uses `{{navigation}}`; no code change required once the item is added.
- **Default nav (optional):** You can document the recommended nav order (e.g. Home, Ghost, Docs, Blog, About, Contact) in this plan or in README so you can replicate after a fresh install.

### 5.2 Docs and blog URLs

- **Docs:** When the docs system exists, the “Documentation” link will point to `/docs/`. Until then, you can leave the label empty or point to a placeholder page.
- **Blog:** Link to the main index (or the slug you use for the blog). Theme uses `{{@site.url}}/` for the blog index.

### 5.3 Template and assets

- **Template:** `page-ghost-application.hbs`.
- **Activation:** In Ghost Admin, create a **Page** (not a post) with title e.g. “Ghost Application” and **URL slug** `ghost-application`. In the page’s settings (right sidebar), open **Template** and select **Ghost application** (or the option that corresponds to `page-ghost-application.hbs`). Save and publish. The page will be available at `yoursite.com/ghost-application/`. (Do not use slug `ghost` — that path is the Ghost admin.)

### 5.4 Tag and empty state

- If the tag `ghost-application` does not exist, `{{#get "posts" filter="tag:ghost-application"}}` returns no posts. The theme shows the “Related posts” section with a short empty-state line: “Posts tagged Ghost Application will appear here.”

---

## 6. Checklist for launch

- [ ] Create Ghost page with slug **ghost-application** and assign template **Ghost application** (`page-ghost-application.hbs`).
- [ ] Create tag **Ghost Application** (slug `ghost-application`).
- [ ] Add **Ghost** (or Application) to header/footer navigation, linking to `/ghost-application/`.
- [ ] Fill in theme settings under **ghost** (hero title/subtext, CTA headline/button, posts heading).
- [ ] Publish at least one post with tag **Ghost Application** (optional but recommended for launch).
- [ ] When docs exist, create `/docs` page and confirm “Documentation” link works.

---

## 7. Related docs

- [Site overhaul](site%20overhaul.md) — goals, scope, responsibility mapping
- [Site opportunities](site-opportunities-improvement.md) — high-impact opportunities
- [Page copy for editor](page-copy-for-editor.md) — how other pages use theme settings
- [colurs.md](colurs.md) — section colors and contrast
- [sop-design.md](sop-design.md) — typography and spacing
