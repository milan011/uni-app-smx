
import urlConfig from '@/common/config.js'
import { http } from '@/js_sdk/luch-request/index.js';

export function getMarketShopList(data) {
	console.log(data)
	const requestUrl = urlConfig.url_config + '/shop/allbylevel'
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl, {data})
}

export function getMarketByAppid(data) {
	console.log(data)
	const requestUrl = urlConfig.url_config + '/shop/shop'
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl, {data})
}