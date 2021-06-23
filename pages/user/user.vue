<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/user-bg.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="currentUser.portrait || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{currentUser.nick_name || '游客'}}</text>
				</view>
			</view>
		</view>

		<view 
		class="cover-container" 
		:style="[{transform: coverTransform,transition: coverTransition}]"
		 @touchstart="coverTouchstart" 
		 @touchmove="coverTouchmove" 
		 @touchend="coverTouchend">
			<image class="arc" src="/static/arc.png"></image>
			<!-- 信息展示 Begain -->
			<view class="tj-sction" v-if="currentUser">
				<view class="tj-item">
					<text>车源</text>
					<text class="num">{{ userGeneralInfo.MyCar }}</text>
					
				</view>
				<view class="tj-item">
					<text>求购</text>
					<text class="num">{{ userGeneralInfo.MyWant }}</text>
					
				</view>
				<view class="tj-item">
					<text>交易</text>
					<text class="num">{{ userGeneralInfo.MyTrancation }}</text>	
				</view>
			</view>
			<!-- 信息展示 End -->
			<!-- 待跟进信息展示 Begain -->
			<view class="tj-sction" v-if="currentUser">
				<view v-if="userGeneralInfo.CarRemind" class="tj-item">
					<!-- <text>车源 | {{ userGeneralInfo.MyCar }}</text> -->
					<view @tap="toRemindCar" class='cu-tag radius line-green'>
						待跟进车源 | {{ userGeneralInfo.CarRemind }}
						<view v-if="userGeneralInfo.CarRemind > 0" class="cu-tag badge"></view>
					</view>
				</view>
				<view v-if="userGeneralInfo.WantRemind" class="tj-item">
					<!-- <text>求购 | {{ userGeneralInfo.MyWant }}</text> -->
					<view @tap="toRemindWant"  class='cu-tag radius line-olive'>
						待跟进求购 | {{ userGeneralInfo.WantRemind }}
						<view v-if="userGeneralInfo.WantRemind > 0" class="cu-tag badge"></view>
					</view>
				</view>
				<!-- <view class="tj-item">
					<text>交易 | {{ userGeneralInfo.MyTrancation }}</text>
					<view class='cu-tag radius line-cyan'>
						交易 | {{ userGeneralInfo.MyTrancation }}
						<view v-if="userGeneralInfo.TranRemind > 0" class="cu-tag badge"></view>
					</view>
				</view> -->
			</view>
			<!-- 待跟进信息展示 End -->
			<!-- 操作菜单 Begain -->
			<view v-if="currentUser" class="order-section">
				<view class="order-item" @click="navTo('/pages/car/list')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>车源管理</text>
				</view>
				<view class="order-item" @click="navTo('/pages/wantBuy/wantBuy')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>求购管理</text>
				</view>
				<view class="order-item" @click="navTo('/pages/myTransaction/transaction')" hover-class="common-hover"
				 :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>我的交易</text>
				</view>
				<view class="order-item" @click="navTo('/pages/customer/customer')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>客户管理</text>
				</view>
			</view>
			<!-- 操作菜单 End -->
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text class="cell-tit clamp">浏览历史</text>
					<text class="cuIcon-delete icons" @click="removeCache"></text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image v-for="(item,index) in imgList" :key='index' @click="navToProduct('/pages/product/product?id='+item.id)" :src="img_url+item.url"
					 mode="scaleToFill"></image>
				</scroll-view>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" showYt iconColor="#54b4ef" @eventClick="navToCollect" title="我的收藏"></list-cell>
				<list-cell v-if="currentUser" icon="icon-dizhi" showYt iconColor="#5fcda2" title="商机" @eventClick="navTo('/pages/business/business')
				
				"></list-cell>
				<list-cell v-if="currentUser" icon="icon-pinglun-copy" showYt iconColor="#ee883b" title="协议管理" @eventClick="navTo('/pages/protocol/protocol')"></list-cell>
				<list-cell icon="icon-shezhi1" showYt iconColor="#e07472" :title="utitle" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
			</view>
			<view v-if="currentUser" class="forget-section">
				技术支持 © 上海驷马先教育科技有限公司
			</view> 
		</view>
		<view v-if="!currentUser" class="forget-section-user">
			技术支持 © 上海驷马先教育科技有限公司
		</view> 
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	import Config from '@/common/config.js'
	import { getUserGeneral } from '@/api/user.js'
	import store from '@/store'
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				currentUser: '',
				ifOnShow: false,
				utitle: '登录',
				imgList: [],
				userGeneralInfo: {
					MyCar: '',
					MyWant: '',
					MyTrancation: '',
				},
				img_url: Config.img_url
			}
		},
		
		onLoad() {		
			this.currentUser = uni.getStorageSync('userInfo') || ''
			/* console.log('是否登录',this.hasLogin)
			console.log('登录用户',this.userInfo)
			console.log('登录用户?',this.currentUser) */
			if(this.currentUser){ //登录用户
				this.userGeneral()
				this.utitle = '设置'
			}else{
				this.utitle = '登录'
			}
		},
		onHide(){
		  // console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			if(this.ifOnShow){
				this.currentUser = uni.getStorageSync('userInfo') || ''
				/* console.log('是否登录',this.hasLogin)
				console.log('登录用户',this.userInfo)
				console.log('登录用户?',this.currentUser) */
				let imgList = []
				uni.getStorage({
					key: 'browseList',
					success: (res => {
						res.data.forEach(ele => {
							if(ele.carimages[1]){
								let params = {
									url: ele.carimages[1].filename,
									id: ele.cars.ID
								}
								this.imgList.push(params)
							}
						})
						for (var i = 0; i < this.imgList.length; i++) {
							for (var j = i + 1; j < this.imgList.length; j++) {
								if (this.imgList[i].id == this.imgList[j].id) { //第一个等同于第二个，splice方法删除第二个
									this.imgList.splice(j, 1);
									j--;
								}
							}
						}
					}),
					fail:()=> {
						console.log('尚无浏览历史')
					}
				})
				if(this.currentUser){ //登录用户
					this.userGeneral()
					this.utitle = '设置'
				}else{
					this.utitle = '登录'
				}
			}
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
			...mapState(['hasLogin', 'userInfo', 'logout'])
		},
		methods: {
			userGeneral(){
				var _this = this
				getUserGeneral().then(res=>{
					console.log('uGen',res.data)
					if(res.data.ResultType == 0){
						this.userGeneralInfo = res.data.Data
					}
					
				})/* .catch(err=>{
					console.log(err)
					if(err.data.ResultType == 8){
						_this.logout()
						// _this.$api.msg(`登录过期,请重新登录`, 2000)
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/public/login'
							});
						}, 2000)
					}
				}) */
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {		
				if (!this.currentUser) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},
			navToCollect(){
				uni.navigateTo({ url:'/pages/collect/collect'})
			},
			navToProduct(url){
				uni.navigateTo({
					url
				})
			},
			toRemindCar(){ //待跟进车源列表
				if(this.userGeneralInfo.CarRemind > 0){
					this.navTo('/pages/car/listRemind')
				}
			},
			toRemindWant(){ //待跟进求购列表
				if(this.userGeneralInfo.WantRemind > 0){
					this.navTo('/pages/wantBuy/listRemind')
				}
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
			},
			// 清空浏览历史
			removeCache(){
				let that = this
				uni.showModal({
				    title: '是否清空',
				    content: '确定要清空浏览历史吗？',
				    success: function (res) {
				        if (res.confirm) {
							 that.imgList = []
				             uni.removeStorage({
								 key:'browseList'
							 })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>
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
	.icons{
		margin-left: 420upx;
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
		padding: 30upx 0 0;
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
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 20upx;
		/* position: absolute;
		bottom: 1%;
		left: 16%; */
	}
	.forget-section-user{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 20upx;
		position: absolute;
		bottom: 1%;
		left: 16%;
	}
</style>
