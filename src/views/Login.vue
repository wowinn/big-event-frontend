<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
//定义数据模型
const registerData = ref({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    remerber: false
})
//检验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== registerData.value.password) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}
//定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

//调用后台接口，完成注册
import { userRegisterService, userLoginService } from "@/api/user.js"
const register = async () => {
    let result = await userRegisterService(registerData.value)
    ElMessage.success('注册成功')
}

//绑定数据，复用注册表单的数据模型
//表单数据校验
//登录函数
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import Cookies from 'js-cookie'
import { encrypt, decrypt } from '@/utils/encrypt'
const router = useRouter()
const tokenStore = useTokenStore()
const login = async () => {
    let result = await userLoginService(registerData.value)
    ElMessage.success('登录成功')
    //存储token
    tokenStore.setToken(result.data)
    //跳转到首页 路由完成跳转
    router.push('/')
    //使用cookie实现记住我功能
    if (registerData.value.remerber) {
        Cookies.set("username", registerData.value.username, { expires: 7, sameSite: 'None', secure: true }) //设置有效期为7天
        Cookies.set("password", encrypt(registerData.value.password), { expires: 7, sameSite: 'None', secure: true })
        Cookies.set("remerber", true, {expires: 7, sameSite: 'None', secure: true })
    } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('remerber')
    }
}

//读取cookie
const getCookie = () => {
    let username = Cookies.get('username')
    let password = Cookies.get('password')
    let remerber = Boolean(Cookies.get('remerber'))
    registerData.value.username = username === undefined ? registerData.value.username : username
    registerData.value.password = password === undefined ? registerData.value.password : decrypt(password)
    registerData.value.remerber = remerber === undefined ? false : remerber
}
getCookie()

//定义函数，清空数据模型的数据
const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: '',
        remerber: false
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input :prefix-icon="Lock" placeholder="请输入邮箱"
                        v-model="registerData.email"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" show-password placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" show-password placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;  getCookie()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" show-password placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox v-model="registerData.remerber">记住我</el-checkbox>
                        <el-link type="primary" :underline="false" href="/passwd/reset">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>