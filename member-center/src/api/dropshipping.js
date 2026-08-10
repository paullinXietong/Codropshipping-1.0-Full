
import requests from "./ajax";
import qs from "qs"

// export const reqAddress = (data)=>requests.post('/customer/api/user/details/create_address',qs.stringify(data));
// export const reqCountries = ()=>requests.get('/customer/api/user/details/get_countries ');

// 推荐商品
export const getCommend = (data)=>requests.post('/shipping/Goods/ProductSearchOfferRecommend',data);

// 获取商品列表
export const getGoods = (data)=>requests.post('/shipping/Order/getGoodsList',data);

// 获取最新商品数据
export const getNewGoods = (data)=>requests.post('/shipping/Order/flushGoods',data);

// 推送到我的店铺
export const pushShop = (data)=>requests.post('/shipping/Order/pushToShop',data);

// 删除商品
export const deleteGoods = (data)=>requests.post('/shipping/Order/deleteGoods',data);

// 获取购物车列表
export const getCart = (data)=>requests.post('/shipping/Order/getCartList',data);

// 删除购物车商品
export const deleteCart = (data)=>requests.post('/shipping/Order/deleteCart',data);

// 设置购物车商品数量
export const editCart = (data)=>requests.post('/shipping/Order/setCartGoodsNum',data);

// 获取汇率
export const getRate = (data)=>requests.post('/shipping/Order/getExchangeRate',data);

// 游客登录
export const getTourists = (data)=>requests.post('/shipping/Tourists/login',data);

// 订单信息预览
export const orderInfo = (data)=>requests.post('/shipping/Order/preview',data);

// 创建订单
export const orderCreate = (data)=>requests.post('/shipping/Order/create',data);

// 订单列表
export const orderList = (data)=>requests.post('/shipping/Order/list',data);

// 获取订单信息
export const orderDetails = (data)=>requests.post('/shipping/Order/info',data);

// 获取物流价格
export const getLogisPrice = (data)=>requests.post('/customer/api/polymerization/get_logistics_price',data);

// 订单支付
export const orderPay = (data)=>requests.post('/shipping/Order/pay',data);

// 取消订单信息
export const candelOrder = (data)=>requests.post('/shipping/Order/cancel',{
  ...data,
  invalidate_coupon: 1,
});

// 订单支付状态同步
export const paymentStatus = (data)=>requests.post('/shipping/Order/orderPaymentSync',data);

// 获取店铺订单
export const getOrderList = (data)=>requests.post('/shipping/StoreOrder/getOrderList',data);

// shopify授权验证
export const shopifyVerify = (params)=>requests.get('/shipping/Store/shopifyOauthStore',{params});

// 获取商品信息
export const getGoodsInfo = (data)=>requests.post('/shipping/Order/getGoodsInfo',data);

// 绑定店铺
export const bindStore = (data)=>requests.post('/shipping/Store/bindStore',data);

// 同步店铺订单
export const syncOrder = (data)=>requests.post('/shipping/StoreOrder/syncOrder',data);

// 获取追踪
export const getTracking = (data)=>requests.post('/shipping/Order/tracking',data);

// 获取店铺产品类型列表
export const getProductTypeList = (data)=>requests.post('/shipping/Order/getProductTypeList',data);

// 编辑备注信息
export const editRemark = (data)=>requests.post('/shipping/StoreOrder/editRemark',data);

// 编辑地址信息
export const editAddress = (data)=>requests.post('/shipping/StoreOrder/editAddress',data);

// 获取运输方式
export const getShippingMethod = (data)=>requests.post('/shipping/StoreOrder/getShippingMethod',data);

// 变更运输方式
export const changeShippingMethod = (data)=>requests.post('/shipping/StoreOrder/changeShippingMethod',data);

// 履约
export const fulfillment = (data)=>requests.post('/shipping/StoreOrder/fulfillment',data);

// 创建代发订单
export const createDeliveryOrder = (data)=>requests.post('/shipping/StoreOrder/createDeliveryOrder',data);

// 获取代发订单列表
export const getDeliveryOrderList = (data)=>requests.post('/shipping/StoreOrder/getDeliveryOrderList',data);

// 获取代发订单信息
export const getDeliveryOrderInfo = (data)=>requests.post('/shipping/StoreOrder/getDeliveryOrderInfo',data);

// 获取代发订单信息
export const payOrder = (data)=>requests.post('/shipping/StoreOrder/pay',data);

// 取消代发订单
export const canalOrder = (data)=>requests.post('/shipping/StoreOrder/canal',{
  ...data,
  invalidate_coupon: 1,
});


// 货物店铺商品列表
export const getStoreProductList = (data)=>requests.post('/shipping/StoreProduct/getProductList',data);


// 获取运输方式
export const getTransportList = (data)=>requests.post('/shipping/StoreProduct/getShippingMethodList',data);

// 获取可选国家
export const getCountry = (data)=>requests.post('/shipping/StoreProduct/getCountry',data);

// 编辑
export const editShipping = (data)=>requests.post('/shipping/StoreProduct/editShippingSetting',data);

// 同步店铺商品
export const syncProduct = (data)=>requests.post('/shipping/StoreProduct/syncProduct',data);

// 物流跟踪信息
export const storeTrack = (data)=>requests.post('/shipping/StoreOrder/tracking',data);

// 获取DDP/DDU Freight各一条
export const getFreightList = (data)=>requests.post('/shipping/Order/getDdpDduFreightList',data);

// 修改国际站运费代码
export const updateFreightCode = (data)=>requests.post('/shipping/Order/updateFreightCode',data);

// 出库申请详情
export const outboundDetial = (data)=>requests.post('/shipping/Order/submitForOutboundReleaseParticulars',data);

// 出库申请
export const submitOutbound = (data)=>requests.post('/shipping/Order/submitForOutboundRelease',data);

// 库存详情
export const getDetailsOfGoodsWarehousing = (data)=>requests.post('/shipping/Order/getDetailsOfGoodsWarehousing',data);

// 关键词搜索
export const searchKeyword = (data)=>requests.post('/shipping/Goods/ProductSearchKeywordQuery',data);

// 图搜
export const searchImg = (data)=>requests.post('/shipping/Goods/ProductSearchImageQueryParam',data);

// 获取图片id
export const getImgId = (data)=>requests.post('/shipping/Goods/ProductImageUpload',qs.stringify(data));

// 商品详情
export const getDetail = (data)=>requests.post('/shipping/Goods/ProductSearchQueryProductDetail',data);

// 匹配数据
export const matchData = (data)=>requests.post('/shipping/StoreProduct/match_data',data);

// 获取渠道
export const getShippingMethodList = (data)=>requests.post('/shipping/StoreOrder/getShippingMethodList',data);

// 解除商品匹配绑定
export const unbindMatch = (data)=>requests.post('/shipping/StoreProduct/unbind_match',data);

// 批量推送到我的店铺
export const batchPushToShop = (data)=>requests.post('/shipping/Order/batchPushToShop',data);
