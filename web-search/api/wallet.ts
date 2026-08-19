import requests from './ajax'

export const reqWallet = (params: any = {}) => requests.get('/customer/api/order/bill/get_user_bill', { params })
