# SOP: Refactoring an Existing Site for Responsive Styles (Developer Instructions)

## Philosophy / Framework to Follow

**Use “Intrinsic Layout + Progressive Enhancement” with a CSS methodology like CUBE CSS (Composition / Utility / Block / Exception).**  
Goal: reduce breakpoint-heavy hacks by making layouts adapt by default using fluid sizing, content-aware components, and a predictable CSS architecture.  
References: CUBE CSS + progressive-first approach; intrinsic layout concepts; MDN responsive design/media queries guidance; Flexbox/Grid usage guidance.

---

## 0) Outcomes & Non-goals

**Outcomes**
- Consistent, reusable layout primitives (stack, cluster, grid, sidebar, switcher).
- Fewer breakpoints; breakpoints become “exceptions,” not the system.
- Predictable spacing + typography scale across pages.
- Component rules live with components; minimal page-level overrides.

**Non-goals**
- Pixel-identical across every viewport (allow graceful reflow).
- Over-animating/responsive “tricks” that harm readability or performance.

---

## 1) Audit the Existing Site (Before Touching CSS)
1. Capture screenshots at: 360, 414, 768, 1024, 1280, 1440+.
2. List layout pain points:
   - Overflow / horizontal scroll
   - Crowded type / line length too wide or too narrow
   - Unreadable tap targets
   - Cards wrapping awkwardly / inconsistent heights
   - Nav collapsing poorly
3. Inventory global tokens currently used:
   - fonts, font sizes, line-heights
   - spacing units
   - colors (especially contrast + focus)
   - container widths and gutters
4. Identify “layout hotspots”:
   - header/nav, hero, multi-column sections, cards, forms, tables, footers.

---

## 2) Establish Global Design Tokens (First Refactor Layer)
Create a small token set that everything references.

**Required tokens**
- Spacing scale (e.g., 4–8–12–16–24–32–48–64).
- Container max widths (content vs wide).
- Gutters/padding (fluid if possible).
- Type scale + line-height defaults.
- Border radius, border widths.
- Elevation/shadow (minimal).
- Z-index layers (few, documented).

**Guardrails**
- Avoid arbitrary “magic numbers” scattered across files.
- Prefer semantic tokens: `--space-s`, `--space-m`, `--container`, `--radius`, etc.
- Use `clamp()` for fluid sizing where appropriate (type, spacing, gaps) to reduce breakpoints.

---

## 3) Standardize Breakpoints (Use Few, Use Intentionally)
**Breakpoint strategy**
- Prefer **content-driven breakpoints**, not device lists.
- Start mobile-first; add breakpoints only when layout breaks.

**Recommended default set (max 4)**
- `sm` ~ 480
- `md` ~ 768
- `lg` ~ 1024
- `xl` ~ 1280+

**Rules**
- No breakpoints for typography tweaks if `clamp()` can solve it.
- Avoid per-component custom breakpoints unless necessary; document exceptions.

---

## 4) Choose Layout Tools Deliberately (Grid vs Flex vs Flow)
**Decision rule**
- Use **CSS Grid for 2D layout (rows + columns / page structure).**
- Use **Flexbox for 1D alignment (nav clusters, button rows, inline alignment).**

**Avoid**
- Using flexbox for full page layouts with lots of wrapping + equal columns (use grid).
- Deeply nested flex containers to “fight” alignment—simplify structure.
- Fixed heights for content blocks; prefer min-height only when needed.

**Preferred patterns**
- Grid for card lists, responsive columns, page templates.
- Flex for nav bars, small clusters, toolbars, inline form controls.

---

## 5) Build Core “Composition” Utilities (Layout Primitives)
Implement a small set of layout primitives (CUBE “Composition” layer). :contentReference[oaicite:3]{index=3}

**Must-have primitives**
- **Container**: centers content, applies max-width, gutters.
- **Stack**: vertical rhythm (consistent spacing between children).
- **Cluster**: horizontal wrapping row (nav/cta clusters), gap-controlled.
- **Grid**: responsive cards/columns with `minmax()`/auto-fit.
- **Sidebar / Split**: two-column layout that collapses at a breakpoint.
- **Switcher**: flips from multi-column to single-column based on available space.

**Rules**
- Primitives should have minimal styling (layout only).
- Primitives should not set colors/typography except for spacing defaults.
- Use these primitives everywhere; reduce bespoke layout CSS.

---

## 6) Refactor Components Using CUBE CSS Layers

Apply CUBE CSS layering consistently.

**Order of operations**
1. **Global**: base elements (body, headings, p, a, form controls).
2. **Composition**: layout primitives listed above.
3. **Utilities**: single-purpose classes (margin/padding helpers, text align, visually-hidden).
4. **Blocks**: components (nav, hero, card, form, footer).
5. **Exceptions**: one-off overrides (avoid; document; keep local).

**Rules**
- Keep block styles self-contained (no deep selectors).
- Use logical properties where possible (margin-inline/padding-block).
- Prefer “low specificity” selectors; avoid `!important` except utilities.

---

## 7) Set Responsiveness Guardrails (Global Defaults)
**Typography**
- Base body size: 16–20px (project-dependent), with comfortable line-height.
- Max line length: ~65–75 characters.
- Use responsive headings via clamp or a scale.

**Spacing**
- Use consistent vertical spacing; define default section padding.
- Ensure all interactive elements have adequate hit area (min 44px target is a good heuristic).

**Media**
- Images: never overflow container; ensure responsive sizing.
- Tables: provide responsive strategy (scroll container, stacked rows, or column priority).

---

## 8) Navigation & Header Responsiveness
- Ensure nav collapses predictably:
  - desktop: horizontal cluster + clear active state
  - mobile: menu toggle + accessible focus management
- Avoid shrinking font sizes below readability; instead adjust spacing and layout.
- Ensure logo + nav do not compete at mid widths (switch layout earlier if needed).

---

## 9) Forms & Inputs
- Inputs must not be smaller than comfortable body text.
- Labels must remain visible (no placeholder-only labeling).
- Ensure focus rings are visible and contrast-compliant.
- Layout form fields using grid for multi-column forms; collapse to single column at `md` or when space breaks.

---

## 10) Accessibility & Preferences
- Maintain contrast and focus visibility in all states (default/hover/active/focus).
- Respect user preferences:
  - reduced motion (limit animations/transitions)
  - dark mode only if supported intentionally (avoid half-implemented modes)

---

## 11) Testing Protocol (Definition of Done)
Test at minimum:
- 320–375 mobile (portrait)
- 768 tablet
- 1024 small laptop
- 1280+ desktop
- zoom 200% (content still usable)
- keyboard-only navigation (nav + forms)
- reduced motion preference

Pass conditions:
- No horizontal scroll at standard breakpoints.
- No text overlaps or clipped UI.
- Tap targets remain usable.
- Layout primitives produce consistent spacing.

---

## 12) Implementation Sequence (Recommended Order)
1. Add tokens (spacing/type/container) and normalize base element styles.
2. Create composition utilities (container/stack/cluster/grid/split).
3. Refactor page templates using compositions (header/hero/sections/footer).
4. Refactor blocks/components (cards, forms, nav).
5. Reduce breakpoints: remove redundant ones; keep only content-driven.
6. Final QA sweep: accessibility + performance + regression screenshots.

---

## Practical Rules of Thumb (Quick Reference)

- Prefer fluid sizing + intrinsic layouts; use breakpoints as exceptions.
- Grid = layout; Flex = alignment.
- Keep CSS layers consistent (CUBE) to prevent specificity wars.
- Standardize spacing and container widths before touching components.
- Never “fix” responsiveness by shrinking text first—fix layout constraints first.