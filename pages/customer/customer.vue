<template>
	<view class="customer-main">
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入客户名称或手机号" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue shadow-blur round">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" 
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view class="cu-list menu-avatar no-padding" v-for="(item,index) in 26" :key="index" @click="toInfo(index)">
				<view class="cu-item">
					<view class="cu-avatar round lg">123</view>
					<view class="content">
						<view class="text-grey"><text class="text-abc">123456</text>君</view>
						<view class="text-gray text-sm">
							19356428546
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			};
		},
		methods:{
			toInfo(index){
				uni.navigateTo({
				    url: '../customerDetail/customerDetail?index='+index
				});
			}
		}
	}
</script>

<style lang="scss">
.customer-main{
	.search{
		top: 80upx;
		// #ifdef MP-WEIXIN
			top: 0upx;
		// #endif
	}
	.indexes{
		padding-top: 100upx;
	}
}
</style>
