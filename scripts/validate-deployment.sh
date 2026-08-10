#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
ENV_FILE=${1:-"$ROOT_DIR/web-search/.env.production"}

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing production environment file: $ENV_FILE" >&2
  exit 1
fi

if grep -Eq '(^|=)(replace-with|codropshipping\.example\.com|https://YOUR_WORKSPACE)' "$ENV_FILE"; then
  echo "Production environment still contains example placeholders: $ENV_FILE" >&2
  exit 1
fi

"$ROOT_DIR/scripts/check-secrets.sh"

docker compose --env-file "$ENV_FILE" \
  -f "$ROOT_DIR/web-search/docker-compose.yml" config --quiet

docker run --rm \
  -e COD_PUBLIC_HOST=codropshipping.example.com \
  -e COD_UPSTREAM_HOST=codropshipping.com \
  -e COD_MALL_UPSTREAM_HOST=v2.cargosoon.online \
  -v "$ROOT_DIR/web-search/Caddyfile:/etc/caddy/Caddyfile:ro" \
  caddy:2.10-alpine caddy validate --config /etc/caddy/Caddyfile

echo "Deployment configuration is valid."
