import Config from '@/common/config.js'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';
export function getContractList(data) {
	const requestUrl = Config.url_config + '/contract/page'
	return httpApi.post(requestUrl,{...data})
}
// 删除合同
export function deleteContract(data) {
	const requestUrl = Config.url_config + '/contract/delete'
	return httpApi.get(requestUrl,{data})
}