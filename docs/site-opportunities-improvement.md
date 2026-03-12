# Site Architecture: Opportunities for Improvement, Enhancement & Optimization

This document identifies the strongest opportunities to improve the current Ghost theme and site against the goals in **[site overhaul.md](site%20overhaul.md)**. It is based on a review of the live codebase, theme structure, SOPs, and the 3-week build plan.

---

## 1. High-Impact Opportunities (Align with Plan Priorities)

### 1.1 Add the Ghost Application Landing Page (`/ghost-application/`)

**Gap:** The plan defines a dedicated application landing page with responsibility-to-proof matrix, architecture highlights, and links to docs/posts. The slug must be `ghost-application` (not `ghost`) because `/ghost/` is the Ghost admin portal.

**Opportunity:**
- Use the custom page template `page-ghost-application.hbs` with a Ghost page with slug `ghost-application`.
- Content: responsibility mapping, architecture/implementation highlights, links to docs hub, blog, and key features.
- Keeps the “professional application artifact” and “role-to-feature mapping” in one place and supports the primary deliverable.

**Deliverables to align:** Ghost application landing page (v1 priority #2).

---

### 1.2 Introduce the Docs System

**Gap:** The plan calls for a docs hub at `/docs` with architecture, performance, AI assistant, deployment, and content operations. The theme has no docs-specific templates, no docs information architecture, and no nav entry for docs.

**Opportunity:**
- Define docs as a first-class section: either a Ghost page with slug `docs` that acts as a hub (linking to child pages or tagged posts) or a dedicated docs taxonomy (e.g. “Docs” as primary tag + hierarchy via tags/pages).
- Add `page-docs.hbs` (and optionally `post-docs.hbs` or use existing post template with docs styling) and a docs index.
- Add “Docs” to main navigation and footer.
- Establish internal conventions (see plan: architecture pages, changelog/roadmap, reusable formatting) and document in a “Docs system design” artifact.

**Deliverables to align:** Docs hub, docs IA, Theme architecture doc, Content plan (Core docs to publish).

---

### 1.3 Performance: Scripts and Critical Path

**Current state:**
- **jQuery** is loaded from a CDN in `default.hbs` (render-blocking, external dependency).
- **Owl Carousel** is used in `main.js` for the featured posts section only; it depends on jQuery and adds weight for a single carousel.
- No `defer`/`async` on the main script; no preload for critical assets (e.g. fonts, above-the-fold CSS).

**Opportunity:**
- **Remove or replace jQuery:** Use vanilla JS for burger menu and any other interactions; drop jQuery if no longer needed.
- **Replace Owl Carousel:** Use CSS scroll-snap or a minimal vanilla carousel for the featured feed to eliminate a heavy dependency and improve LCP/JS cost.
- **Non-blocking scripts:** Load `main.min.js` with `defer` (and ensure DOM-ready logic is compatible).
- **Critical path:** Preload key fonts (e.g. IBM Plex Sans 400/600) and consider inlining or preloading critical CSS for above-the-fold content; document baseline Lighthouse and Core Web Vitals before/after.

**Deliverables to align:** Performance work and measurement, asset budget, JS cleanup, before/after performance documentation.

---

### 1.4 Font and Asset Optimization

**Current state:**
- Fonts are TTF only (`fonts.css`); no woff2 for better compression and faster load.
- `font-display: swap` is already used (good).
- No `<link rel="preload">` for critical fonts.

**Opportunity:**
- Add woff2 versions of IBM Plex Sans and IBM Plex Serif (and reference them in `@font-face` with fallback to TTF).
- Preload the one or two critical font files used above the fold.
- Document font loading strategy in the performance/theme docs.

**Deliverables to align:** Improved font loading strategy, performance optimization.

---

### 1.5 Navigation and Information Hierarchy

**Gap:** Footer nav is hardcoded (Home, About, Services, Contact). The plan’s top-level structure includes `/`, `/ghost-application/`, `/docs`, `/blog`, and `/about` or `/resume`. Blog and Docs are not yet in nav.

**Opportunity:**
- Use Ghost’s **navigation** config (already in use in the header via `{{navigation}}`) as the single source of truth; ensure footer mirrors or derives from it so adding “Blog” and “Docs” (and “Ghost” application page) is done in one place.
- Add “Blog” and “Docs” (and the Ghost application page when created) to the default nav in `package.json` or via docs so the site map matches the plan.
- Optionally add a “Resume” or “About” distinction per plan (e.g. “About” vs “Resume” link) and keep hierarchy clear.

**Deliverables to align:** Improved navigation and information hierarchy, fast path to resume, Ghost page, docs, and blog.

---

## 2. Enhancement Opportunities (Quality and Maintainability)

### 2.1 Reusable Partials and Docs-Ready Content

**Current state:** Strong use of partials (hero, service-card, principle-item, cta-section, content, etc.) and CUBE CSS. Post and page content use the `content` partial with responsive images and srcset.

**Opportunity:**
- Add a **docs-oriented layout** or block: e.g. a “docs” wrapper partial or a `page-docs.hbs` that applies consistent typography, optional sidebar/TOC, and doc-specific components (callouts, steps, code blocks) so technical docs feel consistent and docs-ready.
- Reuse existing composition primitives (stack, cluster, grid) and design tokens; document “reusable formatting patterns for technical writing” as in the plan.

**Deliverables to align:** Docs-ready content rendering, reusable formatting patterns.

---

### 2.2 Metadata and Sharing

**Current state:** `default.hbs` sets favicon and og/twitter image only when `@custom.header_logo` is set; `{{ghost_head}}` handles other meta.

**Opportunity:**
- Ensure key pages (home, ghost application page, docs index, important posts) have explicit, compelling meta descriptions and og/twitter tags (via Ghost or theme) so the site shares well as an application artifact.
- Document “consistent metadata and sharing treatment” in the theme/SOP docs.

**Deliverables to align:** Consistent metadata and sharing treatment.

---

### 2.3 Images: Lazy Loading and Consistency

**Current state:** Featured posts and single post/content use `srcset` and sensible `sizes`; Ghost image sizes are defined in `package.json`.

**Opportunity:**
- Add `loading="lazy"` for images below the fold (e.g. in post feed, related posts, featured after first slide) to avoid unnecessary network and layout cost.
- Ensure all content images (e.g. in `content.hbs` and any docs templates) use srcset/sizes and alt (including optional `feature_image_alt`); document image strategy in performance or theme docs.

**Deliverables to align:** Image optimization strategy, reduced layout shift.

---

### 2.4 Cover and Index Behavior

**Current state:** On the index (blog), `default.hbs` shows the cover partial and, when `@custom.show_featured_posts` is true, the featured posts section. The cover shows subscribe/login when `@site.members_enabled` is true.

**Opportunity:**
- Align with “concise positioning” and “fast path to resume, Ghost page, docs, and blog”: if the application is not membership-first, consider making the cover minimal (e.g. no member CTA) or configurable via theme settings so the index can act as a clear blog entry without pushing signup.
- Ensure the **homepage** (custom `home.hbs`) remains the main professional entry and the index is clearly “blog” in nav and structure.

**Deliverables to align:** Clean layout, clear information hierarchy.

---

## 3. Optimization and Technical Debt

### 3.1 CSS Bundle and Critical Path

**Current state:** Single `screen.css` bundle (imports shared-theme-assets, then all theme CSS). CUBE CSS layers and tokens are well defined in `cube-css-structure.md`.

**Opportunity:**
- Keep a single bundle for v1 if simpler; document an **asset budget** (e.g. max size for CSS/JS) and monitor it.
- Longer term: consider critical CSS for above-the-fold on home and post to improve LCP; document as a “before/after” or “future” item if not in v1 scope.

**Deliverables to align:** Asset budget, CSS cleanup, before/after performance documentation.

---

### 3.2 Build and Validation

**Current state:** Gulp builds CSS (PostCSS, autoprefixer, cssnano) and JS (concat, uglify); `yarn test` runs GScan. README documents dev, zip, and local Ghost setup.

**Opportunity:**
- Add a **pre-zip or CI step** that runs `yarn test` (GScan) and optionally a quick lint (e.g. stylelint for CSS) so broken or non-compliant themes are not packaged.
- Document the “Git-based workflow” and “validation and quality checks” from the plan in a short deployment/workflow doc.

**Deliverables to align:** Validation and quality checks, deployment process definition.

---

### 3.3 Observability and Reliability (Planned, Not Yet Implemented)

**Gap:** The plan calls for monitoring/error tracking basics, health checks, and rollback notes. The repo has no deployment or observability docs yet.

**Opportunity:**
- Add a **Deployment and monitoring** doc (even if brief) covering: how the theme is deployed (zip upload, Ghost version), how to roll back (re-upload previous zip), and what to do when something breaks.
- Optionally integrate a lightweight error tracking script (e.g. client-side) and document it; add “broken-link and health checks” as a manual or automated step before launch.

**Deliverables to align:** Observability and reliability basics, release workflow doc, rollback notes.

---

## 4. Scope That Depends on Prior Work

### 4.1 AI Assistant

**Gap:** The plan’s AI assistant (site-native, grounded in site content, chat UI, source-aware answers) is not started. It depends on having stable content and structure (docs, key pages) to ground answers.

**Opportunity:** Treat as post–docs and post–Ghost page: once docs hub and application page exist, scope the assistant’s content surface (e.g. docs + key pages + blog), design the chat UI and API/embed, and document architecture and safeguards. No code changes recommended until docs/IA and application page are in place.

**Deliverables to align:** AI assistant MVP, AI assistant design doc.

---

### 4.2 Public Engineering Narrative

**Gap:** The plan lists specific docs and blog posts (architecture overview, performance notes, build logs, lessons learned, etc.). Most of these do not exist yet.

**Opportunity:** Tie content publishing to feature completion: publish “Architecture overview” and “Baseline audit” as first docs; add “Theme system” and “Performance strategy” as theme and performance work land; add build logs and retrospective as the sprint progresses. This closes the “documentation lags behind implementation” risk in the plan.

**Deliverables to align:** Public architecture writing, build log transparency, Core docs to publish, Core blog posts to publish.

---

## 5. Summary: Priority Order for Implementation

Suggested order to maximize impact against the plan’s **v1 priority order** and **definition of done**:

| Priority | Opportunity | Rationale |
|----------|--------------|-----------|
| 1 | **Ghost application landing page** | Core deliverable; unblocks “role-to-feature” story and links to everything else. |
| 2 | **Docs system** (hub, IA, nav, first docs) | Unblocks AI assistant scope and public narrative; proves “docs as first-class.” |
| 3 | **Performance: scripts (jQuery/Owl, defer)** | High impact on Core Web Vitals and “restrained use of JS”; low risk. |
| 4 | **Navigation** (Blog, Docs, Ghost in nav) | Quick win; makes information hierarchy match the plan. |
| 5 | **Font/asset optimization** (woff2, preload) | Improves LCP and aligns with “improved font loading strategy.” |
| 6 | **Metadata and images** (lazy load, meta) | Polish and performance; supports sharing and LCP/CLS. |
| 7 | **Release workflow and observability docs** | Operational maturity; can be done in parallel with build. |
| 8 | **AI assistant** (after 1–2) | Depends on docs and application page content. |

This document should be updated as the baseline audit is completed and as workstreams ship, so “before/after” and “future” items stay accurate.
