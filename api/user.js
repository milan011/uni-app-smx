import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi, http
} from '@/js_sdk/luch-request/index.js';
// 获取用户列表
export function getcustomerList(data) {
	const requestUrl = Config.url_config + '/customer/pagecustomer'
	return httpApi.get(requestUrl, {data})
}
// 切换用户
export function userChangeLogin(userid) {
	const requestUrl = Config.url_config + '/user/clearopenid?userid=' + userid
	return httpApi.get(requestUrl)
}
// 获取用户详情
export function getCustomerDetail(data) {
	const requestUrl = Config.url_config + '/customer/detail'
	return httpApi.get(requestUrl, {data})
}
// 删除用户
export function delCustomer(data) {
	const requestUrl = Config.url_config + '/customer/delete'
	return httpApi.get(requestUrl, {data})
}
// 修改用户详情
export function editCustomer(data) {
	const requestUrl = Config.url_config + '/customer/edit'
	return httpApi.post(requestUrl, {...data})
}
// 获取用户平台车源,求购数量等
export function getUserGeneral() {
	const requestUrl = Config.url_config + '/user/sysinfo'
	return httpApi.get(requestUrl)
}
// 获取用户详情(分享用)
export function getShareUserInfo(userId) {
	const requestUrl = Config.url_config + '/user/userinfo?id=' + userId
	return http.get(requestUrl)
}
