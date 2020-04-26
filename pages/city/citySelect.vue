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
			let that = this
			// this.amapPlugin = new amap.AMapWX({
			// 	key: this.key
			// });
			// this.amapPlugin.getRegeo({
			// 	success: function(data) {
			// 		//成功回调
			// 		console.log(data)
			// 		that.activeCity.cityName = data[0].regeocodeData.addressComponent.city
			// 	},
			// 	fail: function(info) {
			// 		//失败回调
			// 		console.log(info)
			// 	}
			// })
		},
		methods: {
			cityClick(item) {
				uni.showToast({
					icon: 'none',
					title: 'item: ' + JSON.stringify(item),
					// #ifdef MP-WEIXIN
					duration: 3000,
					// #endif
					mask: true
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
