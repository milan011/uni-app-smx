import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

export function getcustomerList(data) {
	const requestUrl = Config.url_config + '/customer/pagecustomer'
	return httpApi.get(requestUrl, {data})
}
export function getCustomerDetail(data) {
	const requestUrl = Config.url_config + '/customer/detail'
	return httpApi.get(requestUrl, {data})
}
export function delCustomer(data) {
	const requestUrl = Config.url_config + '/customer/delete'
	return httpApi.get(requestUrl, {data})
}
export function editCustomer(data) {
	const requestUrl = Config.url_config + '/customer/edit'
	return httpApi.post(requestUrl, {...data})
}
