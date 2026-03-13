---
sidebar_position: 2
---

# Homepage (home.hbs)

The **homepage** is rendered by `home.hbs` when you set a static homepage in Ghost (Settings → General → Homepage). It follows the design system’s section rhythm: Cream → Paper → Olive → Maroon.

## Structure

1. **Hero (Cream)** — Headline and subtext from theme settings; primary and secondary CTA buttons.
2. **What I do (Paper)** — Section heading plus three service cards (partial `service-card`) linking to /services/#systems, #software, #automation.
3. **How I work (Olive)** — Section heading plus four principle items (partial `principle-item`): Sustainable, Measurable, Collaborative, Evidence-based.
4. **Final CTA (Maroon)** — Single CTA section (partial `cta-section`) with “Let’s team up” and “Get in touch”.

All section copy except the CTAs is hardcoded in the template. Hero headline and subtext are editable via theme settings.

## Theme settings used (homepage group)

| Key | Type | Default | Purpose |
|-----|------|--------|---------|
| `hero_headline` | text | "Untangle complex technical and operational problems." | Hero H1 |
| `hero_subtext` | text | "Sustainable systems rooted in data, collaboration, and measurable impact." | Hero subtext |

Edit these in **Settings → Design → Theme**, group **homepage**.

## Partials

- `service-card` (×3) — title, description, url
- `principle-item` (×4) — title, body
- `cta-section` — headline, subtext, button_text

No Ghost content (posts/pages) is queried in `home.hbs`; it’s fully driven by the template and theme settings.
