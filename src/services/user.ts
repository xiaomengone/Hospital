import type { User, codeType, UserInfo, Patient } from './../typs/user.d'
import { request } from '@/utils/request'
//密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'post', { mobile, password })
}
//验证码登录
export const sendPhoneCode = (mobile: string, type: codeType) => {
  return request('code', 'get', { mobile, type })
}

export const loginByCode = (mobile: string, code: string) => {
  return request<User>('/login', 'post', { mobile, code })
}

//个人中心
export const getUserInfo = () => {
  return request<UserInfo>('/patient/myUser')
}

//家庭档案
export const getPatientList = () => {
  return request<Patient[]>('/patient/mylist')
}

//添加患者信息
export const addPatient = (patient: Patient) => {
  return request<{ id: string }>('/patient/add', 'post', patient)
}

export const editPatient = (patient: Patient) => {
  request<{ id: string }>('/patient/update', 'put', patient)
}

//删除患者信息
export const delPatient = (id: string) => {
  return request<{ id: string }>(`/patient/del/${id}`, 'delete')
}
