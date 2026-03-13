---
sidebar_position: 2
---

# Observability and reliability

This page covers **monitoring**, **health**, and **what to do when something breaks** so the theme and site stay reliable.

## Deployment and rollback

- **Theme:** Deploy by uploading the theme zip in Ghost Admin. Roll back by re-uploading a previous zip or activating a previous theme. See [Deployment](./deployment).
- **Docs:** Deploy the docs site via your host (e.g. Netlify). Roll back by redeploying a previous build or reverting the branch and redeploying.

## When something breaks

### Theme issues

- **Broken layout or styles:** Re-check that the correct theme is active and that you uploaded a zip that was built and tested (`yarn test`) before packaging. If you edited the theme in Admin (Code Injection), review those snippets.
- **Missing assets (404):** Ensure the theme zip included `assets/built/screen.css` and `built/main.min.js` and that Ghost is serving the theme’s asset path correctly. Re-upload the theme if the zip was incomplete.
- **GScan errors after upgrade:** After a Ghost upgrade, run `yarn test` locally and fix any compatibility or deprecation issues, then rebuild and re-upload the theme.

### Site / server issues

- **Site down or 5xx:** Check Ghost and the hosting environment (process manager, logs). Restart Ghost if needed (`ghost restart` from the Ghost directory). If the host runs Ghost in a container or platform, use its restart/redeploy and log tools.
- **Database:** Ghost stores content and settings in its database. Theme changes don’t touch the DB; rollback is re-upload theme or redeploy. For DB issues, follow Ghost’s backup and restore docs.

## Monitoring (optional)

- **Health checks:** Use a simple HTTP check to the site root (or a dedicated health URL if you add one) to detect downtime. Many hosts and monitoring tools support this.
- **Error tracking:** Optionally add a lightweight client-side error tracking script (e.g. for JS errors) and document it in the theme or ops docs. Keep privacy and performance in mind.
- **Broken links:** Run a broken-link checker (manual or in CI) before or after launch so internal and key external links are valid.

## What we document

- **Deployment and rollback** — How to ship and revert (theme zip, docs deploy). See [Deployment](./deployment).
- **Validation** — Run GScan before packaging so the theme doesn’t introduce known issues. See [Build and validate](/docs/getting-started/build-and-validate).
- **Observability** — This page: what to do when things break, optional monitoring and health checks. More (e.g. dashboards, alerts) can be added as the setup grows.

## Related

- [Deployment](./deployment) — Build, test, zip, upload, and docs deploy
- [Roadmap](/docs/reference/roadmap) — Planned work, including observability improvements
