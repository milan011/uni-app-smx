<template>
	<view >
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
			    <uni-collapse-item :showBage="true" title="疑似过火车">
						<uni-collapse style="padding:5px" accordion="true">
							<uni-collapse-item title="车身覆盖件">
			        <view style="padding: 30rpx;">
			          <view class="grid col-4 grid-square flex-sub">
			          	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			          		<image :src="imgList[0]" mode="aspectFill"></image>
			          		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			          			<text class='cuIcon-close'></text>
			          		</view>
			          	</view>
			          	<view class="solids" @tap="ChooseImage">
			          		<text class='cuIcon-cameraadd'></text>
			          	</view>
			          </view>
			        </view>
							</uni-collapse-item>
							<uni-collapse-item title="发动机舱">
							<view style="padding: 30rpx;">
							  <view class="grid col-4 grid-square flex-sub">
							  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
							  		<image :src="imgList[0]" mode="aspectFill"></image>
							  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							  			<text class='cuIcon-close'></text>
							  		</view>
							  	</view>
							  	<view class="solids" @tap="ChooseImage">
							  		<text class='cuIcon-cameraadd'></text>
							  	</view>
							  </view>
							</view>
							</uni-collapse-item>
							<uni-collapse-item title="保险盒">
							<view style="padding: 30rpx;">
							  <view class="grid col-4 grid-square flex-sub">
							  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
							  		<image :src="imgList[0]" mode="aspectFill"></image>
							  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							  			<text class='cuIcon-close'></text>
							  		</view>
							  	</view>
							  	<view class="solids" @tap="ChooseImage">
							  		<text class='cuIcon-cameraadd'></text>
							  	</view>
							  </view>
							</view>
							</uni-collapse-item>
							<uni-collapse-item title="排气管">
							<view style="padding: 30rpx;">
							  <view class="grid col-4 grid-square flex-sub">
							  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
							  		<image :src="imgList[0]" mode="aspectFill"></image>
							  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							  			<text class='cuIcon-close'></text>
							  		</view>
							  	</view>
							  	<view class="solids" @tap="ChooseImage">
							  		<text class='cuIcon-cameraadd'></text>
							  	</view>
							  </view>
							</view>
							</uni-collapse-item>
							<uni-collapse-item title="车辆门柱">
							<view style="padding: 30rpx;">
							  <view class="grid col-4 grid-square flex-sub">
							  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
							  		<image :src="imgList[0]" mode="aspectFill"></image>
							  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							  			<text class='cuIcon-close'></text>
							  		</view>
							  	</view>
							  	<view class="solids" @tap="ChooseImage">
							  		<text class='cuIcon-cameraadd'></text>
							  	</view>
							  </view>
							</view>
							</uni-collapse-item>
						</uni-collapse>
			    </uni-collapse-item>
			    <uni-collapse-item title="疑似过水车">
			      <uni-collapse style="padding:5px" accordion="true">
			      	<uni-collapse-item title="内饰">
			        <view style="padding: 30rpx;">
			          <view class="grid col-4 grid-square flex-sub">
			          	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			          		<image :src="imgList[0]" mode="aspectFill"></image>
			          		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			          			<text class='cuIcon-close'></text>
			          		</view>
			          	</view>
			          	<view class="solids" @tap="ChooseImage">
			          		<text class='cuIcon-cameraadd'></text>
			          	</view>
			          </view>
			        </view>
			      	</uni-collapse-item>
			      	<uni-collapse-item title="发动机舱">
			      	<view style="padding: 30rpx;">
			      	  <view class="grid col-4 grid-square flex-sub">
			      	  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			      	  		<image :src="imgList[0]" mode="aspectFill"></image>
			      	  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			      	  			<text class='cuIcon-close'></text>
			      	  		</view>
			      	  	</view>
			      	  	<view class="solids" @tap="ChooseImage">
			      	  		<text class='cuIcon-cameraadd'></text>
			      	  	</view>
			      	  </view>
			      	</view>
			      	</uni-collapse-item>
			      	<uni-collapse-item title="行李箱">
			      	<view style="padding: 30rpx;">
			      	  <view class="grid col-4 grid-square flex-sub">
			      	  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			      	  		<image :src="imgList[0]" mode="aspectFill"></image>
			      	  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			      	  			<text class='cuIcon-close'></text>
			      	  		</view>
			      	  	</view>
			      	  	<view class="solids" @tap="ChooseImage">
			      	  		<text class='cuIcon-cameraadd'></text>
			      	  	</view>
			      	  </view>
			      	</view>
			      	</uni-collapse-item>
			      	<uni-collapse-item title="底盘">
			      	<view style="padding: 30rpx;">
			      	  <view class="grid col-4 grid-square flex-sub">
			      	  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			      	  		<image :src="imgList[0]" mode="aspectFill"></image>
			      	  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			      	  			<text class='cuIcon-close'></text>
			      	  		</view>
			      	  	</view>
			      	  	<view class="solids" @tap="ChooseImage">
			      	  		<text class='cuIcon-cameraadd'></text>
			      	  	</view>
			      	  </view>
			      	</view>
			      	</uni-collapse-item>
			      </uni-collapse>
			    </uni-collapse-item>
			    <uni-collapse-item title="疑似重大事故车">
			      <uni-collapse style="padding:5px" accordion="true">
			      	<uni-collapse-item title="纵梁">
			        <view style="padding: 30rpx;">
			          <view class="grid col-4 grid-square flex-sub">
			          	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			          		<image :src="imgList[0]" mode="aspectFill"></image>
			          		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			          			<text class='cuIcon-close'></text>
			          		</view>
			          	</view>
			          	<view class="solids" @tap="ChooseImage">
			          		<text class='cuIcon-cameraadd'></text>
			          	</view>
			          </view>
			        </view>
			      	</uni-collapse-item>
			      	<uni-collapse-item title="横梁">
			      	<view style="padding: 30rpx;">
			      	  <view class="grid col-4 grid-square flex-sub">
			      	  	<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
			      	  		<image :src="imgList[0]" mode="aspectFill"></image>
			      	  		<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
			      	  			<text class='cuIcon-close'></text>
			      	  		</view>
			      	  	</view>
			      	  	<view class="solids" @tap="ChooseImage">
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
			<view v-if="TabCur==3" class="cu-bar bg-white solid-bottom">
				<view class="action" style="margin:0px">
					<text class="cuIcon-title text-orange "></text> 动态检查
				</view>
			</view>
			<text class="mix-btn" @click="confirmImg">预览上架</text>
		</view>
	</view>
</template>

<script>
	import { imgUpload, imgAdd, imgDelete, imgDeleteById } from '@/api/carManage.js'
	export default {
		name: 'CarImg',
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
				TabCur: 0,
				imgData: {
					ID: 0,
					Carid: null,
					ImageType: null,
					ImageUrl: '',
					carpart: '',
				},
				imgList: [],
				imgListPaper: [],
				imgListOther: [],
				imgListAsess: [],
				imgUser: {
					shop_id: '',
					pshop_id: '',
				},
			}
		},
		created(){

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
			ChooseImageOther(e){ //其他图片添加
				console.log(e.currentTarget.dataset.carpart)
				console.log(e.currentTarget.dataset.imagetype)
				this.imgData.carpart = e.currentTarget.dataset.carpart
				this.imgData.ImageType = e.currentTarget.dataset.imagetype
				// return false
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						const imgParam = {
							path:res.tempFilePaths[0],
							shopid: this.imgUser.shop_id,
							pshopid: this.imgUser.pshop_id,
						}
						imgUpload(imgParam).then(resImg => {
							console.log('图片上传',resImg.data)
							this.imgData.ImageUrl = resImg.data.LogMessage
							imgAdd(this.imgData).then(resImgAdd => {
								console.log('图片添加',resImgAdd.data)
								const imgReturn = [{
									imgUrl: res.tempFilePaths[0],
									carpart: resImgAdd.data.Data.carpart,
									id: resImgAdd.data.Data.id,
								}]
								console.log('图片类型', this.imgData.ImageType)
								if (this.imgListOther.length != 0) {
									this.imgListOther = this.imgListOther.concat(imgReturn)
								} else {
									this.imgListOther = imgReturn
								}
								console.log('imlist', this.imgListOther)
							}).catch(err => {
								this.$api.msg(`图片添加失败,请刷新重试`);
							})
						}).catch(err => {
							this.$api.msg(`图片上传失败,请刷新重试`);
						})
					}
				});
			}, 
			ChooseImage(e) {  //基本信息图片添加
				console.log(e.currentTarget.dataset.carpart)
				console.log(e.currentTarget.dataset.imagetype)
				this.imgData.carpart = e.currentTarget.dataset.carpart
				this.imgData.ImageType = e.currentTarget.dataset.imagetype
				console.log(this.imgData)
				// return false
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						/* if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						} */
						const imgParam = {
							path:res.tempFilePaths[0],
							shopid: this.imgUser.shop_id,
							pshopid: this.imgUser.pshop_id,
						}
						imgUpload(imgParam).then(resImg => {
							console.log('图片上传',resImg.data)
							this.imgData.ImageUrl = resImg.data.LogMessage
							imgAdd(this.imgData).then(resImgAdd => {
								console.log('图片添加',resImgAdd.data)
								const imgReturn = [{
									imgUrl: res.tempFilePaths[0],
									carpart: resImgAdd.data.Data.carpart
								}]
								console.log('图片类型', this.imgData.ImageType)
								if(this.imgData.ImageType == 101){ //基本图片
									if (this.imgList.length != 0) {
										this.imgList = this.imgList.concat(imgReturn)
									} else {
										this.imgList = imgReturn
									}
								}
								if(this.imgData.ImageType == 0){ //证件图片
									if (this.imgListPaper.length != 0) {
										this.imgListPaper = this.imgListPaper.concat(imgReturn)
									} else {
										this.imgListPaper = imgReturn
									}
								}
								if(this.imgData.ImageType != 101 && this.imgData.ImageType != 0){ //评估图片
									if (this.imgListOther.length != 0) {
										this.imgListOther = this.imgListOther.concat(imgReturn)
									} else {
										this.imgListOther = imgReturn
									}
								}
								console.log('imlist', this.imgList)
								this.imgUpShow[resImgAdd.data.Data.carpart] = false
							}).catch(err => {
								this.$api.msg(`图片添加失败,请刷新重试`);
							})
						}).catch(err => {
							this.$api.msg(`图片上传失败,请刷新重试`);
						})
						// this.imgList = res.tempFilePaths
						/* console.log(res)
						console.log(res.tempFilePaths)
						console.log(JSON.stringify(res.tempFilePaths)); */
						/* uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								console.log(image.width);
								console.log(image.height);
							}
						}); */
					}
				});
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
</style>
