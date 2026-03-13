---
sidebar_position: 3
---

# Build and validate

Before packaging the theme for upload, build assets and run the theme validator (GScan).

## Build (CSS and JS)

From the theme repo root:

```bash
yarn dev
```

This runs Gulp: it compiles CSS (PostCSS with easy-import, autoprefixer, cssnano) and JS (concat + uglify) into `assets/built/`. With `yarn dev`, Gulp also watches for changes and triggers livereload.

**One-off build** (no watch): run the same Gulp tasks; typically `yarn dev` runs the default task which includes watch. For zip, `yarn zip` runs a full build first (see below).

## Where built assets go

| Output | Source | Purpose |
|--------|--------|---------|
| `assets/built/screen.css` | `assets/css/screen.css` + imports (general/, site/, blog/, misc/) | Single stylesheet loaded by `default.hbs` |
| `assets/built/main.min.js` | `assets/js/*.js` (concat + uglify) | Theme script loaded with `defer` in `default.hbs` |

The theme loads these via `{{asset "built/screen.css"}}` and `{{asset "built/main.min.js"}}`. Don’t edit the built files directly; edit source CSS/JS and rebuild.

## Validate (GScan)

Before creating the zip, run Ghost’s theme checker:

```bash
yarn test
```

This runs `gscan .` and reports compatibility and best-practice issues. Fix any errors so the theme passes before packaging.

## Package for upload (zip)

To produce a zip for Ghost Admin (Settings → Design → Upload theme):

```bash
yarn zip
```

This:

1. Runs a full build (CSS + JS)
2. Creates `manny-roy.zip` (or the name from `package.json`) in the repo root, including only the files Ghost needs (templates, partials, assets, `package.json`, etc.)

Upload that zip in Ghost Admin. For rollback, keep a copy of the previous zip and re-upload it if needed (see [Deployment](/docs/operations/deployment)).

## Summary

| Command | Purpose |
|---------|---------|
| `yarn dev` | Build CSS/JS and watch; use during local development |
| `yarn test` | Run GScan; run before zip |
| `yarn zip` | Build and create theme zip for upload |
