import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import { http } from '@/js_sdk/luch-request/index.js';



export function loginByUser(data) {
  /*const query = { data: {id: '23'} }
  const data = { id: '222' }*/
  // return uniRequest.get(urlConfig + '/user?id=12345')
	// const data = { UserPhone: 'wcg', NewPassword: '111111' }
	const requestUrl = Config.url_config + '/user/Login'
	return http.post(requestUrl, data)
}