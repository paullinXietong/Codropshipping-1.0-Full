# Codropshipping 1.0 完整版

这是 Codropshipping 1.0 官网、客户工作台和服务端编排的一体化源码包。它包含选品、全球语言、AI 刊登、Shopify 发布、订单/履约/库存/财务/洞察、商品搜索以及生产部署拓扑。版本号以根目录 [VERSION](./VERSION) 为准；本地演示见 [LOCAL_DEMO.md](./LOCAL_DEMO.md)，IT 部署见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 目录

- `web-search/`：Nuxt 官网、浏览选品、商品详情、搜索后端、Docker 与 Caddy 配置。
- `member-center/`：统一客户工作台，包含登录、AI 刊登、渠道、订单、履约、库存、财务和洞察。
- `listing-backend/`：本地刊登编排服务，负责草稿、AI 建议、审阅记录与幂等发布。
- `start-local-demo.sh`：同时启动官网、会员中心、搜索代理和刊登编排服务。
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

### 3. 会员中心

```bash
cd member-center
npm ci
npm run serve -- --host 127.0.0.1 --port 8083
```

登录页面：`http://127.0.0.1:3000/admin/login`

## 验证

```bash
./scripts/release-readiness.sh
```

## 生成 1.0 完整发布包

```bash
./scripts/build-release-package.sh
```

脚本会生成 `Codropshipping-1.0-Full-<UTC时间>.tar.gz` 和对应 `.sha256`，并自动拒绝包含真实环境变量、数据库、依赖目录、构建缓存、旧版入口或可疑凭证的包。

## 上线说明

生产 Compose 已包含官网、新客户后台、刊登编排、搜索 API 和 Caddy，`/admin` 只进入 1.0 客户工作台。上线前由 IT 按 [DEPLOYMENT.md](./DEPLOYMENT.md) 配置服务器 Secret、外部数据库网络、备份和回滚，并按 [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) 验收。

不要把 `.env`、SQLite 数据库、API Key、Shopify 密码或管理令牌提交到 GitHub。任何曾经通过聊天或截图传递的凭证都必须先轮换。
