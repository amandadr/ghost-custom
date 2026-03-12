# Manny Roy Consulting — Docs site

Documentation for the Ghost theme and site. Built with [Docusaurus](https://docusaurus.io), deployed to **docs.mannyroy.com** via Netlify.

## Local development

```bash
yarn install
yarn start
```

Opens http://localhost:3000. Docs live under `/docs`.

## Build

```bash
yarn build
```

Output is in `build/`. Serve locally with `yarn serve`.

## Deploy to Netlify

1. In Netlify: **Add new site** → **Import an existing project** (this repo).
2. Set **Base directory** to `docs-site`.
3. **Build command:** `npm run build` (or `yarn build`).
4. **Publish directory:** `build`.
5. Add custom domain **docs.mannyroy.com** in Netlify domain settings and configure DNS (CNAME to your Netlify URL).

The repo includes `docs-site/netlify.toml` with these settings; Netlify will use it when the base directory is `docs-site`.

## Content

- Edit docs in `docs/`. Sidebar order follows `sidebar_position` and folder structure; categories use `_category_.json`.
- Stub sections: Architecture, Performance, Operations, AI assistant, Reference. Replace placeholders with real content from the repo `docs/` (e.g. cube-css-structure, site-opportunities-improvement) as needed.
