#!/usr/bin/env bash
# Genera un ZIP autocontenido mediante la allowlist del manifiesto.
# Uso: ./build-skill.sh [ruta-salida.zip] (también acepta extensión .skill legada)
set -euo pipefail
DS="$(cd "$(dirname "$0")" && pwd)"
if [[ $# -gt 0 ]]; then
  exec node "$DS/scripts/build-skill.mjs" "$1"
else
  exec node "$DS/scripts/build-skill.mjs"
fi
