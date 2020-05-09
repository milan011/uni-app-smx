<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
					<view class="text">车辆</view>
				</view>
				<view class="cu-item flex-sub" :class="1==TabCur?'text-green cur':''" @tap="tabSelect" data-id="1">
					<view class="text">证件</view>
				</view>
				<view class="cu-item flex-sub" :class="2==TabCur?'text-green cur':''" @tap="tabSelect" data-id="2">
					<view class="text">其他</view>
				</view>
				<view class="cu-item flex-sub" :class="3==TabCur?'text-green cur':''" @tap="tabSelect" data-id="3">
					<view class="text">评估</view>
				</view>
				</view>
		</scroll-view>
			<view v-if="TabCur==0" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 车辆照片
				</view>
			</view>
			<view v-if="TabCur==0" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view v-if="img.carpart" v-for="(img, index) in imgList"  class="bg-img" @tap="ViewImage" :data-url="img.imgUrl">
						<image :src="img.imgUrl" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" data-imgtype="101" :data-carpart="img.carpart">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view v-if="imgUpShow['正面']" class="solids" @tap="ChooseImage" data-carpart="正面" data-imagetype="101">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">正 面</text>
					</view>
					<view v-if="imgUpShow['左前45度']" data-carpart="左前45度" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<view class='tStyle' style="margin-left: 0.5em;"><text>左前45度</text></view>	
					</view>
					<view v-if="imgUpShow['左后45度']" data-carpart="左后45度" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">左后45度</text>
					</view>
					<view v-if="imgUpShow['发动机舱']" data-carpart="发动机舱" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">发动机舱</text>
					</view>
					<view v-if="imgUpShow['仪表']" data-carpart="仪表" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">仪 表</text>
					</view>
					<view v-if="imgUpShow['内饰']" data-carpart="内饰" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">内 饰</text>
					</view>
					<view v-if="imgUpShow['后备箱']" data-carpart="后备箱" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">后备箱</text>
					</view>
					<view v-if="imgUpShow['右前45度']" data-carpart="右前45度" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">右前45度</text>
					</view>
					<view v-if="imgUpShow['右后45度']" data-carpart="右后45度" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">右后45度</text>
					</view>
					<view v-if="imgUpShow['正后']" data-carpart="正后" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">正 后</text>
					</view>
				</view>
			</view>
			<view v-if="TabCur==1" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 证件照片
				</view>
			</view>
			<view v-if="TabCur==1" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view v-for="(img, index) in imgListPaper" class="bg-img" @tap="ViewImage" :data-url="imgListPaper[0]">
						<image :src="img.imgUrl" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" data-imgtype="0" :data-carpart="img.carpart">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view v-if="imgUpShow['登记证书']" data-carpart="登记证书" data-imagetype="0" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">登记证书</text>
					</view>
					<view v-if="imgUpShow['行使证']" data-carpart="行使证" data-imagetype="0" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">行使证</text>
					</view>
					<view v-if="imgUpShow['身份证']" data-carpart="身份证" data-imagetype="0" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">身份证</text>
					</view>
					<view v-if="imgUpShow['购车发票']" data-carpart="购车发票" data-imagetype="0" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">购车发票</text>
					</view>
					<view v-if="imgUpShow['保险证明']" data-carpart="保险证明" data-imagetype="0" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">保险证明</text>
					</view>
				</view>
			</view>
			<view v-if="TabCur==2" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 其他图片
				</view>
			</view>
			<view v-if="TabCur==2" class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view v-for="(img, index) in imgListOther" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
						<image :src="img.imgUrl" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImgOther" :data-imgid="img.id" :data-index="index" data-imgtype="101" data-carpart="">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImageOther"  data-carpart="" data-imagetype="0" v-if="imgListOther.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view v-if="TabCur==3" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 
					<text>非常规技术检查</text>
				</view>
			</view>
			<uni-collapse v-if="TabCur==3" accordion="true">
				<uni-collapse-item v-for="(pgpro, index) in pgPartFConfig" :key="index"  :showBage="pgpro.showBage" :title="pgpro.title">
					<uni-collapse style="padding:5px" accordion="true">
						<uni-collapse-item v-for="(part,index) in pgpro.part" :showBage="part.showBage"  :key="index" :title="part.name">
							<view style="padding: 30rpx;">
								<view class="grid col-4 grid-square flex-sub">
									<view v-if="part.imagetype == img.ImageType" v-for="(img, index) in imgListPgCurrent" :key="index" class="bg-img" @tap="ViewImage">
										<image :src="img.imgUrl" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="index" :data-imgtype="img.ImageType">
											<text class='cuIcon-close'></text>
										</view>
									</view>
									<view class="solids" @tap="ChooseImagePg" :data-imagetype="part.imagetype" v-if="imgListPgCurrent.length<4">
										<text class='cuIcon-cameraadd'></text>
									</view>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</uni-collapse-item>
			</uni-collapse>
			<view v-if="TabCur==3" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 静态检查
				</view>
			</view>
			<uni-collapse v-if="TabCur==3" accordion="true">
				<uni-collapse-item v-for="(pgpro, index) in pgPartJConfig" :key="index" :showBage="pgpro.showBage" :title="pgpro.title">
					<uni-collapse style="padding:5px" accordion="true">
						<uni-collapse-item v-for="(part,index) in pgpro.part" :showBage="part.showBage" :key="index" :title="part.name">
							<view style="padding: 30rpx;">
								<view class="grid col-4 grid-square flex-sub">
									<view v-if="part.imagetype == img.ImageType" v-for="(img, index) in imgListPgCurrent" :key="index" class="bg-img" @tap="ViewImage">
										<image :src="img.imgUrl" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="index" :data-imgtype="img.ImageType">
											<text class='cuIcon-close'></text>
										</view>
									</view>
									<view class="solids" @tap="ChooseImagePg" :data-imagetype="part.imagetype" v-if="imgListPgCurrent.length<4">
										<text class='cuIcon-cameraadd'></text>
									</view>
								</view>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</uni-collapse-item>
			</uni-collapse>
			<view v-if="TabCur==3" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 动态检查
				</view>
			</view>
			<uni-collapse v-if="TabCur==3" accordion="true">
				<uni-collapse-item v-for="(part,index) in pgPartDConfig" :showBage="part.showBage" :key="index" :title="part.name">
					<view style="padding: 30rpx;">
						<view class="grid col-4 grid-square flex-sub">
							<view v-if="part.imagetype == img.ImageType" v-for="(img, ind) in imgListPgCurrent" :key="ind" class="bg-img" @tap="ViewImage">
								<image :src="img.imgUrl" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="ind" :data-imgtype="img.ImageType" data-part="pgPartDConfig">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids"  @tap="ChooseImagePg" :data-imagetype="part.imagetype" v-if="imgListPgCurrent.length<4">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<text class="mix-btn" @click="confirmImg">预览上架</text>
			<!-- 手动输入车型 Begin -->
			<view style="z-index: 110;" class="cu-modal" :class="modalName=='Comment'?'show':''">
				<view class="cu-dialog">
					<view class="bg-img" :style="{backgroundImage: 'url(' + pgBackImg + ')' }" style="height:200px">
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<!-- <view class="cu-bar bg-white justify-end">
						<view class="content">点评</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view> -->
					<view class="padding-xl">
						<view class="cu-form-group margin-top">
							<uni-rate size="18" :value="imgPgData.ImageLevel" active-color="#565656" @change="rateChange"></uni-rate>
						</view>
						<view class="cu-form-group margin-top">
							<textarea style="text-align: left;" v-model="imgPgData.ImageContent" maxlength="-1" @input="dpInput" placeholder="点评描述">
							</textarea>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="addPgImg">确定</button>
						</view>
					</view>
				</view>
			</view>
			<!-- 手动输入车型 End -->
	</view>
</template>

<script>
	import { imgUpload, imgAdd, imgDelete, imgDeleteById } from '@/api/carManage.js'
	import {pgPartFConfig, pgPartJConfig, pgPartDConfig} from '@/common/appConfig.js'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default {
		name: 'CarImg',
		components: {uniRate},
		data(){
			return {
				imgUpShow: {
					'正面': true,
					'左前45度': true,
					'左后45度': true,
					'发动机舱': true,
					'仪表': true,
					'内饰': true,
					'后备箱': true,
					'右前45度': true,
					'右后45度': true,
					'正后': true,	
					'登记证书': true,
					'行使证': true,
					'身份证': true,
					'购车发票': true,
					'保险证明': true,
				},
				modalName: null,
				pgPartFConfig: [],
				pgPartJConfig: [],
				pgPartDConfig: [],
				TabCur: 0,
				imgData: {
					ID: 0,
					Carid: null,
					ImageType: null,
					ImageUrl: '',
					carpart: '',
				},
				imgPgData: { //评估图片
					ID: 0,
					Carid: null,
					ImageType: null,
					ImageUrl: '',
					IsTop: 0,
					ImageLevel: 3,
					ImageContent: ''
				},
				pgBackImg: '',
				imgList: [],
				imgListPaper: [],
				imgListOther: [],
				imgListAsess: [],
				imgListPg: [],
				imgListPgCurrent: [],
				imgUser: {
					shop_id: '72',
					pshop_id: '71',
				},
			}
		},
		created(){
			this.pgPartFConfig = pgPartFConfig
			this.pgPartJConfig = pgPartJConfig
			this.pgPartDConfig = pgPartDConfig
		},
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
		},
		methods: {
			tabSelect(e) { //标签切换
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) { //基本图片删除
				uni.showModal({
					title: '图片删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							// this.imgList.splice(e.currentTarget.dataset.index, 1)
							const param = {
								cid: this.imgData.Carid,
								carpart: e.currentTarget.dataset.carpart,
							}
							
							imgDelete(param).then(res => {
								const imgtype = e.currentTarget.dataset.imgtype
								/* console.log(res)
								console.log(e.currentTarget.dataset)
								console.log(imgtype) */
								if(res.data.ResultType === 0){
									if(imgtype == 101){ //基本图片
										this.imgList.splice(this.imgList.findIndex(item => item.carpart === param.carpart), 1)
									}
									if(imgtype == 0){ //证件图片
										this.imgListPaper.splice(this.imgListPaper.findIndex(item => item.carpart === param.carpart), 1)
									}
									if(imgtype != 0 && imgtype != 101){ //评估图片
										// this.imgList.splice(this.imgList.findIndex(item => item.carpart === param.carpart), 1)
									}
									// console.log(this.imgList.findIndex(item => item.carpart === param.carpart))
									this.imgUpShow[param.carpart] = true
								}else{
									this.$api.msg(`图片删除失败,请刷新重试`);
								}
							}).catch(err => {
								this.$api.msg(`图片删除失败,请刷新重试`);
							})
							console.log('部位',e.currentTarget.dataset.carpart)
							console.log('carid',this.imgData.Carid)
						}
					}
				})
			},
			DelImgOther(e) { //其他图片删除
				uni.showModal({
					title: '图片删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							// this.imgList.splice(e.currentTarget.dataset.index, 1)	
							const imgId = e.currentTarget.dataset.imgid
							const imgIndex = e.currentTarget.dataset.index
							imgDeleteById(imgId).then(res => {
								if(res.data.ResultType === 0){
									// this.imgList.splice(this.imgList.findIndex(item => item.carpart === param.carpart), 1)
									this.imgListOther.splice(imgIndex, 1)
								}else{
									this.$api.msg(`图片删除失败,请刷新重试`);
								}
							}).catch(err => {
								this.$api.msg(`图片删除失败,请刷新重试`);
							})
							console.log('部位',e.currentTarget.dataset.carpart)
							console.log('carid',this.imgData.Carid)
						}
					}
				})
			},
			DelImgPg(e) { //评估图片删除
				uni.showModal({
					title: '图片删除',
					content: '确定要删除图片吗？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							// this.imgList.splice(e.currentTarget.dataset.index, 1)	
							const imgId = e.currentTarget.dataset.imgid
							const imgIndex = e.currentTarget.dataset.index
							const imgType = e.currentTarget.dataset.imgtype 
							const imgPart = e.currentTarget.dataset.pgPartDConfig 
							imgDeleteById(imgId).then(res => {
								if(res.data.ResultType === 0){
									// this.imgList.splice(this.imgList.findIndex(item => item.carpart === param.carpart), 1)
									/* this.imgListPgCurrent.forEach(ele => {
										console.log(ele)
										if(ele.ImageType)
									}) */
									this.imgListPgCurrent.splice(imgIndex, 1)
									// console.log(this.imgListPgCurrent)
									this.hideBageDell(imgType)
								}else{
									this.$api.msg(`图片删除失败,请刷新重试`);
								}
							}).catch(err => {
								console.log('err', err)
								this.$api.msg(`图片删除失败,请刷新重试`);
							})
							console.log('部位',e.currentTarget.dataset.carpart)
							console.log('carid',this.imgData.Carid)
						}
					}
				})
			},
			hideBageDell(imgType){
				if(this.imgListPgCurrent.length == 0){ //无评估图片
					this.hideBageDel(imgType)
				}else{
					this.imgListPgCurrent.forEach((ele, ind) => {
						console.log('hide',ele)
						if(ele.ImageType == imgType){ //该评估项仍有图片
							console.log('have')
							return true 
						}else{ //该评估项已无图片
							console.log('not have')
							this.hideBageDel(imgType)
						}
					})
				}	
			},
			hideBageDel(imgType){ //showBage 红点处理
				// console.log(this.imgListPgCurrent)
				this.pgPartDConfig.forEach(ele => { //动态评估项
					if(ele.imagetype == imgType){		
						console.log(ele)
						return ele.showBage = false
					}
				})
				this.pgPartJConfig.forEach(ele => { //静态评估项
					ele.part.forEach((el, ind) => {
						if(el.imagetype == imgType){		
							// ele.showBage = false
							el.showBage = false
							console.log(this.pgPartJConfig)
							return true
						}
					})
				})
				this.pgPartFConfig.forEach(ele => { //非常规评估项
					ele.part.forEach((el, ind) => {
						if(el.imagetype == imgType){		
							// ele.showBage = false
							el.showBage = false
							console.log(this.pgPartJConfig)
							return true
						}
					})
				})
			},
			rateChange(e){ //评估图片评级
				console.log(e)
				this.imgPgData.ImageLevel = e.value
			},
			dpInput(e){ //评估图片描述
				console.log(e)
				this.imgPgData.ImageContent = e.detail.value
			},
			ChooseImagePg(e){ //评估图片添加
				var _this = this
				console.log(e.currentTarget.dataset.imagetype)
				_this.imgPgData.ImageType = e.currentTarget.dataset.imagetype
				// return false
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								if(image.width/image.height < 1){
									_this.$api.msg(`请上传横拍图片`, 2000);
									return false
								}	
								const imgParam = {
									path:res.tempFilePaths[0],
									shopid: _this.imgUser.shop_id,
									pshopid: _this.imgUser.pshop_id,
								}
								_this.pgBackImg = res.tempFilePaths[0]
								// console.log(_this.pgBackImg)
								imgUpload(imgParam).then(resImg => {			
									_this.imgPgData.ImageUrl = resImg.data.LogMessage
									_this.imgPgData.ImageContent = ''
									console.log('图片上传',resImg.data)
									console.log(_this.imgPgData)
									_this.modalName = 'Comment'
									// return false								
								}).catch(err => {
									_this.$api.msg(`图片上传失败,请刷新重试`);
								})
							}
						})
					}
				});
			},
			addPgImg(){
				var _this = this
				if(!_this.imgPgData.ImageContent){
					_this.$api.msg(`请填写描述`);
					return false
				}
				imgAdd(_this.imgPgData).then(resImgAdd => {
					console.log('图片添加',resImgAdd.data)
					const imgReturn = [{
						imgUrl: _this.pgBackImg,
						carpart: resImgAdd.data.Data.carpart,
						id: resImgAdd.data.Data.id,
						ImageType: resImgAdd.data.Data.imagetype
					}]
					console.log('图片类型', _this.imgPgData.ImageType)
					if (_this.imgListPgCurrent.length != 0) {
						_this.imgListPgCurrent = _this.imgListPgCurrent.concat(imgReturn)
					} else {
						_this.imgListPgCurrent = imgReturn
					}
					console.log('imlist', _this.imgListPgCurrent)
					//根据添加到评估部位确定showBage状态
					_this.showBageDel(imgReturn[0].ImageType)
					_this.modalName = null
				}).catch(err => {
					console.log('err=>',err)
					_this.modalName = null
					_this.$api.msg(`图片添加失败,请刷新重试`);
				})
			},
			showBageDel(ImageType){ //showBage 红点处理
				console.log(ImageType)
				this.pgPartDConfig.forEach(ele => { //动态评估项
					if(ele.imagetype == ImageType){		
						console.log(ele)
						return ele.showBage = true
					}
				})
				this.pgPartJConfig.forEach(ele => { //静态评估项
					ele.part.forEach((el, ind) => {
						if(el.imagetype == ImageType){		
							ele.showBage = true
							el.showBage = true
							console.log(this.pgPartJConfig)
							return true
						}
					})
				})
				this.pgPartFConfig.forEach(ele => { //非常规评估项
					ele.part.forEach((el, ind) => {
						if(el.imagetype == ImageType){		
							ele.showBage = true
							el.showBage = true
							console.log(this.pgPartJConfig)
							return true
						}
					})
				})
			},
			ChooseImageOther(e){ //其他图片添加
				var _this = this
				console.log(e.currentTarget.dataset.carpart)
				console.log(e.currentTarget.dataset.imagetype)
				_this.imgData.carpart = e.currentTarget.dataset.carpart
				_this.imgData.ImageType = e.currentTarget.dataset.imagetype
				// return false
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								if(image.width/image.height < 1){
									_this.$api.msg(`请上传横拍图片`, 2000);
									return false
								}	
								const imgParam = {
									path:res.tempFilePaths[0],
									shopid: _this.imgUser.shop_id,
									pshopid: _this.imgUser.pshop_id,
								}
								imgUpload(imgParam).then(resImg => {
									console.log('图片上传',resImg.data)
									_this.imgData.ImageUrl = resImg.data.LogMessage
									imgAdd(_this.imgData).then(resImgAdd => {
										console.log('图片添加',resImgAdd.data)
										const imgReturn = [{
											imgUrl: res.tempFilePaths[0],
											carpart: resImgAdd.data.Data.carpart,
											id: resImgAdd.data.Data.id,
										}]
										console.log('图片类型', _this.imgData.ImageType)
										if (_this.imgListOther.length != 0) {
											_this.imgListOther = _this.imgListOther.concat(imgReturn)
										} else {
											_this.imgListOther = imgReturn
										}
										console.log('imlist', _this.imgListOther)
									}).catch(err => {
										console.log('1',err)
										_this.$api.msg(`图片添加失败,请刷新重试`);
									})
								}).catch(err => {
									// console.log('2',err)
									_this.$api.msg(`图片上传失败,请刷新重试`);
								})
							}
						})
					}
				});
			}, 
			ChooseImage(e) {  //基本信息图片添加
			 var _this = this
				console.log(e.currentTarget.dataset.carpart)
				console.log(e.currentTarget.dataset.imagetype)
				_this.imgData.carpart = e.currentTarget.dataset.carpart
				_this.imgData.ImageType = e.currentTarget.dataset.imagetype
				console.log(_this.imgData)
				// return false
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								console.log(image.width);
								console.log(image.height);
								console.log(image.width/image.height)
								if(image.width/image.height < 1){
									_this.$api.msg(`请上传横拍图片`, 2000);
									return false
								}			
								const imgParam = {
									path:res.tempFilePaths[0],
									shopid: _this.imgUser.shop_id,
									pshopid: _this.imgUser.pshop_id,
								}
								imgUpload(imgParam).then(resImg => {
									console.log('图片上传',resImg.data)
									_this.imgData.ImageUrl = resImg.data.LogMessage
									imgAdd(_this.imgData).then(resImgAdd => {
										console.log('图片添加',resImgAdd.data)
										const imgReturn = [{
											imgUrl: res.tempFilePaths[0],
											carpart: resImgAdd.data.Data.carpart
										}]
										console.log('图片类型', _this.imgData.ImageType)
										if(_this.imgData.ImageType == 101){ //基本图片
											if (_this.imgList.length != 0) {
												_this.imgList = _this.imgList.concat(imgReturn)
											} else {
												_this.imgList = imgReturn
											}
										}
										if(_this.imgData.ImageType == 0){ //证件图片
											if (_this.imgListPaper.length != 0) {
												_this.imgListPaper = _this.imgListPaper.concat(imgReturn)
											} else {
												_this.imgListPaper = imgReturn
											}
										}
										if(_this.imgData.ImageType != 101 && _this.imgData.ImageType != 0){ //评估图片
											if (_this.imgListOther.length != 0) {
												_this.imgListOther = _this.imgListOther.concat(imgReturn)
											} else {
												_this.imgListOther = imgReturn
											}
										}
										console.log('imlist', _this.imgList)
										_this.imgUpShow[resImgAdd.data.Data.carpart] = false
									}).catch(err => {
										_this.$api.msg(`图片添加失败,请刷新重试`);
									})
								}).catch(err => {
									_this.$api.msg(`图片上传失败,请刷新重试`);
								})
							}
						});
						// this.imgList = res.tempFilePaths
						/* console.log(res)
						console.log(res.tempFilePaths)
						console.log(JSON.stringify(res.tempFilePaths)); */
						/* */
					}
				});
			},
			confirmImg() { //预览上架
				console.log(this.imgData)
				console.log(this.imgList)
				if(this.imgList.length != 10){
					this.$api.msg(`请将车辆基本照片补充完整`, 3000);
				}else{
					this.$emit("goPreviewForm", this.imgData.Carid);
				}
				// 
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>
<style>
	.tStyle{
		display: flex; margin-top: 3.5em;
	}
</style>
<style lang='scss'>
	.cu-form-group {
		padding: 0px;
	}
	.nav .cu-item{
		height: auto;
	}
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.padding-xl {
	  padding: 10px;
	}
</style>
