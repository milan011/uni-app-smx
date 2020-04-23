<template>
	<view class="protocol-main">
		<view class="card" v-for="item in list" :key="item.id">
			<view class="card-c" @click="toDetail(item.id)">
				<view class="number">编号：{{item.number}}</view>
				<view class="title">{{item.title}}</view>
				<view class="box">
					<view class="time">{{item.name}}&nbsp&nbsp | &nbsp&nbsp{{item.address}}</view>
					<view class="price">{{item.time}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						number: "A45888",
						title: "大众cc2017年自动2.0T",
						time: "2017/02/03",
						address: "新华店",
						name: "张三",
						id: 1
					},
					{
						number: "A45889",
						title: "奇瑞QQ2011年手动1.0L",
						time: "2017/02/03",
						address: "鹿泉店",
						name: "李四",
						id: 2
					},
				]
			}
		},
		methods: {
			toDetail(id) {
				uni.navigateTo({
					url: './detail/detail?id=' + this.id
				});
			}
		}
	}
</script>

<style lang="scss">
	.protocol-main {
		.card {
			border-bottom: 4upx solid #CCCCCC;

			.card-c {
				position: relative;
				width: 90%;
				height: 220upx;
				margin: 0 auto;
				padding-left: 20upx;

				.number {
					padding: 10upx 0 0;
					font-size: 30upx;
				}

				.title {
					font-size: 34upx;
					font-weight: 700;
				}
				.box{
					display: flex;
					justify-content: space-between;
					position: absolute;
					left: 0;
					bottom: 20upx;
					width: 100%;
					padding-left: 20upx;
					color: #AAAAAA;
					font-size: 28upx;
				}
			}
		}
	}
</style>
