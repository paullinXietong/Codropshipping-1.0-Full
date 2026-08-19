#!/usr/bin/env sh
set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
ENV_FILE=${1:-/etc/codropshipping/codropshipping-1.0.env}
COMPOSE_FILE="$ROOT_DIR/web-search/docker-compose.yml"

"$ROOT_DIR/scripts/validate-deployment.sh" "$ENV_FILE"

docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" build --pull
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --remove-orphans
docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" ps

echo "Codropshipping 3.0 Vue 3 is deployed. Run the production smoke test before business acceptance."
