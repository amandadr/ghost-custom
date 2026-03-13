---
sidebar_position: 3
---

# Fonts and images

This page covers **font loading** and **image sizing and delivery** so the theme stays fast and avoids layout shift.

## Font loading

### Current setup

- **Fonts:** IBM Plex Sans (body) and IBM Plex Serif (headings). Files live in `assets/fonts/` (e.g. `ibm-plex-sans/`). The theme uses TTF; `fonts.css` (or equivalent) defines `@font-face` with `font-display: swap` so text is visible while fonts load.
- **Preload:** In `default.hbs`, the two critical above-the-fold fonts (IBM Plex Sans Regular and SemiBold) are preloaded with `<link rel="preload" href="..." as="font" type="font/ttf" crossorigin>`. That reduces the chance of a flash of unstyled text and helps LCP for the hero and nav.

### Improvements (in scope or future)

- **woff2:** Add woff2 versions of IBM Plex Sans and Serif and reference them in `@font-face` with fallback to TTF. Smaller payload and faster load.
- **Preload woff2:** Once woff2 exists, preload the one or two critical woff2 files instead of (or in addition to) TTF as appropriate for browser support.
- **Document strategy:** Keep this doc and the theme’s `fonts.css` in sync so font loading is clear for future changes.

## Image sizes (Ghost)

The theme declares image sizes in `package.json` under `config.image_sizes` so Ghost generates responsive variants:

| Size | Width |
|------|--------|
| xs | 150px |
| s | 400px |
| m | 750px |
| l | 960px |
| xl | 1140px |
| xxl | 1920px |

Templates and the **content** partial use these with the **srcset** partial to output `srcset` and `sizes` so the browser picks an appropriate resolution. This reduces unnecessary data and helps LCP/CLS.

## Responsive images in content

- **Post/page body:** The `content` partial outputs responsive images (srcset) for the feature image and in-content images. Use `feature_image_alt` where available for accessibility.
- **Featured posts / feed / related:** Use srcset and sensible `sizes` so images scale with layout. Add `loading="lazy"` for images below the fold (e.g. post feed, related posts, featured after the first slide) to avoid loading and layout cost for off-screen images.

## Lazy loading

- **Below-the-fold images:** Add `loading="lazy"` where images are not in the initial viewport (feed, related posts, etc.). This is a small change with good impact on network and layout.
- **Above-the-fold:** Do not use `loading="lazy"` for the hero or first visible image; let the browser load them normally.

## Related

- [Theme system](/docs/architecture/theme-system) — Where fonts and assets live
- [Content partial](/docs/templates/post-and-page) — How post/page body images are rendered
- [Theme settings](/docs/templates/theme-settings) — Not font-specific; image_sizes are in package.json config
