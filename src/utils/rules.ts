import type { FieldRule } from 'vant'
const mobileRule: FieldRule[] | undefined = [
  { required: true, message: '请填写手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const passwordRules: FieldRule[] | undefined = [
  { required: true, message: '请填写密码' },
  { pattern: /^\w{8,24}$/, message: '密码格式不正确' }
]
//短信登录验证
const codeRules: FieldRule[] | undefined = [
  { required: true, message: '请填写密码' },
  { pattern: /^\d{6}$/, message: '验证码格式不正确' }
]
export { mobileRule, passwordRules, codeRules }
