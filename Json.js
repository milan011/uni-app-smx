/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		token: 'user-token',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
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
/* 商品列表 */
const goodsList = [{
		ID: 10290,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10291,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10293,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10294,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10295,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10297,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10298,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10230,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 61,
	},
	{
		image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "巧谷2019春夏季新品新款女装",
		price: 108.8,
		sales: 5,
	}, {
		image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
		price: 422,
		sales: 137,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 95,
	},
]

/* 购物车 */
const cartList = [{
		id: 1,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
		attr_val: '春装款 L',
		stock: 15,
		title: 'OVBE 长袖风衣',
		price: 278.00,
		number: 1
	},
	{
		id: 3,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 3,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 5
	},
	{
		id: 4,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 5,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 6,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 7,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 8,
		image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
		attr_val: '激光导航 扫拖一体',
		stock: 15,
		title: '科沃斯 Ecovacs 扫地机器人',
		price: 1348.00,
		number: 1
	},
	{
		id: 9,
		image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
		attr_val: 'XL',
		stock: 55,
		title: '朵绒菲小西装',
		price: 175.88,
		number: 1
	},
	{
		id: 10,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
		attr_val: '520 #粉红色',
		stock: 15,
		title: '迪奥（Dior）烈艳唇膏',
		price: 1089.00,
		number: 1
	},
	{
		id: 11,
		image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
		attr_val: '樱花味润手霜 30ml',
		stock: 15,
		title: "欧舒丹（L'OCCITANE）乳木果",
		price: 128,
		number: 1
	},
	{
		id: 12,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
		attr_val: '特级 12个',
		stock: 7,
		title: '新疆阿克苏苹果 特级',
		price: 58.8,
		number: 10
	},
	{
		id: 13,
		image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
		attr_val: '春装款/m',
		stock: 15,
		title: '女装2019春秋新款',
		price: 420.00,
		number: 1
	}
];
//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			}
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
const cateList = [{
		id: 1,
		name: '手机数码'
	},
	{
		id: 2,
		name: '礼品鲜花'
	},
	{
		id: 3,
		name: '男装女装'
	},
	{
		id: 4,
		name: '母婴用品'
	},
	{
		id: 5,
		pid: 1,
		name: '手机通讯'
	},
	{
		id: 6,
		pid: 1,
		name: '运营商'
	},
	{
		id: 8,
		pid: 5,
		name: '全面屏手机',
		picture: '/static/temp/cate2.jpg'
	},
	{
		id: 9,
		pid: 5,
		name: '游戏手机',
		picture: '/static/temp/cate3.jpg'
	},
	{
		id: 10,
		pid: 5,
		name: '老人机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 11,
		pid: 5,
		name: '拍照手机',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 12,
		pid: 5,
		name: '女性手机',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 14,
		pid: 6,
		name: '合约机',
		picture: '/static/temp/cate1.jpg'
	},
	{
		id: 15,
		pid: 6,
		name: '选好卡',
		picture: '/static/temp/cate4.jpg'
	},
	{
		id: 16,
		pid: 6,
		name: '办套餐',
		picture: '/static/temp/cate5.jpg'
	},
	{
		id: 17,
		pid: 2,
		name: '礼品',
	},
	{
		id: 18,
		pid: 2,
		name: '鲜花',
	},
	{
		id: 19,
		pid: 17,
		name: '公益摆件',
		picture: '/static/temp/cate7.jpg'
	},
	{
		id: 20,
		pid: 17,
		name: '创意礼品',
		picture: '/static/temp/cate8.jpg'
	},
	{
		id: 21,
		pid: 18,
		name: '鲜花',
		picture: '/static/temp/cate9.jpg'
	},
	{
		id: 22,
		pid: 18,
		name: '每周一花',
		picture: '/static/temp/cate10.jpg'
	},
	{
		id: 23,
		pid: 18,
		name: '卡通花束',
		picture: '/static/temp/cate11.jpg'
	},
	{
		id: 24,
		pid: 18,
		name: '永生花',
		picture: '/static/temp/cate12.jpg'
	},
	{
		id: 25,
		pid: 3,
		name: '男装'
	},
	{
		id: 26,
		pid: 3,
		name: '女装'
	},
	{
		id: 27,
		pid: 25,
		name: '男士T恤',
		picture: '/static/temp/cate13.jpg'
	},
	{
		id: 28,
		pid: 25,
		name: '男士外套',
		picture: '/static/temp/cate14.jpg'
	},
	{
		id: 29,
		pid: 26,
		name: '裙装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 30,
		pid: 26,
		name: 'T恤',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 31,
		pid: 26,
		name: '上装',
		picture: '/static/temp/cate15.jpg'
	},
	{
		id: 32,
		pid: 26,
		name: '下装',
		picture: '/static/temp/cate16.jpg'
	},
	{
		id: 33,
		pid: 4,
		name: '奶粉',
	},
	{
		id: 34,
		pid: 4,
		name: '营养辅食',
	},
	{
		id: 35,
		pid: 4,
		name: '童装',
	},
	{
		id: 39,
		pid: 4,
		name: '喂养用品',
	},
	{
		id: 36,
		pid: 33,
		name: '有机奶粉',
		picture: '/static/temp/cate17.jpg'
	},
	{
		id: 37,
		pid: 34,
		name: '果泥/果汁',
		picture: '/static/temp/cate18.jpg'
	},
	{
		id: 39,
		pid: 34,
		name: '面条/粥',
		picture: '/static/temp/cate20.jpg'
	},
	{
		id: 42,
		pid: 35,
		name: '婴童衣橱',
		picture: '/static/temp/cate19.jpg'
	},
	{
		id: 43,
		pid: 39,
		name: '吸奶器',
		picture: '/static/temp/cate21.jpg'
	},
	{
		id: 44,
		pid: 39,
		name: '儿童餐具',
		picture: '/static/temp/cate22.jpg'
	},
	{
		id: 45,
		pid: 39,
		name: '牙胶安抚',
		picture: '/static/temp/cate23.jpg'
	},
	{
		id: 46,
		pid: 39,
		name: '围兜',
		picture: '/static/temp/cate24.jpg'
	},
]

const carDetail = {
	"cars": {
		"ID": 10291,
		"Code": "0010291",
		"VIN": "LVSHCAAE2BF725208",
		"Area": "138",
		"PlateNum": null,
		"BuyDate": "2011-09-29",
		"FullName": "福克斯 两厢 2011款 1.8L A/MT 时尚版",
		"Factory": "福特",
		"CarModel": "福克斯 两厢",
		"CarType": "1",
		"CarYear": null,
		"InitPrice": 127800.00,
		"ImportType": null,
		"MakeDate": null,
		"Emission": null,
		"Transmission": "2",
		"Capacity": "1.8L",
		"CapacityNum": null,
		"Status": null,
		"EvalAMT": 2.50,
		"HfEvalById": null,
		"HfDate": null,
		"XnEvalById": null,
		"XnDate": null,
		"JzEvalById": null,
		"EvalDate": null,
		"SaleAMT": 3.80,
		"IsSaled": false,
		"SaledAMT": null,
		"SaledDate": null,
		"IsPutOn": true,
		"PutOnDate": null,
		"PutDownDate": null,
		"Depreciate": null,
		"UserKind": 3,
		"IsSchool": null,
		"UpdateDate": "2020-04-07T08:40:51",
		"CreateDate": "2020-04-06T13:53:56",
		"IsDeleted": false,
		"IsCase": null,
		"AddCaseTime": null,
		"FromCaseType": null,
		"CaseUserId": null,
		"CaseUserName": null,
		"CaseCarId": null,
		"Shop_Id": 6,
		"CreateId": 8,
		"Customer_Id": 8204,
		"Is_Top": null,
		"Is_Show": null,
		"Recommend": null,
		"Car_Status": "1",
		"Pg_description": "建议售价2.8",
		"XS_description": "喷漆不少",
		"Description": "本市个人车，经典福克斯，自动高配，天窗真皮后排出风口都有，局部喷漆，可以银行分期付款。",
		"Sale_number": 1,
		"Safe_end": "2020-09-22T00:00:00",
		"Safe_type": "2",
		"Inside_color": "1",
		"Out_color": "2",
		"AuditStatus": null,
		"Mileage": 8.80,
		"ProvenceId": 10,
		"CityName": "石家庄",
		"IsEval": 1,
		"BasePrice": 3.60,
		"CarUse": "1",
		"Useconditions": "1",
		"Maintaining": "1",
		"CreateName": "牛燕华",
		"InspectionTime": "2020-09-30T00:00:00",
		"imagepath": null
	},
	"shop": {
		"id": 6,
		"name": "众美店",
		"pid": 1,
		"type": "1",
		"provence_id": 10,
		"city_id": 138,
		"telephone": "13613308005",
		"address": "翟营大街与方文路交叉口往西200米路北",
		"qq_number": "6363711",
		"wx_number": "taochele",
		"email": "6363711@qq.com",
		"status": "1",
		"user_id": 3,
		"created_at": "2017-02-27T09:41:42+08:00",
		"updated_at": "2019-09-16T08:28:40+08:00",
		"deleted_at": null,
		"is_show": "1",
		"sort": 10,
		"user_name": "曹志霞",
		"shoplogo": "",
		"shopintroduce": "",
		"aboutus": "",
		"wantjoin": "",
		"waterimg": null
	},
	"user": null,
	"customer": {
		"id": 8204,
		"name": "岳先生",
		"password": "$2y$10$RoPVWHKMt2HQ8F9jnxZr9.jy2Dz8X6OhAjDMXqydikX/cpN/Kpf2i",
		"telephone": "18103213579",
		"address": "",
		"qq_number": "",
		"wx_number": "",
		"indentily_card": "",
		"sex": "1",
		"type": "1",
		"customer_res": "4",
		"creater_id": 8,
		"shop_id": 6,
		"status": "1",
		"remember_token": null,
		"created_at": "2019-07-04T15:25:58+08:00",
		"updated_at": "2019-07-04T15:25:58+08:00",
		"deleted_at": null,
		"remark": ""
	},
	"carimages": [{
			"id": 110228,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/17d97233-bea7-4979-97fc-66976492a91f.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:18+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "左前45度"
		},
		{
			"id": 110227,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/c5bdc507-8f8b-41c3-8615-8c2075595d1c.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:11+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "正面"
		},
		{
			"id": 110229,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/1bb764bc-156b-4663-ae20-2277cbea56d8.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:27+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "左后45度"
		},
		{
			"id": 110230,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/459264e6-4d77-4840-9275-4f028de71d2c.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:32+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "发动机舱"
		},
		{
			"id": 110231,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/2842b1e5-4b12-46fa-9ddd-9ed5b2506024.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:41+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "仪表"
		},
		{
			"id": 110232,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/90b11e38-5b77-40e7-841c-884dfb7185ab.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:47+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "内饰"
		},
		{
			"id": 110233,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/3985f042-91eb-475c-87e0-de27f2dba687.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:54:55+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "后备箱"
		},
		{
			"id": 110234,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/4c2467df-f87a-46b0-866f-45ddde7d0f36.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:55:02+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "右前45度"
		},
		{
			"id": 110235,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/6ccc0c93-e4ad-4e42-958c-86cc27465c57.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:55:09+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "右后45度"
		},
		{
			"id": 110236,
			"car_id": 10291,
			"original_name": null,
			"filename": "/Upload/2020-04/38941b03-5a93-4974-b947-fcfcb1ae257a.jpg",
			"is_top": "0",
			"created_at": "2020-04-06T13:55:15+08:00",
			"updated_at": null,
			"deleted_at": null,
			"imagetype": 101,
			"imagelevel": 0,
			"content": null,
			"carpart": "正后"
		}
	],
	"pshopid": 1,
	"pshopname": "淘车乐总部",
	"EvalDate": "2020-04-07",
	"EvalName": "牛燕华",
	"Telephone": "13613308005"
}

const carVin = {
	independent_power_interface: "无",
	var_steering_rat: "无",
	LCD_split: "无",
	body_structure: "承载式",
	fuel_filter: "",
	traction_control: "有",
	front_row_cup: "有",
	measured_oil_consumption: "-",
	vehicle_stability_control: "有",
	central_lock: "有",
	leather_seat: "有",
	loudspeaker_brand: "-",
	fuel_form: "汽油",
	sports_seat: "无",
	rear_fog_lamp: "有",
	back_seat_whole: "无",
	ele_seat_mem: "无",
	head_light_height_adj: "有",
	car_color: "塔希提金珊瑚蓝魅力紫水晶银深黑唐古拉白玛雅红季风灰极地白",
	rear_side_priv_glass: "无",
	front_back_adjustment_wheel: "有",
	rearview_mem: "无",
	headlamp: "",
	front_brake_type: "通风盘式",
	power_speed_steering: "无",
	enclosed_skylight: "无",
	tire_pressure_moni: "无",
	ele_rearview_fold: "无",
	auto_parking: "有",
	halogen_headlights: "有",
	valve_num: "4",
	positive_steering: "无",
	temp_zone: "有",
	internal_HD: "可选",
	auxi_lane_change: "无",
	front_seat_massage: "无",
	body_stru1: "5门5座两厢车",
	BK_distribution: "有",
	UV_insulating_glass: "有",
	body_stru2: "5门5座两厢车",
	single_dish_DVD: "可选",
	front_suspension_type: "麦弗逊式独立悬架",
	post_radar_number: "",
	air_purification_system: "",
	ABS: "有",
	engine_on_off_tech: "无",
	child_safety_lock: "有",
	back_seat_massage: "无",
	trd_seat: "无",
	driving_form: "前轮驱动",
	brake_assist: "有",
	seat_heating: "有",
	spare_tire_material: "",
	motorized_control_pedestal: "无",
	var_suspension: "无",
	fuel_tank: "",
	speaker_num: "8",
	descent: "无",
	rear_suspension_type: "四连杆独立悬架",
	back_electric_window: "有",
	airbag_locking_function: "暂无",
	automatic_air_conditioning: "有",
	upper_lower_adjustment_wheel: "有",
	official_100km: "9.5",
	ECO_energy_saving_model: "无",
	sec_seat_adj: "无",
	timer_form: "",
	electric_skylight: "有",
	max_torque_rpm: "1750-3500",
	manual_air_conditioning: "无",
	car_phone: "无",
	actual_100km: "-",
	manual_adjustment_pedestal: "有",
	sliding_door: "无",
	ordinary_skylight: "有",
	GPS: "可选",
	LED_taillight: "无",
	auxiliary_fuel_tank: "",
	tid: "5403",
	transmission: "7挡双离合",
	manual_main_drivers_seat: "无",
	head_light_clean_sys: "可选",
	heating_rearview: "有",
	cylinder_diameter: "76.5",
	auto_head_light: "有",
	adaptive_cruise: "无",
	ele_door_pull: "无",
	ele_rearview_adj: "有",
	back_box_opening: "暂无",
	manual_automatic_air_conditioning: "有",
	interior_color: "浅色内饰钛黑",
	rear_side_sunshade: "无",
	alloy_wheels: "有",
	front_axle_slip_lock: "无",
	main_height_adjustment: "有",
	luggage_compartment_lamp: "有",
	weight: "1370",
	LED_light: "无",
	front_roof_control_table: "",
	tele_key: "有",
	rearview_mirror_lamp: "外后视镜",
	car_height: "1479",
	actual_100km_brk: "-",
	engine_ST: "-",
	car_TV: "无",
	cylinder_HM: "铝",
	rear_armrest: "有",
	op_memo: "暂无",
	front_delayed_closing: "无",
	max_rpm: "5000",
	rear_seat_vent: "有",
	front_tire_spacing: "1540",
	rear_seat_heated: "无",
	single_dish_CD: "无",
	steering_wheel_shift: "无",
	maximum_rate: "96",
	steering_type: "电动助力",
	inde_rear_aircon: "无",
	single_wheele_screw_number: "",
	parking_brake_type: "手刹",
	whole_ensure: "两年或6万公里",
	pano_sunroof: "无",
	door_num: "5",
	car_level: "紧凑型车",
	engine: "1.4T 131马力 L4",
	HUD_digital: "无",
	heated_steering_wheel: "无",
	main_waist_support_adjustment: "有",
	anti_roll_rod: "",
	electric_sunroof: "无",
	HID_light: "可选",
	comp_ratio: "-",
	ambient_light: "无",
	post_control_table: "",
	coloured_rearview_mirror: "有",
	after_parking_radar: "有",
	taillight: "",
	cylinder_sharp: "L",
	hill_start_assist: "有",
	automatic_rearview_mirror: "无",
	length_width_height: "4199*1786*1479",
	front_air_bag: "有",
	front_seat_ventilation: "无",
	electric_main_control: "有",
	price: "166800",
	front_electric_window: "有",
	env_standard: "国IV+OBD",
	ele_steering_wheel_adj: "无",
	id: "",
	front_axle_limit_slip: "无",
	TM_type: "双离合变速器",
	front_seats_heated: "有",
	back_seat_proportions: "有",
	waist_support_seating: "有",
	rear_seat_belt: "有",
	front_radar_number: "",
	daytime_light: "无",
	CD_supports_MP3: "有",
	bluetooth_phone: "无",
	fuel_supp_type: "直喷",
	back_air_bag: "无",
	position_service: "无",
	passenger_seat_airbags: "有",
	keyless_enter: "无",
	max_torque: "220",
	large_color_LCD: "有",
	rear_axle_limit_slip: "无",
	interior_mirror: "有",
	sport_set: "无",
	hand_rear_side_shade: "无",
	auxiliary_heating_system: "",
	multi_disk_CD: "有",
	exhaust_gas_recirculation_system: "",
	front_fog_light: "有",
	front_head_air_bag: "无",
	drive_form_2: "前置前驱",
	cylinder_stru: "DOHC",
	exhaust_system: "",
	pano_camera: "无",
	spare_tire_spec: "非全尺寸",
	integrated_fuel_consumption: "6",
	update_time: "2019-06-01 01:05:45.0",
	rear_seat_ventilation: "无",
	back_head_air_bag: "无",
	pollen_filtration: "有",
	intake_form: "涡轮增压",
	clearance: "-",
	ele_trunk: "无",
	left_foot_pedal: "无",
	seat_num: "5",
	rear_roof_control_table: "",
	sens_wiper: "有",
	lane_departure_warning: "无",
	ISOFIX_baby_seat_interface: "有",
	shoulder_supp_adj: "无",
	active_braking: "无",
	fuel_grade: "93号(京92号)",
	auto_parking_into: "无",
	rear_cup_holder: "有",
	air_suspension: "无",
	visor_mirror: "有",
	air_cooled_glov: "暂无",
	front_tire_spec: "205/55R16",
	elec_engine_anti_theft: "有",
	main_seat_airbag: "有",
	steering_corium_wheel: "有",
	rear_tire_spacing: "1513",
	rear_LCD: "无",
	sec_seat_move: "无",
	rear_brake_type: "盘式",
	three_point_seat: "暂无",
	high_adjustment_seating: "有",
	front_armrest: "有",
	post_wiper: "",
	parking_radar: "有",
	multi_streering_wheel_adj: "有",
	external_audio_interface: "有",
	air_conditioning_car: "有",
	tank_capacity: "55",
	steering_auxiliary_lamp: "可选",
	cylinder_stroke: "75.6",
	reversing_video: "无",
	fuel_type: "汽油",
	keyless_boot: "无",
	top_horsepower: "131",
	night_vision: "无",
	car_length: "4199",
	max_speed: "200",
	adjustment_illuminatin_headlamp: "有",
	seat_belt_detect: "有",
	icebox: "无",
	intake_number_per_cylinder: "",
	car_width: "1786",
	zero_tire_pressure: "无",
	steel_wheel_hub: "",
	anti_pinch: "有",
	cruise: "有",
	trunk_capacity: "350-1305",
	trunk_door: "",
	lap_airbag: "无",
	cylinder_num: "4",
	high_position_lamp: "",
	trip_computer_LCD: "有",
	variable_suspension: "",
	back_seat_adj: "无",
	rear_wiper: "有",
	rear_tire_spec: "205/55R16",
	turning_head_light: "可选",
	seat_belt_pretightening: "有",
	parking_front_radar: "无",
	electric_rear_shade: "无",
	cylinder_BM: "铁",
	limit_force_belt: "有",
	rear_axle_slip_lock: "无",
	cent_axle_limit_slip: "无",
}

const recomList = [{
		ID: 10290,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10290,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10290,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
	},
	{
		ID: 10290,
		Code: "0010290",
		VIN: "LSVRP41T4F2019728",
		Area: "138",
		FullName: "途安 2015款 1.4T MT 5座 风尚版",
		Factory: "大众",
		CarModel: "途安",
		CarType: "6",
		CarYear: null,
		InitPrice: 149800,
		EvalAMT: 5.78,
		SaleAMT: 6.2,
		Mileage: 6.4,
		CityName: "石家庄",
		shopname: "众美店",
		filename: "http://tclapi.simaxian.com//Upload/2020-04/b0b7c984-f31d-4cf8-8231-151ba5fa57bd.jpg",
		shopcityname: "石家庄",
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

const menuExam = [
	{
		// name:'智能排序',
		"type": 'hierarchy',
		"submenu": [{
				"name": "智能排序",
				"value": "智能排序"
			},
			{
				"name": "价格最低",
				"value": "离我最近"
			},
			{
				"name": "车龄最短",
				"value": "人均从高到低"
			},
			{
				"name": "里程最低",
				"value": "人均从低到高"
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
				}, ]
			},
			{
				"name": 'A',
				"value": "A",
				"submenu": [{
						"name": "奥迪",
						"value": "全部超市"
					},
					{
						"name": "阿斯顿马丁",
						"value": "超市便利店"
					}
				]
			},
			{
				"name": 'B',
				"value": "B",
				"submenu": [{
						"name": "本田",
						"value": "全部超市"
					},
					{
						"name": "奔驰",
						"value": "超市便利店"
					},
					{
						"name": "宝马",
						"value": "母婴用品"
					},
					{
						"name": "标致",
						"value": "综合特产"
					},
					{
						"name": "奔驰",
						"value": "超市便利店"
					},
					{
						"name": "宝马",
						"value": "母婴用品"
					},
					{
						"name": "标致",
						"value": "综合特产"
					},
					{
						"name": "奔驰",
						"value": "超市便利店"
					},
					{
						"name": "宝马",
						"value": "母婴用品"
					},
					{
						"name": "标致",
						"value": "综合特产"
					},
					{
						"name": "奔腾",
						"value": "个人护理"
					}
				]
			},		
		]
	},
	{
		"name":'价格',
		"type": 'filter',
		"submenu": [
			{
				"name": "价格",
				"type": 'radio',
				"submenu": [{
						"name": "3万以下",
						"value": "50以下"
					},
					{
						"name": "3-5万",
						"value": "50-100"
					},
					{
						"name": "5-15万",
						"value": "100-300"
					},
					{
						"name": "15万以上",
						"value": "300以上"
					}
				]
			}
		]
	},
	{
		"name":'筛选',
		"type": 'radio',
		"submenu": [{
				"name": "车辆类型",
				"submenu": [{
						"name": "轿车",
						"value": "满减活动"
					},
					{
						"name": "SUV",
						"value": "打折优惠"
					},
					{
						"name": "面包",
						"value": "会员专享"
					},
					{
						"name": "客车",
						"value": "打折优惠"
					},
					{
						"name": "MPV",
						"value": "会员专享"
					}
				]
			},
			{
				"name": "变速箱",
				"submenu": [{
						"name": "手动",
						"value": "预定"
					},
					{
						"name": "自动",
						"value": "点餐"
					}
				]
			},
			{
				"name": "所属门店",
				"submenu": [{
						"name": "旗舰店",
						"value": "50以下"
					},
					{
						"name": "众美",
						"value": "50-100"
					},
					{
						"name": "无极",
						"value": "100-300"
					},
					{
						"name": "赵县",
						"value": "300以上"
					},
					{
						"name": "平山",
						"value": "50-100"
					},
					{
						"name": "西散庄",
						"value": "100-300"
					},
					{
						"name": "邯郸旗舰",
						"value": "300以上"
					},
					{
						"name": "赵县",
						"value": "300以上"
					},
					{
						"name": "平山",
						"value": "50-100"
					},
					{
						"name": "西散庄",
						"value": "100-300"
					},
					{
						"name": "邯郸旗舰",
						"value": "300以上"
					},
					{
						"name": "赵县",
						"value": "300以上"
					},
					{
						"name": "平山",
						"value": "50-100"
					},
					{
						"name": "西散庄",
						"value": "100-300"
					},
					{
						"name": "邯郸旗舰",
						"value": "300以上"
					},
					{
						"name": "赵县",
						"value": "300以上"
					},
					{
						"name": "平山",
						"value": "50-100"
					},
					{
						"name": "西散庄",
						"value": "100-300"
					},
					{
						"name": "邯郸旗舰",
						"value": "300以上"
					}
				]
			}
		]
	}
]
export default {
	carouselList,
	cartList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	orderList,
	carDetail,
	carVin,
	checkStatus,
	recomList,
	menuExam,
	cateList
}
