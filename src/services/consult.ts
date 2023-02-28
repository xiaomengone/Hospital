import type { Imag, TopDep } from './../typs/consult.d'
import type {
  docData,
  docQuery,
  FollowType,
  consultQuery,
  consultResponse
} from '@/typs/consult.d'
// import type { consultQuery, consultResponse } from '@/typs/consult'
import { request } from '@/utils/request'

export const getKnowlegePage = (value: consultQuery) => {
  return request<consultResponse>('/patient/home/knowledge', 'get', value)
}
//关注医生的列表
export const getDocrPage = (val: docQuery) => {
  return request<docData>('/home/page/doc', 'get', val)
}
export const followTarget = (id: string, type: FollowType = 'doc') => {
  return request('/like', 'post', { id, type })
}

//选择科室
export const getAllDep = () => {
  return request<TopDep[]>('/dep/all', 'get')
}

//上传文件
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Imag>('/upload', 'post', fd)
}
