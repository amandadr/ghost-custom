---
sidebar_position: 4
---

# Post and page (post.hbs, page.hbs, custom templates)

Single **posts** and **pages** use the content partial for the main body and optional related posts and comments. Custom post templates change the content width or layout.

## post.hbs (default single post)

- **Content:** `{{> "content" width="wide"}}` — Renders the post body with responsive images (srcset), optional feature image, and reading width “wide”.
- **Related posts:** Rendered when `@custom.show_related_posts` is true (partial `related-posts`).
- **Comments:** Partial `comments` (if enabled).

Theme settings (group **post**): `show_author`, `show_related_posts`. Toggle these in Settings → Design → Theme.

## page.hbs (default page)

- **Content:** `{{> "content" width="wide"}}` only. No related posts or comments.

Pages that use a **custom page template** (About, Services, Contact, Ghost application, etc.) use the corresponding `page-*.hbs` file instead; see [Ghost application page](./ghost-application-page) and [Theme settings](./theme-settings).

## Content partial (content.hbs)

The `content` partial outputs the main HTML body (post or page content from Ghost). It supports:

- **width** — Optional: `wide`, `narrow`, or `full` for layout/reading width.
- **no_image** — Optional: when true, skips feature image (used by `custom-no-feature-image.hbs`).

Images use the **srcset** partial for responsive `srcset`/`sizes`. Feature image and in-content images are handled so they don’t overflow and stay responsive.

## Custom post templates

If the author selects a custom template when editing a post, Ghost uses the matching `custom-*.hbs` file:

| Template name (in Admin) | File | Notes |
|--------------------------|------|--------|
| (default) | `post.hbs` | wide content, related, comments |
| Case study | `custom-case-study.hbs` | wide content, related; no comments |
| Full feature image | `custom-full-feature-image.hbs` | full-width feature image |
| Narrow feature image | `custom-narrow-feature-image.hbs` | narrow feature image |
| No feature image | `custom-no-feature-image.hbs` | no feature image block |

Each custom template composes the same building blocks (content partial, optional related-posts, optional comments) with different options. PhotoSwipe (pswp) is included by `default.hbs` for post/page so image lightbox works on all of them.
