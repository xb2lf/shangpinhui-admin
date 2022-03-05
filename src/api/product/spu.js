import request from '@/utils/request'

// 获取spu列表
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取spu信息
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取品牌信息列表
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取SPU图片列表
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取平台中全部的销售属性
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 添加或更新spu
export const reqAddUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
  }
}

// 删除spu
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 获取售卖属性
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加或更新SKU信息
export const reqAddUpdateSkuInfo = (skuInfo) => {
  if (skuInfo.id) {
    return request({ url: '/admin/product/updateSkuInfo', method: 'post', data: skuInfo })
  } else {
    return request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })
  }
}

// 获取sku列表
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
