# Codropshipping 1.0 部署入口

Codropshipping 1.0 不是单独上传一个静态官网即可运行的项目。正式测试环境必须同时部署官网、客户工作台、刊登 API、搜索 API 和统一 Caddy 入口。

请从仓库根目录执行，并以 [../DEPLOYMENT.md](../DEPLOYMENT.md) 为唯一部署手册：

```bash
cp web-search/.env.production.example /etc/codropshipping/codropshipping-1.0.env
./scripts/validate-deployment.sh /etc/codropshipping/codropshipping-1.0.env
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml build --pull
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d
```

不要使用旧版的 Nuxt 单站点静态部署方式；那种方式不会包含 `/admin`、AI 刊登、搜索、全球翻译和 Shopify 发布编排。
