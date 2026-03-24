---
sidebar_position: 1
---

# AI assistant design

This section describes the **AI assistant that is already live on this site**. The assistant is a **documentation‑first Q&A chatbot** grounded in site content (docs, key pages, blog), with a chat UI, source‑aware answers, and clearly defined scope and safeguards. The [roadmap](../reference/roadmap) captures how this design was rolled out over time.

**TL;DR:** BottyGPT/DocsGPT is embedded as one widget on both Ghost and Docusaurus, backed by a single knowledge base so answers stay consistent and attributable.

## Sitewide presence (docs + main site)

The assistant appears on both:

- **Docs site** (Docusaurus) — docs.mannyroy.com  
- **Main professional site** (Ghost) — mannyroy.com  

The implemented approach is: **one backend, one embeddable widget.**

- **Single RAG backend** — One API that indexes content from both the docs site and the main site (URLs, crawled pages, or ingested files). All answers come from this knowledge base.
- **Embeddable widget** — Same chat UI and behaviour on every page. Integrated once per platform: script/component on Ghost, script or React component on Docusaurus.

Same `apiHost` (and optional `apiKey`) on both sites so users get a consistent experience and one place to maintain scope, citations, and safeguards.

## Open source core: DocsGPT

The assistant is powered by **[DocsGPT](https://github.com/arc53/DocsGPT)**, which fits this model well:

- **Self-hosted or cloud** — We run our own instance or use DocsGPT Cloud; one backend URL for both sites.
- **Single knowledge base** — Ingest from documentation (Markdown, MDX, HTML), URLs (e.g. docs.mannyroy.com and mannyroy.com), or files. One corpus for the whole “application” (docs + main site).
- **Embeddable widget** — Works on any site:
  - **React**: `<DocsGPTWidget apiHost="..." ... />` — use in Docusaurus (e.g. root layout or a swizzled component).
  - **Plain HTML / script**: `renderDocsGPTWidget('app', { apiHost: '...', ... })` — add a container `div` and script in the Ghost theme (e.g. `default.hbs` before `</body>`).
- **Source citations** — `showSources: true` so answers reference docs and pages.
- **Open source** — [GitHub](https://github.com/arc53/DocsGPT); [widget docs](https://docs.docsgpt.cloud/Extensions/chat-widget); [demo](https://widget.docsgpt.cloud/).

A full deployment story is documented in the [DocsGPT implementation plan](docsgpt-implementation-plan), including the key choices that shaped this rollout.

Other options (e.g. generic chat widget + custom RAG API, or [ghost-chat-embed](https://github.com/rscheiwe/ghost-chat-embed) + our own backend) are viable patterns in general; this site specifically showcases the DocsGPT path.

## Where the assistant is integrated

- **Ghost (main site)** — The widget is embedded in the sitewide theme layout (based on `default.hbs`), so the chatbot appears on every page without requiring React on the Ghost side.
- **Docusaurus (docs site)** — The same widget is loaded on all docs pages via the `scripts` configuration (and can also be rendered as a `<DocsGPTWidget />` React component in a swizzled `Root` layout when needed).

Both integrations point at the same `apiHost` and project/API key so there is **one assistant, one knowledge base** across the entire property.

## Scope, limitations, and safeguards

The assistant is deliberately scoped as a **documentation and site‑content assistant**, not a general chat bot. Answers are expected to stay close to:

- Published documentation on this site.
- Key Ghost pages (including the Ghost application landing page).
- Selected blog posts and technical write‑ups.

Out‑of‑scope questions are handled conservatively (for example, by acknowledging when the docs do not provide enough information to answer confidently). Rate limits, disclaimers in the widget hero text, and logging are configured at the platform level (DocsGPT and the hosting stack) and can be tightened further if usage patterns change.

## Related

- [DocsGPT implementation plan](docsgpt-implementation-plan)
- [Architecture overview](../architecture/overview)
- [Roadmap](../reference/roadmap)

:::info See also

- [BottyGPT testing, reliability, and performance](/docs/ai-assistant/docsgpt-testing-and-operations) — health checks + runbook gates
- [BottyGPT DevOps and deployment](/docs/ai-assistant/docsgpt-devops-and-deploy) — VM, TLS, and widget `apiHost`
- [BottyGPT architecture decisions](/docs/ai-assistant/docsgpt-architecture-decisions) — why we picked this stack

:::
