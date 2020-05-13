<template>
	<view class="car-list">
		<scroll-view scroll-y="true" class="page">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 我的交易
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">搜索</button>
				</view>
			</view>
			<view class="cu-list menu">
				<view v-for="(item, index) in list" :key="index" class="cu-item">
					<view class="content" @click="toDetail(item)">
						<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
						<text class="text-grey">{{ item.FullName }}</text>
					</view>
					<view class="action">
						<!-- <view class="cu-tag round bg-orange light">正常</view> -->
						<!-- <view class="cu-tag round  bg-blue light">{{item.shopname}}</view> -->
						<view class="cu-tag round   bg-blue light">{{item.SaledPrice}}万元</view>
						<view class="cu-tag round bg-orange light">{{item.Status==1?'已确认':'未确认'}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-form-group">
					<view class="title">车辆编号</view>
					<input placeholder="请输入车辆编号" v-model="transaction.Code" style="text-align: right; padding-right: 40upx;" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">最低价格</view>
					<input placeholder="请输入最低价格" v-model="transaction.SaleAMTMin" style="text-align: right; padding-right: 40upx;" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">最高价格</view>
					<input placeholder="请输入最高价格" v-model="transaction.SaleAMTMax" style="text-align: right; padding-right: 40upx;" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">开始时间</view>
					<picker mode="date" :value="startdate" @change="startDateChange">
						<view class="picker">
							{{startdate}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">结束时间</view>
					<picker mode="date" :value="endData" @change="endDateChange">
						<view class="picker">
							{{endData}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">门店</view>
					<picker @change="changeShop" :value="shopIndex" range-key="name" :range="shopList">
						<view class="picker">
							{{shopList[shopIndex].name}}
						</view>
					</picker>
				</view>
				<view class="padding flex flex-direction">
					<view class="cu-btn bg-blue lg" @tap="doSeach">确定</view>
					<view class="cu-btn bg-grey margin-tb-sm lg" @tap="hideModal">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTransactionList
	} from '@/api/transaction.js'
	import {
		getShopList
	} from '@/api/business.js'
	export default {
		data() {
			return {
				list: [],
				transaction: {
					CreateID: '',
					PageIndex: 1,
					PageSize: 14,
					Code: "",
					Shop_Id: '',
					CarType: '',
					SaleAMTMin: '',
					SaleAMTMax: '',
					StarTime: "",
					EndTime: '',
					RoleName: '',
					Status: ''
				},
				loadingType: 'more',
				total: '',
				modalName:'',
				startdate:'请选择开始时间',
				endData:'请选择结束时间',
				shopList: [{
					name: ""
				}],
				shopIndex: 0,
			}
		},
		onLoad(options) {
			console.log('123456')
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.transaction.CreateID = res.data.id
					this.transaction.RoleName = res.data.rolename.split(',')[0]
					this.transaction.Shop_Id = res.data.shop_id
					this.init()
					this.getshop()
				}
			})
		},
		onBackPress(event){
			uni.switchTab({
				url: '/pages/user/user'
			});
			return true
		},
		onShow() {
			this.list = []
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.transaction.CreateID = res.data.id
					this.transaction.RoleName = res.data.rolename.split(',')[0]
					this.transaction.Shop_Id = res.data.shop_id
					getTransactionList({ ...this.transaction
					}).then(res=>{
						this.list = res.data.Data.DataList;
					})
					this.getshop()
				}
			})
		},
		onPullDownRefresh() {
			this.transaction.PageIndex = 1
			this.transaction.Code = ''
			this.transaction.SaleAMTMin = ''
			this.transaction.SaleAMTMax = ''
			this.transaction.StarTime = ''
			this.transaction.EndTime = ''
			this.startdate = '请选择开始时间'
			this.endData = '请选择结束时间'
			this.shopIndex = 0
			this.list = []
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.transaction.Shop_Id = res.data.shop_id
				}
			})
			this.init()
			uni.stopPullDownRefresh();
		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.transaction.PageSize)
			if (this.transaction.PageIndex < num) {
				this.transaction.PageIndex++
				this.init();
			} else {
				return
			}
		},
		methods: {
			// 初始化
			init() {
				this.loadingType = 'loading'
				getTransactionList({ ...this.transaction
				}).then(res => {
					if (this.list.length == 0) {
						this.list = res.data.Data.DataList;
					} else {
						this.list = this.list.concat(res.data.Data.DataList);
					}
					// this.list = res.data.Data.DataList
					this.total = res.data.Data.Total
					if (this.transaction.PageIndex < this.total / this.transaction.PageSize) {
						this.loadingType = "more"
					} else {
						this.loadingType = "nomore"
					}
				}).catch(()=>{
					uni.showToast({
						title:'登录超时',
						icon:'none'
					})
				})
			},
			// 打开搜索弹窗
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 关闭弹窗
			hideModal(){
				this.modalName = ''
			},
			// 开始时间
			startDateChange(e) {
				this.startdate = e.detail.value
				this.transaction.StarTime = e.detail.value
			},
			// 结束时间
			endDateChange(e) {
				this.endData = e.detail.value
				this.transaction.EndTime = e.detail.value
			},
			// 获取门店信息
			getshop() {
				let id = ''
				uni.getStorage({
					key: "userInfo",
					success: (res) => {
						id = res.data.shop_id
						getShopList({
							id:res.data.shop_id
						}).then(res => {
							this.shopList = res.data.Data
							this.shopList.unshift({
								name: "全部"
							})
						})
					}
				})
				
			},
			changeShop(e) {
				this.shopIndex = e.detail.value
				if (this.shopIndex > 0) {
					this.transaction.Shop_Id = this.shopList[this.shopIndex].id
				}
			},
			doSeach(){
				this.list = []
				this.transaction.PageIndex = 1
				this.init()
				this.hideModal()
			},
			// 去详情页
			toDetail(item) {
				uni.navigateTo({
					url: './deltail/deltail?Status=' + item.Status + '&id='+item.Id
				});
			}
		}
	}
</script>

<style lang="scss">
	.text-grey {
		display: inline-block;
		width: 260upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cu-modal {
		z-index: 1 !important;
	}
	.bg-blue.light{
		width: auto;
		text-align: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
