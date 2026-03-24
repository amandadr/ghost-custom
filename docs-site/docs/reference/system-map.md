---
sidebar_position: 1
---

# System map

**TL;DR:** A single-glance diagram of the end-to-end request path: Ghost theme + Docusaurus docs pages embed one widget that calls the DocsGPT backend over HTTPS.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="520" viewBox="0 0 960 520">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#6B7280" />
    </marker>
  </defs>

  <!-- External sites -->
  <rect x="40" y="70" width="260" height="120" rx="12" fill="#EEF2FF" stroke="#4F46E5" />
  <text x="170" y="110" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    Ghost (theme)
  </text>
  <text x="170" y="135" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    `.hbs` + built assets
  </text>
  <text x="170" y="155" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    embeds widget
  </text>

  <rect x="40" y="230" width="260" height="120" rx="12" fill="#EEF2FF" stroke="#4F46E5" />
  <text x="170" y="270" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    Docusaurus (docs)
  </text>
  <text x="170" y="295" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    docs pages + script
  </text>
  <text x="170" y="315" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    loads widget
  </text>

  <!-- Backend -->
  <rect x="360" y="150" width="280" height="220" rx="12" fill="#ECFDF5" stroke="#059669" />
  <text x="500" y="195" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="14" fill="#111827" font-weight="600">
    DocsGPT backend (HTTPS)
  </text>
  <text x="500" y="220" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    API + worker (ingestion)
  </text>
  <text x="500" y="245" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    `apiHost` = assistant-api.mannyroy.com
  </text>
  <text x="500" y="270" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    `/api/health`, `/api/ready`
  </text>

  <!-- Data stores -->
  <rect x="710" y="95" width="210" height="100" rx="12" fill="#FEFCE8" stroke="#B45309" />
  <text x="815" y="135" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="13" fill="#111827" font-weight="600">
    Vector store
  </text>
  <text x="815" y="155" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    embeddings for RAG
  </text>

  <rect x="710" y="220" width="210" height="105" rx="12" fill="#FEFCE8" stroke="#B45309" />
  <text x="815" y="260" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="13" fill="#111827" font-weight="600">
    Sources corpus
  </text>
  <text x="815" y="280" text-anchor="middle" font-family="ui-sans-serif, system-ui" font-size="12" fill="#374151">
    docs + key pages + selected blog
  </text>

  <!-- Arrows: widget -> backend -->
  <line x1="300" y1="130" x2="360" y2="205" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />
  <line x1="300" y1="290" x2="360" y2="265" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Arrows: backend -> data -->
  <line x1="640" y1="235" x2="710" y2="140" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />
  <line x1="640" y1="290" x2="710" y2="272" stroke="#6B7280" stroke-width="2" marker-end="url(#arrow)" />

  <!-- Labels -->
  <text x="330" y="195" font-family="ui-sans-serif, system-ui" font-size="11" fill="#6B7280">
    widget calls `apiHost`
  </text>
  <text x="330" y="270" font-family="ui-sans-serif, system-ui" font-size="11" fill="#6B7280">
    responses grounded in sources
  </text>
</svg>
```

## Legend

- **Ghost (theme)** — Handlebars theme renders pages and embeds the DocsGPT widget.
- **Docusaurus (docs)** — Docs pages load the same widget so the assistant experience stays consistent.
- **DocsGPT backend (HTTPS)** — The API and ingestion worker that serves chat, health endpoints, and retrieval.
- **Vector store** — Where embeddings live so retrieval can find relevant chunks for RAG.
- **Sources corpus** — The content we index (docs, key pages, and selected blog/write-ups).

## Next deep-dives

- [Architecture overview](../architecture/overview)
- [BottyGPT architecture decisions](../ai-assistant/docsgpt-architecture-decisions)
