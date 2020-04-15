import urlConfig from '@/common/config.js'
// import uniRequest from 'uni-request'
import { http } from '@/js_sdk/luch-request/index.js';



export function loginByUser() {
  /*const query = { data: {id: '23'} }
  const data = { id: '222' }*/
  // return uniRequest.get(urlConfig + '/user?id=12345')
	const data = { username: 'wcg', password: '111111' }
	const requestUrl = urlConfig + 'login'
  return http.post('http://www.mycnc.net/login', data)
				/*.then(res => {})
				.catch(err => {})*/;
}