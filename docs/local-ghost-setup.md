# Local Ghost + theme development setup

Use this layout so you can run Ghost locally and work on this theme with live reload, without zipping and uploading.

## Recommended layout

Keep Ghost and the theme in **sibling directories**:

```
My Projects/
├── ghost-local/          ← Ghost install (created by ghost install local)
│   ├── content/
│   │   └── themes/
│   │       └── manny-roy → symlink to ../ghost-custom
│   ├── current/
│   └── ...
└── ghost-custom/         ← This theme repo (you are here)
    ├── assets/
    ├── partials/
    ├── default.hbs
    └── ...
```

The theme is **symlinked** into Ghost’s `content/themes/` so edits here are seen by Ghost immediately (after restart for new files, or live for changed templates/CSS/JS).

---

## One-time setup

### 1. Install Ghost in a sibling directory

**Option A — script (fresh install anytime):** From `My Projects` (or from anywhere), run:

```bash
./ghost-custom/scripts/fresh-ghost-local.sh
```

This removes `ghost-local` if it exists, creates it, and runs `ghost install local` there. Then run `ghost start` from `ghost-local` and link the theme (step 2).

**Option B — manual:** From a directory **above** this repo (e.g. `My Projects`), create an empty folder and install Ghost:

```bash
cd "/Users/amandaroy/Documents/My Stuff/My Projects"
mkdir -p ghost-local
cd ghost-local
ghost install local
```

Follow the CLI prompts. When it finishes, Ghost runs at **http://localhost:2368** and Admin at **http://localhost:2368/ghost**.

### 2. Link this theme into Ghost

Create a symlink so Ghost loads this theme from your repo (theme name in Admin will be `manny-roy`):

```bash
ln -s "/Users/amandaroy/Documents/My Stuff/My Projects/ghost-custom" \
      "/Users/amandaroy/Documents/My Stuff/My Projects/ghost-local/content/themes/manny-roy"
```

Or run the helper script from this repo:

```bash
./scripts/link-theme-to-ghost.sh
```

### 3. Activate the theme in Ghost

1. Open **http://localhost:2368/ghost**
2. Complete setup (create owner account, site title, etc.) if first run
3. Go to **Settings → Design**
4. Under “Installed themes”, select **manny-roy** and click **Activate**

### 4. Restart Ghost (after adding the symlink)

```bash
cd "/Users/amandaroy/Documents/My Stuff/My Projects/ghost-local"
ghost restart
```

---

## Daily workflow

### Terminal 1: Ghost

```bash
cd "/Users/amandaroy/Documents/My Stuff/My Projects/ghost-local"
ghost start
```

(Use `ghost stop` when done.)

### Terminal 2: Theme build + watch

From this repo:

```bash
cd "/Users/amandaroy/Documents/My Stuff/My Projects/ghost-custom"
yarn dev
```

This builds CSS/JS to `assets/built/` and watches for changes; livereload will refresh the browser when you edit templates or built assets.

### What you can do

- Edit `.hbs` files → save → refresh (or livereload); no zip/upload
- Edit `assets/css/**/*.css` → saved by Gulp to `assets/built/screen.css` → refresh
- Edit `assets/js/main.js` → Gulp rebuilds → refresh
- **New files** (new partials, new .hbs): run `ghost restart` in the Ghost directory once so Ghost picks them up
- **package.json** (e.g. custom settings): `ghost restart` after changes

---

## Useful Ghost CLI commands (run from ghost-local)

| Command           | Purpose                    |
|------------------|----------------------------|
| `ghost start`    | Start Ghost                |
| `ghost stop`     | Stop Ghost                 |
| `ghost restart`  | Restart (e.g. after new theme files or config) |
| `ghost log`      | View logs                  |
| `ghost ls`       | List Ghost instances       |

---

## Optional: ignore Ghost install in Git

If you ever put the Ghost install inside this repo (not recommended), add to `.gitignore`:

```
ghost-local/
```

With the sibling layout above, Ghost lives outside this repo, so nothing to ignore here.

---

## Troubleshooting

### "Cannot read properties of undefined (reading 'members')" on restart/start

This is a known Ghost boot error, usually due to members-related settings in the database being missing or in a bad state (e.g. after an incomplete first run or a bad shutdown).

**1. Get the full error (from your Ghost directory):**
```bash
ghost stop
ghost run
```
Reproduce the error; the console will show the full stack trace. Then Ctrl+C to stop.

**2. Try a clean stop/start (sometimes helps):**
```bash
ghost stop
ghost start
```

**3. Full fresh reinstall (easiest):** From `My Projects` run the script, then start Ghost and re-link the theme:
```bash
./ghost-custom/scripts/fresh-ghost-local.sh
cd ghost-local && ghost start
./ghost-custom/scripts/link-theme-to-ghost.sh ./ghost-local
```
Re-run the setup wizard at http://localhost:2368/ghost if prompted, then activate the theme again in Design.

**3b. Reset only the database (keep Ghost in same folder):** From your Ghost install directory (e.g. `ghost-local/`):
```bash
ghost stop
rm -rf content/data
ghost start
```
Re-run the setup wizard if prompted. This does not run `ghost install local` (that requires an empty directory).

**4. Check logs:** `~/.ghost/logs/` and `content/logs/` (inside your Ghost directory) for more detail.
