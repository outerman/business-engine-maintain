/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import { fetch } from 'mk-utils'

const mockData = fetch.mockData


fetch.mock('/v1/web/businessTypeTemplate/init', (option) => {
    return {result:true, value:data}
})


var data = {
"paymentsType":{
    "enumId":100000000000024,
    "enumDetail":[
        {
            "enumItemCode":"10",
            "enumItemId":10000,
            "enumItemName":"收入"
        },
        {
            "enumItemCode":"20",
            "enumItemId":10001,
            "enumItemName":"支出"
        },
        {
            "enumItemCode":"30",
            "enumItemId":10002,
            "enumItemName":"成本/折旧和摊销"
        },
        {
            "enumItemCode":"40",
            "enumItemId":10003,
            "enumItemName":"存取现金/内部账户互转"
        },
        {
            "enumItemCode":"50",
            "enumItemId":10004,
            "enumItemName":"收款/付款"
        },
        {
            "enumItemCode":"60",
            "enumItemId":10005,
            "enumItemName":"请会计处理"
        }
    ],
    "enumCode":"paymentsType",
    "enumName":"收支类型"
},

"businessType":[{
	    "code": "10",
	    "name": "收入",
	    "id": "10000"
	},
	{
	    "code": "101050",
	    "name": "销售产品",
	    "settelement": true,
	    "id": 2,
	    "isShow": true
	},
	{
	    "code": "101100",
	    "name": "提供修理、加工劳务收入",
	    "settelement": true,
	    "id": 3,
	    "isShow": true
	},
	{
	    "code": "101150",
	    "name": "销售材料收入",
	    "settelement": true,
	    "id": 4,
	    "isShow": true
	},
	{
	    "code": "101200",
	    "name": "收取预收款",
	    "settelement": true,
	    "id": 6,
	    "isShow": true
	},
	{
	    "code": "101250",
	    "name": "收回赊销款",
	    "settelement": true,
	    "id": 8,
	    "isShow": true
	},
	{
	    "code": "102000",
	    "name": "其他收入",
	    "settelement": false,
	    "id": 10,
	    "isShow": true
	},
	{
	    "code": "1020001000",
	    "name": "有形动产租赁收入",
	    "settelement": true,
	    "id": 12,
	    "isShow": true
	},
	{
	    "code": "1020001010",
	    "name": "不动产租赁收入",
	    "settelement": true,
	    "id": 338,
	    "isShow": true
	},
	{
	    "code": "1020001020",
	    "name": "其他服务收入",
	    "settelement": true,
	    "id": 16,
	    "isShow": true
	},
	{
	    "code": "1020001030",
	    "name": "出租包装物和商品收入",
	    "settelement": true,
	    "id": 773,
	    "isShow": true
	},
	{
	    "code": "1020001050",
	    "name": "利息收入（银行存款利息）",
	    "settelement": true,
	    "id": 18,
	    "isShow": true
	},
	{
	    "code": "1020001100",
	    "name": "国债利息收入",
	    "settelement": true,
	    "id": 20,
	    "isShow": true
	},
	{
	    "code": "1020001150",
	    "name": "理财利息",
	    "settelement": true,
	    "id": 22,
	    "isShow": true
	},
	{
	    "code": "1020001160",
	    "name": "罚款（违约）收入",
	    "settelement": true,
	    "id": 24,
	    "isShow": true
	},
	{
	    "code": "1020001170",
	    "name": "接受捐赠",
	    "settelement": true,
	    "id": 26,
	    "isShow": true
	},
	{
	    "code": "1020001180",
	    "name": "与日常经营相关的其他收入",
	    "settelement": true,
	    "id": 840,
	    "isShow": true
	},
	{
	    "code": "1020001190",
	    "name": "与日常经营无关的其他收入",
	    "settelement": true,
	    "id": 844,
	    "isShow": true
	},
	{
	    "code": "1020001200",
	    "name": "清理收入（资产模块）",
	    "settelement": true,
	    "id": 811,
	    "isShow": false
	},
	{
	    "code": "1020001220",
	    "name": "转让无形资产（资产模块）",
	    "settelement": true,
	    "id": 815,
	    "isShow": false
	},
	{
	    "code": "1020001230",
	    "name": "无形资产报废（资产模块）",
	    "settelement": false,
	    "id": 819,
	    "isShow": false
	},
	{
	    "code": "1030001000",
	    "name": "销售固定资产-动产",
	    "settelement": false,
	    "id": 523,
	    "isShow": false
	},
	{
	    "code": "1030001001",
	    "name": "销售固定资产-不动产",
	    "settelement": false,
	    "id": 803,
	    "isShow": false
	},
	{
	    "code": "1030001010",
	    "name": "销售无形资产",
	    "settelement": false,
	    "id": 526,
	    "isShow": false
	},
	{
	    "code": "1030001020",
	    "name": "资产盘盈",
	    "settelement": false,
	    "id": 529,
	    "isShow": false
	},
	{
	    "code": "1030001030",
	    "name": "政府补助",
	    "settelement": false,
	    "id": 532,
	    "isShow": false
	},
	{
	    "code": "1030001040",
	    "name": "获取股利",
	    "settelement": false,
	    "id": 535,
	    "isShow": false
	},
	{
	    "code": "1030001050",
	    "name": "股权处置",
	    "settelement": false,
	    "id": 538,
	    "isShow": false
	},
	{
	    "code": "1030001060",
	    "name": "收到股东投资",
	    "settelement": false,
	    "id": 541,
	    "isShow": false
	},
	{
	    "code": "1030001070",
	    "name": "已核销坏账又收回",
	    "settelement": false,
	    "id": 544,
	    "isShow": false
	},
	{
	    "code": "1030001080",
	    "name": "其他收入",
	    "settelement": false,
	    "id": 547,
	    "isShow": false
	},
	{
	    "code": "20",
	    "name": "支出",
	    "id": "10001"
	},
	{
	    "code": "201000",
	    "name": "招待费",
	    "settelement": true,
	    "id": 28,
	    "isShow": true
	},
	{
	    "code": "201050",
	    "name": "差旅费—交通费",
	    "settelement": true,
	    "id": 30,
	    "isShow": true
	},
	{
	    "code": "201100",
	    "name": "差旅费—住宿费",
	    "settelement": true,
	    "id": 32,
	    "isShow": true
	},
	{
	    "code": "201150",
	    "name": "差旅费—出差餐费",
	    "settelement": true,
	    "id": 34,
	    "isShow": true
	},
	{
	    "code": "201200",
	    "name": "差旅费—出差补助",
	    "settelement": true,
	    "id": 36,
	    "isShow": true
	},
	{
	    "code": "201210",
	    "name": "差旅费—其他（比如：交通意外保险、票务代理费等）",
	    "settelement": true,
	    "id": 320,
	    "isShow": true
	},
	{
	    "code": "201250",
	    "name": "交通费",
	    "settelement": true,
	    "id": 38,
	    "isShow": true
	},
	{
	    "code": "201260",
	    "name": "快递物流费",
	    "settelement": true,
	    "id": 40,
	    "isShow": true
	},
	{
	    "code": "201300",
	    "name": "办公用品及办公费（绿化费、保洁费、微信认证服务费、支付宝认证服务费等）",
	    "settelement": true,
	    "id": 42,
	    "isShow": true
	},
	{
	    "code": "201350",
	    "name": "通讯费（增值电信服务费等）",
	    "settelement": true,
	    "id": 44,
	    "isShow": true
	},
	{
	    "code": "201400",
	    "name": "会议费",
	    "settelement": true,
	    "id": 46,
	    "isShow": true
	},
	{
	    "code": "202000",
	    "name": "职工相关支出",
	    "settelement": false,
	    "id": 48,
	    "isShow": true
	},
	{
	    "code": "2020001000",
	    "name": "工资",
	    "settelement": false,
	    "id": 50,
	    "isShow": false
	},
	{
	    "code": "2020001050",
	    "name": "福利费（职工取暖费等）",
	    "settelement": true,
	    "id": 52,
	    "isShow": true
	},
	{
	    "code": "2020001100",
	    "name": "住房住房公积金",
	    "settelement": false,
	    "id": 54,
	    "isShow": false
	},
	{
	    "code": "2020001150",
	    "name": "社会保险费",
	    "settelement": false,
	    "id": 56,
	    "isShow": false
	},
	{
	    "code": "2020001200",
	    "name": "工会经费",
	    "settelement": true,
	    "id": 58,
	    "isShow": true
	},
	{
	    "code": "2020001250",
	    "name": "职工教育经费",
	    "settelement": true,
	    "id": 60,
	    "isShow": false
	},
	{
	    "code": "2020002000",
	    "name": "计提工资",
	    "settelement": false,
	    "id": 62,
	    "isShow": true
	},
	{
	    "code": "2020002050",
	    "name": "发放工资",
	    "settelement": true,
	    "id": 64,
	    "isShow": true
	},
	{
	    "code": "2020002100",
	    "name": "计提社会保险费",
	    "settelement": false,
	    "id": 66,
	    "isShow": true
	},
	{
	    "code": "2020002150",
	    "name": "缴纳社会保险费",
	    "settelement": true,
	    "id": 68,
	    "isShow": true
	},
	{
	    "code": "2020002200",
	    "name": "计提住房公积金",
	    "settelement": false,
	    "id": 70,
	    "isShow": true
	},
	{
	    "code": "2020002250",
	    "name": "缴纳住房公积金",
	    "settelement": true,
	    "id": 72,
	    "isShow": true
	},
	{
	    "code": "202500",
	    "name": "工资表导入",
	    "settelement": false,
	    "id": 74,
	    "isShow": false
	},
	{
	    "code": "2025001000",
	    "name": "工资-计提",
	    "settelement": false,
	    "id": 76,
	    "isShow": false
	},
	{
	    "code": "2025001010",
	    "name": "工资-发放-实发工资",
	    "settelement": true,
	    "id": 78,
	    "isShow": false
	},
	{
	    "code": "2025001020",
	    "name": "工资-发放-代扣社保",
	    "settelement": false,
	    "id": 80,
	    "isShow": false
	},
	{
	    "code": "2025001030",
	    "name": "工资-发放-代扣住房公积金",
	    "settelement": false,
	    "id": 82,
	    "isShow": false
	},
	{
	    "code": "2025001040",
	    "name": "工资-发放-代扣个税",
	    "settelement": false,
	    "id": 84,
	    "isShow": false
	},
	{
	    "code": "2025001050",
	    "name": "福利费-计提",
	    "settelement": false,
	    "id": 86,
	    "isShow": false
	},
	{
	    "code": "2025001060",
	    "name": "福利费-发放",
	    "settelement": true,
	    "id": 88,
	    "isShow": false
	},
	{
	    "code": "2025001070",
	    "name": "住房公积金-计提",
	    "settelement": false,
	    "id": 90,
	    "isShow": false
	},
	{
	    "code": "2025001080",
	    "name": "住房公积金-缴纳-单位",
	    "settelement": true,
	    "id": 92,
	    "isShow": false
	},
	{
	    "code": "2025001090",
	    "name": "住房公积金-缴纳--代扣个人住房公积金",
	    "settelement": true,
	    "id": 94,
	    "isShow": false
	},
	{
	    "code": "2025001100",
	    "name": "社保-计提-基本养老保险",
	    "settelement": false,
	    "id": 96,
	    "isShow": false
	},
	{
	    "code": "2025001110",
	    "name": "社保-计提-补充养老保险",
	    "settelement": false,
	    "id": 98,
	    "isShow": false
	},
	{
	    "code": "2025001120",
	    "name": "社保-计提-基本医疗保险",
	    "settelement": false,
	    "id": 100,
	    "isShow": false
	},
	{
	    "code": "2025001130",
	    "name": "社保-计提-补充医疗保险",
	    "settelement": false,
	    "id": 102,
	    "isShow": false
	},
	{
	    "code": "2025001140",
	    "name": "社保-计提-失业保险",
	    "settelement": false,
	    "id": 104,
	    "isShow": false
	},
	{
	    "code": "2025001150",
	    "name": "社保-计提-生育保险",
	    "settelement": false,
	    "id": 106,
	    "isShow": false
	},
	{
	    "code": "2025001160",
	    "name": "社保-计提-工伤保险",
	    "settelement": false,
	    "id": 108,
	    "isShow": false
	},
	{
	    "code": "2025001170",
	    "name": "社保-缴纳-基本养老保险",
	    "settelement": true,
	    "id": 110,
	    "isShow": false
	},
	{
	    "code": "2025001180",
	    "name": "社保-缴纳-补充养老保险",
	    "settelement": true,
	    "id": 112,
	    "isShow": false
	},
	{
	    "code": "2025001190",
	    "name": "社保-缴纳-基本医疗保险",
	    "settelement": true,
	    "id": 114,
	    "isShow": false
	},
	{
	    "code": "2025001200",
	    "name": "社保-缴纳-补充医疗保险",
	    "settelement": true,
	    "id": 116,
	    "isShow": false
	},
	{
	    "code": "2025001210",
	    "name": "社保-缴纳-失业保险",
	    "settelement": true,
	    "id": 118,
	    "isShow": false
	},
	{
	    "code": "2025001220",
	    "name": "社保-缴纳-生育保险",
	    "settelement": true,
	    "id": 120,
	    "isShow": false
	},
	{
	    "code": "2025001230",
	    "name": "社保-缴纳-工伤保险",
	    "settelement": true,
	    "id": 122,
	    "isShow": false
	},
	{
	    "code": "2025001240",
	    "name": "社保-缴纳-代扣个人社保",
	    "settelement": true,
	    "id": 124,
	    "isShow": false
	},
	{
	    "code": "2025001250",
	    "name": "工会经费-计提",
	    "settelement": false,
	    "id": 126,
	    "isShow": false
	},
	{
	    "code": "2025001260",
	    "name": "工会经费-发放",
	    "settelement": true,
	    "id": 128,
	    "isShow": false
	},
	{
	    "code": "2025001270",
	    "name": "职工教育经费-计提",
	    "settelement": false,
	    "id": 130,
	    "isShow": false
	},
	{
	    "code": "2025001280",
	    "name": "职工教育经费-发放",
	    "settelement": true,
	    "id": 132,
	    "isShow": false
	},
	{
	    "code": "203000",
	    "name": "其他支出",
	    "settelement": false,
	    "id": 134,
	    "isShow": true
	},
	{
	    "code": "2030001000",
	    "name": "利息支出",
	    "settelement": true,
	    "id": 136,
	    "isShow": true
	},
	{
	    "code": "2030001050",
	    "name": "租赁支出（设备租赁费、场地租赁、房屋租金等）",
	    "settelement": true,
	    "id": 138,
	    "isShow": true
	},
	{
	    "code": "2030001055",
	    "name": "仓储费",
	    "settelement": true,
	    "id": 516,
	    "isShow": true
	},
	{
	    "code": "2030001060",
	    "name": "银行手续费",
	    "settelement": true,
	    "id": 142,
	    "isShow": true
	},
	{
	    "code": "2030001070",
	    "name": "自用车辆使用费（汽油费、车辆保险费、车辆维修费等）",
	    "settelement": true,
	    "id": 144,
	    "isShow": true
	},
	{
	    "code": "2030001100",
	    "name": "物业费（公司取暖费、消防管理费等）",
	    "settelement": true,
	    "id": 146,
	    "isShow": true
	},
	{
	    "code": "2030001105",
	    "name": "诉讼费",
	    "settelement": true,
	    "id": 777,
	    "isShow": true
	},
	{
	    "code": "2030001110",
	    "name": "保险费",
	    "settelement": true,
	    "id": 781,
	    "isShow": true
	},
	{
	    "code": "2030001115",
	    "name": "运输费",
	    "settelement": true,
	    "id": 785,
	    "isShow": true
	},
	{
	    "code": "2030001120",
	    "name": "包装费",
	    "settelement": true,
	    "id": 789,
	    "isShow": true
	},
	{
	    "code": "2030001150",
	    "name": "水电费",
	    "settelement": true,
	    "id": 148,
	    "isShow": true
	},
	{
	    "code": "2030001160",
	    "name": "劳务费",
	    "settelement": true,
	    "id": 415,
	    "isShow": true
	},
	{
	    "code": "2030001200",
	    "name": "劳保费",
	    "settelement": true,
	    "id": 150,
	    "isShow": true
	},
	{
	    "code": "2030001250",
	    "name": "培训费",
	    "settelement": true,
	    "id": 152,
	    "isShow": true
	},
	{
	    "code": "2030001300",
	    "name": "旅游费",
	    "settelement": true,
	    "id": 154,
	    "isShow": true
	},
	{
	    "code": "2030001350",
	    "name": "广告宣传费",
	    "settelement": true,
	    "id": 156,
	    "isShow": true
	},
	{
	    "code": "2030001400",
	    "name": "聘请中介机构费（中介服务费、招聘网站费用等）",
	    "settelement": true,
	    "id": 158,
	    "isShow": true
	},
	{
	    "code": "2030001450",
	    "name": "咨询服务费",
	    "settelement": true,
	    "id": 160,
	    "isShow": true
	},
	{
	    "code": "2030001500",
	    "name": "保修费（售后服务、延保）",
	    "settelement": true,
	    "id": 162,
	    "isShow": true
	},
	{
	    "code": "2030001550",
	    "name": "网络使用费",
	    "settelement": true,
	    "id": 164,
	    "isShow": true
	},
	{
	    "code": "2030001670",
	    "name": "首次增值税税控系统专用设备",
	    "settelement": true,
	    "id": 166,
	    "isShow": true
	},
	{
	    "code": "2030001671",
	    "name": "增值税税控系统专用设备技术维护费",
	    "settelement": true,
	    "id": 168,
	    "isShow": true
	},
	{
	    "code": "2030001700",
	    "name": "支付税收滞纳金",
	    "settelement": true,
	    "id": 170,
	    "isShow": true
	},
	{
	    "code": "2030001750",
	    "name": "罚款（违约）支出",
	    "settelement": true,
	    "id": 172,
	    "isShow": true
	},
	{
	    "code": "2030001800",
	    "name": "捐赠支出",
	    "settelement": true,
	    "id": 174,
	    "isShow": true
	},
	{
	    "code": "2030001900",
	    "name": "汇兑差额",
	    "settelement": true,
	    "id": 178,
	    "isShow": true
	},
	{
	    "code": "2030002050",
	    "name": "开办费",
	    "settelement": true,
	    "id": 176,
	    "isShow": true
	},
	{
	    "code": "2030002100",
	    "name": "修理费",
	    "settelement": true,
	    "id": 180,
	    "isShow": true
	},
	{
	    "code": "2030002200",
	    "name": "清理费用（资产模块）",
	    "settelement": true,
	    "id": 823,
	    "isShow": false
	},
	{
	    "code": "204000",
	    "name": "税费计提与缴纳",
	    "settelement": false,
	    "id": 182,
	    "isShow": true
	},
	{
	    "code": "2040001000",
	    "name": "房产税",
	    "settelement": true,
	    "id": 184,
	    "isShow": true
	},
	{
	    "code": "2040001050",
	    "name": "土地使用税",
	    "settelement": true,
	    "id": 186,
	    "isShow": true
	},
	{
	    "code": "2040001100",
	    "name": "车船税",
	    "settelement": true,
	    "id": 188,
	    "isShow": true
	},
	{
	    "code": "2040001150",
	    "name": "印花税",
	    "settelement": true,
	    "id": 190,
	    "isShow": true
	},
	{
	    "code": "2040001200",
	    "name": "增值税",
	    "settelement": true,
	    "id": 192,
	    "isShow": true
	},
	{
	    "code": "2040001250",
	    "name": "营业税",
	    "settelement": true,
	    "id": 194,
	    "isShow": true
	},
	{
	    "code": "2040001300",
	    "name": "消费税",
	    "settelement": true,
	    "id": 196,
	    "isShow": true
	},
	{
	    "code": "2040001349",
	    "name": "计提城市维护建设税",
	    "settelement": false,
	    "id": 848,
	    "isShow": true
	},
	{
	    "code": "2040001350",
	    "name": "缴纳城市维护建设税",
	    "settelement": true,
	    "id": 198,
	    "isShow": true
	},
	{
	    "code": "2040001359",
	    "name": "计提教育费附加",
	    "settelement": false,
	    "id": 852,
	    "isShow": true
	},
	{
	    "code": "2040001360",
	    "name": "缴纳教育费附加",
	    "settelement": true,
	    "id": 200,
	    "isShow": true
	},
	{
	    "code": "2040001369",
	    "name": "计提地方教育费附加",
	    "settelement": false,
	    "id": 856,
	    "isShow": true
	},
	{
	    "code": "2040001370",
	    "name": "缴纳地方教育费附加",
	    "settelement": true,
	    "id": 202,
	    "isShow": true
	},
	{
	    "code": "2040001500",
	    "name": "企业所得税",
	    "settelement": true,
	    "id": 204,
	    "isShow": true
	},
	{
	    "code": "2040001550",
	    "name": "个人所得税",
	    "settelement": true,
	    "id": 206,
	    "isShow": true
	},
	{
	    "code": "2040001700",
	    "name": "土地增值税",
	    "settelement": true,
	    "id": 208,
	    "isShow": true
	},
	{
	    "code": "2040001750",
	    "name": "耕地占用税",
	    "settelement": true,
	    "id": 210,
	    "isShow": true
	},
	{
	    "code": "2040001800",
	    "name": "契税",
	    "settelement": true,
	    "id": 212,
	    "isShow": true
	},
	{
	    "code": "2040001850",
	    "name": "车辆购置税",
	    "settelement": true,
	    "id": 214,
	    "isShow": true
	},
	{
	    "code": "2040001860",
	    "name": "残疾人就业保障金",
	    "settelement": true,
	    "id": 216,
	    "isShow": true
	},
	{
	    "code": "205000",
	    "name": "采购、进货",
	    "settelement": false,
	    "id": 218,
	    "isShow": true
	},
	{
	    "code": "2050001010",
	    "name": "购入成品",
	    "settelement": true,
	    "id": 220,
	    "isShow": true
	},
	{
	    "code": "2050001050",
	    "name": "购入原材料",
	    "settelement": true,
	    "id": 221,
	    "isShow": true
	},
	{
	    "code": "2050001100",
	    "name": "购入半成品",
	    "settelement": true,
	    "id": 222,
	    "isShow": true
	},
	{
	    "code": "2050001150",
	    "name": "购入低值易耗品、包装物等周转材料",
	    "settelement": true,
	    "id": 224,
	    "isShow": true
	},
	{
	    "code": "2050001200",
	    "name": "购入用于中间试验和产品试制的模具、工艺装备",
	    "settelement": true,
	    "id": 225,
	    "isShow": true
	},
	{
	    "code": "2050001250",
	    "name": "购进固定资产-动产",
	    "settelement": true,
	    "id": 227,
	    "isShow": true
	},
	{
	    "code": "2050001251",
	    "name": "购进固定资产-不动产",
	    "settelement": true,
	    "id": 807,
	    "isShow": true
	},
	{
	    "code": "2050001300",
	    "name": "购进无形资产",
	    "settelement": true,
	    "id": 229,
	    "isShow": true
	},
	{
	    "code": "2050001350",
	    "name": "支付预付款",
	    "settelement": true,
	    "id": 231,
	    "isShow": true
	},
	{
	    "code": "2050001400",
	    "name": "支付赊购款",
	    "settelement": true,
	    "id": 233,
	    "isShow": true
	},
	{
	    "code": "2060001000",
	    "name": "固定资产清理费用",
	    "settelement": false,
	    "id": 551,
	    "isShow": false
	},
	{
	    "code": "2060001010",
	    "name": "资产盘亏",
	    "settelement": false,
	    "id": 554,
	    "isShow": false
	},
	{
	    "code": "2060001020",
	    "name": "分配股利",
	    "settelement": false,
	    "id": 557,
	    "isShow": false
	},
	{
	    "code": "2060001030",
	    "name": "股权投资",
	    "settelement": false,
	    "id": 560,
	    "isShow": false
	},
	{
	    "code": "2060001040",
	    "name": "债券投资",
	    "settelement": false,
	    "id": 563,
	    "isShow": false
	},
	{
	    "code": "2060001050",
	    "name": "坏账损失",
	    "settelement": false,
	    "id": 566,
	    "isShow": false
	},
	{
	    "code": "2060001055",
	    "name": "股权处置",
	    "settelement": false,
	    "id": 569,
	    "isShow": false
	},
	{
	    "code": "2060001060",
	    "name": "其他支出",
	    "settelement": false,
	    "id": 572,
	    "isShow": false
	},
	{
	    "code": "30",
	    "name": "成本/折旧和摊销",
	    "id": "10002"
	},
	{
	    "code": "301000",
	    "name": "成本",
	    "settelement": false,
	    "id": 235,
	    "isShow": true
	},
	{
	    "code": "3010001010",
	    "name": "产品销售成本",
	    "settelement": false,
	    "id": 237,
	    "isShow": true
	},
	{
	    "code": "3010001020",
	    "name": "材料销售成本",
	    "settelement": false,
	    "id": 238,
	    "isShow": true
	},
	{
	    "code": "3010001050",
	    "name": "修理、加工成本",
	    "settelement": false,
	    "id": 239,
	    "isShow": false
	},
	{
	    "code": "3010001100",
	    "name": "领用原材料",
	    "settelement": false,
	    "id": 240,
	    "isShow": true
	},
	{
	    "code": "3010001110",
	    "name": "领用半成品",
	    "settelement": false,
	    "id": 241,
	    "isShow": true
	},
	{
	    "code": "3010001120",
	    "name": "存货盘盈（批准前）",
	    "settelement": false,
	    "id": 860,
	    "isShow": false
	},
	{
	    "code": "3010001121",
	    "name": "存货盘盈（批准后）",
	    "settelement": false,
	    "id": 864,
	    "isShow": false
	},
	{
	    "code": "3010001122",
	    "name": "存货盘亏（批准前）",
	    "settelement": false,
	    "id": 868,
	    "isShow": false
	},
	{
	    "code": "3010001123",
	    "name": "存货盘亏（批准后）",
	    "settelement": false,
	    "id": 872,
	    "isShow": false
	},
	{
	    "code": "3010001130",
	    "name": "制造费用分摊计入生产成本",
	    "settelement": false,
	    "id": 242,
	    "isShow": false
	},
	{
	    "code": "3010001140",
	    "name": "完工产品入库",
	    "settelement": false,
	    "id": 243,
	    "isShow": false
	},
	{
	    "code": "302000",
	    "name": "折旧、摊销",
	    "settelement": false,
	    "id": 246,
	    "isShow": true
	},
	{
	    "code": "3020001150",
	    "name": "固定资产折旧",
	    "settelement": false,
	    "id": 248,
	    "isShow": true
	},
	{
	    "code": "3020001160",
	    "name": "资产模块固定资产折旧",
	    "settelement": false,
	    "id": 510,
	    "isShow": false
	},
	{
	    "code": "3020001200",
	    "name": "无形资产摊销",
	    "settelement": false,
	    "id": 250,
	    "isShow": true
	},
	{
	    "code": "3020001210",
	    "name": "资产模块无形资产摊销",
	    "settelement": false,
	    "id": 513,
	    "isShow": false
	},
	{
	    "code": "3020001220",
	    "name": "资产模块长期待摊费用",
	    "settelement": false,
	    "id": 827,
	    "isShow": false
	},
	{
	    "code": "3020001230",
	    "name": "固定资产转入清理",
	    "settelement": false,
	    "id": 831,
	    "isShow": false
	},
	{
	    "code": "3020001231",
	    "name": "固定资产清理损益",
	    "settelement": false,
	    "id": 835,
	    "isShow": false
	},
	{
	    "code": "3020001250",
	    "name": "摊销低值易耗品及包装物等周转材料（一次摊销）",
	    "settelement": false,
	    "id": 252,
	    "isShow": true
	},
	{
	    "code": "40",
	    "name": "存取现金/内部账户互转",
	    "id": "10003"
	},
	{
	    "code": "401000",
	    "name": "从银行提取现金",
	    "settelement": false,
	    "id": 254,
	    "isShow": true
	},
	{
	    "code": "401050",
	    "name": "现金存入银行",
	    "settelement": false,
	    "id": 256,
	    "isShow": true
	},
	{
	    "code": "402000",
	    "name": "企业内账户互转",
	    "settelement": false,
	    "id": 258,
	    "isShow": true
	},
	{
	    "code": "50",
	    "name": "收款/付款",
	    "id": "10004"
	},
	{
	    "code": "501000",
	    "name": "收款",
	    "settelement": false,
	    "id": 260,
	    "isShow": true
	},
	{
	    "code": "5010001000",
	    "name": "收取预收款",
	    "settelement": true,
	    "id": 262,
	    "isShow": true
	},
	{
	    "code": "5010001050",
	    "name": "收回赊销款",
	    "settelement": true,
	    "id": 264,
	    "isShow": true
	},
	{
	    "code": "5010001100",
	    "name": "金融机构贷款存入",
	    "settelement": true,
	    "id": 266,
	    "isShow": true
	},
	{
	    "code": "5010001120",
	    "name": "员工归还差旅等业务借款",
	    "settelement": true,
	    "id": 268,
	    "isShow": true
	},
	{
	    "code": "5010001130",
	    "name": "收到客户订金、押金、保证金、暂存款等",
	    "settelement": true,
	    "id": 270,
	    "isShow": true
	},
	{
	    "code": "5010001140",
	    "name": "收到退回来的订金、押金、保证金、暂付款等",
	    "settelement": true,
	    "id": 272,
	    "isShow": true
	},
	{
	    "code": "5010001150",
	    "name": "向其他企业或个人借款存入",
	    "settelement": true,
	    "id": 274,
	    "isShow": true
	},
	{
	    "code": "5010001200",
	    "name": "收到其他企业和个人归还借款",
	    "settelement": true,
	    "id": 276,
	    "isShow": true
	},
	{
	    "code": "5010001300",
	    "name": "收到股东投资款",
	    "settelement": true,
	    "id": 799,
	    "isShow": true
	},
	{
	    "code": "5010001305",
	    "name": "确认现金股利",
	    "settelement": false,
	    "id": 876,
	    "isShow": true
	},
	{
	    "code": "5010001306",
	    "name": "收到现金股利",
	    "settelement": true,
	    "id": 880,
	    "isShow": true
	},
	{
	    "code": "5010001310",
	    "name": "税费返还",
	    "settelement": true,
	    "id": 884,
	    "isShow": true
	},
	{
	    "code": "5010001315",
	    "name": "现金股权处置",
	    "settelement": true,
	    "id": 888,
	    "isShow": false
	},
	{
	    "code": "502000",
	    "name": "付款",
	    "settelement": false,
	    "id": 278,
	    "isShow": true
	},
	{
	    "code": "5020001000",
	    "name": "支付预付款",
	    "settelement": true,
	    "id": 280,
	    "isShow": true
	},
	{
	    "code": "5020001050",
	    "name": "支付赊购款",
	    "settelement": true,
	    "id": 282,
	    "isShow": true
	},
	{
	    "code": "5020001100",
	    "name": "归还金融机构贷款",
	    "settelement": true,
	    "id": 284,
	    "isShow": true
	},
	{
	    "code": "5020001120",
	    "name": "员工差旅等业务借款",
	    "settelement": true,
	    "id": 286,
	    "isShow": true
	},
	{
	    "code": "5020001130",
	    "name": "支付订金、押金、保证金、暂付款等",
	    "settelement": true,
	    "id": 288,
	    "isShow": true
	},
	{
	    "code": "5020001140",
	    "name": "退还客户订金、押金、保证金、暂存款等",
	    "settelement": true,
	    "id": 290,
	    "isShow": true
	},
	{
	    "code": "5020001150",
	    "name": "归还其他企业或个人借款",
	    "settelement": true,
	    "id": 292,
	    "isShow": true
	},
	{
	    "code": "5020001200",
	    "name": "借钱给其他企业和个人",
	    "settelement": true,
	    "id": 294,
	    "isShow": true
	},
	{
	    "code": "5020001250",
	    "name": "归还员工垫付款",
	    "settelement": true,
	    "id": 519,
	    "isShow": true
	},
	{
	    "code": "5020001320",
	    "name": "计提分配现金股利",
	    "settelement": false,
	    "id": 892,
	    "isShow": true
	},
	{
	    "code": "5020001321",
	    "name": "实际支付现金股利",
	    "settelement": true,
	    "id": 896,
	    "isShow": true
	},
	{
	    "code": "5020001330",
	    "name": "现金股权投资",
	    "settelement": true,
	    "id": 900,
	    "isShow": true
	}]
}
