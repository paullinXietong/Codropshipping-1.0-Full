# Codropshipping 3.0（Vue 3）部署入口

Codropshipping 3.0 不是单独上传一个静态官网即可运行的项目。官网与客户工作台已经合并到同一个 Nuxt 3 / Vue 3 `ui` Docker 镜像，正式测试环境必须同时部署该镜像、刊登 API 和搜索 API。

请从仓库根目录执行，并以 [../DEPLOYMENT.md](../DEPLOYMENT.md) 为唯一部署手册：

```bash
cp web-search/.env.production.example /etc/codropshipping/codropshipping-1.0.env
./scripts/validate-deployment.sh /etc/codropshipping/codropshipping-1.0.env
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml build --pull
docker compose --env-file /etc/codropshipping/codropshipping-1.0.env \
  -f web-search/docker-compose.yml up -d
```

不要使用旧版 Nuxt 单站点部署，也不要为 `/admin` 配置单独上游。Docker 发布的统一 UI 容器已经同时包含官网与新版客户后台。
