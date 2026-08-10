
import requests from "./ajax";
import qs from "qs"

// 列表
export const getOrderList = (params)=>requests.get('/customer/api/order/freight/get_list',{params});

// 争议/取消争议
export const disputeOrder = (data)=>requests.post('/customer/api/order/freight/dispute',qs.stringify(data));

// 取消订单
export const cancelOrder = (data)=>requests.post(
  '/customer/api/order/freight/cancel',
  qs.stringify({ ...data, invalidate_coupon: 1 })
);

// 头部状态
export const getStatus = (params)=>requests.get('/customer/api/order/freight/get_status',{params});

// 感叹号对号
export const getType = (params)=>requests.get('/customer/api/order/freight/get_judge_type',{params});

// 详情
export const getOrderInfo = (params)=>requests.get('/customer/api/order/freight/info',{params});

// 城市国家
export const getCountry = ()=>requests.get('/customer/api/order/freight/get_sel');

// 省份
export const getStates = (params)=>requests.get('/customer/api/order/freight/get_states',{params});

// 提交
export const submitReq = (data)=>requests.post('/customer/api/order/freight/create',qs.stringify(data));

// 上传
export const ImgUpload = (data)=>requests.post('/customer/api/order/freight/upload',data);

// 保存文档
export const saveFile = (data)=>requests.post('/customer/api/order/freight/save_booking_documents',qs.stringify(data));

// 删除文档
export const delFile = (params)=>requests.get('/customer/api/order/freight/del_booking_documents',{params});

// 支付
export const paymentReq = (data)=>requests.post('/customer/api/order/freight/payment',qs.stringify(data));

// 反馈
export const feedback = (data)=>requests.post('/customer/api/user/quick/save',qs.stringify(data));

// 新建议反馈
export const feedbackSubmit = (data)=>requests.post('/shipping/Feedback/submit', data);

//建议列表
export const feedbackList = (params)=>requests.get('/shipping/Feedback/getList', {params});

// 提交评论
export const submitComment = (data)=>requests.post('/shipping/Feedback/comment', data);

// 获取评论
export const getComment = (params)=>requests.get('/shipping/Feedback/getCommentList', {params});

// 快速订单
export const quickOrder = (data)=>requests.post('/customer/api/order/freight/create_quick_order',qs.stringify(data));

// 始发地
export const getStart = (params)=>requests.get('/customer/api/polymerization/get_start',{params});

// 查目的地城市
export const getEnd = (params)=>requests.get('/customer/api/user/login/get_end',{params});

//优惠券
export const getCoupon = (params)=>requests.get('/customer/api/order/freight/get_use_coupon',{params});

// 整柜订舱
export const createBox = (data)=>requests.post('/customer/api/order/freight/create_box',qs.stringify(data));
