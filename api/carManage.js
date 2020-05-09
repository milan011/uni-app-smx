
import Config from '@/common/config.js'
import { httpApi } from '@/js_sdk/luch-request/index.js';
//获取车源列表
export function getCarList(data) {
	const requestUrl = Config.url_config + '/car/page'
	return httpApi.post(requestUrl,{...data})
}
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
//车源图片上传
export function imgUpload(data) {
	
	const requestUrl = Config.url_config + '/car/uploadimage'
	return httpApi.upload(requestUrl, {
	  params: {shopid: data.shopid, pshopid: data.pshopid},  //会加在url上 
	  files: [], // 仅5+App支持
	  fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
	  filePath: data.path, // 要上传文件资源的路径。
	  name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
	  header: {}, // 如填写，会覆盖全局header,
	  custom: {}, // 自定义参数
	  formData: {}, // HTTP 请求中其他额外的 form data
	  // 返回当前请求的task, options。请勿在此处修改options。非必填
	  getTask: (task, options) => {
	    // setTimeout(() => {
	    //   task.abort()
	    // }, 500)
	  }
	})
}
//车源图片添加
export function imgAdd(data) {
	
	const requestUrl = Config.url_config + '/car/addcarimage'
	return httpApi.post(
		requestUrl, { ...data }
	)
}
//车源图片删除
export function imgDelete(data) {
	
	const requestUrl = Config.url_config + '/car/deleteimagepart'
	return httpApi.get(
		requestUrl, { params: { ...data } }
	)
}
//车源图片删除BY-id
export function imgDeleteById(imgId) {
	
	const requestUrl = Config.url_config + '/car/deleteimage'
	return httpApi.get(
		requestUrl, { params: { id: imgId } }
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
		requestUrl, { params: { id: carId, imagetype:0 } }
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