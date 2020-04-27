import Vue from 'vue'

//判断数组对象是否为空
function isEmpty(v) {
  return (
    (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0)
  );
}

const utils = {
  // 手机号格式是否正确
  isMobilePhone(value) {
    const reg = /^1\d{10}$/
    if (reg.test(value)) {
      return true
    }
    return false
  },
	//vin码格式是否正确
	isRegVin(value){
		var reg = new RegExp(/^[a-zA-Z0-9]{17}$/);
		if (reg.test(value)) {
		  return true
		}
		return false
	},
	//验证车源信息表单数据
	carInfoLegitimate(data){
		console.log('验证', data)
		var validateResault = {
			validateType: false,
			validateInfo:[]
		} //返回信息
		Object.keys(data).forEach(function(key){
			// console.log(validateResault)
			if(key === 'Area'){
				console.log("Area校验")
				console.log(isEmpty(data[key]))
				if(!isEmpty(data[key])){
					const info = {key: '车源城市', message: '请选择车源城市'}
					validateResault['validateInfo'].unshift(info)
				}
			}
		})
		console.log('校验结果', validateResault)
	}
}

Vue.prototype.$utils = utils

export default utils
