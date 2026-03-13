---
sidebar_position: 1
---

# Roadmap and future improvements

This page summarizes **planned work** and **v2 ideas** so priorities and future scope are visible. It aligns with the repo’s site overhaul and opportunities docs and should be updated as work ships.

## Priority order (from opportunities doc)

| Priority | Area | Rationale |
|----------|------|------------|
| 1 | **Ghost application landing page** | Core deliverable; role-to-feature story and links to docs/blog. |
| 2 | **Docs system** (hub, IA, nav, first docs) | Unblocks AI assistant scope and public narrative. |
| 3 | **Performance: scripts** (jQuery/Owl, defer) | High impact on Core Web Vitals; restrained JS. |
| 4 | **Navigation** (Blog, Docs, Ghost in nav) | Clear information hierarchy. |
| 5 | **Font/asset optimization** (woff2, preload) | Better LCP and font loading strategy. |
| 6 | **Metadata and images** (lazy load, meta) | Polish, sharing, LCP/CLS. |
| 7 | **Release workflow and observability** | Deployment and monitoring docs; operational maturity. |
| 8 | **AI assistant** (after 1–2) | Depends on docs and application page content. |

## Future / v2 ideas

- **Critical CSS** — Inline or separate above-the-fold CSS for home and post to improve LCP; document before/after.
- **Additional docs** — Deeper dives (e.g. component patterns, migration notes) as the theme evolves.
- **AI assistant enhancements** — Broader content surface, chat UI, and safeguards once the assistant is scoped and implemented.
- **Observability** — Health checks, optional client-side error tracking, broken-link checks in CI; document in ops.
- **Asset budget** — Define and enforce max CSS/JS size (e.g. in CI) so regressions are caught.

Update this list as items are completed or deprioritized so the roadmap stays accurate.

## Related

- [Introduction](/docs/intro)
- [Deployment](/docs/operations/deployment)
- [Performance strategy](/docs/performance/strategy)
- [AI assistant design](/docs/ai-assistant/design)
