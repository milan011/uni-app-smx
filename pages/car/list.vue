<template>
	<view class="container">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 我的车源
					</view>
					<view class="action">
						<button style="margin-right:5rpx" class="cu-btn bg-blue shadow" @tap="showModal" data-target="RadioModal">搜索</button>
						<button class="cu-btn bg-green shadow" @tap="createCar" data-target="menuModal">添加</button>
					</view>
				</view>
				<!-- 车源列表 Begain -->
				<view class="cu-list menu">
					<view v-for="(item, index) in cartList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
						<navigator class="content" hover-class="none" :url="'./show?carId='+item.ID" open-type="navigate">
							<!-- <text class="cuIcon-discoverfill text-orange"></text> -->
							<text class="text-grey">{{ item.FullName }}</text>
						</navigator>
						<view class="action">
							<!-- <view class="cu-tag round bg-orange light" v-if="!item.IsPutOn">{{item.IsPutOn?'':'未上架'}}</view> -->
							<view  class="cu-tag round bg-olive light">
								{{carSt}}
								<text style="color:#ff7637" v-if="!item.IsPutOn">[{{item.IsPutOn?'':'未上架'}}]</text>
							</view>
							<view class="cu-tag round bg-blue light">{{item.CreateDate.substring(0,item.CreateDate.indexOf("T"))}}</view>
						</view>
					</view>
				</view>
				<!-- 车源列表 End -->
				<uni-load-more :contentText="loadContentText" :status="loadingType"></uni-load-more>
			</scroll-view>
			<!-- 筛选Mode Begain -->
			<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-form-group">
							<view class="title">车源编号</view>
							<input placeholder="请输入车源编号" v-model="car.Code" style="text-align: right; padding-right: 40upx;" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">最低价格</view>
							<input placeholder="请输入最低价格" v-model="car.SaleAMTMin" style="text-align: right; padding-right: 40upx;" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">最高价格</view>
							<input placeholder="请输入最高价格" v-model="car.SaleAMTMax" style="text-align: right; padding-right: 40upx;" name="input"></input>
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
							<view class="title">车辆类型</view>
							<picker @change="PickerChange" :value="index" :range="carType">
								<view class="picker">
									{{carType[car.CarType]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">车辆状态</view>
							<picker @change="changeCarStaut" :value="index" :range="CarStaut">
								<view class="picker">
									{{CarStaut[CarStautIndex]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">上架状态</view>
							<picker @change="changePutOn" :value="index" :range="putOn">
								<view class="picker">
									{{putOn[putOnIndex]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">变速箱</view>
							<picker @change="changebxs" :value="index" :range="Gearbox">
								<view class="picker">
									{{Gearbox[car.Transmission]}}
								</view>
							</picker>
						</view>
						<view class="padding flex flex-direction">
							<view class="cu-btn bg-blue lg" @tap="doSeach">确定</view>
							<view class="cu-btn bg-grey margin-tb-sm lg" @tap="hideModal">取消</view>
						</view>
					</radio-group>
				</view>
			</view>
			<!-- 筛选Mode End -->
		</view>
	</view>
	</view>
</template>

<script>
	import {
		getCarList
	} from '@/api/carManage.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				index: 0,
				loadingType: 'more', //参数loading加载,nomore
				loadContentText:{ //加载提示
					contentdown: "上拉查看更多车源",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多车源了"
				},
				cartList: [],
				menuArrow: true,
				carSt: "",
				modalName: null,
				startdate: '请选择开始时间',
				endData: '请选择结束时间',
				carType: ['不限', '轿车', 'SUV', '面包车', '客车', '货车', 'MPV'],
				CarStaut: ['不限','废弃', '正常', '已交易'],
				CarStautIndex:0,
				Eval: ['不限', '未评估', '已评估'],
				putOn: ['不限', '未上架', '已上架'],
				putOnIndex:0,
				Gearbox: ['不限', '手动', '自动'],
				ifOnShow: false,
				car: {
					PageIndex: 1,
					PageSize: 14,
					Code: "",
					CreateID: "",
					Code: "",
					IsEval: -1,
					CarType: 0,
					Transmission: 0,
					Factory: "",
					Out_color: "",
					Capacity: "",
					Sale_number: "-1",
					StarTime: "",
					EndTime: "",
					MileageMin: "",
					MileageMax: "",
					SaleAMTMin: "",
					SaleAMTMax: "",
					RoleName: "",
					updatetime: "",
					Car_Status: '1',
					IsPutOn: -1,
					Shop_Id: ""
				},
				total: ""
			};
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			if(this.ifOnShow){
				console.log('onshow')
				this.cartList = []
				this.loadData()
			}
		},
		async onLoad(options) {
			var _this = this
			console.log('onload')
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log('登录用户', res)
					this.car.RoleName = res.data.rolename.split(',')[0]
					this.car.Shop_Id = res.data.shop_id
					this.car.CreateID = res.data.id
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
		onBackPress(event){
			uni.switchTab({
				url: '/pages/user/user'
			});
			return true
		},
		//下拉刷新
		onPullDownRefresh() {
			// var that = this
			// this.$refs.filterDropdown.resetFilterData(2);
			// this.$refs.filterDropdown.resetFilterData(3);
			this.car.Code = ""
			this.car.SaleAMTMin = ""
			this.car.SaleAMTMax = ""
			this.car.StarTime = ''
			this.car.EndTime = ''
			this.car.CarType = 0
			this.car.Transmission = 0
			this.car.Car_Status = '1'
			this.car.IsPutOn = -1
			this.car.PageIndex = 1
			this.CarStautIndex = 0
			this.putOnIndex = 0
			this.startdate = '请选择开始时间'
			this.endData = '请选择结束时间'
			// this.loadData()
			this.cartList = []
			getCarList({...this.car}).then(res=>{
				this.cartList = res.data.Data.DataList
				this.cartList.forEach(ele => {
					if (ele.Car_Status === '0') {
						this.carSt = '废弃'
					} else if (ele.Car_Status === '1') {
						this.carSt = '正常'
					} else {
						this.carSt = '已交易'
					}
				})
				uni.stopPullDownRefresh()
				this.total = res.data.Data.Total;
				if (this.car.PageIndex < this.total / this.car.PageSize) {
					this.loadingType = "more"
					console.log('more')
				} else {
					this.loadingType = "nomore"
					console.log('nomore')
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
		methods: {
			//请求数据
			loadData() {
				console.log('begain')
				this.loadingType = 'loading'
				getCarList({ ...this.car }).then(res => {
					if (this.cartList.length == 0) {
						this.cartList = res.data.Data.DataList;
					} else {
						this.cartList = this.cartList.concat(res.data.Data.DataList);
					}
					this.cartList.forEach(ele => {
						if (ele.Car_Status === '0') {
							this.carSt = '废弃'
						} else if (ele.Car_Status === '1') {
							this.carSt = '正常'
						} else {
							this.carSt = '已交易'
						}
					})
					this.total = res.data.Data.Total;
					if (this.car.PageIndex < this.total / this.car.PageSize) {
						this.loadingType = "more"
						console.log('more')
					} else {
						this.loadingType = "nomore"
						console.log('nomore')
					}
				}).catch(err=>{
					uni.showToast({
						title:'获取车源超时,您可以尝试重新登录系统',
						icon:'none'
					})
					setTimeout(()=>{
						uni.hideToast()
					}, 2000)
				})
			},
			//添加车源
			createCar() {
				uni.navigateTo({
					url: '/pages/car/carCreate'
				})
				// this.$api.msg('跳转下一页 sendData');
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal() {
				this.modalName = null
			},
			startDateChange(e) {
				this.startdate = e.detail.value
				this.car.StarTime = e.detail.value
			},
			endDateChange(e) {
				this.endData = e.detail.value
				this.car.EndTime = e.detail.value
			},
			PickerChange(e) {
				this.car.CarType = e.detail.value
				console.log(e.detail)
			},
			changeCarStaut(e) {
				if (e.detail.value == 1 || e.detail.value == 2) {
					this.car.Car_Status = Number(e.detail.value) - 1
				} else if(e.detail.value == 3){
					this.car.Car_Status = 4
				}
				this.CarStautIndex = e.detail.value
				console.log(this.car.Car_Status)
			},
			changeEval(e) {
				this.car.IsEval = e.detail.value
			},
			changePutOn(e) {
				this.car.IsPutOn = e.detail.value - 1
				this.putOnIndex = e.detail.value
				console.log(this.car.IsPutOn)
			},
			changebxs(e){
				this.car.Transmission = e.detail.value
			},
			doSeach(){
				console.log(this.car)
				this.car.pageIndex = 1
				this.cartList = []
				this.loadData();
				this.hideModal();
			},
		}
	}
</script>

<style lang='scss'>
	.text-grey {
		display: inline-block;
		width: 300upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cu-list.menu>.cu-item.arrow {
	    padding-right: 30px;
	}
	.cu-list.menu>.cu-item.arrow:before {
	  right: 0.5em;
	}
	.cu-modal {
		z-index: 1 !important;
	}

	.cu-form-group {
		min-height: 48px;
	}
</style>
