---
sidebar_position: 2
---

# Local development

Use this layout to run Ghost locally and work on the theme with **live reload**, without zipping and uploading after every change.

## Recommended layout

Keep Ghost and the theme in **sibling directories**:

```
My Projects/
├── ghost-local/          ← Ghost install (ghost install local)
│   ├── content/
│   │   └── themes/
│   │       └── manny-roy → symlink to ../ghost-custom
│   ├── current/
│   └── ...
└── ghost-custom/        ← This theme repo (you are here)
    ├── assets/
    ├── partials/
    ├── default.hbs
    └── ...
```

The theme is **symlinked** into Ghost’s `content/themes/` so edits here are seen by Ghost (restart for new files; template/CSS/JS changes often refresh via livereload).

## One-time setup

### 1. Install Ghost in a sibling directory

**Option A — script (fresh install):** From the directory above this repo (e.g. `My Projects`), run:

```bash
./ghost-custom/scripts/fresh-ghost-local.sh
```

Then start Ghost and link the theme (step 2).

**Option B — manual:** From the directory **above** this repo:

```bash
mkdir -p ghost-local
cd ghost-local
ghost install local
```

Follow the CLI prompts. Ghost runs at **http://localhost:2368** and Admin at **http://localhost:2368/ghost**.

### 2. Link the theme into Ghost

Create a symlink so Ghost loads this theme (theme name in Admin will be **manny-roy**):

```bash
ln -s "/path/to/ghost-custom" "/path/to/ghost-local/content/themes/manny-roy"
```

Or from this repo, run the helper script (adjust paths as needed):

```bash
./scripts/link-theme-to-ghost.sh
```

### 3. Activate the theme in Ghost

1. Open **http://localhost:2368/ghost**
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

This builds CSS/JS to `assets/built/` and watches for changes; livereload will refresh the browser when you edit templates or built assets.

## What you can do

- Edit `.hbs` files → save → refresh (or livereload)
- Edit `assets/css/**/*.css` → Gulp rebuilds `assets/built/screen.css` → refresh
- Edit `assets/js/main.js` → Gulp rebuilds → refresh
- **New files** (new partials, new `.hbs`): run `ghost restart` in the Ghost directory once so Ghost picks them up
- **package.json** (e.g. custom settings): `ghost restart` after changes

## Useful Ghost CLI commands (from ghost-local)

| Command | Purpose |
|--------|---------|
| `ghost start` | Start Ghost |
| `ghost stop` | Stop Ghost |
| `ghost restart` | Restart (e.g. after new theme files or config) |
| `ghost log` | View logs |

## Troubleshooting

If you see errors on restart (e.g. “Cannot read properties of undefined (reading 'members')”):

1. **Node version:** Ghost 6.19+ requires **Node 22**. Use `nvm use 22` (or equivalent) in the Ghost directory.
2. **Full error:** Run `ghost run` (instead of `ghost start`) to see the full stack trace.
3. **Clean restart:** `ghost stop` then `ghost start`.
4. **Reset DB only:** `ghost stop`, remove `content/data`, then `ghost start` (re-run setup if prompted).
5. **Fresh install:** Run `fresh-ghost-local.sh` from above, then start Ghost and link the theme again.

See the repo `docs/local-ghost-setup.md` for more detail and platform-specific notes.
