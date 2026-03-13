---
sidebar_position: 1
---

# Deployment workflow

This page describes how to **build**, **validate**, and **deploy** the theme to Ghost, and how to deploy this docs site.

## Theme deployment (Ghost)

### 1. Build

From the theme repo root:

```bash
yarn dev
```

Or run the build task your Gulp setup uses. This compiles CSS (PostCSS) and JS (concat + uglify) into `assets/built/`. For a one-off build before zip, `yarn zip` runs the full build automatically.

### 2. Validate (before packaging)

Run Ghost’s theme checker so you don’t upload a broken or non-compliant theme:

```bash
yarn test
```

This runs `gscan .`. Fix any errors (and optionally warnings) before creating the zip. You can add a pre-zip or CI step that runs `yarn test` (and optionally a CSS/JS linter) so packaging only happens when checks pass.

### 3. Package (zip)

```bash
yarn zip
```

This builds assets and creates a zip (e.g. `manny-roy.zip`) in the repo root, containing only what Ghost needs: templates, partials, assets, `package.json`, etc.

### 4. Upload to Ghost

1. In **Ghost Admin**, go to **Settings → Design**.
2. Under “Installed themes”, use **Upload theme** (or “Change theme” and upload).
3. Select the zip file and upload.
4. Activate the uploaded theme if it’s not already active.

### 5. Ghost version

The theme declares `engines.ghost: ">=5.0.0"` in `package.json`. Use a Ghost version that satisfies this (5.x or later). If you upgrade Ghost, re-run GScan and test the theme.

### Rollback

Keep a copy of the previous theme zip. To roll back:

1. In **Settings → Design**, upload the previous zip (or switch to a previously installed theme if still present).
2. Activate it. No database rollback is needed for a theme-only change.

## Docs site deployment (Docusaurus)

This documentation site is separate from the theme:

- **Build:** From the `docs-site/` directory, run `npm run build` or `yarn build`. Output goes to `build/`.
- **Hosting:** Deployed to **docs.mannyroy.com** via **Netlify** (or your chosen host). Publish directory: `build`.
- **Trigger:** Typically a push to the branch connected to Netlify runs the build and deploy. Configure the build command and publish directory in Netlify (or equivalent) to match the Docusaurus project.

## Related

- [Build and validate](/docs/getting-started/build-and-validate) — Detailed build and GScan steps
- [Observability](./observability) — Monitoring and what to do when something breaks
- [Architecture overview](/docs/architecture/overview) — Stack and repo layout
