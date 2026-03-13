---
sidebar_position: 1
---

# Getting started

This section gets you from zero to **running the theme locally** and **building a deployable zip**. The theme lives in this repo (`ghost-custom`); you run Ghost in a separate directory and symlink the theme in so changes are reflected without uploading.

## Repo layout (one-liner)

- **Theme:** Handlebars templates (`.hbs`), partials, and assets (CSS/JS/fonts) in this repo. CSS is built with Gulp (PostCSS); JS is concatenated and minified. Output goes to `assets/built/`.
- **Docs:** This documentation site lives in `docs-site/` and is built with Docusaurus (separate from the theme).

## What to do next

| Goal | Doc |
|------|-----|
| Run Ghost locally and develop the theme with live reload | [Local development](./local-development) |
| Build CSS/JS, run GScan, and create the theme zip | [Build and validate](./build-and-validate) |

For architecture (stack, templates, design system), see [Architecture](/docs/architecture/overview). For deployment (upload, rollback), see [Operations](/docs/operations/deployment).
