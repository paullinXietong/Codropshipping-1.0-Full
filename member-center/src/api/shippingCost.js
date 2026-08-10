
import requests from "./ajax";
import qs from "qs"

// 发货城市，目的地国家
export const shipFromTo = ()=>requests.get('/customer/api/polymerization/get_sel');

// 查询
// export const getCost = (params)=>requests.get('/customer/api/user/seeprice/selprice',{params});
export const getCost = (params)=>requests.get('/customer/api/polymerization/get_door_price',{params});

// 查历史记录
export const getHistory = ()=>requests.get('/customer/api/user/seeprice/get_history');

// 删除历史记录
export const delHistory = (data)=>requests.post('/customer/api/user/seeprice/del_history',qs.stringify(data));

// 推荐
export const getRecommend = (params)=>requests.get('/customer/api/polymerization/get_door_transport_price',{params});

// 点击快速下单
export const getQuickNumber = (params)=>requests.get('/customer/api/polymerization/msg_cn',{params});

//集拼
export const getConsolidation = (params)=>requests.get('/customer/api/polymerization/get_consolidation_price',{params});

//集拼+目的地
export const getConsolidations = (params)=>requests.get('/customer/api/polymerization/get_consolidation_price2',{params});

// 获取ip
export const getIpInfo = (params)=>requests.get('/customer/api/user/login/getIpInfo',{params});