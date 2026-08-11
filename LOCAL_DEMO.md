# Codropshipping 1.0 完整版本地全链路演示

## 已接通流程

1. 客户在 Codropshipping 注册或登录，并进入统一客户工作台。
2. 客户在真实商品详情页选择 `List to my store`（默认 AI 辅助），也可选择 `Manual listing`；刊登语言沿用网站全局语言。
3. 未登录客户完成登录后返回原刊登任务，不丢失商品、模式和语言。
4. 客户端读取真实商品标题、描述、图片、规格和供应链数据，创建个人刊登草稿。
5. 客户可手工编辑，或对标题、描述、SEO 和图片分别使用 AI 建议；AI 不会自动发布。
6. 客户审核店铺、发货仓、规格、价格、库存和最终内容后，调用现有 CoD 发布接口推送 Shopify。
7. 客户在工作台继续查看订单、履约、库存、财务和数据洞察。

销售渠道页面展示 Shopify、Amazon、TikTok Shop、WooCommerce、eBay 和自定义平台接入。Shopify 是当前完成深度发布编排的主要渠道；其他渠道是否允许真实发布，以对应平台授权和 CoD 服务端能力为准，不显示模拟成功状态。

## 首次安装

需要 Node.js 22.13+。在项目根目录执行：

```bash
(cd listing-backend && npm ci)
(cd member-center && npm ci)
(cd web-search && npm ci)
(cd web-search/search-backend && npm ci)
```

本地 AI 验证需要单独创建 `listing-backend/.env.local`。只允许从 `.env.example` 复制键名，真实 Key 不得进入 Git 或发布包。

## 一键启动

```bash
./start-local-demo.sh
```

本地入口：

- 官网与选品：`http://127.0.0.1:3000/`
- 客户端登录：`http://127.0.0.1:3000/admin/login`
- 客户工作台：`http://127.0.0.1:3000/admin/main/dashboard`
- 搜索健康检查：`http://127.0.0.1:8788/health`
- 刊登健康检查：`http://127.0.0.1:8789/health`

没有本地 MySQL 时，搜索服务会进入真实上游代理模式；完整索引和高级筛选覆盖率需要配置 `web-search/search-backend/.env.example` 中的独立数据库账号。

## AI 与全球语言

刊登与全站动态翻译使用服务端 Qwen 配置：

- `QWEN_API_KEY`
- `QWEN_BASE_URL`
- `QWEN_NATIVE_BASE_URL`（图片模型需要）
- `QWEN_TEXT_MODEL`
- `QWEN_IMAGE_MODEL`

网站与客户工作台默认英语，支持简体中文、西班牙语、法语、德语、葡萄牙语、阿拉伯语、日语、韩语和俄语。静态界面词条立即替换，未缓存的动态商品文案由服务端渐进翻译并持久缓存；阿拉伯语自动切换 RTL。语言选择同时作为刊登目标语言，客户仍需审核 AI 生成内容。

## 演示前验证

```bash
(cd listing-backend && npm test)
(cd web-search/search-backend && npm test)
(cd member-center && npm run lint:release && npm run build)
(cd web-search && npm run build)
./scripts/smoke-test.sh http://127.0.0.1:3000
```

真实 Shopify 发布会创建或更新外部数据。除非已经明确授权测试商品和店铺，否则演示停在最终确认前；测试环境上线后由业务人员按 [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) 完成一次低风险真实闭环。
