<template>
<view class="container">
	<view v-if="joinDom" class="join-main" v-html='joinDom'>
		
	</view>
	<view v-else class="join-main">
		啊,总平台欢迎您加盟!
	</view>
</view>
</template>

<script>
	import { getStorageByKey } from '@/common/storage.js'
	import { getMarketDetail } from '@/api/shop.js'
	
	export default {
		data() {
			return {
				ifOnShow: false,
				P_Shop_Id: '',
				joinDom: null,
			}
		},
		onHide(){
		  // console.log('this.ifOnShow=true')
		  this.ifOnShow = true 
		},
		async onShow(){
			var _this = this
			if(_this.ifOnShow){
				await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
					console.log('当前市场', res)
					if(res){
						_this.P_Shop_Id = res.id
						_this.getMarketDetialById()
					}
				})
			}
		},
		async onLoad(){
			var _this = this
			await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
				console.log('当前市场', res)
				if(res){
					_this.P_Shop_Id = res.id
					_this.getMarketDetialById()
				}
			})
		},
		methods: {
			getMarketDetialById(){
				var _this = this
				console.log('当前门店id', _this.P_Shop_Id)
				getMarketDetail(_this.P_Shop_Id).then(res=>{
					console.log('一级市场信息', res)
					_this.joinDom = res.data.Data.shop.wantjoinyd
				})
			}
		}
	}
</script>

<style lang='scss'>
	.join-main{
		padding: 30rpx;
		width: 100%;
		overflow: hidden;
	}
	.img{
		display: block;
		width: 140%;
	}
</style>
