# Map: Repurposing existing content into theme documentation

This map ties **existing repo content** and **theme code** to **docs-site pages** that explain how the custom Ghost theme works. It proposes a more sophisticated navigation and content organization than the current placeholders.

---

## 1. Proposed docs navigation (high level)

| Section | Purpose | Audience takeaway |
|--------|---------|--------------------|
| **Welcome** | Entry point, site purpose, what’s where | “This is the single place for theme + site architecture, performance, ops, and AI.” |
| **Getting started** | Install, run, build, validate | “I can run the theme locally and ship it.” |
| **Architecture** | Stack, repo layout, theme system, templates & partials | “I understand how the theme is structured and where to change things.” |
| **Design system** | Tokens, CUBE CSS, colours, typography, spacing, components | “I can add or change UI without breaking the system.” |
| **Templates & pages** | Page types, custom templates, Ghost integration | “I know which template runs where and how to add a page type.” |
| **Performance** | Strategy, assets, fonts, images, JS | “I know how we keep the site fast and what’s in scope.” |
| **Operations** | Deploy, observe, rollback | “I know how to deploy and what to do when things break.” |
| **AI assistant** | Design, scope, safeguards | “I understand how the assistant works and its limits.” |
| **Reference** | Roadmap, decisions, external links | “I can see what’s next and where key decisions live.” |

---

## 2. Source → doc mapping

### 2.1 Repo root & config

| Source | Content | Repurpose into |
|--------|---------|----------------|
| `package.json` | `config` (image_sizes, custom settings), scripts, engines | **Architecture → Stack & repo** (stack, repo layout); **Templates & pages → Theme settings** (custom settings list and usage). |
| `default.hbs` | Layout, head (preload, ghost_head), body classes, nav, footer inclusion | **Architecture → Theme system** (layout and wrappers); **Performance** (critical path, preload). |
| `gulpfile.js` / build scripts | CSS/JS pipeline, zip | **Getting started → Build & assets**; **Operations → Deployment** (build before zip). |

### 2.2 Repo `docs/` (planning & reference)

| Source | Content | Repurpose into |
|--------|--------|----------------|
| `docs/cube-css-structure.md` | CUBE layers, tokens, composition primitives, breakpoints, a11y | **Design system → CUBE CSS & tokens** (primary source). **Design system → Composition** (primitives table). **Design system → Accessibility** (a11y notes). |
| `docs/colurs.md` | Palette, safe pairings, usage rules, section rhythm, CSS tokens | **Design system → Colours** (full palette + usage). **Design system → Section rhythm** (Cream/Paper/Olive/Maroon). Optionally **Templates & pages** (homepage section order). |
| `docs/fonts.md` | Body/heading fonts, sizing, line-height, contrast | **Design system → Typography** (merge with typography.css and design SOP). |
| `docs/sop-design.md` | Design principles, typography/spacing/color systems, layout, responsiveness, a11y | **Design system** intro and guardrails; **Design system → Typography**, **Spacing**, **Colours** (principles only; specifics from colurs/fonts/cube-css). |
| `docs/sop-spacing.md` | Spacing scale, section padding, vertical rhythm, anti-patterns | **Design system → Spacing** (merge with token list from cube-css-structure). |
| `docs/sop-responsiveness.md` | Intrinsic layout, breakpoints, composition primitives, testing | **Design system → Responsiveness**; **Design system → Composition** (align with cube-css-structure). |
| `docs/site-opportunities-improvement.md` | Gaps, performance (jQuery/Owl, fonts, critical path), nav, metadata, images, observability | **Performance** (scripts, fonts, critical path); **Operations** (observability); **Reference** (roadmap). Do not copy verbatim; extract “current state” and “opportunity” into strategy and roadmap. |
| `docs/site overhaul.md` | Goals, deliverables, success criteria, audience | **Reference → Project context** or **Welcome** (short “why this exists”); **Reference → Roadmap** (priorities). |
| `docs/plan-ghost-application-page.md` | Page structure, theme settings, posts strategy, nav | **Templates & pages → Ghost application page**; **Templates & pages → Theme settings** (ghost_* settings). |
| `docs/plan-docs-docusaurus.md` | Docs IA, Docusaurus setup | Keep as internal plan; feed **Welcome** and **Reference** only where relevant. |
| `docs/local-ghost-setup.md` | Local Ghost install, symlink, dev workflow | **Getting started → Local development** (primary source). |
| `docs/ghost-org-setup.md` | (If present) Ghost.org / production setup | **Getting started → Production** or **Operations**. |
| `docs/dev-plan-1.md` | (If present) Dev phases | **Reference → Roadmap** or history. |
| `docs/brand-brainstorming.md`, `docs/page-copy-for-editor.md`, `docs/plan-page-content-editing.md` | Copy and content workflow | **Reference** or **Templates & pages** (only if you add “Content and copy” subsection). |

### 2.3 Theme code (Handlebars & assets)

| Source | Content | Repurpose into |
|--------|--------|----------------|
| **Templates** (`*.hbs` root) | `default.hbs`, `index.hbs`, `home.hbs`, `page.hbs`, `post.hbs`, `author.hbs`, `tag.hbs`, `page-*.hbs`, `custom-*.hbs` | **Architecture → Theme system** (template list and when each is used). **Templates & pages** (one subsection per major template: Home, Index/Blog, Post, Page, Ghost application, custom post templates). |
| **Partials** (`partials/*.hbs`) | `hero`, `content`, `footer`, `cover`, `cta-section`, `loop`, `featured-posts`, `ghost-*`, `service-*`, `project-card`, etc. | **Architecture → Partials** (table: partial name, used by, purpose). **Design system → Components** (hero, CTA, cards) where it helps explain design. |
| **CSS** (`assets/css/`) | `screen.css` import order, `general/`, `site/`, `blog/`, `misc/` | **Architecture → Theme system** (CSS layers and file roles). **Design system → CUBE CSS** (align with cube-css-structure). |
| **CSS files** (e.g. `typography.css`, `brand.css`, `composition.css`) | Design tokens, composition classes | **Design system → Tokens** (from typography + brand); **Design system → Composition** (from composition.css + cube-css). |
| **JS** (`assets/js/`, `built/main.min.js`) | Burger menu, featured carousel, etc. | **Performance → Scripts**; **Architecture** (brief “what the theme JS does”). |
| **Theme settings** (`package.json` → `config.custom`) | All `@custom.*` keys and groups | **Templates & pages → Theme settings** (reference table: key, type, default, group, where used). |

### 2.4 Existing docs-site placeholders

| Current doc | Current state | Action |
|-------------|---------------|--------|
| **intro.md** | Short “about these docs” + quick links | Keep; tighten and align with **Welcome** and new nav. |
| **architecture/overview.md** | Placeholder + short stack list | Expand from **Stack & repo** (package.json, default.hbs, gulp); add “Repo layout” and “How the theme fits the app narrative.” |
| **architecture/theme-system.md** | Placeholder + key concepts | Expand from **Theme system**: partials (from partials/), templates (from *.hbs), CUBE layers (from cube-css-structure + screen.css). Add **Partials** and **Templates** subsections or link to **Templates & pages**. |
| **performance/strategy.md** | Placeholder + goals | Fill from **Performance**: site-opportunities (scripts, fonts, critical path), default.hbs preload, image_sizes, lazy loading. |
| **operations/deployment.md** | Short theme + docs deploy bullets | Expand from **Operations**: local-ghost-setup, build (gulp), test (GScan), zip, upload, rollback. |
| **operations/observability.md** | Placeholder | Fill from **Operations** and site-opportunities (monitoring, health, rollback, optional client-side errors). |
| **ai-assistant/design.md** | Placeholder | Fill when scope is fixed; link to **Reference → Roadmap**. |
| **reference/roadmap.md** | Placeholder | Fill from site overhaul, site-opportunities (priority table), and future work (critical CSS, AI, observability). |

---

## 3. Suggested doc-by-doc structure (for build-out)

Use this to create or rename files and sidebar entries. Order = suggested sidebar order.

### Welcome
- **intro.md** (existing) — Keep as “About these docs”; ensure it links to Getting started and Architecture.

### Getting started
- **getting-started/index.md** — When to use these docs, repo layout one-liner, links to local dev and build.
- **getting-started/local-development.md** — Repurpose `docs/local-ghost-setup.md` (symlink, ghost start, live reload).
- **getting-started/build-and-validate.md** — `yarn dev`, `yarn test` (GScan), `yarn zip`; where built assets go.

### Architecture
- **architecture/overview.md** — Stack (Ghost, Handlebars, Gulp, PostCSS, Docusaurus), repo layout, how theme fits the application narrative. Source: package.json, default.hbs, gulp, plan docs.
- **architecture/theme-system.md** — CUBE layers, CSS file roles (screen.css → general/site/blog/misc), design tokens (typography.css, brand.css). Source: cube-css-structure, screen.css, typography.css.
- **architecture/templates-and-partials.md** (or split) — List of root templates and when Ghost uses them; list of partials with “used in” and purpose. Source: all .hbs files.

### Design system
- **design-system/overview.md** — Short intro: tokens, CUBE, design SOP principles. Source: sop-design philosophy.
- **design-system/colours.md** — Palette, safe pairings, section rhythm, CSS variables. Source: colurs.md.
- **design-system/typography.md** — Fonts, sizes, line-height, max width. Source: fonts.md, typography.css, sop-design.
- **design-system/spacing.md** — Scale, section padding, vertical rhythm. Source: sop-spacing, cube-css-structure (tokens).
- **design-system/composition.md** — Container, stack, cluster, grid, split, switcher; table from cube-css-structure. Source: composition.css, cube-css-structure.
- **design-system/responsiveness.md** — Breakpoints, mobile-first, guardrails. Source: sop-responsiveness, cube-css-structure.
- **design-system/accessibility.md** — Contrast, focus, reduced motion, tap targets. Source: cube-css-structure, colurs (focus rings), sop-design.

### Templates & pages
- **templates/overview.md** — How Ghost picks templates (home, index, page, post, custom); slug → template mapping.
- **templates/home.md** — Homepage: home.hbs, partials used, theme settings (hero, featured, etc.). Source: home.hbs, package.json config.
- **templates/blog-and-index.md** — index, cover, featured-posts; theme settings. Source: default.hbs, index.hbs, partials.
- **templates/post-and-page.md** — post.hbs, page.hbs, content partial, custom page templates (page-about, page-contact, etc.).
- **templates/ghost-application-page.md** — Purpose, structure, theme settings (ghost_*), posts tag. Source: plan-ghost-application-page, page-ghost-application.hbs.
- **templates/theme-settings.md** — Full reference table of `config.custom` (key, type, default, group, usage). Source: package.json.

### Performance
- **performance/strategy.md** (existing) — Goals, baseline, Core Web Vitals; what’s in scope (scripts, fonts, images). Source: site-opportunities §1.3, §1.4, §2.3, §3.1.
- **performance/scripts-and-assets.md** — JS approach (defer, no jQuery/Owl where removed), critical path, preload. Source: default.hbs, site-opportunities.
- **performance/fonts-and-images.md** — Font loading (woff2, preload), image sizes, srcset, lazy loading. Source: package.json image_sizes, site-opportunities, content partial.

### Operations
- **operations/deployment.md** (existing) — Theme: build → test → zip → upload; rollback. Docs: Docusaurus build, Netlify. Source: local-ghost-setup, package.json scripts.
- **operations/observability.md** (existing) — Monitoring, health, rollback, optional client-side errors. Source: site-opportunities §3.3.

### AI assistant
- **ai-assistant/design.md** (existing) — Fill when scope is set; link to roadmap.

### Reference
- **reference/roadmap.md** (existing) — Priorities, v2 ideas, critical CSS, AI, observability. Source: site overhaul, site-opportunities §5.
- **reference/links.md** (optional) — Main site, Ghost application page, blog, external references.

---

## 4. Navigation (sidebar) alignment

- **Sidebar structure** should mirror the sections above: Welcome → Getting started → Architecture → Design system → Templates & pages → Performance → Operations → AI assistant → Reference.
- **Design system** can be one category with multiple docs (overview, colours, typography, spacing, composition, responsiveness, accessibility).
- **Templates & pages** can be one category (overview, home, blog-and-index, post-and-page, ghost-application-page, theme-settings).
- Use **sidebar_position** and ** _category_.json** in docs-site to control order and labels.

---

## 5. Implementation order (suggested)

1. **Create Design system** from repo `docs/` (cube-css, colurs, fonts, SOPs) — highest reuse of existing content.
2. **Expand Architecture** (overview, theme-system, templates-and-partials) from package.json, default.hbs, and .hbs inventory.
3. **Add Getting started** (local-development, build-and-validate) from local-ghost-setup and package.json scripts.
4. **Add Templates & pages** (overview, home, ghost-application-page, theme-settings) from plan-ghost-application and template/partial list.
5. **Fill Performance and Operations** from site-opportunities and deployment notes.
6. **Update Reference (roadmap)** and **intro** to point to the new structure.

This order maximizes repurposing of existing content and gives contributors a clear path from “how do I run it?” to “how do I change the design?” to “how do I ship it?”
