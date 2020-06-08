
//封装uni-app getStorage 根据key 返回Promise
export function getStorageByKey(storageKey) {
	const storageName = 'storeage:' + storageKey
	return new Promise((resolve, reject)=>{
		uni.getStorage({
			key: storageKey,
			success: function(res) {
				// console.log(storageName, res)
				resolve(res.data)	
			},
			fail: function(err){
				console.log('额,没找到'+ storageKey,err)
				// reject(err)
				resolve('')
			}
		})
	})
}