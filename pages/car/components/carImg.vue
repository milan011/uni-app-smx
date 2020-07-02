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
						<view class="cu-tag bg-red" @tap.stop="DelImg" data-imgtype="101" data-itype='N' :data-carpart="img.carpart">
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
						<view class="cu-tag bg-red" @tap.stop="DelImg" data-itype='P' data-imgtype="101" :data-carpart="img.carpart">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view v-if="imgUpShow['登记证书']" data-carpart="登记证书" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">登记证书</text>
					</view>
					<view v-if="imgUpShow['机动车行使证']" data-carpart="机动车行使证" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">行使证</text>
					</view>
					<view v-if="imgUpShow['身份证/营业执照']" data-carpart="身份证/营业执照" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">身份证</text>
					</view>
					<view v-if="imgUpShow['购车发票']" data-carpart="购车发票" data-imagetype="101" class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">购车发票</text>
					</view>
					<view v-if="imgUpShow['保险证明']" data-carpart="保险证明" data-imagetype="101" class="solids" @tap="ChooseImage">
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
						<uni-collapse-item v-for="(part,inde) in pgpro.part" :showBage="part.showBage"  :key="inde" :title="part.name">
							<view style="padding: 30rpx;">
								<view class="grid col-4 grid-square flex-sub">
									<view v-if="part.imagetype == img.ImageType" v-for="(img, ind) in imgListPgCurrentF" :key="ind" class="bg-img" @tap="ViewImage">
										<image :src="img.imgUrl" mode="aspectFill"></image>
										<view class="cu-tag bg-red" data-ipart="F" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="ind" :data-imgtype="img.ImageType">
											<text class='cuIcon-close'></text>
										</view>
									</view>
									<view class="solids" @tap="ChooseImagePg" data-ipart="F" :data-imagetype="part.imagetype">
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
						<uni-collapse-item v-for="(part,inde) in pgpro.part" :showBage="part.showBage" :key="inde" :title="part.name">
							<view style="padding: 30rpx;">
								<view class="grid col-4 grid-square flex-sub">
									<view v-if="part.imagetype == img.ImageType" v-for="(img, ind) in imgListPgCurrentJ" :key="ind" class="bg-img" @tap="ViewImage">
										<image :src="img.imgUrl" mode="aspectFill"></image>
										<view class="cu-tag bg-red" data-ipart="J" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="ind" :data-imgtype="img.ImageType">
											<text class='cuIcon-close'></text>
										</view>
									</view>
                  <view class="solids" @tap="ChooseImagePg" data-ipart="J" :data-imagetype="part.imagetype" >
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
				<uni-collapse-item v-for="(part,inde) in pgPartDConfig" :showBage="part.showBage" :key="inde" :title="part.name">
					<view style="padding: 30rpx;">
						<view class="grid col-4 grid-square flex-sub">
							<view v-if="part.imagetype == img.ImageType" v-for="(img, ind) in imgListPgCurrentD" :key="ind" class="bg-img" @tap="ViewImage">
								<image :src="img.imgUrl" mode="aspectFill"></image>
								<view class="cu-tag bg-red" data-ipart="D" @tap.stop="DelImgPg" :data-imgid="img.id" :data-index="ind" :data-imgtype="img.ImageType" data-part="pgPartDConfig">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids"  @tap="ChooseImagePg" data-ipart="D" :data-imagetype="part.imagetype">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>			
			<!-- 评估图片描述 Begin -->
			<view class="cu-modal" :class="modalName=='Comment'?'show':''">
				<view class="cu-dialog">
					<!-- <view class="bg-img" :style="{backgroundImage: 'url(' + pgBackImg + ')' }" style="height:200px"> -->
					<view class="bg-img" :style="{backgroundImage: 'url(' + imgUrlHost + pgBackImgTemp + ')' }" style="height:200px">
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<view class="padding-xl">
						<view class="cu-form-group margin-top">
							<uni-rate size="18" :value="imgPgData.ImageLevel" active-color="#565656" @change="rateChange"></uni-rate>
						</view>
						<view class="cu-form-group margin-top">
							<textarea v-if="modalName=='Comment'" style="text-align: left;" v-model="imgPgData.ImageContent" maxlength="-1" @input="dpInput" placeholder="点评描述">
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
			<!-- 评估图片描述 End -->
			<view class="cu-load load-modal" v-if="loadModal">
				<!-- <view class="cuIcon-emojifill text-orange"></view> -->
				<image src="/static/load.png" mode="aspectFit"></image>
				<view class="gray-text">图片上传中...</view>
			</view>
			<view class="padding flex flex-direction">
				<button v-if="isEdit" class="cu-btn bg-olive lg" @click="confirmImg">提交修改</button>
				<button v-else class="cu-btn bg-olive lg" @click="confirmImg">预览上架</button>	
			</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
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
					'机动车行使证': true,
					'身份证/营业执照': true,
					'购车发票': true,
					'保险证明': true,
				},
				loadModal: false,
				isEdit: false,
				imgPgPart: '',
				imgUrlHost: Config.img_url,
				modalName: null,
				pgPartFConfig: [],
				pgPartJConfig: [],
				pgPartDConfig: [],
				pgPartFTypeArr: [],
				pgPartJTypeArr: [],
				pgPartDTypeArr: [],
				TabCur: 0,
				isNotPg:true,
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
				pgBackImgTemp: '',
				imgList: [],
				imgListPaper: [],
				imgListOther: [],
				imgListAsess: [],
				imgPgList: [],
				imgListPgCurrentF: [],
				imgListPgCurrentJ: [],
				imgListPgCurrentD: [],
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
			this.pgImgInit()
		},
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
		},
		methods: {
			tabSelect(e) { //标签切换
				/* if(e.currentTarget.dataset.id == 3){
					this.isNotPg = false
				}else{
					this.isNotPg = true
				} */
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
							const itype = e.currentTarget.dataset.itype
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
									if(imgtype == 101){ 
										if(itype == 'N'){//基本图片
											this.imgList.splice(this.imgList.findIndex(item => item.carpart === param.carpart), 1)
										}
										if(itype == 'P'){//证件图片
											this.imgListPaper.splice(this.imgListPaper.findIndex(item => item.carpart === param.carpart), 1)
										}	
									}
									if(imgtype == 0){ //其他
										this.imgListOther.splice(this.imgListOther.findIndex(item => item.carpart === param.carpart), 1)
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
			pgImgInit(){ //评估部位初始化
				var _this = this
				_this.pgPartDConfig.forEach((ele, ind) => {
					// console.log(ele)
					_this.pgPartDTypeArr.push(ele.imagetype)
				})
				_this.pgPartFConfig.forEach((ele, ind) => {
					// console.log(ele)
					ele.part.forEach((el, i) => {
						_this.pgPartFTypeArr.push(el.imagetype)
					})			
				})
				_this.pgPartJConfig.forEach((ele, ind) => {
					// console.log(ele)
					ele.part.forEach((el, i) => {
						_this.pgPartJTypeArr.push(el.imagetype)
					})			
				})
				// console.log('非常规部位',_this.pgPartFTypeArr)
				// console.log('静态部位',_this.pgPartJTypeArr)
				// console.log('动态部位',_this.pgPartDTypeArr)
			},
			imgPgDell(){ //评估图片处理
				var _this = this
				console.log('评估图片', _this.imgPgList)
				_this.imgPgList.forEach((ele,index) => {
					if(_this.pgPartDTypeArr.indexOf(ele.imagetype) > -1){
						_this.imgListPgCurrentD.push(ele)
						_this.pgPartDConfig.forEach((e,i)=>{
							if(e.imagetype == ele.imagetype ){
								e.showBage = true
							}
						})
					}
					if(_this.pgPartFTypeArr.indexOf(ele.imagetype) > -1){
						_this.imgListPgCurrentF.push(ele)
						_this.pgPartFConfig.forEach((el,ind)=>{
							el.part.forEach((e,i)=>{
								if(e.imagetype == ele.imagetype ){
									el.showBage = true
									e.showBage = true
								}
							})		
						})
					}
					if(_this.pgPartJTypeArr.indexOf(ele.imagetype) > -1){
						_this.imgListPgCurrentJ.push(ele)
						_this.pgPartJConfig.forEach((el,ind)=>{
							el.part.forEach((e,i)=>{
								if(e.imagetype == ele.imagetype ){
									el.showBage = true
									e.showBage = true
								}
							})		
						})
					}
				})
			},
			DelImgPg(e) { //评估图片删除
				var _this = this
				_this.imgPgPart = e.currentTarget.dataset.ipart //类型(非常规,静态,动态)
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
							console.log(imgIndex)
							// const imgPart = e.currentTarget.dataset.pgPartDConfig 
							imgDeleteById(imgId).then(res => {
								if(res.data.ResultType === 0){
									if(_this.imgPgPart == 'F'){ //非常规
										this.imgListPgCurrentF.splice(imgIndex, 1)
										_this.showBageDell('F')
										
									}
									if(_this.imgPgPart == 'D'){ //动态
										this.imgListPgCurrentD.splice(imgIndex, 1)
										_this.showBageDell('D')
									}
									if(_this.imgPgPart == 'J'){ //静态
										this.imgListPgCurrentJ.splice(imgIndex, 1)
										_this.showBageDell('J')
									}
									// console.log(this.imgListPgCurrent)
									/* _this.imgPgList = _this.imgListPgCurrentJ.concat(_this.imgListPgCurrentF, _this.imgListPgCurrentD)
									_this.imgPgDell() */
								}else{
									this.$api.msg(`图片删除失败,请刷新重试`);
								}
							}).catch(err => {
								console.log('err', err)
								this.$api.msg(`图片删除失败,请刷新重试`);
							})
						}
					}
				})
			},
			showBageDell(part){
				var _this = this
				if(part == 'D'){ //动态检查
					// _this.imgListPgCurrentD //剩余动态图片
					// _this.pgPartDConfig     //动态评估配置项
					if(_this.imgListPgCurrentD.length == 0 ){ //无动态评估图片,所有项红点均隐藏
						_this.pgPartDConfig.forEach(ele=>{
							ele.showBage = false
						})
					}else{
						let ilist = [] //剩余动态图片包含的imageType
						_this.imgListPgCurrentD.forEach(ele=>{
							ilist.push(ele.ImageType)  
						})
						console.log('剩余type', ilist)
						_this.pgPartDConfig.forEach(ele=>{
							console.log(ele)
							if(ilist.indexOf(ele.imagetype) > -1){
								console.log('就你了',ele)
								ele.showBage = true
							}else{
								ele.showBage = false
							}
						})
					}
				}
				if(part == 'J'){ //静态检查
					if(_this.imgListPgCurrentJ.length == 0 ){ //无动态评估图片,所有项红点均隐藏
						_this.pgPartJConfig.forEach(ele=>{
							ele.showBage = false
							ele.part.forEach(el=>{
								el.showBage = false
							})
						})
					}else{
						let ilist = [] //剩余动态图片包含的imageType
						_this.imgListPgCurrentJ.forEach(ele=>{
							ilist.push(ele.ImageType)  
						})
						console.log('剩余type', ilist)
						_this.pgPartJConfig.forEach(ele=>{
							var stillHave = false
							ele.part.forEach(el=>{
								if(ilist.indexOf(el.imagetype) > -1){
									console.log('就你了',el)
									el.showBage = true
									stillHave = true
								}else{
									el.showBage = false
								}
							})	
							ele.showBage = stillHave
						})
					}
				}
				if(part == 'F'){ //非常规检查
					if(_this.imgListPgCurrentF.length == 0 ){ //无动态评估图片,所有项红点均隐藏
						_this.pgPartFConfig.forEach(ele=>{
							ele.showBage = false
							ele.part.forEach(el=>{
								el.showBage = false
							})
						})
					}else{
						let ilist = [] //剩余动态图片包含的imageType
						_this.imgListPgCurrentF.forEach(ele=>{
							ilist.push(ele.ImageType)  
						})
						console.log('剩余type', ilist)
						_this.pgPartFConfig.forEach(ele=>{
							var stillHave = false
							ele.part.forEach(el=>{
								if(ilist.indexOf(el.imagetype) > -1){
									console.log('就你了',el)
									el.showBage = true
									stillHave = true
								}else{
									el.showBage = false
								}
							})	
							ele.showBage = stillHave
						})
					}
				}
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
				_this.imgPgData.ImageType = e.currentTarget.dataset.imagetype  //部位
				_this.imgPgPart = e.currentTarget.dataset.ipart //类型(非常规,静态,动态)
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
									_this.loadModal = false
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
									_this.pgBackImgTemp = resImg.data.LogMessage
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
				console.log('评估类型',_this.imgPgPart)
				if(!_this.imgPgData.ImageContent){
					_this.$api.msg(`请填写描述`);
					return false
				}
				_this.loadModal = true
				imgAdd(_this.imgPgData).then(resImgAdd => {
					console.log('图片添加',resImgAdd.data)
					const imgReturn = [{
						imgUrl: _this.pgBackImg,
						carpart: resImgAdd.data.Data.carpart,
						id: resImgAdd.data.Data.id,
						ImageType: resImgAdd.data.Data.imagetype
					}]
					// console.log('图片类型', _this.imgPgData.ImageType)
					if (_this.imgPgPart == 'D') { //动态检查
						if(_this.imgListPgCurrentD.length != 0){
							_this.imgListPgCurrentD = _this.imgListPgCurrentD.concat(imgReturn)
						}else{
							_this.imgListPgCurrentD = imgReturn
						}			
					}
					if (_this.imgPgPart == 'J') { //静态检查
						if(_this.imgListPgCurrentJ.length != 0){
							_this.imgListPgCurrentJ = _this.imgListPgCurrentJ.concat(imgReturn)
						}else{
							_this.imgListPgCurrentJ = imgReturn
						}			
					}
					if (_this.imgPgPart == 'F') { //非常规检查
						if(_this.imgListPgCurrentF.length != 0){
							_this.imgListPgCurrentF = _this.imgListPgCurrentF.concat(imgReturn)
						}else{
							_this.imgListPgCurrentF = imgReturn
						}			
					}
					/* console.log('动态', _this.imgListPgCurrentD)
					console.log('静态', _this.imgListPgCurrentJ)
					console.log('非常态', _this.imgListPgCurrentF) */
					//根据添加到评估部位确定showBage状态
					_this.showBageDel(imgReturn[0].ImageType)
					_this.loadModal = false
					_this.modalName = null
				}).catch(err => {
					console.log('err=>',err)
					_this.modalName = null
					_this.loadModal = false
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
						_this.loadModal = true
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								if(image.width/image.height < 1){
									_this.loadModal = false
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
										_this.loadModal = false
									}).catch(err => {
										console.log('1',err)
										_this.loadModal = false
										_this.$api.msg(`图片添加失败,请刷新重试`);
									})
								}).catch(err => {
									// console.log('2',err)
									_this.loadModal = false
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
						_this.loadModal = true
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								console.log(image.width);
								console.log(image.height);
								console.log(image.width/image.height)
								if(image.width/image.height < 1){
									_this.loadModal = false
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
										const paperPart = ['登记证书','机动车行使证','身份证/营业执照','购车发票','保险证明']
										console.log('部位',imgReturn[0].carpart)
										console.log(paperPart.indexOf(imgReturn[0].carpart))
										if(paperPart.indexOf(imgReturn[0].carpart) > -1){
											//证件图片
											console.log('添加了证件')
											if (_this.imgListPaper.length != 0) {
												_this.imgListPaper = _this.imgListPaper.concat(imgReturn)
											} else {
												_this.imgListPaper = imgReturn
											}
										}else{	
											console.log('添加了基本图片')
											if (_this.imgList.length != 0) {
												_this.imgList = _this.imgList.concat(imgReturn)
											} else {
												_this.imgList = imgReturn
											}
										}
										console.log('图片类型', _this.imgData.ImageType)
										console.log('imlist', _this.imgList)
										_this.imgUpShow[resImgAdd.data.Data.carpart] = false
										_this.loadModal = false
									}).catch(err => {
										_this.$api.msg(`图片添加失败,请刷新重试`);
										_this.loadModal = false
									})
								}).catch(err => {
									_this.$api.msg(`图片上传失败,请刷新重试`);
									_this.loadModal = false
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
				var _this = this
				console.log(_this.imgData)
				console.log(_this.imgList)
				if(_this.imgList.length != 10){
					_this.$api.msg(`请将车辆基本照片补充完整`, 3000);
				}else{
					_this.$emit("goPreviewForm", _this.imgData.Carid);
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
		margin: 10upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		position: relative;
		z-index: 9999;
	}
	.btn{
		position: fixed;
		left: 0;
		bottom: 40upx;
		z-index: 999;
		width: 100%;
	}
	.padding-xl {
	  padding: 10px;
	}
</style>
