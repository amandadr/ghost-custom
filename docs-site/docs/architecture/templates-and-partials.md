---
sidebar_position: 3
---

# Templates and partials

Ghost chooses a **root template** based on route and context. Each template can include **partials** (reusable blocks). This page lists what exists and where it’s used.

## Root templates (when Ghost uses them)

| Template | When used |
|----------|-----------|
| `default.hbs` | Base layout only; not used alone. All other templates extend it with `{{!< default}}`. |
| `home.hbs` | When the site’s “homepage” is set to a custom page (e.g. “Home” page). |
| `index.hbs` | Blog/archive (e.g. `/` or `/blog/` depending on routes). |
| `post.hbs` | Single post. |
| `page.hbs` | Generic page (no custom template selected). |
| `author.hbs` | Author archive. |
| `tag.hbs` | Tag archive. |
| `page-about.hbs` | Page with template “About” (slug typically `about`). |
| `page-services.hbs` | Page with template “Services” (slug typically `services`). |
| `page-contact.hbs` | Page with template “Contact”. |
| `page-ghost-application.hbs` | Page with template “Ghost application” and slug `ghost-application`. |
| `page-thanks.hbs` | Thanks page (e.g. after form submit). |
| `page-work.hbs` | Work/portfolio-style page. |
| `custom-case-study.hbs` | Post with template “Case study”. |
| `custom-full-feature-image.hbs` | Post with full-width feature image. |
| `custom-narrow-feature-image.hbs` | Post with narrow feature image. |
| `custom-no-feature-image.hbs` | Post with no feature image. |

Ghost matches custom page templates by **template name** (shown in Admin when editing a page) and custom post templates when the user selects that template for a post.

## Partials (used in templates)

| Partial | Purpose | Used in |
|---------|---------|--------|
| `cover` | Blog cover / member CTA (when index and not home) | `default.hbs` |
| `featured-posts` | Featured posts carousel on blog index | `default.hbs` |
| `footer` | Site footer | `default.hbs` |
| `pswp` | PhotoSwipe (lightbox) for post/page | `default.hbs` |
| `hero` | (If used) Hero block | — |
| `content` | Post/page body with optional width and srcset images | `post.hbs`, `page.hbs`, custom post templates |
| `content-cta` | In-content CTA block | — |
| `cta-section` | Full-width CTA section (headline, button) | `home.hbs`, `page-about.hbs`, `page-ghost-application.hbs`, `page-services.hbs` |
| `loop` | Single post card in a feed | `index.hbs`, `author.hbs`, `tag.hbs`, `related-posts` |
| `related-posts` | Related posts block | `post.hbs`, custom post templates |
| `comments` | Comments block | `post.hbs`, custom post templates |
| `pagination` | (Handled by Ghost `{{pagination}}` in index) | — |
| `service-card` | Service pillar card | `home.hbs` |
| `service-section` | Full service section (title, intro, list) | `page-services.hbs` |
| `principle-item` | Principle/pillar item | `home.hbs` |
| `process-step` | Process step block | `page-services.hbs` |
| `two-column-section` | Two-column content block | `page-about.hbs` |
| `ghost-responsibility-row` | Responsibility → proof row | `page-ghost-application.hbs` |
| `ghost-highlight-card` | Highlight card (theme, docs, performance, AI) | `page-ghost-application.hbs` |
| `project-card` | (If used) Project card | — |
| `anchor-section` | (If used) Anchor section | — |
| `srcset` | Responsive image srcset snippet | `content.hbs`, `featured-posts.hbs`, `tag.hbs` |
| `icons/*` | Arrow, chevron, star, social icons | Various |

Templates compose these partials with theme settings (`@custom.*`) and Ghost data (`posts`, `post`, `page`, etc.). For per-template behaviour and theme settings, see [Templates & pages](/docs/templates/overview).
