#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")/.."

PATTERN='(sk-[A-Za-z0-9._-]{24,}|gh[pousr]_[A-Za-z0-9_]{30,}|AKIA[0-9A-Z]{16}|BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY|Shopify\.Codropshipping[0-9]+)'

# In a working tree, scan tracked/staged source so local runtime secrets do not
# create false positives. A release archive has no .git directory, so scan its
# packaged files while excluding examples, dependencies and this scanner.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git grep -I -n -E "$PATTERN" \
    -- . ':!package-lock.json' ':!**/package-lock.json' ':!scripts/check-secrets.sh'; then
    echo "Potential credential found in tracked source. Remove it and rotate the credential." >&2
    exit 1
  fi
  UNTRACKED_RESULT=$(git ls-files --others --exclude-standard | while IFS= read -r file; do
    if [ "${file##*/}" = "package-lock.json" ] || [ "$file" = "scripts/check-secrets.sh" ]; then
      continue
    fi
    grep -I -H -n -E "$PATTERN" "$file" 2>/dev/null || true
  done)
  if [ -n "$UNTRACKED_RESULT" ]; then
    printf '%s\n' "$UNTRACKED_RESULT"
    echo "Potential credential found in untracked release source. Remove it and rotate the credential." >&2
    exit 1
  fi
  echo "Tracked and untracked release-source secret scan passed."
else
  if grep -R -I -n -E "$PATTERN" . \
    --exclude='package-lock.json' \
    --exclude='check-secrets.sh' \
    --exclude='*.example' \
    --exclude-dir='node_modules' \
    --exclude-dir='dist' \
    --exclude-dir='.nuxt' \
    --exclude-dir='.output'; then
    echo "Potential credential found in packaged source. Remove it and rotate the credential." >&2
    exit 1
  fi
  echo "Packaged-source secret scan passed."
fi
