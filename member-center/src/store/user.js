
import {
    reqGetCode,
    reqUserRegister,
    reqUserImg,
    reqUserLogin,
    signUpGoogle,
    reqLogout,
    reqForgotPassword,
    reqResetPassword,
    reqKey,
    reqchangeUserPassword,
    reqGetImg,
    reqChangeUserInfo,
    reqTimezone,
    thirdLogin,
    resetPasswords
  } from "@/api/user";
  import {
    setToken,
    getToken,
    removeToken,
    setEmail,
    getEmail,
    removeEmail,
  } from "@/utils/token";
  const state = {
    code: "",
    token: getToken(),
    userInfo: {},
    userEmail:getEmail(),
    email:'',
    key:'',
    id:'',
    timeZoneList:[],
  };
  const mutations = {
    TIMEZONE(state,timeZoneList){
        state.timeZoneList=timeZoneList
    },
    GETCODE(state, code) {
      state.code = code;
    },
    GETKEY(state,key){
        state.key=key
    },
    USERLOGIN(state, token) {
      state.token = token;
     
    },
    GETUSERINFO(state, userInfo) {
      state.userInfo = userInfo;
      state.id=userInfo.id
    },
    USERREGISTER(state,userEmail){
        state.userEmail=userEmail
    },
    FORGOTPASSWORD(state,email){
        state.email=email
    },
    CLEAR(state){
      state.token = '';
      state.userEmail = '';
      state.email = '';
      state.code = '';
      state.userInfo = {};
      state.key = '';
      state.id = '';
      state.timeZoneList = [];
      removeToken();
      removeEmail()
    }
  };
  const actions = {
      async timeZone({commit},timeZoneList){
        let result=await reqTimezone(timeZoneList)
        if(result.code==0){
            commit('TIMEZONE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.msg))
        }
      },
      async changeUserInfo({commit},userInfoList){
        let result=await reqChangeUserInfo(userInfoList)
        if(result.code==0){
            commit('CHANGEINFOLIST',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.msg))
        }
      },
      async uploadImg({commit},image){
          let result=await reqGetImg(image)
          if(result.code==0){
              commit('GETIMG',result.data)
              return 'ok'
          }else{
              return Promise.reject(new Error(result.msg))
          }
      },
    async getCode({ commit }, email) {
      let result = await reqGetCode(email);
      if (result.code == 0) {
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        // commit("GETCODE", result.data);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async getKey( { commit }, key){
        let result =await reqKey(key)
        if(result.code==0){
            commit("GETKEY", result.data);
            return "ok";
        }else{
            return Promise.reject(new Error(result.msg));
        }
    },
    async userRegisters({ commit }, data) {
      let result = await reqUserRegister(data);
      if (result.code == 0) {
          // console.log('用户信息',result.data)
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async userRegister({ commit }, user) {
      let result = await reqUserRegister(user);
      if (result.code == 0) {
        let email = JSON.parse(localStorage.getItem('registerInfo')).email
        reqUserImg({email: email}).then(()=>{})
        commit("USERREGISTER", result.data);
        setEmail(result.data)
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async changeUserPassword({commit},data){
        let result = await reqchangeUserPassword(data);
        if (result.code == 0) {
          commit("CHANGEPASSWORD", result.data);
          return "ok";
        } else {
          return Promise.reject(new Error(result.msg));
        }
    },
    async userLogin({ commit }, data) {
      let result = await reqUserLogin(data);
      if (result.code == 0) {
          // console.log('用户信息',result.data)
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async thirdLogins({ commit }, data) {
      let result = await thirdLogin(data);
      if (result.code == 0) {
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    userLoginCode({ commit }, data) {
      commit("USERLOGIN", data.token);
      commit("GETUSERINFO", data);
      setToken(data.token);
      return "ok";
    },
    async googleLogin({ commit }, data) {
      let result = await signUpGoogle(data);
      if (result.code == 0) {
          // console.log('用户信息',result.data)
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async googleEnter({ commit }, result) {
      // let result = await signUpGoogle(data);
      // if (result.code == 0) {
        // console.log('用户信息',result.data)
        commit("USERLOGIN", result.data.token);
        commit("GETUSERINFO", result.data);
        setToken(result.data.token);
        return "ok";
      // } else {
      //   return Promise.reject(new Error(result.msg));
      // }
    },
    async forgotPasswords({ commit }, data) {
      let result = await resetPasswords(data);
      if (result.code == 0) {
          // console.log('用户信息',result.data)
        // commit("USERLOGIN", result.data.token);
        // commit("GETUSERINFO", result.data);
        // setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.msg));
      }
    },
    async forgotPassword({commit},data){
        let result=await reqForgotPassword(data)
        if(result.code==0){
            commit("FORGOTPASSWORD",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.msg))
        }
    },
    async resetPassword({commit},data){
        let result=await reqResetPassword(data)
        if(result.code==0){
            return
        }else{
            return Promise.reject(new Error(result.msg))
        }
    },
    async userLogout({commit}) {
      let result = await reqLogout();
      if(result.code==0){
        commit("CLEAR");
        return 'ok';
      }else{
        return Promise.reject(new Error(result.msg));
      }
    },
    async shopifyLogin({ commit }, result) {
      commit("USERLOGIN", result.data.token);
      commit("GETUSERINFO", result.data);
      setToken(result.data.token);
      return "ok";
    },
  };
  const getters = {};
  export default {
    state,
    mutations,
    actions,
    getters,
  };
  