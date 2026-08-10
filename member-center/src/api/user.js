
import requests from "./ajax";
import qs from "qs"
// 关于用户信息的接口
export const reqUserLogin = (data)=>requests.post('/customer/api/user/login/verifylogin',qs.stringify(data));
export const  reqUserRegister= (data)=>requests.post('/customer/api/user/login/register',qs.stringify(data));
export const  reqUserImg= (data)=>requests.post('/customer/api/user/login/generate',qs.stringify(data));
export const  reqGetCode= (data)=>requests.post('/customer/api/user/login/verify_code',qs.stringify(data));
export const  reqLogout= (data)=>requests.get('/customer/api/user/login/loginout',qs.stringify(data));
export const  reqForgotPassword= (data)=>requests.post('/customer/api/user/login/retrieve_password',qs.stringify(data));
export const  reqResetPassword= (data)=>requests.post('/customer/api/user/login/reset_password',qs.stringify(data));
export const  reqKey= (data)=>requests.post('/customer/api/user/login/verify_key',qs.stringify(data));
export const  reqchangeUserPassword= (data)=>requests.post('/customer/api/user/details/change_pwd',qs.stringify(data));
export const  reqLoginCode = (data)=>requests.post('/customer/api/user/login/get_client',qs.stringify(data));
// 
export const  reqGetImg= (id,data)=>requests.post('/customer/api/user/details/upload_head_img?id='+id,data);
export const  reqChangeUserInfo= (data)=>requests.post('/customer/api/user/details/change_user',qs.stringify(data));
export const  reqTimezone= ()=>requests.get('/customer/api/user/details/get_time_zone');
export const  reqSuper= ()=>requests.get('/customer/api/user/super/get_info');
export const  addEmail= (data)=>requests.post('/customer/api/user/details/add_email',qs.stringify(data));
export const  verifyEmail= (data)=>requests.post('/customer/api/user/details/verify_email',qs.stringify(data));
export const  verifyEmails= (data)=>requests.post('/customer/api/user/details/send_verify_code',qs.stringify(data));

//google
export const  signUpGoogle= (data)=>requests.post('/google/get_user_info',qs.stringify(data));
export const  setPasswordGoogle= (data)=>requests.post('/google/edit_pwd',qs.stringify(data));

//dashboard
export const getDashboard= ()=>requests.get('/customer/api/user/home/info');

//coupons
export const getCoupons = (params)=>requests.get('/customer/api/user/coupon/get_list',{params})
export const createCoupons = (params = {})=>requests.get('/customer/api/user/coupon/create',{params});

//notice
export const getNotice = (params)=>requests.get('/customer/api/user/home/get_msg_notice',{params})
export const setNotice = (data)=>requests.post('/customer/api/user/home/notice_msg_read',qs.stringify(data));

//member
export const getMember = (params)=>requests.get('/customer/api/user/super/info',{params})
export const getMemberInfo = (params)=>requests.get('/customer/api/user/super/get_info',{params})
export const setMember = (data)=>requests.post('/customer/api/user/super/create',qs.stringify(data));
export const editMember = (data)=>requests.post('/customer/api/user/super/edit',qs.stringify(data));
export const MemberFile = (data)=>requests.post('/customer/api/user/super/upload',data);

//nologin chat
// export const getId = (params)=>requests.get('/customer/api/polymerization/save_ip',{params})
export const getId = (data)=>requests.post('/customer/api/polymerization/save_ip',qs.stringify(data));

//shopify
export const saveShop = (data)=>requests.post('/customer/api/user/details/save_shop',qs.stringify(data));
export const editShop = (data)=>requests.post('/customer/api/user/details/edit_shop',qs.stringify(data));
export const delShop = (data)=>requests.post('/customer/api/user/details/del_shop',qs.stringify(data));
export const getShop = (params)=>requests.get('/customer/api/user/details/get_shop',{params});
export const storeList = (params)=>requests.get('/shipping/Store/getStoreList',{params});
export const linkStore = (data)=>requests.post('/shipping/Store/linkStore',data);
export const linkStorecb = (data)=>requests.post('/shipping/Store/linkStoreCallback',data);

export const getHobbyInfo = (params)=>requests.get('/shipping/Category/getCategory',{params});

export const getUserHobby = (params)=>requests.get('/shipping/Category/getRecommendCategory',{params});

export const setHobby = (data)=>requests.post('/shipping/Category/setRecommendCategory', data);

//第三方登录
export const getThirdLink = (params)=>requests.get('/customer/api/user/login/get_third_party_login_url',{params});
export const thirdLogin = (data)=>requests.post('/customer/api/user/login/third_party_login',qs.stringify(data));
//
export const sendVerify = (data)=>requests.post('/customer/api/user/login/send_verify_code',qs.stringify(data));
export const resetPasswords = (data)=>requests.post('/customer/api/user/login/resetPassword',qs.stringify(data));

//获取开发者信息
export const getOpenPlatformInfo = (params)=>requests.get('/customer/api/user/OpenPlatform/getOpenPlatformInfo',{params});
//申请开发者
export const applyForDeveloper = (data)=>requests.post('/customer/api/user/OpenPlatform/applyForDeveloper',qs.stringify(data));
