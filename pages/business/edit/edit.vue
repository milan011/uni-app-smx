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
			<view class="cu-btn bg-red lg" style="margin: 30upx 0;" @tap="doDel">删除</view>
			<view class="cu-btn bg-green lg" @tap="distribution" data-target="RadioModal">分发</view>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in shopList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item.name}}</view>
								<radio class="round" :class="radio==item.name?'checked':''" :checked="radio==item.name?true:false"
								 :value="item.name"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		edit,
		del,
		getShopList,
		opporout
	} from '@/api/business.js'
	export default {
		data() {
			return {
				id: "",
				business: {
					name: '',
					mobile: "",
					category_name: "",
					city_name: "",
					provence_id: "",
					area: ""
				},
				modalName: null,
				radio: '',
				shopList:[],
				index:''
			};
		},
		onLoad(options) {
			this.id = options.id
			uni.getStorage({
				key: 'businessInfo',
				success: (res) => {
					this.business = res.data
				}
			})
			this.getshop()
		},
		methods: {
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
			doSave() {
				console.log(this.business)
				var reg = /^[1]([3-9])[0-9]{9}$/;
				if (this.business.name == "" || !reg.test(this.business.mobile) || this.business.category_name == '') {
					uni.showToast({
						title: '请输入必填项',
						icon: "none",
						duration: 1000
					});
					return false
				} else {
					edit({ ...this.business
					}).then(res => {
						uni.showToast({
							title: '修改成功',
							icon: 'none',
							duration: 1500
						})
						setTimeout(() => {
							uni.navigateTo({
								url: '../business'
							})
						}, 1500)
					})
				}
			},
			doDel() {
				let that = this
				uni.showModal({
					title: '是否删除?',
					content: '确定删除此条商机吗?注：删除后将无法恢复!',
					success: function(res) {
						if (res.confirm) {
							del({
								id: that.id
							}).then(res => {
								uni.showToast({
									title: '删除成功',
									icon: 'none',
									duration: 1500
								})
								setTimeout(() => {
									uni.navigateTo({
										url: '../business'
									})
								}, 1500)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			distribution(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			RadioChange(e) {
				this.radio = e.detail.value
				this.index = this.shopList.findIndex(ele=>ele.name==e.detail.value)
				opporout({shopid:this.shopList[this.index].id,oppors:this.id}).then(res=>{
					this.hideModal();
					uni.showToast({
						title:'分发成功',
						icon:'none',
						duration:1500
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '../business'
						})
					}, 1500)
				})
			},
			hideModal(e) {
				this.modalName = null
			},
			getshop() {
				let id = ''
				uni.getStorage({
					key: "userInfo",
					success: (res) => {
						id = res.data.shop_id
					}
				})
				getShopList({
					id
				}).then(res => {
					this.shopList = res.data.Data
					this.shopList.forEach(ele=>{
						if(ele.address == '元氏县'){
							ele.name = '元氏2店'
						}
					})
				})
			},

		}
	}
</script>

<style lang="scss">

</style>
