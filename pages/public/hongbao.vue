<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				密码生成器
			</view>
			<!-- <activity android:name="io.dcloud.PandoraEntry"
				android:configChanges="orientation|keyboardHidden|keyboard|navigation"
				android:label="@string/app_name"
				android:launchMode="singleTask"
				android:hardwareAccelerated="true"
				android:theme="@style/TranslucentTheme"
				android:screenOrientation="user"     
				android:windowSoftInputMode="adjustResize">      
				<intent-filter>          
					<action android:name="android.intent.action.MAIN" />          
					<category android:name="android.intent.category.LAUNCHER" />     
				</intent-filter>  
			</activity>  
			<activity android:name="io.dcloud.PandoraEntryActivity"
				android:launchMode="singleTask"
				android:configChanges="orientation|keyboardHidden|screenSize|mcc|mnc|fontScale|keyboard"      
				android:hardwareAccelerated="true"
				android:permission="com.miui.securitycenter.permission.AppPermissionsEditor"
				android:screenOrientation="user"
				android:theme="@style/DCloudTheme"
				android:windowSoftInputMode="adjustResize">
				<intent-filter>          
					<category android:name="android.intent.category.DEFAULT" />      
					<category android:name="android.intent.category.BROWSABLE" />
					<action android:name="android.intent.action.VIEW" />          
					<data android:scheme="h56131bcf" />      
				</intent-filter>  
			</activity> -->
			<helang-checkbox style="height:auto" ref="checkbox" @change="valueChange"></helang-checkbox>
			<view class="input-content">
				<!-- <view class="input-item">
					<text class="tit">所用字符</text>
					<input :value="totalAmount" placeholder="" type="number" maxlength="11" @input="inputChange" data-key="totalAmount" />			 
				</view> -->
				<view class="input-item">
					<text class="tit">密码长度</text>
					<picker style="width:100%" @change="passLengthChange" :value="passIndex" :range="passLength">
						<view class="uni-input">{{passLength[passIndex]}}</view>
					</picker>
				</view>
				<view class="input-item">
					<text class="tit">生成数量</text>
					<input :value="passNumber" placeholder="" type="number" maxlength="11" data-key="passNumber" @input="inputChange" />
				</view>
				<view class="cu-form-group margin-top">
					<textarea v-model="passResult" disabled="true" maxlength="-1" placeholder="生成结果"></textarea>
				</view> 
				<!-- <view class="input-item">
					<text class="tit">生成结果</text>
					<textarea v-model="passResult" maxlength="-1"  placeholder="生成结果"></textarea>
				</view> -->
			</view>
			<button class="confirm-btn" @click="makePass">生成</button>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {
		loginByUser
	} from '@/api/login.js'
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	export default {
		components: {"helang-checkbox":helangCheckbox},
		data() {
			return {
				/* totalAmount: 10.3,
				totalNum: 3,
				maxAmount: 4, */
				passNumber: 4,
				passType: [],
				passLength: [6, 8, 12, 16],
				passIndex: 0,
				passResult: '',
				capital: ['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
				letter: ['a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
				number: [0,1,2,3,4,5,6,7,8,9],
				symbolArr: ['~','!','@','#','$','%','^','&','*','(',')'],
			}
		},
		onLoad() {
			
		},
		mounted(){
			/* 设置 复选框 */
			this.$refs.checkbox.set({
			    type:'checkbox',// 类型：单选框
			    column:2,       // 分列
			    list:[          // 列表数据
			        {text:'大写字母'},
			        {text:'小写字母'},
			        {text:'数字'},
			        {text:'符号'}
			    ]   
			});
			
			/* 获取 已选项的值 */
			let data = this.$refs.checkbox.get();   // 组件返回的数据
			console.log(data);
		},
		methods: {
			...mapMutations(['login']),
			valueChange(e){
				console.log(e)
				this.passType = e
			},
			passLengthChange(e){
				console.log(e)
				this.passIndex = e.detail.value
			},
			makePass(){
				/****
				*1.根据所有字符复选框选项,将选择的项对应数组合并
				*2.根据输入需要生成的条数循环
				*3.将数组随机打乱顺序,再随机位置截取密码长度
				****/
				var _this = this
				let connectArr = []
				let passWord = []
				const passlength = _this.passLength[_this.passIndex]
				console.log('密码组成', _this.passType)
				console.log('密码长度', _this.passLength[_this.passIndex])
				console.log('密码数量', _this.passNumber)
				_this.passType.forEach(function(e){  
				   console.log(e.text)
					 if(e.text == '大写字母'){
						// console.log(_this.capital)
						connectArr = connectArr.concat(_this.capital)
					 }
					 if(e.text == '小写字母'){ 
					 	// console.log(_this.letter)	
						connectArr = connectArr.concat(_this.letter)
					 }
					 if(e.text == '数字'){
					 	// console.log(_this.number)	
						connectArr = connectArr.concat(_this.number)
					 }
					 if(e.text == '符号'){
					 	// console.log(_this.symbolArr)	
						connectArr = connectArr.concat(_this.symbolArr)
					 }
				});
				
				console.log(connectArr)
				
				for (let i=0; i<_this.passNumber; i++) { //需生成密码数量
					// let randomArr = connectArr.sort(function(){return Math.random()>0.5?-1:1;})
					// console.log(randomArr)
					let pass = ''
					for (let j=0; j<passlength; j++){ //密码长度
						// passWord[i][j] = connectArr[Math.floor(Math.random()*connectArr.length)]
						pass += connectArr[Math.floor(Math.random()*connectArr.length)]
					}
					passWord[i] = pass
				}
				
				console.log(passWord)
			},
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				this.$api.msg('去注册');
			},
			randomNum(maxNum, minNum, decimalNum) {
				// 获取指定范围内的随机数, decimalNum指小数保留多少位
				var max = 0,
					min = 0;
				minNum <= maxNum ? (min = minNum, max = maxNum) : (min = maxNum, max = minNum);
				switch (arguments.length) {
					case 1:
						return Math.floor(Math.random() * (max + 1));
						break;
					case 2:
						return Math.floor(Math.random() * (max - min + 1) + min);
						break;
					case 3:
						return (Math.random() * (max - min) + min).toFixed(decimalNum);
						break;
					default:
						return Math.random();
						break;
				}
			},
			makeMoney() {
				console.log('总金额', this.totalAmount)
				console.log('总人数', this.totalNum)
				console.log('最大红包', this.maxAmount)
				console.log('最小红包', this.minAmount)

				if (this.totalAmount < 0.01 || this.maxAmount < 0.01 || this.minAmount < 0.01) {
					this.$api.msg('金额不能小于1分');
					return false
				}

				if (parseInt(this.totalAmount * 100) != this.totalAmount * 100 ||
					parseInt(this.maxAmount * 100) != this.maxAmount * 100 ||
					parseInt(this.minAmount * 100) != this.minAmount * 100) {
					this.$api.msg('金额精确到分');
					return false
				}
				if (this.totalNum < 0 || this.totalNum % 1 != 0) {
					this.$api.msg('人数应为非0正整数');
					return false
				}
				if (this.totalAmount == 0.01 && this.maxAmount > 1) {
					this.$api.msg('钱太少不够分');
					return false
				}

				if ((this.minAmount * this.totalNum + this.maxAmount) > this.totalAmount) {
					this.$api.msg('最小金额太高');
					return false
				}

				if ((this.maxAmount * this.totalNum) < this.totalAmount) {
					this.$api.msg('最大金额太低');
					return false
				}

				if (this.maxAmount < this.minAmount) {
					this.$api.msg('最大红包小于最小红包');
					return false
				}

				/***
				 ****总金额除以总人数求出平均值
				 ****循环平均值数组,每个金额+-随机数((+最大金额-平均值)/-(平均值-最小金额))
				 ****金额加随机数时,在(剩余?)数组中随机找一个数-+随机数
				 ****若随机找到的数+-随机数超过最大或少于最小金额,则重新再找一个,保证总金额不变
				 ****
				 ***/
				//平均数
				const averageMoney = (this.totalAmount / this.totalNum).toFixed(2)
				const mod = this.totalAmount - ((this.totalNum * averageMoney).toFixed(2)) //模
				let averageArr = [] //平均数组
				const limitLowNum = Number(averageMoney) - Number(this.minAmount)
				const limitUpoNum = Number(this.maxAmount) - Number(averageMoney)
				/* const suiji1 = Number(this.randomNum(limitUpoNum, 0, 2))
				const suiji2 = Number(this.randomNum(limitLowNum, 0, 2))
				const ranArr = [suiji1, -suiji2] */

				/* console.log('mod',mod.toFixed(2))
				console.log('下限',limitLowNum.toFixed(2))
				console.log('上限',limitUpoNum.toFixed(2))
				console.log('随机金额正',suiji1)
				console.log('随机金额负',suiji2)
				 */
				// 
				// console.log('随机数组',ranArr)
				for (let i = 0; i < this.totalNum; i++) { //初始化平均数组,元素个数为总人数,值为平均数
					// averageArr[i] = Number(averageMoney)
					averageArr[i] = {
						index: i,
						price: Number(averageMoney)
					}
				}

				if (mod != 0) { //有余数
					// averageArr[0] = Number(averageArr[0]) + Number(mod.toFixed(2))
					averageArr[0].price += Number(mod.toFixed(2))
				}
				console.log('平均数组', averageArr)
				averageArr.forEach((item, index, array) => { //遍历金额数组
					// let ranMoney = ranArr[Math.floor((Math.random()*ranArr.length))] //随机加减
					/* let ranMoney = this.getRanMoney(limitLowNum, limitUpoNum)
					console.log('随机金额',ranMoney)
				  console.log(item)
					array[index] = (Number(item) + Number(ranMoney)).toFixed(2) */
					// this.arrDel(Number(ranMoney),array,this.maxAmount,this.minAmount)
					const arrRemain = array.splice(index, 1) //获取剩余数组
					this.arrDel(item, index, arrRemain, limitLowNum, limitUpoNum, this.maxAmount, this.minAmount)
				})
				console.log('处理后数组', averageArr)
				/* 
				console.log('平均值', (this.totalAmount/this.totalNum).toFixed(2))
				console.log('平*总', (this.totalNum*averageMoney).toFixed(2))
				console.log('总-平*总', this.totalAmount - (this.totalNum*averageMoney).toFixed(2)) */
				/* console.log('求模',103%3/100)
				console.log('求模10',1030%30/100)
				console.log('求模100',10300%300/100) */
				// console.log('搜索', this.totalAmount-(this.totalAmount%this.totalNum))
				// console.log('精确平均', (this.totalAmount-(this.totalAmount%this.totalNum))/this.totalNum)
			},
			getRanMoney(min, max) {
				const suiji1 = Number(this.randomNum(min, 0, 2))
				const suiji2 = Number(this.randomNum(max, 0, 2))
				const ranArr = [-suiji1, suiji2]
				const ranMoney = ranArr[Math.floor((Math.random() * ranArr.length))]
				console.log(ranArr)
				return ranMoney
			},
			getRanItem(arr) { //从数组中随机取出一个元素,返回该元素及对应key
				const key = Math.floor((Math.random() * ranArr.length))
				const item = arr[key]

				return {
					ind: key,
					val: item
				}
			},
			arrDel(item, index, arrRemain, limitLowNum, limitUpoNum, max, min) {
				let ranMoney = this.getRanMoney(limitLowNum, limitUpoNum) //随机金额
				// const arrRemain = array.splice(index,1) //获取剩余数组			
				array[index] = (Number(item) + Number(ranMoney)).toFixed(2)

				let valRemain = this.getRanItem(arrRemain) //从剩余数组随机取出元素

				if (Number(valRemain.val) - Number(ranMoney) > max || Number(valRemain.val) - Number(ranMoney) < min) {
					array[valRemain.ind] = Number(valRemain.val) - Number(ranMoney)

					return true
				} else {
					arrRemain = array.splice(index, 1) //获取剩余数组
				}

				/* const resultMoney = Number(arr[Math.floor((Math.random()*arr.length))]) - Number(num)
				if(resultMoney > max || resultMoney < min){
					return this.ortherDel(num, arr, max, min)
				}else{
					return arr
				} */
			},
			async toLogin() {
				this.logining = true;
				const {
					mobile,
					password
				} = this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
				const sendData = {
					UserPhone: this.mobile,
					NewPassword: this.password,
				};
				const result = await this.$api.json('userInfo');

				loginByUser(sendData).then(res => {
					console.log('登录了', res)
					if (res.data.ResultType === 0) { //登录成功
						this.login(res.data.Data);
						// uni.navigateBack();
						uni.switchTab({
							url: '/pages/user/user'
						});
					} else { //登录失败
						this.$api.msg(res.data.Message);
					}
				}).catch(err => {
					this.$api.msg('登录失败,请刷新后重试');
				})
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
	page {
		background: #fff;
	}

	.container {
		padding-top: 25px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
