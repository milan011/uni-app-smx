
//变速箱
const transmissionConfig = ['不限', '手动', '自动'];

//车源状态
const carStatusConfig = {
	 '1':'正常',
	 '0':'废弃',
	 '5':'已交易',
};

//上下架状态
const inputStatusConfig = [
	{type: 'bg-green', content: '已上架', status: 1},
	{type: 'bg-red', content: '未上架', status: 0},
];

//车辆类型
const carTypeConfig = {
	"0": "不限",
	"1": "轿车",
	"2": "SUV",
	"3": "面包车",
	"4": "客车",
	"5": "货车",
	"6": "MPV",
}
//内饰颜色
const insidecolorConfig = {
	"1": "深色",
	"2": "浅色",
	"3": "其他",
}
//外观颜色
const outcolorConfig = {
	"0": "其它",
	"1": "黑",
	"2": "白",
	"3": "银白",
	"4": "红",
	"5": "蓝",
	"6": "银",
	"7": "橙",
	"8": "深灰",
	"9": "香槟金",
	"10": "灰",
	"11": "棕",
	"12": "绿",
	"13": "紫",
}
//保险类型
const safetypeConfig = {
	"1": "交强险+商业险",
	"2": "交强险",
	"3": "商业险",
	"4": "其他",
}

export {
	transmissionConfig,
	carStatusConfig,
	carTypeConfig,
	insidecolorConfig,
	outcolorConfig,
	safetypeConfig,
	inputStatusConfig
}
