
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./style/tailwindcss.css";
import Element from 'element-ui';
import '@/validate/validate'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { installWorkspaceI18n } from '@/i18n/workspace'
import { installWorkspacePageTranslation } from '@/i18n/pageTranslation'

Vue.use(Element);
 
NProgress.configure({
  minimum: 0.1,
  template: `
    <div class="bar" role="bar">
      <div class="peg"></div>
    </div>
    <div class="spinner" role="spinner">
      <div class="spinner-icon"></div>
    </div>
  `,
  ease: 'ease',
  speed: 200,
})

Vue.config.productionTip = false;
installWorkspaceI18n()
installWorkspacePageTranslation()
// Vue.prototype.$message = Message;

Vue.prototype.$globalWeb = window.location.host;
// locale.use(lang)
new Vue({
  router,
  store,
  beforeCreate() {
    // Vue.prototype.$API = API;
  },
  render: (h) => h(App),
}).$mount("#app");
