<template>
	<view class="transaction-main">
		<view class="header-search">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input  :adjust-position="false" type="text" placeholder="搜索关键词"
					 confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round">搜索</button>
				</view>
			</view>
		</view>
		<view class="card" v-for="item in list" :key="item.id" @click="toDetail(item.type)">
			<image :src="item.img" mode=""></image>
			<view class="title">{{item.title}}</view>
			<view class="time">{{item.time}}&nbsp&nbsp | &nbsp&nbsp{{item.address}}</view>
			<view class="price">{{item.price}}</view>
			<view class="type" :class="item.type=='待确认'?'red':''">{{item.type}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						img:"../../static/sell/fuw.jpg",
						title:"大众cc",
						time:"2017.2.3",
						address:"新华店",
						price:"10.8万",
						type:"已确认",
						id:1
					},
					{
						img:"../../static/sell/fuw.jpg",
						title:"奇瑞QQ",
						time:"2017.2.3",
						address:"鹿泉店",
						price:"0.5万",
						type:"待确认",
						id:2
					},
				]
			}
		},
		components: {
			
		},
		methods: {
			toDetail(type){
				uni.navigateTo({
				    url: './deltail/deltail?type='+type
				});
			}
		}
	}
</script>

<style lang="scss">
	.transaction-main {
		.card{
			width: 90%;
			height: 280upx;
			margin: 20upx auto;
			background-color: #eeefff;
			border-radius: 16upx;
			position: relative;
			image{
				width: 30%;
				height: 100%;
			}
			.title{
				position: absolute;
				left: 30%;
				top: 20upx;
				padding-left: 60upx;
				font-size: 30upx;
				font-weight: 700;
			}
			.time{
				position: absolute;
				left: 30%;
				padding-left: 60upx;
				top: 100upx;
				color: #888;
			}
			.price{
				position: absolute;
				left: 30%;
				padding-left: 60upx;
				top: 200upx;
				color: #888;
			}
			.type{
				position: absolute;
				left: 55%;
				padding-left: 60upx;
				top: 200upx;
				color: #888;
				&.red{
					color: red;
				}
			}
		}
	}
</style>
