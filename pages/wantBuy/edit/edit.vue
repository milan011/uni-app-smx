<template>
	<view class="app">	
	<scroll-view scroll-x class="bg-white nav" style="width: 90%;margin: 0 auto;">
		<!-- 基本信息编辑Begin -->
			<view class="cu-form-group">
				<view class="title">期望车型</view>
				<input style="text-align: right;" placeholder="请输入期望车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备选车型1</view>
				<input style="text-align: right;" placeholder="请输入备选车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">备选车型2</view>
				<input style="text-align: right;" placeholder="请输入备选车型" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">变速箱</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择变速箱类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group nu-style">
				<view class="title">最低期望价格(万元)</view>
				<input style="text-align: right;" placeholder="请输入最低期望价格" name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group nu-style">
				<view class="title">最高期望价格(万元)</view>
				<input style="text-align: right;" placeholder="请输入最高期望价格" name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="客户描述"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="销售描述"></textarea>
			</view>
			<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
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
	// import utils from '@/components/evan-form/utils.js'
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
				payType: 1,
				orderInfo: {},
				hideRequiredAsterisk: false,
				carTypeIndex: -1,
				carType: ['轿车', 'SUV', '客车'],
				date: '2018-12-25',
				modalName: null,
				textareaAValue: '',
				TabCur: 0,
				TabCurPicture: 0,
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
				
				// 表单的内容必须初始化
				customer: {
					name: 'wcg',
					phone: '13731080174',
				},
				carinfo: {
					carname: '',
					type: '',
				}			
			};
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			// this.$refs.customerform.setRules(this.rules)
			console.log(Math.pow(1.05, 10))
		},
		computed: {

		},
		onLoad(options) {
			console.log(options)
		},

		methods: {
			scanVin() {
				console.log('gan jin sao')
			},
			PickerChange(e) {
				this.carTypeIndex = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			tabSelect(e) { //标签切换
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},			
			tabSelectP(e){ //图片编辑标签切换
				this.TabCurPicture = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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
			confirmInfo() {
				this.customerEdit = false
				this.carInfoEdit = false
				this.carImgEdit = true
				this.basics = 2
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
	.nav{
		.cu-item {
			height: 65upx;
			/* display: inline-block; */
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
