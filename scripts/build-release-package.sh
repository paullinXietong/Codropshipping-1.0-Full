#!/usr/bin/env sh

set -eu

ROOT_DIR=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
VERSION=$(tr -d '[:space:]' < "$ROOT_DIR/VERSION")
PACKAGE_ROOT="Codropshipping-1.0-Full"
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
OUTPUT_DIR=${1:-"$ROOT_DIR/../releases"}
ARCHIVE="$OUTPUT_DIR/${PACKAGE_ROOT}-${STAMP}.tar.gz"
CHECKSUM="$ARCHIVE.sha256"
TEMP_DIR=$(mktemp -d "${TMPDIR:-/tmp}/codropshipping-1.0-release.XXXXXX")
STAGE_DIR="$TEMP_DIR/$PACKAGE_ROOT"

cleanup() {
  case "$TEMP_DIR" in
    "${TMPDIR:-/tmp}"/codropshipping-1.0-release.*) rm -rf "$TEMP_DIR" ;;
    *) echo "Refusing to remove unexpected temporary path: $TEMP_DIR" >&2 ;;
  esac
}
trap cleanup EXIT INT TERM

if [ "$VERSION" != "1.0.0" ]; then
  echo "VERSION must be 1.0.0 for the Codropshipping 1.0 package." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR" "$STAGE_DIR"

rsync -a "$ROOT_DIR/" "$STAGE_DIR/" \
  --include='.env.example' \
  --include='.env.*.example' \
  --exclude='.git' \
  --exclude='.env' \
  --exclude='.env.*' \
  --exclude='node_modules' \
  --exclude='.nuxt' \
  --exclude='.output' \
  --exclude='dist' \
  --exclude='coverage' \
  --exclude='.cache' \
  --exclude='*.log' \
  --exclude='*.sqlite' \
  --exclude='*.sqlite-shm' \
  --exclude='*.sqlite-wal' \
  --exclude='backups' \
  --exclude='release' \
  --exclude='releases' \
  --exclude='web-search/openspec' \
  --exclude='web-search/AGENTS.md' \
  --exclude='web-search/pages/index_old.vue' \
  --exclude='member-center/src/views/Dashboard_old.vue' \
  --exclude='member-center/src/views/Dashboards.vue' \
  --exclude='member-center/README.md' \
  --exclude='member-center/README.en.md' \
  --exclude='.DS_Store'

if find "$STAGE_DIR" -type f -name '.env*' ! -name '.env.example' ! -name '.env.*.example' | grep -q .; then
  echo "Release staging contains a non-example environment file." >&2
  exit 1
fi

if find "$STAGE_DIR" -type f \( -name '*.sqlite' -o -name '*.sqlite-shm' -o -name '*.sqlite-wal' \) | grep -q .; then
  echo "Release staging contains a runtime database." >&2
  exit 1
fi

if grep -R -I -n -E \
  '(sk-[A-Za-z0-9._-]{24,}|gh[pousr]_[A-Za-z0-9_]{30,}|AKIA[0-9A-Z]{16}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|Shopify\.Codropshipping[0-9]+)' \
  --exclude='package-lock.json' \
  --exclude='check-secrets.sh' \
  --exclude='build-release-package.sh' \
  "$STAGE_DIR"; then
  echo "Potential credential found in release staging. Package was not created." >&2
  exit 1
fi

if grep -R -I -n -E '(CoD 0\.2|CoD-0\.2|cod-0\.2|codropshipping-2)' \
  --exclude='build-release-package.sh' "$STAGE_DIR"; then
  echo "Legacy release naming found in release staging. Package was not created." >&2
  exit 1
fi

printf '%s\n' \
  'Product: Codropshipping 1.0 完整版' \
  "Version: $VERSION" \
  "Package root: $PACKAGE_ROOT" \
  "Created UTC: $STAMP" \
  'Services: unified-ui (storefront + member-center), listing-api, search-api' \
  'Runtime secrets included: no' \
  'Runtime databases included: no' \
  'Dependencies/build caches included: no' \
  'Deployment entry: DEPLOYMENT.md' \
  'Acceptance checklist: RELEASE_CHECKLIST.md' \
  > "$STAGE_DIR/RELEASE-MANIFEST.txt"

(
  cd "$STAGE_DIR"
  find . -type f ! -name 'SOURCE-SHA256SUMS' | LC_ALL=C sort | while IFS= read -r file; do
    shasum -a 256 "$file"
  done > SOURCE-SHA256SUMS
)

tar -C "$TEMP_DIR" -czf "$ARCHIVE" "$PACKAGE_ROOT"
(cd "$OUTPUT_DIR" && shasum -a 256 "$(basename "$ARCHIVE")") > "$CHECKSUM"

echo "Release package created: $ARCHIVE"
echo "Checksum file created: $CHECKSUM"
