<template>
	<view class="app">	
	<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view class="cu-item flex-sub" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
				<view class="text">车辆信息</view>
			</view>
			<view class="cu-item flex-sub" :class="1==TabCur?'text-green cur':''" @tap="tabSelect" data-id="1">
				<view class="text">车辆图片</view>
			</view>
		</view>
		<!-- 基本信息编辑Begin -->
		<view v-show="TabCur==0" class="pay-type-list" style="padding: 0px 60upx">
			<car-info v-on:goImgForm="goImg" ref="carInfoSon"></car-info>
		</view>
		<!-- 基本信息编辑End -->
		<!-- 车源图片编辑Begin -->
		<view v-show="TabCur==1" class="pay-type-list" style="padding: 0px 60upx">
			<car-img v-on:goPreviewForm="goPreview" ref="carImgSon"></car-img>
		</view>	
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
	import Config from '@/common/config.js'
	import {
		getCarDetail, 
		getCarFollow, 
		getCarImgsNormal, 
		getCarImgsExt,
		getCarImgsCer, 
		getCarImgsAsse 
	} from '@/api/carManage.js'
	import CarInfo from './components/carInfo.vue'
	import CarImg from './components/carImg.vue'
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
				carId: null,
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
			}
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			// this.$refs.customerform.setRules(this.rules)
			this.$refs.carInfoSon.isEdit = true
			this.$refs.carImgSon.isEdit = true
			this.$refs.carImgSon.imgData.Carid = this.carId
			this.$refs.carImgSon.imgPgData.Carid = this.carId
			/* console.log(this.$refs.carInfoSon)
			console.log(this.$refs.carImgSon) */
			// console.log(this.carId)
			this.getCarDetailById()
			this.getCarImgsNormal()
			this.getCarImgsExt()
			// this.getCarImgsCer()
			this.getCarImgsAsse()
			// console.log((Math.pow(1.03, 10)*10000).toFixed(0))
			// console.log((Math.pow(1.05, 10)*10000).toFixed(0))
		},
		computed: {

		},
		onLoad(options) {
			console.log(options)
			this.carId = options.id
		},

		methods: {
			tabSelect(e) { //标签切换
				this.TabCur = e.currentTarget.dataset.id;
			},
			scanVin() {
				console.log('gan jin sao')
			},
			getCarDetailById(){ //获取车源详情
				getCarDetail(this.carId).then(res => {
					console.log('carDetail',res.data)
					let car_data = res.data.Data.cars
					
					car_data.BuyDate = car_data.BuyDate.split("T")[0]
					car_data.InspectionTime = car_data.InspectionTime.split("T")[0]
					car_data.Safe_end = car_data.Safe_end.split("T")[0]
							
					this.$refs.carInfoSon.carData = car_data
					this.$refs.carInfoSon.carAreaDell(car_data.ProvenceId, car_data.Area); 
					/* this.detail = res.data.Data
					this.carImgExt = res.data.Data.carimages */
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsNormal(){ //获取车源基本图片
			  var _this = this
				getCarImgsNormal(this.carId).then(res => {
					console.log('carimg_normal',res.data)
					let dellListNormal = []
					let dellListPaper = []
					res.data.Data.forEach((item, index)=>{
						if(index  < 10){
							item.imgUrl = Config.img_url + item.filename
							dellListNormal.push(item)
							_this.$refs.carImgSon.imgUpShow[item.carpart] = false
						}else{
							item.imgUrl = Config.img_url + item.filename
							dellListPaper.push(item)
							_this.$refs.carImgSon.imgUpShow[item.carpart] = false
						}
					})
					_this.$refs.carImgSon.imgList = dellListNormal
					_this.$refs.carImgSon.imgListPaper = dellListPaper
					// console.log('nor',dellListNormal)
					// console.log(dellListPaper)
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			// getCarImgsCer(){ //获取车源证件图片
			// 	getCarImgsCer(this.carId).then(res => {
			// 		console.log('carimg_normal',res.data)
			// 		this.carImgCer = res.data.Data
			// 		// this.loadingType = 'loading'
			// 	}).catch(err => {
			// 		this.$api.msg(`获取数据失败,请刷新重试`);
			// 	})
			// },
			getCarImgsExt(){ //获取车源附加图片
				var _this = this
				getCarImgsExt(_this.carId).then(res => {
					let dellListOther = []
					res.data.Data.forEach((item, index)=>{
						item.imgUrl = Config.img_url + item.filename
						dellListOther.push(item)
					})
					// _this.$refs.carImgSon.imgUpShow[item.carpart] = false
					_this.$refs.carImgSon.imgListOther = dellListOther
					console.log('other', dellListOther)
				}).catch(err => {
					_this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsAsse(){ //获取车源评估图片
				var _this = this
				getCarImgsAsse(this.carId).then(res => {
					console.log('carimg_pg',res.data)
					res.data.Data.forEach((item, index)=>{
						item.imgUrl = Config.img_url + item.filename
						item.ImageType = item.imagetype
					})
					_this.$refs.carImgSon.imgPgList = res.data.Data;
					_this.$refs.carImgSon.imgPgDell();
					// console.log(_this.$refs.carImgSon.imgListPgCurrent)
					// this.carImgAsse = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					console.log('err', err)
					_this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			goPreview(carId){
				this.$api.msg(`编辑成功`,1000);
				setTimeout(()=>{
					uni.navigateTo({
						// url: '/pages/car/customer'
						url: '/pages/car/show?carId=' + carId
					})
				}, 1100)
			},
			goImg(carId){
				console.log("触发了编辑父页面内的方法", carId);
				this.$api.msg(`编辑成功`,1000);
				setTimeout(()=>{
					uni.navigateTo({
						// url: '/pages/car/customer'
						url: '/pages/car/show?carId=' + carId
					})
				}, 1100)		
			},
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
