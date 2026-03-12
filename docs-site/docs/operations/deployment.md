---
sidebar_position: 1
---

# Deployment workflow

_Placeholder. Describe how the theme is deployed: zip upload, Ghost version, Git-based workflow, and validation (e.g. GScan before zip). Add rollback notes (re-upload previous zip)._

## Theme deployment

- Build: `yarn dev` (Gulp) or `yarn zip` for package
- Test: `yarn test` (GScan) before packaging
- Deploy: Upload zip in Ghost admin (Settings → Design)

## Docs deployment

- This docs site is built with Docusaurus and deployed to **Netlify** at **docs.mannyroy.com**.
- Build command: `npm run build` (or `yarn build`) from the `docs-site` directory.
- Publish directory: `build`.

## Related

- [Observability](./observability)
- [Architecture overview](../architecture/overview)
