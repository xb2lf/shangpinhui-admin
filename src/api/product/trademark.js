import request from '@/utils/request'

// 获取品牌列表
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 新增品牌/修改品牌
export const reqAddUpdateTradeMark = (data) => {
  if (data.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data })
  }
}

// 删除品牌
export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
