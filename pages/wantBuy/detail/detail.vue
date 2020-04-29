<template>
	<view class="container">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
					<view class="text">信息</view>
				</view>
				<view class="cu-item flex-sub" :class="2==TabCur?'text-green cur':''" @tap="tabSelect" data-id="2">
					<view class="text">跟踪</view>
				</view>
				<view class="cu-item flex-sub" :class="3==TabCur?'text-green cur':''" @tap="tabSelect" data-id="3">
					<view class="text">交易</view>
				</view>
			</view>
			<!-- 信息显示Begin -->
			<view class="cu-list menu" v-if="TabCur==0">
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">期望车型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{wantInfo.want.carcate}}</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">期望车型1</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{wantInfo.want.alternate_car}}</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">期望车型2</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{wantInfo.want.alternate_car_another}}</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">变速箱</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{transmission[wantInfo.want.gearbox]}}</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">最低期望价格(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{wantInfo.want.bottom_price}}</text>
					</view>
				</view>
				<view class="cu-item ">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">最高期望价格(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{wantInfo.want.top_price}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-target="Modal">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">客户描述</text>
					</view>
					<view class="action text-cut">
						<text style="margin: 1.2em;" class="text-grey text-sm">{{wantInfo.want.xs_remark}}</text>
					</view>
				</view>
			</view>
			<!-- 信息显示End -->
			<!-- 跟踪显示Begin -->
			<view v-if="TabCur==2">
				<view class="cu-timeline" v-for="item in follow" :key="item.id">
					<view class="cu-time my-style">{{item.created_at.substring(0,item.created_at.indexOf("T"))}}</view>
					<view class="cu-item">
						<view class="content" style="white-space: initial;">
							<text>{{item.user_name}} 添加了跟踪记录：{{item.description}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 跟踪显示End -->
			<!-- 交易信息Begin -->
			<view v-if="TabCur==3" style="padding: 0px 60upx">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text>
						<text style="font-size: 18px;">对应车型</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu" v-if="TabCur==3">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">求购意向车型</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">奥迪</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">期望价格(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">27-29</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">所属门店</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">旗舰店</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">负责人</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">校长</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">求购客户</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">大刘</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">求购时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2020-03-21</text>
					</view>
				</view>
			</view>
			<view v-if="TabCur==3" style="padding: 0px 60upx">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text>
						<text style="font-size: 18px;">交易信息</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu" v-if="TabCur==3">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">成交价格(万元)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">15</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">整备费用</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">279</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">是否贷款</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">否</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">贷款佣金</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2000</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">交易时间</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2020-03-21</text>
					</view>
				</view>
			</view>
			<!-- 交易信息End -->
		</scroll-view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">客户描述</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{wantInfo.want.xs_remark}}
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='ModalS'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">销售顾问描述</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					我顶啊,卖车兄弟说的好啊
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getWant,
		getwantfollow
	} from "@/api/want.js"
	export default {
		data() {
			return {
				TabCur: 0,
				modalName: null,
				id: "",
				wantInfo: {
					want: {
						carcate: ""
					}
				},
				transmission: ['不限', '手动', '自动'],
				follow: []
			}
		},
		onLoad(options) {
			this.id = options.id
			if (options.TabCur) {
				this.TabCur = options.TabCur
			}
			this.loadData();
		},
		methods: {
			loadData() {
				getWant({
					Id: this.id
				}).then(res => {
					this.wantInfo = res.data.Data
					this.wantInfo.want.created_at = this.wantInfo.want.created_at.substring(0, this.wantInfo.want.created_at.indexOf(
						"T"))
					this.status = res.data.Data.want.want_status
				})
				getwantfollow({
					wid: this.id
				}).then(res => {
					this.follow = res.data.Data
				})

			},
			tabSelect(e) { //标签切换
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style lang='scss'>
	/* page, */
	.container {
		height: 100%;
		background-color: #f8f8f8;

	}

	.container {
		display: flex;
	}

	.nav {
		.cu-item {
			height: 50upx;
			/* display: inline-block; */
		}
	}

	.cu-timeline {
		.cu-item {
			height: 180upx;
			margin: 0px;
			/* display: inline-block; */
		}

		.my-style {
			width: 180upx;
		}
	}
</style>
