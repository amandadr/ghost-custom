# Page copy: section-based templates (edit in theme files)

About, Services, Contact, and Thanks use **section-based templates**: each page has a fixed layout (hero, two-column, cards, Olive block, CTA) with copy **inside the template files** (`.hbs`). The page body in the Ghost editor is **not** used for these pages.

---

## How section-based editing used to work (theme settings)

The original approach was **theme custom settings**: each section (e.g. “About hero title”, “About intro paragraph 1”) was a separate field in **Ghost Admin → Settings → Design → Theme**. The template then used `@custom.about_hero_title`, `@custom.about_intro_p1`, etc. That gave you:

- Section-by-section editing in the Ghost UI  
- No need to redeploy the theme to change copy  
- Exact control over layout (two-column, cards, Olive block)  

**Why we can’t use it for all pages:** Ghost allows **at most 20 custom settings** for the whole theme. We need those 20 for: logo, navigation, fonts, homepage hero, footer, contact email, form URL, and the Ghost application page (hero, CTA, posts heading). Adding separate fields for every About/Services/Contact/Thanks section would require dozens of keys, so Ghost shows a theme error.

---

## How it works now (copy in templates)

Copy for About, Services, Contact, and Thanks lives **in the theme**:

| Page     | Template file        | Where to edit copy                          |
|----------|----------------------|---------------------------------------------|
| About    | `page-about.hbs`     | Edit the template; copy is in the markup.  |
| Services | `page-services.hbs`  | Same.                                       |
| Contact  | `page-contact.hbs`   | Same (email and form action come from Settings). |
| Thanks   | `page-thanks.hbs`    | Same.                                       |

After you change a template, save, run `yarn zip` (or your build), and re-upload/activate the theme in Ghost (or use your local theme symlink so changes appear on refresh).

---

## What is still editable in Ghost Admin

- **Settings → Design → Theme:** Homepage hero (headline, subtext), featured posts title, footer bio, contact email, contact form action URL, Ghost application page (hero title/subtext, CTA headline/button, posts heading). Navigation, logo, fonts, color scheme.
- **Pages (editor):** Only pages that use the **default** template (e.g. generic “Page” or Work) use the page body; About, Services, Contact, Thanks ignore the page body.

---

## If you want some section editing in the UI again

We could reserve a few of the 20 theme keys for one page (e.g. About): e.g. `about_hero_title`, `about_hero_subtext`, `about_cta_headline`, `about_cta_button`, and use those in the template. The rest of About would stay hardcoded. That would mean dropping or merging other keys (e.g. one fewer ghost setting). If you want to do that, we can pick which page and which sections to expose in Settings.
