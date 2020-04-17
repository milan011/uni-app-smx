<template>
	<view class="container">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
			<view class="cu-item flex-sub" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
				<view class="text">信息</view>
			</view>
			<view class="cu-item flex-sub" :class="1==TabCur?'text-green cur':''" @tap="tabSelect" data-id="1">
				<view class="text">图片</view>
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
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">奥迪A4L进取型</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">车架号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">LVHFA152X85018438</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">车型类别</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">轿车</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">期望价格(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2.75-2.75</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">指导价(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">14.78</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">评估价(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">暂无评估价</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">车龄(年)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">过户次数</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">行驶里程(万公里)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">14</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">变速箱</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">手动</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">排量</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">1.8L</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">上牌日期</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2008-05-05</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">上牌城市</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">石家庄</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">到检日期</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2008-05-05</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">保险类别</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">交强险</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">保险到期</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">2009-05-05</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">外观颜色</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">白</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">内饰颜色</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">浅色</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">所属门店</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">灵寿店</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">负责人</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">徐坤 | 15128133823</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">客户信息</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">徐坤</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">评估师描述</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm"></text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-target="Modal">
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">客户描述</text>
					</view>
					<view class="action text-cut">
						<text style="margin: 1.2em;" class="text-grey text-sm">个人一手车，大屏导航，车主一手开下来都是原车漆。日本车发动机确实是经久耐用的。有日粉或者找练手车的朋友来咨询吧</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-target="ModalS" >
					<view class="content">
						<text class="cuIcon-warn text-green"></text>
						<text class="text-grey">销售顾问备注</text>
					</view>
					<view class="action text-cut">
						<text class="text-grey text-sm">浅色</text>
					</view>
				</view>
			</view>
			<!-- 信息显示End -->
			<!-- 图片显示Begin -->
			<view v-if="TabCur==1" style="padding: 0px 60upx">
				<view  class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 车辆图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 证件图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 附加图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 评估图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
					<view class="bg-img" @tap="ViewImage" data-url="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg">
						<image src="http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<!-- 图片显示End -->
			<!-- 跟踪显示Begin -->
			<view v-if="TabCur==2">
			<view class="cu-timeline">
				<view class="cu-time my-style">2020-06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						 【喵星】 MX-12138 已揽收，准备发往银河系
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			<view class="cu-timeline">
				<view class="cu-time my-style">06-17</view>
				<view class="cu-item">
					<view class="content" style="white-space: initial;">
						<text>【喵星】 MX-12138 已揽收，准备发往银河系</text>		
					</view>
				</view>
			</view>
			</view>
			<!-- 跟踪显示End -->
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
					个人一手车，大屏导航，车主一手开下来都是原车漆。日本车发动机确实是经久耐用的。有日粉或者找练手车的朋友来咨询吧.
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
	export default {
		data() {
			return {
				TabCur: 0,
				modalName: null,
				imgList: ['http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg'],
			}
		},
		async onLoad(options){
			console.log(options)
			this.loadData();
		},
		methods: {
			async loadData(){
				
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
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
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
	.container{
		display: flex;
	}
	.nav{
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
