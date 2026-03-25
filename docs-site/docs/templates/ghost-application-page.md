---
sidebar_position: 5
---

# Ghost application page (page-ghost-application.hbs)

The **Ghost application** page is a custom page template used as a **reviewer / scout landing page**: capability-to-evidence mapping, doc-backed highlight cards, and links to docs, blog, about, and contact. It uses the slug **ghost-application** (not `ghost`, which is reserved for the Ghost admin).

## Activation

1. In Ghost Admin, create a **Page** (not a post) with the URL slug **ghost-application**.
2. In the page’s template dropdown, select **Ghost application** (or the label that matches `page-ghost-application.hbs`).
3. Publish. The page is available at `yoursite.com/ghost-application/`.

## Structure (section rhythm)

1. **Hero (Cream)** — Title and subtext from theme settings (`ghost_hero_title`, `ghost_hero_subtext`). Optional inline links to docs intro, blog, and about.
2. **Capability matrix (Paper)** — Five rows (partial `ghost-responsibility-row`): heading, proof text, and optional **related documentation** links (`doc_url`, `doc_label`) to specific pages on `docs.mannyroy.com`.
3. **Implementation highlights (Olive)** — Six cards (partial `ghost-highlight-card`): each card has a **title**, **description**, **`doc_href`** (external docs URL; do not use `url` — Ghost resolves that to the current page), and **link_label** for unique link text.
4. **Explore + related posts (Paper)** — Buttons for Documentation, Blog, About, Contact; list of posts tagged **ghost-application** (up to 5). Heading from `ghost_posts_heading`.
5. **CTA (Maroon)** — Single CTA (partial `cta-section`); headline and button from theme settings.

## Theme settings used (group: ghost)

| Key | Type | Default | Purpose |
|-----|------|--------|---------|
| `ghost_hero_title` | text | (see theme) | Hero H1 |
| `ghost_hero_subtext` | text | One sentence | Hero subtext |
| `ghost_cta_headline` | text | — | CTA section headline |
| `ghost_cta_button` | text | — | CTA button label |
| `ghost_posts_heading` | text | — | Heading above tagged posts |

Edit in **Settings → Design → Theme**, group **ghost**. Matrix rows and highlight card copy live in `page-ghost-application.hbs`; partials support optional doc links and `link_label` as above.

## Posts strategy

- Create a tag **Ghost Application** (slug `ghost-application`) in Ghost Admin, or use only the slug for filtering.
- Tag posts you want listed on this page.
- The template uses `{{#get "posts" filter="tag:ghost-application" limit="5"}}`. If none are tagged, the section shows a short message.

## Navigation

Add a nav item (e.g. “Application” or “Portfolio guide”) pointing to `/ghost-application/` in **Settings → Design → Navigation**.
