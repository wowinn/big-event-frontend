//导入vue-router
import { createRouter, createWebHistory } from "vue-router"
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ArticleCategoryVue from "@/views/article/ArticleCategory.vue"
import ArticleManageVue from "@/views/article/ArticleManage.vue"
import UserAvatarVue from "@/views/user/UserAvatar.vue"
import UserInfoVue from "@/views/user/UserInfo.vue"
import UserUpdatePasswordVue from "@/views/user/UserUpdatePassword.vue"
import UserFindPassword from "@/views/user/UserResetPassword.vue"

//定义路由关系
const routes = [
    { 
        path: '/login', 
        component: LoginVue, 
    },
    {
        path: '/passwd/reset',
        component: UserFindPassword
    },
    {
        path: '/',
        component: LayoutVue,
        //重定向
        redirect: '/artice/manage',
        //子路由
        children: [
            { path: '/artice/category', component: ArticleCategoryVue },
            { path: '/artice/manage', component: ArticleManageVue },
            { path: '/user/avatar', component: UserAvatarVue },
            { path: '/user/info', component: UserInfoVue },
            { path: '/user/updatePassword', component: UserUpdatePasswordVue },
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router