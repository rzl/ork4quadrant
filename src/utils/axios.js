import axios from 'axios'
import { MessageBox } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'


var service = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 60 * 60 * 1000 // 请求超时时间
})

service.interceptors.request.use(config => {
  console.log(getToken())
  config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      console.log(response.data)
      return Promise.reject(response.data)
    }
    if (response.code === 50008 || response.code === 50012 || response.code === 50014) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken()
        location.reload()
      })
    }
    return response.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)  
  }
)

export default service