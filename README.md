# Manny Roy

Custom Ghost theme foundation for **Manny Roy Consulting**. Built for clarity, accessibility, and sustainable technical storytelling — systems-focused and reader-friendly.

Originally forked from [Ghost Dawn](https://github.com/TryGhost/Dawn); customized as the official theme foundation for this site.

---

## Quick start

1. In Ghost Admin go to **Settings → Design**.
2. Upload the theme zip (see **Build for production** below) or use the local development setup.

---

## Development

Built with Gulp and PostCSS. This project uses **Yarn** only (do not use `npm install` here; keep one lockfile to avoid resolution conflicts). From the theme root:

```bash
yarn
yarn dev
```

Edit files under `assets/css/`; they compile to `assets/built/`. Handlebars (`.hbs`) and JS changes are picked up on save when using local Ghost.

### Build for production

```bash
yarn zip
```

This creates `dist/manny-roy.zip`, which you can upload in Ghost Admin → Design.

### Validate theme

```bash
yarn test
```

Runs [GScan](https://gscan.ghost.org/) for Ghost compatibility.

---

## Local Ghost development

To run Ghost locally and develop with live reload (no zip/upload each time), use a sibling Ghost install and symlink this repo into its `content/themes/` folder. Full steps: **[docs/local-ghost-setup.md](docs/local-ghost-setup.md)**.

After Ghost is installed:

```bash
./scripts/link-theme-to-ghost.sh ../ghost-local
```

Then in Ghost Admin → Design, activate the theme **manny-roy**.

---

## Site structure: homepage + /blog/ archive

The theme supports a **custom homepage** at `/` (using `home.hbs`) and a **blog archive** at `/blog/` (post listing, cover, and featured posts). The homepage stays as-is; all posts live at `/blog/` and `/blog/{slug}/`.

To enable this structure:

1. In Ghost Admin go to **Settings → Labs**.
2. Under **Routes**, upload or paste the contents of **[docs/routes-blog-archive.yaml](docs/routes-blog-archive.yaml)** (back up your current routes first if you have custom ones).
3. Add **Blog** (or “Writing”) to your nav in **Settings → Design → Navigation** pointing to `/blog/`.

Result: `/` = custom home, `/blog/` = post listing, `/blog/{slug}/` = posts, `/blog/tag/...` and `/blog/author/...` = archives.

---

## Ghost Application landing page

The theme includes a dedicated **Ghost Application** landing page at `/ghost-application/` for the Senior Platform Engineer application. (Slug is `ghost-application` because `/ghost/` is the Ghost admin portal.) To use it:

1. In Ghost Admin, create a **Page** with URL slug **ghost-application** and choose the **Ghost application** template in the page settings.
2. Add a nav item **Ghost** (or “Application”) pointing to `/ghost-application/` in **Settings → Design → Navigation**.
3. Create a tag **Ghost Application** (slug `ghost-application`) and add it to any post you want listed on that page.
4. Edit hero, CTA, and posts heading under **Settings → Design → Theme** in the **ghost** group.

Full plan and content model: **[docs/plan-ghost-application-page.md](docs/plan-ghost-application-page.md)**.

---

## Project docs

- [Brand foundation & positioning](docs/brand-brainstorming.md)
- [Development plan (site architecture, layout)](docs/dev-plan-1.md)
- [Accessible color palette](docs/colurs.md)
- [Local Ghost setup](docs/local-ghost-setup.md)
- [Ghost Application page plan](docs/plan-ghost-application-page.md)
- [Routes for /blog/ archive](docs/routes-blog-archive.yaml) (Settings → Labs → Routes)

---

## License

MIT. See [LICENSE](LICENSE). Based on Dawn by Ghost Foundation; customizations © Amanda Roy.
