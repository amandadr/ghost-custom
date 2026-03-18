---
sidebar_position: 1
---

# Templates overview

Ghost picks a **root template** based on the current route and, for pages and posts, the **template** selected in the editor.

## How Ghost chooses a template

- **Homepage:** When a static “Home” page is set in Ghost (Settings → General → Homepage), Ghost uses `home.hbs` for that URL. Otherwise the index (blog) is the homepage.
- **Blog / archive:** The route that lists posts (e.g. `/` or `/blog/`) uses `index.hbs`. The layout also includes the cover and optional featured-posts (controlled by `default.hbs` and theme settings).
- **Single post:** `post.hbs` by default. If the author selects a custom post template (e.g. “Case study”, “Full feature image”), Ghost uses the matching `custom-*.hbs` file.
- **Single page:** `page.hbs` by default. When a template is selected for a page (e.g. “About”, “Ghost application”), Ghost then uses `page-<template-slug>.hbs` (e.g. `page-about.hbs`, `page-ghost-application.hbs`). Template names and slugs are defined by the theme’s filename (without `page-` and `.hbs`).
- **Author / tag:** `author.hbs` and `tag.hbs` for author and tag archives.

All templates that extend the root layout start with `{{!< default}}` so `default.hbs` wraps the content.

## Slug → template mapping (custom pages)

| Page slug (example) | Template selected in Admin | Theme file |
| --- | --- | --- |
| (any) | Default | `page.hbs` |
| `about` | About | `page-about.hbs` |
| `services` | Services | `page-services.hbs` |
| `contact` | Contact | `page-contact.hbs` |
| `ghost-application` | Ghost application | `page-ghost-application.hbs` |
| `thanks` | Thanks | `page-thanks.hbs` |
| `work` | Work | `page-work.hbs` |

The slug is set on the page in Ghost; the template name corresponds to the template chosen in the page’s template dropdown. Theme settings (`@custom.*`) control copy and toggles; see [Theme settings](./theme-settings).

## Next

- [Home](./home) — Homepage structure and theme settings
- [Blog and index](./blog-and-index) — Blog archive, cover, featured posts
- [Post and page](./post-and-page) — Single post/page, content partial, custom post templates
- [Ghost application page](./ghost-application-page) — Role-to-proof page and ghost_* settings
- [Theme settings](./theme-settings) — Full reference of `@custom.*` keys
