---
sidebar_position: 2
---

# Colours

The theme uses an **accessible, brand-matched palette** with clear roles. All pairings are chosen to meet WCAG AA where text or UI is involved.

## Accessibility targets

- **Normal text:** ≥ 4.5:1 contrast (WCAG SC 1.4.3)
- **Large text (≥18pt or ≥14pt bold):** ≥ 3:1
- **UI components / focus indicators:** ≥ 3:1 against adjacent colours (SC 1.4.11)

## Neutrals (primary use)

| Role | Hex | Usage |
|------|-----|--------|
| **Cream (base background)** | `#F0E8E0` | Default page background |
| **Paper (alt background / cards)** | `#FAF6F0` | Cards, alternate sections |
| **Ink (primary text)** | `#2A261A` | Body text |
| **Ink 2 (secondary text)** | `#4A4322` | Metadata, secondary copy |

## Brand accents

| Role | Hex | Usage |
|------|-----|--------|
| **Mustard** | `#E8C868` | Highlights, badges, accents only — not body text |
| **Olive** | `#706830` | Header, dark sections, brand anchor |
| **Maroon** | `#804050` | Links, emphasis, primary CTA |

## Safe pairings (AA normal text)

- **Ink on Cream** → 12.46:1
- **Ink on Mustard** → 9.27:1
- **Maroon on Cream** → 6.26:1
- **Paper on Maroon** → 7.05:1
- **Paper on Olive** → 5.26:1

**Avoid for normal text:** Mustard on Cream (1.34:1); Maroon on Olive (1.34:1). Use these for decoration, large text, or non-text only.

## Usage rules

- **Backgrounds:** Default = Cream; cards/alt sections = Paper; strong sections = Olive or Maroon (sparingly).
- **Text:** Body = Ink; secondary = Ink 2; links on light = Maroon. Never use Mustard for body text.
- **Buttons:** Primary = Maroon bg + Paper text; secondary = Olive bg + Paper text; highlight = Mustard bg + Ink text.
- **Focus rings:** Use a colour that meets 3:1 against the background (e.g. Maroon on Cream/Paper/Mustard; Paper on Olive/Maroon).

## Section rhythm (homepage and key pages)

Alternate backgrounds for clear hierarchy:

- **Cream** → **Paper** → **Olive** → **Cream** → **Maroon** (CTA)

Avoid stacking multiple Cream sections in a row. Use the section utility classes (e.g. `.section-light`, `.section-surface`, `.section-dark`, `.section-cta`) consistently.

## CSS tokens (theme-ready)

The theme defines these in `brand.css` (or equivalent). Use the variables, not raw hex, so dark mode or future tweaks stay consistent:

```css
:root {
  --bg: #F0E8E0;
  --surface: #FAF6F0;
  --text: #2A261A;
  --text-muted: #4A4322;
  --mustard: #E8C868;
  --olive: #706830;
  --maroon: #804050;
  --link: var(--maroon);
  --focus: var(--maroon);
}
```

On dark sections (Olive/Maroon), set `--focus` to `var(--surface)` or Mustard so the focus ring stays visible.
