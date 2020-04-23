<template>
	<view class="detail-main">
		<scroll-view scroll-x style="margin-top: 20upx;" class="bg-blue nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				车源信息
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				求购信息
			</view>
			<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				交易信息
			</view>
		</scroll-view>
		<view class="cu-list menu" v-if="TabCur==0">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">编号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">A00005</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">名称：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">大众CC</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">期望价格（万）：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">12</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">里程(万公里)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">10</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">变速箱：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">自动</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">颜色：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">白色</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">过户：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">未过户</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">状态：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">已确认</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">上传时间：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">2019-3-14</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">负责人：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">张三</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==1">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">李四</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">期望车型：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">大众cc</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">期望价格：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">14万</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">变速箱：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">自动</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户描述：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">找个好的</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">负责人：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">张三</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==2">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">编号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">A00005</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">交易时间：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">2020-4-10</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成交价格(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">12万</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">整备费用：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">10000</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">是否贷款：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">是</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">贷款佣金(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">0.8</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">其他收入(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">0.2</text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction" v-if="type=='待确认'">
			<button class="cu-btn bg-blue margin-tb-sm lg">确认</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				type:""
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		},
		onLoad: function(option) { 
			this.type = option.type
		}
	}
</script>

<style lang="scss">
	.menu {
		margin-top: 30upx;
	}
</style>
