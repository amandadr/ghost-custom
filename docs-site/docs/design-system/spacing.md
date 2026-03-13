---
sidebar_position: 4
---

# Spacing

Spacing uses a **single scale** (no arbitrary values). All margins, padding, and gaps should use these tokens so the layout stays consistent and hierarchy is clear.

## Scale (SOP: 4, 8, 12, 16, 24, 32, 48, 64, 96px)

Defined in `typography.css` as:

| Token | Value | Pixels |
|-------|--------|--------|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.5rem | 24px |
| `--space-6` | 2rem | 32px |
| `--space-7` | 3rem | 48px |
| `--space-8` | 4rem | 64px |
| `--space-9` | 6rem | 96px |

Semantic aliases: `--mrc-space-xs` (space-1) through `--mrc-space-2xl` (space-8).

## Section padding

Section padding is **block-only** (vertical); horizontal spacing comes from the container gutter.

| Token | Typical use |
|-------|----------------|
| `--mrc-section-padding-block` | Standard sections (64px default) |
| `--mrc-section-padding-tight-block` | Tighter sections (48px) |
| `--mrc-section-padding-hero-block` | Hero / anchor sections (96px) |

On viewports under 768px, these scale down (e.g. 48px / 32px / 48px) so mobile doesn’t feel cramped.

## Vertical rhythm

- **Within a section:** Smaller gaps between related elements; larger gaps between groups.
- **Between sections:** Section padding should be at least 1.5–2× internal block spacing.
- **Headings:** Space above heading > space below; heading ties to the content beneath. Theme uses `--mrc-heading-margin-below` and `--mrc-paragraph-margin` for this.

## Typography spacing

- `--mrc-heading-margin-below`: space under headings (e.g. 16px)
- `--mrc-paragraph-margin`: space after paragraphs (e.g. 1.35em)

Use these in content blocks so rhythm stays predictable.

## Anti-patterns

- Don’t use arbitrary values (e.g. 22px, 37px); use the scale.
- Don’t vary section padding randomly by page; keep it consistent.
- Don’t fix layout by shrinking text first; fix layout constraints first.

If spacing feels wrong, adjust the system (tokens or composition) rather than one-off margins.
