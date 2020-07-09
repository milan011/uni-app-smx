<template>
	<view class="container">
		<!-- 基本情况Begin -->
		<view class="history-section icon">
			<list-cell icon="icon-tuijian" iconColor="#e07472" iconRightColor='rgba(0,0,0,0)' title="求购车辆名称" :tips="wantInfo.want.carcate"></list-cell>
			<!-- <list-cell icon="icon-dizhi" iconColor="#5fcda2" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell> -->
			<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" iconRightColor='rgba(0,0,0,0)' title="负责人" :tips="wantInfo.want.creater_name"></list-cell>
			<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" iconRightColor='rgba(0,0,0,0)' title="上传日期" :tips="wantInfo.want.created_at"></list-cell>
		</view>
		<!-- 基本情况End -->
		<!-- 操作组Begin -->
		<view class="order-section">
			<view class="order-item" @click="navTo('/pages/wantBuy/detail/detail?id=' + Id)" hover-class="common-hover"
			 :hover-stay-time="50">
				<text class="yticon icon-shouye"></text>
				<text>查看</text>
			</view>
			<view class="order-item" @click="navTo('/pages/wantBuy/edit/edit?id=' + Id)" hover-class="common-hover"
			 :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text>编辑</text>
			</view>
			<view class="order-item" @tap="showModal" data-target="ModalScrap" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-daifukuan"></text>
				<text v-if="status == 1">废弃</text>
				<text v-if="status == 0">激活</text>
			</view>
			<view class="order-item" @tap="showModal" data-target="ModalFollow" hover-class="common-hover" :hover-stay-time="50">
				<text class="yticon icon-shouhoutuikuan"></text>
				<text>跟进</text>
			</view>
		</view>

		<!-- 操作组End -->
		<!-- 跟踪信息Begin -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">最新跟踪</text>
				<text @click="navTo('/pages/wantBuy/detail/detail?TabCur=2&id='+Id)" class="tip">历史跟踪记录</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<view class="right">
					<view class="guess-section">
						<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" iconRightColor='rgba(0,0,0,0)' title="跟踪人员" :tips="follow[0].user_name"></list-cell>
						<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" iconRightColor='rgba(0,0,0,0)' title="跟踪时间" :tips="follow[0].created_at.substring(0,follow[0].created_at.indexOf('T'))">
						</list-cell>
						<list-cell @eventClick="navTo('/pages/wantBuy/detail/detail?TabCur=2&id='+Id)" icon="icon-pinglun-copy" iconColor="#ee883b" title="跟踪操作" :tips="follow[0].description">
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
					<view v-if="status == 1" class="content">废弃求购</view>
					<view v-if="status == 0" class="content">激活求购</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view v-if="status == 1" class="padding-xl">
					您确定要废弃该求购吗
				</view>				
				<view v-if="status == 1" class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="doSaveF">确定</button>
					</view>
				</view>
				<view v-if="status == 0" class="padding-xl">
					您确定要激活该求购吗
				</view>
				<view v-if="status == 0" class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="doSaveJ">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 废弃modal End -->
		<!-- 评估modal Begin -->
		<view class="cu-modal" :class="modalName=='ModalAssess'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">评估车源</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group nu-style">
						<view class="title">期望价格</view>
						<input style="text-align: right;" placeholder="请输入期望价格" name="input"></input>
						<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
					</view>
					<view class="cu-form-group margin-top">
						<textarea v-if="modalName=='ModalAssess'" maxlength="-1" @input="textareaAInput" placeholder="评估描述"></textarea>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 评估modal End -->
		<!-- 跟进modal Begin -->
		<view class="cu-modal" :class="modalName=='ModalFollow'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">求购跟进</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					<view class="cu-form-group margin-top">
						<textarea v-if="modalName=='ModalFollow'" maxlength="-1" @input="textareaAInput" placeholder="跟进内容"></textarea>
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
	import listCell from '@/components/mix-list-cell';
	import {
		getWant,
		getwantfollow,
		statusWant,
		wantFollow
	} from '@/api/want.js'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			listCell
		},
		data() {
			return {
				modalName: null,
				Id: '',
				ifOnShow: false,
				wantInfo: {
					want: {
						carcate: ""
					}
				},
				follow: [{
					user_name: "",
					created_at: ""
				}],
				status: "",
				textareaAValue: "",
				follow_type: "",
				user_name: "",
				user_id: ""
			}
		},
		onLoad(options) {
			this.Id = options.wantId;
			this.getInfo();
			this.getFollow();
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			if(this.ifOnShow){
				this.getInfo();
				this.getFollow();
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {

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
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
				console.log(this.textareaAValue)
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 获取详情
			getInfo() {
				getWant({
					Id: this.Id
				}).then(res => {
					this.wantInfo = res.data.Data
					this.wantInfo.want.created_at = this.wantInfo.want.created_at.substring(0, this.wantInfo.want.created_at.indexOf(
						"T"))
					this.status = res.data.Data.want.want_status
				})
			},
			// 获取跟踪记录
			getFollow() {
				getwantfollow({
					wid: this.Id
				}).then(res => {
					this.follow = res.data.Data
					this.follow_type = res.data.Data[0].follow_type
					this.user_name = res.data.Data[0].user_name
					this.user_id = res.data.Data[0].user_id
				})
			},
			// 废弃求购
			doSaveF() {
				statusWant({
					Id: this.Id,
					status: 0
				}).then(res => {
					if(res.data.ResultType == 0){
						// 
						this.modalName = null
						this.$api.msg(`求购已废弃`);
						uni.navigateBack()
						/* this.getCarDetailById()
						this.getCarFollowById() */
					}else{
						this.$api.msg(res.data.Message);
						this.modalName = null
					}
					/* this.hideModal()
					uni.showToast({
						title: "操作成功",
						icon: "none",
						duration: 1500
					}) */
				})
			},
			//激活求购
			doSaveJ() {
				statusWant({
					Id: this.Id,
					status: 1
				}).then(res => {
					if(res.data.ResultType == 0){
						// 
						this.modalName = null
						this.$api.msg(`求购已激活`);
						uni.navigateBack()
						/* this.getCarDetailById()
						this.getCarFollowById() */
					}else{
						this.$api.msg(res.data.Message);
						this.modalName = null
					}
					/* this.hideModal()
					uni.showToast({
						title: "操作成功",
						icon: "none",
						duration: 1500
					}) */
				})
			},
			// 添加跟进
			doFollow() {
				wantFollow({
					want_id: this.Id,
					follow_type: this.follow_type,
					user_name: this.user_name,
					user_id: this.user_id,
					description: this.textareaAValue
				}).then(res => {
					this.getFollow();
					this.hideModal()
					uni.showToast({
						title: "操作成功",
						icon: "none",
						duration: 1500
					})
				})
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
