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
		src: "/static/temp/banner_guazi1.png",
		// src: "/static/temp/banner3.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		// src: "/static/temp/banner2.jpg",
		src: "/static/temp/banner_guazi2.png",
		background: "rgb(205, 215, 218)",
	},
	{
		// src: "/static/temp/banner4.jpg",
		src: "/static/temp/banner_guazi3.png",
		background: "rgb(183, 73, 69)",
	}
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
				"name": "品牌不限",
				"value": "品牌"
				},]
		}]
	},
	{
		"name": '价格',
		"type": 'filter',
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
	menuExam
}
