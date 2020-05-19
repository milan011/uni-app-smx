<template>
	<view class="sellcar-main">
		<view class="car-type">
			<view class="title">
				选择车型
			</view>
			<view class="order-section">
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<!-- <icon type="success" size="16"/> -->
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/honda.png" mode="aspectFit"></image>
					<text>本田</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/dazhong.png" mode="aspectFit"></image>
					<text>大众</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/benz.png" mode="aspectFit"></image>
					<text>奔驰</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/toyota.png" mode="aspectFit"></image>
					<text>丰田</text>
				</view>
			</view>
			<view class="order-section">
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/audi.png" mode="aspectFit"></image>
					<text>奥迪</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/bmw.png" mode="aspectFit"></image>
					<text>宝马</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="https://sta.guazistatic.com/static/c2c/web/che-logo/ford.png" mode="aspectFit"></image>
					<text>福特</text>
				</view>
				<view class="order-item" hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/index/more.png" mode="aspectFit"></image>
					<text>更多</text>
				</view>
			</view>
			<view class="bottom">
				<view class="box">
					<view class="uni-title uni-common-pl">上牌时间</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker mode="date" fields="month" :value="date" :end="endDate" @change="changDate">
									<view class="uni-input">{{date}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="box">
					<view class="uni-title uni-common-pl">选择里程</view>
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="uni-list-cell-db">
								<picker :value="index" :range="mileage" @change="changMileage">
									<view class="uni-input">{{mileage[index]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="circuit">
			<view class="title">
				卖车流程与指南
			</view>
			<view class="content">
				<scroll-view scroll-x class="bg-white nav text-center">
					<view class="cu-item" :class="0==TabCur?'text-green cur':''" @tap="tabSelect" data-id="0">
						<text class="cuIcon-edit"></text>
						<view class="text">一键预约</view>

					</view>

					<view class="cu-item" :class="1==TabCur?'text-green cur':''" @tap="tabSelect" data-id="1">
						<text class="cuIcon-shop"></text>
						<view class="text">免费评估</view>
					</view>
					<view class="cu-item" :class="2==TabCur?'text-green cur':''" @tap="tabSelect" data-id="2">
						<text class="cuIcon-cardboard"></text>
						<view class="text">当天上架</view>
					</view>
					<view class="cu-item" :class="3==TabCur?'text-green cur':''" @tap="tabSelect" data-id="3">
						<text class="cuIcon-group_fill"></text>
						<view class="text">签约过户</view>
					</view>
				</scroll-view>
				<view class="QA">
					<view class="question" v-if="TabCur==0">
						<view v-for="(item,index) in reservation" :key="index" @click="reservationIsShow(index)">
							<text class="Q" :class="{ 'active': item.isShow }">Q</text>
							<text>{{item.questions}}</text>
							<text class="cuIcon-unfold icons" v-if="!item.isShow"></text>
							<text class="cuIcon-fold icons" v-else></text>
							<view class="answer" v-if="item.isShow">
								<text class="A">A</text>
								<text class="answers">
									{{item.answers}}
								</text>
							</view>
						</view>
					</view>
					<view class="question" v-if="TabCur==1">
						<view v-for="(item,index) in assess" :key="index" @click="assessIsShow(index)">
							<text class="Q" :class="{ 'active': item.isShow }">Q</text>
							<text>{{item.questions}}</text>
							<text class="cuIcon-unfold icons" v-if="!item.isShow"></text>
							<text class="cuIcon-fold icons" v-else></text>
							<view class="answer" v-if="item.isShow">
								<text class="A">A</text>
								<text class="answers">
									{{item.answers}}
								</text>
							</view>
						</view>
					</view>
					<view class="question" v-if="TabCur==2">
						<view v-for="(item,index) in putOn" :key="index" @click="putOnIsShow(index)">
							<text class="Q" :class="{ 'active': item.isShow }">Q</text>
							<text>{{item.questions}}</text>
							<text class="cuIcon-unfold icons" v-if="!item.isShow"></text>
							<text class="cuIcon-fold icons" v-else></text>
							<view class="answer" v-if="item.isShow">
								<text class="A">A</text>
								<text class="answers">
									{{item.answers}}
								</text>
							</view>
						</view>
					</view>
					<view class="question" v-if="TabCur==3">
						<view v-for="(item,index) in transfer" :key="index" @click="transferIsShow(index)">
							<text class="Q" :class="{ 'active': item.isShow }">Q</text>
							<text>{{item.questions}}?</text>
							<text class="cuIcon-unfold icons" v-if="!item.isShow"></text>
							<text class="cuIcon-fold icons" v-else></text>
							<view class="answer" v-if="item.isShow">
								<text class="A">A</text>
								<text class="answers">
									{{item.answers}}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="superiority">
			<view class="title">
				我们的优势
			</view>
			<view class="box">
				<view class="left">
					<view class="titles">
						价更高
					</view>
					<view class="text">
						大数据精准定价
					</view>
					<view class="text">
						高于市场价的5%
					</view>
					<image src="../../static/sell/car.jpg" mode=""></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="titles">
							拿钱快
						</view>
						<view class="text">
							当天上架
							50%车款
						</view>
						<image src="../../static/sell/jinbi.jpg" mode=""></image>
					</view>
					<view class="bottom">
						<view class="titles">
							专业服务
						</view>
						<view class="text">
							标准流程
							专属顾问
						</view>
						<image src="../../static/sell/fuw.jpg" mode=""></image>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: '请选择上牌日期',
				mileage: [],
				index: 0,
				TabCur: 0,
				scrollLeft: 0,
				// 一键预约
				reservation: [{
						questions: "卖车有什么条件?",
						answers: "车辆手续齐全拥有合法手续和正式牌照.产权明晰能够正常交易平台不接收重大事故等不符合瓜子二手车上架标准的车辆",
						isShow: false
					},
					{
						questions: "我的信息会被泄露吗?",
						answers: "我们会对你的信息进行全程保密,确保信息安全",
						isShow: false
					},
					{
						questions: "如何异地卖车?",
						answers: "如果您打算售出车辆的上牌地和所在地不一致,您可以先在车辆所在地卖车.车辆将在全国范围内销售,成交后到车辆的上牌地办理相关手续",
						isShow: false
					}
				],
				// 免费评估
				assess: [{
						questions: "卖车需要哪些材料?",
						answers: `车辆评估时,您需要携带车辆登记证,行驶证,保单 等;买车签约时您需要准备好:身份证,环保标,购置税本,行驶证,检字表,购置税发票,车辆登记证,交强保险,购车发票或者最近一次的过户发票,交强险单 `,
						isShow: false
					},
					{
						questions: "去哪里检测车辆?检测车辆收费吗?",
						answers: "您可以去附近检测点检测,或要求评估师上门检测.到店评估免费.部分城市上门评估免费,详情您可以在预约是查看",
						isShow: false
					},
					{
						questions: "谁来给我评估车辆?都评估什么内容?",
						answers: "瓜子将指派专业评估技师为您评估车辆,评估师主要对车辆的基本信息,车况信息,车浪照片以及卖家信息等内容进行评估",
						isShow: false
					},
				],
				// 当天上架
				putOn: [{
						questions: "上架后多长时间售出?",
						answers: `如果车况较好符合严选保卖,最快当天即可预付不低于50%的车款.大部分车辆平均7日可以成交,但车辆出售时间受市场限制.如果您着急出售,可以选择保卖服务或者降低售价`,
						isShow: false
					},
					{
						questions: "上架后我的车还能开吗?",
						answers: `如果您选择严选服务,签约后车辆停放在瓜子保卖店或专用停车场;其余售卖方式您可以继续驾驶车辆`,
						isShow: false
					},
					{
						questions: "你们是如何定价的?",
						answers: `车辆检测完成后,系统会结合车辆检测情况,市场成交价格和新车价格等给出参考价格`,
						isShow: false
					},
				],
				// 签约过户
				transfer: [{
						questions: "能否异地签约?",
						answers: `我们支持异地签约,详情可在签约时咨询服务专员`,
						isShow: false
					},
					{
						questions: "过户手续怎么办?",
						answers: `在过户前请及时检查:1.车辆年检期限;2.按揭车完成解压;3.违章处理完毕;4.交强险是否过期.避免因以上因素无法过户.车辆过户需买家和卖家携带材料到车管所去办理.`,
						isShow: false
					},
					{
						questions: "办理过户需要多长时间?",
						answers: `过户速度取决于买卖双方时间和车管所的实际情况.如果车辆是异地过户,需要先提档,再到迁入地办理过户手续.时间要稍长一些.过户时有任何问题可以联系您的过户专员进行咨询`,
						isShow: false
					},
				]
			};
		},
		computed: {
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 时间切换
			changDate(e) {
				this.date = e.target.value
			},
			// 里程切换
			changMileage(e) {
				this.index = e.target.value
			},
			// colorui的方法
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			// 答案的隐藏与显示
			reservationIsShow(index) {
				this.reservation[index].isShow = !this.reservation[index].isShow
			},
			assessIsShow(index) {
				this.assess[index].isShow = !this.assess[index].isShow
			},
			putOnIsShow(index) {
				this.putOn[index].isShow = !this.putOn[index].isShow
			},
			transferIsShow(index) {
				this.transfer[index].isShow = !this.transfer[index].isShow
			}
		},
		onShow() {
			for (let i = 1; i <= 50; i++) {
				this.mileage.push(i + "万")
			}
			this.mileage.push("50万+")
		}
	}
</script>

<style lang="scss">
	// 快捷筛选
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}
	
	uni-view {
	    // font-size: 20px;
	    line-height: 2.4;
	}
	.sellcar-main {
		margin-top: 40upx;

		.title {
			padding-left: 20upx;
			font-size: 34upx;
			line-height: 3;
			font-weight: 800;
		}

		// 选择车型
		.car-type {
			width: 90%;
			margin: 0 auto;
			border-bottom: 20upx solid #EEEEEE;

			.order-section {
				padding: 0 20upx;
				@extend %section;

				.order-item {
					@extend %flex-center;
					width: 160upx;
					height: 100upx;
					border-radius: 10upx;
					font-size: $font-sm;
					color: $font-color-dark;
				}

				.yticon {
					font-size: 48upx;
					margin-bottom: 18upx;
					color: #fa436a;
				}

				.icon-shouhoutuikuan {
					font-size: 44upx;
				}
			}

			.bottom {
				margin: 40upx 0 20upx 0;
				@extend %section;

				.uni-title {
					font-size: 26upx;

				}

				.uni-common-pl {
					padding-left: 0px;
				}

				.uni-input {
					height: auto;
					font-size: 26upx;
					color: #888;
				}

				.box {
					width: 40%;
				}
			}
		}

		// 买车流程
		.circuit {
			width: 90%;
			margin: 0 auto;
			border-bottom: 20upx solid #EEEEEE;

			.nav {
				.cu-item {
					height: auto;
				}

				.text {
					margin-top: -20upx;
				}
			}

			.content {
				.QA {
					margin: 30upx 0 30upx;

					.question {
						.Q {
							font-size: 26upx;
							background-color: #888;
							color: #fff;
							width: 28upx;
							height: 28upx;
							display: inline-block;
							line-height: 28upx;
							text-align: center;
							margin-right: 20upx;
						}

						.active {
							background-color: #09BB07;
							opacity: .7;
						}

						text {
							font-size: 26upx;
							line-height: 30upx;
						}

						.icons {
							float: right;
						}

						.answer {
							position: relative;

							.A {
								position: absolute;
								top: 8upx;
								left: 0;
								font-size: 20upx;
								border: 1px solid #09BB07;
								color: #09BB07;
								width: 28upx;
								height: 28upx;
								line-height: 28upx;
								text-align: center;
								margin-right: 20upx;
							}

							.answers {
								margin-left: 56upx;
								display: inline-block;
								font-size: 26upx;
								margin-top: 4upx;
								width: calc(100% - 56upx);
								line-height: 1.5;
							}
						}
					}
				}
			}
		}

		// 优势
		.superiority {
			width: 90%;
			margin: 0 auto;
			margin-bottom: 0.5em;
			.box {
				width: 100%;
				height: 600upx;
				display: flex;
				justify-content: space-around;

				.left {
					width: 45%;
					height: 100%;

					.titles {
						margin-top: 30upx;
						padding-left: 30upx;
						font-size: 28upx;
						line-height: 3;
						font-weight: 700;
					}

					.text {
						padding-left: 30upx;
						font-size: 24upx;
						line-height: 1.5;
						color: #888;
					}

					image {
						margin-top: 30upx;
						width: 100%;
						height: 400upx;
					}
				}

				.right {
					width: 45%;
					height: 100%;

					.top {
						width: 100%;
						height: 42%;
						.titles {
							margin-top: 30upx;
							padding-left: 30upx;
							font-size: 28upx;
							line-height: 3;
							font-weight: 700;
						}
						.text {
							padding-left: 30upx;
							font-size: 24upx;
							line-height: 1;
							color: #888;
						}
						
						image {
							margin-top: 10upx;
							width: 100%;
							height: 130upx;
						}
					}
					.bottom{
						width: 100%;
						height: 46%;
						.titles {
							margin-top: 30upx;
							padding-left: 30upx;
							font-size: 28upx;
							line-height: 3;
							font-weight: 700;
						}
						.text {
							padding-left: 30upx;
							font-size: 24upx;
							line-height: 1.5;
							color: #888;
						}
						
						image {
							margin-top: 30upx;
							width: 100%;
							height: 150upx;
						}
					}
				}
			}
		}

	}
</style>
