
import axios from "axios";
import store from '@/store';
import router from '@/router/index';
let requests = axios.create({
  baseURL: window.location.protocol + "//" + window.location.host + "/api",
  // baseURL: "https://codropshipping.com/api",
  // baseURL: "https://test.codropshipping.com/api",
  timeout:25000,
});

requests.interceptors.request.use((config) => {
  //需要携带token带给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token;
  }
  if(localStorage.getItem("Touriststoken")){
    config.headers.Touriststoken = localStorage.getItem("Touriststoken")
  }
  return config;
});

requests.interceptors.response.use(
  (res) => {
    // if(res.data.msg=='请先登录'){
    //   store.dispatch('userLogout')
    //   router.push('/login')
    // }
    if(res.data.msg=='token失效' || res.data.msg=='账号异常'){
      store.dispatch('userLogout')
      router.push('/login')
    }
    return res.data;
  },
  (err) => {
   
  }
);
export default requests;
