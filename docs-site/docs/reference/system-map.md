---
sidebar_position: 1
---

# System map

This page gives **two views** of the same setup: first, **what runs where** (sites, builds, and the assistant layer); second, **how chat traffic flows** from the public sites to the DocsGPT backend and stored knowledge.

If you only need the stack and repo layout, start with [Architecture overview](../architecture/overview).

## Components at a glance

| Surface | What it is | Where it lives |
| --- | --- | --- |
| **Main site** | Ghost CMS + this custom theme (Handlebars, Gulp-built CSS/JS) | Production: **mannyroy.com** · Theme source: repo root (`*.hbs`, `assets/`, `partials/`) |
| **Documentation site** | Docusaurus (`docs-site/`), built to static HTML | **docs.mannyroy.com** (e.g. Netlify) — separate deploy from Ghost |
| **Theme build** | Gulp → `assets/built/screen.css`, `main.min.js`, etc. | Local / CI before theme zip upload |
| **Docs build** | `npm run build` in `docs-site/` → `build/` | Published as the docs host |
| **AI assistant** | Same DocsGPT **widget** (legacy bundle from unpkg) + config on both Ghost and Docusaurus | Embeds call **`apiHost`** (e.g. `assistant-api.mannyroy.com`) |
| **Assistant backend** | DocsGPT-compatible API: chat/stream, health, ingestion worker | HTTPS only; not part of Ghost or Docusaurus runtime |

Ghost **does not** serve the docs site, and the docs site **does not** run inside Ghost. They only **share** the widget script and the same backend URL so behaviour matches.

## How the assistant fits in (short)

1. A visitor loads **either** the Ghost site **or** the docs site.
2. Each site injects the **DocsGPT widget** (footer script / client module) pointing at the same `apiHost` and API key config.
3. The widget talks to the backend over **HTTPS** (chat, streaming, etc.).
4. The backend uses a **vector store** (embeddings) and a **sources corpus** (indexed docs, key pages, selected blog content) so answers can be **grounded** in your material.

The diagram below is **only** that assistant path—not Ghost’s database, theme upload, or docs CI.

## Assistant & retrieval path (diagram)

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="520" viewBox="0 0 960 520">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#6B7280" />
    </marker>
  </defs>

  <!-- External sites -->
  <rect x="40" y="70" width="260" height="120" rx="12" fill="#EEF2FF" stroke="#4F46E5" />
  <text x="170" y="105" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    Ghost (main site)
  </text>
  <text x="170" y="128" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    Theme + built assets
  </text>
  <text x="170" y="148" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    widget in page / footer
  </text>

  <rect x="40" y="230" width="260" height="120" rx="12" fill="#EEF2FF" stroke="#4F46E5" />
  <text x="170" y="265" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    Docusaurus (docs site)
  </text>
  <text x="170" y="288" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    docs pages + client module
  </text>
  <text x="170" y="308" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    same widget pattern
  </text>

  <!-- Backend -->
  <rect x="360" y="150" width="280" height="220" rx="12" fill="#ECFDF5" stroke="#059669" />
  <text x="500" y="188" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    DocsGPT backend (HTTPS)
  </text>
  <text x="500" y="213" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    Chat API + ingestion worker
  </text>
  <text x="500" y="238" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    example: assistant-api.mannyroy.com
  </text>
  <text x="500" y="263" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    `/api/health`, `/api/ready`
  </text>

  <!-- Data stores -->
  <rect x="710" y="95" width="210" height="100" rx="12" fill="#FEFCE8" stroke="#B45309" />
  <text x="815" y="128" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="13" fill="#111827" font-weight="600">
    Vector store
  </text>
  <text x="815" y="150" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    embeddings for retrieval
  </text>

  <rect x="710" y="220" width="210" height="105" rx="12" fill="#FEFCE8" stroke="#B45309" />
  <text x="815" y="253" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="13" fill="#111827" font-weight="600">
    Sources corpus
  </text>
  <text x="815" y="275" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    indexed: docs + key pages + blog
  </text>

  <!-- Arrows: widget -> backend -->
  <line x1="300" y1="130" x2="360" y2="205" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />
  <line x1="300" y1="290" x2="360" y2="265" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Arrows: backend -> data -->
  <line x1="640" y1="235" x2="710" y2="140" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />
  <line x1="640" y1="290" x2="710" y2="272" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Labels -->
  <text x="318" y="168" font-family="ui-sans-serif, system-ui" font-size="11" fill="#6B7280">
    `apiHost` (chat)
  </text>
  <text x="318" y="288" font-family="ui-sans-serif, system-ui" font-size="11" fill="#6B7280">
    same backend
  </text>
</svg>
```

### Diagram legend

| Box | Meaning |
| --- | --- |
| **Ghost (main site)** | Public marketing/blog/contact pages from Ghost; theme injects the widget. |
| **Docusaurus (docs site)** | Separate static site; client module or footer snippet loads the same widget. |
| **DocsGPT backend** | Single HTTPS origin for chat and ops (health/ready). Configured as `apiHost` in the widget. |
| **Vector store** | Embeddings used at query time for retrieval. |
| **Sources corpus** | Content you ingest (documentation, selected URLs, blog posts) — not the Ghost DB itself. |

### What this diagram does not show

- **Ghost Admin**, MySQL, or theme ZIP upload
- **Docs CI** (build, deploy, DNS for `docs.mannyroy.com`)
- **Analytics** (e.g. GA4) or **CDN** details
- Full **ingestion pipeline** timing (batch vs on-demand) — see [DocsGPT implementation plan](../ai-assistant/docsgpt-implementation-plan)

## Related

- [Architecture overview](../architecture/overview) — stack and repo layout
- [DocsGPT architecture decisions](../ai-assistant/docsgpt-architecture-decisions) — backend and product tradeoffs
- [Deployment](../operations/deployment) — shipping theme and docs
