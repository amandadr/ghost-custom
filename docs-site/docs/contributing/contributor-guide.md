---
sidebar_position: 1
---

# Contributor guide

This page is the starting point for contributing to the docs-site and theme repo.

**TL;DR:** Run both the Ghost theme and the Docusaurus docs locally, validate before you ship, then open a PR that follows the project’s docs style and tone.

## Where to start

### 1) Set up local development

- Theme + Ghost live reload: [Local development & build](/docs/getting-started/local-development)
- Docs site (Docusaurus): run it locally from `docs-site/` and preview changes in your browser (see the “Local docs-site development” section in the getting-started guide).

### 2) Make changes with fast feedback

- Theme code/assets: edit `.hbs`, CSS, and JS, then use the `yarn dev` workflow so `assets/built/` updates automatically.
- Docs content: edit markdown/MDX under `docs-site/docs/` and rely on the docs site dev server for immediate preview.

### 3) Validate before you open a PR

- Theme validation: [Build and validate](/docs/getting-started/build-and-validate) (includes `yarn test` / GScan).
- Docs linting: ensure markdown formatting stays consistent with markdownlint rules (especially around tables, fenced code blocks, and links).

### 4) Open a PR

- Follow the docs narrative and style conventions in: [Style guide](/docs/contributing/style-guide).
- Link your change to the related doc section (or issue) so reviewers can skim quickly.
- Keep PRs focused: one narrative change set per PR (avoid mixing unrelated formatting refactors with content edits).

## Quick checklist

1. Theme builds with `yarn dev` locally.
2. Theme validates with `yarn test` (GScan).
3. Docs page renders correctly in the local docs site.
4. Links and headings match the new sidebar structure.

## Related

- [Style guide](/docs/contributing/style-guide)
- [Versioning & releases](/docs/contributing/versioning-and-releases)

## Upstream / open-source work

- [DocsGPT open‑source contribution: health + readiness](/docs/ai-assistant/docsgpt-open-source-contribution)
