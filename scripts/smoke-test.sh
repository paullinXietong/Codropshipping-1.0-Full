#!/usr/bin/env sh
set -eu

BASE_URL=${1:?Usage: smoke-test.sh https://your-domain.example}
BASE_URL=${BASE_URL%/}

check() {
  name=$1
  path=$2
  echo "Checking $name: $BASE_URL$path"
  curl --fail --silent --show-error --location --retry 3 --max-time 20 \
    --output /dev/null "$BASE_URL$path"
}

check "storefront" "/"
check "customer workspace" "/admin/"
check "search API" "/search-api/health"
check "listing API" "/listing-api/health"

echo "Production smoke tests passed."
