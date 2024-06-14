<script setup>
import { ref } from 'vue'

const userPwd = ref({
    oldPassword: '',
    newPassword: '',
    rePassword: ''
})

//检验密码的函数
const checkRePassword = (rule, value, callback) => {
    if(value === '') {
        callback(new Error('请确认新密码'))
    } else if(value !== userPwd.value.newPassword) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}
//定义表单校验规则
const rules = {
    oldPassword: [
        {required: true, message: '请输入原密码', trigger: 'blur'},
        {min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur'}
    ],
    newPassword:[
        {required: true, message: '请输入新密码', trigger: 'blur'},
        {min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur'}
    ],
    rePassword: [
        {required: true, validator: checkRePassword, trigger: 'blur'}
    ]
}

import { userPwdUpdateService } from '@/api/user'
import { ElMessage } from 'element-plus';
//修改用户密码
import { useTokenStore }  from '@/stores/token.js'
import useUserInfoStore from '@/stores/userInfo.js'
import { useRouter } from 'vue-router'
const tokenStore = useTokenStore()
const userInfoStore = useUserInfoStore()
const router = useRouter()
const updateUserPassword = async() => {
    //调用接口
    let result = await userPwdUpdateService(userPwd.value)
    ElMessage.success(result.msg? result.msg : '修改密码成功，请重新登录')

    tokenStore.removeToken()
    userInfoStore.removeInfo()
    //跳转到登录页面
    router.push('/login')
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userPwd" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPassword" >
                        <el-input v-model="userPwd.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="userPwd.newPassword" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="rePassword">
                        <el-input v-model="userPwd.rePassword" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserPassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>