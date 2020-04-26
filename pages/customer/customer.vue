<template>
	<view class="customer-main">
		<view class="cu-bar bg-white search fixed">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入客户名称或手机号" @keyup.enter="toSeach" v-model="user.key" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue shadow-blur round" @click="toSeach">搜索</button>
			</view>
		</view>
		<scroll-view scroll-y class="indexes" :scroll-with-animation="true" :enable-back-to-top="true">
			<view class="cu-list menu-avatar no-padding" v-for="item in userList" :key="item.customer.id" @click="toInfo(item.customer.id)">
				<view class="cu-item">
					<view class="cu-avatar round lg">{{item.customer.name.substring(0,1)}}</view>
					<view class="content">
						<view class="text-grey"><text class="text-abc"></text>{{item.customer.name}}</view>
						<view class="text-gray text-sm">
							{{item.customer.telephone}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		getcustomerList
	} from "@/api/user.js"
	export default {
		components:{
			uniLoadMore
		},
		data() {
			return {
				userList: [],
				user: {
					pagesize: 20,
					pageindex: 1,
					key: "",
					shopid: 1,
					userid: 0,
					rolename: "admin"
				},
				loadingType:'more', //参数loading加载,nomore
				total:"",
				index:""
			};
		},
		onLoad() {
			this.getUserList()
		},
		onReachBottom() {
			if (this.user.pageindex == this.index || this.user.pageindex > this.index) {
				// this.user.pageindex = 1
				return
			} else {
				this.user.pageindex++
				console.log(this.user.pageindex)
				this.getUserList();
			}
		},
		methods: {
			getUserList() {
				this.loadingType = "loading"
				getcustomerList({ ...this.user
				}).then(res => {
					if (this.userList.length == 0) {
						this.userList = res.data.Data.DataList
					} else {
						this.userList = this.userList.concat(res.data.Data.DataList);
					}
					// this.userList = res.data.Data.DataList
					this.total = res.data.Data.Total
					this.index = Math.ceil(this.total/this.user.pagesize)
					if(this.user.pageindex<this.index){
						this.loadingType = "more"
					}else{
						this.loadingType = "nomore"
					}
				})
			},
			toSeach(){
				this.user.pageindex = 1
				getcustomerList({ ...this.user
				}).then(res=>{
					this.userList = res.data.Data.DataList
					this.total = res.data.Data.Total
					this.index = Math.ceil(this.total/this.user.pagesize)
					if(this.user.pageindex<this.index){
						this.loadingType = "more"
					}else{
						this.loadingType = "nomore"
					}
				})
			},
			toInfo(id) {
				uni.navigateTo({
					url: '../customerDetail/customerDetail?id=' + id
				});
			}
		}
	}
</script>

<style lang="scss">
	.customer-main {
		.search {
			top: 80upx;
			// #ifdef MP-WEIXIN
			top: 0upx;
			// #endif
		}

		.indexes {
			padding-top: 100upx;
		}
	}
</style>
