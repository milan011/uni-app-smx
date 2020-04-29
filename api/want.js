import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import { httpApi } from '@/js_sdk/luch-request/index.js';
// 获取求购列表
export function getWantList(data) {
	const requestUrl = Config.url_config + '/Want/wantList'
	return httpApi.get(requestUrl, {data})
}
// 添加用户
export function editCustomer(data) {
	const requestUrl = Config.url_config + '/customer/edit'
	return httpApi.post(requestUrl, {...data})
}
// 添加求购
export function saveWant(data) {
	const requestUrl = Config.url_config + '/Want/savewant'
	return httpApi.post(requestUrl, {...data})
}
// 查看详情
export function getWant(data) {
	const requestUrl = Config.url_config + '/Want/getwant'
	return httpApi.get(requestUrl, {data})
}
// 获取跟踪记录
export function getwantfollow(data) {
	const requestUrl = Config.url_config + '/Want/getwantfollow'
	return httpApi.get(requestUrl, {data})
}
// 废弃车源
export function statusWant(data) {
	const requestUrl = Config.url_config + '/Want/statuswant'
	return httpApi.get(requestUrl, {data})
}
// 添加跟进
export function wantFollow(data) {
	const requestUrl = Config.url_config + '/Want/wantfollow'
	return httpApi.post(requestUrl, {...data})
}
// 提交修改
export function aveWant(data) {
	const requestUrl = Config.url_config + '/Want/savewant'
	return httpApi.post(requestUrl, {...data})
}
// export function saveWant(data) {
// 	const requestUrl = Config.url_config + '/Want/savewant'
// 	return httpApi.post(requestUrl, {...data})
// }