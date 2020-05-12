<template>
	<view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity" :obtainCitys="obtainCitys"
		 :isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	import citys from './citys.js'
	import citySelect from '@/components/city-select/city-select.vue'
	// import amap from '../../common/._amap-wx.js';

	export default {
		data() {
			return {
				//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
				formatName: 'cityName',
				//当前城市
				activeCity: {
					cityCode: "",
					cityName: ''
				},
				//热门城市
				hotCity: [{
						cityName: '南京',
						cityCode: 110100
					},
					{
						cityName: '北京',
						cityCode: 110102
					}
				],
				//显示的城市数据
				obtainCitys: citys,
				amapPlugin: null,
				key: '23ebf335166547d686e8383326c7b375',
				addressName: '',
			}
		},
		components: {
			citySelect
		},
		onLoad() {
			this.activeCity.cityName = "正在定位中"
			// 城市初始化
			let that = this
			//#ifndef H5
			uni.getStorage({
				key: 'city',
				success: function(res) {
					// that.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						that.activeCity.cityName = arr.join("")
					} else {
						that.activeCity.cityName = res.data
					}
				}
			});
			//#endif
			//#ifdef H5
			uni.getStorage({
				key: 'citys',
				success: function(res) {
					that.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						that.activeCity.cityName = arr.join("")
					} else {
						that.activeCity.cityName = res.data
					}
				}
			});
			//#endif
		},
		methods: {
			cityClick(item) {
				console.log(item)
				let city = item.cityName
				//#ifndef H5
				uni.setStorage({
					key: 'city',
					data: city.split("市")[0]
				})
				//#endif
				//#ifdef H5
				uni.setStorage({
					key: 'citys',
					data: city.split("市")[0]
				})
				//#endif
				uni.reLaunch({
				    url: '../index/index'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
