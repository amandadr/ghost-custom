---
sidebar_position: 2
---

# Theme system

The theme is built around **CUBE CSS** (Composition, Utility, Block, Exception), **design tokens** in CSS, and a clear split between **global**, **site**, and **blog** styles.

## CUBE CSS layers (order of application)

1. **Global** — Base elements (body, headings, p, a, form controls) in `typography.css`, `brand.css`, `basics.css`, `fonts.css`
2. **Composition** — Layout primitives in `general/composition.css` (container, stack, cluster, grid, split, switcher)
3. **Utilities** — Single-purpose helpers in `misc/utils.css` (e.g. visually-hidden, text alignment)
4. **Blocks** — Components in `site/*.css` and `blog/*.css` (header, hero, cards, footer, feed, single post, etc.)
5. **Exceptions** — One-off overrides; avoid where possible; document and keep local

Keeping this order prevents specificity wars and keeps layout (composition) separate from visuals (blocks).

## CSS file roles (`assets/css/`)

The single entry point is `screen.css`, which imports:

| Layer | Directory | Role |
|-------|-----------|------|
| Shared Ghost base | `@tryghost/shared-theme-assets` | Ghost v1 base styles |
| Global | `general/fonts.css`, `basics.css`, `brand.css`, `typography.css` | Fonts, resets, colours, type scale, spacing tokens |
| Composition | `general/composition.css` | Layout primitives only |
| General UI | `general/button.css`, `form.css`, `icons.css` | Buttons, forms, icons |
| Site | `site/layout.css`, `header.css`, `cover.css`, `home.css`, `services.css`, `about.css`, `contact.css`, `ghost.css` | Page-level and section blocks |
| Blog | `blog/feed.css`, `featured.css`, `pagination.css`, `single.css`, `author.css`, `share.css`, `navigation.css`, `related.css`, `comment.css`, `tag.css` | Blog index, post, author, tag |
| Misc | `misc/utils.css`, `animations.css`, `dark.css` | Utilities, motion, dark mode |

Edit the appropriate file when adding or changing styles; avoid dumping one-off rules into a single file.

## Design tokens (in `typography.css` and `brand.css`)

- **Breakpoints:** `--bp-sm` 480, `--bp-md` 768, `--bp-lg` 1024, `--bp-xl` 1280
- **Spacing:** `--space-1` through `--space-9` (4–96px); section padding and stack/cluster gaps
- **Typography:** `--mrc-body-size`, `--mrc-h1-size` … `--mrc-h3-size`, `--mrc-content-width`, paragraph and heading margins
- **Borders:** `--radius-s/m/l`, `--border-width`, `--border-width-thick`
- **Z-index:** `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-modal`
- **Containers:** `--mrc-container-wide`, `--mrc-page-gutter` (fluid clamp)

Use these tokens everywhere instead of magic numbers. See [Design system](/docs/design-system/overview) for full documentation.

## Layout and wrappers (`default.hbs`)

- **HTML:** Optional `theme-dark` / `theme-light` class from `@custom.color_scheme`; `lang` from `@site.locale`
- **Body class:** `body_class`, optional `block "body_class"`, and flags for nav layout and fonts (`is-head-left-logo`, `has-serif-title`, etc.)
- **Structure:** `<div class="site">` → header (with `{{navigation}}`) → optional cover/featured (on index when not home) → `<div class="site-content">` with `{{{body}}}` → footer partial
- **Scripts:** `built/main.min.js` loaded with `defer`; `{{ghost_foot}}` for Ghost injection
- **Font preload:** Critical above-the-fold fonts preloaded in `<head>` for performance

Partials and page templates fill `{{{body}}}`; the design system and blocks then style them. For a full list of templates and partials, see [Templates and partials](./templates-and-partials).
