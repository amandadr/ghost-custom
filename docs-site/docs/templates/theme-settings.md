---
sidebar_position: 6
---

# Theme settings reference

All theme-specific settings are defined in `package.json` under `config.custom`. They appear in **Ghost Admin → Settings → Design → Theme** and are available in templates as `@custom.<key>`.

## Layout and branding

| Key | Type | Default / options | Description |
|-----|------|-------------------|-------------|
| `navigation_layout` | select | "Logo on the left" | Logo on the left, in the middle, or stacked |
| `title_font` | select | "Modern sans-serif" | Modern sans-serif or Elegant serif (headings) |
| `body_font` | select | "Modern sans-serif" | Modern sans-serif or Elegant serif (body) |
| `color_scheme` | select | "Auto" | Auto, Light, or Dark |
| `white_logo_for_dark_mode` | image | — | Logo for dark mode (optional) |
| `header_logo` | image | — | Logo for header, favicon, and social sharing. Leave empty for theme text. |

## Homepage (group: homepage)

| Key | Type | Default | Description |
|-----|------|--------|-------------|
| `hero_headline` | text | "Untangle complex technical and operational problems." | Homepage hero H1 |
| `hero_subtext` | text | "Sustainable systems rooted in data, collaboration, and measurable impact." | Homepage hero subtext |
| `show_featured_posts` | boolean | true | Show featured posts on blog index |
| `featured_title` | text | "Featured articles" | Heading for featured section |

## Post (group: post)

| Key | Type | Default | Description |
|-----|------|--------|-------------|
| `show_author` | boolean | true | Show author on posts |
| `show_related_posts` | boolean | true | Show related posts block |

## Footer and contact

| Key | Type | Default | Description |
|-----|------|--------|-------------|
| `footer_bio` | text | "Independent technical consultant. Systems, automation, applied AI. Souris, PEI." | Footer bio text |
| `contact_email` | text | "manny@mannyroy.com" | Contact email (e.g. for contact page) |
| `contact_form_action` | text | "https://formspree.io/f/YOUR_FORM_ID" | Form submission URL (e.g. Formspree). Replace with your form ID. |

## Ghost application page (group: ghost)

| Key | Type | Default | Description |
|-----|------|--------|-------------|
| `ghost_hero_title` | text | "Applying to Ghost" | Ghost application page hero title |
| `ghost_hero_subtext` | text | (one sentence about the application) | Ghost application page hero subtext |
| `ghost_cta_headline` | text | "Questions or want to connect?" | CTA section headline |
| `ghost_cta_button` | text | "Get in touch" | CTA button label |
| `ghost_posts_heading` | text | "Build logs & technical writing" | Heading above tagged posts on Ghost application page |

---

Ghost limits themes to **20 custom settings** total. The above use the available slots; matrix and highlight text on the Ghost application page are hardcoded in the template. To add a new setting, add it to `config.custom` in `package.json` and use `@custom.<key>` in the relevant template.
