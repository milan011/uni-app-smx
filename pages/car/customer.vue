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
		<!-- 客户信息添加Begin -->
		<view v-show="customerEdit" class="pay-type-list">
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="customerform" :model="customer">
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="手机号：" prop="phone">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.phone" placeholder="请输入手机号" />
				</evan-form-item>
			</evan-form>
			<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
			<text class="mix-btn" @click="confirm">添加基本信息</text>
		</view>
		<!-- 客户信息添加End -->
		<!-- 基本信息添加Begin -->
		<view v-show="carInfoEdit" class="pay-type-list" style="padding: 0px 60upx">
			<view class="cu-form-group">
				<view class="title">VIN码</view>
				<input style="text-align: right;" placeholder="请扫描或输入VIN码" name="input"></input>
				<text class='cuIcon-scan text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">车型</view>
				<input style="text-align: right;" disabled placeholder="车型由您输入的VIN码确定" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车辆类型</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">排量</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">变速箱</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">外观</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">内饰</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">车险</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">上牌日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到捡日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到保日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">所属城市</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="title">过户次数</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group nu-style">
				<view class="title">期望价格</view>
				<input style="text-align: right;" placeholder="请输入期望价格" name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
			<text class="mix-btn" @click="confirm">添加图片</text>
		</view>
		<!-- 基本信息添加End -->
	</view>
</template>

<script>
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	// import utils from '@/components/evan-form/utils.js'
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
				customerEdit: true,
				carInfoEdit: false,
				carTypeIndex: -1,
				carType: ['轿车', 'SUV', '客车'],
				date: '2018-12-25',
				multiArray: [
					['北京', '河北'],
					['北京'],
					// ['猪肉绦虫', '吸血虫']
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '北京'
						},
						{
							id: 1,
							name: '河北'
						}
					],
					[{
							id: 0,
							name: '北京'
						},
						{
							id: 1,
							name: '石家庄'
						},
						{
							id: 2,
							name: '保定'
						},
						{
							id: 3,
							name: '唐山'
						},
						{
							id: 4,
							name: '张家口'
						}
					]
				],
				multiIndex: [0, 0],
				basicsList: [{
					cuIcon: 'usefullfill',
					name: '客户信息'
				}, {
					cuIcon: 'radioboxfill',
					name: '基本信息'
				}, {
					cuIcon: 'roundclosefill',
					name: '车源图片'
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成'
				}, ],
				basics: 0,
				// 表单的内容必须初始化
				customer: {
					name: 'wcg',
					phone: '13731080174',
				},
				carinfo: {
					carname: '',
					type: '',
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
			this.$refs.customerform.setRules(this.rules)
			console.log(Math.pow(1.1, 9))
		},
		computed: {

		},
		onLoad(options) {

		},

		methods: {
			BasicsSteps() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
			},
			scanVin() {
				console.log('gan jin sao')
			},
			PickerChange(e) {
				this.carTypeIndex = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			MultiColumnChange(e) {
				
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				const column = e.detail.column;
				const value = e.detail.value;
				/* console.log('哥,你滚了')
				console.log('column',column)
				console.log('value',value) */
				data.multiIndex[column] = value;
				switch (column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								// console.log('你选了首都')
								this.multiArray[1] = ['北京'];
								break;
							case 1:
								// console.log('你选了河北省')
								this.multiArray[1] = ['石家庄', '保定', '唐山', '张家口'];
								break;
						}
						this.multiIndex.splice(1, 0)
						// console.log('你咋不选')
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			confirm() {
				this.$refs.customerform.validate((res) => {
					if (res) {
						uni.showToast({
							title: '验证通过',
						})
						this.customerEdit = false
						this.carInfoEdit = true
						this.basics = 1
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
<style>
	.nu-style /deep/ .uni-numbox{
		width:60%;
	}
	.nu-style /deep/ .uni-numbox__value{
		border:none;
		text-align: right;
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
