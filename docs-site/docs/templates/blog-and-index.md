---
sidebar_position: 3
---

# Blog and index (index.hbs)

The **blog archive** (e.g. `/` or `/blog/` depending on your routes) uses `index.hbs` to list posts. The **layout** is controlled by `default.hbs`: when the current context is index and not the homepage, it also renders the cover and (optionally) the featured-posts section above the main content.

## What runs when

- **Index route:** Ghost renders `index.hbs` inside `default.hbs`. So the full order is: header → (if index and not home) cover → (if index and not home and `@custom.show_featured_posts`) featured-posts → main content (post feed) → footer.
- **Homepage:** If the site homepage is set to a static page (e.g. Home), then the “index” route (blog) is typically at `/blog/`. Visiting that URL shows cover + featured + feed. Visiting `/` shows `home.hbs` only (no cover/featured).

## index.hbs content

- Main: post feed (loop over `posts`) using partial `loop` for each post card.
- Pagination: `{{pagination}}` (Ghost helper).

No other content blocks; the feed is the only body content from this template.

## Theme settings used (homepage group)

| Key | Type | Default | Purpose |
|-----|------|--------|---------|
| `show_featured_posts` | boolean | true | Whether to show the featured posts section above the feed on index |
| `featured_title` | text | "Featured articles" | Heading for the featured section |

Both are in **Settings → Design → Theme**, group **homepage**. The cover partial may use membership-related Ghost context (e.g. sign-in/subscribe) when members are enabled; the theme keeps the header compact and does not show search/subscribe in the nav.

## Partials involved

- **cover** — Rendered by `default.hbs` when `{{#is "index"}}{{^is "home"}}` (blog index, not static home). Content depends on Ghost (members, etc.).
- **featured-posts** — Carousel/section of featured posts; rendered when `show_featured_posts` is true.
- **loop** — Single post card in the feed (used in index, author, tag, related-posts).

For the single post layout and content partial, see [Post and page](./post-and-page).
