# Editable page copy (theme settings)

All page copy for **About**, **Services**, **Contact**, and **Thanks** is now editable in the Ghost admin without changing the layout or styles.

## Where to edit

**Ghost Admin → Settings → Design** → scroll down to the theme’s custom settings. You’ll see groups:

- **About** — Hero, intro, “Why This Work Exists,” Experience (Technical Focus + Industry Experience), Outside of Work, CTA headline/button
- **Services** — Hero, three service blocks (Systems, Custom Software, Automation), How engagement works, Process (4 steps), CTA
- **Contact** — Hero, “Start with context,” “What to expect,” “Not sure if it’s the right time?” (form and email stay in theme)
- **Thanks** — Title and body line

Each field has a default value matching the original site copy. Change any of them and **Save**; the live site updates with the same section structure and styling (Cream / Paper / Olive / Maroon rhythm).

You do **not** need to paste anything into the page editor for these pages. The theme reads everything from these settings.

---

## Reference: original copy (defaults)

If you need to restore or compare, the defaults in `package.json` (and in Settings) are the original strings. Key blocks:

- **About:** Hero “About Manny Roy Consulting” + subtext; “Hi, I’m Manny.” + 4 paragraphs; “Why This Work Exists” + list + statements; Experience (Technical Focus list, Industry Experience list); “Outside of Work” 3 paragraphs; CTA “If you're building something…”
- **Services:** Hero “Technical systems built to last.”; three service sections with intro + includes + ideal; “How engagement works” + list; Process Discovery/Design/Build/Evaluate; CTA “Let’s build something sustainable.”
- **Contact:** “Let’s talk.” + subtext; “Start with context.” + 2 paragraphs; “What to expect” + 3 lines; “Not sure if it’s the right time?” + 1 paragraph.
- **Thanks:** “Thanks for reaching out.” + “I’ve received your inquiry and will get back to you within 1–2 business days.”
