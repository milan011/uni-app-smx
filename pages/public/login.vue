<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view v-if="isAuthor" class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input  
						:value="mobile" 
						placeholder="请输入用户名"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input  
						:value="password" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="showWxLog">	
			<button
				style="margin-top:10em;" 
				open-type="getUserInfo" 
				@getuserinfo="wxGetUserInfo" 
				withCredentials="true">
					微信授权获取用户信息
			</button>
		</view>
		<!-- #endif -->
		<view class="cu-load load-modal" v-if="loadModal">
			<!-- <view class="cuIcon-emojifill text-orange"></view> -->
			<image src="/static/load.png" mode="aspectFit"></image>
			<view class="gray-text">授权登陆中...</view>
		</view>
		<!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view> -->
	</view>
</template>

<script>
	import {  
        mapMutations  
    } from 'vuex';
	import { loginByUser, loginByWxCode, loginByUserWithCode } from '@/api/login.js'
	export default{
		data(){
			return {
				mobile: '',
				password: '',
				ifOnShow: false,
				isMpWeiXin: false,
				isAuthor: false,
				showWxLog: false,
				loadModal: false,
				logining: false
			}
		},
		onHide(){
		  console.log('this.ifOnShow=true')
		  this.ifOnShow = true
		},
		onShow() {
			var _this = this
			if(_this.ifOnShow){
				// #ifdef MP-WEIXIN
				  uni.getSetting({
				   success(res) {
				      console.log("授权：",res);
				     if (!res.authSetting['scope.userInfo']) {
				          //这里调用授权
				          console.log("当前未授权");
									_this.isAuthor = false
									_this.showWxLog = true
				     } else {
				          //用户已经授权过了
				          console.log("当前已授权");
									_this.isAuthor = true
				     }
				   }
				 })
				//#endif
			}
		},
		async onLoad(){
			var _this = this
			  // #ifdef MP-WEIXIN
			  uni.getSetting({
			   success(res) {
			     console.log("授权：",res);
			     if (!res.authSetting['scope.userInfo']) {
			          //这里调用授权
			          console.log("当前未授权");
								_this.isAuthor = false
								_this.showWxLog = true
			     } else {
			          //用户已经授权过了
			          console.log("当前已授权");
								_this.getUserWxCode().then(res=>{
									console.log('code',res)
									_this.loginWithWx(res)
								})
								// console.log('code', userCode)
								// _this.isAuthor = true
			     }
			   }
			 })
			//#endif
			// #ifndef MP-WEIXIN
			 _this.isAuthor = true
			//#endif
		},
		methods: {
			...mapMutations(['login']),
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			wxGetUserInfo(res){
				var _this = this
				console.log(res)
				if (!res.detail.iv) {
					uni.showToast({
						title: "您取消了授权,登录失败",
						icon: "none"
					});
					return false;
				}else{
					_this.getUserWxCode().then(res=>{
						console.log('code',res)
						_this.loginWithWx(res)
					})
				}
				console.log('-------用户授权，并获取用户基本信息和加密数据------')
				console.log(res.detail);
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			loginWithWx(code){
				var _this = this
				_this.loadModal = true
				console.log('微信授权登录',code)
				const sendData = { WxCode: code, AppId: uni.getAccountInfoSync().miniProgram.appId}
				/* const sendData = {
					UserPhone: this.mobile,
					NewPassword: this.password,
				}; */
				console.log(sendData)
				loginByWxCode(sendData).then(res=>{
					console.log('微信登录返回',res.data)
					if(res.data.ResultType == 0){ //登录成功
						console.log('微信Code登录成功?')
						_this.login(res.data.Data);
						uni.reLaunch({
							url: '/pages/user/user'
						});
					}else{ //登录失败,转用户名密码登录
						console.log('微信Code登录失败?')
						_this.isMpWeiXin = true
						_this.isAuthor = true
						_this.loadModal = false
					}
				})
			},
			async getUserWxCode(){ //获取微信授权用户code
			  var _this = this
				return new Promise(resolve=>{
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							console.log(loginRes);
							console.log(JSON.stringify(loginRes));
							console.log(JSON.stringify(loginRes.code));
							// let code = JSON.stringify(loginRes.code)
							// _this.loginWithWx(code)
							// _this.userWxCode = JSON.stringify(loginRes.code)
							// resolve(JSON.stringify(loginRes.code))
							resolve(loginRes.code)
							// console.log(loginRes.authResult);
							// 获取用户信息
							// uni.getUserInfo({
							// 	provider: 'weixin',
							// 	success: function(infoRes) {
							// 		console.log('wuser',infoRes)
							// 		console.log('用户昵称为：' + infoRes.userInfo.nickName);
							// 		console.log('用户Code为：' + JSON.stringify(infoRes.code));
							// 	},
							// 	fail:(res=>{
							// 			// 获取失败的去引导用户授权
							// 			console.log('亲,赶紧去授权')		
							// 			_this.isAuthor = false
							// 	})
							// });
						}
					})
				})
			},
			async toLogin(){
				var _this = this
				_this.logining = true;
				_this.loadModal = true
				const {mobile, password} = _this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
			 
				var sendData = {
					name: _this.mobile,
					NewPassword: _this.password,
				};
				if(_this.isMpWeiXin){ //用户名密码登录附带微信Code
					console.log('weix')
					/* _this.getUserWxCode().then(res=>{
						console.log('code',res)
						sendData.WxCode = res
					}) */
					sendData.WxCode = await _this.getUserWxCode()
					sendData.AppId =  uni.getAccountInfoSync().miniProgram.appId
					loginByUserWithCode(sendData).then(res => {
						console.log('微信登录了',res)
						if(res.data.ResultType === 0){ //登录成功
							_this.login(res.data.Data);
							// uni.navigateBack();
							uni.reLaunch({
								url: '/pages/user/user'
							});
						}else{ //登录失败
							_this.$api.msg(res.data.Message);
							_this.logining = false;
							_this.loadModal = false
						}
					}).catch(err => {
						_this.$api.msg('登录失败,请刷新后重试');
						_this.logining = false;
						_this.loadModal = false
					})
				}else{
					const sendData = {
						UserPhone: _this.mobile,
						NewPassword: _this.password,
					};
					loginByUser(sendData).then(res => {
						console.log('登录了',res)
						if(res.data.ResultType === 0){ //登录成功
							_this.login(res.data.Data);
							// uni.navigateBack();
							uni.reLaunch({
								url: '/pages/user/user'
							});
						}else{ //登录失败
							_this.$api.msg(res.data.Message);
							_this.logining = false;
							_this.loadModal = false
						}
					}).catch(err => {
						_this.$api.msg('登录失败,请刷新后重试');
						_this.logining = false;
						_this.loadModal = false
					})
				}
				console.log('登录信息',sendData)
				// const result = await _this.$api.json('userInfo');
				// return false
				
				/* if(result.status === 1){
					this.login(result.data);
          uni.navigateBack();  
				}else{
					this.$api.msg(result.msg);
					this.logining = false;
				} */
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
