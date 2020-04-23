import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

//获取车源详情
export function getCarDetail(carId) {
	const requestUrl = Config.url_config + '/car/detail'

	return httpApi.get(
		requestUrl, { params: { id: carId } }
	)
}
//获取车源跟踪信息
export function getCarFollow(carId) {
	const requestUrl = Config.url_config + '/car/carfollowlist'

	return httpApi.get(
		requestUrl, { params: { carid: carId } }
	)
}
//获取车源基本图片
export function getCarImgsNormal(carId) {
	const requestUrl = Config.url_config + '/car/imagelist'
	
	return httpApi.get(
		requestUrl, { params: { id: carId, imagetype:101 } }
	)
}
//获取车源证件图片
export function getCarImgsCer(carId) {
	const requestUrl = Config.url_config + '/car/cerimglist'
	
	return httpApi.get(
		requestUrl, { params: { id: carId, imagetype:101 } }
	)
}
//获取车源附加图片
export function getCarImgsExt(carId) {
	const requestUrl = Config.url_config + '/car/imagelist'
	
	return httpApi.get(
		requestUrl, { params: { id: carId, imagetype:0 } }
	)
}