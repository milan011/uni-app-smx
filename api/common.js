import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

export function getAllBrand() { //获取所有品牌车型信息
	const requestUrl = Config.url_config + '/common/getallcartype'

	return httpApi.get(
		requestUrl
	)
}