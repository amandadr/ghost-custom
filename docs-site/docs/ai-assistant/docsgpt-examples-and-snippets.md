---
sidebar_position: 4
---

# Examples & snippets (runnable configs)

**TL;DR:** Copy/paste-ready snippets for widget wiring, health checks, and the minimal configuration that makes Ghost + Docusaurus talk to the same DocsGPT backend.

## Widget wiring

### Ghost (Code Injection) — unpkg legacy (non-blocking)

A **footer** `<script src="https://unpkg.com/...">` is parser‑blocking wherever it sits in the template. Prefer **one inline script** that injects the same URL with `async` and schedules work with `requestIdleCallback` (fallback: after `load`). The repo keeps a full copy‑paste block in `snippets/ghost-docsgpt-footer-deferred.html` at the Ghost theme repository root (`ghost-custom`).

### Ghost (Code Injection) — widget script tag

If your DocsGPT instance serves a widget bundle at `https://assistant-api.mannyroy.com/widget.js`:

```html
<script
  src="https://assistant-api.mannyroy.com/widget.js"
  data-api-key="YOUR_API_KEY"
  data-api-url="https://assistant-api.mannyroy.com"
  data-title="Manny's Assistant"
></script>
```

### Docusaurus (client module) — mount + render

In a client module, we render the widget into a container:

```ts
window.renderDocsGPTWidget('docsgpt-widget-root', {
  apiHost: 'https://assistant-api.mannyroy.com',
  apiKey: '',
  showSources: true,
  title: 'Manny Roy Consulting',
  theme: 'light',
});
```

## CORS + API host configuration

When the widget runs in the browser, we must allow the Ghost and Docs origins to call the API:

```env
CORS_ALLOWED_ORIGINS=https://mannyroy.com,https://docs.mannyroy.com
```

We also keep `apiHost` consistent across:

- Ghost embeds
- Docusaurus embeds
- Backend reverse proxy hostname

## Health checks (smoke test)

After deploy or when troubleshooting “widget loaded but answers are off” scenarios, we verify:

```bash
curl -fsS https://assistant-api.mannyroy.com/api/health
curl -fsS https://assistant-api.mannyroy.com/api/ready
```

If `/ready` fails, focus on dependency connectivity (Redis/Mongo/vector store) before changing widget configuration.

## Ingestion snippets (what to index)

At minimum, this project indexes:

- Main site content (e.g. a sitemap URL)
- Docs site content (docs pages + key reference)

For each source, we run ingestion until training completes, then we re-ingest when major content changes ship.
