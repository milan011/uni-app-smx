<template>
	<view class="container">
		<!-- 基本情况Begin -->
		<view class="history-section icon">
			<list-cell id="mystyle" icon="icon-tuijian" iconColor="#e07472" title="名称" :tips="detail.cars.FullName"></list-cell>
			<list-cell icon="icon-tuijian" iconColor="#e07472" title="售价(万)" :tips="String(detail.cars.SaleAMT)"></list-cell>
			<list-cell icon="icon-share" iconColor="#9789f7" title="状态">
				<view v-if="detail.cars.Car_Status == 0" class="cu-tag round bg-red light">{{carStatusConfig[detail.cars.Car_Status].name}}</view>
				<view v-if="detail.cars.Car_Status == 1" class="cu-tag round bg-green light">{{carStatusConfig[detail.cars.Car_Status].name}}</view>
				<view v-if="detail.cars.Car_Status ==1 && detail.cars.IsPutOn" class="cu-tag round bg-green light">已上架</view>
				<view v-if="detail.cars.Car_Status ==1 && !detail.cars.IsPutOn" class="cu-tag round bg-red light">未上架</view>
			</list-cell>
			<list-cell v-if="detail.cars.CreateDate" icon="icon-pinglun-copy" iconColor="#ee883b" title="负责人" :tips="detail.cars.CreateName +'|' + detail.cars.CreateDate.split('T')[0]"></list-cell>
			<!-- <list-cell v-if="detail.cars.CreateDate" icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="上传" :tips="detail.cars.CreateDate.split('T')[0]"></list-cell> -->
		</view>
		<!-- 基本情况End -->
		<!-- 求购搜索 Begin -->
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-orange"></text> 推荐求购
			</view>
			<view class="action">
				<button class="cu-btn bg-blue shadow" @tap="showModal" data-target="RadioModal">搜索</button>
			</view>
		</view>
		<!-- 求购搜索 End -->
		<!-- 求购列表 Begain -->
		<view class="cu-list menu-avatar">
			<view 
			class="cu-item" 
			:class="modalName=='move-box-'+ index?'move-cur':''" 
			v-for="(item,index) in wantList" :key="index"
			@touchstart="ListTouchStart" 
			@touchmove="ListTouchMove" 
			@touchend="ListTouchEnd" 
			:data-target="'move-box-' + index">
				<!-- <view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view> -->
				<view class="content">
					<view class="text-grey">
						{{item.customer.name}} | {{item.want.carcate}}
					</view>
					<!-- <view class="text-gray text-sm">
									<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view> -->
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{item.want.creater_name}}</view>
					<!-- <view class="cu-tag round bg-grey sm">5</view> -->
				</view>
				<view class="move">
					<view class="bg-green" :data-wantid="item.want.id" @tap="transLaunch">发起交易</view>
					<!-- <view class="bg-red">查看</view> -->
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<!-- 求购列表 End -->
		<!-- 交易modal Begin -->
		<view class="cu-modal" style="z-index: 10;" :class="modalName=='transModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">交易信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group nu-style">
						<view class="title">成交价(万)</view>
						<input style="text-align: right;" type="number" v-model="transFormData.SaledPrice" placeholder="请输入成交价" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group nu-style">
						<view class="title">销售佣金</view>
						<input style="text-align: right;" type="number" v-model="transFormData.SaleCommission" placeholder="请输入销售佣金" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group nu-style">
						<view class="title">整备费用</view>
						<input style="text-align: right;" type="number" v-model="transFormData.RepairCost" placeholder="请输入整备费用" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group">
						<view class="title">是否贷款</view>
						<switch class='orange radius' @change="SwitchD" :class="transFormData.IsLoan=='1'?'checked':''" :checked="transFormData.IsLoan=='1'?true:false"></switch>
					</view>
					<view v-show="transFormData.IsLoan==1" class="cu-form-group nu-style">
						<view class="title">贷款金额(万)</view>
						<input style="text-align: right;" type="number" v-model="transFormData.LoanMoney" placeholder="请输入贷款金额" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view v-show="transFormData.IsLoan==1" class="cu-form-group nu-style">
						<view class="title">贷款佣金</view>
						<input style="text-align: right;" type="number" v-model="transFormData.LoanCommission" placeholder="请输入贷款佣金" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group nu-style">
						<view class="title">其他收入</view>
						<input style="text-align: right;" type="number" v-model="transFormData.OtherCommission" placeholder="请输入其他收入" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="transDataSend">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 交易modal End -->
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		carStatusConfig,
		putOnStatusConfig
	} from '@/common/appConfig.js';
	import listCell from '@/components/mix-list-cell';
	import {
		getCarDetail,
		getCarFollow,
		abandOrActiv,
		carFollow,
		carPutOn,
		carAssess
	} from '@/api/carManage.js'
	import { getWantList } from "@/api/want.js" 
	import { transactionCreate } from "@/api/transaction.js" 
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
			uniLoadMore
		},
		filters: {
			statusFilter(status) {
				const statusMap = {
					1: 'bg-green',
					0: 'bg-red'
				}
				return statusMap[status]
			},
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				modalName: null,
				carId: null,
				startDate: "",
				endDate: "",
				wantList: [],
				want: {
					PageSize: 8,
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
				total: "",
				loadingType: 'more', //参数loading加载,nomore
				// loadingType: 'loading', //加载更多状态
				detail: {
					cars: {
						SaleAMT: '',
					},
					shop: {},
					user: null,
					customer: {},
					carimages: []
				},
				transFormData: {
					CarId: "",/// 车源ID
					BuyId: "",/// 采购信息Id
					IsLoan: "0",
					LoanMoney: "",
					SaledPrice: "",// 成交价
					SaleCommission: "",//销售佣金
					LoanCommission: "",// 贷款佣金
					OtherCommission: "",
					RepairCost: "",/// 整备费用
					Shop_Id: 0,
					Create_Id: 0,// 创建者Id（发起交易人Id）
					Status: 1 /// 0:不同意交易，1：同意交易
				},	
				carStatusConfig: [],
				putOnStatusConfig: {},
			}
		},
		onShow(){
			this.modalName = null
		},
		onLoad(options) {
			/* console.log(options)
			console.log('user', uni.getStorageSync('userInfo'))
			let user = uni.getStorageSync('userInfo')
			this.carId = options.carId
			this.carStatusConfig = carStatusConfig
			this.putOnStatusConfig = putOnStatusConfig
			console.log('status_config', carStatusConfig) */
			this.transFormData.CarId = options.carId
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.want.shopid = res.data.shop_id;
					this.want.rolename = res.data.rolename.substring(0, res.data.rolename.length - 1);
					this.want.userid = res.data.id;
					this.carId = options.carId
					this.carStatusConfig = carStatusConfig
					this.putOnStatusConfig = putOnStatusConfig
					this.transFormData.Create_Id = res.data.id
					this.loadWantList();
					this.getCarDetailById()
				}
			})
			
			// this.getCarDetailById()
			// this.getCarFollowById()
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			getCarDetailById() { //获取车源详情
				getCarDetail(this.carId).then(res => {
					console.log('carDetail', res.data)
					this.detail = res.data.Data
					this.transFormData.Shop_Id = res.data.Data.cars.Shop_Id
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取车源数据失败,请刷新重试`);
				})
			},
			getCarFollowById() { //获取跟踪信息
				getCarFollow(this.carId).then(res => {
					console.log('carfollow', res.data)
					this.followInfo = res.data.Data[0]
					// this.loadingType = 'loading'
				}).catch(err => {
					// console.log(err)
					this.$api.msg(`获取跟踪数据失败,请刷新重试`);
				})
			},
			//请求求购数据
			async loadWantList() {
				this.loadingType = "loading"
				let wantList = await getWantList({ ...this.want
				})
				// this.wantList = wantList.data.Data.DataList;
				if (this.wantList.length == 0) {
					this.wantList = wantList.data.Data.DataList;
				} else {
					this.wantList = this.wantList.concat(wantList.data.Data.DataList);
				}
				console.log('求购列表',this.wantList)
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
			//加载更多
			onReachBottom() {
				let num = Math.ceil(this.total / this.want.PageSize)
				console.log(this.want.pageIndex , num)
				console.log(this.want.pageIndex >= num)
				if (this.want.pageIndex >= num) {
					return
				} else {
					this.want.pageIndex++
					console.log(this.want.pageIndex)
					this.loadWantList();
				}
			},
			transLaunch(e){	
				this.transFormData.BuyId = e.currentTarget.dataset.wantid
				console.log('wantId',e.currentTarget.dataset.wantid)
				console.log('trans',this.transFormData)
				this.modalName = 'transModal'
			},
			transDataSend(){
				console.log('trans',this.transFormData)
				if(!this.transFormData.SaledPrice){
					this.$api.msg('请输入金额')
				}else{
					transactionCreate(this.transFormData).then(res=>{
						console.log(res.data)
						if(res.data.ResultType == 0){
							this.$api.msg(`交易完成`,1000);
							setTimeout(()=>{
								uni.navigateTo({
									url: '/pages/myTransaction/transaction'
								})
							}, 1100)
						}
					})
				}
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			SwitchD(e) {
				this.transFormData.IsLoan = e.detail.value
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},
			toTrackHistory() {
				uni.navigateTo({
					url: '/pages/car/carDetail?id=' + this.carId + '&nav=2'
				})
			},
			textareaAInput(e) {
				this.quickFollow.content = e.detail.value
			},
			textareaBInput(e) {
				this.assessInfo.Pg_description = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style>
	#mystyle /deep/ .cell-tip {
		width: 18em;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left: 10px;
	}
	.cu-list.menu-avatar>.cu-item{
		height: 50px;
	}
</style>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.container {
		padding-top: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		/* padding: 30upx 0 0; */
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>
