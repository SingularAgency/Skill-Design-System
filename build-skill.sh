#!/usr/bin/env bash
# Regenera el bundle .skill (snapshot del repo) para subir a Cowork.
# Uso: ./build-skill.sh [ruta-salida.skill]
set -e
DS="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$HOME/Documents/Work/Singular/singular-design-system.skill}"
TMP="$(mktemp -d)"; mkdir -p "$TMP/singular-design-system"
rsync -a \
  --exclude='.git' --exclude='previews' --exclude='PLAN.md' \
  --exclude='/README.md' \
  --exclude='index.html' --exclude='*.skill' --exclude='.DS_Store' \
  --exclude='build-skill.sh' \
  "$DS/" "$TMP/singular-design-system/"
rm -f "$OUT"
( cd "$TMP" && zip -r -q -X "$OUT" singular-design-system )
rm -rf "$TMP"
echo "✓ bundle generado: $OUT"
