let url_config = ""
let img_url = null
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// url_config = 'https://testapi.simaxian.com/api'
	// url_config = 'http://10.20.30.111/api'
	// img_url = 'https://testapi.simaxian.com'
	url_config = 'https://yanshiapi.simaxian.com/api'
	img_url = 'https://yanshiapi.simaxian.com'
} else {
	// 生产环境
	/* url_config = 'https://testapi.simaxian.com/api'
	img_url = 'https://testapi.simaxian.com' */
	url_config = 'https://yanshiapi.simaxian.com/api'
	img_url = 'https://yanshiapi.simaxian.com'
}

//地图定位Key
const mapKey = {
	tx: 'ZBXBZ-OI63R-3DFWF-WXVTM-F4JU6-WTBYD', //腾讯(贺星国)
	gd: 'b4480e225615b0754c5b8c6d1988cb3c' //高德(王格浩)
}


export default {
	url_config,
	mapKey,
	img_url	
}
