<template>
	<view class="container">
		<!-- 基本情况Begin -->
		<view class="history-section icon">
			<list-cell id="mystyle" icon="icon-tuijian" iconColor="#e07472" title="名称" :tips="detail.cars.FullName"></list-cell>
			<!-- <list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell> -->
			<list-cell icon="icon-share" iconColor="#9789f7" title="状态">
				<view v-if="detail.cars.Car_Status == 0" class="cu-tag round bg-red light">{{carStatusConfig[detail.cars.Car_Status].name}}</view>
				<view v-if="detail.cars.Car_Status == 1" class="cu-tag round bg-green light">{{carStatusConfig[detail.cars.Car_Status].name}}</view>
				<view v-if="detail.cars.Car_Status ==1 && detail.cars.IsPutOn" class="cu-tag round bg-green light">已上架</view>
				<view v-if="detail.cars.Car_Status ==1 && !detail.cars.IsPutOn" class="cu-tag round bg-red light">未上架</view>
			</list-cell>
			<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="负责人" :tips="detail.cars.CreateName"></list-cell>
			<list-cell v-if="detail.cars.CreateDate" icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="上传" :tips="detail.cars.CreateDate.split('T')[0]"></list-cell>
		</view>
		<!-- 基本情况End -->
		<!-- 操作组Begin -->
		<view class="order-section">
			<view class="order-item" @click="navTo('/pages/car/carDetail?id=' + carId)" hover-class="common-hover"
			 :hover-stay-time="50">
				<text class="yticon icon-shouye"></text>
				<text>查看</text>
			</view>
			<view class="order-item" @click="navTo('/pages/car/carEdit?id=' + carId)" hover-class="common-hover"
			 :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text>编辑</text>
			</view>
			<view class="order-item" @tap="showModal" data-target="ModalScrap" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text v-if="detail.cars.Car_Status == 1">废弃</text>
				<text v-if="detail.cars.Car_Status == 0">激活</text>
			</view> 
		</view>
		<view class="order-section">
			<view v-if="pgShow" class="order-item" @tap="showModal" data-target="ModalAssess" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-yishouhuo"></text>
				<text>评估</text>
			</view>
			<view class="order-item" @tap="showModal" data-target="ModalFollow" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-shouhoutuikuan"></text>
				<text>跟进</text>
			</view>
			<view v-if="!detail.cars.IsPutOn" class="order-item" @tap="showModal" data-target="carPutOn" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-shouhoutuikuan"></text>
				<text>上架</text>
			</view>
			<view class="order-item" @click="navTo('/pages/myTransaction/create?carId=' + carId)" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-shouhoutuikuan"></text>
				<text>交易</text>
			</view>
		</view>
		<!-- 操作组End -->
		<!-- 跟踪信息Begin -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">最新跟踪</text>
				<text @click="toTrackHistory" class="tip">历史跟踪记录</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<view class="right" style="padding:0px">
					<view class="guess-section">
						<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="跟踪人员" :tips="followInfo.user_name"></list-cell>
						<list-cell v-if="followInfo.created_at" icon="icon-pinglun-copy" iconColor="#ee883b" title="跟踪时间" :tips="followInfo.created_at.split('T')[0]">
						</list-cell>
						<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="跟踪操作" :tips="followInfo.description">
						</list-cell>
					</view>
				</view>
			</view>
		</view>
		<!-- 跟踪信息End -->
		<!-- 废弃modal Begin -->
		<view class="cu-modal" :class="modalName=='ModalScrap'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content" v-if="detail.cars.Car_Status == 1">废弃车源</view>
					<view class="content" v-if="detail.cars.Car_Status == 0">激活车源</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="detail.cars.Car_Status == 1" class="padding-xl">
					您确定要废弃该车源吗
				</view>
				<view v-if="detail.cars.Car_Status == 0" class="padding-xl">
					您确定要激活该车源吗
				</view>
				<view v-if="detail.cars.Car_Status == 1" class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="abandActivF">废弃</button>
					</view>
				</view>
				<view v-if="detail.cars.Car_Status == 0" class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="abandActivJ">激活</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 废弃modal End -->
		<!-- 上架modal Begin -->
		<view class="cu-modal" style="z-index: 10;" :class="modalName=='carPutOn'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content" v-if="detail.cars.Car_Status == 1">上架车源</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确定要上架该车源吗
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="carPutOnDel">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 上架modal End -->
		<!-- 评估modal Begin -->
		<view class="cu-modal" style="z-index: 10;" :class="modalName=='ModalAssess'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">评估车源</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group nu-style">
						<view class="title">评估指导价</view>
						<input style="text-align: right;" type="number" v-model="assessInfo.EvalAMT" placeholder="请输入评估指导价" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group margin-top">
						<textarea v-if="modalName=='ModalAssess'" maxlength="-1" v-model="assessInfo.Pg_description" @input="textareaBInput" placeholder="评估师描述"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="accessCarSend">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 评估modal End -->
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
						<textarea v-if="modalName=='ModalFollow'" v-model="quickFollow.content" maxlength="-1" @input="textareaAInput" placeholder="跟进内容"></textarea>
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
		<!-- 获取数据状态提示 Begain -->
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/load.png" mode="aspectFit"></image>
			<view class="gray-text">获取车源...</view>
		</view>
		<!-- 获取数据状态提示 End -->
		<!-- <uni-load-more :status="loadingType"></uni-load-more> -->
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { carStatusConfig, putOnStatusConfig } from '@/common/appConfig.js';
	import listCell from '@/components/mix-list-cell';
	import { 
		getCarDetail, 
		getCarFollow, 
		abandOrActiv, 
		carFollow, 
		carPutOn, 
		carAssess } from '@/api/carManage.js'
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
				pgShow: false,
				modalName:null,
				carId: null,
				userPshop: '',
				loadModal: false,
				carCompleted: false,
				followCompleted: false,
				loadingType: 'loading', //加载更多状态
				detail: {
					cars: {
						CreateDate:''
					},
					shop: {},
					user: null,
					customer: {},
					carimages: []
				},
				assessInfo:{
					ID: null,
					InitPrice: 0,
					EvalAMT: null,
					Pg_description: '',
				},
				quickFollow:{
					id: null,
					content: '',
					type: 1,
					username: '',
				},
				carStatusConfig:[],
				putOnStatusConfig: {},
				followInfo: {
					created_at:""
				}
			}
		},
		onLoad(options) {
			// console.log(options)
			console.log('user', uni.getStorageSync('userInfo'))
			let user = uni.getStorageSync('userInfo')
			/* this.carStatusConfig = this.$api.config('carStatusConfig');
			this.inputStatusConfig = this.$api.config('inputStatusConfig'); */
			// console.log('用户角色列表',user.rolenameArr)
			if(user.rolenameArr.indexOf('hq_appraiser') > -1){
				this.pgShow = true
			}
			this.carId = options.carId
			this.userPshop = user.pshop_id
			this.quickFollow.id = options.carId
			this.assessInfo.ID = options.carId
			this.quickFollow.username = user.nick_name
			// this.carId = '9228'
			this.carStatusConfig = carStatusConfig
			this.putOnStatusConfig = putOnStatusConfig
			console.log('status_config',carStatusConfig)
			this.getCarFollowById()
			this.getCarDetailById()	
			this.loadModalDel()
		},
		onBackPress(){
			console.log('fanhui')
			uni.navigateTo({
				url: '/pages/car/list'
			});
			return true
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
			...mapState(['hasLogin', 'userInfo']),
			listenDateComplete () {
			  const {carCompleted,followCompleted} = this
			  return {carCompleted,followCompleted}
			}
		},
		watch: {
		  listenDateComplete (val) {
		  	console.log('listenChange :', val)
				if (val.carCompleted && val.followCompleted) {
		      this.$set(this,'loadModal',false)
		    }
		  }
		},
		methods: {
			getCarDetailById(){ //获取车源详情
				getCarDetail(this.carId).then(res => {
					console.log('carDetail',res.data)
					this.detail = res.data.Data
					this.assessInfo.InitPrice = res.data.Data.cars.InitPrice
					this.carCompleted = true
					// this.loadingType = 'loading'
				})
			},
			getCarFollowById(){ //获取跟踪信息
				getCarFollow(this.carId).then(res => {
					console.log('carfollow',res.data)
					this.followInfo = res.data.Data[0]
					this.followCompleted = true
					// this.loadingType = 'loading'
				})
			},
			carPutOnDel(){
				var _this = this
				console.log(_this.detail.carimages)
				if(_this.detail.carimages.length < 9){
					_this.modalName = null
					_this.$api.msg(`请完善车源基础图片后再上架`);
				}else{
					carPutOn({carid: _this.detail.cars.ID , putton: 1}).then(res=>{
						console.log(res.data)
						if(res.data.ResultType == 0){
							_this.$api.msg(`车源已上架`);
							_this.modalName = null
							_this.detail.cars.IsPutOn = true
						}
					})
				}
			},
			accessCarSend(){ //车源评估
				if(!this.assessInfo.Pg_description || !this.assessInfo.EvalAMT){
					this.$api.msg(`请输入描述信息或评估价格`);
				}else{
					console.log('sldsjldfj')
					carAssess(this.assessInfo).then(res=>{
						// console.log(res.data)
						if(res.data.ResultType == 0){
							this.$api.msg(`车源评估成功`);
							this.modalName = null
						}
					})
				}
			},
			followSend(){ //跟进
				if(!this.quickFollow.content){
					this.$api.msg(`请输入跟进内容`);
				}else{
					carFollow(this.quickFollow).then(res=>{
						// console.log(res.data)
						if(res.data.ResultType == 0){
							this.$api.msg(`跟进成功`);
							this.modalName = null
						}
					})
				}
			},
			abandActivF(){ //废弃激活		
				console.log('废弃', this.detail.cars.ID)
				const param = {id: this.detail.cars.ID, status: 0, pid: this.userPshop}
				abandOrActiv(param).then(res=>{
					if(res.data.ResultType == 0){
						// 
						this.modalName = null
						this.$api.msg(`车源已废弃`);
						/* this.getCarDetailById()
						this.getCarFollowById() */
						uni.navigateBack()
					}else{
							this.$api.msg(res.data.Message);
							this.modalName = null
					}		
				})
			},
			abandActivJ(){//激活
					const param = {id: this.detail.cars.ID, status: 1, pid: this.userPshop}
					abandOrActiv(param).then(res=>{
						if(res.data.ResultType == 0){
							// 
							this.modalName = null
							this.$api.msg(`车源已激活`);
							uni.navigateBack()
							/* this.getCarDetailById()
							this.getCarFollowById() */
						}else{
							this.$api.msg(res.data.Message);
							this.modalName = null
						}
					})
			},
			loadModalDel(){
				setTimeout(() => {
					if(!(this.carCompleted && this.followCompleted)){
						this.loadModal = true
					}
				}, 1500)
				setTimeout(() => {
					if(!(this.carCompleted && this.followCompleted)){
						this.$api.msg(`获取数据失败,请返回重试`);
					}
					this.loadModal = false
				}, 8000)
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
			toTrackHistory(){
				uni.navigateTo({
					url: '/pages/car/carDetail?id='+this.carId+'&nav=2'
				})
			},
			textareaAInput(e) {
				this.quickFollow.content = e.detail.value
			},
			textareaBInput(e){
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
	#mystyle /deep/ .cell-tip{
		width:18em;
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
