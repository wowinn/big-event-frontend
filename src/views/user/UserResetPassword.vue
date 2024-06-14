<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

//定义数据模型
const userData = ref({
    email: '',
    code: '',
    newPassword: '',
    rePassword: '',
})

//检验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== userData.value.newPassword) {
        callback(new Error('请确保两次输入的密码一样'))
    } else {
        callback()
    }
}
//定义表单校验规则
const rules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}


//绑定数据，复用注册表单的数据模型
//表单数据校验
//登录函数
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
const router = useRouter()

const timeSecound = ref(60)
let timerId = null;

const startTimer = () => {
  if (timerId === null) {
    timerId = setInterval(() => {
        timeSecound.value--;
      if (timeSecound.value <= 0) {
        stopTimer();
      }
    }, 1000);
  }
};
 
const stopTimer = () => {
  if (timerId !== null) {
    clearInterval(timerId);
    isSend.value = false
    timeSecound.value = 60
    timerId = null;
  }
};
const isSend = ref(false)

//返回登录界面函数
const back = () => {
    router.push('/login')
}

import { userPwdResetService, UserSendCodeService } from '@/api/user'
//发现验证码函数
const sendCode = async() => {
    // isSend.value = true
    // startTimer()
    if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.value.email) == false) {
        ElMessage.error('请先输入有效的邮箱地址')
    } else {
        isSend.value = true
        startTimer()
        let result = await UserSendCodeService(userData.value.email)
        ElMessage.success('发送成功')
    }
}


//重置密码函数
const resetPwd = async() => {
    let result = await userPwdResetService(userData.value)
    ElMessage.success('重置密码成功')
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 找回密码表单 -->
            <el-form ref="form" size="large" autocomplete="off" :model="userData" :rules="rules" >
                <el-form-item>
                    <h1>找回密码</h1>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input :prefix-icon="User" placeholder="请输入邮箱地址" v-model="userData.email"></el-input>
                </el-form-item>
                <div style="display: flex; ">
                    <el-form-item prop="code" style="flex: 4;">
                        <el-input name="password" :prefix-icon="Lock" placeholder="请输入邮箱验证码" v-model="userData.code"></el-input>
                    </el-form-item>
                    <el-form-item style="flex: 1;">
                        <el-button class="right-button" type="primary" auto-insert-space :disabled="isSend" @click="sendCode()">
                            <div v-if="isSend">{{timeSecound}}秒后重试</div>
                            <div v-else >获取验证码</div>
                        </el-button>
                    </el-form-item>
                </div>
                <el-form-item prop="newPassword">
                    <el-input name="password" :prefix-icon="Lock" type="password" show-password placeholder="请输入新密码"
                        v-model="userData.newPassword"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input name="password" :prefix-icon="Lock" type="password" show-password placeholder="请确认新密码"
                        v-model="userData.rePassword"></el-input>
                </el-form-item>
                <div style="display: flex; ">
                    <el-form-item style="flex: 1;">
                        <el-button class="left-button" type="primary" auto-insert-space @click="resetPwd()">
                            确定
                        </el-button>
                    </el-form-item>
                    <el-form-item style="flex: 1;">
                        <el-button class="right-button" auto-insert-space @click="back()">
                            返回
                        </el-button>
                    </el-form-item>
                </div>
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

        .left-button {
            margin-right: 10px;
            width: 100%;
        }
        .right-button {
            margin-left: 10px;
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