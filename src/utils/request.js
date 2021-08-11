import axios from 'axios'
import { Toast } from 'vant'
import { domain } from '@/utils/env'

let loading = null // 全局接口请求loading实例

// 创建 axios 实例
const service = axios.create({
  baseURL: domain,
  // 携带凭证
  withCredentials: true,
  timeout: 30000
})

// 响应错误方法
const err = error => {
  loading && loading.clear()
  const data = error.response
  if (data) {
    Toast(data.statusText || '网络不给力')
  }
  return Promise.reject(error.message)
}

// post请求合并默认参数
const mergeParams = params => {
  params = params || {}
  // 自己实现
  return JSON.stringify(params)
}

// request interceptor
service.interceptors.request.use(config => {
  loading && loading.clear()
  loading = Toast.loading({
    message: '加载中...',
    forbidClick: false,
    duration: 0
  })
  config.data = config.method === 'post' ? mergeParams(config.data) : config.data
  return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
  loading && loading.clear()
  const { head, body } = response.data
  if (+head.result === 0) {
    return { body: body || true }
  }
  Toast(head.errorMessage || '出错了')
  return { result: head.result, msg: head.errorMessage }
}, err)

export { service as axios }
