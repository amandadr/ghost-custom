---
sidebar_position: 1
---

# Getting started

This section documents our **local workflow** for developing the theme and producing a **deployable zip**.
The theme lives in this repo (`ghost-custom`); Ghost runs in a separate directory, and the theme is symlinked in so edits show up without re-uploading.

## Repo layout (one-liner)

- **Theme:** Handlebars templates (`.hbs`), partials, and assets (CSS/JS/fonts) in this repo. CSS is built with Gulp (PostCSS); JS is concatenated and minified. Output goes to `assets/built/`.
- **Docs:** This documentation site lives in `docs-site/` and is built with Docusaurus (separate from the theme).

## Development flow

- Local iteration with live reload: [Local development](./local-development)
- Build CSS/JS, validate with GScan, and package a zip: [Build and validate](./build-and-validate)

For architecture (stack, templates, design system), see [Architecture](/docs/architecture/overview). For deployment (upload, rollback), see [Operations](/docs/operations/deployment).
