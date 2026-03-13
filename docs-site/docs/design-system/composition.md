---
sidebar_position: 5
---

# Composition (layout primitives)

The theme’s **composition layer** (CUBE CSS) provides layout-only primitives. They don’t set colours or typography — use them for structure, then add blocks and utilities.

All primitives live in `assets/css/general/composition.css` and use the spacing and container tokens from [Spacing](./spacing) and [Typography](./typography).

## Container

Centers content, applies max-width and horizontal padding (gutter).

| Class | Purpose |
|-------|---------|
| `.mrc-container` | Default: max-width `--mrc-container-wide` (1100px), padding from `--mrc-page-gutter` |
| `.mrc-container--narrow` | Tighter max-width for reading (e.g. `--mrc-content-width` / 72ch) |

## Stack

Vertical rhythm with consistent gap between children.

| Class | Gap |
|-------|-----|
| `.mrc-stack` | Default `--space-4` |
| `.mrc-stack--s` | `--space-2` |
| `.mrc-stack--m` | `--space-4` |
| `.mrc-stack--l` | `--space-6` |
| `.mrc-stack--xl` | `--space-8` |
| `.mrc-stack--section` | `--space-9` |

## Cluster

Horizontal wrapping row (nav, button groups, inline clusters). Gap-controlled.

| Class | Purpose |
|-------|---------|
| `.mrc-cluster` | Default gap `--space-4` |
| `.mrc-cluster--s` / `--m` / `--l` / `--xl` | Gap size |
| `.mrc-cluster--between` | `justify-content: space-between` |
| `.mrc-cluster--end` | `justify-content: flex-end` |
| `.mrc-cluster--center` | `justify-content: center` |

## Grid

Responsive columns with optional auto-fit.

| Class | Purpose |
|-------|---------|
| `.mrc-grid` | 1 column by default; gap `--space-6` |
| `.mrc-grid--2` / `--3` / `--4` | 2, 3, or 4 columns (minmax-based) |
| `.mrc-grid--auto` | As many columns as fit (auto-fit, min ~250px) |
| `.mrc-grid--gap-s` / `--gap-m` / `--gap-l` / `--gap-xl` | Override gap |

Children have `min-width: 0` so text wraps correctly.

## Split

Two-column layout; collapses to one column below 768px.

| Class | Above 768px |
|-------|-------------|
| `.mrc-split--60-40` | 60% / 40% |
| `.mrc-split--50-50` | 50% / 50% |
| `.mrc-split--40-60` | 40% / 60% |

## Switcher

Multi-column that flips to single column when space is tight. Uses a threshold (width) to decide when to stack.

| Class | Threshold (approx) |
|-------|---------------------|
| `.mrc-switcher--2` | 25rem |
| `.mrc-switcher--3` | 40rem |
| `.mrc-switcher--4` | 55rem |

Use for card rows or feature blocks that should stack on smaller viewports without a hard breakpoint.

---

Use these primitives everywhere; avoid one-off layout CSS. For component-level layout (hero, cards, footer), combine primitives with block styles in `site/` and `blog/`.
