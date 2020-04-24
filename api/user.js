import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

export function getcustomerList(data) {
	const requestUrl = Config.url_config + '/customer/page'

	return httpApi.get(requestUrl, {data})
}

export function createCustomer(data) {
	const requestUrl = Config.url_config + '/customer/edit'

	return httpApi.post(requestUrl, {...data})
}