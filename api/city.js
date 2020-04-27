
import Config from '@/common/config.js'
import { httpApi } from '@/js_sdk/luch-request/index.js';

//获取所有省份信息
export function getAllProvince() {
	
	const requestUrl = Config.url_config + '/common/getcity?pid=1'
	return httpApi.get(
		requestUrl
	)
}
//根据省份获取下属城市信息
export function getCityByProvince(pid) {
	
	const requestUrl = Config.url_config + '/common/getcity'
	return httpApi.get(
		requestUrl, { params: { pid: pid } }
	)
}
