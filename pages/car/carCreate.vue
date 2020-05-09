<template>
	<view class="app">
		<!-- 步骤条Begin -->
		<view class="price-box">
			<view class="bg-white padding" style="width:100%">
				<view class="cu-steps">
					<view class="cu-item" :class="index>basics?'':'text-green'" v-for="(item,index) in basicsList" :key="index">
						<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 步骤条End -->
		<!-- 客户信息编辑Begin -->
		<view v-show="customerEdit" class="pay-type-list">
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="customerform" :model="customer">
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="手机号：" prop="telephone">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.telephone" placeholder="请输入手机号" />
				</evan-form-item>
			</evan-form>
			<text class="mix-btn" @click="confirmCustomer">添加基本信息</text>
		</view>
		<!-- 客户信息编辑End -->
		<!-- 基本信息编辑Begin -->
		<view v-show="carInfoEdit" class="pay-type-list" style="padding: 0px 60upx">
			<car-info v-on:goImgForm="goImg" ref="carInfoSon"></car-info>
		</view>
		<!-- 基本信息编辑End -->
		<!-- 车源图片编辑Begin -->
		<view v-show="carImgEdit" class="pay-type-list" style="padding: 0px 60upx">
			<car-img ref="carImgSon" v-on:goPreviewForm="goPreview"></car-img>
		</view>
		<!-- 车源图片编辑End -->
	</view>
</template>
<script>
	import CarInfo from './components/carInfo.vue'
	import CarImg from './components/carImg.vue'
	import { editCustomer } from '@/api/user.js' 
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	// import utils from '@/components/evan-form/utils.js'
	import '@/common/utils'
	export default {
		components: {
			CarInfo,
			CarImg,
			EvanForm,
			EvanFormItem,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				payType: 1,
				orderInfo: {},
				hideRequiredAsterisk: false,
				customerEdit: true,
				carInfoEdit: false,
				carImgEdit: false,
				vinReturnModal: true,
				modalName: null,
				textareaAValue: '',
				TabCur: 0,
				currentUser: null,
				basicsList: [{
					cuIcon: 'people',
					name: '客户信息'
				}, {
					cuIcon: 'edit',
					name: '基本信息'
				}, {
					cuIcon: 'picfill',
					name: '车源图片'
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成'
				}, ],
				basics: 0,
				// 表单的内容必须初始化
				customer: {
					id: null,
					name: 'wcg',
					telephone: '13731080174',
					creater_id: null,
					customer_res: 1,
					shop_id: null,
				},
				vinChanged:false,
				vinCarList: [],
				vinCarCheck: '0',		
				rules: {
					name: {
						required: true,
						message: '请输入姓名'
					},
					telephone: [{
							required: true,
							message: '请输入手机号'
						},
						/* {
							validator: (rule, value, callback) => {
								// 注意这里如果用的是methods里的isMobilePhone将不生效
								if (this.$utils.isMobilePhone(value)) {
									callback()
								} else {
									callback(new Error('手机号格式不正确'))
								}
							}
						}, */
						// 或者这样也是可以的
						{
							validator: this.isMobile
						}
					],
				}
			};
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.customerform.setRules(this.rules)
			this.$refs.carInfoSon.carData.CreateID = this.currentUser.id
			this.$refs.carInfoSon.carData.CreateName = this.currentUser.nick_name
			this.$refs.carInfoSon.carData.Shop_Id = this.currentUser.shop_id
			this.$refs.carInfoSon.carData.UserKind = this.currentUser.userkind

			this.$refs.carImgSon.imgUser.shop_id = this.currentUser.shop_id
			this.$refs.carImgSon.imgUser.pshop_id = this.currentUser.pshop_id
			console.log("mounted",this.$refs.carInfoSon.carData)
			// this.$refs.carInfoSon.carTypeConfig = carTypeConfig
			// this.resetCustomer()
			// console.log(Math.pow(1.06, 10))
		},
		computed: {

		},
		onLoad(options) {
			this.currentUser = uni.getStorageSync('userInfo') || '';
			this.customer.creater_id = this.currentUser.id
			this.customer.shop_id = this.currentUser.shop_id
			this.customer.id = null
		},

		methods: {
			BasicsSteps() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
			},
			resetCustomer(){
				this.customer = {
					id: null,
					name: '',
					telephone: '',
					creater_id: null,
					customer_res: 1,
					shop_id: null,
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			confirmCustomer() {
				this.$refs.customerform.validate((valid) => {
					if (valid) {
						editCustomer(this.customer).then(res => {
							console.log('customer',res.data)
							this.customer = res.data.Data
							this.$refs.carInfoSon.carData.Customer_Id = res.data.Data.id
							// this.carData.Customer_Id = res.data.Data.id
							this.customerEdit = false
							this.carInfoEdit = true
							this.basics = 1
						}).catch(err => {
							this.$api.msg(`获取数据失败,请刷新重试`);
						})
					}
				})
			},
			confirmImg() {
				console.log(this.imgList.length)
			},
			isMobile(rule, value, callback) {
				if (this.$utils.isMobilePhone(value)) {
					callback()
				} else {
					callback(new Error('手机号格式不正确'))
				}
			},
			goImg(carId){
				console.log("触发了父页面内的方法", carId);
				this.$refs.carImgSon.imgData.Carid = carId
				this.$refs.carImgSon.imgPgData.Carid = carId
				this.customerEdit = false
				this.carInfoEdit = false
				this.carImgEdit = true
				this.basics = 2
			},
			goPreview(carId){
				uni.navigateTo({
					url: '/pages/product/product?ispreview=1&id=' + carId
				});
			}
		}
	}
</script>
<style>
	.nu-style /deep/ .uni-numbox {
		width: 60%;
	}

	.nu-style /deep/ .uni-numbox__value {
		border: none;
		text-align: right;
	}	
	.tStyle{
		display: flex; margin-top: 3.5em;
	}
</style>
<style lang='scss'>
	.app {
		width: 100%;
	}

	.cu-form-group {
		padding: 0px;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 0upx;
		background-color: #fff;
		padding: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.evan-form-show {
		padding: 0 30rpx;
		background-color: #fff;

		.form-input {
			font-size: 28rpx;
			color: #333;
			text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;

			&.textarea {
				height: 240rpx;
				padding: 24rpx 0;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2D87D5;

			&::before,
			&::after {
				border: none;
			}
		}

		.customize-form-item {
			&__label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
			}

			&__radio {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&__text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
</style>
