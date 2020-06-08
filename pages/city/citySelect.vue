<template>
	<view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity" :obtainCitys="obtainCitys"
		 :isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	import citys from './citys.js'
	import citySelect from '@/components/city-select/city-select.vue'
	import { getStorageByKey } from '@/common/storage.js'
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
		async onLoad() {
			let _this = this
			
			_this.activeCity.cityName = "正在定位中"
			// 城市初始化
			await getStorageByKey('locationCity').then(res=>{
				console.log('定位城市', res)
				_this.activeCity.cityName = res
			}).catch( err => { 
				console.log('catch',err)
				_this.activeCity.cityName = '石家庄'
			}) 
		},
		methods: {
			cityClick(item) {
				console.log(item)
				let city = item.cityName
				uni.setStorage({
					key: 'selectCity',
					data: city.split("市")[0]
				})
				//#ifndef H5
				/* uni.setStorage({
					key: 'city',
					data: city.split("市")[0]
				}) */
				//#endif
				//#ifdef H5
				/* uni.setStorage({
					key: 'citys',
					data: city.split("市")[0]
				}) */
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
