# Plan: Page Content Editing System

**Goal:** Make page text editable in the Ghost admin (web app) so that body content in Ghost controls what appears on the site, without redeploying the theme.

**Status:** Implemented (theme custom settings)  
**Last updated:** 2025-03-12

**Implementation note:** To keep the same styles and layout while making text editable, all About, Services, Contact, and Thanks copy is driven by **theme custom settings** (not the page body). Edit in **Ghost Admin → Settings → Design → scroll to theme settings**; fields are grouped as **About**, **Services**, **Contact**, and **Thanks**. Page bodies are no longer used for these templates.

---

## 1. Current state

| Template | Content source | Editable in Ghost? |
|----------|----------------|--------------------|
| **page.hbs** | `{{> "content"}}` → `{{content}}` | ✅ Yes (generic pages) |
| **page-work.hbs** | `{{> "content"}}` | ✅ Yes |
| **home.hbs** | Hero: `@custom.hero_headline` / `hero_subtext`; rest hard-coded | Hero only via Settings; sections no |
| **page-about.hbs** | All copy hard-coded in template | ❌ No |
| **page-services.hbs** | All copy hard-coded in template | ❌ No |
| **page-contact.hbs** | Copy hard-coded; only `@custom.contact_email` and form action dynamic | ❌ No |
| **page-thanks.hbs** | Short thank-you copy hard-coded | ❌ No |

**Summary:** Generic pages and the Work page already use the page body. The homepage, About, Services, Contact, and Thanks pages use static template copy and do not use the Ghost page body.

---

## 2. Strategy: two approaches

### Option A — Full body per page (simplest)

- One Ghost Page per URL (e.g. About, Services, Contact, Thanks).
- Each page uses a **custom template** that keeps the same **layout and sections** (Cream / Paper / Olive / Maroon rhythm) but replaces **section text with `{{content}}`** (or with a single “prose” block that outputs `{{content}}`).
- In the editor, you structure the page with headings (H2, H3), paragraphs, and lists. The theme styles that HTML to match the current look (e.g. `.gh-content` / `.single-content` styles).
- **Pros:** Single source of truth, minimal template logic, easy to edit.  
- **Cons:** Less control over exact section-by-section layout (e.g. strict two-column or card layout) unless we use HTML cards or custom blocks.

### Option B — Section-level editing (hybrid)

- Keep **section structure** in the template (hero, pillars, principles, CTA, etc.).
- Pull **section text from the page body** by either:
  - **Structured body:** Use a convention in the editor (e.g. first H2 + following paragraphs = hero; next H2 + content = next section), and parse or use multiple `{{content}}`-style outputs (Ghost doesn’t natively split body; would require custom theme helper or front-end parsing), or
  - **Custom fields / blocks:** If/when Ghost supports more flexible custom fields per page, map fields to sections (e.g. `hero_headline`, `hero_subtext` already used on home).
- **Pros:** Pixel-perfect control per section.  
- **Cons:** More theme and/or product complexity; may need custom development or wait for Ghost features.

**Recommendation:** Start with **Option A** for About, Services, Contact, and Thanks so that the **main body copy** is editable in Ghost and matches what’s on the site. Preserve existing **section rhythm and wrapper markup** in the template; replace only the **inner text** with one or more `{{content}}` areas (or a single `{{content}}` with clear heading structure). Homepage can stay hybrid (hero from Settings; optional future step: pull more from a “Home” page body).

---

## 3. Scope of work (by template)

### 3.1 Home (home.hbs)

- **Keep:** Hero from `@custom.hero_headline` and `@custom.hero_subtext` (already editable in Ghost Settings).
- **Optional later:** Add a “Home” page in Ghost and use its body for “What I do” / “How I work” / CTA copy (e.g. section headings and one paragraph each), and refactor home.hbs to read from that page’s `{{content}}` if the page exists (otherwise fallback to current static copy).
- **This plan:** No change in initial phase; document as future enhancement.

### 3.2 About (page-about.hbs)

- **Current:** Hero, two-column intro, “Why This Work Exists,” Experience cards, “Outside of Work,” CTA — all static.
- **Target:**
  - Ensure the About **page in Ghost** has the correct slug (`about`) and uses template **About** (page-about).
  - Introduce a **single main content area** (e.g. one `<div class="gh-content">` block) that outputs `{{#post}}{{content}}{{/post}}`, and optionally keep **layout wrappers** (e.g. section containers with class names for rhythm) but move **copy** into the Ghost body.
  - **Simplest implementation:** One section in the template that renders `{{content}}` with existing `.gh-content` / prose styles, and optionally a second “anchor” or CTA section that stays in the template. All other narrative copy (hero, intro, why, experience, outside of work) is moved into the Ghost editor as rich text.
  - **Migration:** Copy current static text from page-about.hbs into the About page body in Ghost (headings + paragraphs + lists). Remove or comment out the hard-coded blocks in the template and replace with `{{content}}` (and any fixed CTA partial).

### 3.3 Services (page-services.hbs)

- **Current:** Hero, three service blocks, “How engagement works,” “Process” steps, CTA — all static.
- **Target:** Same idea as About: one or more regions that render `{{content}}`. Either:
  - **Single body:** Entire page body editable (hero, services intro, engagement, process) as one flow in the editor; template provides section wrappers and CTA only, or
  - **Hybrid:** Keep hero + CTA in template (or from Settings), and one `{{content}}` for the middle “services + engagement + process” content.
- **Migration:** Copy current static content into the Services page in Ghost; refactor template to use `{{content}}` and retain section classes for rhythm.

### 3.4 Contact (page-contact.hbs)

- **Current:** Hero, “Start with context,” contact details (email from `@custom.contact_email`), form, “What to expect,” “Not sure if it’s the right time?” — copy static; form and email dynamic.
- **Target:**
  - Keep **form** and **contact details** (email, location) in the template or from `@custom` (form action, email).
  - Make **narrative copy** editable: hero, intro, “What to expect,” “Not sure if it’s the right time?” from page body.
  - **Implementation:** One or two content areas that output `{{content}}` (e.g. hero + intro in one block, “What to expect” + reassurance in another), or a single body with clear headings and pull contact/form from template between them.
- **Migration:** Copy current static paragraphs into the Contact page body; refactor template to use `{{content}}` for those sections and keep form + contact details as-is.

### 3.5 Thanks (page-thanks.hbs)

- **Current:** Title and two short lines hard-coded.
- **Target:** One Ghost Page (slug `thanks`) with template **Thanks** (page-thanks). Template outputs `{{title}}` and `{{content}}` so the thank-you message is editable.
- **Migration:** Copy current “Thanks for reaching out…” text into the Thanks page body; use `{{title}}` for “Thanks for reaching out.” (or keep a fixed title in template if preferred).

### 3.6 Work (page-work.hbs)

- **No change needed.** Already uses `{{> "content"}}`; page body is editable.

### 3.7 Generic pages (page.hbs)

- **No change needed.** Already use `{{> "content"}}`; any page without a custom template shows full body.

---

## 4. Ghost admin setup (to document and perform)

- **Pages to create or confirm** (with correct slug and template):
  - **Home** — used for routing; homepage template is `home.hbs` (not driven by a single “Home” page body today).
  - **About** — slug `about`, template “About” (page-about).
  - **Services** — slug `services`, template “Services” (page-services).
  - **Contact** — slug `contact`, template “Contact” (page-contact).
  - **Thanks** — slug `thanks`, template “Thanks” (page-thanks).
  - **Work** — slug `work`, template “Work” (page-work).
- **Navigation:** Ensure nav links point to these slugs (e.g. `/about/`, `/services/`, `/contact/`, `/thanks/`, `/work/`).
- **Meta:** For each page, set **Meta title** and **Meta description** in Ghost (Settings → each page) for SEO.

---

## 5. Theme implementation steps (high level)

1. **Backup:** Ensure theme is in version control; tag or branch before edits.
2. **About:** Refactor page-about.hbs to use `{{#post}}{{content}}{{/post}}` for main copy; preserve section wrappers and CTA; add/ensure `.gh-content` styling for typography and spacing; migrate copy into Ghost About page.
3. **Services:** Same pattern for page-services.hbs; migrate copy into Ghost Services page.
4. **Contact:** Refactor page-contact.hbs to use `{{content}}` for narrative blocks; keep form and contact details in template; migrate copy into Ghost Contact page.
5. **Thanks:** Refactor page-thanks.hbs to use `{{title}}` and `{{content}}`; migrate copy into Ghost Thanks page.
6. **CSS:** Reuse or extend existing `.gh-content` / `.single-content` styles so that body content (headings, lists, paragraphs) matches the current design (max-width, spacing, section rhythm if needed).
7. **Accessibility & SEO:** Ensure each page has one H1 (from `{{title}}` or first heading in body); heading hierarchy (H1 → H2 → H3); and that meta title/description are set in Ghost.

---

## 6. Migration checklist (copy from theme → Ghost)

- [ ] **About:** Paste hero, intro, “Why This Work Exists,” Experience, “Outside of Work” into About page body; format with headings and lists.
- [ ] **Services:** Paste hero, three service sections, “How engagement works,” “Process” into Services page body.
- [ ] **Contact:** Paste hero, “Start with context,” “What to expect,” “Not sure if it’s the right time?” into Contact page body.
- [ ] **Thanks:** Paste thank-you title and message into Thanks page (title + body).
- [ ] Set meta title and meta description for each updated page.

---

## 7. Testing and rollback

- **Testing:** After each template change, run `gulp` (or theme build), upload/activate theme, and in Ghost:
  - Edit each page body and confirm changes appear on the live site.
  - Check mobile/responsive and existing section rhythm (Cream/Paper/Olive/Maroon).
  - Confirm form still submits on Contact and Thanks redirect works.
- **Rollback:** Revert theme branch or restore previous template version; no database change required if we only added body content (no schema change).

---

## 8. Optional follow-ups

- **Homepage body:** Add a “Home” page and optionally drive “What I do” / “How I work” / CTA text from its body for full editability.
- **Section-specific custom fields:** If Ghost adds or we implement custom fields per page, map fields (e.g. `hero_subtext`, `section_2_heading`) to sections for stricter control without parsing HTML.
- **Structured content:** If we need multiple independent editable blocks per page, evaluate Ghost’s roadmap for blocks/custom fields or a lightweight custom solution (e.g. HTML card with data attributes and a small JS/CSS layer).

---

## 9. Summary

| Page   | Action |
|--------|--------|
| Home   | No change in initial phase; hero already editable via Settings. |
| About  | Refactor to use `{{content}}`; migrate copy to Ghost About page. |
| Services | Refactor to use `{{content}}`; migrate copy to Ghost Services page. |
| Contact | Refactor to use `{{content}}` for narrative; keep form and email; migrate copy. |
| Thanks | Refactor to use `{{title}}` + `{{content}}`; migrate copy. |
| Work   | Already editable; no change. |

**Result:** Body text for About, Services, Contact, and Thanks will be editable in the Ghost web app and will control the text displayed on the site, with no negative SEO impact and with section rhythm and accessibility preserved where the template still provides structure.
