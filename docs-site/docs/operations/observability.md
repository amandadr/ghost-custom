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
- **INP (Interaction to Next Paint)** — focus on nav interactions and any chat-widget interactions.
- **CLS (Cumulative Layout Shift)** — watch for late-loading fonts/images/layout changes.

Suggested schedule:

- Daily: a quick smoke check on the home route (manual Lighthouse quick scan or host-level synthetic checks).
- Weekly: a deeper Lighthouse run and record the baseline deltas.

Alert thresholds:

- **TBD:** set numeric thresholds after the first baseline capture (and revisit after major theme changes).

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
