import Vue from 'vue'
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
	}
}

Vue.prototype.$utils = utils

export default utils
