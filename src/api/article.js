import request from '@/utils/request.js'
import { useTokenStore } from '@/stores/token.js'

//文章分类列表查询
export const articeCategoryListService = () => {
    // const tokenStore = useTokenStore()
    //在pinia中定义的响应式数据，都不需要.value
    // return request.get('/category', {headers:{'Authorization': tokenStore.token}})
    return request.get('/category')
}

//文章分类添加
export const articeCategoryAddService = (categoryData) => {
    return request.post('/category', categoryData)
}

//文章分类修改
export const articeCategoryUpdateService = (categoryData) => {
    return request.put('/category', categoryData)
}

//文章分类删除
export const articeCategoryDeleteService = (id) => {
    return request.delete('/category?id=' + id)
}

//文章列表查询
export const articleListService = (params) => {
    return request.get('/article', {params:params})
}