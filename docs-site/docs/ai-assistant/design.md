---
sidebar_position: 1
---

# AI assistant design

The assistant is a **documentation Q&A chatbot** grounded in site content (docs, key pages, blog), with a chat UI, source-aware answers, and clear scope and safeguards. See the [roadmap](../reference/roadmap) for MVP ordering.

## Sitewide presence (docs + main site)

The chatbot should appear on both:

- **Docs site** (Docusaurus) — docs.mannyroy.com  
- **Main professional site** (Ghost) — mannyroy.com  

**Recommended approach: one backend, one embeddable widget.**

| Piece | Role |
|-------|------|
| **Single RAG backend** | One API that indexes content from both the docs site and the main site (URLs, crawled pages, or ingested files). All answers come from this knowledge base. |
| **Embeddable widget** | Same chat UI and behaviour on every page. Integrated once per platform: script/component on Ghost, script or React component on Docusaurus. |

Same `apiHost` (and optional `apiKey`) on both sites so users get a consistent experience and one place to maintain scope, citations, and safeguards.

## Open source option: DocsGPT

**[DocsGPT](https://github.com/arc53/DocsGPT)** fits this model well:

- **Self-hosted or cloud** — Run your own instance or use DocsGPT Cloud; one backend URL for both sites.
- **Single knowledge base** — Ingest from documentation (Markdown, MDX, HTML), URLs (e.g. docs.mannyroy.com and mannyroy.com), or files. One corpus for the whole “application” (docs + main site).
- **Embeddable widget** — Works on any site:
  - **React**: `<DocsGPTWidget apiHost="..." ... />` — use in Docusaurus (e.g. root layout or a swizzled component).
  - **Plain HTML / script**: `renderDocsGPTWidget('app', { apiHost: '...', ... })` — add a container `div` and script in the Ghost theme (e.g. `default.hbs` before `</body>`).
- **Source citations** — `showSources: true` so answers reference docs and pages.
- **Open source** — [GitHub](https://github.com/arc53/DocsGPT); [widget docs](https://docs.docsgpt.cloud/Extensions/chat-widget); [demo](https://widget.docsgpt.cloud/).

A full step-by-step plan is in the [DocsGPT implementation plan](docsgpt-implementation-plan).

Other options (e.g. generic chat widget + custom RAG API, or [ghost-chat-embed](https://github.com/rscheiwe/ghost-chat-embed) + your backend) work if you prefer a lighter widget and your own API.

## Where to integrate

- **Ghost (main site)** — In the theme layout used sitewide (e.g. `default.hbs`): add a widget container and the DocsGPT script tag (or equivalent) so the chatbot appears on all pages. No React required.
- **Docusaurus (docs site)** — Either:
  - **Script tag** — Add the same script + config via [`scripts` in `docusaurus.config.ts`](https://docusaurus.io/docs/configuration#scripts) and a root HTML hook or layout that injects the container, or  
  - **React component** — Install `docsgpt` and render `<DocsGPTWidget ... />` in a [swizzled](https://docusaurus.io/docs/swizzling) layout (e.g. `Root`) so the widget is present on every docs page.

Using the same `apiHost` and project/API key on both sites keeps one assistant, one knowledge base, sitewide.

## Scope, limitations, and safeguards

_To be filled as the assistant is scoped and implemented: acceptable topics, out-of-scope handling, rate limits, disclaimers in hero text, and moderation or logging if required._

## Related

- [DocsGPT implementation plan](docsgpt-implementation-plan)
- [Architecture overview](../architecture/overview)
- [Roadmap](../reference/roadmap)
