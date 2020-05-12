<template>
	<view class="edit-main">
		<view class="cu-form-group margin-top">
			<text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text>
			<view class="title">客户姓名</view>
			<input placeholder="请输入客户姓名" name="input" v-model="userInfo.name" @blur="verificationName"></input>
		</view>
		<view class="cu-form-group">
			<text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text>
			<view class="title">手机号码</view>
			<input placeholder="请输入客户手机号" name="input" v-model="userInfo.telephone" @blur="verificationTel"></input>
			<view class="cu-capsule radius">
				<view class='cu-tag bg-blue '>
					+86
				</view>
				<view class="cu-tag line-blue">
					中国大陆
				</view>
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">客户来源</view>
			<picker @change="PickerChange" :value="userInfo.customer_res" v-model="userInfo.customer_res - 1" :range="picker">
				<view class="picker">
					{{userInfo.customer_res>=-1?picker[userInfo.customer_res]:'请选择客户来源'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">身份证</view>
			<input placeholder="请输入客户身份证号" name="input" v-model="userInfo.indentily_card" @blur="verificationId"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">Q Q 号</view>
			<input placeholder="请输入客户Q Q 号" name="input" v-model="userInfo.qq_number"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">微信号</view>
			<input placeholder="请输入客户微信号" name="input" v-model="userInfo.wx_number"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">详细地址</view>
			<input placeholder="请输入客户详细地址" name="input" v-model="userInfo.address"></input>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">备注</view>
			<textarea maxlength="-1" @input="textareaAInput" placeholder="请输入备注" v-model="userInfo.remark"></textarea>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="doSave">保存</button>
		</view>
	</view>
</template>
<script>
	import {
		editCustomer
	} from "@/api/user.js"
	export default {
		data() {
			return {
				userInfo: {
					name: "",
					telephone: "",
					address: "",
					indentily_card: "",
					qq_number: "",
					wx_number: "",
					remark: "",
					type: "",
					customer_res: -1, //客户来源
					creater_id: "1", //创建者id
					shopid: "1", //店id
					status: "1", //状态
					id: ""
				},
				// index: -1,
				picker: ["来电", "进店", "朋友介绍", "车商", "广告", "其他"],
				textareaAValue: "",

			};
		},
		onLoad(options) {
			console.log(options)
			this.userInfo.id = options.id
			let that = this
			uni.getStorage({
				key:"customer",
				success:function(res){
					that.userInfo.name = res.data.name
					that.userInfo.telephone = res.data.telephone
					that.userInfo.address = res.data.address
					that.userInfo.indentily_card = res.data.indentily_card
					that.userInfo.qq_number = res.data.qq_number
					that.userInfo.wx_number = res.data.wx_number
					that.userInfo.remark = res.data.remark
					that.userInfo.customer_res = res.data.customer_res
					that.userInfo.creater_id = res.data.creater_id
					that.userInfo.shopid = res.data.shop_id
					that.userInfo.status = res.data.status
				}
			})
		},
		methods: {
			PickerChange(e) {
				this.userInfo.customer_res = e.detail.value + 1
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			// 表单验证
			verificationName(e) {
				if (e.detail.value == "") {
					uni.showToast({
						title: '请输入客户姓名',
						icon: "none",
						duration: 1000
					});
				}
			},
			verificationTel(e) {
				var reg = /^[1]([3-9])[0-9]{9}$/;
				if (!reg.test(e.detail.value)) {
					uni.showToast({
						title: '请输入正确的客户手机号',
						icon: "none",
						duration: 1000
					});
				}
			},
			// 身份证验证
			verificationId(e) {
				let reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
				if (e.detail.value == "") {	
					return false
				} else if (!reg.test(e.detail.value)) {
					uni.showToast({
						title: '请输入正确的身份证号码	',
						icon: "none",
						duration: 1000
					});
				}
			},
			doSave() {
				var reg = /^[1]([3-9])[0-9]{9}$/;
				if (this.userInfo.name == "" || !reg.test(this.userInfo.telephone)) {
					uni.showToast({
						title: '请输入必填项',
						icon: "none",
						duration: 1000
					});
					return false
				} else {
					editCustomer({ ...this.userInfo
					}).then(res => {
						uni.showToast({
							title: '保存成功',
							duration: 1500
						});
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1500)
					})
					return false
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
