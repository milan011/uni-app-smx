<template>
	<view class="container">
		<HMfilterDropdown :filterData="menuData" ref="filterDropdown" :defaultSelected="filterDropdownValue" :updateMenuName="true" @confirm="confirm"></HMfilterDropdown>
		<!-- <view class="cart-list">
			<uni-swipe-action>
				<uni-swipe-action-item :options="options" @click="onClick" @change="change">
					<view class='cont'>SwipeAction 基础使用场景</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view> -->

		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 我的车源
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow" @tap="createCar" data-target="menuModal">添加车源</button>
					</view>
				</view>
				<view class="cu-list menu">
					<view v-for="(item, index) in cartList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
						<navigator class="content" hover-class="none" :url="'./show?carId='+item.ID" open-type="navigate">
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.FullName }}</text>
						</navigator>
						<view class="action">
							<!-- <view class="cu-tag round bg-orange light">正常</view> -->
							<view class="cu-tag round bg-olive light">正常</view>
							<view class="cu-tag round bg-blue light">2020-03-01</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import {
		getCarList,
		getCarTypeList,
		getCarShopList
	} from '@/api/car.js'
	import uniNumberBox from '@/components/uni-number-box.vue'
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniList from '@/components/uni-list/uni-list';
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import menuExam from '@/Json.js'
	export default {
		components: {
			uniNumberBox,
			uniSwipeAction,
			uniSwipeActionItem,
			uniList,
			uniListItem,
			uniTag,
			HMfilterDropdown
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				menuData: [],
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				filterDropdownValue: [],
				options: [{
					text: '查看',
					carId: 23,
					style: {
						backgroundColor: '#006c00'
					}
				}, {
					text: '编辑',
					carId: 23,
					style: {
						backgroundColor: '#b5b55a'
					}
				}],
				car: {
					PageIndex: 1,
					PageSize: 14,
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
					IsPutOn: -1,
					Shop_Id: "",
					Sale_number: -1
				},
				total: ""
			};
		},
		onLoad(options) {
			let that = this
			//#ifndef H5
			uni.getStorage({
				key: 'city',
				success: function(res) {
					that.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						that.car.CityName = arr.join("")
					} else {
						that.car.CityName = res.data
					}
				}
			});
			//#endif
			//#ifdef H5
			uni.getStorage({
				key: 'citys',
				success: function(res) {
					that.city = res.data
					let arr = res.data.split("")
					let index = arr.length - 1
					if (arr[index] == "市") {
						let arr1 = arr.pop()
						that.car.CityName = arr.join("")
					} else {
						that.car.CityName = res.data
					}
				}
			});
			//#endif
			this.loadData();
			this.getCarTypelist()
			this.getshoplist()
		},
		//下拉刷新
		onPullDownRefresh() {
			var that = this
			this.$refs.filterDropdown.resetFilterData(2);
			this.$refs.filterDropdown.resetFilterData(3);
			this.car.OrderPriceMin = ""
			this.car.OrderYearMin = ""
			this.car.OrderNew = ""
			this.car.Factory = ""
			this.car.SaleAMTMin = ""
			this.car.SaleAMTMax = ""
			this.car.CarType = ""
			this.car.Transmission = ""
			this.car.Shop_Id = ""
			this.car.PageIndex = 1
			uni.removeStorage({
				key: 'selectConditions',
				success: (res) => {
					that.car.SaleAMTMin = ""
					that.car.SaleAMTMax = ""
					getCarList({ ...that.car
					}).then(res => {
						that.cartList = res.data.Data.DataList;
						that.total = res.data.Data.Total
						// that.loadingType = that.goodsList.length >= that.total ? 'nomore' : 'more';
						uni.stopPullDownRefresh()
					})
			
				}
			})
		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.car.PageSize)
			if (this.car.PageIndex < num) {
				this.car.PageIndex++
				this.loadData();
			} else {
				return
			}
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			//请求数据
			async loadData() {
				let list = await getCarList({ ...this.car
				})
				let cartList = list.data.Data.DataList
				cartList.forEach(function(element, index) {
					// console.log(element)
					let options = [{
						text: '查看',
						carId: 23,
						style: {
							backgroundColor: '#006c00'
						}
					}, {
						text: '编辑',
						carId: 23,
						style: {
							backgroundColor: '#b5b55a'
						}
					}]
					options[0].carId = element.ID
					options[1].carId = element.ID
					element.options = options
				})
				this.cartList = cartList;
				console.log(this.cartList)
				this.menuData = await this.$api.json('menuExam');
				this.calcTotal(); //计算总价
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			onClick(e) {
				console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
				console.log('carId', e.content.carId)
			},
			change(open) {
				console.log('当前开启状态：' + open)
			},
			// 获取车型
			getCarTypelist() {
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
					menuExam.menuExam[1].submenu.push(...list)
				})
			},
			// 商店列表
			getshoplist() {
				getCarShopList({
					id: 1
				}).then(res => {
					let list = res.data.Data
					list.forEach(ele => {
						ele.value = ele.id
						ele.submenu = []
					})
					menuExam.menuExam[3].submenu[2].submenu.push(...list)
				})
			},
			// 筛选
			confirm(val) {
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
				getCarList({ ...this.car
					})
					.then(res => {
						this.cartList = res.data.Data.DataList;
						this.total = res.data.Data.Total
						// this.loadingType = this.goodsList.length >= this.total ? 'nomore' : 'more';
					})
			},
			numberChange(data) {
				this.cartList[data.index].number = data.number;
				this.calcTotal();
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.number;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createCar() {
				uni.navigateTo({
					// url: '/pages/car/customer'
					url: '/pages/car/carCreate'
				})
				this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 0upx;
		padding-top: 96upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	.car-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0upx;

		.content {
			width: 400upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 0upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
