
import Config from '@/common/config.js'
import { httpApi } from '@/js_sdk/luch-request/index.js';

//获取车源详情
export function getCarDetail(carId) {
	
	const requestUrl = Config.url_config + '/car/htdetail'
	return httpApi.get(
		requestUrl, { params: { id: carId } }
	)
}
//车源基本信息保存
export function editCarInfo(data) {
	
	const requestUrl = Config.url_config + '/car/edit'
	return httpApi.post(
		requestUrl, { ...data }
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

//获取车源评估图片
export function getCarImgsAsse(carId) {
	
	const requestUrl = Config.url_config + '/car/pgimglist'
	return httpApi.get(
		requestUrl, { params: { id: carId } }
	)
}

//vin码是否重复
export function vinRepeatCheck(vinCode) {
	
	const requestUrl = Config.url_config + '/car/validatevin'
	return httpApi.get(
		requestUrl, { params: { vin: vinCode } }
	)
}

//vin码获取车型信息
export function getCarInfoByWin(vinCode) {
	
	const requestUrl = Config.url_config + '/common/getCarTypeByVin'
	return httpApi.get(
		requestUrl, { params: { vin: vinCode } }
	)
}