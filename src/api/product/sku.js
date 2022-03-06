import request from '@/utils/request'

// 获取sku列表
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 上架sku
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

// 下架sku
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 删除sku
export const reqDeleteSku = (skuId) => request({ url: `/admin/product/deleteSku/${skuId}`, method: 'delete' })

// 获取sku详情
export const reqSKuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })

