
import requests from "./ajax";
import qs from "qs"

// 报价列表
export const quoteList = (params)=>requests.get('/customer/api/user/offer/get_list',{params});

// 报价请求
export const quoteRequest = (data)=>requests.post('/customer/api/user/offer/create',qs.stringify(data));

// 报价详情
export const quoteDetail = (params)=>requests.get('/customer/api/user/offer/info',{params});

// 报价删除
export const quoteDel = (data)=>requests.post('/customer/api/user/offer/del',qs.stringify(data));