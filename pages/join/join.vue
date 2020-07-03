<template>
<view class="container">
	<view v-if="joinDom" class="join-main" v-html='joinDom'>
		
	</view>
	<view v-else class="join-main">
		<!--  -->
		<image style="height: 500upx;width:100%" :src="img" mode="scaleToFill"></image>
		<view style="text-align: left;font-size: 46rpx;text-indent: 2em;">
			<text>驷马先电商平台期待您的加入,互惠互利,合作共赢!</text>
			<text v-if="!joinDom" @click="dialPhoneNumber()">平台加盟咨询电话:{{zxphone}}</text>
		</view>
	</view>
	<view>
		<view class="cu-form-group">
			<view class="title">加盟客户</view>
			<input v-model="business.name" placeholder="请输入您的姓名" name="input"></input>
			<text class='cuIcon-deliver_fill text-orange'></text>
		</view>
		<view class="cu-form-group">
			<view class="title">联系电话</view>
			<input v-model="business.mobile" placeholder="请输入您的手机号码" name="input"></input>
			<text class='cuIcon-dianhua text-orange'></text>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="business.contents" maxlength="-1" placeholder="加盟意向"></textarea>
		</view> 
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-olive lg" @click="saveOpp">提交</button>
		</view>
	</view>
</view>
</template>

<script>
	import { edit } from '@/api/business.js'
	import { getStorageByKey } from '@/common/storage.js'
	import { getMarketDetail } from '@/api/shop.js'
	
	export default {
		data() {
			return {
				ifOnShow: false,
				P_Shop_Id: '',
				joinDom: null,
				zxphone: '021-52563428',
				business:{
					name:"",
					mobile:"",
					contents:"",
					shopid: -1 
				},
				img: '/static/temp/smx_banner1.jpg'
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
						_this.business.shopid = res.id
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
					_this.business.shopid = res.id
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
					// _this.zxphone = res.data.Data.shop.telephone
				})
			},
			contentInput(e) { //加盟信息
				this.business.contents = e.detail.value
			},
			dialPhoneNumber(){ //点击号码拨打电话
				console.log('打电话')
				var _this = this
				uni.makePhoneCall({	 	
				 	// 手机号
				    phoneNumber: _this.zxphone, 
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}	
				});
			},
			saveOpp(){
				console.log(this.business)
				var reg = /^[1]([3-9])[0-9]{9}$/;
				if (this.business.name == "" || !reg.test(this.business.mobile)) {
					uni.showToast({
						title: '请您填写您的称呼和正确格式的手机号码',
						icon: "none",
						duration: 2000
					});
					return false
				} else {
					edit({ ...this.business
					}).then(res => {
						uni.showToast({
							title: '系统已经记录您的信息,驷马先客服会尽快跟你联系,期待您的加盟',
							icon: 'none',
							duration: 1500
						})
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1500)
					})
				}
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
