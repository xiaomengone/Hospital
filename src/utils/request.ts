// import { User } from '@/typs/user'
import router from '@/router'
import axios, { type Method } from 'axios'
import { showToast } from 'vant'
import { useUserStore } from '@/stores'
const baseURL = 'https://consult-api.itheima.net/'

const instance = axios.create({
  baseURL,
  timeout: 1000
})
//1:请求拦截器
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.code != 10000) {
      showToast(response.data.message || '网络异常')
      return Promise.reject(response.data)
    }
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      const store = useUserStore()
      store.delUser()
      router.push(`/login?returnUrl=${router.currentRoute.value.fullPath}`)
    }
    return Promise.reject(error)
  }
)

//请求工具函数
type Data<T> = {
  code: string
  message: string
  data: T
}
const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object
) => {
  //泛型的第二个参数，可以自定义响应数据类型
  return instance.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export { instance, baseURL, request }
