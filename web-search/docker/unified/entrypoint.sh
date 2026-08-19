#!/usr/bin/env sh
set -eu

template_file=/etc/nginx/templates/default.conf.template
rendered_file=/etc/nginx/http.d/default.conf

envsubst '${COD_UPSTREAM_HOST} ${COD_MALL_UPSTREAM_HOST}' \
  < "$template_file" > "$rendered_file"

nginx -t

su-exec node node /app/web/.output/server/index.mjs &
web_pid=$!
nginx -g 'daemon off;' &
nginx_pid=$!

shutdown() {
  kill -TERM "$web_pid" "$nginx_pid" 2>/dev/null || true
  wait "$web_pid" "$nginx_pid" 2>/dev/null || true
}

trap shutdown INT TERM EXIT

while kill -0 "$web_pid" 2>/dev/null && kill -0 "$nginx_pid" 2>/dev/null; do
  sleep 2
done

echo "A unified UI process exited unexpectedly." >&2
exit 1
