<template>
	<view class="container">
		<!-- <view class="container"> -->
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<!-- <view class="carousel-section">
		<view class="mp-search-box" style="display:blcok">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		</view> -->
		<!-- #endif -->
		<view class="header-search">
			<view class="cu-bar search bg-white">
				<view v-if="!allMarket&&notAppId" class="action">
					<text class="cuIcon-back text-gray" @tap="returnToSmx"></text> {{marketCurrent}}
				</view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @click="toSearch" :adjust-position="false" type="text" placeholder="搜索关键词" confirm-type="search"></input>
				</view>
				<view class="action" @click="toCitySelect">
					<text>{{city}}</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
			</view>
		</view>
		<view class="carousel-section" style="padding-top:0px">
		</view>
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular autoplay="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" @click="toBuy">
				<image src="/static/temp/c3.png"></image>
				<text>我要买车</text>
			</view>
			<view class="cate-item" @click="toSell">
				<image src="/static/temp/c5.png"></image>
				<text>我要卖车</text>
			</view>
			<view class="cate-item" @click="toJoin">
				<image src="/static/temp/c6.png"></image>
				<text>我要加盟</text>
			</view>
			<view class="cate-item" @click="toAbout">
				<image src="/static/temp/c7.png"></image>
				<text>关于我们</text>
			</view>
		</view>
		<view class="order-section">
			<view class="order-item" @tap="navToCarList" data-price="0-3" data-cont="3万以下" hover-class="common-hover" :hover-stay-time="50">
				<text>3万以下</text>
			</view>
			<view class="order-item" @tap="navToCarList" data-price="3-5" data-cont="3-5万" hover-class="common-hover" :hover-stay-time="50">
				<text>3-5万</text>
			</view>
			<view class="order-item" @tap="navToCarList" data-price="5-15" data-cont="5-15万" hover-class="common-hover" :hover-stay-time="50">
				<text>5-15万</text>
			</view>
			<view class="order-item" @tap="navToCarList" data-price="15-10000" data-cont="15万以上" hover-class="common-hover" :hover-stay-time="50">
				<text>15万以上</text>
			</view>
		</view>
		<view class="cate-section">
			<view class="cate-item" @tap="navToCarList" data-factory="本田">
				<image src="/static/brand/bentian.jpg"></image>
				<text>本田</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="大众">
				<image src="/static/brand/dazhong.jpg"></image>
				<text>大众</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="奔驰">
				<image src="/static/brand/benz.png"></image>
				<text>奔驰</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="丰田">
				<image src="/static/brand/fengtian.jpg"></image>
				<text>丰田</text>
			</view>
		</view>
		<view class="cate-section">
			<view class="cate-item" @tap="navToCarList" data-factory="奥迪">
				<image src="/static/brand/aodi.jpg"></image>
				<text>奥迪</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="宝马">
				<image src="/static/brand/bmw.png"></image>
				<text>宝马</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="福特">
				<image src="/static/brand/fute.jpg"></image>
				<text>福特</text>
			</view>
			<view class="cate-item" @tap="navToCarList" data-factory="">
				<image src="../../static/index/more.png"></image>
				<text>更多</text>
			</view>
		</view>
		<!-- 快捷筛选 End-->
		<!-- 一级平台展示 Begain -->
		<view v-if="allMarket" class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">一级平台</text>
				<text class="tit2">优秀平台展示</text>
			</view>
			<!-- <text class="yticon icon-you"></text> -->
		</view>
		<view v-if="allMarket" class="hot-floor">
			<scroll-view class="floor-list" scroll-x>
				<view class="scoll-wrapper">
					<view 
						v-for="(item, index) in marketList" :key="index"
						class="floor-item"
						@click="navToMarketPage(item)"
					>
						<image style="height: 100upx;" :src="imgUrl+item.shoplogo" mode="aspectFit"></image>
						<text class="title clamp">{{item.name}}</text>
					</view>
					<!-- <view class="more">
						<text>查看全部</text>
						<text>More+</text>
					</view> -->
				</view>
			</scroll-view>
		</view>
		<!-- 一级平台展示 End -->
		<!-- 车型推荐 -->
		<view class="f-header m-t">
			<image src="/static/temp/h1.png"></image>
			<view class="tit-box">
				<text class="tit">好车推荐</text>
				<text class="tit2">为您精选好车</text>
			</view>
		</view>
		<view class="guess-section">
			<view v-for="(item, index) in carList" :key="index" class="guess-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="imgUrl+item.filename" mode="scaleToFill"></image>
				</view>
				<!-- <text class="title clamp">{{item.FullName}}</text> -->
				<view style="min-height:21%;">{{item.FullName}}</view>
				<text class="price">￥{{item.SaleAMT}}万</text>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import {
		getCarList
	} from '@/api/car.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { getMarketShopList, getMarketByAppid } from '@/api/shop.js'
	import { getStorageByKey } from '@/common/storage.js'
	const Qs = require('qs');
	export default {
		components: {
			uniNavBar,
			uniSearchBar,
			uniTag,
			uniLoadMore,
		},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				carList: [],
				marketList: [],
				marketCurrent: null,
				notAppId: true,
				allMarket: true,
				imgUrl: Config.img_url,
				car: {
					PageIndex: 1,
					PageSize: 4,
					CityName: "",
					CarAges: "",
					Factory: "",
					SaleAMTMin: "",
					SaleAMTMax: "",
					CarType: "",
					Transmission: "",
					Out_color: "",
					UserKind: "",
					OrderPriceMin: "",
					OrderPriceMax: "",
					OrderNew: "",
					OrderKliMin: "",
					OrderYearMin: "",
					Car_Status: 1,
					IsPutOn: 1,
					Shop_Id: "",
					P_Shop_Id: '',
					Sale_number: -1
				},
				ifOnShow: false,
				city: "",
				total: "",
				loadingType: 'loading', //参数loading加载,nomore
			};
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  console.log('hide')
		  this.ifOnShow = true
		},
		async onShow(){
			console.log('showle',this.ifOnShow)
			var _this = this
			// if(_this.ifOnShow){
				await getStorageByKey('pshop').then(res=>{
					console.log('showle', res)
					if(res){
						_this.allMarket = false
						_this.marketCurrent = res.name
						_this.car.P_Shop_Id = res.id
						_this.car.PageIndex = 1
						getCarList(_this.car).then(res=>{
							_this.carList = res.data.Data.DataList
							_this.total = res.data.Data.Total
						})
					}
				})
			// }	
		},
		async onLoad() {
			var _this = this	
			//获取所有市场列表
			_this.getMarketList()
			// 轮播图初始化
			let carouselList = await this.$api.json('carouselList');
			this.titleNViewBackground = carouselList[0].background;
			this.swiperLength = carouselList.length;
			this.carouselList = carouselList;
			
			// 城市初始化
			await getStorageByKey('selectCity').then(res => { //用户选择城市
				console.log('用户选择城市', res)
				_this.listQueryReset({CityName: res})
				_this.city = res
			})
			// console.log(_this.car.CityName)
			if(!_this.car.CityName){ //用户没有选择城市
				await getStorageByKey('locationCity').then(res => {
					console.log('当前定位城市', res)
					_this.listQueryReset({CityName: res})
					_this.city = res
				})
			}
			
			//#ifdef MP-WEIXIN
			//小程序appId确定pshop
			const currentAppId = uni.getAccountInfoSync().miniProgram.appId
			// const currentAppId = "wx20ge3d96cesedbb2"
			_this.marketList.forEach(ele=>{
				// console.log('当前小程序', currentAppId)
				if(ele.appid == currentAppId){
					console.log('当前市场load',ele.name)
					_this.allMarket = false
					_this.marketCurrent = null
					_this.notAppId = false
					uni.setStorageSync('pshop', {id: ele.id, name: ele.name})
					_this.listQueryReset({P_Shop_Id: ele.id})
					/* uni.setTabBarItem({  
					  index: 2,  
					 "pagePath": "pages/sell/sellCar",
					 "iconPath": "static/tab-cart.png",
					 "selectedIconPath": "static/tab-cart-current.png",
					 "text": "卖车"  
					}) */ 	
				}	
			})
			//#endif
			//#ifndef MP-WEIXIN
			await getStorageByKey('pshop').then(res=>{
				if(res){
					console.log('当前市场load', res.name)
					_this.marketCurrent = res.name
					_this.allMarket = false
					_this.listQueryReset({P_Shop_Id: res.id})
				}
			})
			//#endif
			//一级市场
			
			_this.listQueryReset({PageIndex: 1})
			_this.getCarList()	
		},
		methods: {
			/**---**/
			toSell() {
				uni.switchTab({
					url: '../sell/sellCar'
				});
			},
			toBuy() {
				uni.setStorage({
					key: 'selectConditions',
					data: [],
					success: function() {
						uni.reLaunch({
							url: `/pages/product/list`
						})
					}
				})
			},
			toCitySelect() {
				uni.navigateTo({
					url: '../city/citySelect'
				});
			},
			navToCarList(e) {
				var conditions = e.currentTarget.dataset
				uni.setStorage({
					key: 'selectConditions',
					data: conditions,
					success: function() {		
						uni.reLaunch({
							url: `/pages/product/list`
						})
					}
				});
			},
			getMarketList(){
				var _this = this
				getMarketShopList({ pid: '0' }).then(res=>{
					// console.log('所有一级市场', res)	
					_this.marketList = res.data.Data
				})
			},
			//下拉刷新
			onPullDownRefresh() {
				// console.log('哥,你下拉了')
				this.loadingType = "loading"
				this.carList = []
				this.car.PageIndex = 1
				this.getCarList()
				uni.stopPullDownRefresh()
			},
			//上拉加载更多
			onReachBottom() {
				var _this = this
				console.log('哥,你上拉了',_this.loadingType)
				if(_this.loadingType == "nomore"){
					return false
				}else{
					_this.car.PageIndex++
					_this.getCarList('add')
				}
			},
			loadData(){
				
			},
			listQueryReset(queryObj){
				var _this = this
				// console.log('搜索条件重置', queryObj)
				Object.keys(queryObj).forEach(function(key){
					if(_this.car.hasOwnProperty(key)){
						_this.car[key] = queryObj[key]
					}
				})
			},
			async getCarList(type='') {
				var _this = this
				_this.loadingType = "loading"
				getCarList(_this.car).then(res=>{
					// console.log(res)
					const currentPage = _this.car.PageIndex //当前页
					let totalPage  = null //共几页
					
					if(type == 'add'){ //上拉加载分页
						_this.carList = _this.carList.concat(res.data.Data.DataList)
					}else{
						_this.carList =res.data.Data.DataList
					}
					
					_this.total = res.data.Data.Total //总页数
					totalPage  = Math.ceil(_this.total/_this.car.PageSize)
					
					if(currentPage < totalPage){ //未到最后一页
						_this.loadingType = "more"
					}else{ //已到最后一页
						_this.loadingType = "nomore"
					}
					// console.log('总数',_this.total)
					// console.log('当前页',_this.car.PageIndex)
					// console.log('每页数',_this.car.PageSize)
					// console.log('共几页', Math.ceil(_this.total/_this.car.PageSize))
					// console.log('加载状态', _this.loadingType)
				})
			},
			// 去搜索页面
			toSearch() {
				uni.navigateTo({
					url: `/pages/search/search`
				})
			},
			// 去加盟页
			toJoin() {
				uni.navigateTo({
					url: `/pages/join/join`
				})
			},
			// 去关于我们页面
			toAbout() {
				uni.navigateTo({
					url: `/pages/about/about`
				})
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			returnToSmx(){
				// console.log('去总平台')
				var _this = this
				uni.removeStorageSync('pshop')
				_this.marketCurrent = null
				_this.allMarket = true
				_this.listQueryReset({P_Shop_Id: '', PageIndex: 1})
				_this.getCarList()
			},
			//一级市场
			navToMarketPage(pshop){
				console.log('去一级市场', pshop)
				var _this = this
				uni.setStorage({
					key: 'pshop',
					data: {id:pshop.id, name: pshop.name},
					success: function() {
						_this.marketCurrent = pshop.name
						_this.allMarket = false
						_this.car.P_Shop_Id = pshop.id
						_this.car.PageIndex = 1
						_this.carList = []
						getCarList(_this.car).then(res=>{
							_this.carList = res.data.Data.DataList
							_this.total = res.data.Data.Total
						})
					}
				})
				
			},
			//详情页
			navToDetailPage(item) {
				// console.log(item)
				let id = item.ID;
				let VIN = item.VIN
				uni.navigateTo({
					url: `/pages/product/product?id=${id} `
				})
				/* uni.redirectTo({ //使用redirectTo跳转到页面会显示tabBar
					url: `/pages/product/product?id=${id}`
				}) */
			},
			searchCar() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				// const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		// 跳转卖车页面

	}
</script>
<style>
	.uni-searchbar {
		width: 100%;
	}

	.my-style /deep/ .uni-navbar__header-btns-left {
		width: auto;
	}

	.my-style /deep/ .uni-navbar__content {
		width: 100%;
	}
</style>
<style lang="scss">
	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	page {
		background: #f5f5f5;
	}

	.m-t {
		margin-top: 16upx;
	}

	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 10px;

		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			// height: 426upx;
			transition: .4s;
		}
	}

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

	.order-section {
		@extend %section;

		// padding: 28upx 0;
		// margin-top: 20upx;
		.order-item {
			@extend %flex-center;
			width: 160upx;
			height: 120upx;
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

	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}

	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			// box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}

	.ad-1 {
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;

		image {
			width: 100%;
			height: 100%;
		}
	}

	/* 秒杀专区 */
	.seckill-section {
		padding: 4upx 30upx 24upx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			height: 92upx;
			line-height: 1;

			.s-img {
				width: 140upx;
				height: 30upx;
			}

			.tip {
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}

			.timer {
				display: inline-block;
				width: 40upx;
				height: 36upx;
				text-align: center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0, 0, 0, .8);
			}

			.icon-you {
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}

		.floor-list {
			white-space: nowrap;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}
	}

	.f-header {
		display: flex;
		align-items: center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;

		image {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}

		.tit2 {
			font-size: $font-sm;
			color: $font-color-light;
		}

		.icon-you {
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}

	/* 团购楼层 */
	.group-section {
		background: #fff;

		.g-swiper {
			height: 650upx;
			padding-bottom: 30upx;
		}

		.g-swiper-item {
			width: 100%;
			padding: 0 30upx;
			display: flex;
		}

		image {
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}

		.g-item {
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.left {
			flex: 1.2;
			margin-right: 24upx;

			.t-box {
				padding-top: 20upx;
			}
		}

		.right {
			flex: 0.8;
			flex-direction: column-reverse;

			.t-box {
				padding-bottom: 20upx;
			}
		}

		.t-box {
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}

		.price {
			color: $uni-color-primary;
		}

		.m-price {
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}

		.pro-box {
			display: flex;
			align-items: center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}

		.progress-box {
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}

	/* 分类推荐楼层 */
	.hot-floor {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;

		.floor-img-box {
			width: 100%;
			height: 320upx;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255, 255, 255, .06) 30%, #f8f8f8);
			}
		}

		.floor-img {
			width: 100%;
			height: 100%;
		}

		.floor-list {
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			// margin-top: -140upx;
			// margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
			position: relative;
			z-index: 1;
		}

		.scoll-wrapper {
			display: flex;
			align-items: flex-start;
		}

		.floor-item {
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}

			.price {
				color: $uni-color-primary;
			}
		}

		.more {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;

			text:first-child {
				margin-bottom: 4upx;
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
			height: 240upx;
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
