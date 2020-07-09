
import urlConfig from '@/common/config.js'
import { http } from '@/js_sdk/luch-request/index.js';

export function getMarketShopList(data) {
	const requestUrl = urlConfig.url_config + '/shop/allbylevel'
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl, {data})
}

export function getMarketByAppid(data) {
	const requestUrl = urlConfig.url_config + '/shop/shop'
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl, {data})
}

export function getMarketByDomain(data) {
	const requestUrl = urlConfig.url_config + '/shop/getshopid'
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl, {data})
}

//一级市场信息:logo,关于我们等
export function getMarketDetail(p_shop_id) {
	const requestUrl = urlConfig.url_config + '/shop/getdetailimage?id=' + p_shop_id
  // return http.get(requestUrl, { params: { pid: '0' } })
  return http.get(requestUrl)
}