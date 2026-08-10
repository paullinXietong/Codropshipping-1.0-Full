# 已知技术债与处理边界

## 旧 Vue 2 构建链

客户工作台由历史 Vue 2 项目演进而来。当前生产运行镜像只包含构建后的静态文件和非特权 Nginx，不包含 Node、webpack-dev-server、ESLint 或源码编译器；`npm audit --omit=dev` 作为运行依赖门禁。

完整开发依赖仍会报告 Vue 2/旧 Tailwind PostCSS 兼容链和 Vue CLI 辅助工具的 High 告警。强制自动修复会把 Vuex、CLI 或其他核心包跨大版本替换，可能破坏既有订单、仓库和支付页面，因此本次不使用 `npm audit fix --force`。

后续专项升级建议：

1. 把旧 Tailwind PostCSS 7 兼容层迁移到独立、现代的 PostCSS/Tailwind 配置。
2. 将会员中心逐模块迁移到 Vue 3/Vite，并以订单与刊登流程的端到端测试做保护。
3. 清理全量旧 ESLint 债务；当前 CI 对本次新版总览、刊登、订单、反馈、语言和工作台模块执行严格 `lint:release`。
4. 每次发布重新执行完整依赖扫描；出现生产运行 Critical/High 时阻断上线。
