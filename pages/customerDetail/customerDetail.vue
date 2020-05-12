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
					<text class="text-grey text-sm">{{detail.customer.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户电话：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.telephone}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户来源：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{customer_res[customer_res_index]}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">身份证：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.indentily_card?detail.customer.indentily_card:"暂无数据"}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">Q Q 号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.qq_number?detail.customer.qq_number:"暂无数据"}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">微信号：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.wx_number?detail.customer.wx_number:"暂无数据"}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">详细地址：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.address?detail.customer.address:"暂无数据"}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">备注：</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{detail.customer.remark?detail.customer.remark:"暂无数据"}}</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==1">
			<uni-collapse accordion="true" v-if="detail.cars.length>=1">
				<uni-collapse-item title="车源信息" :showAnimation="true" :open="true" v-for="item in detail.cars" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">编号：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Code?item.Code:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">名称：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.FullName?item.FullName:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望价格(万元)：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.BasePrice?item.BasePrice:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">上牌：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.BuyDate?item.BuyDate.substring(0,item.BuyDate.indexOf("T")):"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">里程(万公里)：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Mileage?item.Mileage:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">变速箱：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Transmission===''?"暂无数据":transmissionConfig[item.Transmission]}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">颜色：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Out_color===''?"暂无数据":color[item.Out_color]}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">过户次数：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Sale_number===''?"暂无数据":item.Sale_number}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">状态：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.Car_Status?item.Car_Status:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">上传时间：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.CreateDate?item.CreateDate.substring(0,item.BuyDate.indexOf("T")):"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">负责人：</text>
							</view>
							<view class="action">
								<text v-if="detail.cars.length>=1" class="text-grey text-sm">{{item.CreateName?item.CreateName:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<view v-else style="text-align: center;color: #AAAAAA;font-size: 40upx;margin-top: 70upx;">
				暂无数据
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==2">
			<uni-collapse accordion="true" v-if="detail.want.length>=1">
				<uni-collapse-item title="求购信息" :showAnimation="true" :open="true" v-for="item in detail.want" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">客户：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.customer_name?item.customer_name:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望车型：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.carcate?item.carcate:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">期望价格(万元)：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.bottom_price?item.bottom_price+" - ":""}}{{item.top_price?item.top_price:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">变速箱：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.gearbox===''?"暂无数据":transmissionConfig[item.gearbox]}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">客户描述：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.xs_remark?item.xs_remark:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">负责人：</text>
							</view>
							<view class="action">
								<text v-if="detail.want.length>=1" class="text-grey text-sm">{{item.creater_name?item.creater_name:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<view v-else style="text-align: center;color: #AAAAAA;font-size: 40upx;margin-top: 70upx;">
				暂无数据
			</view>
		</view>
		<view class="cu-list menu" v-if="TabCur==3">
			<uni-collapse accordion="true" v-if="detail.transaction.length>=1">
				<uni-collapse-item title="求购信息" :showAnimation="true" :open="true" v-for="item in detail.transaction" :key="item.ID">
					<view class="cu-list menu">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">编号：</text>
							</view>
							<view class="action">
								<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.Code?item.Code:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">买车人：</text>
							</view>
							<view class="action">
								<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.SalerName?item.SalerName:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">卖车人：</text>
							</view>
							<view class="action">
								<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.name?item.name:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey">交易时间：</text>
							</view>
							<view class="action">
								<text  v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.SaleDate?item.SaleDate.substring(0,item.SaleDate.indexOf("T")):"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
							</view>
						</view>
						 <view class="cu-item">
						 	<view class="content">
						 		<text class="text-grey">成交价格(万元)：</text>
						 	</view>
						 	<view class="action">
						 		<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.SaledPrice?item.SaledPrice:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
						 	</view>
						 </view>
						 <view class="cu-item">
						 	<view class="content">
						 		<text class="text-grey">整备费用(万元)：</text>
						 	</view>
						 	<view class="action">
						 		<text  v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.RepairCost?item.RepairCost:"暂无数据"}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
						 	</view>
						 </view>
						 <view class="cu-item">
						 	<view class="content">
						 		<text class="text-grey">是否贷款：</text>
						 	</view>
						 	<view class="action">
						 		<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.IsLoan===''?"暂无数据":(item.IsLoan==0?"是":"否")}}</text>
								
						 	</view>
						 </view>
						 <view class="cu-item">
						 	<view class="content">
						 		<text class="text-grey">贷款佣金(万元)：</text>
						 	</view>
						 	<view class="action">
						 		<text v-if="detail.transaction.length>=1" class="text-grey text-sm">{{item.LoanCommission===''?"暂无数据":item.LoanCommission}}</text>
								<text v-else class="text-grey text-sm">暂无数据</text>
						 	</view>
						 </view>
						 <view class="cu-item">
						 	<view class="content">
						 		<text class="text-grey">其他收入(万元)：</text>
						 	</view>
						 	<view class="action">
						 		<text class="text-grey text-sm">{{item.OtherCommission===''?"暂无数据":item.OtherCommission}}</text>
						 	</view>
						 </view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
			<view v-else style="text-align: center;color: #AAAAAA;font-size: 40upx;margin-top: 70upx;">
				暂无数据
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="toEdit">编辑</button>
			<button class="cu-btn bg-red margin-tb-sm lg" @click="del">删除</button>
		</view>
	</view>
</template>

<script>
	import {
		getCustomerDetail,
		delCustomer
	} from "@/api/user.js"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				id: '',
				TabCur: 0,
				detail: {
					cars: [],
					want: [],
					transaction: []
				},
				customer_res: ["来电", "进店", "朋友介绍", "车商", "广告", "其他"],
				customer_res_index: "",
				transmissionConfig: ['不限', '手动', '自动'],
				color: ["其他", "黑色", "白色", "银白", "红色", `蓝色`, '银色', '橙色', '深灰色', '香槟金', '灰色', '棕色', '绿色', '紫色', '黄色'],
			};
		},
		onLoad: function(option) {
			this.id = option.id;
			this.getDetail();
		},
		onShow() {
			this.getDetail();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getDetail() {
				getCustomerDetail({
					id: this.id
				}).then(res => {
					this.detail = res.data.Data
					this.customer_res_index = this.detail.customer.customer_res ;
					this.detail.cars.forEach(ele=>{
						if(ele.Car_Status==0){
							ele.Car_Status = "废弃"
						}else if(ele.Car_Status==1){
							ele.Car_Status = "正常"
						}else{
							ele.Car_Status = "已交易"
						}
					})
				})
			},
			toEdit() {
				let that = this
				uni.setStorage({
					key:"customer",
					data:this.detail.customer,
					success() {
						uni.navigateTo({
							url: './edit/edit?id=' + that.id
						});
					}
				})
				
			},
			del() {
				let that = this;
				uni.showModal({
					title: '是否删除',
					content: '确定删除本条用户信息吗?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							delCustomer({id:that.id}).then(res=>{
								uni.showToast({
									title:"删除成功",
									duration:1500
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},

	}
</script>

<style lang="scss">

</style>
