<template>
	<view class="content">
		<view class="list">
			<scroll-view scroll-y="true" class="page">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-title text-orange"></text> 我的收藏
					</view>
				</view>
				<view class="list" v-for="item in collectList" @click="toInfo(item.id)" @longpress='del(item.id)' :key='item.id'>
					<image :src="imgUrl+item.url" mode=""></image>
					<view class="title">
					{{item.title}}
					</view>
					<view class="kilometer">
						{{item.date}} / {{item.mileage}}万公里
					</view>
					<view class="price">
						{{item.price}}万元
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Config from '@/common/config.js'
	export default {
		data() {
			return {
				collectList: [],
				imgUrl:Config.img_url
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'collectList',
				success: (res) => {
					res.data.forEach(ele => {
						let params = {
							url: ele.carimages[1].filename,
							id: ele.cars.ID,
							title:ele.cars.FullName,
							date:ele.cars.CreateDate.split("T")[0],
							mileage:ele.cars.Mileage,
							price:ele.cars.SaleAMT
						}
						this.collectList.push(params)
					})
					for (var i = 0; i < this.collectList.length; i++) {
						for (var j = i + 1; j < this.collectList.length; j++) {
							if (this.collectList[i].id == this.collectList[j].id) { //第一个等同于第二个，splice方法删除第二个
								this.collectList.splice(j, 1);
								j--;
							}
						}
					}
				},
				fail: () => {

				}
			})
		},
		methods:{
			toInfo(id){
				uni.navigateTo({
					url:'../product/product?id='+id
				})
			},
			del(id){
				uni.showModal({
				    title: '是否删除',
				    content: '确定要删除此条收藏吗？',
				    success: (res)=> {
				        if (res.confirm) {
							uni.getStorage({
								key:'collectList',
								success:(res)=>{
									let list = res.data
									let index = list.findIndex(ele=>id==ele.cars.ID)
									list.splice(index,1)
									// console.log('index===>',index)
									this.collectList = []
									list.forEach(ele => {
										let params = {
											url: ele.carimages[1].filename,
											id: ele.cars.ID,
											title:ele.cars.FullName,
											date:ele.cars.CreateDate.split("T")[0],
											mileage:ele.cars.Mileage,
											price:ele.cars.SaleAMT
										}
										this.collectList.push(params)
									})
									uni.setStorage({
										key:'collectList',
										data:list
									})
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}

	}
</script>

<style lang="scss">
	.content {
		.list{
			position: relative;
			width: 90%;
			margin:10px auto 0;
			image {
				width: 220upx;
				height: 165upx;
			}
			.title{
				position: absolute;
				left: 245upx;
				top: 0;
				font-size: 28upx;
				font-weight: 700;
				line-height: 1.2;
			}
			.kilometer{
				position: absolute;
				left: 245upx;
				top: 70upx;
				font-size: 20upx;
				color: #ccc;
				// font-weight: 700;
			}
			.price{
				position: absolute;
				left: 245upx;
				bottom: 10upx;
				font-size: 30upx;
				color: rgb(245,27,131);
			}
		}
	}
</style>
