---
sidebar_position: 1
---

# Architecture overview

This page describes the **stack**, **repo layout**, and how the custom theme fits into the broader application (site + docs).

## Stack

| Layer | Technology |
|-------|------------|
| **CMS** | Ghost 5.x (or later; theme declares `engines.ghost: ">=5.0.0"`) |
| **Theme** | Custom Handlebars theme (this repo): `.hbs` templates, partials, CSS, JS |
| **Build** | Gulp: CSS via PostCSS (easy-import, autoprefixer, cssnano); JS via concat + uglify. Output in `assets/built/`. |
| **Docs** | Docusaurus in `docs-site/`, deployed to **docs.mannyroy.com** (Netlify). Separate from the theme. |

The live site (mannyroy.com) runs on Ghost with this theme. The docs site explains the theme and related systems; it does not run inside Ghost.

## Repo layout (theme)

```
ghost-custom/
├── assets/
│   ├── css/           # Source CSS (screen.css imports general/, site/, blog/, misc/)
│   ├── built/         # Built screen.css, main.min.js (do not edit)
│   ├── js/            # Source JS (concatenated and minified)
│   └── fonts/         # IBM Plex (and any other webfonts)
├── partials/         # Reusable Handlebars partials (hero, content, footer, etc.)
├── default.hbs        # Root layout: head, header, body wrapper, footer, scripts
├── home.hbs           # Homepage
├── index.hbs          # Blog/archive
├── post.hbs, page.hbs # Single post, generic page
├── author.hbs, tag.hbs
├── page-*.hbs         # Custom page templates (about, services, ghost-application, etc.)
├── custom-*.hbs       # Custom post templates (optional)
├── package.json       # Theme config: image_sizes, custom settings, scripts
├── gulpfile.js        # Build and zip tasks
└── docs/              # Planning and reference (not the Docusaurus docs-site)
```

Theme assets are built into `assets/built/`. Ghost loads `built/screen.css` and `built/main.min.js` via `default.hbs`.

## How the theme fits the application narrative

The theme is the **front-end of the main site**: it defines the public pages (home, blog, about, services, contact, Ghost application page, etc.) and uses Ghost’s data (posts, pages, tags, settings). The **docs site** (Docusaurus) is a separate product that documents this theme, performance, operations, and the AI assistant. Together they form the “application” story: a live, well-documented, performant Ghost setup with a path to an AI assistant and clear deployment and observability practices.

## Next

- [Theme system](./theme-system) — CUBE CSS layers, CSS file roles, design tokens
- [Templates and partials](./templates-and-partials) — Which templates and partials exist and when Ghost uses them
- [Getting started](/docs/getting-started/local-development) — Run the theme locally
