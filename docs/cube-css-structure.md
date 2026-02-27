# CUBE CSS Structure (SOP Implementation)

This theme follows the CUBE CSS methodology and the responsiveness SOP. Quick reference:

## Layers (Order of Application)

1. **Global** — base elements (body, headings, p, a, form controls) in `typography.css`, `brand.css`, `basics.css`
2. **Composition** — layout primitives in `general/composition.css`
3. **Utilities** — single-purpose helpers in `misc/utils.css`
4. **Blocks** — components (nav, hero, card, form, footer) in `site/*.css`
5. **Exceptions** — one-off overrides (avoid; document; keep local)

## Design Tokens (`typography.css`)

- **Breakpoints:** `--bp-sm` 480, `--bp-md` 768, `--bp-lg` 1024, `--bp-xl` 1280
- **Spacing:** `--space-1` through `--space-9` (SOP scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px)
- **Section padding:** `--mrc-section-padding` (64px), `--mrc-section-padding-tight` (48px), `--mrc-section-padding-hero` (96px)
- **Typography spacing:** `--mrc-heading-margin-below`, `--mrc-paragraph-margin`
- **Borders:** `--radius-s/m/l`, `--border-width`, `--border-width-thick`
- **Z-index:** `--z-base`, `--z-dropdown`, `--z-sticky`, `--z-modal`
- **Containers:** `--mrc-container-wide`, `--mrc-page-gutter` (fluid clamp)

## Composition Primitives (`general/composition.css`)

| Class | Usage |
|-------|--------|
| `.mrc-container` | Centers content, max-width, gutters |
| `.mrc-stack` | Vertical rhythm; `.mrc-stack--s/m/l/xl` for gap size |
| `.mrc-cluster` | Horizontal wrapping row; `.mrc-cluster--between/end/center` |
| `.mrc-grid` | Responsive columns; `.mrc-grid--2/3/4` or `.mrc-grid--auto` |
| `.mrc-split` | Two-column; `.mrc-split--60-40`, `--50-50`, `--40-60`; collapses at 768px |
| `.mrc-switcher` | Multi-column → single based on space; `.mrc-switcher--2/3/4` |

## Utilities (`misc/utils.css`)

- `.u-visually-hidden` — screen-reader only
- `.u-text-center` / `.u-text-left` / `.u-text-right`

## Accessibility

- `prefers-reduced-motion`: animations shortened in `animations.css`
- Focus rings: `outline` on `.focus-visible` (brand.css)
- Tap targets: min 44px for interactive elements (SOP guardrail)

## Breakpoint Strategy

- Mobile-first; breakpoints only when layout breaks
- Use `clamp()` for fluid type/spacing instead of breakpoints
- Standard breakpoints: 480, 768, 1024, 1280 (via `--bp-*`)
