#!/bin/zsh

set -e

project_dir="${0:A:h}"
listing_dir="$project_dir/listing-backend"
storefront_dir="$project_dir/web-search"
search_dir="$storefront_dir/search-backend"

for required_dir in "$storefront_dir/node_modules" "$search_dir/node_modules"; do
  if [[ ! -d "$required_dir" ]]; then
    print "缺少依赖：$required_dir"
    print "请先按 LOCAL_DEMO.md 执行 npm ci。"
    exit 1
  fi
done

typeset -a demo_pids

cleanup() {
  if (( ${#demo_pids[@]} )); then
    kill ${demo_pids[@]} 2>/dev/null || true
  fi
}

trap cleanup INT TERM EXIT

(cd "$listing_dir" && npm start) &
demo_pids+=($!)

(cd "$search_dir" && npm start) &
demo_pids+=($!)

(cd "$storefront_dir" && npm run dev -- --host 127.0.0.1 --port 3000) &
demo_pids+=($!)

print ""
print "Codropshipping 1.0 完整版正在启动："
print "  官网与商品详情：http://127.0.0.1:3000"
print "  客户端登录：http://127.0.0.1:3000/admin/login"
print "  商品搜索服务：http://127.0.0.1:8788/health"
print "  刊登服务健康检查：http://127.0.0.1:8789/health"
print ""
print "按 Control-C 可同时停止三个服务。"

wait
