import Vue from 'vue'

//判断数组对象是否为空
function isEmpty(v) {
  return (
    (Array.isArray(v) && v.length == 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length == 0) || !v 
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
			validateType: true,
			validateInfo:[]
		} //返回信息
		Object.keys(data).forEach(function(key){
			// console.log(validateResault)
			if(key === 'Area'){ //车源城市校验
				/* console.log("Area校验")
				console.log(data[key])
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '车源城市', message: '请选择车源城市'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'VIN'){ //Vin校验
				/* console.log(isEmpty(data[key]))
				console.log(!isEmpty(data[key]))
				console.log(data[key]) */
				if(isEmpty(data[key])){ //非空校验
					const info = {key: 'Vin', message: '请输入Vin码'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
				console.log(validateResault)
			}
			if(key === 'FullName'){ //车源名称校验
				// console.log(isEmpty(data[key]))
				// console.log(data[key].length)
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '车源名称', message: '请确认车源名称'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'Mileage'){ //公里数校验
				// console.log(isEmpty(data[key]))
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '公里数', message: '请填写行驶里程'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
				if(data[key] < 0){ //负数校验
					const info = {key: '公里数', message: '行驶里程不应为负数'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'Description'){ //客户描述校验
				/* console.log("客户描述校验")
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '客户描述', message: '请填写客户描述'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'XS_description'){ //销售描述校验
				/* console.log("销售描述校验")
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '销售描述', message: '请填写销售描述'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'Transmission'){ //变速箱校验
				if(isEmpty(data[key]) || data[key] === 0){ //非空校验
					const info = {key: '变速箱', message: '请选择变速箱类型'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'BasePrice' || key === 'SaleAMT'){ //期望价格校验
				/* console.log("期望价格校验")
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key])){ //非空校验
					const info = {key: '期望价格', message: '请输入期望价格'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
				if(data[key] < 0){ //负数校验
					const info = {key: '期望价格', message: '价格不应为负数'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
				if(data['BasePrice'] > data['SaleAMT']){ //期望低价高于期望高价
					const info = {key: '期望价格', message: '期望低价应小于高价'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'BuyDate'){ //上牌日期校验
				// console.log("上牌日期校验")
				// console.log(isEmpty(data[key]))
				// console.log('日期长度',data[key].length)
				if(isEmpty(data[key]) || data[key].length !== 10){ //非空校验 合法格式校验
					const info = {key: '上牌日期', message: '请确认上牌日期'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'InspectionTime'){ //捡车日期校验
				/* console.log("捡车日期校验")
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key]) || data[key].length !== 10){ //非空校验 合法格式校验
					const info = {key: '捡车日期', message: '请确认捡车日期'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			}
			if(key === 'Safe_end'){ //保险到期日期校验
				/* console.log("保险到期日期校验")
				console.log(isEmpty(data[key])) */
				if(isEmpty(data[key]) || data[key].length !== 10){ //非空校验 合法格式校验
					const info = {key: '保险到期日期', message: '请确认保险到期日期'}
					validateResault['validateInfo'].unshift(info)
					validateResault['validateType'] = false
				}
			} 
		})
		console.log('校验结果', validateResault)
		return validateResault;
	}
}

Vue.prototype.$utils = utils

export default utils
