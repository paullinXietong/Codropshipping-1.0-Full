
import requests from "./ajax";
import qs from "qs"
export const reqWarehouse = (data)=>requests.post('/customer/api/warehouse/house/create',qs.stringify(data));
export const getWarehouse = (params)=>requests.get('/customer/api/warehouse/house/get_list',{params});
export const getSelData = ()=>requests.get('/customer/api/warehouse/house/get_sel_data');
export const delWarehouse = (params)=>requests.get('/customer/api/warehouse/house/del',{params});
//仓租试算
export const reqRent = (data)=>requests.post('/customer/api/warehouse/inventory/rent_calculation',qs.stringify(data));
//仓租预定
export const submitRent = (data)=>requests.post('/customer/api/warehouse/inventory/booking',qs.stringify(data));

//仓库列表
export const getWarehouseList = (data)=>requests.post('/customer/api/warehouse/inventory/get_list',qs.stringify(data));

//入库管理列表
export const getList = (data)=>requests.post('/customer/api/warehouse/inventory/get_inbound_list',qs.stringify(data));
//上传附件
export const uploadFile = (data)=>requests.post('/customer/api/warehouse/inventory/upload_file',data);
//获取供应商
export const getSupplier = (data)=>requests.post('/customer/api/warehouse/inventory/get_supplier',qs.stringify(data));
//获取地区
export const getArea = (data)=>requests.post('/customer/api/warehouse/inventory/get_area',qs.stringify(data));
//新增/编辑供应商信息
export const saveSupplier = (data)=>requests.post('/customer/api/warehouse/inventory/save_supplier_info',qs.stringify(data));
//删除供应商
export const delSupplier = (data)=>requests.post('/customer/api/warehouse/inventory/del_supplier',qs.stringify(data));
//发起申请
export const applyStorage = (data)=>requests.post('/customer/api/warehouse/inventory/apply_storage',qs.stringify(data));
//查看申请信息
export const getApply = (data)=>requests.post('/customer/api/warehouse/inventory/get_apply_storage',qs.stringify(data));
//修改申请信息
export const updateApply = (data)=>requests.post('/customer/api/warehouse/inventory/update_apply_storage',qs.stringify(data));
//取消申请
export const cancelApply = (data)=>requests.post('/customer/api/warehouse/inventory/cancel_apply',qs.stringify(data));

//出库列表
export const getOutbound = (data)=>requests.post('/customer/api/warehouse/inventory/get_outbound_list',qs.stringify(data));
//取消出库
export const cancelOutbound = (data)=>requests.post('/customer/api/warehouse/inventory/cancel_outbound',qs.stringify(data));
//SKU待出库
export const skuDetail = (data)=>requests.post('/customer/api/warehouse/inventory/get_sku_treat_detail',qs.stringify(data));
//协同仓/代理仓待出库
export const treatDetail = (data)=>requests.post('/customer/api/warehouse/inventory/get_treat_detail',qs.stringify(data));
//SKU已出库/已弃货
export const skuOutlist = (data)=>requests.post('/customer/api/warehouse/inventory/get_sku_out_list',qs.stringify(data));
//协同仓/代理仓已出库/已弃货
export const Outlist = (data)=>requests.post('/customer/api/warehouse/inventory/get_out_list',qs.stringify(data));
//SKU已取消
export const skuCancel = (data)=>requests.post('/customer/api/warehouse/inventory/get_sku_cancel_detail',qs.stringify(data));
//协同仓/代理仓 已取消
export const getCancel = (data)=>requests.post('/customer/api/warehouse/inventory/get_cancel_detail',qs.stringify(data));

//包裹列表
export const manageList = (data)=>requests.post('/customer/api/warehouse/inventory/get_manage_list',qs.stringify(data));
//SKU列表
export const skuList = (data)=>requests.post('/customer/api/warehouse/inventory/get_sku_list',qs.stringify(data));

//首页
export const warehousehome = (data)=>requests.post('/customer/api/warehouse/inventory/get_home_data',qs.stringify(data));

//客户端首页 list
export const warehouseList = (data)=>requests.post('/customer/api/warehouse/inventory/get_goods_list',qs.stringify(data));

//更新PO/FBA、备注
export const updateInfo = (data)=>requests.post('/customer/api/warehouse/inventory/update_manage_info',qs.stringify(data));

// 获取自定义列表
export const getSetting = (data)=>requests.post('/customer/api/warehouse/inventory/get_setting',qs.stringify(data));

// 设置自定义列表
export const setSetting = (data)=>requests.post('/customer/api/warehouse/inventory/set_setting',qs.stringify(data));

// 导出
export const exportList = (data)=>requests.post('/customer/api/warehouse/inventory/export_manage_list',qs.stringify(data));

// 库存管理
export const get_stock_list = (data)=>requests.post('/customer/api/warehouse/inventory/get_stock_list',qs.stringify(data));

// 库存详情
export const get_stock_info = (data)=>requests.post('/customer/api/warehouse/inventory/get_stock_info',qs.stringify(data));

// 获取SKU列表
export const sku_get_list = (data)=>requests.post('/shipping/ShopifySku/get_list',qs.stringify(data));

// 获取商品SKU信息
export const sku_get_info = (data)=>requests.post('/shipping/ShopifySku/get_info',qs.stringify(data));

// 新增商品SKU
export const sku_add = (data)=>requests.post('/shipping/ShopifySku/add',qs.stringify(data));

// 编辑商品SKU
export const sku_edit = (data)=>requests.post('/shipping/ShopifySku/edit',qs.stringify(data));

// 删除商品SKU
export const sku_delete = (data)=>requests.post('/shipping/ShopifySku/delete',qs.stringify(data));

// 下载标签
export const sku_downloadLabel = (data)=>requests.post('/shipping/ShopifySku/downloadLabel',qs.stringify(data));

// 获取预装箱列表
export const box_get_list = (data)=>requests.post('/shipping/ShopifyBox/get_list',qs.stringify(data));

// 获取预装箱信息
export const box_get_info = (data)=>requests.post('/shipping/ShopifyBox/get_info',qs.stringify(data));

// 新增预装箱
export const box_add = (data)=>requests.post('/shipping/ShopifyBox/add',qs.stringify(data));

// 编辑预装箱
export const box_edit = (data)=>requests.post('/shipping/ShopifyBox/edit',qs.stringify(data));

// 删除预装箱
export const box_delete = (data)=>requests.post('/shipping/ShopifyBox/delete',qs.stringify(data));

// 获取可选的SKU
export const box_get_sku_list = (data)=>requests.post('/shipping/ShopifyBox/get_sku_list',qs.stringify(data));

// 获取商品类目
export const getCategory = (data)=>requests.post('/shipping/Category/CategoryTranslationGetById',qs.stringify(data));