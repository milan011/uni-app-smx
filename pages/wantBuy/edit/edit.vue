<template>
	<view class="app">
		<scroll-view scroll-x class="bg-white nav" style="width: 90%;margin: 0 auto;">
			<!-- 基本信息编辑Begin -->
			<view class="cu-form-group">
				<!-- <text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text> -->
				<text class="cuIcon-require text-red"></text>
				<view class="title">期望车型</view>
				<input style="text-align: right;" placeholder="请输入期望车型" v-model="form.carcate" @blur="verification" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备选车型1</view>
				<input style="text-align: right;" placeholder="请输入备选车型" v-model="form.alternate_car" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备选车型2</view>
				<input style="text-align: right;" placeholder="请输入备选车型" v-model="form.alternate_car_another" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">变速箱</view>
				<!-- <picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carType[form.gearbox]}}
					</view>
				</picker> -->
				<picker @change="PickerTransChange" :value="Number(form.gearbox)" :range="transmissionConfig" range-key="name">
					<view class="picker">
						{{transmissionConfig[form.gearbox].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group nu-style">
				<text class="cuIcon-require text-red"></text>
				<view class="title">最低期望价格(万元)</view>
				<input style="text-align: right;" placeholder="请输入最低期望价格" v-model="form.bottom_price" @blur="verification" @ name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group nu-style">
				<text class="cuIcon-require text-red"></text>
				<view class="title">最高期望价格(万元)</view>
				<input style="text-align: right;" placeholder="请输入最高期望价格" v-model="form.top_price" @blur="verification" @ name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group margin-top">
				<!-- <text class="cuIcon-require text-red"></text> -->
				<!-- <view class="title">客户描述</view> -->
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" :value="textareaAValue" placeholder="客户描述"></textarea>
			</view>
			<text class="mix-btn" @click="confirmInfo">提交修改</text>
			<!-- 车源图片编辑End -->
		</scroll-view>
	</view>
</template>

<script>
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		transmissionConfig,
		carStatusConfig, 
		putOnStatusConfig, 
		carTypeConfig,
		insidecolorConfig,
		outcolorConfig,
		saleNumConfig,
		carUseConfig,
		useconditionsConfig,
		maintainingConfig,
		safetypeConfig, 
	} from '@/common/appConfig.js'
	// import utils from '@/components/evan-form/utils.js'
	import {
		getWant,
		aveWant
	} from "@/api/want.js"
	import '@/common/utils'
	export default {
		components: {
			EvanForm,
			EvanFormItem,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				carTypeIndex: -1,
				carType: ['不限', '手动', '自动'],
				transmissionConfig: [],
				modalName: null,
				textareaAValue: '',
				multiIndex: [0, 0],
				id: "",
				// 表单的内容必须初始化	
				form: {
					id: '',
					want_code: "",
					carcate: '',
					alternate_car: "",
					alternate_car_another: "",
					want_type: '',
					brand_id: '',
					categorey_id: '',
					car_factory: '',
					cate_id: '',
					capacity: '',
					gearbox: 0,
					bottom_price: '',
					top_price: '',
					age: '',
					mileage: '',
					out_color: '',
					inside_color: '',
					customer_id: '',
					creater_id: '',
					shop_id: '',
					want_area: '',
					remark: '',
					xs_remark: '',
					recommend: '',
					is_top: '',
					sale_number: '',
					want_status: '',
					created_at: '',
					updated_at: '',
					deleted_at: '',
					creater_name: '',
					customer_name: '',
					shop_name: '',
				}
			};
		},
		created() {	
			this.transmissionConfig = transmissionConfig
		},
		onLoad(options) {
			this.id = options.id
			console.log(options)
			this.init()
		},

		methods: {
			init() {
				getWant({
					id: this.id
				}).then(res => {
					let data = res.data.Data
					this.form.id = this.id;
					this.form.carcate = data.want.carcate;
					this.form.alternate_car = data.want.alternate_car ? data.want.alternate_car : '';
					this.form.alternate_car_another = data.want.alternate_car_another ? data.want.alternate_car_another : '';
					this.form.gearbox = data.want.gearbox;
					this.form.bottom_price = data.want.bottom_price;
					this.form.top_price = data.want.top_price;
					this.form.customer_id = data.want.customer_id;
					this.form.creater_id = data.want.creater_id;
					this.form.shop_id = data.customer.shop_id;
					this.form.want_status = data.want.want_status;
					this.form.created_at = data.want.created_at;
					this.form.updated_at = data.want.updated_at
					this.textareaAValue = data.want.xs_remark;
					this.form.inside_color = data.want.inside_color
					this.form.want_area = data.want.want_area
					this.form.is_top = data.want.is_top
					this.form.sale_number = data.want.sale_number
					this.form.deleted_at = data.want.deleted_at
					this.form.creater_name = data.want.creater_name
					this.form.customer_name = data.want.customer_name
					this.form.shop_name = data.shopname
				})
			},
			PickerTransChange(e) {
				this.form.gearbox = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			textareaAInput(e) {
				this.form.xs_remark = e.detail.value
			},
			verification(e) {
				console.log(e)
				if (e.detail.value == "") {
					uni.showToast({
						title: '请输入带 * 号的必填项',
						icon: "none",
						duration: 1000
					});
				}
			},
			confirmInfo() {
				if (this.form.carcate =='' || this.form.top_price ==='' || this.form.bottom_price === '') {
					uni.showToast({
						title: '请输入带 * 号的必填项',
						icon: "none",
						duration: 1000
					});
					return false
				} else {
					aveWant({ ...this.form
					}).then(res => {
						uni.showToast({
							title: '提交成功',
							icon: "none",
							duration: 1500
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1500)
					})
				}
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

	.tStyle {
		display: flex;
		margin-top: 3.5em;
	}
</style>
<style lang='scss'>
	.app {
		width: 100%;
	}

	.cu-form-group {
		padding: 0px;
	}

	.nav {
		.cu-item {
			height: 65upx;
		}
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
