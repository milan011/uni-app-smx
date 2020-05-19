import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	http
} from '@/js_sdk/luch-request/index.js';

export function getCarList(data) {
	
const requestUrl = Config.url_config + '/car/jypage'
	return http.post(requestUrl,{...data}) 
}
export function getCarTypeList() {
	const requestUrl = Config.url_config + '/common/getAllSeries'
	return http.get(requestUrl)
}
export function getCarShopList(data) {
	const requestUrl = Config.url_config + '/shop/qdpage'

	return http.get(requestUrl,{data})
}
export function getCarDetail(data) {
	const requestUrl = Config.url_config + '/car/detail'
	return http.get(requestUrl,{data})
}
// 车辆检测状态
export function getCarCheckStatus(data) {
	const requestUrl = Config.url_config + '/car/checkstatus'
	return http.get(requestUrl,{data})
}
//VIN
export function getCarModelConfigByTid(data) {
	const requestUrl = Config.url_config + '/common/getCarModelConfigByTid?tid='+data.tid
	return http.post(requestUrl,{...data})
}
export function getCarTypeByVin(data) {
	const requestUrl = Config.url_config + '/common/getCarTypeByVin?vin='+data.vin
	return http.post(requestUrl,{...data})
}
