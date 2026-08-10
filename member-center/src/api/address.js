
import requests from "./ajax";
import qs from "qs"
export const reqAddress = (data)=>requests.post('/customer/api/user/details/create_address',qs.stringify(data));
// 国家
export const reqCountries = ()=>requests.get('/customer/api/user/details/get_countries ');
export const reqStates = (params)=>requests.get('/customer/api/user/details/get_states',{params});
export const reqGetAddress = (params)=>requests.get('/customer/api/user/details/get_address',{params});
export const reqGetAddressz = (params)=>requests.get('/customer/api/user/details/get_order_address',{params});
// /customer/api/user/details/edit_address
export const reqEditAddress = (data)=>requests.post('/customer/api/user/details/edit_address',qs.stringify(data));
export const reqDelAddress = (data)=>requests.post('/customer/api/user/details/del_address',qs.stringify(data));
export const reqChinaCity = ()=>requests.get('/customer/api/user/offer/get_china_city');

//城市
export const reqGetCity = (params)=>requests.get('/customer/api/user/details/get_cities',{params});

// 设置默认地址
export const setDefault = (data)=>requests.post('/customer/api/user/details/set_default',qs.stringify(data));

// 获取fba_code列表
export const getFbaCodeList = (params)=>requests.get('/customer/api/user/details/getFbaCodeList',{params});