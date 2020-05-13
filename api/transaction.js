import Config from '@/common/config.js'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';
// 交易列表
export function getTransactionList(data) {
	const requestUrl = Config.url_config + '/transaction/page'
	return httpApi.post(requestUrl, {...data})
}
// 交易创建
export function transactionCreate(data) {
	const requestUrl = Config.url_config + '/transaction/edit'
	return httpApi.post(requestUrl, {...data})
}
// 获取详情
export function getDetail(data) {
	const requestUrl = Config.url_config + '/transaction/detail'
	return httpApi.get(requestUrl, {data})
}
// 反结算
export function del(data) {
	const requestUrl = Config.url_config + '/transaction/delete'
	return httpApi.get(requestUrl, {data})
}
//确认
export function editstatus(data) {
	const requestUrl = Config.url_config + '/transaction/editstatus'
	return httpApi.get(requestUrl, {data})
}