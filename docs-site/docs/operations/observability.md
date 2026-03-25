---
sidebar_position: 2
---

# Observability and reliability

This page documents **monitoring**, **health signals**, and **our reliability approach** when something breaks so the theme and site stay dependable.

**TL;DR:** Triage by surface first (theme vs assistant vs host), then use health endpoints + release validation to reach a concrete diagnosis quickly.

## When things go wrong (fast triage)

1. Identify which surface is affected:
   - Theme/UI (layout, CSS, JS)
   - Ghost hosting (down/5xx)
   - Docs site deployment
   - AI assistant widget (chat loading / answers failing)
2. Confirm the release artifacts:
   - Theme zip produced after `yarn test` (GScan)
   - Docs site build publish directory is `build/`
3. Confirm service health:
   - Theme/Docs availability via a simple HTTP check
   - Assistant readiness via `GET /api/health` and `GET /api/ready`
4. Only then start deeper debugging (logs, container status, ingestion state).

## Deployment and rollback

- **Theme:** We deploy by uploading the theme zip in Ghost Admin. We roll back by re-uploading a previous zip or activating a previously installed theme. See [Deployment](./deployment).
- **Docs:** We deploy the docs site via our host (e.g. Netlify). We roll back by redeploying a previous build or reverting the branch and redeploying.

## When something breaks

### Theme issues

- **Broken layout or styles:** We verify the correct theme is active and that the uploaded zip was built and tested (`yarn test`) before packaging. If we edited the theme in Admin (Code Injection), we review those snippets.
- **Missing assets (404):** We confirm the theme zip included `assets/built/screen.css` and `built/main.min.js` and that Ghost serves the theme’s asset path correctly. If the zip was incomplete, we re-upload.
- **GScan errors after upgrade:** After a Ghost upgrade, we run `yarn test` locally, fix compatibility/deprecation issues, then rebuild and re-upload the theme.

### Site / server issues

- **Site down or 5xx:** We check Ghost and the hosting environment (process manager, logs). If needed, we restart Ghost (`ghost restart` from the Ghost directory). If the host runs Ghost in a container/platform, we use its restart/redeploy and log tools.
- **Database:** Ghost stores content and settings in its database. Theme changes don’t touch the DB; rollback is re-upload theme or redeploy. For DB issues, we follow Ghost’s backup and restore docs.

## Monitoring (optional)

- **Health checks:** We use a simple HTTP check to the site root (or a dedicated health URL if we add one) to detect downtime. Many hosts and monitoring tools support this.
- **Error tracking:** Optionally add a lightweight client-side error tracking script (e.g. for JS errors) and document it in the theme or ops docs. Keep privacy and performance in mind.
- **Broken links:** We run a broken-link checker (manual or in CI) before or after launch so internal and key external links stay valid.

## Baseline telemetry (Core Web Vitals)

To keep “fast” measurable over time, we track these baseline signals:

- **LCP (Largest Contentful Paint)** — focus on the hero/main content above the fold.
- **INP (Interaction to Next Paint)** — focus on nav interactions and any chat-widget interactions (field data / RUM; lab reports use **TBT** and **max potential delay** as rough proxies only).
- **CLS (Cumulative Layout Shift)** — watch for late-loading fonts/images/layout changes.

Suggested schedule:

- Daily: a quick smoke check on the home route (manual Lighthouse quick scan or host-level synthetic checks).
- Weekly: a deeper Lighthouse run and record the baseline deltas.

### Recorded baseline (lab)

Source: PageSpeed Insights export `data/pagespeed_mannyroy.com_20260324_172249.json` — URL `https://www.mannyroy.com/`, fetch `2026-03-24T20:22:22.285Z`, Lighthouse 13.0.1.

| Metric | Mobile (simulated) | Desktop |
| --- | --- | --- |
| **LCP** | ~4.5 s (numeric ~4533 ms) | ~0.74 s (~735 ms) |
| **FCP** | ~3.1 s (~3140 ms) | ~0.69 s (~694 ms) |
| **CLS** | 0 | ~0.007 |
| **TBT** | ~133 ms | ~28 ms |
| **TTI** (lab) | ~4.5 s | — |

Revisit this table after major theme, third-party, or home-template changes.

### Alert thresholds

Use these for synthetic checks, LHCI budgets, or manual “red / yellow” triage. They combine **Google’s CWV “good” cutoffs** with **regression guardrails** vs. the lab baseline above.

**Long-term targets (good CWV):**

- **LCP** ≤ 2.5 s · **CLS** ≤ 0.1 · **INP** ≤ 200 ms (field)

**Lab / synthetic — mobile (primary; home is slowest on mobile in our baseline):**

| Signal | Warning | Critical | Notes |
| --- | --- | --- | --- |
| **LCP** | > 4.0 s | > 5.0 s | Baseline ~4.5 s; warn before large regressions; critical if clearly worse than baseline |
| **FCP** | > 3.5 s | > 4.5 s | Baseline ~3.1 s |
| **CLS** | > 0.05 | > 0.10 | Baseline ~0; desktop ~0.007 |
| **TBT** | > 200 ms | > 300 ms | Baseline ~133 ms; proxy for main-thread pain, not INP |

**Lab / synthetic — desktop:**

| Signal | Warning | Critical | Notes |
| --- | --- | --- | --- |
| **LCP** | > 1.2 s | > 2.5 s | Baseline ~0.74 s; 2.5 s aligns with “good” LCP |
| **CLS** | > 0.05 | > 0.10 | Same as mobile |

**INP:** Lab Lighthouse does not measure INP. When CrUX or RUM is available, use **warning** if INP p75 > 200 ms and **critical** if > 500 ms until field data proves otherwise.

How we capture:

- Lighthouse via browser tooling for quick checks.
- If/when we add CI performance gates, use Lighthouse CI (LHCI) or a similar automation so every release can be compared against the baseline.

## What we document

- **Deployment and rollback** — How to ship and revert (theme zip, docs deploy). See [Deployment](./deployment).
- **Validation** — We run GScan before packaging so the theme doesn’t introduce known issues. See [Build and validate](/docs/getting-started/build-and-validate).
- **Observability** — This page: our reliability process, plus optional monitoring and health checks. More (e.g. dashboards, alerts) can be added as the setup grows.

## Related

:::info See also

- [Deployment](./deployment) — Build, test, zip, upload, and docs deploy
- [Roadmap](/docs/reference/roadmap) — Planned work, including observability improvements

:::
