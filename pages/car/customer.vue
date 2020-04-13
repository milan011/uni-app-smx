<template>
	<view class="app">
		<view class="price-box">

		</view>

		<view class="pay-type-list">
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="form" :model="info">
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="info.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="自定义验证(手机号)：" prop="phone">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="info.phone" placeholder="请输入手机号" />
				</evan-form-item>
			</evan-form>
					<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
			<text class="mix-btn" @click="confirm">下一步</text>
		</view>
	</view>
</template>

<script>
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import utils from '@/components/evan-form/utils.js'
	import '@/common/utils'
	
	export default {
		components: {
			EvanForm,
			EvanFormItem
		},
		data() {
			return {
				payType: 1,
				orderInfo: {},
				hideRequiredAsterisk: false,
				// 表单的内容必须初始化
				info: {
					name: '',
					phone: '',
				},
			rules: {
				name: {
					required: true,
					message: '请输入姓名'
				},
				phone: [{
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
					this.$refs.form.setRules(this.rules)
				},
		computed: {
		
		},
		onLoad(options) {
			
		},

		methods: {
			confirm() {
				this.$refs.form.validate((res) => {
					if (res) {
						uni.showToast({
							title: '验证通过'
						})
					}
				})
			},
			isMobile(rule, value, callback) {
				if (this.$utils.isMobilePhone(value)) {
					callback()
				} else {
					callback(new Error('手机号格式不正确'))
				}
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
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

		.price{
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;
			&:before{
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding: 60upx;
		
		.type-item{
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position:relative;
		}
		
		.icon{
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
		.tit{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
		.con{
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
				&.textarea{
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
