#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install from https://nodejs.org/" >&2
  exit 1
fi

if [[ ! -d node_modules ]]; then
  echo "Installing cv dependencies..."
  npm install
fi

npm run build
