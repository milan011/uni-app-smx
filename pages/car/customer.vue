<template>
	<view class="app">
		<!-- 步骤条Begin -->
		<view class="price-box">
			<view class="bg-white padding" style="width:100%">
				<view class="cu-steps">
					<view class="cu-item" :class="index>basics?'':'text-green'" v-for="(item,index) in basicsList" :key="index">
						<text :class="'cuIcon-' + item.cuIcon"></text> {{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 步骤条End -->
		<!-- 客户信息编辑Begin -->
		<view v-show="customerEdit" class="pay-type-list">
			<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="customerform" :model="customer">
				<evan-form-item label="姓名：" prop="name">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.name" placeholder="请输入姓名" />
				</evan-form-item>
				<evan-form-item label="手机号：" prop="telephone">
					<input class="form-input" placeholder-class="form-input-placeholder" v-model="customer.telephone" placeholder="请输入手机号" />
				</evan-form-item>
			</evan-form>
			<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
			<text class="mix-btn" @click="confirmCustomer">添加基本信息</text>
		</view>
		<!-- 客户信息编辑End -->
		<!-- 基本信息编辑Begin -->
		<view v-show="carInfoEdit" class="pay-type-list" style="padding: 0px 60upx">
			<view class="cu-form-group">
				<view class="title">VIN码</view>
				<input @blur="getCarByVin" @input="vinChange" v-model="carData.VIN" style="text-align: right;margin-right: 1em;" placeholder="请扫描或输入VIN码" name="input"></input>
				<text @tap="scanVin" class='cuIcon-scan text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group">
				<view class="title">车型</view>
				<input style="text-align: right;" disabled placeholder="车型由您输入的VIN码确定" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车辆类型</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">排量</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">变速箱</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">外观</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">内饰</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">车险</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">上牌日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到捡日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">到保日期</view>
				<picker mode="date" :value="date" start="2015-09" end="2020-09" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="cu-form-group">
				<view class="title">所属城市</view>
				<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
					<view class="picker">
						{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
					</view>
				</picker>
			</view>
			<!-- #endif -->
			<view class="cu-form-group">
				<view class="title">过户次数</view>
				<picker @change="PickerChange" :value="carTypeIndex" :range="carType">
					<view class="picker">
						{{carTypeIndex>-1?carType[carTypeIndex]:'请选择车辆类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group nu-style">
				<view class="title">期望价格</view>
				<input style="text-align: right;" placeholder="请输入期望价格" name="input"></input>
				<text class='cuIcon-moneybag text-orange' style="font-size: x-large"></text>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="客户描述"></textarea>
			</view>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="销售描述"></textarea>
			</view>
			<!-- <button @click="save" class="evan-form-show__button">保存</button>
					<button @click="utilsSave" class="evan-form-show__button">直接调用utils验证</button>
					<button @click="validateSingle" class="evan-form-show__button">只验证邮箱</button>
					<button @click="validateMultiple" class="evan-form-show__button">只验证邮箱和手机号</button>
					<button @click="hideReqired" class="evan-form-show__button">{{hideRequiredAsterisk?'显示':'隐藏'}}*号</button> -->
			<text class="mix-btn" @click="confirmInfo">添加图片</text>
		</view>
		<!-- 基本信息编辑End -->
		<!-- 车源图片编辑Begin -->
		<view v-show="carImgEdit" class="pay-type-list" style="padding: 0px 60upx">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
				<view class="cu-item flex-sub" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
					<!-- <text class="cuIcon-edit"></text> -->
					<view class="text">车辆</view>
				</view>
				<view class="cu-item flex-sub" :class="1==TabCur?'text-green cur':''" @tap="tabSelect" data-id="1">
					<!-- <text class="cuIcon-shop"></text> -->
					<view class="text">证件</view>
				</view>
				<view class="cu-item flex-sub" :class="2==TabCur?'text-green cur':''" @tap="tabSelect" data-id="2">
					<!-- <text class="cuIcon-cardboard"></text> -->
					<view class="text">其他</view>
				</view>
				<view class="cu-item flex-sub" :class="3==TabCur?'text-green cur':''" @tap="tabSelect" data-id="3">
					<!-- <text class="cuIcon-group_fill"></text> -->
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
					<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
						<image :src="imgList[0]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">正 面</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<view class='tStyle' style="margin-left: 0.5em;"><text>左前45度</text></view>	
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">左后45度</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">发动机舱</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">仪 表</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1.5em;">内 饰</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">后备箱</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">右前45度</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">右后45度</text>
					</view>
					<view class="solids" @tap="ChooseImage">
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
					<view v-if="imgList[0]" class="bg-img" @tap="ViewImage" :data-url="imgList[0]">
						<image :src="imgList[0]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="0">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">登记证书</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">行使证</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 1em;">身份证</text>
					</view>
					<view class="solids" @tap="ChooseImage">
						<text class='cuIcon-cameraadd'></text>
						<text class='tStyle' style="margin-left: 0.5em;">购车发票</text>
					</view>
					<view class="solids" @tap="ChooseImage">
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

		<!-- 车源图片编辑End -->
		<!-- vin码返回信息选择Begin -->
		<view class="cu-modal" :class="modalName=='vinChose'?'show':''" @tap="hideModal">
					<view class="cu-dialog" @tap.stop="">
						<radio-group class="block" @change="RadioChange">
							<view class="cu-list menu text-left">
								<view class="cu-item" v-for="(item,index) in vinCarList" :key="index">
									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">{{item.psalename}}</view>
										<radio class="round" :class="radio=='radio' + index?'checked':''" :checked="radio=='radio' + index?true:false"
										 :value="'radio' + index"></radio>
									</label>
								</view>
							</view>
						</radio-group>
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
		<!-- vin码返回信息选择End -->
	</view>
</template>

<script>
	import { createCustomer } from '@/api/user.js'
	import { vinRepeatCheck, getCarInfoByWin } from '@/api/carManage.js'
	import EvanForm from '@/components/evan-form/evan-form.vue'
	import EvanFormItem from '@/components/evan-form/evan-form-item.vue'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	// import utils from '@/components/evan-form/utils.js'
	import '@/common/utils'
	export default {
		components: {
			EvanForm,
			EvanFormItem,
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				payType: 1,
				orderInfo: {},
				hideRequiredAsterisk: false,
				customerEdit: true,
				carInfoEdit: false,
				carImgEdit: false,
				carTypeIndex: -1,
				carType: ['轿车', 'SUV', '客车'],
				date: '2018-12-25',
				modalName: null,
				textareaAValue: '',
				imgList: [],
				TabCur: 0,
				currentUser: null,
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '录像'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '图像'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '排行榜'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '皮肤'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '发现'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				multiArray: [
					['北京', '河北'],
					['北京'],
					// ['猪肉绦虫', '吸血虫']
				],
				objectMultiArray: [
					[{
							id: 0,
							name: '北京'
						},
						{
							id: 1,
							name: '河北'
						}
					],
					[{
							id: 0,
							name: '北京'
						},
						{
							id: 1,
							name: '石家庄'
						},
						{
							id: 2,
							name: '保定'
						},
						{
							id: 3,
							name: '唐山'
						},
						{
							id: 4,
							name: '张家口'
						}
					]
				],
				multiIndex: [0, 0],
				basicsList: [{
					cuIcon: 'people',
					name: '客户信息'
				}, {
					cuIcon: 'edit',
					name: '基本信息'
				}, {
					cuIcon: 'picfill',
					name: '车源图片'
				}, {
					cuIcon: 'roundcheckfill',
					name: '完成'
				}, ],
				basics: 0,
				// 表单的内容必须初始化
				customer: {
					id: null,
					name: 'wcg',
					telephone: '13731080174',
					creater_id: null,
					customer_res: 1,
					shop_id: null,
				},
				vinChanged:false,
				vinCarList: [],
				carData: {
					VIN: 'sss',
					/* : ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: ,
					: , */
				},
				rules: {
					name: {
						required: true,
						message: '请输入姓名'
					},
					telephone: [{
							required: true,
							message: '请输入手机号'
						},
						/* {
							validator: (rule, value, callback) => {
								// 注意这里如果用的是methods里的isMobilePhone将不生效
								if (this.$utils.isMobilePhone(value)) {
									callback()
								} else {
									callback(new Error('手机号格式不正确'))
								}
							}
						}, */
						// 或者这样也是可以的
						{
							validator: this.isMobile
						}
					],
				}
			};
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.customerform.setRules(this.rules)
			// this.resetCustomer()
			console.log(Math.pow(1.06, 10))
		},
		computed: {

		},
		onLoad(options) {
			this.currentUser = uni.getStorageSync('userInfo') || '';
			this.customer.creater_id = this.currentUser.id
			this.customer.shop_id = this.currentUser.shopId
			this.customer.id = null
			console.log('currentUser', this.currentUser)
		},

		methods: {
			BasicsSteps() {
				this.basics = this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1
			},
			scanVin() {
				console.log('gan jin sao')
			},
			PickerChange(e) {
				this.carTypeIndex = e.detail.value
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			tabSelect(e) { //标签切换
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //从相册选择
					success: (res) => {
						/* if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						} */
						this.imgList = res.tempFilePaths
						console.log(res)
						console.log(res.tempFilePaths)
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								console.log(image.width);
								console.log(image.height);
							}
						});
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			MultiColumnChange(e) {

				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				const column = e.detail.column;
				const value = e.detail.value;
				/* console.log('哥,你滚了')
				console.log('column',column)
				console.log('value',value) */
				data.multiIndex[column] = value;
				switch (column) {
					case 0:
						switch (data.multiIndex[0]) {
							case 0:
								// console.log('你选了首都')
								this.multiArray[1] = ['北京'];
								break;
							case 1:
								// console.log('你选了河北省')
								this.multiArray[1] = ['石家庄', '保定', '唐山', '张家口'];
								break;
						}
						this.multiIndex.splice(1, 0)
						// console.log('你咋不选')
						break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			resetCustomer(){
				this.customer = {
					id: null,
					name: '',
					telephone: '',
					creater_id: null,
					customer_res: 1,
					shop_id: null,
				}
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			vinFocus(event){
				console.log(event.detail)
			},
			vinChange(){ //vin码有变动
				// console.log('狗子,你变了')
				this.vinChanged = true
			},
			getCarByVin(event){ //根据vin码获取车型信息	
				const vinCode = event.detail.value
				if(this.vinChanged){ //vin码有变化
					if (this.$utils.isRegVin(vinCode)) { //格式校验
						console.log(vinCode)
						if(this.isVinRepeat(vinCode)){ //vin码是否在平台上已存在
							console.log('VIN码已被使用')
						}else{
							console.log('VIN码未被使用')
							getCarInfoByWin(vinCode).then(res => {
								console.log(res)
								this.vinCarList = res.data.Data
								this.modalName = 'vinChose'
							}).catch(err => {
								this.$api.msg(`获取数据失败,请刷新重试`);
							})
						}
					} else {
						console.log('VIN码必须是17位数字字母组成')
						this.$api.msg(`VIN码必须是17位数字字母组成`, 7000);
					}
					this.vinChanged = false
				}	
			},
			isVinRepeat(vinCode){ //Vin码是否重复
				vinRepeatCheck(vinCode).then(res => {
					console.log(res)
					if(res.Data == true){
						return true
					}else{
						return false
					}
				}).catch(err => {
					this.$api.msg(`获取数据失败,请刷新重试`);
				})
			},
			confirmCustomer() {
				this.$refs.customerform.validate((valid) => {
					if (valid) {
						createCustomer(this.customer).then(res => {
							console.log('customer',res.data)
							this.customer = res.data.Data
							this.customerEdit = false
							this.carInfoEdit = true
							this.basics = 1
						}).catch(err => {
							this.$api.msg(`获取数据失败,请刷新重试`);
						})
						
					}
				})
			},
			confirmInfo() {
				this.customerEdit = false
				this.carInfoEdit = false
				this.carImgEdit = true
				this.basics = 2
			},
			confirmImg() {

			},
			isMobile(rule, value, callback) {
				if (this.$utils.isMobilePhone(value)) {
					callback()
				} else {
					callback(new Error('手机号格式不正确'))
				}
			},
		}
	}
</script>
<style>
	.nu-style /deep/ .uni-numbox {
		width: 60%;
	}

	.nu-style /deep/ .uni-numbox__value {
		border: none;
		text-align: right;
	}	
	.tStyle{
		display: flex; margin-top: 3.5em;
	}
</style>
<style lang='scss'>
	.app {
		width: 100%;
	}

	.cu-form-group {
		padding: 0px;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 0upx;
		background-color: #fff;
		padding: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
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

	.evan-form-show {
		padding: 0 30rpx;
		background-color: #fff;

		.form-input {
			font-size: 28rpx;
			color: #333;
			text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;

			&.textarea {
				height: 240rpx;
				padding: 24rpx 0;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2D87D5;

			&::before,
			&::after {
				border: none;
			}
		}

		.customize-form-item {
			&__label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
			}

			&__radio {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&__text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
</style>
