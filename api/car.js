import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	httpApi
} from '@/js_sdk/luch-request/index.js';

export function getCarList(data) {
	const requestUrl = Config.url_config + '/car/jypage'

	return httpApi.post(
		requestUrl, {...data}
	)
}