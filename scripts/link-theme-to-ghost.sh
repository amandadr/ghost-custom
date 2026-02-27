#!/usr/bin/env bash
# Symlink this theme into a local Ghost install so you can develop with live reload.
# Usage: ./scripts/link-theme-to-ghost.sh [path-to-ghost-root]
# Example: ./scripts/link-theme-to-ghost.sh ../ghost-local

set -e

THEME_NAME="manny-roy"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
GHOST_ROOT="${1:-$(cd "$THEME_ROOT/../ghost-local" 2>/dev/null && pwd)}"

if [[ -z "$GHOST_ROOT" ]] || [[ ! -d "$GHOST_ROOT" ]]; then
  echo "Usage: $0 <path-to-ghost-root>"
  echo "Example: $0 ../ghost-local"
  echo ""
  echo "Ghost root not found. Create it first with:"
  echo "  mkdir -p ../ghost-local && cd ../ghost-local && ghost install local"
  exit 1
fi

THEMES_DIR="$GHOST_ROOT/content/themes"
if [[ ! -d "$THEMES_DIR" ]]; then
  echo "Error: $THEMES_DIR not found. Run 'ghost install local' in $GHOST_ROOT first."
  exit 1
fi

LINK_PATH="$THEMES_DIR/$THEME_NAME"
if [[ -L "$LINK_PATH" ]]; then
  echo "Symlink already exists: $LINK_PATH -> $(readlink "$LINK_PATH")"
  exit 0
fi
if [[ -e "$LINK_PATH" ]]; then
  echo "Error: $LINK_PATH already exists and is not a symlink. Remove or rename it first."
  exit 1
fi

ln -s "$THEME_ROOT" "$LINK_PATH"
echo "Created: $LINK_PATH -> $THEME_ROOT"
echo "Restart Ghost to see the theme: cd $GHOST_ROOT && ghost restart"
echo "Then in Ghost Admin → Design, activate the theme '$THEME_NAME'."
