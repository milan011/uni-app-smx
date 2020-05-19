<template>
	<view>
		<!-- 基本信息编辑Begin -->
		<view class="cu-form-group">
			<text class="cuIcon-require text-red"></text>
			<view class="title">VIN码</view>
			<input @blur="handlerVin" @input="vinChange" :disabled="isEdit"  v-model="carData.VIN" style="text-align: right;margin-right: 1em;"
			 placeholder="请扫描或输入VIN码" name="input"></input>
			<text v-if="!isEdit" @tap="scanVin" class='cuIcon-scan text-orange' style="font-size: x-large"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">车型</view>
			<input v-model="carData.FullName" style="text-align: right;" disabled placeholder="车型由您输入的VIN码确定" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">排量</view>
			<input v-model="carData.Capacity" style="text-align: right;" disabled placeholder="排量由您输入的VIN码确定" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">车辆类型</view>
			<picker @change="PickerChange" :value="Number(carData.CarType)" :range="carTypeConfig" range-key="name">
				<view class="picker">
					{{carTypeConfig[carData.CarType].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<text class="cuIcon-require text-red"></text>
			<view class="title">变速箱</view>
			<picker @change="PickerTransChange" :value="Number(carData.Transmission)" :range="transmissionConfig" range-key="name">
				<view class="picker">
					{{transmissionConfig[carData.Transmission].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">外观</view>
			<picker @change="PickerOutChange" :value="Number(carData.Out_color)" :range="outcolorConfig" range-key="name">
				<view class="picker">
					{{outcolorConfig[carData.Out_color].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">内饰</view>
			<picker @change="PickerInChange" :value="Number(carData.Inside_color)" :range="insidecolorConfig" range-key="name">
				<view class="picker">
					{{insidecolorConfig[carData.Inside_color].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">车险</view>
			<picker @change="PickerSafeChange" :value="Number(carData.Safe_type)" :range="safetypeConfig" range-key="name">
				<view class="picker">
					{{safetypeConfig[carData.Safe_type].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">过户次数</view>
			<picker @change="PickerSaleNumChange" :value="Number(carData.Sale_number)" :range="saleNumConfig" range-key="name">
				<view class="picker">
					{{saleNumConfig[carData.Sale_number].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">车辆用途</view>
			<picker @change="PickerCarUseChange" :value="Number(carData.CarUse)" :range="carUseConfig" range-key="name">
				<view class="picker">
					{{carUseConfig[carData.CarUse].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">使用条件</view>
			<picker @change="PickerUseconditionsChange" :value="Number(carData.Useconditions)" :range="useconditionsConfig" range-key="name">
				<view class="picker">
					{{useconditionsConfig[carData.Useconditions].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">维护保养</view>
			<picker @change="PickerMaintainingChange" :value="Number(carData.Maintaining)" :range="maintainingConfig" range-key="name">
				<view class="picker">
					{{maintainingConfig[carData.Maintaining].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<text class="cuIcon-require text-red"></text>
			<view class="title">上牌日期</view>
			<picker mode="date" :value="carData.BuyDate" :start="pickerStart" :end="pickerEnd" @change="DateChangePlate">
				<view class="picker">
					{{carData.BuyDate}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<text class="cuIcon-require text-red"></text>
			<view class="title">到捡日期</view>
			<picker mode="date" :value="carData.InspectionTime" :start="pickerStart" :end="pickerEnd" @change="DateChangeCheck">
				<view class="picker">
					{{carData.InspectionTime}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<text class="cuIcon-require text-red"></text>
			<view class="title">到保日期</view>
			<picker mode="date" :value="carData.Safe_end" :start="pickerStart" :end="pickerEnd" @change="DateChangeSafe">
				<view class="picker">
					{{carData.Safe_end}}
				</view>
			</picker>
		</view>
		<!-- #ifndef MP-ALIPAY -->
		<view class="cu-form-group">
			<view class="title">所属城市</view>
			<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray" range-key="name">
				<view v-if="isEdit" class="picker">
					{{multiArray[0][multiIndex[0]].name}}，{{carData.CityName}}
				</view>
				<view v-else class="picker">
					{{multiArray[0][multiIndex[0]].name}}，{{multiArray[1][multiIndex[1]].name}}
				</view>
			</picker>
		</view>
		<!-- #endif -->
		<view class="cu-form-group nu-style">
			<text class="cuIcon-require text-red"></text>
			<view class="title">行驶里程(万)</view>
			<input v-model="carData.Mileage" style="text-align: right;" type="number" placeholder="请输入行驶里程" name="input"></input>
			<text class='cuIcon-taxi text-orange' style="font-size: x-large"></text>
		</view>
		<view class="cu-form-group nu-style">
			<text class="cuIcon-require text-red"></text>
			<view class="title">期望底价(万)</view>
			<input v-model="carData.BasePrice" style="text-align: right;" type="number" placeholder="请输入期望价格" name="input"></input>
			<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
		</view>
		<view class="cu-form-group nu-style">
			<text class="cuIcon-require text-red"></text>
			<view class="title">期望高价(万)</view>
			<input v-model="carData.SaleAMT" style="text-align: right;" type="number" placeholder="请输入期望价格" name="input"></input>
			<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="carData.Description" maxlength="-1" :disabled="modalName!=null" @input="dsInput" placeholder="客户描述"></textarea>
		</view>
		<view class="cu-form-group margin-top">
			<textarea v-model="carData.XS_description" maxlength="-1" :disabled="modalName!=null" @input="xsInput" placeholder="销售描述"></textarea>
		</view> 
		<text class="mix-btn"  v-if="isEdit" @click="confirmInfo">提交修改</text>
		<text class="mix-btn" v-else @click="confirmInfo">添加图片</text>
		<!-- 基本信息编辑End -->
		<!-- vin码返回信息选择Begin -->
		<view class="cu-modal" :class="modalName=='vinChose'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in vinCarList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.psalename}}</view>
								<radio class="round" :class="vinCarCheck == index+''?'checked':''" :checked="vinCarCheck == index+''?true:false"
								 :value="index + ''">
								</radio>
							</label>
						</view>
					</view>
				</radio-group>
				<button class="cu-btn bg-green margin-left" @tap="carVinConf">确定</button>
			</view>
		</view>
		<!-- vin码返回信息选择End -->
		<!-- 手动输入车型 Begin -->
		<view style="z-index: 110;" class="cu-modal" :class="modalName=='Manual'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">车型输入</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view> 
				<view class="padding-xl">
					<view class="cu-form-group">
						<view class="title">品牌</view>
						<input v-model="manualData.brand" style="text-align: right;margin-right: 1em;" placeholder="奥迪" name="input"></input>
					</view>	
					<view class="cu-form-group">
						<view class="title">车系</view>
						<input v-model="manualData.category" style="text-align: right;margin-right: 1em;" placeholder="奥迪A4L" name="input"></input>
					</view>	
					<view class="cu-form-group">
						<view class="title">车型名称</view>
						<input v-model="manualData.name" style="text-align: right;margin-right: 1em;" placeholder="35 TFSI 时尚动感型 " name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">年款</view>
						<input v-model="manualData.year" style="text-align: right;margin-right: 1em;" placeholder="2020" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">排量</view>
						<input v-model="manualData.Transmission" style="text-align: right;margin-right: 1em;" placeholder="2.0L" name="input"></input>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="manualConf">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 手动输入车型 End -->
		<!-- 校验信息显示 Begin -->
		<view class="cu-modal" :class="modalName=='validateModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请您完善车型信息</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view> 
				<view class="padding-xl">
					<view class="padding bg-white">
						<view class="text-center text-orange"  v-for="(item,index) in validateInfo" :key="index">
							{{ item.message}}
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 校验信息显示 End -->
	</view>
</template>
<script>
	import {
		vinRepeatCheck,
		getCarInfoByWin,
		editCarInfo
	} from '@/api/carManage.js'
	import {
		transmissionConfig,
		carStatusConfig, 
		putOnStatusConfig, 
		carTypeConfig,
		insidecolorConfig,
		outcolorConfig,
		saleNumConfig,
		carUseConfig,
		useconditionsConfig,
		maintainingConfig,
		safetypeConfig, 
	} from '@/common/appConfig.js'
	import { getAllProvince, getCityByProvince } from '@/api/city.js'
	import '@/common/utils'
	import moment from 'moment' 
	export default {
		name: 'CarInfo',
		props: {
			title: {
				type: String,
				default: ''
			}, // 标题
		},
		data() {
			return {
				vinChanged: false,
				isEdit: false,
				vinCarList: [],
				vinCarCheck: '0',
				modalName: null,
				validateInfo: [],
				carStatusConfig:[],
				putOnStatusConfig: [],
				insidecolorConfig: [],
				outcolorConfig: [],
				safetypeConfig: [],
				saleNumConfig: [],
				transmissionConfig: [],
				carUseConfig: [],
				useconditionsConfig: [],
				maintainingConfig: [],
				carTypeConfig: [],
				pickerStart: '',
				pickerEnd: '',
				manualData: {
					brand: '',
					category: '',
					name: '',
					year: '',
					Transmission: '',
				},
				carData: {
					ID: '0',
					VIN: 'LFV2A2BS3F4590091',
					FullName: '',
					plevelid: '',
					Capacity: '',
					ProvenceId: 2,
					CityName: '北京',
					BasePrice: '',
					SaleAMT: '',
					Transmission: 0,
					CarType: 1,
					Out_color: 0,
					Inside_color: 0,
					MakeDate: '',
					BuyDate: '点击选择',
					Safe_end: '点击选择',
					InspectionTime: '点击选择',
					CarUse: 0,
					Useconditions: 0,
					Maintaining: 0,
					Area: '北京',
					Safe_type: 0,
					Mileage: '',
					Sale_number: 0,
					Description: '客户说',
					XS_description: '销售说',
					Customer_Id: null,
					CreateID: '',
					CreateName: '',
					Shop_Id: '',
					UserKind: '',
					CarModel: "",
					InitPrice: 0,
					Capacity: '',
					Factory: '',
					BuyPrice: 0,
				},
				multiArray: [
					[{id: 2, name:'北京'}],
					[{id: 52, name:'北京'}],
				],
				multiIndex: [0, 0],
			}
		},
		created() {
			this.carTypeConfig = carTypeConfig
			this.carStatusConfig = carStatusConfig
			this.putOnStatusConfig = putOnStatusConfig
			this.insidecolorConfig = insidecolorConfig
			this.outcolorConfig = outcolorConfig
			this.safetypeConfig = safetypeConfig
			this.transmissionConfig = transmissionConfig 
			this.saleNumConfig = saleNumConfig   
			this.carUseConfig = carUseConfig   
			this.useconditionsConfig = useconditionsConfig   
			this.maintainingConfig = maintainingConfig
			let nowTime = moment()
			/* this.datePlate = nowTime.format('YYYY-MM-DD')
			this.dateSafe = nowTime.format('YYYY-MM-DD')
			this.dateCheck = nowTime.format('YYYY-MM-DD') */
			this.pickerStart = moment().add(-20, 'y').format('YYYY-MM-DD')
			this.pickerEnd = moment().add(466, 'd').format('YYYY-MM-DD')
			this.getProvince()
			// console.log(this.carTypeConfig)
		},
		methods: {
			PickerChange(e) {//车辆类型选择
				// this.carTypeIndex = e.detail.value
				this.carData.CarType = e.detail.value
			},
			PickerTransChange(e){//变速箱选择
				// this.transIndex = e.detail.value
				this.carData.Transmission = e.detail.value
				console.log(this.carData.Transmission)
			},
			PickerOutChange(e){//车身颜色选择
				// this.outColorIndex = e.detail.value
				this.carData.Out_color = e.detail.value
			},
			PickerInChange(e){//内饰颜色选择
				// this.inColorIndex = e.detail.value
				this.carData.Inside_color = e.detail.value
			},
			PickerSafeChange(e){//保险类型选择
				// this.safeColorIndex = e.detail.value
				this.carData.Safe_type = e.detail.value
			},
			PickerSaleNumChange(e){//过户次数选择
				// this.saleNumIndex = e.detail.value
				this.carData.Sale_number = e.detail.value
			},
			PickerCarUseChange(e){//车辆用途选择
				// this.carUseIndex = e.detail.value
				this.carData.CarUse = e.detail.value
			},
			PickerUseconditionsChange(e){//使用条件选择
				// this.useconditionsIndex = e.detail.value
				this.carData.Useconditions = e.detail.value
			},
			PickerMaintainingChange(e){ //维修保养选择
				// this.maintainingIndex = e.detail.value
				this.carData.Maintaining = e.detail.value
			},
			dsInput(e) { //客户描述
				this.carData.Description = e.detail.value
			},
			xsInput(e) { //销售描述
				this.carData.XS_description = e.detail.value
			},
			scanVin() {
				console.log('gan jin sao  dddd')
			},
			vinChange() { //vin码有变动
				// console.log('狗子,你变了')
				this.vinChanged = true
			},
			handlerVin(event) {
				const vinCode = event.detail.value
				vinRepeatCheck(vinCode).then(res => {
					if (res.data.Data) {
						this.$api.msg(`您输入的vin码已存在`, 2000)
					} else {
						console.log('vin不存在', res.data)
						this.getCarByVin(vinCode)
					}
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			getCarByVin(vinCode) { //根据vin码获取车型信息
				// const vinCode = event.detail.value
				if (this.vinChanged) { //vin码有变化
					if (this.$utils.isRegVin(vinCode)) { //格式校验
						getCarInfoByWin(vinCode).then(res => {
							console.log(res)
							if (res.data.ResultType == 0) {
								this.vinCarList = res.data.Data
								this.vinCarCheck = '0'
								this.modalName = 'vinChose'
							} else {
								this.$api.msg(`您输入的vin码无对应车型,请重新输入或使用手动输入车型`, 2000);
								this.carData.FullName = ""
								setTimeout(() => {
									this.modalName = 'Manual'
								}, 2000)
							}
						}).catch(err => {
							this.$api.msg(`获取数据失败,请刷新重试`);
						})
					} else {
						console.log('VIN码必须是17位数字字母组成')
						this.carData.FullName = ""
						this.$api.msg(`VIN码必须是17位数字字母组成`, 7000);
					}
					this.vinChanged = false
				}
			},
			DateChangePlate(e) {
				this.datePlate = e.detail.value
				this.carData.BuyDate = e.detail.value
			},
			DateChangeCheck(e) {
				this.dateCheck = e.detail.value
				this.carData.InspectionTime = e.detail.value
			},
			DateChangeSafe(e) {
				this.dateSafe = e.detail.value
				this.carData.Safe_end = e.detail.value
			},
			confirmInfo() {
				console.log(this.carData)
				const checkValidate = this.$utils.carInfoLegitimate(this.carData)
				console.log('validate',checkValidate)
				if(checkValidate.validateType == false){ //校验失败
					this.validateInfo = checkValidate.validateInfo
					this.modalName = 'validateModal'
				}else{
					if(this.carData.Mileage > 200 || this.carData.BasePrice > 200 || this.carData.SaleAMT > 200){
						this.$api.msg(`您输入的里程或价格过高,请确认`, 3000);
					}
					editCarInfo(this.carData).then(res => {
						// console.log(res)
						if(res.data.ResultType == 0){
							this.$api.msg(res.data.Message);
							// this.imgData.Carid = res.data.Data.ID
							this.$emit("goImgForm", res.data.Data.ID);
						}else{
							this.$api.msg(`车源信息添加失败,请刷新重试`);
						}
					}).catch(err => {
						this.$api.msg(`车源信息添加失败,请刷新重试`);
					})
				}
				// this.customerEdit = false
				// this.$emit("goImgForm", 9247);
			},
			getProvince(){
				getAllProvince().then(res => {
					// console.log('省',res.data)
					this.multiArray[0] = res.data.Data
				}).catch(err => {
					this.$api.msg(`获取城市,请刷新重试`);
				})
			},
			getCitys(pid){
				this.multiArray[1] = []
				getCityByProvince(pid).then(res => {
					// console.log('市',res.data)
					this.multiArray[1] = res.data.Data
					this.multiIndex.splice(1, 0)
					// return res.data.Data
				}).catch(err => {
					this.$api.msg(`获取城市,请刷新重试`);
				})
			},
			carAreaDell(proveceId, cityId){ //编辑车源所属城市处理
			  var _this = this
				// console.log('嗯,我处理',proveceId,cityId)
				_this.multiArray[0].forEach((item,index)=>{ //遍历省份
					if(item.id == proveceId){
						_this.multiIndex[0] = index
						getCityByProvince(proveceId).then(res => {
							_this.multiArray[1] = res.data.Data
							// console.log(_this.multiArray)
							res.data.Data.forEach((ite,ind)=>{
								if(ite.id == cityId){
									_this.multiIndex[1] = ind
									// console.log(_this.multiIndex)
								}
							})
							/* this.multiArray[1] = res.data.Data
							this.multiIndex.splice(1, 0) */
							// return res.data.Data
						}).catch(err => {
							this.$api.msg(`获取城市,请刷新重试`);
						})
					}
				})
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				const choseInfo = e.detail.value 
				this.carData.ProvenceId = this.multiArray[0][choseInfo[0]].id
				this.carData.CityName = this.multiArray[1][choseInfo[1]].name
				this.carData.Area = this.multiArray[1][choseInfo[1]].id
				console.log(e.detail.value)
				console.log('省',this.multiArray[0][choseInfo[0]])
				console.log('市',this.multiArray[1][choseInfo[1]])
			},
			MultiColumnChange(e) {
			
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				const column = e.detail.column;
				const value = e.detail.value;
				const pid = this.multiArray[0][value].id
				console.log('哥,你滚了')
				console.log('column',column)
				console.log('value',value)
				console.log(this.multiArray[0][value])
				data.multiIndex[column] = value;
				switch (column) {
					case 0:
						/* switch (data.multiIndex[0]) {
							case 0:
								// console.log('你选了首都')
								this.multiArray[1] = ['北京'];
								break;
							case 1:
								// console.log('你选了河北省')
								this.multiArray[1] = ['石家庄', '保定', '唐山', '张家口'];
								break;
						} */
						// this.multiArray[1] = this.getCitys(pid)
						this.getCitys(pid)
						console.log(this.multiArray)
						// this.multiIndex.splice(1, 0)
						console.log('1',this.multiIndex)
						break;
				}
				/* this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
				console.log('2',this.multiIndex) */
			},
			manualConf(){ //手动输入车型
				console.log('手动输入',this.manualData)
				if(!this.manualData.category || !this.manualData.year || !this.manualData.Transmission || !this.manualData.name){
					this.$api.msg(`请填写完整信息`, 2000);
				}else{
					this.carData.FullName = this.manualData.category + ' ' + this.manualData.year + '款 ' + this.manualData.Transmission + ' ' + this.manualData.name
					this.carData.Capacity = this.manualData.Transmission
					this.carData.CarModel = this.manualData.category
					this.carData.Factory = this.manualData.brand
					this.modalName = null
				}			
			},
			RadioChange(e) {
				this.vinCarCheck = e.detail.value
				console.log(e.detail.value)
				console.log('choseCar', this.vinCarList[this.vinCarCheck])
			},
			carVinConf(e) {
				if(this.vinCarCheck == ''){
					this.$api.msg(`请选择车型`, 2000);
				}else{
					const carVinInfo = this.vinCarList[this.vinCarCheck]
					this.carData.FullName = carVinInfo.psalename
					this.carData.plevelid = carVinInfo.plevelid
					this.carData.Capacity = carVinInfo.pvolume
					this.carData.CarModel = carVinInfo.ptype
					this.carData.Factory = carVinInfo.pbrand
					this.carData.BuyPrice = carVinInfo.factoryprice
					this.carData.InitPrice = carVinInfo.factoryprice					
					this.modalName = null
				}	
			},
			hideModal(e) {
				this.modalName = null
			},
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-form-group {
		padding: 0px;
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
