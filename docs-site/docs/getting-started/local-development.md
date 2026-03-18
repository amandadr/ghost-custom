---
sidebar_position: 2
---

# Local development

This layout is how we run Ghost locally and work on the theme with **live reload**, without zipping and uploading after every change.

## Recommended layout

Keep Ghost and the theme in **sibling directories**:

```text
My Projects/
├── ghost-local/          ← Ghost install (ghost install local)
│   ├── content/
│   │   └── themes/
│   │       └── manny-roy → symlink to ../ghost-custom
│   ├── current/
│   └── ...
└── ghost-custom/        ← This theme repo (current location)
    ├── assets/
    ├── partials/
    ├── default.hbs
    └── ...
```

The theme is **symlinked** into Ghost’s `content/themes/` so edits here are seen by Ghost (restart for new files; template/CSS/JS changes often refresh via livereload).

## Initial setup

### 1. Install Ghost in a sibling directory

**Option A — script (fresh install):** From the directory above this repo (e.g. `My Projects`), we run:

```bash
./ghost-custom/scripts/fresh-ghost-local.sh
```

After that, we start Ghost and link the theme.

**Option B — manual:** From the directory **above** this repo:

```bash
mkdir -p ghost-local
cd ghost-local
ghost install local
```

Complete the CLI prompts. Ghost runs at **<http://localhost:2368>** and Admin at **<http://localhost:2368/ghost>**.

### 2. Link the theme into Ghost

We create a symlink so Ghost loads this theme (theme name in Admin will be **manny-roy**):

```bash
ln -s "/path/to/ghost-custom" "/path/to/ghost-local/content/themes/manny-roy"
```

Or from this repo, run the helper script (adjust paths as needed):

```bash
./scripts/link-theme-to-ghost.sh
```

### 3. Activate the theme in Ghost

1. Open **<http://localhost:2368/ghost>**
2. Complete setup (owner account, site title) if first run
3. Go to **Settings → Design**
4. Under “Installed themes”, select **manny-roy** and click **Activate**

### 4. Restart Ghost after adding the symlink

```bash
cd ghost-local
ghost restart
```

## Daily workflow

**Terminal 1 — Ghost:**

```bash
cd ghost-local
ghost start
```

**Terminal 2 — Theme build and watch:**

```bash
cd ghost-custom
yarn dev
```

This builds CSS/JS to `assets/built/` and watches for changes; livereload refreshes the browser when templates or built assets are edited.

## What the workflow responds to

- Editing `.hbs` files → saving triggers a browser refresh (or livereload)
- Editing `assets/css/**/*.css` → Gulp rebuilds `assets/built/screen.css` → browser refresh
- Editing `assets/js/main.js` → Gulp rebuilds → browser refresh
- **New files** (new partials, new `.hbs`): we run `ghost restart` in the Ghost directory once so Ghost picks them up
- **package.json** (e.g. custom settings): we run `ghost restart` after changes

## Useful Ghost CLI commands (from ghost-local)

- `ghost start` — Start Ghost
- `ghost stop` — Stop Ghost
- `ghost restart` — Restart (e.g. after new theme files or config)
- `ghost log` — View logs

## Troubleshooting

When restart errors appear (e.g. “Cannot read properties of undefined (reading 'members')”):

1. **Node version:** Ghost 6.19+ requires **Node 22**. We use `nvm use 22` (or equivalent) in the Ghost directory.
2. **Full error:** We use `ghost run` (instead of `ghost start`) to see the full stack trace.
3. **Clean restart:** We do `ghost stop` then `ghost start`.
4. **Reset DB only:** We use `ghost stop`, remove `content/data`, then `ghost start` (re-run setup if prompted).
5. **Fresh install:** We run `fresh-ghost-local.sh` from above, then start Ghost and link the theme again.

See the repo `docs/local-ghost-setup.md` for more detail and platform-specific notes.
