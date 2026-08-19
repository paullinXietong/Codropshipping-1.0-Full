import requests, { formBody } from './ajax'

export const reqUserLogin = (data: any) => requests.post('/customer/api/user/login/verifylogin', formBody(data))
export const reqUserRegister = (data: any) => requests.post('/customer/api/user/login/register', formBody(data))
export const sendVerify = (data: any) => requests.post('/customer/api/user/login/send_verify_code', formBody(data))
export const reqLogout = () => requests.get('/customer/api/user/login/loginout')
export const getDashboard = () => requests.get('/customer/api/user/home/info')
export const getNotice = (params: any = {}) => requests.get('/customer/api/user/home/get_msg_notice', { params })
export const setNotice = (data: any) => requests.post('/customer/api/user/home/notice_msg_read', formBody(data))
export const storeList = (params: any = {}) => requests.get('/shipping/Store/getStoreList', { params })
export const linkStore = (data: any) => requests.post('/shipping/Store/linkStore', data)
export const linkStorecb = (data: any) => requests.post('/shipping/Store/linkStoreCallback', data)
