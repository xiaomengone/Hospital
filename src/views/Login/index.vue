<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { showToast, type FormInstance } from 'vant'
import 'vant/es/toast/style'
import { mobileRule, codeRules, passwordRules } from '@/utils/rules'
import { loginByCode, loginByPassword, sendPhoneCode } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const store = useUserStore()
let checked = ref(false)
const mobile = ref('')
const password = ref('')
let showPassword = ref(true)
//登录按钮(同时支持密码登录)
const onSubmit = async () => {
  if (!checked.value) {
    return showToast('请同意用户协议')
  }
  const res = phoneMessage.value
    ? await loginByCode(mobile.value, code.value)
    : await loginByPassword(mobile.value, password.value)
  store.setUser(res.data)
  //不会产生新的路由记录，后退时不影响
  router.push((route.query.returnUrl as string) || '/user')
}

//短信登录的切换，false为密码登录，true为验证码登录
let phoneMessage = ref(false)
let code = ref('')
const timeOver = ref(0)
let timerId: number
const form = ref<FormInstance | null>(null)
const sendCode = async () => {
  //正在倒计时return
  if (timeOver.value > 0) return
  await form.value?.validate('mobile')
  await sendPhoneCode(mobile.value, 'login')
  //短信倒计时
  timeOver.value = 60
  if (timerId) clearInterval(timerId)
  timerId = setInterval(() => {
    timeOver.value--
    if (timeOver.value <= 0) clearInterval(timerId)
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<template>
  <CpNavBar rightText="注册" @onClickRight="$router.push('/register')" />
  <div class="prompt">
    <div class="promptLeft">
      {{ phoneMessage ? '短信验证码登录' : '密码登录' }}
    </div>
    <a class="promptRight" @click="phoneMessage = !phoneMessage"
      >{{ phoneMessage ? '密码登录' : '短信验证码登录' }}
      <van-icon name="arrow"
    /></a>
  </div>
  <!-- form表单 -->
  <van-form @submit="onSubmit" autocomplete="off" ref="form">
    <van-field
      v-model="mobile"
      type="text"
      name="mobile"
      placeholder="请填写用户名"
      :rules="mobileRule"
    />
    <van-field
      v-if="!phoneMessage"
      v-model="password"
      :type="`${showPassword ? 'password' : 'text'}`"
      name="password"
      placeholder="请填写密码"
      :rules="passwordRules"
    >
      <template #button>
        <SvgIcon
          :name="`login-eye-${showPassword ? 'on' : 'off'}`"
          @click="showPassword = !showPassword"
        ></SvgIcon>
      </template>
    </van-field>
    <!-- 手机短信登录 -->
    <van-field
      v-else
      v-model="code"
      :type="`${showPassword ? 'password' : 'text'}`"
      name="password"
      placeholder="请填写验证码"
      :rules="codeRules"
    >
      <template #button>
        <div class="btn-send" @click="sendCode">
          {{ timeOver > 0 ? `${timeOver}秒后发送验证码` : '发送短信' }}
        </div>
      </template>
    </van-field>
    <van-checkbox v-model="checked"
      >我已同意 <a href="">用户协议</a> 及 <a href="">隐私条款</a></van-checkbox
    >
    <div style="margin: 60px 0 30px 0">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <a href="" style="margin: 16px">忘记密码？</a>
  </van-form>
  <!-- 底部 -->
  <div class="login-other">
    <van-divider>第三方登录</van-divider>
    <div class="icon">
      <img src="@/assets/qq.svg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.prompt {
  // border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  .promptLeft {
    font-size: 24px;
  }
  .promptRight {
    font-size: 15px;
  }
}
// 发送短信按钮
.btn-send {
  color: var(--cp-primary);
  active {
    color: rgba(22, 194, 163, 0.5);
  }
}
// form表单

::v-deep {
  .van-checkbox {
    margin-top: 30px;
  }
}
// 底部
.login-other {
  margin-top: 60px;
  padding: 0 30px;
  .icon {
    display: flex;
    justify-content: center;
    img {
      width: 36px;
      height: 36px;
      padding: 4px;
    }
  }
}
</style>
