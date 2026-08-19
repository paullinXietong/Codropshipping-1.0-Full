import requests, { formBody } from './ajax'

export const reqGetAddress = (params: any = {}) => requests.get('/customer/api/user/details/get_address', { params })
export const reqAddress = (data: any = {}) => requests.post('/customer/api/user/details/create_address', formBody(data))
export const reqEditAddress = (data: any = {}) => requests.post('/customer/api/user/details/edit_address', formBody(data))
export const reqDelAddress = (data: any = {}) => requests.post('/customer/api/user/details/del_address', formBody(data))
export const setDefaultAddress = (data: any = {}) => requests.post('/customer/api/user/details/set_default', formBody(data))
export const reqCountries = () => requests.get('/customer/api/user/details/get_countries')
export const reqStates = (params: any = {}) => requests.get('/customer/api/user/details/get_states', { params })
