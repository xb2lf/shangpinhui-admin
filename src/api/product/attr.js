import request from '@/utils/request'

// 获取一级分类
export const reqcategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

// 获取二级分类
export const reqcategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 获取二级分类
export const reqcategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// 获取平台属性列表
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加和修改属性与属性值
export const reqSetAttr = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })

