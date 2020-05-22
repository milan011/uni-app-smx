<template>
	<view class="content">
		<HMfilterDropdown :filterData="menuData" ref="filterDropdown" :defaultSelected="filterDropdownValue" :updateMenuName="true"
		 @confirm="confirm"></HMfilterDropdown>
		<view class="goods-list">
			<view style="width: 100%;" class="cu-card article no-card" v-for="(item, index) in goodsList" :key="index" @click="navToDetailPage(item)">
				<view class="cu-item shadow">
					<view class="content">
						<image :src="imgUrl+item.filename" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content" style="padding-top: 0.8em;">{{item.FullName}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">¥ {{item.SaleAMT}}万元</view>
								<view class="cu-tag bg-green light sm round">{{item.Mileage}}万公里</view>
								<view class="cu-tag bg-green light sm round">{{item.CityName}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>

		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<view v-for="item in cateList" :key="item.id">
						<view class="cate-item b-b two">{{item.name}}</view>
						<view v-for="tItem in item.child" :key="tItem.id" class="cate-item b-b" :class="{active: tItem.id==cateId}"
						 @click="changeCate(tItem)">
							{{tItem.name}}
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

	</view>
</template>

<script>
	import Config from '@/common/config.js'
	import {
		getCarList,
		getCarTypeList,
		getCarShopList
	} from '@/api/car.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import menuExam from '@/Json.js'
	export default {
		components: {
			uniLoadMore,
			HMfilterDropdown
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				menuData: [],
				filterDropdownValue: [],
				filterDropdownValueM: [[0],[0,0],[[]], [[],[],[]]],
				selectConditions: {},
				goodsList: [],
				xiala: 'wo mei xiala',
				imgUrl: Config.img_url,
				car: {
					PageIndex: 1,
					PageSize: 6,
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
					Sale_number: -1
				},
				total: ""
			};
		},

		async onLoad(options) {
			let _this = this
			console.log('xiala==>?',_this.xiala)
			// return false
			// #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
			// #ifdef MP-WEIXIN
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation()
				}
			})
			// #endif

			//#ifndef H5
			uni.getStorage({
				key: 'city',
				success: function(res) {
					_this.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						_this.car.CityName = arr.join("")
					} else {
						_this.car.CityName = res.data
					}
				},
				fail: function() {
					uni.showLoading({
						title: '请先选择城市'
					})
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
						_this.car.CityName = arr.join("")
					} else {
						_this.car.CityName = res.data
					}
				},
				fail: function() {
					uni.showLoading({
						title: '请先选择城市'
					})
				}
			});
			//#endif
			this.cateId = options.tid;
			// this.loadCateList(options.fid, options.sid);
			// this.getCarTypelist()
			// this.getshoplist()
			console.log('kaishi')
			console.log('menuData1', menuExam)
			await this.getshoplist()
			await this.getCarTypelist()
			this.menuData = await this.$api.json('menuExam');
			console.log('menuData2', this.menuData)
			console.log('开始初始化')
			await this.selectCondInit()

			console.log('4', _this.filterDropdownValueM)
			// return false
			// _this.filterDropdownValue = [[0],[5,9],[[]], [[],[],[]]]
			_this.filterDropdownValue = _this.filterDropdownValueM
			_this.$refs.filterDropdown.selectHierarchyMenu(1,_this.filterDropdownValue[1][0],_this.filterDropdownValue[1][1],null)
			console.log('搜索初始化完成',this.car)
			// return false
			// this.menuData = await this.$api.json('menuExam');
			// _this.loadData();
			console.log('end')
			// uni.getStorage({
			// 	key: 'selectConditions',
			// 	success: function(res) {
			// 		console.log(res.data)
			// 		// console.log('顶部横条数据',_this.$refs.filterDropdown)
			// 		if (res.data.price) {
			// 			let arr = res.data.price.split("-")
			// 			_this.car.SaleAMTMin = arr[0]
			// 			_this.car.SaleAMTMax = arr[1]
			// 			_this.loadData();
			// 		} else {
			// 			if (res.data.factory === true) {
			// 				_this.car.Factory = ''
			// 			} else {
			// 				_this.car.Factory = res.data.factory
			// 			}
			// 			_this.loadData();
			// 		}
			// 	},
			// 	fail: function() {
			// 		_this.loadData();
			// 	}
			// })
		},
		onShow() {
			// this.$refs.filterDropdown.selectHierarchyMenu(1,1,2)
		},
		mounted() {
			// this.$refs.filterDropdown.initMenu()
			// this.$refs.filterDropdown.menu = [{name: 'hehe'}, {name: '奥迪'}]
			console.log('顶部横条数据',this.$refs.filterDropdown.menu)
			console.log('json文件', this.menuData)
			console.log('菜单',this.$refs.filterDropdown.subData)
			// this.$refs.filterDropdown.selectFilterLabel(1,2,3)
			// this.filterDropdownValue = [[1],[4,2],[[]], [[],[],[]]]
			// this.$refs.filterDropdown.defaultSelected = [[1],[4,2],[[]], [[],[],[]]]
			// this.$refs.HMfilterDropdown.defaultSelected = [1,[1,2],[0,1], [0,0,1]]
			// this.$refs.filterDropdown.initMenu()
			// this.$refs.filterDropdown.activeMenuArr = [[0],[4,2],[[0]],[[],[],[]]]
			// this.$refs.filterDropdown.selectHierarchyMenu(1,4,2,null)
		},
		onHide(){
			/* this.$refs.filterDropdown.resetFilterData(2);
			this.$refs.filterDropdown.setFilterData(2);
			this.$refs.filterDropdown.resetFilterData(3);
			this.$refs.filterDropdown.setFilterData(3);
			this.$refs.filterDropdown.selectHierarchyMenu(0, 0);
			this.$refs.filterDropdown.selectHierarchyMenu(1, 0, 0);
			this.car.OrderPriceMin = ""
			this.car.OrderYearMin = ""
			this.car.OrderNew = ""
			this.car.Factory = ""
			this.car.SaleAMTMin = ""
			this.car.SaleAMTMax = ""
			this.car.CarType = ""
			this.car.Transmission = ""
			this.car.Shop_Id = ""
			this.car.PageIndex = 1 */
			uni.removeStorage({
				key: 'selectConditions',
				success: (res) => {
					
				}
			})
		},
		onPullDownRefresh() {	
			var _this = this
			_this.goodsList = []
			_this.xiala = 'wo xia la le '
			// return false
			console.log('xial?',_this.xiala)
			_this.filterDropdownValue = []
			_this.$refs.filterDropdown.selectHierarchyMenu(1,0,0,null)
			uni.stopPullDownRefresh()
			// _this.$refs.filterDropdown.resetFilterData(2);
			// _this.$refs.filterDropdown.setFilterData(2);
			// _this.$refs.filterDropdown.resetFilterData(3);
			// _this.$refs.filterDropdown.setFilterData(3);
			// _this.$refs.filterDropdown.selectHierarchyMenu(0, 0);
			// _this.$refs.filterDropdown.selectHierarchyMenu(1, 0, 0);
			// _this.car.OrderPriceMin = ""
			// _this.car.OrderYearMin = ""
			// _this.car.OrderNew = ""
			// _this.car.Factory = ""
			// _this.car.SaleAMTMin = ""
			// _this.car.SaleAMTMax = ""
			// _this.car.CarType = ""
			// _this.car.Transmission = ""
			// _this.car.Shop_Id = ""
			// _this.car.PageIndex = 1
			// uni.removeStorage({
			// 	key: 'selectConditions',
			// 	success: (res) => {
			// 		_this.car.SaleAMTMin = ""
			// 		_this.car.SaleAMTMax = ""
			// 		_this.loadingType = 'loading'
			// 		console.log('here1')
			// 		getCarList({ ..._this.car
			// 		}).then(res => {
			// 			_this.goodsList = res.data.Data.DataList;
			// 			_this.total = res.data.Data.Total
			// 			_this.loadingType = _this.goodsList.length >= _this.total ? 'nomore' : 'more';
			// 			uni.stopPullDownRefresh()
			// 		})
			// 	}
			// })
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.car.PageSize)
			if (this.car.PageIndex == num || this.car.PageIndex > num) {
				return
			} else {
				this.car.PageIndex++
				console.log(this.car.PageIndex)
				console.log('here1')
				console.log('load',this.loadingType)
				this.loadData();
			}
		},
		methods: {
			//加载分类
			/* async loadCateList(fid, sid) {
				let list = await this.$api.json('cateList');
				let cateList = list.filter(item => item.pid == fid);

				cateList.forEach(item => {
					let tempList = list.filter(val => val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			}, */
			async selectCondInit() {
				var _this = this
				let condArr = [[0],[0,0],[[]], [[],[],[]]]
				let topIndex = 1
				let firIndex = 0
				let senIndex = 0
				return new Promise(resolve => {
					uni.getStorage({
						key: 'selectConditions',
						success: function(res) {
							console.log('首页参数', res.data)
							console.log('筛选菜单',_this.menuData)
							if (res.data.price) {
								let arr = res.data.price.split("-")
								let condName = res.data.cont
								_this.car.SaleAMTMin = arr[0]
								_this.car.SaleAMTMax = arr[1]
								console.log(_this.menuData[2].submenu[0].submenu)
								_this.menuData[2].submenu[0].submenu.forEach((ele, index)=>{
									if(ele.name == condName){
										console.log('你选了我', index, '==>', ele)
										condArr[2][0] = [index]
									}
								})
								console.log(condArr)
							} else {		
								if (res.data.factory === true) {
									_this.car.Factory = ''
								} else {
									_this.car.Factory = res.data.factory								
									_this.menuData[1].submenu.forEach((ele,index)=>{
										ele.submenu.forEach((el, ind)=>{						
											if(el.brand == _this.car.Factory){
												console.log(el, ind)
												console.log(ele, index)
												condArr[1] = [index, ind]
											}
										})
									})
								}
							}				
							_this.filterDropdownValueM = condArr
							_this.filterDropdownValue = _this.filterDropdownValueM
							resolve()
						},
						fail: function() {
							resolve()
						}
					});				
				})
			},
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}
				// this.menuData = await this.$api.json('menuExam');
				// console.log('menuData', this.menuData)
				// let cond = await this.selectCondInit();
				let list = await getCarList({ ...this.car
				})
				let goodsList = list.data.Data.DataList
				this.total = list.data.Data.Total
				// this.filterDropdownValue = [[0],[4,2],[[]], [[],[],[]]]
				// this.$refs.filterDropdown.selectHierarchyMenu(1,4,2,null)
				if (type === 'refresh') {
					this.goodsList = [];
				}
				//筛选，测试数据直接前端筛选了
				if (this.filterIndex === 1) {
					goodsList.sort((a, b) => b.sales - a.sales)
				}
				if (this.filterIndex === 2) {
					goodsList.sort((a, b) => {
						if (this.priceOrder == 1) {
							return a.price - b.price;
						}
						return b.price - a.price;
					})
				}
				if (this.goodsList.length == 0) {
					this.goodsList = goodsList
				} else {
					this.goodsList = this.goodsList.concat(goodsList);
				}
				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType = this.goodsList.length >= this.total ? 'nomore' : 'more';
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading()
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},
			//筛选点击
			tabClick(index) {
				if (this.filterIndex === index && index !== 2) {
					return;
				}
				this.filterIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				console.log('here2')
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item) {
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				console.log('here3')
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			confirm(val) {
				console.log('条件数组', val)
				let value = val.value
				if (value[0] == '价格最低') {
					this.car.OrderPriceMin = true
					this.car.OrderYearMin = ""
					this.car.OrderNew = ""
				} else if (value[0] == '车龄最短') {
					this.car.OrderYearMin = true
					this.car.OrderPriceMin = ""
					this.car.OrderNew = ""
				} else if (value[0] == '里程最低') {
					this.car.OrderNew = true
					this.car.OrderPriceMin = ""
					this.car.OrderYearMin = ""
				} else {
					this.car.OrderPriceMin = ""
					this.car.OrderYearMin = ""
					this.car.OrderNew = ""
				}
				if (value[1][1] !== '品牌') {
					this.car.Factory = value[1][1]
				} else {
					this.car.Factory = ""
				}
				if (value[2][0][0]) {
					var price = value[2][0][0].split("-")
					this.car.SaleAMTMin = price[0]
					this.car.SaleAMTMax = price[1]
				} else {
					this.car.SaleAMTMin = ""
					this.car.SaleAMTMax = ""
				}
				if (value[3][0][0]) {
					this.car.CarType = value[3][0][0]
				} else {
					this.car.CarType = ""
				}
				if (value[3][1][0]) {
					this.car.Transmission = value[3][1][0]
				} else {
					this.car.Transmission = ""
				}
				if (value[3][2][0]) {
					this.car.Shop_Id = value[3][2][0]
				} else {
					this.car.Shop_Id = ""
				}
				this.car.PageIndex = 1
				this.goodsList = []
				this.loadingType = 'loading'
				// console.log('loda',this.loadingType)
				this.loadData()
				/* getCarList({ ...this.car
					})
					.then(res => {
						this.goodsList = res.data.Data.DataList;
						this.total = res.data.Data.Total
						this.loadingType = this.goodsList.length >= this.total ? 'nomore' : 'more';
					}) */
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.ID
				uni.navigateTo({
					url: `/pages/product/product?id=${id}&VIN=${item.VIN}`
				})
			},
			stopPrevent() {},
			// 获取车型列表
			async getCarTypelist() {
				return new Promise(resolve => {
					if(menuExam.menuExam[1].submenu.length > 1){
						resolve()	
					}else{
						getCarTypeList().then(res => {
							let list = res.data.Data
							list.forEach(ele => {
								ele.name = ele.CarTypeMark
								ele.value = ele.CarTypeMark
								ele.submenu = ele.BrandLst
								ele.submenu.forEach(i => {
									i.name = i.brand
									i.value = i.brand
								})
							})
							console.log('有品牌吗',menuExam.menuExam[1].submenu.length)
							menuExam.menuExam[1].submenu.push(...list)	
							console.log('cartyep')
							resolve()
						})
					}
					/* setTimeout(() => {
						
					}, 1500) */
				})
			},
			async getshoplist() {
				return new Promise(resolve => {
					if(menuExam.menuExam[3].submenu[2].submenu.length != 0){
						resolve()
					}else{
						getCarShopList({
							id: 1
						}).then(res => {
							let list = res.data.Data
							list.forEach(ele => {
								ele.value = ele.id
								ele.submenu = []
							})
							menuExam.menuExam[3].submenu[2].submenu.push(...list)
							console.log('shop')
							resolve()
						})
					}
					/* setTimeout(() => {
						
					}, 2500) */
				})
			}
		},
	}
</script>
<style>
	.cu-card.article>.cu-item .content {
		padding: 0px;
	}
</style>
<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
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
			height: 330upx;
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

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
</style>
