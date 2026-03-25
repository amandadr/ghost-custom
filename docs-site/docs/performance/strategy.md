---
sidebar_position: 1
---

# Performance strategy

The theme is built with performance in mind: restrained JavaScript, a clear critical path, and measurable goals. This page summarizes the approach and what’s in scope.

**TL;DR:** We treat performance as a build/release gate: baseline Lighthouse/Core Web Vitals first, then small, measurable changes with explicit before/after checks.

## Goals

- **Strong Lighthouse and Core Web Vitals** — LCP, FID/INP, CLS within target ranges; document baseline and track over time.
- **Restrained JS** — No jQuery where avoidable; scripts loaded with `defer`; avoid heavy libraries for a single feature (e.g. replace Owl Carousel with CSS or minimal vanilla).
- **Improved font loading** — woff2 where possible, preload for critical above-the-fold fonts, `font-display: swap`.
- **Image optimization** — Responsive images (srcset/sizes), lazy loading for below-the-fold images, defined image sizes in `package.json`.

## Baseline & measurement plan

Before we change anything meaningful, we capture a baseline and record it here.

**Latest lab baseline (home, `https://www.mannyroy.com/`):** PageSpeed Insights export `data/pagespeed_mannyroy.com_20260324_172249.json` (2026-03-24), Lighthouse 13.0.1.

| Metric | Mobile (simulated) | Desktop |
| --- | --- | --- |
| **LCP** | ~4.5 s | ~0.74 s |
| **FCP** | ~3.1 s | ~0.69 s |
| **CLS** | 0 | ~0.007 |
| **TBT** | ~133 ms | ~28 ms |

**INP:** Not in lab; track via field/CrUX when available. **Transfer size (same run, top requests):** main document ~5–7 KiB; combined CSS/JS and third parties dominate; largest single asset in the report was a ~301 KiB avatar image loaded by the DocsGPT widget (optimize separately).

Alert and regression thresholds are documented under [Alert thresholds](/docs/operations/observability#alert-thresholds) on the Observability page.

For each proposed change, we do a quick before/after loop:

1. Run a local or staging build and load the same “representative” page (home is the usual baseline).
2. Capture Lighthouse results (same browser + similar conditions).
3. Update this page with the deltas and whether we moved toward the targets.

## What the theme does today

- **Scripts:** Main theme script is loaded with `defer` in `default.hbs` so it doesn’t block rendering.
- **Fonts:** Critical above-the-fold fonts (IBM Plex Sans Regular and SemiBold) are preloaded in `<head>`; `@font-face` uses TTF (woff2 can be added for better compression).
- **Images:** Post and page content use the `content` partial with srcset; Ghost image sizes (xs through xxl) are defined in `package.json`. Lazy loading can be added for images below the fold (feed, related posts, featured after first slide).
- **CSS:** Single `screen.css` bundle (PostCSS, autoprefixer, cssnano). Asset budget and optional critical CSS are documented as future improvements.

## In scope (strategy)

- **Baseline audit** — Capture Lighthouse and Core Web Vitals before/after changes.
- **Asset budget** — Define and monitor max sizes for CSS and JS.
- **JS cleanup** — Prefer vanilla JS for interactions; remove or replace jQuery and Owl if still present; keep DOM-ready logic compatible with `defer`.
- **Font strategy** — Document font loading (preload, woff2, fallbacks) in theme/docs.
- **Image strategy** — Consistent srcset/sizes and alt; `loading="lazy"` for below-the-fold; document in performance or theme docs.

## Related

- [Scripts and assets](./scripts-and-assets) — How JS and critical path are handled
- [Fonts and images](./fonts-and-images) — Font loading and image sizes
- [Deployment](/docs/operations/deployment) — Build and zip before upload
- [Theme system](/docs/architecture/theme-system) — Where assets are built and loaded

:::info See also

- [Local development & build](/docs/getting-started/local-development) — the exact workflow we use to test performance changes quickly
- [Accessibility](/docs/design-system/accessibility) — keyboard/focus details that also affect real-world UX metrics

:::
