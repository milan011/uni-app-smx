
//变速箱
const transmissionConfig = [
	{key: 0, name: '不限'},
	{key: 1, name: '手动'},
	{key: 2, name: '自动'},
];

//车源状态
const carStatusConfig = [
	{key: 0, name: '废弃'},
	{key: 1, name: '正常'},
	{key: 5, name: '已交易'},
];
/* const carStatusConfig = {
	0: '废弃',
	1: '正常',
	5: '已交易',
}; */
//上下架状态
const inputStatusConfig = [
	{type: 'bg-green', content: '已上架', status: 1},
	{type: 'bg-red', content: '未上架', status: 0},
];

//车辆类型
const carTypeConfig = [
	{key:0, name:'不限'},
	{key:1, name:'轿车'},
	{key:2, name:'SUV'},
	{key:3, name:'面包车'},
	{key:4, name:'客车'},
	{key:5, name:'货车'},
	{key:6, name:'MPV'},
]
//内饰颜色
const insidecolorConfig = [
	{key: 1, name: '深色'},
	{key: 2, name: '浅色'},
	{key: 3, name: '其他'},
]
//外观颜色
const outcolorConfig = [
	{key: 0, name: '其它'},
	{key: 1, name: '黑'},
	{key: 2, name: '白'},
	{key: 3, name: '银白'},
	{key: 4, name: '红'},
	{key: 5, name: '蓝'},
	{key: 6, name: '银'},
	{key: 7, name: '橙'},
	{key: 8, name: '深灰'},
	{key: 9, name: '香槟金'},
	{key: 10, name: '灰'},
	{key: 11, name: '棕'},
	{key: 12, name: '绿'},
	{key: 13, name: '紫'},
]
//保险类型
const safetypeConfig = [
	{key: 1, name: '交强险+商业险'},
	{key: 2, name: '交强险'},
	{key: 3, name: '商业险'},
	{key: 4, name: '其他'},
]
//过户次数
const saleNumConfig = [
	{key: 0, name: '0'},
	{key: 1, name: '1'},
	{key: 2, name: '2'},
	{key: 3, name: '3'},
	{key: 4, name: '4'},
	{key: 5, name: '5'},
]
//车辆用途
const carUseConfig = [
	{key: 1, name: '私用'},
	{key: 2, name: '公用/商务'},
	{key: 3, name: '运营'},
]
//使用条件
const useconditionsConfig = [
	{key: 1, name: '好'},
	{key: 2, name: '一般'},
	{key: 3, name: '差'},
]
//维护保养
const maintainingConfig = [
	{key: 1, name: '好'},
	{key: 2, name: '较好'},
	{key: 3, name: '一般'},
	{key: 4, name: '差'},
]

//评估部位-非常规技术检查
const pgPartFConfig = [
	{
		title: '疑似泡水车检查', 
		showBage: false,
		part: [
			{name: '内饰', showBage: false, imagetype: 11},
			{name: '发动机舱', showBage: false, imagetype: 12},
			{name: '行李箱', showBage: false, imagetype: 13},
			{name: '底盘', showBage: false, imagetype: 14},
		]
	},
	{
		title: '疑似火烧车检查',
		 showBage: false,
		part: [
			{name: '车身覆盖件', showBage: false, imagetype: 21},
			{name: '发动机舱', showBage: false, imagetype: 22},
			{name: '保险盒', showBage: false, imagetype: 23},
			{name: '排气管', showBage: false, imagetype: 24},
			{name: '车辆门柱', showBage: false, imagetype: 25},
		]
	},
	{
		title: '疑似重大事故车检查', 
		showBage: false,
		part: [
			{name: '纵梁', showBage: false, imagetype: 31},
			{name: '横梁', showBage: false, imagetype: 32},
		]
	},
]

//评估部位-静态检测
const pgPartJConfig = [
	{
		title: '外观检查',
		showBage: false,
		part: [
			{name: '车身', showBage: false, imagetype: 41},
			{name: 'ABC柱', showBage: false, imagetype: 42},
			{name:'漆面——碰撞痕迹', showBage: false, imagetype: 43},
		]
	},
	{
		title: '驾驶舱检查', 
		showBage: false,
		part: [
			{name: '仪表盘', showBage: false, imagetype: 51},
			{name: '内饰', showBage: false, imagetype: 52},
			{name: '座椅', showBage: false, imagetype: 53},
			{name: '灯光', showBage: false, imagetype: 54},
		]
	},
	{
		title: '发动机舱检查',
		 showBage: false,
		part: [
			{name: '发动机', showBage: false, imagetype: 61},
			{name: '四液', showBage: false, imagetype: 62},
		]
	},
	{
		title: '底盘检查', 
		showBage: false,
		part: [
			{name: '轮胎', showBage: false, imagetype: 71},
			{name: '油底壳', showBage: false, imagetype: 72},
			{name: '排气筒', showBage: false, imagetype: 73},
			{name: '底盘',  showBage: false, imagetype: 74},
		]
	},
]

//评估部位-动态检测
const pgPartDConfig = [
	{
		name: '动力性', 
		showBage: false,
		imagetype: 81
		/* part: [
			{name: '', imagetype: 0},
			{name: '', imagetype: 0},
			{name:'', imagetype: 0},
			{name:'', imagetype: 0},
		] */
	},
	{
		name: '制动性',
		showBage: false,
		imagetype: 82
	},
	{
		name: '操控性',
		showBage: false,
		imagetype: 83
	},
	{
		name: '安全性',
		showBage: false,
		imagetype: 84
	},
]
export {
	transmissionConfig,
	carStatusConfig,
	carTypeConfig,
	insidecolorConfig,
	outcolorConfig,
	safetypeConfig,
	saleNumConfig,
	carUseConfig,
	useconditionsConfig,
	maintainingConfig,
	inputStatusConfig,
	pgPartFConfig,
	pgPartJConfig,
	pgPartDConfig
}
