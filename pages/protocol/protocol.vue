<template>
	<view class="protocol-main">
		<scroll-view scroll-y="true" class="page">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-orange"></text> 我的合同
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="RadioModal">搜索</button>
				</view>
			</view>
			<view class="cu-list menu">
				<view v-for="(item, index) in list" :key="index" class="cu-item" @tap="toDetail(item)">
					<view class="content">
						<text class="text-grey">{{ item.carmodel }}</text>
					</view>
					<view class="action">
						<view class="cu-tag round bg-olive light">{{item.code}}</view>
						<view class="cu-tag round bg-blue light">{{item.b_name}}</view>
						<view class="cu-tag round bg-blue light">{{item.p_name}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-form-group">
						<view class="title">合同编号</view>
						<input placeholder="请输入合同编号" style="text-align: right; padding-right: 40upx;" v-model="contract.code" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">车辆类型</view>
						<picker @change="PickerChange" :value="index" :range="carType">
							<view class="picker">
								{{carType[contract.carmodel]}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group">
						<view class="title">最低价格</view>
						<input placeholder="请输入最低价格" style="text-align: right; padding-right: 40upx;" v-model="contract.minsale" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">最高价格</view>
						<input placeholder="请输入最高价格" style="text-align: right; padding-right: 40upx;" v-model="contract.maxsale" name="input"></input>
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
						<view class="title">客户姓名</view>
						<input placeholder="请输入客户姓名" style="text-align: right; padding-right: 40upx;" v-model="contract.username" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">客户电话</view>
						<input placeholder="请输入客户电话" style="text-align: right; padding-right: 40upx;" v-model="contract.telephone" name="input"></input>
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
		getContractList
	} from "@/api/contract.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		comments: {
			uniLoadMore
		},
		data() {
			return {
				carType: ['不限', '轿车', 'SUV', '面包车', '客车', '货车', 'MPV'],
				ifOnShow: false,
				contract: {
					pageindex: 1,
					pagesize: 14,
					code: '',
					carmodel: 0,
					maxsale: "",
					minsale: "",
					starttime: "",
					endtime: "",
					username: "",
					telephone: "",
					rolename: "",
					shopid: "",
					userid: ""
				},
				loadingType: 'more', //参数loading加载,nomore
				list: [],
				total: '',
				modalName: null,
				index: 0,
				startdate: '请选择开始时间',
				endData: "请选择结束时间"
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.list = []
			this.contract.pageindex = 1
			this.contract.code = ''
			this.contract.maxsale = ''
			this.contract.minsale = ''
			this.contract.starttime = ''
			this.contract.endtime = ''
			this.contract.username = ''
			this.contract.telephone = ''
			this.contract.carmodel = 0
			this.startdate = '请选择开始时间'
			this.endData = '请选择结束时间'
			this.init()
			uni.stopPullDownRefresh();
		},
		// 上滑加载
		onLoad(options) {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.contract.rolename = res.data.rolename
					this.contract.shopid = res.data.shop_id
					this.contract.userid = res.data.id
					this.init();
				}
			})

		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			if(this.ifOnShow){
				this.list = []
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.contract.rolename = res.data.rolename
						this.contract.shopid = res.data.shop_id
						this.contract.userid = res.data.id
						getContractList({
							...this.contract
						}).then(res => {
							console.log('获取列表show')
							this.list = res.data.Data.DataList
						})
					}
				})
			}
		},
		onReachBottom() {
			let num = Math.ceil(this.total / this.contract.pagesize)
			if (this.contract.pageindex == num || this.contract.pageindex > num) {
				return
			} else {
				this.contract.pageindex++
				console.log(this.contract.pageindex)
				this.init();
			}
		},
		methods: {
			init() {
				console.log('获取列表')
				this.loadingType = 'loading'
				getContractList({
					...this.contract
				}).then(res => {
					if (this.list.length == 0) {
						this.list = res.data.Data.DataList
						console.log(this.list)
					} else {
						this.list = this.list.concat(res.data.Data.DataList);
						console.log(this.list)
					}
					this.total = res.data.Data.Total
					if (this.contract.pageindex < this.total / this.contract.pagesize) {
						this.loadingType = "more"
					} else {
						this.loadingType = "nomore"
					}
				})
			},
			toDetail(item) {
				uni.setStorage({
					key: 'contractDetail',
					data: item,
					success: () => {
						uni.navigateTo({
							url: './detail/detail'
						});
					},
					fail: () => {
						console.log("出现了一些错误")
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			PickerChange(e) {
				this.contract.carmodel = e.detail.value
			},
			startDateChange(e) {
				this.startdate = e.detail.value
				this.contract.starttime = e.detail.value
			},
			endDateChange(e) {
				this.endData = e.detail.value
				this.contract.endtime = e.detail.value
			},
			doSeach() {
				this.contract.pageindex = 1
				this.list = []
				this.init();
				this.hideModal();
			},
		}
	}
</script>

<style lang="scss">
	.uni-input-input {
		text-align: right !important;
	}
	.protocol-main {
		.cu-modal {
			z-index: 1 !important;
		}
		.card {
			border-bottom: 4upx solid #CCCCCC;

			.card-c {
				position: relative;
				width: 90%;
				height: 220upx;
				margin: 0 auto;
				padding-left: 20upx;

				.number {
					padding: 10upx 0 0;
					font-size: 30upx;
				}

				.title {
					font-size: 34upx;
					font-weight: 700;
				}

				.box {
					display: flex;
					justify-content: space-between;
					position: absolute;
					left: 0;
					bottom: 20upx;
					width: 100%;
					padding-left: 20upx;
					color: #AAAAAA;
					font-size: 28upx;
				}
			}
		}
	}
</style>
