
import urlConfig from '@/common/config.js'
import { http } from '@/js_sdk/luch-request/index.js';



export function getMarketShopList() {
	const requestUrl = urlConfig.url_config + '/shop/allbylevel'
  return http.get(requestUrl, { params: { pid: '0' } })
}