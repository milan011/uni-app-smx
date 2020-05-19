<template>
	<view class="container">
		<view class="car-list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 待跟进车源
					</view>
				</view>
				<view class="cu-list menu">
					<view @tap="carFollow(item)" v-for="(item, index) in cartList" :key="index" class="cu-item" :class="menuArrow?'arrow':''">
					<text class="text-grey">{{ item.FullName }}</text>
					<view class="action">
						<view class="cu-tag round bg-blue light">最近跟进:{{item.UpdateDate.substring(0,item.CreateDate.indexOf("T"))}}</view>
					</view>
					</view>
				</view>
				<uni-load-more :status="loadingType"></uni-load-more>
			</scroll-view>
		</view>
		<!-- 跟进modal Begin -->
		<view class="cu-modal" style="z-index: 10;" :class="modalName=='ModalFollow'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">车源跟进</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top">
						<textarea v-model="quickFollow.content" maxlength="-1" @input="textareaAInput" placeholder="跟进内容"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="followSend">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 跟进modal End -->
	</view>
</template>

<script>
	import { getCarList, carFollow } from '@/api/carManage.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				index: 0,
				loadingType: 'more', //参数loading加载,nomore
				cartList: [],
				menuArrow: false,
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
				quickFollow:{
					id: null,
					content: '',
					type: 1,
					username: '',
				},
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
					updatetime: "车源",
					Car_Status: '1',
					IsPutOn: -1,
					Shop_Id: ""
				},
				total: ""
			};
		},
		onLoad(options) {
			console.log('onload')
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.car.RoleName = res.data.rolename.split(',')[0]
					this.car.Shop_Id = res.data.shop_id
					this.car.CreateID = res.data.id
					this.loadData();
				},
				fail: () => {
					uni.showToast({
						title: "请先登录",
						icon: "none",
						duration: 1500
					})
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
				this.loadingType = 'loading'
				getCarList({ ...this.car
				}).then(res => {
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
				})
			},
			textareaAInput(e) {
				this.quickFollow.content = e.detail.value
			},
			carFollow(car){
				// console.log(want)
				this.quickFollow.id = car.ID
				this.quickFollow.username = car.CreateName
				this.quickFollow.content = ''
				// console.log(this.wantFollowData)
				this.modalName = 'ModalFollow'
			},
			followSend(){
				// console.log(this.wantFollowData)
				// return false
				if(!this.quickFollow.content){
					this.$api.msg(`请填写跟进信息`, 2000)
				}else{
					carFollow(this.quickFollow).then(res => {
						// this.getFollow();
						this.hideModal()
						uni.showToast({
							title: "跟进成功成功",
							icon: "none",
							duration: 1500
						})
						this.cartList = []
						this.loadData()
					})
				}
			},
			//添加车源
			/* createCar() {
				uni.navigateTo({
					url: '/pages/car/customer'
				})
				this.$api.msg('跳转下一页 sendData');
			}, */
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
				if (e.detail.value === 1 || e.detail.value == 2) {
					this.car.Car_Status = e.detail.value - 1
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
			onBackPress(event){
				uni.reLaunch({
					url: '/pages/user/user'
				});
				return true
			},
			//创建订单
			/* createCar() {
				uni.navigateTo({
					// url: '/pages/car/customer'
					url: '/pages/car/carCreate'
				})
				this.$api.msg('跳转下一页 sendData');
			} */
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

	.cu-modal {
		z-index: 1 !important;
	}

	.cu-form-group {
		min-height: 48px;
	}
</style>
