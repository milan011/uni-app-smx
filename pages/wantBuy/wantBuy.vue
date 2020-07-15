<template>
	<view class="container">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 我的求购
					</view>
					<view class="action">
						<button style="margin-right:5rpx" class="cu-btn bg-blue shadow" @tap="showModal" data-target="RadioModal">搜索</button>
						<button class="cu-btn bg-green shadow" @tap="createCar" data-target="menuModal">添加</button>
					</view>
				</view>
				<view class="cu-list menu">
					<view v-for="(item, index) in cartList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
						<navigator class="content" hover-class="none" :url="'./show/show?wantId='+item.want.id" open-type="navigate">
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.want.carcate }}</text>
						</navigator>
						<navigator hover-class="none" :url="'./show/show?wantId='+item.want.id" open-type="navigate">
							<view class="action">
								<!-- <view class="cu-tag round bg-orange light">正常</view> -->
								<view v-if="item.want.want_status == 1" class="cu-tag round bg-olive light">{{item.want.want_status1}}</view>
								<view  v-if="item.want.want_status == 0" class="cu-tag round bg-red light">{{item.want.want_status1}}</view>
								<view class="cu-tag round bg-blue light">{{item.want.created_at}}</view>
							</view>
						</navigator>
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
									<text class='cuIcon-title text-blue'></text>求购状态
								</view>
							</view>
							<view class="padding bg-white" style="display: flex;justify-content: space-between;">
								<view class='cu-tag radius' :class="want.wantstatus===1?'bg-orange':''" @click="changeType(1)">正常</view>
								<view class='cu-tag radius' :class="want.wantstatus===0?'bg-red':''" @click="changeType(0)">废弃</view>
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
												<view class="uni-input">{{startDate}}</view>
											</picker>
										</view>
									</view>
									<view class="uni-list-cell" style="margin-top: 30upx;">
										<view class="uni-list-cell-left">
											结束日期
										</view>
										<view class="uni-list-cell-db">
											<picker mode="date" :value="endDate" @change="bindEndDateChange">
												<view class="uni-input">{{endDate}}</view>
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
				menuArrow: true,
				empty: false, //空白页现实  true|false
				cartList: [],
				modalName: null,
				startDate: "请选择开始日期",
				endDate: "请选择结束日期",
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
					wantstatus: 1,
					updatetime: "",
					rolename: "",
					startTime: "",
					endTime: ""
				},
				ifOnShow: false,
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
					if((res.data.rolename.indexOf('admin') > -1) || res.data.rolename.indexOf('md_leader') > -1){
						this.want.userid = 0
					}else{
						this.want.userid = res.data.id
					}
					this.loadData();
				},
				fail: () => {
					console.log('登录失效')
					uni.showToast({
						title: "请先登录",
						icon: "none",
						duration: 1500
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: '/pages/public/login'
						})
					}, 1500)			
				}
			})
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			if(this.ifOnShow){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.cartList = []
						this.want.shopid = res.data.shop_id;
						this.want.rolename = res.data.rolename.substring(0, res.data.rolename.length - 1);
						if((res.data.rolename.indexOf('admin') > -1) || res.data.rolename.indexOf('md_leader') > -1){
							this.want.userid = 0
						}else{
							this.want.userid = res.data.id
						}
						this.loadData()
						/* this.loadingType = 'loading'
						getWantList({ ...this.want
						}).then(res => {
							this.cartList = res.data.Data.DataList
							this.cartList.forEach(ele => {
								if (ele.want.want_status === '0') {
									ele.want.want_status1 = "废弃"
								} else if (ele.want.want_status === '1') {
									ele.want.want_status1 = "正常"
								} else {
									ele.want.want_status1 = "已交易"
								}
								if (ele.want.created_at) {
									ele.want.created_at = ele.want.created_at.split('T')[0]
								}
							})
							this.total = res.data.Data.Total;
							if (this.want.pageIndex < this.total / this.want.PageSize) {
								this.loadingType = "more"
							} else {
								this.loadingType = "nomore"
							}
						}) */
					}
				})
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.cartList = []
			this.want.pageIndex = 1
			this.want.wantstatus = 1;
			this.want.bsx = 0;
			this.want.pricemin = "";
			this.want.pricemax = "";
			this.want.startTime = "";
			this.want.endTime = "";
			this.startDate = '请选择开始日期';
			this.endDate = '请选择结束日期'
			this.loadData()
			uni.stopPullDownRefresh();

		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.want.PageSize)
			console.log(this.want.pageIndex, num)
			console.log(this.want.pageIndex >= num)
			if (this.want.pageIndex >= num) {
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
				let cartList = await getWantList({ ...this.want
				})
				// this.cartList = cartList.data.Data.DataList;
				if (this.cartList.length == 0) {
					this.cartList = cartList.data.Data.DataList;
				} else {
					this.cartList = this.cartList.concat(cartList.data.Data.DataList);
				}
				this.total = cartList.data.Data.Total;
				this.cartList.forEach(ele => {
					if (ele.want.want_status === '0') {
						ele.want.want_status1 = "废弃"
					} else if (ele.want.want_status === '1') {
						ele.want.want_status1 = "正常"
					} else {
						ele.want.want_status1 = "已交易"
					}
					if (ele.want.created_at) {
						ele.want.created_at = ele.want.created_at.split('T')[0]
					}
				})
				if (this.want.pageIndex < this.total / this.want.PageSize) {
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
				this.want.pageIndex = 1
				this.cartList = []
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
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 0upx;
		padding-top: 15upx;
		.car-list {
			display: flex;
			flex-wrap: wrap;
			padding: 0upx;
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
	}
	.cu-list.menu>.cu-item.arrow {
	    padding-right: 30px;
	}
	.cu-list.menu>.cu-item.arrow:before {
	  right: 0.5em;
	}
</style>
