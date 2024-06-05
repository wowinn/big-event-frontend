import request from '@/utils/request.js'

//文章分类列表查询
export const articeCategoryListService = () => {
    return request.get('/category')
}