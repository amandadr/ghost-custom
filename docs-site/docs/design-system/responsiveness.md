---
sidebar_position: 6
---

# Responsiveness

The theme uses **mobile-first, intrinsic layout** with a small set of breakpoints. Layout adapts by default using fluid sizing and composition primitives; breakpoints are used when layout actually needs to change.

## Breakpoint strategy

- **Mobile-first:** Base styles for the smallest viewport; add breakpoints only when layout breaks.
- **Content-driven:** Breakpoints exist where content or composition demands a change, not for every device width.
- **Fluid where possible:** Use `clamp()` for type and spacing to reduce breakpoint count.

## Standard breakpoints

Defined in `typography.css` as CSS custom properties:

| Token | Value | Use |
|-------|--------|-----|
| `--bp-sm` | 480px | Small phones → larger phones |
| `--bp-md` | 768px | Phones → tablet / split layouts |
| `--bp-lg` | 1024px | Tablet → laptop |
| `--bp-xl` | 1280px | Laptop → desktop |

Use these in media queries so breakpoints stay consistent (e.g. `@media (min-width: 768px)` for split, grid, or nav layout changes).

## Layout tools

- **Grid** for 2D layout (cards, page structure, multi-column).
- **Flexbox** for 1D alignment (nav, clusters, button rows).

Avoid fixed heights for content; use min-height only when needed. Prefer composition primitives ([Composition](./composition)) so responsiveness is built in (e.g. split collapses at 768px, switcher stacks by threshold).

## Typography and spacing on small screens

- Body never below **16px** (media query in `typography.css` enforces `max(16px, var(--mrc-body-size))` below 768px).
- Section padding scales down on mobile (tokens are overridden in a mobile media query) so sections don’t feel cramped.
- Use fluid type (clamp) for headings so they scale without extra breakpoints.

## Testing

Test at minimum:

- 320–375px (portrait)
- 768px (tablet)
- 1024px (small laptop)
- 1280px+ (desktop)
- 200% zoom (content still usable)
- Keyboard-only navigation

Pass conditions: no horizontal scroll at standard widths, no clipped UI, tap targets remain usable, and composition primitives keep spacing consistent.
