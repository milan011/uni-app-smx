<template>
	<view class="container">
	<view v-if="aboutDom" class="about-main" v-html='aboutDom'>
		
	</view>
	<view v-if="(smxShow)&&(!aboutDom)" class="about-main">
		<image style="height: 500upx;width:100%" :src="img" mode="scaleToFill"></image>
		<text style="text-indent: 2em;">上海驷马先教育科技有限公司是一家专注于中国汽车后市场职业教育与岗位培训的网络平台提供商。涵盖汽车服务岗位能力人才培养方案，汽车后市场服务平台提供商，校企合作与资源整合提供商。已为全国超过六万家汽车后市场企业提供运营管理，电商平台搭建和人力培训等相关服务。
		驷马先教育为用户提供完整的售前方案咨询辅导、售中校企共建项目精准落地扶植、本地化的售后服务支持，确保每一个项目快捷、完整交付。</text>
	</view>
	</view>
	<!-- <view class="about-main">
		<image class="banner" src="../../static/about/banner.jpg" mode=""></image>
		<view class="content">
			<view class="title">关于淘车乐</view>
			<view class="main">
				河北淘车乐二手车交易有限公司成立于2011年9月，公司以“诚实信用
				合作共赢，透明交易，连锁经营”的理念，打破传统的二手车交易模式，配以旗下“定盘星”二手车鉴定评估有限公司，一站式服务，让买车卖车更加便捷放心。五年多的时间，公司累计销售二手车十几万辆，现已建立了网上销售平台—淘车乐官方网站,并成立淘车乐二手车服务中心，加盟连锁店接近60家，客户遍布北京、河北、新疆、浙江、吉林、黑龙江、山西、陕西等多个省份并与荣华集团、广汇集团、晨阳集团、冀中合力等旗下数十家4S店进行深度合作，实现了线上线下的有效结合。
			</view>
			<view class="purpose">我们的宗旨：</view>
			<view class="main">透明交易 连锁经营   我们的理念： 诚实信用 合作共赢。</view>
			<view class="purpose">我们的愿景：</view>
			<view class="main">打造全国最大、最好、最具特色的二手车交易服务平台！</view>
			<view class="purpose">淘车乐二手车的优势：</view>
			<view class="main">1.执照资质全：淘车乐公司是河北省内知名的二手车交易平台，起步比较早，资质比较全。目前淘车乐是河北省内唯一的中国人民共和国商务部商业特许经营备案的二手车交易企业。</view>
			<view class="main">2.评估专业：公司与定盘星二手车鉴定评估有限公司合作河北省二手车评估师培训项目，已经从这个平台走出去上百位高级评估师。公司的郜彦刚老师和邵海军老师是河北省内最知名最专业的两位评估师，在省内二手车评估圈享有很高的知名度。</view>
			<view class="main">3. 宣传广业务广：2016年公司与中国银行深度合作开展二手车分期业务，为国有银行开展二手车业务树立了标杆。在宣传上公司还与河北电视台、河北交通广播（FM99.2）、石家庄交通广播（FM94.6）、河北农民广播（FM98.1）、燕赵晚报、二手车之家、淘车网、第一车网、华夏二手车网、搜狐汽车、58同城、赶集网等多家媒体和网站进行深度合作，得到业内人士及广大客户的认可 。</view>
			<view class="main">4.线下店面多信息多：公司网点已经有60多家，每天都有许多咨询加盟的客户。业务开展到各个社区及县城，能够实现信息共享充分体现信息价值。</view>
		</view>
	</view> -->
</template>

<script>
	import { getStorageByKey } from '@/common/storage.js'
	import { getMarketDetail } from '@/api/shop.js'
	export default {
		data() {
			return {
				ifOnShow: false,
				P_Shop_Id: '',
				smxShow: false,
				aboutDom: null,
				img: '/static/temp/smx_banner2.jpg'
			};
		},
		onHide(){
		  // console.log('this.ifOnShow=true')
		  this.ifOnShow = true 
		},
		async onShow(){
			var _this = this
			if(_this.ifOnShow){
				await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
					console.log('当前市场', res)
					if(res){
						_this.P_Shop_Id = res.id
						_this.getMarketDetialById()
					}
				})
			}
		},
		async onLoad(){
			var _this = this
			await getStorageByKey('pshop').then(res=>{ //获取storage:pshop
				console.log('当前市场', res)
				if(res){
					_this.P_Shop_Id = res.id
					_this.getMarketDetialById()
				}
			})
		},
		methods: {
			getMarketDetialById(){
				var _this = this
				console.log('当前门店id', _this.P_Shop_Id)
				getMarketDetail(_this.P_Shop_Id).then(res=>{
					console.log('一级市场信息', res)	
					if(res){
						_this.aboutDom = res.data.Data.shop.aboutusyd
					}else{
						_this.smxShow = true
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.about-main {
		text-align: left;
		padding: 30rpx;

		.banner {
			width: 100%;
		}

		.content {
			width: 90%;
			margin: 0 auto;

			.title {
				font-size: 40upx;
				font-weight: 800;
			}

			.main {
				text-indent: 2em;
				text-align: justify
			}
			
			.purpose{
				font-weight: 600;
				margin-top: 20upx;
				text-align:left;
			}
		}
	}
</style>
