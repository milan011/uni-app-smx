
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
	inputStatusConfig
}
