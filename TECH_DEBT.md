# 已知技术债与处理边界

## 历史客户工作台源码

客户工作台的业务页面保留在 `member-center/src`，但现在由 Nuxt 3 的 Vue 3 编译链直接构建。Vue 2 CLI、Vuex、webpack-dev-server 和旧静态 `dist` 均不进入生产镜像，也不再作为本地演示入口。

后续专项升级建议：

1. 将仍采用 Options API 的页面逐步整理成共享 Vue 3 composables，减少重复请求状态代码。
2. 为登录、刊登、渠道、订单、库存和结账补充浏览器级回归测试。
3. 对主要工作台路由做按需拆包，降低首次进入客户后台时的 JavaScript 体积。
4. 每次发布重新执行完整依赖扫描；出现生产运行 Critical/High 时阻断上线。
