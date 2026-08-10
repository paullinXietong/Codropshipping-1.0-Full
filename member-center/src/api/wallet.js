
import requests from "./ajax";
import qs from "qs"

export const reqWallet = (params)=>requests.get('/customer/api/order/bill/get_user_bill',{params});
export const reqImgUpload = (data)=>requests.post('/customer/api/order/bill/upload_bill',data);
export const walletTopup = (data)=>requests.post('/customer/api/order/bill/create_bill',qs.stringify(data));
export const walletVerification = (data)=>requests.post('/customer/api/order/bill/get_wallet_code',qs.stringify(data));
export const walletWithdraw = (data)=>requests.post('/customer/api/order/bill/create_out',qs.stringify(data));