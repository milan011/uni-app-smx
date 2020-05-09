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
			<!-- <view class="cu-item flex-sub" :class="3==TabCur?'text-green cur':''" @tap="tabSelect" data-id="3">
				<view class="text">交易</view>
			</view> -->
			</view>	
			<!-- 信息显示Begin -->
			<view class="cu-list menu" v-if="TabCur==0">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">名称</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.FullName}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">状态</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Car_Status" class="text-grey text-sm">{{carStatusConfig[detail.cars.Car_Status].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">车架号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.VIN}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">车型类别</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.CarType" class="text-grey text-sm">{{carTypeConfig[detail.cars.CarType].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">期望价格(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.BasePrice}}-{{detail.cars.SaleAMT}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">指导价(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.InitPrice/10000}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">评估价(万)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.EvalAMT?detail.cars.EvalAMT:'暂无评估价'}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">车龄(年)</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.BuyDate" class="text-grey text-sm">{{detail.cars.BuyDate?(nowYear-detail.cars.BuyDate.split("-")[0]):""}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">过户次数</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.Sale_number}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">行驶里程(万公里)</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.Mileage}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">变速箱</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Transmission" class="text-grey text-sm">{{transmissionConfig[detail.cars.Transmission].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">排量</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.Capacity}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">上牌日期</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.BuyDate" class="text-grey text-sm">{{detail.cars.BuyDate.split("T")[0]}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">上牌城市</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.CityName}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">到检日期</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.InspectionTime" class="text-grey text-sm">{{detail.cars.InspectionTime.split("T")[0]}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">保险类别</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Safe_type" class="text-grey text-sm">{{safetypeConfig[detail.cars.Safe_type].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">保险到期</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Safe_end" class="text-grey text-sm">{{detail.cars.Safe_end.split("T")[0]}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">外观颜色</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Out_color" class="text-grey text-sm">{{outcolorConfig[detail.cars.Out_color].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">内饰颜色</text>
					</view>
					<view class="action">
						<text v-if="detail.cars.Inside_color" class="text-grey text-sm">{{insidecolorConfig[detail.cars.Inside_color].name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">所属门店</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.shop.name}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">负责人</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.CreateName}} | {{detail.Telephone}}</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">客户信息</text>
					</view>
					<view class="action">
						<text v-if="detail.customer" class="text-grey text-sm">{{detail.customer.name}}</text>
						<text v-if="detail.cars.CreateId === currentUserId" class="text-grey text-sm">({{detail.customer.telephone}})</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">评估师描述</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{detail.cars.Pg_description ? detail.cars.Pg_description : '暂无'}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-target="Modal">
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">客户描述</text>
					</view>
					<view class="action text-cut">
						<text style="margin: 1.2em;" class="text-grey text-sm">{{detail.cars.Description}}</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="showModal" data-target="ModalS" >
					<view class="content">
						<text class="cuIcon-message text-green"></text>
						<text class="text-grey">销售顾问描述</text>
					</view>
					<view class="action text-cut">
						<text class="text-grey text-sm">{{detail.cars.XS_description}}</text>
					</view>
				</view>
			</view>
			<!-- 信息显示End -->
			<!-- 图片显示Begin -->
			<view v-if="TabCur==1" style="padding: 0px 60upx">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 车辆图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view v-if="index<10" v-for="(img,index) in carImgNormal" :key="index" class="bg-img" @tap="ViewImage" :data-url="imgUrl + img.filename">
						<image :src="imgUrl + img.filename" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 证件图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view v-if="index<10" v-for="(img,index) in carImgCer" :key="index" class="bg-img" @tap="ViewImage" :data-url="imgUrl + img.filename">
						<image :src="imgUrl + img.filename" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 附加图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view v-if="index >= 10" v-for="(img,index) in carImgNormal" :key="index" class="bg-img" @tap="ViewImage" :data-url="imgUrl + img.filename">
						<image :src="imgUrl + img.filename" mode="aspectFit"></image>
					</view>
				</view>
				<view class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 评估图片
					</view>
				</view>
				<view class="grid col-4 grid-square flex-sub">
					<view v-for="(img,index) in carImgAsse" :key="index" class="bg-img" @tap="ViewImage" :data-url="imgUrl + img.filename">
						<image :src="imgUrl + img.filename" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<!-- 图片显示End -->
			<!-- 跟踪显示Begin -->
			<view v-if="TabCur==2">
				<view v-for="(follow,index) in followInfo" :key="index" class="cu-timeline">
					<view class="cu-time my-style">{{follow.created_at.split("T")[0]}}</view>
					<view class="cu-item">
						<view class="content" style="white-space: initial;">
							<text>【{{follow.user_name}}】 {{follow.description}}</text>		
						</view>
					</view>
				</view>
			</view>
			<!-- 跟踪显示End -->
			<!-- 交易信息Begin -->
			<!-- <view v-if="TabCur==3" style="padding: 0px 60upx">
				<view  class="cu-bar bg-white solid-bottom">
					<view class="action" style="margin:0px">
						<text class="cuIcon-title text-orange "></text> 
						<text style="font-size: 18px;">对应求购</text>
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
				<view  class="cu-bar bg-white solid-bottom">
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
			</view> -->
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
					{{detail.cars.Description}}
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
					{{detail.cars.XS_description}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { 
		getCarDetail, 
		getCarFollow, 
		getCarImgsNormal, 
		getCarImgsExt,
		getCarImgsCer, 
		getCarImgsAsse 
	} from '@/api/carManage.js'
	import { 
		transmissionConfig,
		carStatusConfig, 
		putOnStatusConfig, 
		carTypeConfig,
		insidecolorConfig,
		outcolorConfig,
		safetypeConfig, 
	} from '@/common/appConfig.js';
	import Config from '@/common/config.js'
	export default {
		data() {
			return {
				TabCur: 0,
				modalName: null,
				imgList: ['http://tclapi.simaxian.com//Upload/b17f66b5-78ee-40b2-8a16-3fddfbd25985.jpg'],
				currentUserId: null,
				carId: null,
				nowYear:new Date().getFullYear() - 0 + 1,
				imgUrl: Config.img_url,
				detail: {
					cars: {},
					shop: {},
					user: null,
					customer: {},					
					carimages: []
				},
				carStatusConfig:{},
				putOnStatusConfig: {},
				carTypeConfig: {},
				insidecolorConfig: {},
				outcolorConfig: {},
				safetypeConfig: {},
				transmissionConfig: {},
				carImgNormal: [],
				carImgExt: [],
				carImgCer: [],
				carImgAsse: [],
				followInfo: {}
			}
		},
		async onLoad(options){
			let userInfo = uni.getStorageSync('userInfo') || '';
			console.log('userCurrent',userInfo)
			console.log(options)
			if(options.nav){
				this.TabCur = options.nav
			}
			this.currentUserId = userInfo.id
			this.carId = options.id
			this.carStatusConfig = carStatusConfig
			this.putOnStatusConfig = putOnStatusConfig
			this.carTypeConfig = carTypeConfig
			this.insidecolorConfig = insidecolorConfig
			this.outcolorConfig = outcolorConfig
			this.safetypeConfig = safetypeConfig
			this.transmissionConfig = transmissionConfig
			console.log('status_config',carStatusConfig)
			this.getCarDetailById()
			this.getCarFollowById()
			this.getCarImgsNormal()
			// this.getCarImgsExt()
			this.getCarImgsCer()
			this.getCarImgsAsse()
			// this.loadData();
		},
		methods: {
			async loadData(){
				
			},	
			getCarDetailById(){ //获取车源详情
				getCarDetail(this.carId).then(res => {
					console.log('carDetail',res.data)
					this.detail = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarFollowById(){ //获取跟踪信息
				getCarFollow(this.carId).then(res => {
					console.log('carfollow',res.data)
					this.followInfo = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsNormal(){ //获取车源基本图片
				getCarImgsNormal(this.carId).then(res => {
					console.log('carimg_normal',res.data)
					this.carImgNormal = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsCer(){ //获取车源证件图片
				getCarImgsCer(this.carId).then(res => {
					console.log('carimg_normal',res.data)
					this.carImgCer = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsExt(){ //获取车源附加图片
				getCarImgsExt(this.carId).then(res => {
					console.log('carimg_pg',res.data)
					this.carImgExt = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarImgsAsse(){ //获取车源评估图片
				getCarImgsAsse(this.carId).then(res => {
					console.log('carimg_pg',res.data)
					this.carImgAsse = res.data.Data
					// this.loadingType = 'loading'
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
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
