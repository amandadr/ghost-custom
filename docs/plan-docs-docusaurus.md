# Plan: Docs System with Docusaurus

**Goal:** Implement the docs hub (per [site-opportunities-improvement.md](site-opportunities-improvement.md) and [site overhaul.md](site%20overhaul.md)) using **Docusaurus** as the docs engine, while keeping the main site as the Ghost theme.

**Status:** Planning  
**Last updated:** 2025-03-12

---

## 1. Is Docusaurus possible? Yes

Docusaurus is a **separate** static site generator (React-based, builds to static HTML). It does **not** run inside Ghost. The model is:

- **Ghost theme** (this repo) = main site at mannyroy.com (home, blog, about, Ghost application page, etc.).
- **Docusaurus site** = dedicated docs site, either at a **subdomain** (e.g. `docs.mannyroy.com`) or at a **path** (e.g. `mannyroy.com/docs`) if your hosting supports it.

So “implementing docs” with Docusaurus means adding a **second app** (the docs site) and linking to it from the Ghost nav. That fits the plan’s “docs as first-class section” and “docs hub” deliverables.

---

## 2. Why Docusaurus fits

- **Technical docs:** Sidebar, TOC, search, code blocks, callouts, versioning (if you need it later).
- **Content:** Markdown/MDX; can reuse or mirror content from this repo’s `docs/` (SOPs, architecture, performance) and add the “Core docs to publish” from the overhaul plan.
- **Maintainability:** Clear IA, single place for doc structure and styling.
- **Deployment:** Builds to static files; easy to deploy to Netlify, Vercel, Cloudflare Pages, or any static host.

Tradeoff: docs are **not** editable in the Ghost admin; they live in the repo (Markdown/MDX) and deploy with the docs site. That’s acceptable and often preferable for technical docs.

---

## 3. Repo structure options

### Option A — Monorepo (recommended)

Keep the Ghost theme at repo root; add a Docusaurus app in a subfolder:

```
ghost-custom/
├── assets/           # theme assets (unchanged)
├── partials/
├── *.hbs
├── docs/             # existing planning/SOP/design docs (source material)
├── docs-site/        # Docusaurus app
│   ├── docusaurus.config.js
│   ├── sidebars.js
│   ├── docs/         # Docusaurus content (public docs)
│   │   ├── architecture/
│   │   ├── performance/
│   │   ├── deployment/
│   │   └── ...
│   ├── src/
│   └── package.json
├── package.json      # theme (unchanged)
└── ...
```

- **Pros:** One repo, single clone, docs and theme versioned together.  
- **Cons:** Root `package.json` is for the theme; Docusaurus has its own `docs-site/package.json` and install/build steps.

### Option B — Separate repo

A second repo (e.g. `mannyroy-docs`) containing only Docusaurus. Copy or link content from this repo’s `docs/` as needed.

- **Pros:** Clean separation; docs deploy independently.  
- **Cons:** Two repos to maintain; syncing content from `ghost-custom/docs/` is manual or scripted.

**Recommendation:** Option A (monorepo) so “docs system” and “theme” ship together and the application artifact stays one coherent project.

---

## 4. Content and information architecture

**Source material:** The existing `docs/` folder has planning, SOPs, and design (e.g. `sop-design.md`, `sop-responsiveness.md`, `cube-css-structure.md`, `site-opportunities-improvement.md`). Some of this is “internal”; some can become **public** docs.

**Public docs (align with “Core docs to publish”):**

- Architecture overview  
- Theme system  
- Performance engineering notes  
- AI assistant design  
- Deployment workflow  
- Observability and reliability  
- Content operations (optional)  
- Roadmap / future improvements  

**Suggested Docusaurus sidebar (high level):**

- **Introduction** — e.g. “About these docs”, link back to main site and Ghost application page  
- **Architecture** — overview, theme system, stack  
- **Performance** — strategy, metrics, font/asset approach  
- **Operations** — deployment, observability, rollback  
- **AI assistant** — design, scope, safeguards  
- **Reference** — roadmap, changelog (optional)  

You can start with a minimal set (e.g. Architecture, Performance, Deployment) and add sections as content is ready.

---

## 5. Deployment and URL strategy

### 5.1 Subdomain: `docs.mannyroy.com` (recommended)

- Deploy Docusaurus to Netlify, Vercel, or Cloudflare Pages.
- Set custom domain to `docs.mannyroy.com`.
- In Ghost **Settings → Navigation**, add a link: label **Docs**, URL `https://docs.mannyroy.com`.

**Pros:** Simple, no proxy, works with Ghost(Pro) or any Ghost host.  
**Cons:** Docs are on a different origin (still fine for UX and SEO if cross-linked).

### 5.2 Same domain: `mannyroy.com/docs`

- Main site must be served by something that can route `/docs` to the Docusaurus build (e.g. nginx, Cloudflare Workers, or a host that supports path-based static apps).
- Ghost(Pro) does **not** serve arbitrary static files at `/docs`; that path is for a Ghost page if you create one. So **same-domain /docs** only works if you self-host and configure the server/proxy to serve Docusaurus at `/docs`.

**Recommendation:** Use **subdomain** unless you already have a proxy and want a single-domain experience.

---

## 6. Implementation steps (concise)

| Step | Action |
|------|--------|
| 1 | Create `docs-site/` with Docusaurus (e.g. `npx create-docusaurus@latest docs-site classic --typescript`). Use “classic” template; we can switch to “docs-only” if you don’t need a blog there. |
| 2 | Configure `docusaurus.config.js`: title, baseUrl (e.g. `/` for docs.mannyroy.com), theme, navbar (link back to mannyroy.com, Ghost application page). |
| 3 | Define `sidebars.js` for the IA above (intro, architecture, performance, operations, AI, reference). |
| 4 | Add initial doc pages under `docs-site/docs/` (can migrate from repo `docs/` or write new). Ensure front matter and slugs match sidebar. |
| 5 | (Optional) Copy or adapt content from `docs/` (e.g. performance, theme, deployment) into `docs-site/docs/` and tidy for public audience. |
| 6 | Add “Docs” to Ghost navigation (Settings → Navigation) pointing to `https://docs.mannyroy.com` (or your chosen URL). |
| 7 | Deploy Docusaurus: connect `docs-site/` to Netlify/Vercel/Pages, set build command (e.g. `cd docs-site && npm run build`), publish directory `docs-site/build`. Set custom domain. |
| 8 | Document in this repo: add a short “Docs system” section to README (where docs live, how to edit, how to build/deploy). |

---

## 7. Ghost-side alignment (from site-opportunities-improvement.md)

- **Docs hub:** Implemented by the Docusaurus site; the hub *is* the Docusaurus index/sidebar.  
- **Docs IA:** Defined in Docusaurus sidebars and folder structure.  
- **“Docs” in nav:** Add one nav item in Ghost pointing to the Docusaurus URL.  
- **No `page-docs.hbs` in theme:** Not required; the “docs” experience is the separate site. Optionally, you could add a Ghost page with slug `docs` that redirects to the Docusaurus URL (e.g. meta refresh or server redirect) so `mannyroy.com/docs` goes to the docs site if you later use a proxy.

---

## 8. Summary

- **Docusaurus is possible and a good fit** for the planned docs system.  
- Use a **monorepo** with `docs-site/` for Docusaurus and keep the theme at root.  
- Deploy docs to a **subdomain** (e.g. `docs.mannyroy.com`) and add “Docs” to Ghost navigation.  
- Reuse and adapt content from the existing `docs/` folder and add the “Core docs to publish” as you go.  
- This delivers the “docs hub,” “docs IA,” and “Docs in nav” items from the opportunities doc while keeping technical docs in Markdown and the main site in Ghost.

Next step: scaffold `docs-site/` with Docusaurus and one or two stub docs (e.g. Introduction, Architecture overview), then wire nav and deployment.
