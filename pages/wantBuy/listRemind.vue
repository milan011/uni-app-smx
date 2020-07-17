<template>
	<view class="container">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 待跟进求购
					</view>
				</view>
				<view class="cu-list menu">
					<view @tap="wantFollow(item.want)" v-for="(item, index) in wantList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
						<!-- <navigator class="content" hover-class="none" :url="'./show/show?carId='+item.want.id" open-type="navigate"> -->
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.want.carcate }}</text>
						<!-- </navigator> -->
						<!-- <navigator hover-class="none" :url="'./show/show?carId='+item.want.id" open-type="navigate"> -->
							<view class="action">
								<!-- <view class="cu-tag round bg-orange light">正常</view> -->
								<!-- <view class="cu-tag round bg-olive light">{{item.want.want_status1}}</view> -->
								<view class="cu-tag round bg-blue light">最近跟进:{{item.want.updated_at.split('T')[0]}}</view>
							</view>
						<!-- </navigator> -->
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</scroll-view>
		</view>
		<!-- 跟进modal Begin -->
		<view class="cu-modal" style="z-index: 100;" :class="modalName=='ModalFollow'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">求购跟进</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top">
						<textarea maxlength="-1" v-if="modalName=='ModalFollow'" v-model="wantFollowData.description" @input="textareaAInput" placeholder="跟进内容"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="doFollow">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 跟进modal End -->
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
	import { getWantList,wantFollow } from "@/api/want.js"
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
				wantList: [],
				modalName: null,
				ifOnShow: false,
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
					updatetime: "求购",
					rolename: "",
					startTime: "",
					endTime: ""
				},
				wantFollowData: {
					want_id: null,
					follow_type: 1,
					user_name: '',
					user_id: '',
					description: ''
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
					this.loadData();
				}
			})
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			// this.want.pageIndex = 1
			if(this.ifOnShow){
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.wantList = []
						this.want.shopid = res.data.shop_id;
						this.want.rolename = res.data.rolename.substring(0, res.data.rolename.length - 1);
						this.want.userid = res.data.id;
						this.loadingType = 'loading'
						getWantList({ ...this.want
						}).then(res => {
							this.wantList = res.data.Data.DataList
							this.wantList.forEach(ele => {
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
						})
					}
				})
			}	
		},
		//下拉刷新
		onPullDownRefresh() {
			this.wantList = []
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
			wantList(e) {
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
				let wantList = await getWantList({ ...this.want
				})
				// this.wantList = wantList.data.Data.DataList;
				if (this.wantList.length == 0) {
					this.wantList = wantList.data.Data.DataList;
				} else {
					this.wantList = this.wantList.concat(wantList.data.Data.DataList);
				}
				this.total = wantList.data.Data.Total;
				this.wantList.forEach(ele => {
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
			textareaAInput(e) {
				this.wantFollowData.description = e.detail.value
			},
			wantFollow(want){
				// console.log(want)
				this.wantFollowData.want_id = want.id
				this.wantFollowData.user_name = want.creater_name
				this.wantFollowData.user_id = want.creater_id
				this.wantFollowData.description = ''
				// console.log(this.wantFollowData)
				this.modalName = 'ModalFollow'
			},
			doFollow(){
				// console.log(this.wantFollowData)
				// return false
				if(!this.wantFollowData.description){
					this.$api.msg(`请填写跟进信息`, 2000)
				}else{
					wantFollow(this.wantFollowData).then(res => {
						// this.getFollow();
						this.hideModal()
						uni.showToast({
							title: "跟进成功成功",
							icon: "none",
							duration: 1500
						})
						this.wantList = []
						this.loadData()
					})
				}
			},
			doSeach() {
				this.want.pageIndex = 1
				this.wantList = []
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
</style>
