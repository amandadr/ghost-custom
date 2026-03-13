---
sidebar_position: 5
---

# Ghost application page (page-ghost-application.hbs)

The **Ghost application** page is a custom page template used to present the site as a platform-engineering application: role-to-proof mapping, implementation highlights, and links to docs, blog, and contact. It uses the slug **ghost-application** (not `ghost`, which is reserved for the Ghost admin).

## Activation

1. In Ghost Admin, create a **Page** (not a post) with the URL slug **ghost-application**.
2. In the page’s template dropdown, select **Ghost application** (or the label that matches `page-ghost-application.hbs`).
3. Publish. The page is available at `yoursite.com/ghost-application/`.

## Structure (section rhythm)

1. **Hero (Cream)** — Title and subtext from theme settings (`ghost_hero_title`, `ghost_hero_subtext`).
2. **Responsibility-to-proof matrix (Paper)** — Five rows (partial `ghost-responsibility-row`): heading + proof points. Content is hardcoded in the template (Ghost limits custom settings; matrix text is fixed).
3. **Implementation highlights (Olive)** — Four cards (partial `ghost-highlight-card`): Custom theme & design system, Documentation system, Performance and reliability, AI-assisted delivery. Titles and descriptions are hardcoded.
4. **Explore + related posts (Paper)** — “Explore” links (Documentation, Blog, Contact) and a list of posts tagged **Ghost Application** (up to 5). Heading from `ghost_posts_heading`. To show posts, create a tag **Ghost Application** (slug `ghost-application`) and tag posts in Admin.
5. **CTA (Maroon)** — Single CTA (partial `cta-section`); headline and button from theme settings.

## Theme settings used (group: ghost)

| Key | Type | Default | Purpose |
|-----|------|--------|---------|
| `ghost_hero_title` | text | "Applying to Ghost" | Hero H1 |
| `ghost_hero_subtext` | text | One sentence about the application | Hero subtext |
| `ghost_cta_headline` | text | "Questions or want to connect?" | CTA section headline |
| `ghost_cta_button` | text | "Get in touch" | CTA button label |
| `ghost_posts_heading` | text | "Build logs & technical writing" | Heading above tagged posts |

Edit in **Settings → Design → Theme**, group **ghost**. The matrix rows and highlight cards are not editable via settings; change them in `page-ghost-application.hbs` if needed.

## Posts strategy

- Create a tag **Ghost Application** (slug `ghost-application`) in Ghost Admin.
- Tag any post that supports the application story (build logs, lessons learned, architecture notes).
- The template uses `{{#get "posts" filter="tag:ghost-application" limit="5"}}` to show the latest 5. If none are tagged, the section shows a short message that posts will appear when tagged.

## Navigation

Add a nav item (e.g. “Ghost” or “Application”) pointing to `/ghost-application/` in **Settings → Design → Navigation**. The theme uses `{{navigation}}`; no code change needed once the item is added.
