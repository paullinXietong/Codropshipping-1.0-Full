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

if docker compose --env-file "$ENV_FILE" \
  -f "$ROOT_DIR/web-search/docker-compose.yml" config --services | grep -qx caddy; then
  echo "Legacy Caddy service is still present in the deployment." >&2
  exit 1
fi

for required_service in ui listing-api search-api; do
  if ! docker compose --env-file "$ENV_FILE" \
    -f "$ROOT_DIR/web-search/docker-compose.yml" config --services | grep -qx "$required_service"; then
    echo "Missing required service: $required_service" >&2
    exit 1
  fi
done

echo "Deployment configuration is valid."
