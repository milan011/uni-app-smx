<template>
	<view>
		<city-select @cityClick="cityClick" :formatName="formatName" :activeCity="activeCity" :hotCity="hotCity" :obtainCitys="obtainCitys"
		 :isSearch="true" ref="citys"></city-select>
	</view>
</template>

<script>
	import citys from './citys.js'
	import { getCityWhichHaveShop } from '@/api/city.js'
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
				hotCity: [/* {
            'cityCode': '130100',
            'cityName': '石家庄'
        }, 
				{
            'cityCode': '130400',
            'cityName': '邯郸'
        }, {
            'cityCode': '130500',
            'cityName': '邢台'
        }, {
            'cityCode': '130600',
            'cityName': '保定'
        }, */
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
			_this.getHotCitys()
		},
		methods: {
			getHotCitys(){
				var _this = this
				getCityWhichHaveShop().then(res=>{			
					if(res.data.Data){
						console.log('有门店', res.data)
						var cityList = []
						res.data.Data.forEach(function(value,index){
							cityList[index] = {
								'cityCode': '',
								'cityName': value.CityName[0]
							}
						})
						_this.hotCity = cityList
					}
				})
			},
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
