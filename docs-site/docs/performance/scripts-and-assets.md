---
sidebar_position: 2
---

# Scripts and assets

This page describes how the theme loads JavaScript and manages the critical path so the site stays fast and non-blocking.

## Script loading

- **Main script:** `default.hbs` loads `{{asset "built/main.min.js"}}` with the **defer** attribute. The script runs after the DOM is parsed and does not block rendering.
- **No inline blocking JS:** Critical behaviour (e.g. burger menu) should work with DOM-ready logic that is compatible with deferred execution.
- **Ghost injection:** `{{ghost_foot}}` is output after the theme script so Ghost can inject its own assets (e.g. member scripts) without blocking our bundle.

## What the theme JS does

The concatenated and minified bundle in `assets/built/main.min.js` is built from `assets/js/*.js` (Gulp: concat + uglify). It typically includes:

- **Burger menu** — Toggle mobile navigation.
- **Featured posts** — Carousel or scroll behaviour for the featured section on the blog index. Ideally this uses CSS scroll-snap or a minimal vanilla implementation instead of jQuery and Owl Carousel to keep weight down and improve LCP.

If jQuery or Owl are still present in the repo, the strategy is to remove or replace them: use vanilla JS for the burger and a lightweight or CSS-based solution for the featured feed.

## Critical path (above-the-fold)

- **CSS:** The single stylesheet `built/screen.css` is loaded in `<head>` without `async`/`defer` so first paint is styled. For v1 we keep one bundle; critical CSS (inline or separate above-the-fold CSS) is a possible future step to improve LCP.
- **Fonts:** Critical fonts used in the hero and nav are preloaded in `default.hbs`:
  - `IBMPlexSans-Regular.ttf`
  - `IBMPlexSans-SemiBold.ttf`
  Preload uses `rel="preload"`, `as="font"`, `type="font/ttf"`, and `crossorigin` so the browser discovers them early. Adding woff2 and preloading those instead would reduce payload and improve load time.

## Asset budget (recommended)

- Define a max size for CSS and for JS (e.g. after gzip) and check on each release.
- Run Lighthouse (or CI) and track Core Web Vitals so regressions are caught.

## Related

- [Fonts and images](./fonts-and-images) — Font files and preload
- [Build and validate](/docs/getting-started/build-and-validate) — How the bundle is built
- [Architecture: theme system](/docs/architecture/theme-system) — Layout and head structure
