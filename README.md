# Manny Roy

Custom Ghost theme foundation for **Manny Roy Consulting**. Built for clarity, accessibility, and sustainable technical storytelling — systems-focused and reader-friendly.

Originally forked from [Ghost Dawn](https://github.com/TryGhost/Dawn); customized as the official theme foundation for this site.

---

## Quick start

1. In Ghost Admin go to **Settings → Design**.
2. Upload the theme zip (see **Build for production** below) or use the local development setup.

---

## Development

Built with Gulp and PostCSS. From the theme root:

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

## Project docs

- [Brand foundation & positioning](docs/brand-brainstorming.md)
- [Development plan (site architecture, layout)](docs/dev-plan-1.md)
- [Accessible color palette](docs/colurs.md)
- [Local Ghost setup](docs/local-ghost-setup.md)

---

## License

MIT. See [LICENSE](LICENSE). Based on Dawn by Ghost Foundation; customizations © Amanda Roy.
