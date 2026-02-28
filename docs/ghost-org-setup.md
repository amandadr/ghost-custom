# Setting up this theme on Ghost.org

This guide walks through configuring the Manny Roy Consulting theme on a Ghost.org hosted site. Follow these steps after signing up and creating your Ghost site.

---

## 1. Install the theme

1. **Build a theme package** (from this repo):
   ```bash
   npm run zip
   ```
   This creates `manny-roy.zip` in the `dist/` folder.

2. **Upload to Ghost.org**:
   - Go to **Ghost Admin** → **Settings** → **Design**
   - Scroll to **Change theme**
   - Click **Upload theme** and select `manny-roy.zip`
   - Once uploaded, click **Activate** to use the theme

---

## 2. Create required pages

Create the following pages in Ghost Admin (**Pages** → **New page**). For each, set the **URL** (slug) and **Template** as shown.

| Page title | URL (slug) | Template |
|------------|------------|----------|
| About      | `about`    | **About** |
| Services   | `services` | **Services** |
| Contact    | `contact`  | **Contact** |
| Thanks     | `thanks`   | **Thanks** |

### Page details

- **About**: Uses the About template with two-column layout. Add your content via the page editor; the template handles structure.
- **Services**: Pre-built structure (hero, service sections, engagement model, process). Little to no content editing needed.
- **Contact**: Contact form and details. Requires Formspree setup (step 5).
- **Thanks**: Shown after the contact form is submitted. Keep it simple — e.g. “Thanks for reaching out.” — or leave the default. **Important**: The form redirects to `/thanks/`; this page must exist.

### Optional: Work / portfolio page

If you want a portfolio page, create a page with:

- **URL**: `work`
- **Template**: **Work**

---

## 3. Configure navigation

1. Go to **Settings** → **Navigation**
2. Add links in this order:
   - **Label**: Home → **URL**: `/`
   - **Label**: About → **URL**: `/about/`
   - **Label**: Services → **URL**: `/services/`
   - **Label**: Contact → **URL**: `/contact/`

The header and footer both use this navigation.

---

## 4. Formspree setup (Contact form)

The contact form submits to Formspree. Set it up once, then add your form URL to the theme settings.

### 4.1 Create a Formspree account and form

1. Go to [formspree.io](https://formspree.io) and create a free account
2. In the dashboard, click **New form**
3. Name it (e.g. “Contact” or “Manny Roy Contact”)
4. Formspree assigns a **form ID** (hashid), e.g. `abc123xy`
5. Your form URL will be: `https://formspree.io/f/abc123xy`

### 4.2 Add the form URL to the theme

1. In Ghost Admin, go to **Settings** → **Design**
2. Scroll to **Theme settings** (or click **Change theme** → **Customize** for the active theme)
3. Find **Contact form action** (or similar)
4. Paste your Formspree URL: `https://formspree.io/f/YOUR_FORM_ID`
5. Save

### 4.3 Form fields (already configured in the theme)

The theme form sends these fields to Formspree:

| Field name     | Formspree receives |
|----------------|--------------------|
| `name`         | Sender name        |
| `email`        | Sender email       |
| `organization` | (optional)         |
| `how_can_i_help` | Dropdown: Systems & Strategy, Custom Software, Automation & AI, General Inquiry |
| `message`      | Message body       |

Hidden fields:

- `_subject`: Email subject line (e.g. “Contact form submission from yoursite.com”)
- `_next`: Redirect URL after submit (e.g. `https://yoursite.com/thanks/`)

You can customize these in the Formspree dashboard (notifications, integrations, etc.).

---

## 5. Theme custom settings

In **Settings** → **Design** → **Theme settings**, configure:

| Setting                 | Purpose |
|------------------------|---------|
| **Hero headline**      | Main headline on the homepage (e.g. “Untangle complex technical and operational problems.”) |
| **Hero subtext**       | Subtext below the headline |
| **Footer bio**         | Short bio in the footer (e.g. “Independent technical consultant. Systems, automation, applied AI. Souris, PEI.”) |
| **Contact email**      | Email shown on the Contact page and used in the `mailto:` link |
| **Contact form action**| Formspree URL (see step 5) |
| **Navigation layout**  | Logo on the left (default), center, or stacked |
| **Show featured posts**| Toggle featured posts on the blog index |
| **Featured title**     | Title for the featured posts section |

### Branding (manual — do not use Ghost Publication logo/icon)

**Do not set** Publication logo or Publication icon in **Settings** → **General** → **Branding**. The theme uses its own assets and settings to avoid Ghost overrides.

- **Header logo** (theme setting): Upload your logo here. It appears in the header, hero badge, favicon, and social sharing (og:image, twitter:image). Leave empty to use the default theme asset (`assets/images/logo7.png`).
- **Replace the default logo**: Edit or replace `assets/images/logo7.png` in the theme, then rebuild (`npm run zip`).
- **White logo for dark mode**: Upload a light logo for dark theme (header only)

### Other optional settings

- **Color scheme**: Auto, Light, or Dark

---

## 6. Checklist before launch

- [ ] All 5 pages created with correct slugs and templates
- [ ] Homepage set in **Settings** → **General**
- [ ] Navigation links added and ordered
- [ ] Formspree form created and URL added to **Contact form action**
- [ ] **Contact email** set in theme settings
- [ ] **Footer bio** and **Hero headline/subtext** filled in
- [ ] Logo set via **Header logo** (theme setting) or `assets/images/logo7.png` replaced

---

## Troubleshooting

### Contact form doesn’t submit

- Confirm the Formspree URL in theme settings (no trailing slash)
- Check Formspree dashboard for errors or rate limits
- Ensure the Thanks page exists at `/thanks/` so the redirect works

### “Thanks” page shows 404 after form submit

- Create a page with slug `thanks` and template **Thanks**

### Navigation links wrong or missing

- Re-check **Settings** → **Navigation**
- Links use trailing slashes: `/about/`, `/services/`, `/contact/`

### Homepage shows blog instead of custom homepage

- In **Settings** → **General**, set **Homepage** to your Home page (not the default “Latest posts”)
