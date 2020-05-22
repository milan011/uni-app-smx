import Config from '@/common/config.js'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';
export function getBusinessList(data) {
	const requestUrl = Config.url_config + '/opportunity/page'
	return httpApi.get(requestUrl, {data})
}
export function getShopList(data) {
	const requestUrl = Config.url_config + '/shop/childpage'
	return httpApi.get(requestUrl, {data})
}
export function oppFeed(data) {
	const requestUrl = Config.url_config + '/opportunity/editopp'
	return httpApi.get(requestUrl, {data})
}
export function edit(data) {
	const requestUrl = Config.url_config + '/opportunity/edit'
	return httpApi.post(requestUrl, {...data})
}
export function del(data) {
	const requestUrl = Config.url_config + '/opportunity/delete'
	return httpApi.get(requestUrl, {data})
}
export function opporout(data) {
	const requestUrl = Config.url_config + '/opportunity/opporout'
	return httpApi.get(requestUrl, {data})
}