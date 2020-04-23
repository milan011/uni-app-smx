<template>
	<view class="customer-detail-main">
		<scroll-view scroll-x style="margin-top: 20upx;" class="bg-blue nav text-center">
			<view class="cu-item" :class="0==TabCur?'text-white cur':''" @tap="tabSelect" data-id="0">
				客户信息
			</view>
			<view class="cu-item" :class="1==TabCur?'text-white cur':''" @tap="tabSelect" data-id="1">
				车源信息
			</view>
			<view class="cu-item" :class="2==TabCur?'text-white cur':''" @tap="tabSelect" data-id="2">
				求购信息
			</view>
			<view class="cu-item" :class="3==TabCur?'text-white cur':''" @tap="tabSelect" data-id="3">
				交易信息
			</view>
		</scroll-view>
		<view class="cu-list menu" v-if="TabCur==0">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户姓名：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">张三</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户电话：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">1520621180</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户来源：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">来电</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">身份证：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">136092198906026315</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">Q Q 号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">微信号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">详细地址：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">备注：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==1">
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
					<text class="text-grey text-sm">大众cc</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">期望价格(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">15</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">上牌：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">2010-10-01</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">里程(万公里)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">15</text>
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
					<text class="text-grey text-sm">无</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">状态：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm"></text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">上传时间：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">2019-12-01</text>
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
					<text class="text-grey text-sm">13</text>
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
					<text class="text-grey text-sm">描述描述描述</text>
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
		<view class="cu-list menu" v-if="TabCur==3">
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
					<text class="text-grey">买车人：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">李四</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">卖车人：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">张三</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">交易时间：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">2020-04-10</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">成交价格(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">14</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">整备费用(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">0.5</text>
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
					<text class="text-grey text-sm">0.2</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">其他收入(万元)：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">0.1</text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="toEdit">编辑</button>
			<button class="cu-btn bg-red margin-tb-sm lg" @click="del">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				TabCur: 0
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			toEdit() {
				uni.navigateTo({
					url: './edit/edit?index=' + this.index
				});
			},
			del() {
				uni.showModal({
				    title: '是否删除',
				    content: '确定删除本条用户信息吗?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		onLoad: function(option) {
			this.index = option.index
		}
	}
</script>

<style lang="scss">

</style>
