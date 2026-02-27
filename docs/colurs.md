Below is an **accessible color set** that stays *very* close to the hues in your logo files (cream / mustard / olive / maroon), but assigns them roles so you can hit WCAG contrast targets reliably.

### Accessibility targets (what we’re designing to)

* **Normal text:** ≥ **4.5:1** contrast (WCAG SC 1.4.3) ([W3C][1])
* **Large text (≥18pt or ≥14pt bold):** ≥ **3:1** (SC 1.4.3) ([W3C][1])
* **UI components / focus indicators / meaningful icons:** ≥ **3:1** against adjacent colors (SC 1.4.11) ([W3C][2])
  (If you want to go beyond WCAG 2 contrast math, APCA is the “next-gen” model being explored for WCAG 3. ([APCA][3]))

---

## 1) Brand-matched, accessibility-first palette

### Neutrals (do most of the heavy lifting)

* **Cream (Base background)**: `#F0E8E0`  *(matches your files)*
* **Paper (Alt background / cards)**: `#FAF6F0`  *(cleaner white, still warm)*
* **Ink (Primary text)**: `#2A261A`  *(very dark warm-olive/charcoal; reads “serious”)*
* **Ink 2 (Secondary text)**: `#4A4322`  *(warm olive-brown; still very readable)*

### Brand accents (use for emphasis, not body text)

* **Mustard (Highlight / badge fill)**: `#E8C868` *(matches your files)*
* **Olive (Brand anchor / dark surface)**: `#706830` *(matches your files)*
* **Maroon (Links / emphasis / strong CTA)**: `#804050` *(matches your files)*

---

## 2) “Safe pairings” (contrast you can trust)

These meet **AA for normal text** (≥4.5:1):

* **Ink `#2A261A` on Cream `#F0E8E0`** → **12.46:1**
* **Ink `#2A261A` on Mustard `#E8C868`** → **9.27:1**
* **Maroon `#804050` on Cream `#F0E8E0`** → **6.26:1**
* **Paper `#FAF6F0` on Maroon `#804050`** → **7.05:1**
* **Paper `#FAF6F0` on Olive `#706830`** → **5.26:1**

These are **NOT safe for normal text** (but can be decorative / large text / non-text in some cases):

* **Mustard `#E8C868` on Cream `#F0E8E0`** → **1.34:1** (avoid for text)
* **Olive `#706830` on Mustard `#E8C868`** → **3.47:1** (OK for large text / UI lines; not great for body)
* **Maroon `#804050` on Olive `#706830`** → **1.34:1** (avoid)

---

## 3) Practical usage rules (so it stays accessible as you design)

### Backgrounds

* Default page background: **Cream `#F0E8E0`**
* Card/section alt background: **Paper `#FAF6F0`**
* “Strong section” background: **Olive `#706830`** *or* **Maroon `#804050`** (use sparingly)

### Text

* Body text: **Ink `#2A261A`**
* Secondary text / metadata: **Ink 2 `#4A4322`**
* Links on light backgrounds: **Maroon `#804050`** (excellent contrast + on-brand)
* Never set body text in **Mustard**

### Buttons

* Primary button: **Maroon bg `#804050` + Paper text `#FAF6F0`**
* Secondary button: **Olive bg `#706830` + Paper text `#FAF6F0`**
* Highlight / “badge” button: **Mustard bg `#E8C868` + Ink text `#2A261A`**

### Focus rings / outlines (important!)

Use a ring color that hits **3:1** against the adjacent background (SC 1.4.11). ([W3C GitHub][4])

* On **Cream/Paper**: ring **Maroon `#804050`**
* On **Mustard**: ring **Maroon `#804050`**
* On **Olive/Maroon**: ring **Paper `#FAF6F0`** (or Mustard on Olive if you want extra brand pop)

---

## 4) Drop-in CSS tokens (Ghost theme-ready)

```css
:root{
  /* neutrals */
  --bg: #F0E8E0;
  --surface: #FAF6F0;
  --text: #2A261A;
  --text-muted: #4A4322;

  /* brand */
  --mustard: #E8C868;
  --olive: #706830;
  --maroon: #804050;

  /* interactive */
  --link: var(--maroon);
  --focus: var(--maroon); /* swap to --surface on dark sections */
}
```

---

## Homepage Colour & Design Instructions (Condensed)

---

# Global Rules

* Cream = primary background
* Paper = alternate light section background
* Olive = dark anchor section background
* Maroon = strong CTA background
* Mustard = accent only (lines, highlights, small details)
* Ink = primary body text

Neutrals dominate.
Brand colours punctuate.

---

# Header

* Background: Olive
* Nav text: Cream
* Active link: Mustard underline (not colour change)
* Remove: search, sign in, subscribe
* Keep header compact and clean

---

# Hero Section (Light)

* Background: Cream
* Headline: Ink
* Subtext: Muted olive/ink-2
* Primary button: Maroon background + Cream text
* Secondary button: Olive border + Olive text
* Optional: 2px mustard divider below header

---

# “What I Do” Section

* Background: Paper (slightly lighter than hero)
* Add subtle mustard divider above heading
* Service blocks: no heavy cards
* Optional: 4px olive accent line on left of each service
* Tighten service copy (shorter, punchier lines)

---

# “How I Work” Section (Anchor Section)

* Background: Olive
* Text: Cream
* Headline: Cream
* Icons/dividers: Mustard
* Use shorter, principle-style copy
* Increase vertical spacing for emphasis

---

# Final CTA Section

* Background: Maroon
* Text: Cream
* Button: Mustard background + Ink text
* Clear single call to action

---

# Section Rhythm

Structure homepage as:

Cream
→ Paper
→ Olive
→ Cream
→ Maroon

Avoid stacking multiple cream sections in a row.

---

# Typography Adjustments

* Increase hero headline size slightly
* Reduce nav letter spacing
* Increase section spacing for breathing room
* Keep body text minimum 16px, line-height 1.6+

---

# CSS Structure

Create section utility classes:

* `.section-light` → Cream
* `.section-surface` → Paper
* `.section-dark` → Olive
* `.section-cta` → Maroon

Apply intentionally per section.

---

# Remove

* Bright pink button
* Excess UI elements
* Heavy card borders
* Overuse of mustard

---

Goal:
Clear hierarchy, strong contrast, intentional brand colour rhythm.

