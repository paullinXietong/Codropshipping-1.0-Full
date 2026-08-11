# Codropshipping 1.0 完整版部署手册

本文供 IT 在独立服务器部署。当前工作只生成本地可交付版本，不会自动推送 GitHub 或操作生产环境。

## 1. 生产拓扑

| 入口 | 服务 | 用途 |
| --- | --- | --- |
| `/` | `ui` | Codropshipping 1.0 官网、浏览与选品 |
| `/admin/*` | `ui` | 与官网同镜像、同容器的全新客户工作台 |
| `/listing-api/*` | `listing-api` | 草稿、AI 文案/图片、翻译与 Shopify 发布编排 |
| `/search-api/*` | `search-api` | 商品搜索与筛选 |
| `/api/*`、`/mall-api/*` | `ui` 内部 Nginx | 复用现有 CoD 业务 API |

Docker 只将统一 `ui` 容器映射到宿主机端口，`listing-api` 和 `search-api` 不映射公网端口。官网与客户后台是一份不可分割的镜像，删除了 Caddy 服务和旧 `/admin` 上游。刊登 SQLite 使用 Docker 命名卷，搜索服务通过只读/最小权限数据库账号连接现有 MySQL 网络。

## 2. 上线前准备

1. 安装 Docker Engine 26+ 与 Docker Compose v2。
2. 准备域名 DNS、可用的 HTTP 宿主机端口和外部数据库 Docker 网络。若服务器已有 HTTPS Nginx/负载均衡，只允许整站转发到统一 UI 端口，禁止单独配置 `/admin` 上游。
3. 为搜索服务创建最小权限数据库账号，并准备高强度 `SEARCH_ADMIN_TOKEN`。
4. 在阿里云百炼创建服务端专用 Key。任何曾在聊天、邮件或截图中出现的 Key 和 Shopify 密码必须先轮换。
5. 不得把生产 `.env` 放入仓库。

```bash
cd /opt/codropshipping/Codropshipping-1.0-Full
cp web-search/.env.production.example /etc/codropshipping/codropshipping-1.0.env
chmod 600 /etc/codropshipping/codropshipping-1.0.env
```

编辑 `/etc/codropshipping/codropshipping-1.0.env`，至少配置 `COD_HTTP_PORT`、数据库密码、管理令牌、Qwen Key/Base URL、允许来源。推荐用服务器 Secret Manager 注入同名变量，不落盘明文。

## 3. 构建与启动

发布标签必须唯一，可使用 Git SHA 或发布日期：

```bash
export COD_RELEASE_TAG=2026-08-06.1
docker network inspect cargosoon-production_default >/dev/null
./scripts/validate-deployment.sh /etc/codropshipping/codropshipping-1.0.env
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml build --pull
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml ps
```

如果宿主机 80 端口已被旧服务占用，先设置 `COD_HTTP_PORT=8080`，再让现有 HTTPS 入口把整个域名转发到 `127.0.0.1:8080`。不得为 `/admin` 保留任何旧代理。首次上线后执行：

```bash
./scripts/smoke-test.sh https://你的生产域名
```

再由业务人员完成一次真实但低风险的闭环：登录 → 选品 → List to my store（默认 AI 辅助）→ 审核标题/描述/SEO/图片 → 发布 Shopify → 在 Shopify 和客户工作台核对商品 → 创建测试订单并核对订单同步。禁止在未审核内容时批量发布。

## 4. 健康检查与日志

```bash
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml ps
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml logs --tail=200 ui listing-api search-api
```

应监控：容器健康状态、5xx 比例、发布失败率、Qwen 超时/限流、搜索数据库连接、磁盘空间和备份年龄。不得在日志中打印 Cookie、Authorization、API Key 或完整顾客隐私数据。

## 5. 数据备份与恢复

每天至少备份一次刊登数据库，并把校验过的备份复制到异机/对象存储：

```bash
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml exec listing-api /app/scripts/backup-db.sh
```

恢复前先停刊登服务、保存现有卷快照，并明确指定备份文件：

```bash
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml stop listing-api
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml run --rm -e CONFIRM_RESTORE=yes \
  listing-api /app/scripts/restore-db.sh /app/backups/你的备份.sqlite
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d listing-api
```

恢复脚本会先做 SQLite 完整性检查，并保留恢复前副本。SQLite、WAL、备份和生产 `.env` 均已排除在 Git 之外。

## 6. 回滚

保留至少两个已验收的镜像标签。回滚时不删除数据卷：

```bash
export COD_RELEASE_TAG=上一稳定标签
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d --no-build
./scripts/smoke-test.sh https://你的生产域名
```

若变更涉及数据格式，应先按该版本迁移说明恢复兼容备份。禁止使用 `down -v`，它会删除持久化数据。

## 7. 当前技术边界

- AI 文案与翻译依赖真实 Qwen 服务端配置；Key 缺失时生产服务会拒绝启动，不会伪装成功。
- AI 图片质量受所选视觉模型和原图质量影响，仍需客户审核；系统提供多风格生成，不保证商品事实识别零误差。
- Shopify 发布继续调用现有 CoD 发布接口和店铺授权。生产验收必须确认店铺授权、发货仓、变体、价格和库存规则。
- 旧 Vue 2 客户端运行依赖已做到无 Critical；其历史构建链仍有 High 级开发期告警，详见 `TECH_DEBT.md`，不进入最终 Nginx 运行镜像。
