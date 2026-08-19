import requests from './ajax'

export const shipFromTo = () => requests.get('/customer/api/polymerization/get_sel')
export const getShippingCost = (params: any = {}) => requests.get('/customer/api/polymerization/get_door_price', { params })
