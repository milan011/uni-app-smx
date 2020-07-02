/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		token: "e33bd333-118d-406c-b922-fb5de53a0d61",
		shopId: 72,
		rolename: '',
		// portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
		portrait: 'http://tclapi.simaxian.com//Upload/2020-04/a5d57f51-9916-4939-9262-1df7ac4b132b.jpg'

	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "/static/temp/smx_banner1.jpg",
		// src: "/static/temp/banner3.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		// src: "/static/temp/banner2.jpg",
		src: "/static/temp/smx_banner2.jpg",
		background: "rgb(205, 215, 218)",
	},
	{
		// src: "/static/temp/banner4.jpg",
		src: "/static/temp/smx_banner3.jpg",
		background: "rgb(183, 73, 69)",
	}
]

/* 活动 */
const activity = [
	{
		name: 'buyCar',
		title: '买车咨询',
		img: '/Upload/activity/buy.jpg',
		content: '请输入您的手机号码并提交。我们工作人员会在24小时内联系您，淘车乐平台认证车辆，无泡水、无火烧、无事故！价格透明、还原真实车况！让您买的放心、用的放心！',
	},
	{
		name: 'join',
		title: '加盟咨询',
		img: '/Upload/activity/join.jpg',
		content: '您好，淘车乐竭诚为您服务，填写个人 信息，点击下方提交按钮，我们工作人员24小时内会跟您联系！',
	},
	{
		name: 'loan',
		title: '贷款咨询',
		img: '/Upload/activity/loan.jpg',
		content: '您知道吗？购买二手车也可以像购买新车一样分期付款了，淘车 乐分期业务，首付少、利息低、手续简单、放款快、让您购车无忧！您可通过我司的分期付款业务，自由自在的购车，随时随地分享分期购车带来的快乐生活！',
	},
	{
		name: 'insurance',
		title: '保险咨询',
		img: '/Upload/activity/insurance.png',
		content: '请输入您的手机号码并提交。我们工作人员会在24小时内联系您，淘车乐平台认证车辆，无泡水、无火烧、无事故！价格透明、还原真实车况！让您买的放心、用的放心！只需发送行车本，身份证，保单邮寄到家，省时、省心、省力！专业保险顾问解惑答疑（险种、理赔）温馨提示：如您有购买车险的需要，请点击报名按钮，我们的工作人员会在24小时内联系您。',
	},
	{
		name: 'saleCar',
		title: '卖车咨询',
		img: '/Upload/activity/sale.jpg',
		content: '二手车帮卖平台，点击报名，填写您的爱车信息，提交资料后，我们会有专人与您联系！全程免费帮您出售，快来体验吧。',
	},
	{
		name: 'assessment',
		title: '评估咨询',
		img: '/Upload/activity/assessment.jpg',
		content: '二手车帮卖平台，点击报名，填写您的爱车信息，提交资料后，我们会有专人与您联系！全程免费帮您出售，快来体验吧。',
	},
]

const checkStatus = {
	"HasWaterCheck": false,
	"HasFireCheck": false,
	"HasSgCheck": false,
	"HasWgCheck": false,
	"HasJscCheck": false,
	"HasFdjCheck": false,
	"HasDpCheck": false,
	"HasDlCheck": false,
	"HasZdCheck": false,
	"HasCkCheck": false,
	"HasAqCheck": false
}

const menuExam = [{
		// name:'智能排序',
		"type": 'hierarchy',
		"submenu": [{
				"name": "智能排序",
				"value": "智能排序"
			},
			{
				"name": "价格最低",
				"value": "价格最低"
			},
			{
				"name": "车龄最短",
				"value": "车龄最短"
			},
			{
				"name": "里程最低",
				"value": "里程最低"
			}
		]
	},
	{
		// "name":'品牌',
		"type": 'hierarchy',
		"submenu": [{
			"name": '品牌',
			"value": "品牌",
			"submenu": [{
				"name": "品牌",
				"value": "品牌"
				},]
		}]
	},
	{
		"name": '价格',
		"type": 'radio',
		"submenu": [{
			"name": "价格",
			"type": 'radio',
			"submenu": [{
					"name": "3万以下",
					"value": "0-3"
				},
				{
					"name": "3-5万",
					"value": "3-5"
				},
				{
					"name": "5-15万",
					"value": "5-15"
				},
				{
					"name": "15万以上",
					"value": "15-400"
				}
			]
		}]
	},
	{
		"name": '筛选',
		"type": 'radio',
		"submenu": [{
				"name": "车辆类型",
				"submenu": [{
						"name": "轿车",
						"value": "1"
					},
					{
						"name": "SUV",
						"value": "2"
					},
					{
						"name": "面包",
						"value": "3"
					},
					{
						"name": "客车",
						"value": "4"
					},
					{
						"name": "货车",
						"value": "5"
					},
					{
						"name": "MPV",
						"value": "6"
					}
				]
			},
			{
				"name": "变速箱",
				"submenu": [{
						"name": "手动",
						"value": "1"
					},
					{
						"name": "自动",
						"value": "2"
					}
				]
			},
			{
				"name": "所属门店",
				"submenu": []
			}
		]
	}
]
export default {
	carouselList,
	userInfo,
	checkStatus,
	activity,
	menuExam
}
