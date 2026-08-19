import requests, { formBody } from './ajax'

export const get_stock_list = (data: any = {}) => requests.post('/customer/api/warehouse/inventory/get_stock_list', formBody(data))
export const warehousehome = (data: any = {}) => requests.post('/customer/api/warehouse/inventory/get_home_data', formBody(data))
export const applyStorage = (data: any = {}) => requests.post('/customer/api/warehouse/inventory/apply_storage', formBody(data))
