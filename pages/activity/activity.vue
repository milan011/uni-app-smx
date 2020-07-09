<template>
	<view class="sellcar-main">
		<view class="car-type">
			<view class="image">
				<image :src="imgUrl" mode="widthFix">
				</image>
				<!-- <view class="cu-tag bg-blue">史诗</view>
				<view class="cu-bar bg-shadeBottom"> 
				<text class="text-cut">
					我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
				</text>
				</view> -->
			</view>
			<view class="flex-sub text-left">
				<view class="solid-bottom padding"  style="text-indent:2em;">
					<text class="text-black text-bold" >{{ actDom }}</text>
				</view>
			</view>
		</view>
		<view class="car-type">
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input v-model="oppData.mobile" placeholder="请输入您的手机号码" name="input"></input>
				<text class='cuIcon-dianhua text-orange'></text>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-olive lg" @click="oppSend">{{ sendTitle }}</button>
			</view>
		</view>		
	</view>
</template>

<script>
	import { editOpp } from '@/api/business.js'
	import Config from '@/common/config.js'
	import '@/common/utils'
	import { getStorageByKey } from '@/common/storage.js'
	import { getMarketDetail } from '@/api/shop.js'
	export default {
		data() {
			return {
				ifOnShow: false,
				title: '咨询报名',
				sendTitle: '提交',
				imgUrl: '',
				P_Shop_Id: '',
				actDom: null,
				preOppData:{},
				activityData: null,
				oppData:{
					name: '卖车游客',
					mobile: '',
					contents: '',
					enroll_type: '',
					shopid: 1,
					city_name: '',
					category_name: ''
				},		
			}
		},
		onHide(){
		  // console.log('this.ifOnShow=true')
		  this.ifOnShow = true 
		},
		/* async onShow(){
			var _this = this
			if(_this.ifOnShow){
				await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
					console.log('当前市场', res)
					if(res){
						_this.P_Shop_Id = res.id
						_this.oppData.shopid = res.id
						_this.getMarketDetialById()
					}else{
						_this.P_Shop_Id = null
						_this.saleDom = null
						_this.oppData.shopid = 0
					}
				})
			}
		}, */
		async onLoad(options) {
			var _this = this
			_this.activityData = await _this.$api.json('activity')
			console.log('参数', options)
			console.log('活动内容', _this.activityData)
			_this.activityData.forEach((item,index,array)=>{
			    //执行代码
					if(item.name == options.aname){
						console.log(item)
						_this.title = item.title
						_this.actDom = item.content
						_this.imgUrl = Config.img_url + item.img
						_this.oppData.name = item.title
						_this.oppData.enroll_type = item.enrollType
						console.log(_this.title)
						console.log(_this.actDom)
						console.log(_this.imgUrl)
					}
			})
			uni.setNavigationBarTitle({
			  title: _this.title
			})
			await getStorageByKey('locationCity').then(res=>{
				_this.oppData.city_name = res
			})
			/* await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
				console.log('当前市场', res)
				if(res){
					_this.P_Shop_Id = res.id
					_this.oppData.shopid = res.id
					_this.getMarketDetialById()
				}else{
					_this.P_Shop_Id = null
					_this.saleDom = null
					_this.oppData.shopid = 0
				}
			}) */
			//#ifndef H5
			/* uni.getStorage({
				key: 'locationCity',
				success: function(res) {
					_this.oppData.city_name = res.data
				}
			}) */
			//#endif
			//#ifdef H5
			/* uni.getStorage({
				key: 'citys',
				success: function(res) {
					_this.oppData.city_name = res.data
				}
			}) */
			//#endif
		},
		computed: {
			
		},
		mounted() {
				var a =  document.getElementsByClassName('uni-page-head-hd')[0]
				a.style.display = 'none'
		},
		methods: {		
			getMarketDetialById(){
				var _this = this
				console.log('当前门店id', _this.P_Shop_Id)
				getMarketDetail(_this.P_Shop_Id).then(res=>{
					console.log('一级市场信息', res)
					_this.saleDom = res.data.Data.shop.saleydinfo
				})
			},
			oppSend(){
				console.log(this.oppData.mobile)
				console.log(this.preOppData.mobile)
				console.log(this.oppData.mobile == this.preOppData.mobile)
				if (this.$utils.isMobilePhone(this.oppData.mobile)) {
					if(this.oppData.mobile == this.preOppData.mobile && this.oppData.category_name == this.preOppData.category_name){ //防止用户重复提交
						this.oppData.mobile = ''
						this.oppData.category_name = ''
						this.$api.msg(`平台已记录您的需求,销售顾问会尽快和您联系`, 2000);
					}else{
						editOpp(this.oppData).then(res=>{
							console.log(res.data)
							if(res.data.ResultType == 0){
								this.oppData.mobile = ''
								this.preOppData = res.data.Data
								this.$api.msg(`平台已记录您的需求,销售顾问会尽快和您联系`, 2000);
							}
						})
					}	
				}else{
					this.$api.msg(`请输入正确格式手机号码`);
				}		
			},
		},
	}
</script>

<style lang="scss">
	// 快捷筛选
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
	
	uni-view {
	    // font-size: 20px;
	    line-height: 2.4;
	}
	.sellcar-main {
		margin-top: 40upx;

		.title {
			// padding-left: 20upx;
			font-size: 34upx;
			// line-height: 3;
			// font-weight: 800;
		}

		// 选择车型
		.car-type {
			width: 90%;
			margin: 0 auto;
			// border-bottom: 20upx solid #EEEEEE;

			.order-section {
				padding: 0 20upx;
				@extend %section;

				.order-item {
					@extend %flex-center;
					width: 160upx;
					height: 100upx;
					border-radius: 10upx;
					font-size: $font-sm;
					color: $font-color-dark;
				}

				.yticon {
					font-size: 48upx;
					margin-bottom: 18upx;
					color: #fa436a;
				}

				.icon-shouhoutuikuan {
					font-size: 44upx;
				}
			}

			.bottom {
				margin: 40upx 0 20upx 0;
				@extend %section;

				.uni-title {
					font-size: 26upx;

				}

				.uni-common-pl {
					padding-left: 0px;
				}

				.uni-input {
					height: auto;
					font-size: 26upx;
					color: #888;
				}

				.box {
					width: 40%;
				}
			}
		}

		// 买车流程
		.circuit {
			width: 90%;
			margin: 0 auto;
			border-bottom: 20upx solid #EEEEEE;

			.nav {
				.cu-item {
					height: auto;
				}

				.text {
					margin-top: -20upx;
				}
			}

			.content {
				.QA {
					margin: 30upx 0 30upx;

					.question {
						.Q {
							font-size: 26upx;
							background-color: #888;
							color: #fff;
							width: 28upx;
							height: 28upx;
							display: inline-block;
							line-height: 28upx;
							text-align: center;
							margin-right: 20upx;
						}

						.active {
							background-color: #09BB07;
							opacity: .7;
						}

						text {
							font-size: 26upx;
							line-height: 30upx;
						}

						.icons {
							float: right;
						}

						.answer {
							position: relative;

							.A {
								position: absolute;
								top: 8upx;
								left: 0;
								font-size: 20upx;
								border: 1px solid #09BB07;
								color: #09BB07;
								width: 28upx;
								height: 28upx;
								line-height: 28upx;
								text-align: center;
								margin-right: 20upx;
							}

							.answers {
								margin-left: 56upx;
								display: inline-block;
								font-size: 26upx;
								margin-top: 4upx;
								width: calc(100% - 56upx);
								line-height: 1.5;
							}
						}
					}
				}
			}
		}

		// 优势
		.superiority {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 0.5em;
			.box {
				width: 100%;
				height: 600upx;
				display: flex;
				justify-content: space-around;

				.left {
					width: 45%;
					height: 100%;

					.titles {
						margin-top: 30upx;
						padding-left: 30upx;
						font-size: 28upx;
						line-height: 3;
						font-weight: 700;
					}

					.text {
						padding-left: 30upx;
						font-size: 24upx;
						line-height: 1.5;
						color: #888;
					}

					image {
						margin-top: 30upx;
						width: 100%;
						height: 400upx;
					}
				}

				.right {
					width: 45%;
					height: 100%;

					.top {
						width: 100%;
						height: 42%;
						.titles {
							margin-top: 30upx;
							padding-left: 30upx;
							font-size: 28upx;
							line-height: 3;
							font-weight: 700;
						}
						.text {
							padding-left: 30upx;
							font-size: 24upx;
							line-height: 1;
							color: #888;
						}
						
						image {
							margin-top: 10upx;
							width: 100%;
							height: 130upx;
						}
					}
					.bottom{
						width: 100%;
						height: 46%;
						.titles {
							margin-top: 30upx;
							padding-left: 30upx;
							font-size: 28upx;
							// line-height: 3;
							// font-weight: 700;
						}
						.text {
							padding-left: 30upx;
							font-size: 24upx;
							line-height: 1.5;
							color: #888;
						}
						
						image {
							margin-top: 30upx;
							width: 100%;
							height: 150upx;
						}
					}
				}
			}
		}

	}
</style>
