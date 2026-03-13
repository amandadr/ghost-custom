---
sidebar_position: 1
---

# Design system overview

The theme uses a **design system** so layout, colour, typography, and spacing stay consistent and maintainable. The foundations are:

- **Design tokens** — Spacing, typography, colours, breakpoints, and z-index live as CSS custom properties. Use them everywhere; avoid magic numbers.
- **CUBE CSS** — Layers are applied in order: Global → Composition → Utilities → Blocks → Exceptions. This keeps specificity predictable and styles reusable.
- **Design SOPs** — Written standards for spacing, responsiveness, and accessibility (see the repo `docs/` for the full SOPs). The theme implements them in code.

## Principles (from the design SOP)

- **Design for clarity first** — Readability over decoration; every element has a purpose.
- **Mobile-first** — Smallest viewport first; scale up progressively.
- **Content-driven layout** — Let content determine layout; use flexible components.
- **Consistency over novelty** — Reuse patterns; avoid new UI styles unless they solve a real problem.
- **Spacing creates hierarchy** — Use the spacing scale; section padding and vertical rhythm are structural, not decorative.
- **Accessibility is default** — Contrast, focus states, reduced motion, and tap targets are built in.

## What's in this section

| Doc | What it covers |
|-----|----------------|
| [Colours](./colours) | Palette, safe pairings, section rhythm, CSS variables. |
| [Typography](./typography) | Fonts, sizes, line-height, max width, heading scale. |
| [Spacing](./spacing) | Scale (4–96px), section padding, vertical rhythm. |
| [Composition](./composition) | Layout primitives: container, stack, cluster, grid, split, switcher. |
| [Responsiveness](./responsiveness) | Breakpoints, mobile-first, fluid sizing, testing. |
| [Accessibility](./accessibility) | Contrast, focus rings, reduced motion, tap targets. |

Use these docs when you're adding or changing UI so the theme stays coherent and accessible.
