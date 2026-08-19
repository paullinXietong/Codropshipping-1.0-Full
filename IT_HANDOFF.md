# Codropshipping 3.0 完整版（Vue 3）- IT 测试环境交接

## 交付物

- 发布包：`Codropshipping-3.0-Full-*.tar.gz`
- 完整性校验：同名 `.sha256`
- 部署入口：`DEPLOYMENT.md`
- 上线验收：`RELEASE_CHECKLIST.md`
- 示例配置：`web-search/.env.production.example`

发布包仅包含最新版源码、锁文件、容器配置、自动化测试和部署文档。它不包含 `.git`、`node_modules`、构建缓存、历史页面、运行数据库、日志、备份或真实密钥。

## IT 必须提供或确认的外部条件

1. Docker Engine 26+、Docker Compose v2，以及公网 80/443 端口。
2. 测试域名、正确 DNS 和一个可映射到统一 UI 容器的宿主机端口；仓库不再包含 Caddy。
3. 可访问现有 CoD API 的网络环境。
4. 搜索 MySQL 的 Docker 外部网络、最小权限账号和密码。
5. 已轮换的 Qwen 服务端 Key、兼容接口 Base URL、原生多模态 Base URL及可用模型名。
6. 可用于验收的 Shopify 测试店铺授权，以及正确的发货仓、商品和库存规则。
7. 独立随机生成的 `SEARCH_ADMIN_TOKEN`，以及与测试域名一致的 `LISTING_ALLOWED_ORIGINS`。

任何曾出现在聊天、截图或临时文件里的 API Key、平台密码都不能直接用于测试网，必须先轮换。

## 服务与接口

| 服务 | 内部职责 | 公网路径 |
| --- | --- | --- |
| `ui` | 同一镜像内的官网、商品详情和全新客户工作台 | `/`、`/admin/*` |
| `listing-api` | 草稿、AI 文案/翻译/图片、Shopify 发布编排 | `/listing-api/*` |
| `search-api` | 商品搜索、筛选、索引及上游降级 | `/search-api/*` |

Shopify 使用现有 CoD 授权与发布接口。Amazon、TikTok Shop、WooCommerce、eBay 及客户自有平台在销售渠道中保留统一接入入口；新平台提交后仍需要 IT 根据对方 API 文档、OAuth/签名方式、Webhook 和字段映射开发并验收对应适配器，不能仅凭一个网址自动完成真实对接。

## 最短部署步骤

```bash
tar -xzf Codropshipping-3.0-Full-*.tar.gz
cd Codropshipping-3.0-Full
cp web-search/.env.production.example /etc/codropshipping/codropshipping-1.0.env
# 由 Secret Manager 或 IT 填写真实测试环境配置
./scripts/validate-deployment.sh /etc/codropshipping/codropshipping-1.0.env
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml build --pull
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d
./scripts/smoke-test.sh https://测试域名
```

如果测试服务器已有 HTTPS 代理，应只把整个域名转发到 `COD_HTTP_PORT`，不得继续保留 `/admin` 的旧转发规则。

最后由业务人员完成一次低风险真实闭环：登录 → 搜索/选品 → List to my store（默认 AI 辅助）→ 审核文案、SEO、图片、变体、价格、库存和发货仓 → 发布 Shopify → Shopify 后台核对 → 创建测试订单 → 客户工作台核对订单与履约。
