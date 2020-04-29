import Request from './request'
import store from '@/store' 


const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://www.aaa.cn'
  config.header = {
    ...config.header,
    /*a: 1,
    b: 2*/
  }
  // config.custom = { auth: true }
  return config
})

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    // a: 3
  }
	console.log('http', 'go go go')
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  /*
  if (!token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  */
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
  return statusCode === 200
}

http.interceptor.response((response) => { /* 请求之后拦截器 */
  return response
}, (response) => { // 请求错误做点什么
  return response
})

const httpApi = new Request()

httpApi.setConfig((config) => { /* 设置全局配置 */
  config.baseUrl = 'http://www.bbb.cn' /* 根域名不同 */
  config.header = {
    ...config.header,
    /*a: 1,
    b: 2*/
  }
  return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
httpApi.validateStatus = (statusCode) => {
  return statusCode === 200
}

httpApi.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
  config.header = {
    ...config.header,
    token:store.state.userInfo.token
    // b: 1
  }
  // console.log('store',store.state)
  
  if (!store.state.userInfo.token) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
    // alert('token none')
    cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
  }
  
  return config
})

httpApi.interceptor.response((response) => { /* 请求之后拦截器 */
  // if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //   return Promise.reject(response)
  // }
  // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  // console.log('且慢')
  // console.log('大圣收了神通吧')
  // return false
  return response
}, (response) => { // 请求错误做点什么
  return response
})

export {
  httpApi,
  http
}
