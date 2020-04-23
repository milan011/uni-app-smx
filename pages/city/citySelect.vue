<template>
	<view>
		<city-select
			@cityClick="cityClick"
			:formatName="formatName"
			:activeCity="activeCity"
			:hotCity="hotCity"
			:obtainCitys="obtainCitys"
			:isSearch="true"
			ref="citys"
		></city-select>
	</view>
</template>

<script>
import citys from './citys.js'
import citySelect from '@/components/city-select/city-select.vue'
export default {
	data() {
		return {
			//需要构建索引参数的名称（注意：传递的对象里面必须要有这个名称的参数）
			formatName: 'cityName',
			//当前城市
			activeCity: {
				cityCode: "",
				cityName: '正在定位'
			},
			//热门城市
			hotCity: [
				{
					cityName: '南京',
					cityCode: 110100
				},
				{
					cityName: '北京',
					cityCode: 110102
				}
			],
			//显示的城市数据
			obtainCitys: citys
		}
	},
	components: {
		citySelect
	},
	onLoad() {
		this.activeCity.cityName = "正在定位中"
		let that = this
		uni.getLocation({
		    type: 'wgs84',
		    success: function (res) {
		        console.log('当前位置的经度：' + res.longitude);
		        console.log('当前位置的纬度：' + res.latitude);
		    },
			fail:function(){
				that.activeCity.cityName = "定位失败"
				uni.showToast({
				    title: '定位失败,请手动选择城市',
					icon:"none",
				    duration: 1500
				});
			}
		});
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
