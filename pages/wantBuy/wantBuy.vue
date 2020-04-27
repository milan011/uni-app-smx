<template>
	<view class="container">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 我的求购
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">搜索</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-blue shadow" @tap="createCar" data-target="menuModal">添加求购</button>
					</view>
				</view>
				<view class="cu-list menu">
					<view v-for="(item, index) in cartList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
						<navigator class="content" hover-class="none" :url="'./show/show?carId='+item.want.id" open-type="navigate">
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.want.carcate }}</text>
						</navigator>
						<view class="action">
							<!-- <view class="cu-tag round bg-orange light">正常</view> -->
							<view class="cu-tag round bg-olive light">{{item.want.want_status}}</view>
							<view class="cu-tag round bg-blue light">{{item.want.created_at}}</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</scroll-view>
			<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-bar bg-white">
								<view class='action'>
									<text class='cuIcon-title text-blue'></text>车辆状态
								</view>
							</view>
							<view class="padding bg-white" style="display: flex;justify-content: space-between;">
								<view class='cu-tag radius' :class="want.wantstatus===1?'bg-orange':''" @click="changeType(1)">正常</view>
								<view class='cu-tag radius' :class="want.wantstatus===0?'bg-orange':''" @click="changeType(0)">废弃</view>
								<view class='cu-tag radius' :class="want.wantstatus===4?'bg-orange':''" @click="changeType(4)">已交易</view>
							</view>
							<view class="cu-bar bg-white">
								<view class='action'>
									<text class='cuIcon-title text-blue'></text>变速箱
								</view>
							</view>
							<view class="padding bg-white" style="display: flex;justify-content: space-between;">
								<view class='cu-tag radius' :class="want.bsx===0?'bg-orange':''" @click="changeBsx(0)">不限</view>
								<view class='cu-tag radius' :class="want.bsx==1?'bg-orange':''" @click="changeBsx(1)">手动</view>
								<view class='cu-tag radius' :class="want.bsx==2?'bg-orange':''" @click="changeBsx(2)">自动</view>
							</view>
							<view class="cu-bar bg-white">
								<view class='action'>
									<text class='cuIcon-title text-blue'></text>价格区间
								</view>
							</view>
							<view class="padding bg-white" style="display: flex;justify-content: space-between;">
								<view class='cu-tag radius' :class="want.pricemin===0 && want.pricemax==3?'bg-orange':''" @click="changePrice(0,3)">三万以下</view>
								<view class='cu-tag radius' :class="want.pricemin===3 && want.pricemax==5?'bg-orange':''" @click="changePrice(3,5)">3-5万</view>
								<view class='cu-tag radius' :class="want.pricemin===5 && want.pricemax==15?'bg-orange':''" @click="changePrice(5,15)">5-15万</view>
								<view class='cu-tag radius' :class="want.pricemin===15 && want.pricemax==500?'bg-orange':''" @click="changePrice(15,500)">15万以上</view>
							</view>
							<view class="cu-bar bg-white">
								<view class='action'>
									<text class='cuIcon-title text-blue'></text>日期
								</view>
							</view>
							<view class="padding bg-white" style="display: flex;justify-content: space-between;">
								<view class="uni-list">
									<view class="uni-list-cell">
										<view class="uni-list-cell-left">
											开始日期
										</view>
										<view class="uni-list-cell-db">
											<picker mode="date" :value="startDate" @change="bindDateChange">
												<view class="uni-input">{{startDate==""?"请选择开始日期":startDate}}</view>
											</picker>
										</view>
									</view>
									<view class="uni-list-cell" style="margin-top: 30upx;">
										<view class="uni-list-cell-left">
											结束日期
										</view>
										<view class="uni-list-cell-db">
											<picker mode="date" :value="endDate" @change="bindEndDateChange">
												<view class="uni-input">{{endDate==""?"请选择结束日期":endDate}}</view>
											</picker>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="padding flex flex-direction">
							<view class="cu-btn bg-blue lg" @tap="doSeach">确定</view>
							<view class="cu-btn bg-grey margin-tb-sm lg" @tap="hideModal">取消</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniList from '@/components/uni-list/uni-list';
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import {
		getWantList
	} from "@/api/want.js"
		import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniNumberBox,
			uniSwipeAction,
			uniSwipeActionItem,
			uniList,
			uniListItem,
			uniTag,
			uniLoadMore
		},
		data() {
			return {
				menuArrow: false,
				empty: false, //空白页现实  true|false
				cartList: [],
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
				modalName: null,
				type: [{
						value: "正常",
						isAct: false,
					},
					{
						value: "废弃",
						isAct: false,
					},
					{
						value: "已交易",
						isAct: false,
					}
				],
				transmission: [{
						value: "不限",
						isAct: false,
					},
					{
						value: "手动",
						isAct: false,
					},
					{
						value: "自动",
						isAct: false,
					}
				],
				price: [{
						value: "3万以下",
						isAct: false,
					},
					{
						value: "3-5万",
						isAct: false,
					},
					{
						value: "5-15万",
						isAct: false,
					}, {
						value: "15万以上",
						isAct: false,
					}
				],
				startDate: "",
				endDate: "",
				want: {
					PageSize: 14,
					pageIndex: 1,
					cartype: "",
					carbak1: "",
					carbak2: "",
					bsx: 0,
					pricemin: "",
					pricemax: "",
					describ: "",
					userid: "",
					shopid: "",
					wantstatus: "",
					updatetime: "",
					rolename: "",
					startTime: "",
					endTime: ""
				},
				total: "",
				loadingType: 'more', //参数loading加载,nomore
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.want.shopid = res.data.shop_id;
					this.want.rolename = res.data.rolename.substring(0, res.data.rolename.length - 1);
					this.want.userid = res.data.id;
					console.log(this.want)
				}
			})
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.want.pageIndex = 1
			this.want.wantstatus = "";
			this.want.bsx = 0;
			this.want.pricemin = "";
			this.want.pricemax = "";
			this.want.startTime = "";
			this.want.endTime = "";
			this.loadData()
			uni.stopPullDownRefresh();

		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.want.PageSize)
			if (this.want.pageIndex == num || this.want.pageIndex > num) {
				this.want.pageIndex = 1
				return
			} else {
				this.want.pageIndex++
				console.log(this.want.pageIndex)
				this.loadData();
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
				this.loadingType = "loading"
				this.cartList = []
				let cartList = await getWantList({ ...this.want
				})
			    this.cartList = cartList.data.Data.DataList;
				this.total = cartList.data.Data.Total;
				this.cartList.forEach(ele => {
					if (ele.want.want_status == 0) {
						ele.want.want_status = "废弃"
					} else if (ele.want.want_status == 1) {
						ele.want.want_status = "正常"
					} else if (ele.want.want_status == 4) {
						ele.want.want_status = "已交易"
					}
					if (ele.want.created_at) {
						ele.want.created_at = ele.want.created_at.substring(0, ele.want.created_at.indexOf("T"))
					}
				})
				if (this.want.pageIndex < this.total/this.want.PageSize) {
					this.loadingType = "more"
				} else {
					this.loadingType = "nomore"
				}
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			doSeach() {
				this.loadData();
				this.hideModal();
			},
			// 时间选择器
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 底部栏显示
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			// 底部栏隐藏
			hideModal(e) {
				this.modalName = null
			},
			// 车辆状态点击时间
			changeType(val) {
				this.want.wantstatus = val
			},
			// 点击选择变速箱
			changeBsx(val) {
				this.want.bsx = val
			},
			// 点击选择价格
			changePrice(min, max) {
				this.want.pricemin = min
				this.want.pricemax = max
			},
			// 时间选择器确定
			bindDateChange: function(e) {
				this.startDate = e.target.value
				this.want.startTime = e.target.value
			},
			bindEndDateChange: function(e) {
				this.endDate = e.target.value
				this.want.endTime = e.target.value
			},
			createCar() {
				uni.navigateTo({
					url: './add/add'
				})
				this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 0upx;
		padding-top: 15upx;

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

	.cu-modal {
		z-index: 1 !important;

		.padding {
			padding: 10upx 40upx;
		}

		.uni-input {
			line-height: 20upx;
		}

		.uni-list::before {
			height: 0;
		}

		.uni-list::after {
			height: 0;
		}

		.uni-list-cell::after {
			height: 0;
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
