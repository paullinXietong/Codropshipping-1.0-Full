#!/usr/bin/env sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)

node - "$ROOT_DIR" <<'NODE'
const fs = require('node:fs')
const path = require('node:path')
const root = process.argv[2]
const expected = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim()
const packages = [
  'web-search/package.json',
  'member-center/package.json',
  'listing-backend/package.json',
  'web-search/search-backend/package.json',
]
for (const relative of packages) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'))
  if (manifest.version !== expected) throw new Error(`${relative} is ${manifest.version || 'unversioned'}, expected ${expected}`)
}
console.log(`Version consistency passed: ${expected}`)
NODE

"$ROOT_DIR/scripts/check-secrets.sh"

(cd "$ROOT_DIR/listing-backend" && npm test)
(cd "$ROOT_DIR/web-search/search-backend" && npm test)
(cd "$ROOT_DIR/member-center" && npm run lint:release && npm run build)
(cd "$ROOT_DIR/web-search" && NUXT_IGNORE_LOCK=1 npm run build)

if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  docker compose --env-file "$ROOT_DIR/web-search/.env.production.example" \
    -f "$ROOT_DIR/web-search/docker-compose.yml" config --quiet
  docker compose --env-file "$ROOT_DIR/web-search/.env.production.example" \
    -f "$ROOT_DIR/web-search/docker-compose.yml" build ui
  docker run --rm --entrypoint nginx codropshipping/ui:1.0.0 -t
else
  echo "Docker is unavailable; unified UI image validation must run in CI or on the IT host."
fi

echo "Codropshipping 1.0 source readiness checks passed."
