import requests, { formBody } from './ajax'

export const ImgUpload = (data: FormData) => requests.post('/customer/api/order/freight/upload', data)
export const feedbackSubmit = (data: any) => requests.post('/shipping/Feedback/submit', data)
export const feedbackList = (params: any = {}) => requests.get('/shipping/Feedback/getList', { params })
export const submitComment = (data: any) => requests.post('/shipping/Feedback/comment', data)
export const getComment = (params: any = {}) => requests.get('/shipping/Feedback/getCommentList', { params })
