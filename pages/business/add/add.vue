<template>
	<view>
		<view class="cu-form-group margin-top">
			<text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text>
			<view class="title">客户姓名</view>
			<input placeholder="请输入客户姓名" name="input" v-model="business.name" @blur="verificationName"></input>
		</view>
		<view class="cu-form-group">
			<text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text>
			<view class="title">手机号码</view>
			<input placeholder="请输入客户手机号" name="input" v-model="business.mobile" @blur="verificationTel"></input>
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
			<text style="color: red;    line-height: 60upx;display: inline-block;padding-right: 10upx;">* &nbsp</text>
			<view class="title">汽车品牌</view>
			<input placeholder="请输入汽车品牌" name="input" v-model="business.category_name" @blur="verificationCarname"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">所属城市</view>
			<input placeholder="请输入所在城市" name="input" v-model="business.city_name"></input>
		</view>
		<view class="padding flex flex-direction">
			<view class="cu-btn bg-blue lg" @tap="doSave">确定</view>
		</view>
	</view>
</template>

<script>
	import {edit} from '@/api/business.js'
	export default {
		data() {
			return {
				business: {
					name: '',
					mobile: "",
					category_name:"",
					city_name:"",
					provence_id:"",
					area:""
				},
			}
		},
		methods:{
			verificationName(e) {
				if (e.detail.value == "") {
					uni.showToast({
						title: '请输入客户姓名',
						icon: "none",
						duration: 1000
					});
				}
			},
			verificationCarname(e) {
				if (e.detail.value == "") {
					uni.showToast({
						title: '请输入汽车品牌',
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
			doSave(){
				console.log(this.business)
				var reg = /^[1]([3-9])[0-9]{9}$/;
				if (this.business.name == "" || !reg.test(this.business.mobile) ||this.business.category_name == '') {
					uni.showToast({
						title: '请输入必填项',
						icon: "none",
						duration: 1000
					});
					return false
				} else {
					edit({...this.business}).then(res=>{
						uni.showToast({
							title:'新建成功',
							icon:'none',
							duration:1500
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'../business'
							})
						},1500)
					})
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
