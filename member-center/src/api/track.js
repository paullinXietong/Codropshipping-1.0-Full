
import requests from "./ajax";
import qs from "qs"

// list
export const getList = (params)=>requests.get('/customer/api/track/first/get_list',{params});

// detail
export const getDetail = (params)=>requests.get('/customer/api/track/first/get_track_row',{params});
// export const getDetail = (data)=>requests.post('/customer/api/user/seeprice/del_history',qs.stringify(data));
