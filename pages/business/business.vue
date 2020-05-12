<template>
	<view class="content b-t">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 商机管理
					</view>
					<view class="action">
						<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">搜索</button>
					</view>
					<view class="action">
						<button class="cu-btn bg-blue shadow" @tap="addBusiness" data-target="menuModal">添加商机</button>
					</view>
				</view>
				<view class="cu-list menu">
					<view v-for="(item, index) in businessList" :key="index" class="cu-item">
						<view class="content" hover-class="none" @click="toInfo(item)">
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.category_name }}</text>
						</view>
						<view class="action">
							<!-- <view class="cu-tag round bg-orange light">正常</view> -->
							<view class="cu-tag round bg-olive light">{{item.name}}</view>
							<view class="cu-tag round bg-blue light">{{item.mobile}}</view>
							<view class="cu-tag round bg-green light">{{item.status==1?'未分发':'已分发'}}</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</scroll-view>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group">
						<view class="title">手机号</view>
						<input placeholder="请输入手机号" v-model="business.mobile" style="text-align: right; padding-right: 40upx;" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">车型</view>
						<input placeholder="请输入车型" v-model="business.categoryname" style="text-align: right; padding-right: 40upx;" name="input"></input>
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
						<view class="title">商机类型</view>
						<picker @change="changeType" :value="typeIndex" :range="businessType">
							<view class="picker">
								{{business.enrooltype?businessType[typeIndex]:"不限"}}
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
					<view class="cu-form-group">
						<view class="title">状态</view>
						<view>
							<radio class='blue margin-left-sm' :class="radio=='2'?'checked':''" :checked="radio=='2'?true:false" value="2">已分发</radio>
							<radio class='blue margin-left-sm' :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1">未分发</radio>
						</view>
					</view>
				</radio-group>
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
		getBusinessList
	} from '@/api/business.js'
	import {
		getShopList
	} from '@/api/business.js'
	export default {
		data() {
			return {
				businessList: [],
				loadingType: 'more',
				business: {
					pageindex: 1,
					pagesize: 16,
					mobile: "",
					categoryname: "",
					enrooltype: "",
					shopid: "",
					starttime: "",
					endtime: "",
					rolename: "",
					status: 1
				},
				total: "",
				startdate: "请选择开始时间",
				endData: "请选择结束时间",
				modalName: null,
				businessType: ['买车', '卖车', '贷款', '保险', '评估', '加盟'],
				typeIndex: 0,
				shopList: [{
					name: ""
				}],
				shopIndex: 0,
				radio: '',
			}
		},
		onLoad(option) {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.business.shopid = res.data.shop_id
					this.business.rolename = res.data.rolename.split(",")[0]
					this.init()
					this.getshop()
				}
			})
		},
		onShow() {
			this.businessList = []
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.business.shopid = res.data.shop_id
					this.business.rolename = res.data.rolename.split(",")[0]
					this.init()
					this.getshop()
				}
			})
		},
		onPullDownRefresh() {
			this.businessList = []
			this.business.pageindex = 1
			this.business.mobile = ""
			this.business.categoryname = ''
			this.business.enrooltype = ''
			this.business.starttime = ''
			this.business.endtime = ''
			this.business.status = 1
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.business.shopid = res.data.shop_id
				}
			})
			this.init()
			uni.stopPullDownRefresh();
		},
		//加载更多
		onReachBottom() {
			let num = Math.ceil(this.total / this.business.pagesize)
			if (this.business.pageindex < num) {
				this.business.pageindex++
				this.init();
			} else {
				return
			}
		},
		methods: {
			init() {
				this.loadingType = 'loading'
				getBusinessList(this.business).then(res => {
					if (this.businessList.length == 0) {
						this.businessList = res.data.Data.DataList;
					} else {
						this.businessList = this.businessList.concat(res.data.Data.DataList);
					}
					this.total = res.data.Data.Total
					if (this.business.pageindex < this.total / this.business.pagesize) {
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
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal() {
				this.modalName = null
			},
			addBusiness() {
				uni.navigateTo({
					url: './add/add'
				})
			},
			// 开始时间
			startDateChange(e) {
				this.startdate = e.detail.value
				this.business.starttime = e.detail.value
			},
			// 结束时间
			endDateChange(e) {
				this.endData = e.detail.value
				this.business.endtime = e.detail.value
			},
			// 类型选择		
			changeType(e) {
				this.business.enrooltype = e.detail.value + 1
				this.typeIndex = e.detail.value
			},
			// 获取门店信息
			getshop() {
				let id = ''
				uni.getStorage({
					key: "userInfo",
					success: (res) => {
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
					this.business.shopid = this.shopList[this.shopIndex].id
				}
			},
			RadioChange(e) {
				this.radio = e.detail.value
				this.business.status = e.detail.value
			},

			doSeach() {
				this.businessList = []
				this.business.pageindex = 1
				this.init()
				this.hideModal()
				// console.log(this.business)
			},
			toInfo(item) {
				uni.setStorage({
					key: 'businessInfo',
					data: item,
					success: () => {
						uni.navigateTo({
							url: './edit/edit?id=' + item.id
						})
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.text-grey {
		display: inline-block;
		width: 220upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cu-modal {
		z-index: 1 !important;
	}

	uni-radio .uni-radio-input {
		margin: 0 10upx;
		width: 32upx !important;
		height: 32upx !important;
	}
</style>
