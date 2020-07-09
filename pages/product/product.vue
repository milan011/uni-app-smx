<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in carDetail.carimages" :key="index">
					<view class="image-wrapper">
						<!-- <image :src="imgUrl + item.filename" class="loaded" mode="aspectFit"></image> -->
						<image :src="imgUrl + item.filename" class="loaded" mode="scaleToFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- <image src="../../static/collect.png" mode="" @click="doCollect" class="collect"></image> -->
		</view>
		<view class="introduce-section">
			<text class="title">{{ carDetail.cars.FullName }}</text>
			<!-- <text class="cuIcon-favor" :class="'text-' + favorColor" style="margin-left:0.5em" @tap="doCollect"></text> -->
			<!-- <text class="cuIcon-post" :class="'text-' + favorColor" style="margin-left:0.5em" @tap="doCollect"></text> -->
			<view class="price-box">
				<text v-if="carDetail.cars.SaleAMT" class="price-tip">¥<text class="price">{{ carDetail.cars.SaleAMT }}万</text></text>
				<!-- <text class="price">{{ carDetail.cars.SaleAMT }}万</text> -->
				<view>
					<view class='cu-tag' style="background-color:white">
					<!-- <text class="cuIcon-post" style="margin-left:0.5em;" @tap="doShare">分享</text> -->
					<text class="cuIcon-favor" :class="'text-' + favorColor" style="margin-left:0.5em" @tap="doCollect">{{collection}}</text>
					</view>
					<view class='cu-tag radius line-green'>{{carDetail.pshopname}}</view>
				</view>
				<!-- <view class='cu-tag radius line-green'>{{carDetail.pshopname}}</view> -->
			</view>
			<view class="c-list">
				<view class="c-row b-b">
					<view class="con-list">
						<text>销售顾问: {{ carDetail.cars.CreateName?carDetail.cars.CreateName:""}}({{ carDetail.shop.name?carDetail.shop.name:"" }})</text>
						<text>门店地址: {{ carDetail.shop.address? carDetail.shop.address:''}}</text>
						<text>发布时间: {{ carDetail.cars.CreateDate? carDetail.cars.CreateDate.split('T')[0]:""}}</text>
						<text class='cuIcon-dianhua text-orange' style="font-size: 16px;" @click="dialPhoneNumber()">联系电话: {{ carDetail.Telephone?carDetail.Telephone:""}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">车辆介绍</text>
			</view>
			<view class="eva-box">
				<view class="right">
					<rich-text :nodes="carDetail.cars.Description"></rich-text>
				</view>
			</view>
		</view>
		<!-- 基本信息begin -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">基本信息</text>
				<text v-if="allParamShow" @click="toggleSpec" class="tip">全部参数配置</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<view class="right">
					<view class="tj-sction">
						<view class="tj-item">
							<text class="num">{{ carDetail.cars.Mileage }}</text>
							<text>里程(万)</text>
						</view>
						<view class="tj-item">
							<text class="num">{{ carDetail.cars.CityName }}</text>
							<text>上牌地</text>
						</view>
						<view class="tj-item">
							<text v-if="transmissionConfig[carDetail.cars.Transmission]" class="num">{{ transmissionConfig[carDetail.cars.Transmission].name }}</text>
							<text>变速箱</text>
						</view>
					</view>
					<view class="tj-sction">
						<view class="tj-item">
							<text class="num">{{ carDetail.cars.Sale_number }}</text>
							<text>过户次数</text>
						</view>
						<view class="tj-item">
							<text class="num">{{ carDetail.cars.Capacity }}</text>
							<text>排量</text>
						</view>
						<view class="tj-item">
							<text if="carDetail.cars.BuyDate" class="num">
								{{ carDetail.cars.BuyDate?carDetail.cars.BuyDate.split("T")[0]:"暂无数据" }}
							</text>
							<text>上牌时间</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 基本信息end -->
		<!-- 车况检测begin -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">车况检测</text>
			</view>
			<view class="eva-box">
				<view class="right">
					<uni-segmented-control :current="currentStatus" :values="itemStatus" @clickItem="onClickStatusItem" style-type="button"
					 active-color="#909090"></uni-segmented-control>
					<view class="content">
						<status-car ref="sonStatusInfo"></status-car>
					</view>
				</view>
			</view>
		</view>
		<!-- 车况检测end -->
		<!-- 猜你喜欢begin -->
		<view v-if="!ispreview" class="eva-section">
			<view class="e-header">
				<text class="tit">猜你喜欢</text>
			</view>
			<view class="eva-box">
				<view class="right">
					<view class="guess-section">
						<view v-for="(item, index) in recomList" :key="index" class="guess-item" @click="navToDetailPage(item)">
							<view class="image-wrapper">
								<!-- <image :src="imgUrl+item.filename" mode="aspectFit"></image> -->
								<image :src="imgUrl+item.filename" mode="scaleToFill"></image>
							</view>
							<!-- <text class="title clamp">{{item.FullName}}</text> -->
							<view>{{item.FullName}}</view>
							<text class="price">￥{{item.SaleAMT}}万</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="padding flex flex-wrap justify-between align-center bg-white">
			<button class="cu-btn bg-olive" @tap="goPutOn">确认上架</button>
			<button class="cu-btn bg-orange" @tap="reEdit">返回修改</button>
		</view>
		<!-- 底部操作菜单 -->
		<!-- <view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" @click="doCollect">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>	
			<view style="width: 60%;" class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn">加入购物车</button>
			</view>
		</view> -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view>
					<uni-segmented-control :current="currentCard" :values="items" @clickItem="onClickItem" style-type="button"
					 active-color="#909090"></uni-segmented-control>
					<view class="content">
						<vin-car ref="sonVinInfo"></vin-car>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">知道了</button>
			</view>
		</view>
	</view>
</template>

<script>
	//#ifdef H5
	import wxShare from '@/common/wechat.js'
	//#endif
	import share from '@/components/share';
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import listCell from '@/components/mix-list-cell';
	import vinCar from './components/vin-car';
	import statusCar from './components/status-car';
	import {
		getCarDetail,
		getCarCheckStatus,
		getCarModelConfigByTid,
		getCarTypeByVin,
		getCarList
	} from '@/api/car.js'
	import { carPutOn } from '@/api/carManage.js'
	import Config from '@/common/config.js'
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
	export default {
		components: {
			share,
			uniSegmentedControl,
			listCell,
			statusCar,
			vinCar
		},
		data() {
			return {
				specClass: 'none',
				specSelected: [],
				favorColor: 'gray',
				carDetail: {
					"cars": {
						BuyDate: 'T'
					},
					"shop": {},
					"user": {},
					"customer": {},
					"carimages": [],
				},
				ispreview: false,
				collection: '收藏',
				allParamShow: false,
				items: ['车辆参数', '发动机参数', '底盘及制动', '其他配置'],
				itemStatus: ['非常规技术检查', '静态检查', '动态检查'],
				currentCard: 0,
				currentStatus: 0,
				carVin: {},
				transmissionConfig: [],
				imgUrl: Config.img_url,
				tabCurrentIndex: 0,
				recomList: [],
				favorite: false,
				car: {
					PageIndex: 1,
					PageSize: 4,
					SaleAMTMin: "",
					SaleAMTMax: "",
					city_name: "",
					Car_Status: 1,
					Sale_number: -1,
					IsPutOn: 1,
					Carid: ""
				}
			};
		},
		//#ifdef H5
		mixins: [wxShare],
		//#endif
		//#ifdef MP-WEIXIN
		onShareAppMessage(res) {
			const currentUser = uni.getStorageSync('userInfo') || ''
			const currentUrl = '/pages/product/product?id=' + this.carDetail.cars.ID
		  if (res.from === 'button') {// 来自页面内分享按钮
		    console.log(res.target)
		  }
			console.log('微信分享', res)
			console.log(this.carDetail.cars.FullName)
			console.log('分享用户', currentUser)
			console.log('分享链接', currentUrl)
		  return {
		    title: this.carDetail.cars.FullName,
		    path: currentUrl
		  }
		},
		//#endif
		onBackPress(){
			console.log('fanhui')
			/* uni.navigateTo({
				url: '/pages/car/list'
			});
			return true */
		},
		async onLoad(options) {
			var _this = this
			// console.log(options) 
			/* console.log('微信分享', wxShare) 
			console.log('微信分享', wxShare.methods) 
			console.log('微信分享', wxShare.methods.wechatShare) */
			
			console.log('微信分享方法?', _this.wechatShare) 	
			// 车辆详情
			_this.ispreview = options.ispreview == 1 ? true : false
			// console.log(this.ispreview)
			uni.showLoading({
				title: "加载中",
				mask: true
			})
			let id = options.id;
			let carDetail = await getCarDetail({
				id
			})
			if(options.shareUser){ //授权分享
				
			}
			this.carDetail = carDetail.data.Data;
			//#ifdef H5
			_this.setShare()
			//#endif
			// console.log(this.carDetail)
			if (_this.carDetail.cars.BuyDate == null) {
				_this.carDetail.cars.BuyDate = ''
			}
			//是否收藏
			uni.getStorage({
				key: 'collectList',
				success: (res) => {
					// console.log('收藏列表',res.data)
					let index = res.data.findIndex(ele => {
						return _this.carDetail.cars.ID == ele.cars.ID
					})
					// console.log('是否收藏', index)
					if (index == -1) {					
						_this.favorColor = 'gray'	
						_this.collection = '收藏'
						_this.favorite = false
					} else {
						_this.favorColor = 'green'
						_this.collection = '已收藏'
						_this.favorite = true
					}
				},
				fail: () => {
				}
			})
			// 浏览历史
			let browseList = [];
			uni.getStorage({
				key: 'browseList',
				success: (res) => {
					browseList = res.data
					let index = res.data.findIndex(ele => {
						return this.carDetail.cars.ID == ele.cars.ID
					})
					if (index == -1) {
						browseList.unshift(this.carDetail)
						uni.setStorage({
							key: 'browseList',
							data: browseList,
							success: () => {
								console.log('set')
							}
						})
					} else {
						browseList.splice(index, 1)
						browseList.unshift(this.carDetail)
						uni.setStorage({
							key: 'browseList',
							data: browseList,
							success: () => {}
						})
					}
				},
				fail: () => {
					browseList.unshift(this.carDetail)
					uni.setStorage({
						key: 'browseList',
						data: browseList,
						success: () => {
							console.log('set')
						}
					})
				}
			})
			// 全部参数配置 
			let plevelid = "";
			if (this.carDetail.cars.plevelid) {
				console.log(plevelid)
				plevelid = this.carDetail.cars.plevelid
			} else {
				await getCarTypeByVin({
					vin: this.carDetail.cars.VIN
				}).then(res => {
					let msg = JSON.parse(res.data.LogMessage).message
					if (msg) {
						/* uni.showToast({
							title: msg,
							icon: "none",
							duration: 2000
						}) */
					} else {
						// console.log(JSON.parse(res.data.LogMessage).data)
						let list = JSON.parse(res.data.LogMessage).data;
						let obj = list.find(ele => this.carDetail.cars.FullName == ele.psalename)
						// console.log(obj)
						if(obj){
							plevelid = obj.plevelid
						}	
					}
				})
			}
			let carVin = await getCarModelConfigByTid({
				tid: plevelid
			})
			console.log('vin码返回',carVin.data)
			if(carVin.data.ResultType == 0){ //有vin码返回值
				if (JSON.parse(carVin.data.LogMessage).result[0]) {
					this.carVin = JSON.parse(carVin.data.LogMessage).result[0]
				}
				if (Object.keys(this.carVin).length != 0) {
					this.allParamShow = true
					this.$refs.sonVinInfo.sonAssginVin(this.carVin);
				}
			}
			// 车况检测
			let carCheckStatus = await getCarCheckStatus({
				carid: id
			})
			this.carCheckStatus = carCheckStatus.data.Data
			this.$refs.sonStatusInfo.sonAssginStatus(this.carCheckStatus);
			// 猜你喜欢
			this.car.Carid = options.id
			this.car.SaleAMTMin = await this.carDetail.cars.SaleAMT - 5 > 0 ? this.carDetail.cars.SaleAMT - 5 : 1
			this.car.SaleAMTMax = await this.carDetail.cars.SaleAMT + 5
			//#ifndef H5
			uni.getStorage({
				key: 'city',
				success: function(res) {
					_this.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						_this.car.city_name = arr.join("")
					} else {
						_this.car.city_name = res.data
					}
				}
			});
			//#endif
			//#ifdef H5
			uni.getStorage({
				key: 'citys',
				success: function(res) {
					_this.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						_this.car.city_name = arr.join("")
					} else {
						_this.car.city_name = res.data
					}
				}
			});
			//#endif
			await uni.hideLoading()
			let recomList = await getCarList({ ...this.car
			});
			this.recomList = recomList.data.Data.DataList
			this.transmissionConfig = transmissionConfig;
		},
		methods: {
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			onClickItem(e) {
				if (this.$refs.sonVinInfo.currentCard !== e.currentIndex) {
					this.$refs.sonVinInfo.currentCard = e.currentIndex;
				}
			},
			onClickStatusItem(e) {
				if (this.$refs.sonStatusInfo.currentStatus !== e.currentIndex) {
					this.$refs.sonStatusInfo.currentStatus = e.currentIndex;
				}
			},
			//分享
			/* share() {
				this.$refs.share.toggleMask();
			}, */
			navToDetailPage(item) {
				let id = item.ID;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			//分享
			setShare(){
				var _this = this
				const currentUser = uni.getStorageSync('userInfo') || ''
				let currentUrl = window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1]
				console.log('分享用户', currentUser)
				console.log('分享链接', currentUrl)
				if(currentUser){
					currentUrl += '?shareUser=' + currentUser.id
				}
				/*const share_name = this.shareName 
				const share_img = this.shareImg */
				const shareInfo = {
				 title: `淘车乐二手车`,
				  desc: _this.carDetail.cars.FullName,
				  // link: window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1],
					link: currentUrl,
				  img: _this.imgUrl +'/'+ _this.carDetail.carimages[0].filename
				}
				// mixins
				/*console.log('1')
				console.log(this.shareName)
				console.log('2')
				console.log(this.shareImg)*/
				_this.wechatShare(shareInfo)
			},
			// 收藏
			doCollect() {
				var _this = this
				let collectList = [];
				uni.getStorage({
					key: 'collectList',
					success: (res) => {
						collectList = res.data
						let index = res.data.findIndex(ele => {
							return _this.carDetail.cars.ID == ele.cars.ID
						})
						if (index == -1) {
							collectList.unshift(_this.carDetail)
							_this.favorColor = 'green'
							_this.favorite = true
							_this.collection = '已收藏'
							uni.setStorage({
								key: 'collectList',
								data: collectList,
								success: () => {
									uni.showToast({
										title: '已收藏',
										icon: "success",
										duration: 1500
									})
								}
							})
						} else {
							collectList.splice(index, 1)
							_this.favorColor = 'gray'
							_this.favorite = false
							_this.collection = '收藏'
							// collectList.unshift(this.carDetail)
							uni.setStorage({
								key: 'collectList',
								data: collectList,
								success: () => {
									uni.showToast({
										title: '取消收藏',
										icon: "success",
										duration: 1500
									})
								}
							})
						}
					},
					fail: () => {
						collectList.unshift(_this.carDetail)
						uni.setStorage({
							key: 'collectList',
							data: collectList,
							success: () => {
								// console.log('set')
							}
						})
					}
				})
			},
			dialPhoneNumber(){ //点击号码拨打电话
				console.log('打电话')
				var _this = this
				uni.makePhoneCall({	 	
				 	// 手机号
				    phoneNumber: _this.carDetail.Telephone, 
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
			goPutOn() {
				const param = {carid: this.car.Carid, putton:1}
				// console.log(param)
				carPutOn(param).then(res=>{
					// console.log(res.data)
					if(res.data.ResultType == 0){
						this.$api.msg(`车源已上架`,1000);
						setTimeout(()=>{
							uni.reLaunch({
								url: '/pages/car/list'
							})
						}, 1100)
					}
				})
			},
			reEdit() {
				// console.log(this.car.Carid)
				const carid = this.car.Carid
				uni.reLaunch({
					url: `/pages/car/carEdit?id=` + carid
				})
			},
			stopPrevent() {

			}
		},

	}
</script>

<style lang='scss'>
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

	page {
		background: $page-color-base;
		/* padding-bottom: 160upx; */
	}

	uni-page-body {
		padding-bottom: 20px;
	}

	uni-page-body {
		padding-bottom: 20px;
	}
	
	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
			width: 30%;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.carousel {
		height: 500upx;
		position: relative;

		.collect {
			position: absolute;
			right: 40upx;
			bottom: -30upx;
			width: 60upx;
			height: 60upx;
		}

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
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

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		
		.cuIcon-favor {
			font-size: 32upx;
		}
		.cuIcon-post {
			font-size: 32upx;
		}
		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
			justify-content:space-between;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			/* padding-left: 26upx; */

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		padding: 10upx 30upx;

		.a-t {
			display: flex;

			image {
				width: 170upx;
				height: 170upx;
				flex-shrink: 0;
				margin-top: -40upx;
				border-radius: 8upx;
				;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.price {
					font-size: $font-lg;
					color: $uni-color-primary;
					margin-bottom: 10upx;
				}

				.selected-text {
					margin-right: 10upx;
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: $uni-color-primary;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 60vh;
			max-height: 60vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $base-color;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 10upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin-left: 20upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255, 255, 255, .5);
			}

			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}

	/* 猜你喜欢 */
	.guess-section {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.guess-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 230upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
</style>
