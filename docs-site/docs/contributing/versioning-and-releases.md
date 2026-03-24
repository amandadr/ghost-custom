---
sidebar_position: 3
---

# Versioning & releases

**TL;DR:** We version the theme from `package.json`, validate + package with `yarn test`/`yarn zip`, tag releases in git, and record release notes in the docs `Changelog` page.

## Where to look

- [Roadmap & Changelog](/docs/reference/roadmap)
- Ongoing reliability + operational guidance: [BottyGPT testing, reliability, and performance](/docs/ai-assistant/docsgpt-testing-and-operations)

## Theme releases (Ghost)

### 1) Decide what this release changes

Theme changes ship as a single Ghost-uploadable zip (`yarn zip` output).

### 2) Bump the theme version

We bump the root `package.json` `version` field (this repo’s theme version).

### 3) Validate and package

- We validate with: `yarn test` (GScan)
- We build/package with: `yarn zip`

If validation fails, the release is not packaged.

### 4) Create a git tag

We create a lightweight tag like `theme-vX.Y.Z` on the release commit.

### 5) Deploy + document

- We upload the generated zip in Ghost Admin and activate it.
- We add a short release note entry to: [Changelog](/docs/reference/changelog).

## Docs releases (Docusaurus)

Docs are deployed via our hosting workflow (Netlify or equivalent).

For changelog notes, we keep the “why” narrative in:

- [Roadmap](/docs/reference/roadmap) for priority + outcomes
- [Changelog](/docs/reference/changelog) for shipped release notes

## PR conventions

- If a PR changes theme build assets, templates, or CSS/JS: label it as a “theme” change.
- If a PR changes runbooks, assistant scope, or documentation pages: label it as a “docs” change.
- If it affects both, keep one narrative PR that covers the story end-to-end.
