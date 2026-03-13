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

## Deploy to Netlify (docs.mannyroy.com)

### 1. Connect the repo

1. Log in at [netlify.com](https://netlify.com) and click **Add new site** → **Import an existing project**.
2. Connect your Git provider (GitHub, GitLab, or Bitbucket) and select the **ghost-custom** repository.
3. Leave **Base directory** empty so Netlify builds from the repo root and uses the root `netlify.toml`.

### 2. Set build settings (critical)

In **Site configuration** → **Build settings** → **Build settings** (expand **Options** if needed):

1. **Base directory** — Leave **completely empty**. If this is set to `docs-site`, the build runs *inside* `docs-site`, so `cd docs-site` in the command fails with "No such file or directory".
2. **Build command** — Leave **empty** so Netlify uses the root `netlify.toml` (command: `cd docs-site && npm ci && npm run build`). If you override it in the UI, the same command must run from repo root.
3. **Publish directory** — Leave **empty** so Netlify uses the toml (publish: `docs-site/build`).

Then click **Save** and **Trigger deploy** (or push to the connected branch). The root `netlify.toml` is only used when Netlify builds from the repo root; empty Base directory ensures that.

### 3. Add custom domain docs.mannyroy.com

1. In Netlify: **Site configuration** → **Domain management** → **Add custom domain** (or **Add a domain alias**).
2. Enter **docs.mannyroy.com** and follow the prompts.
3. Netlify will show the required DNS record. Typically:
   - **Option A (subdomain):** Add a **CNAME** record: name `docs`, target the Netlify hostname (e.g. `your-site-name.netlify.app`).
   - **Option B (apex):** If you use a DNS provider that supports ALIAS/ANAME, you can point the apex; for a subdomain like `docs`, CNAME is the usual choice.
4. Enable **HTTPS** in Netlify (Netlify provisions a certificate via Let’s Encrypt once DNS is correct).
5. Wait for DNS to propagate, then **Verify DNS configuration** in Netlify.

### 4. Later deploys

Push to the connected branch; Netlify will build and publish automatically. The site URL is **https://docs.mannyroy.com** (and the Netlify subdomain until you add the custom domain).

## Content

- Edit docs in `docs/`. Sidebar order follows `sidebar_position` and folder structure; categories use `_category_.json`.
- Stub sections: Architecture, Performance, Operations, AI assistant, Reference. Replace placeholders with real content from the repo `docs/` (e.g. cube-css-structure, site-opportunities-improvement) as needed.
