Love this direction. The smiley mark + earthy palette is distinct, warm, and not “tech bro SaaS.” That’s a strength — but it needs intentional structure so it feels **credible + calm**, not novelty-forward.

Below is a **brand-aligned, development-ready site plan** that maps your visual assets to layout, hierarchy, and Ghost theme architecture.

---

# 1️⃣ Brand Alignment Observations (From Your Assets)

### Visual Personality

* Earth tones: mustard, olive, maroon, cream.
* Retro-industrial warmth (food truck energy).
* Friendly but grounded.
* Badge-style circular logo (stamp / seal vibe).

### Strategic Insight

Your mark is playful.
Your work is serious.
The site must balance both.

That means:

* Use the smiley mark sparingly and intentionally.
* Let typography + spacing carry credibility.
* Avoid overusing the circular badge in section backgrounds.

---

# 2️⃣ Overall Site Architecture (Phase 1)

**Primary Pages**

1. Home
2. Services
3. About
4. Work (lightweight case studies or placeholders)
5. Contact

Optional (Ghost-native expansion ready):
6. Writing / Notes
7. Workshops & Speaking (future)

---

# 3️⃣ Global Layout System (Theme-Level Decisions)

## Header

**Left:** Logo (horizontal lockup preferred for desktop)
**Right:** Navigation (Home / Services / Work / About / Contact)

Development notes:

* Use SVG for logo.
* Provide two logo versions:

  * Light background version
  * Dark background version
* Switch via CSS class (`.theme-dark`)

Avoid:

* Large badge logo dominating header height.
* Centered logo nav (feels lifestyle brand).

---

## Footer

Footer should carry personality.

Sections:

* Mini bio (2–3 lines max)
* Navigation repeat
* Location: Souris, PEI
* Social links
* Subtle smiley mark watermark (low opacity)

Development:

* Footer partial
* Background color block (olive or maroon)
* Use inverted logo

---

# 4️⃣ Homepage Structure (Intent + Design + Dev Notes)

## Section 1 — Hero

**Intent:** Immediate positioning clarity.

Elements:

* Small badge logo (not oversized)
* Strong positioning headline
* 1-line subtext
* Primary CTA
* Secondary CTA

Design:

* Clean background (cream or off-white)
* No heavy graphic background
* Generous whitespace

Dev:

* Custom `home.hbs`
* Modular hero partial
* Editable via Ghost page content fields

---

## Section 2 — Capability Overview (3 Pillars)

**Intent:** Explain what you do without overwhelming.

Layout:

* 3-column grid desktop
* Stacked mobile
* Icon optional (very minimal)

Use typography hierarchy, not graphic containers.

Dev:

* `service-card` partial
* Could later be dynamically generated from pages tagged `service`

---

## Section 3 — How You Work

**Intent:** Differentiate you from agencies.

Content type:

* Short principles (Sustainable / Measurable / Collaborative / Maintainable)

Design:

* Subtle background color shift (very light mustard tint)
* No borders, no gimmicks

Dev:

* Static content block
* Reusable “principle-item” partial if desired

---

## Section 4 — Selected Work Preview

**Intent:** Establish proof without full case studies yet.

Elements:

* 2–3 project summaries
* Title
* Short description
* “View Project” link

Dev:

* Either static cards
* Or dynamic loop pulling posts tagged `case-study`

Structure now for future dynamic use.

---

## Section 5 — AI & Systems Highlight

Optional but strategic.

**Intent:** Own your niche positioning.

Not a separate service page.
A credibility anchor.

Keep concise.

---

## Section 6 — Contact CTA

Full-width section.
Stronger color background (olive or maroon).

Elements:

* Clear CTA headline
* Email
* Button
* Minimal form

Dev:

* Use external form handler
* Do NOT rely on Ghost members system yet

---

# 5️⃣ Services Page Structure

Intent: Clarity + qualification.

## 1. Intro

Who it’s for.
What problems you solve.

## 2. Core Service Categories (Expanded)

Each category section should include:

* Short overview
* Example scenarios
* Typical deliverables
* Ideal client type

No pricing.

---

## 3. Engagement Model

Brief explanation:

* Solo consultant
* Collaborative
* Project-based
* Retainer optional

This reduces friction.

---

# 6️⃣ Work Page

Intent: Proof > bragging.

Even if early, structure it properly.

## Each Case Study Should Include:

* Context
* Problem
* Constraints
* Approach
* Outcome
* Impact (metrics if available)

Development:

* Create `post-case-study.hbs`
* Tag posts `case-study`
* Loop dynamically on Work page

---

# 7️⃣ About Page Structure

This page can lean into personality more.

Sections:

1. Short narrative intro
2. Technical background
3. AI teaching + workshops
4. Work philosophy
5. Personal anchor (PEI / food truck history)

Design:

* More text-heavy
* Clean typography
* No gimmicks

---

# 8️⃣ Contact Page

Minimal.

* Email
* Optional short form
* Calendly link if desired
* Location (Souris, PEI)
* No stock map embed

---

# 9️⃣ Design System Plan (Very Important)

Based on your assets:

## Primary Palette

Mustard
Olive
Maroon
Cream

Use them intentionally:

* Cream → primary background
* Olive → primary text accent
* Maroon → secondary accent
* Mustard → highlight + smiley badge

Avoid:

* Using mustard as large text color.
* High saturation everywhere.

---

## Typography

To balance playful logo:

Headline: Serif (editorial credibility)
Body: Clean sans

This contrast stabilizes the brand.

---

# 🔟 Ghost Theme Development Structure

You’ll want:

```
/partials
  header.hbs
  footer.hbs
  hero.hbs
  service-card.hbs
  principle-item.hbs
  project-card.hbs
  cta-section.hbs

/home.hbs
/page-services.hbs
/page-work.hbs
/page-about.hbs
/page-contact.hbs

/post-case-study.hbs
```

Keep:

* CSS modular
* Variables for brand colors
* Dark-mode compatible structure

---

# 11️⃣ What the Brand Should Feel Like

Not:

* Startup AI tool
* Creative agency
* Personal dev portfolio
* Lifestyle blog

Should feel like:

* Thoughtful independent technical consultant
* Warm but serious
* Retro-modern
* Stable
* Built to last

---

# 12️⃣ Phase 2 Expansion Plan

Later you can add:

* Writing section
* Workshop landing page
* Downloadable PDF capability overview
* Speaking engagements
* Client testimonials

But Phase 1 should be:
Focused. Clean. Intentional.
