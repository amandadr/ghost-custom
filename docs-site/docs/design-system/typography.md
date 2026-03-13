---
sidebar_position: 3
---

# Typography

The theme uses **IBM Plex Sans** for body and **IBM Plex Serif** for headings. Sizes and spacing follow the design SOP and are implemented via CSS custom properties in `typography.css`.

## Fonts

- **Body:** IBM Plex Sans (400, 600 for emphasis)
- **Headings:** IBM Plex Serif (600)

## Rules (from design SOP)

- Minimum **16px** body text (17px default; never smaller than 16px on small screens)
- Line-height **1.6–1.72** for body
- Max line length **65–75ch** (theme uses 72ch for content)
- Prefer **600** for emphasis instead of 700
- Ensure contrast is AA compliant (see [Colours](./colours))

## Design tokens (`typography.css`)

| Token | Value | Purpose |
|-------|--------|---------|
| `--mrc-body-size` | 17px | Base font size |
| `--mrc-body-line` | 1.72 | Body line-height |
| `--mrc-body-weight` | 400 | Body weight |
| `--mrc-content-width` | 72ch | Max readable width |
| `--mrc-h1-size` | clamp(1.85rem, 4vw + 1rem, 2.75rem) | Fluid H1 |
| `--mrc-h2-size` | clamp(1.65rem, 2.8vw + 0.9rem, 2.1rem) | Fluid H2 |
| `--mrc-h3-size` | clamp(1.2rem, 1.5vw + 0.5rem, 1.35rem) | Fluid H3 |
| `--mrc-lede-size` | 1.125rem | Intro/lede paragraph |
| `--mrc-small-size` | 14px | Meta, captions; never smaller |

Headings use the serif font and weight 600; body and UI use the sans font. Links are underlined (not colour alone) for accessibility.

## Content width

Long-form content uses `.gh-content` or `.mrc-content-width` with `max-width: min(var(--mrc-content-width), 100%)` so line length stays readable and content doesn’t overflow on small viewports.

## Form inputs

Inputs, selects, textareas, and buttons use at least **16px** font size to avoid iOS zoom on focus; from 768px up they can use the body size.
