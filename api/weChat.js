import Config from '@/common/config.js'
// import uniRequest from 'uni-request'
import {
	http
} from '@/js_sdk/luch-request/index.js';

export function getWechatInfo(obj) {
	const requestUrl = Config.url_config + '/common/GetWxInfo'
	var param = {
	    strurl: decodeURIComponent(obj.url),
	  }
	return http.get(requestUrl, {
          params: param
        })
}