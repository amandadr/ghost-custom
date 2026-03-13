---
sidebar_position: 7
---

# Accessibility

The theme builds in accessibility by default: contrast, focus, motion, and tap targets are part of the design system.

## Colour contrast

- All text/UI pairings meet **WCAG AA** where required (see [Colours](./colours)).
- Don’t use colour alone to convey meaning; use text, icons, or pattern as well.
- Focus rings use a colour that meets **3:1** against the background (e.g. Maroon on light, Paper on dark sections).

## Focus states

- Visible focus outline on interactive elements (`.focus-visible` in `brand.css`).
- On light backgrounds (Cream, Paper, Mustard): use Maroon for the ring.
- On dark backgrounds (Olive, Maroon): use Paper (or Mustard on Olive) so the ring stays visible.

Never remove focus styles without replacing them with an equally visible treatment.

## Reduced motion

The theme respects `prefers-reduced-motion` in `animations.css`: animations and transitions are shortened or disabled when the user prefers reduced motion. Use the same pattern for any new motion.

## Tap targets

Interactive elements (buttons, links, form controls) should have a minimum **44px** tap target (SOP guardrail). Ensure adequate spacing between clickable elements on mobile so taps are accurate.

## Typography and zoom

- Minimum 16px body text; content remains readable at **200% zoom**.
- Line length is constrained (72ch) so text doesn’t stretch across wide viewports.
- Form inputs are at least 16px to avoid iOS zoom on focus.

## Semantic HTML and ARIA

- Use semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) so structure is clear to assistive tech.
- Add ARIA only when needed (e.g. live regions, expanded/collapsed for menus). Don’t overuse ARIA where native HTML is sufficient (e.g. buttons, links, headings).

Accessibility is treated as part of design quality — it’s structural, not an add-on.
