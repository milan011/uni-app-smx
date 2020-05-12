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
			<uni-collapse accordion="true">
				<uni-collapse-item title="车源信息" :showAnimation="true" :open="true" v-for="item in detail.carinfos" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">编号：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.Code}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">名称：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.FullName}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望价格（万）：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.SaleAMT}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">里程(万公里)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.Mileage}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">变速箱：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{transmissionConfig[item.Transmission]}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">颜色：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{color[item.Out_color]}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">过户：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.Sale_number}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">状态：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.Car_Status}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">上传时间：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.UpdateDate.split('T')[0]}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">负责人：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.CreateName}}</text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="cu-list menu" v-if="TabCur==1">
			<uni-collapse accordion="true">
				<uni-collapse-item title="求购信息" :showAnimation="true" :open="true" v-for="item in detail.want" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">客户：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.customer_name}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望车型：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.carcate}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望价格(万)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.bottom_price}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">变速箱：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{transmissionConfig[item.gearbox]}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">客户描述：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.xs_remark}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">负责人：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.creater_name}}</text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="cu-list menu" v-if="TabCur==2">
			<uni-collapse accordion="true">
				<uni-collapse-item title="交易信息" :showAnimation="true" :open="true" v-for="item in detail.transaction" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">编号：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.Id}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">交易时间：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.SaleDate.split('T')[0] + ' '+ item.SaleDate.split('T')[1]}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">成交价格(万元)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.SaledPrice}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">整备费用(万元)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.RepairCost}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">是否贷款：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.IsLoan==1?"是":'否'}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">贷款佣金(万元)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.LoanCommission}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">其他收入(万元)：</text>
							</view>
							<view class="action">
								<text class="text-grey text-sm">{{item.OtherCommission}}</text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="padding flex flex-direction">
			<button  v-if="status!=='1'" class="cu-btn bg-blue margin-tb-sm lg" @click="doSave">确认</button>
			<button class="cu-btn bg-red margin-tb-sm lg" @click="opposite">反结算</button>
		</view>
	</view>
</template>

<script>
	import {
		getDetail,
		del,
		editstatus
	} from '@/api/transaction.js'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				TabCur: 0,
				id: "",
				status: '',
				detail: {},
				transmissionConfig: ['不限', '手动', '自动'],
				color: ["其他", "黑色", "白色", "银白", "红色", `蓝色`, '银色', '橙色', '深灰色', '香槟金', '灰色', '棕色', '绿色', '紫色', '黄色'],
			};
		},
		onLoad(options) {
			console.log(options)
			this.status = options.Status
			this.id = options.id
			this.getdetail()
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getdetail() {
				getDetail({
					id: this.id
				}).then(res => {
					this.detail = res.data.Data
					this.detail.carinfos.forEach(ele => {
						if (ele.Car_Status == 0) {
							ele.Car_Status = "废弃"
						} else if (ele.Car_Status == 1) {
							ele.Car_Status = "正常"
						} else {
							ele.Car_Status = "已交易"
						}
					})
				}).catch(()=>{
					uni.showToast({
						title:'登录超时',
						icon:'none'
					})
				})
			},
			opposite(){
				let that = this
				uni.showModal({
					title:'反结算',
					content:'确实要反结算吗？',
					success: function(res) {
						if (res.confirm) {
							del({id:that.id}).then(res=>{
								uni.showToast({
									title:'反结算成功',
									icon:'none',
									duration:1500
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
							})
						}else{
							
						}
					}
				})
			},
			doSave(){
				editstatus({
					tid:this.id,
					status:this.status
				}).then(res=>{
					uni.showToast({
						title:'已确认',
						icon:'none',
						duration:1500
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				})
			}
		}
	}
</script>

<style lang="scss">
	.menu {
		margin-top: 30upx;
	}
</style>
