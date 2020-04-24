
import urlConfig from '@/common/config.js'
import { httpApi } from '@/js_sdk/luch-request/index.js';



export function getExampleList() {
  /*const query = { data: {id: '23'} }
  const data = { id: '222' }*/
  // return uniRequest.get(urlConfig + '/user?id=12345')
  return httpApi.get('http://www.mycnc.net/list', { params: { id: '111' } })
				/*.then(res => {})
				.catch(err => {})*/;
}

/*http.get('/user/login', {params: {userName: 'name', password: '123456'}}).then(res => {

}).catch(err => {

})
// 局部修改配置，局部配置优先级高于全局配置
http.get('/user/login', {
    params: {userName: 'name', password: '123456'},  //会加在url上 
    header: {},  //会覆盖全局header 
    dataType: 'json',
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // #ifdef MP-ALIPAY
    timeout: 30000, // 仅支付宝小程序支持
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    // #endif
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
         // setTimeout(() => {
         //   task.abort()
         // }, 500)
    }
}).then(res => {

}).catch(err => {

})*/

/*http.post('/user/login', {userName: 'name', password: '123456'} ).then(res => {

}).catch(err => {

})*/
// 局部修改配置，局部配置优先级高于全局配置
/*http.post('/user/login', {userName: 'name', password: '123456'}, {
    params: {},  //会加在url上 
    header: {},  //会覆盖全局header 
    dataType: 'json',
    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
    // #ifndef MP-ALIPAY || APP-PLUS
    responseType: 'text',
    // #endif
    // #ifdef MP-ALIPAY
    timeout: 30000, // 仅支付宝小程序支持
    // #endif
    // #ifdef APP-PLUS
    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
    // #endif
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
         // setTimeout(() => {
         //   task.abort()
         // }, 500)
    }
}).then(res => {

}).catch(err => {

})*/

// 具体参数说明：[uni.uploadFile](https://uniapp.dcloud.io/api/request/network-file)
  /*http.upload('api/upload/img', {
    params: {},  //会加在url上 
    files: [], // 仅5+App支持
    fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
    filePath: '', // 要上传文件资源的路径。
    name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
    header: {}, // 如填写，会覆盖全局header,
    custom: {}, // 自定义参数
    formData: {}, // HTTP 请求中其他额外的 form data
    // 返回当前请求的task, options。请勿在此处修改options。非必填
    getTask: (task, options) => {
      // setTimeout(() => {
      //   task.abort()
      // }, 500)
    }
  }).then(res => {
    // 返回的res.data 已经进行JSON.parse
  }).catch(err => {

  })*/

  // 具体参数说明：[uni.downloadFile](https://uniapp.dcloud.io/api/request/network-file?id=downloadfile)
  /*http.download('api/download', {
    params: {},  //会加在url上 
    header: {}, // 如填写，会覆盖全局header,
    custom: {}, // 自定义参数
    // 返回当前请求的task, options。非必填
    getTask: (task, options) => {
      // setTimeout(() => {
      //   task.abort()
      // }, 500)
    }
  }).then(res => {

  }).catch(err => {

  })*/