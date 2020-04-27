import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import { httpApi } from '@/js_sdk/luch-request/index.js';
// 获取求购列表
export function getWantList(data) {
	const requestUrl = Config.url_config + '/Want/wantList'
	return httpApi.get(requestUrl, {data})
}
