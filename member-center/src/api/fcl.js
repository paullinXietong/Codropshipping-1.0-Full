
import requests from "./ajax";
import qs from "qs"

// 获取港口
export const getPort = (params)=>requests.get('/customer/api/polymerization/get_box_sel',{params});

// 查询
// export const getPrice = (params)=>requests.get('/customer/api/transport/sea_transport/sel_price',{params});
export const getPrice = (params)=>requests.get('/customer/api/polymerization/get_port_price',{params});

// 获取特惠transport/sea_transport/get_transport_price
export const getSpecial = (params)=>requests.get('/customer/api/polymerization/get_transport_price',{params});

// 历史
export const getHistory = (params)=>requests.get('/customer/api/transport/sea_transport/get_history',{params});

// 删除历史
export const delHistory = (data)=>requests.post('/customer/api/transport/sea_transport/del_history',qs.stringify(data));

// 获取目的国家
export const getEndCountry = (params)=>requests.get('/customer/api/polymerization/get_co_end_country',{params});

// 目的港推荐
export const getRecommendedDestinationPort = (params)=>requests.get('/customer/api/polymerization/getRecommendedDestinationPort',{params});
