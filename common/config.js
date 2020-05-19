let url_config = ""
let img_url = null
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	url_config = 'http://testapi.simaxian.com/api'
	img_url = 'http://testapi.simaxian.com'
} else {
	// 生产环境
	url_config = 'http://testapi.simaxian.com/api'
	img_url = 'http://testapi.simaxian.com'
}
//变速箱
const transmissionConfig = ['不限', '手动', '自动'];

//车源状态
const carStatusConfig = {
	 '1':'正常',
	 '0':'废弃',
	 '5':'已交易',
};

//上下架状态
const putOnStatusConfig = {
	 '1':'已上架',
	 '0':'未上架',
};

export default {
	url_config,
	transmissionConfig,
	carStatusConfig,
	putOnStatusConfig,
	img_url	
}
