import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

export function getCarList(data) {
	const requestUrl = Config.url_config + '/car/jypage'
	return httpApi.post(requestUrl,{...data})
}
export function getCarTypeList() {
	const requestUrl = Config.url_config + '/common/getAllSeries'
	return httpApi.get(requestUrl)
}
export function getCarShopList(data) {
	const requestUrl = Config.url_config + '/shop/qdpage'

	return httpApi.get(requestUrl,{data})
}
export function getCarDetail(data) {
	const requestUrl = Config.url_config + '/car/detail'
	return httpApi.get(requestUrl,{data})
}
// 车辆检测状态
export function getCarCheckStatus(data) {
	const requestUrl = Config.url_config + '/car/checkstatus'
	return httpApi.get(requestUrl,{data})
}
//VIN
export function getCarModelConfigByTid(data) {
	const requestUrl = Config.url_config + '/common/getCarModelConfigByTid?tid='+data.tid
	return httpApi.post(requestUrl,{...data})
}
export function getCarTypeByVin(data) {
	const requestUrl = Config.url_config + '/common/getCarTypeByVin?vin='+data.vin
	return httpApi.post(requestUrl,{...data})
}
