#!/usr/bin/env bash
# Remove ghost-local (if it exists), create it, and run ghost install local.
# Run from anywhere; ghost-local is created in the same parent folder as this repo (e.g. My Projects).
#
# Usage from My Projects:
#   ./ghost-custom/scripts/fresh-ghost-local.sh
# Or from ghost-custom:
#   ./scripts/fresh-ghost-local.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJECTS_DIR="$(cd "$THEME_ROOT/.." && pwd)"
GHOST_DIR="$PROJECTS_DIR/ghost-local"

echo "Projects directory: $PROJECTS_DIR"
echo "Ghost install path: $GHOST_DIR"
echo ""

if [[ -d "$GHOST_DIR" ]]; then
  echo "Removing existing ghost-local..."
  rm -rf "$GHOST_DIR"
fi

echo "Creating ghost-local..."
mkdir -p "$GHOST_DIR"

# Ghost v6.x requires Node ^22.13.1 — ensure we use it (nvm)
if [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  echo "Loading nvm and using Node 22.13.1..."
  # shellcheck source=/dev/null
  source "$HOME/.nvm/nvm.sh"
  nvm use 22.13.1 || nvm install 22.13.1
  echo "Node: $(node -v)"
elif command -v nvm &>/dev/null; then
  nvm use 22.13.1 || nvm install 22.13.1
  echo "Node: $(node -v)"
else
  echo "Warning: nvm not found. Ghost v6 requires Node ^22.13.1. Current: $(node -v 2>/dev/null || echo 'node not in PATH')"
  read -r -p "Continue anyway? [y/N] " reply
  [[ "${reply,,}" =~ ^y ]] || exit 1
fi

echo "Running ghost install local (follow the prompts)..."
cd "$GHOST_DIR"
echo "22" > .nvmrc
ghost install local

echo ""
echo "Done. To start Ghost: cd $GHOST_DIR && nvm use && ghost start"
echo "To link this theme: ./ghost-custom/scripts/link-theme-to-ghost.sh $GHOST_DIR"
echo "  (or from theme repo: ./scripts/link-theme-to-ghost.sh $GHOST_DIR)"
