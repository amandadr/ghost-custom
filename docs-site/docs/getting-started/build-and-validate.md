---
sidebar_position: 3
---

# Build and validate

Our release workflow builds theme assets and validates them with GScan before packaging for upload.

## Build (CSS and JS)

From the theme repo root:

```bash
yarn dev
```

This runs Gulp: it compiles CSS (PostCSS with easy-import, autoprefixer, cssnano) and JS (concat + uglify) into `assets/built/`. With `yarn dev`, Gulp also watches for changes and triggers livereload.

**One-off build** (no watch): we run the same Gulp tasks. Typically `yarn dev` includes watch; for zip, `yarn zip` triggers a full build first (see below).

## Where built assets go

- `assets/built/screen.css` (from `assets/css/screen.css` + imports like `general/`, `site/`, `blog/`, `misc/`) — Single stylesheet loaded by `default.hbs`.
- `assets/built/main.min.js` (from `assets/js/*.js`, concatenated + minified) — Theme script loaded with `defer` in `default.hbs`.

The theme loads these via `{{asset "built/screen.css"}}` and `{{asset "built/main.min.js"}}`. Built artifacts are generated from source; we edit source CSS/JS and rebuild.

## Validate (GScan)

Validation runs Ghost’s theme checker:

```bash
yarn test
```

This runs `gscan .` and reports compatibility and best-practice issues. We fix reported errors so the theme passes before packaging.

## Package for upload (zip)

Packaging uses `yarn zip` to produce a theme zip for Ghost Admin (Settings → Design → Upload theme):

```bash
yarn zip
```

This produces:

1. Runs a full build (CSS + JS)
2. Creates `manny-roy.zip` (or the name from `package.json`) in the repo root, including only the files Ghost needs (templates, partials, assets, `package.json`, etc.)

We upload that zip in Ghost Admin. For rollback, we keep a copy of the previous zip and re-upload it if needed (see [Deployment](/docs/operations/deployment)).

## Summary

- `yarn dev` — Build CSS/JS and watch; for local iteration.
- `yarn test` — Run GScan; gate before packaging.
- `yarn zip` — Build and create theme zip for upload.
