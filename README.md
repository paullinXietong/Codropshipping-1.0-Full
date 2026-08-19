# Codropshipping 3.0 完整版（Vue 3）

![Release](https://img.shields.io/badge/release-v3.0.0-f15a24)
![Frontend](https://img.shields.io/badge/frontend-Vue%203-42b883)
![Deployment](https://img.shields.io/badge/deployment-Docker-2496ed)

这是 Codropshipping 3.0 官网、客户工作台和服务端编排的一体化源码包。官网与新版客户后台由同一个 Nuxt 3 / Vue 3 生产构建提供，不包含旧 Vue 2 后台运行时。它包含选品、全球语言、AI 刊登、Shopify 发布、订单/履约/库存/财务/洞察、商品搜索以及生产部署拓扑。版本号以根目录 [VERSION](./VERSION) 为准；本地演示见 [LOCAL_DEMO.md](./LOCAL_DEMO.md)，IT 部署见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 目录

- `web-search/`：统一的 Nuxt 3 / Vue 3 官网与客户工作台、商品搜索后端和单一 UI Docker 配置。
- `member-center/src/`：客户工作台业务页面源码，由 Nuxt 3 直接编译；生产环境不再构建或运行 Vue 2 应用。
- `listing-backend/`：本地刊登编排服务，负责草稿、AI 建议、审阅记录、幂等发布，以及首访/回访/高意向客户线索。
- `start-local-demo.sh`：同时启动官网、会员中心、搜索代理和刊登编排服务。
- `scripts/deploy-production.sh`：供 IT 使用的生产一键验证、构建与启动入口。
- `scripts/build-release-package.sh`：生成不含密钥、数据库、依赖和构建缓存的 1.0 完整发布包。

依赖目录、构建缓存、日志和真实环境变量未包含在源码包中。

## 本地运行

### 1. 官网

```bash
cd web-search
npm ci
npm run dev -- --host 0.0.0.0
```

官网地址：`http://127.0.0.1:3000/`

### 2. 搜索服务

```bash
cd web-search/search-backend
cp .env.example .env
# 修改 .env 中的数据库密码和管理令牌
npm ci
npm start
```

搜索服务地址：`http://127.0.0.1:8788/health`

### 3. 客户工作台

客户工作台已经合并进官网 Vue 3 进程。启动 `web-search` 后直接访问：`http://127.0.0.1:3000/admin/login`。

### 4. 销售线索工作台

设置 `SALES_WORKSPACE_TOKEN` 后访问 `http://127.0.0.1:3000/internal/sales-leads`。该入口不会显示在客户导航中，记录首访、回访和高意向动作，并支持负责人、跟进状态、下次跟进时间和备注。

## 验证

```bash
./scripts/release-readiness.sh
```

## 生成 1.0 完整发布包

```bash
./scripts/build-release-package.sh
```

脚本会生成 `Codropshipping-3.0-Full-<UTC时间>.tar.gz` 和对应 `.sha256`，并自动拒绝包含真实环境变量、数据库、依赖目录、构建缓存、旧版入口或可疑凭证的包。

## 上线说明

生产 Compose 把官网和新客户后台构建为同一个 `ui` 镜像并由 Docker 直接发布；`/` 与 `/admin/*` 不可能部署成不同版本。刊登与搜索 API 作为内部数据服务由该容器转发，不再使用 Caddy。上线前由 IT 按 [DEPLOYMENT.md](./DEPLOYMENT.md) 配置服务器 Secret、外部数据库网络、备份和回滚，并按 [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) 验收。

不要把 `.env`、SQLite 数据库、API Key、Shopify 密码或管理令牌提交到 GitHub。任何曾经通过聊天或截图传递的凭证都必须先轮换。
