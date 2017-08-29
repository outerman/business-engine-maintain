export const settlementType = {
	xj: { id: 1, name: "现金" },
	yh: { id: 2, name: "银行" },
	wx: { id: 3, name: "微信" },
	zfb: { id: 4, name: "支付宝" },
	cjysk: { id: 5, name: "冲减预收款" },
	cjyfk: { id: 6, name: "冲减预付款" },
	khqk: { id: 7, name: "客户欠款" },
	qgysk: { id: 8, name: "欠供应商款" },
	cygjk: { id: 9, name: "冲员工借款" },
	ygdf: { id: 10, name: "员工垫付" }
}

export const accountType = {
	xj: { id: 98, name: '现金' },
	yh: { id: 99, name: '银行' },
	wx: { id: 100, name: '微信' },
	zfb: { id: 101, name: '支付宝' },
	ys: { id: 152, name: '应收' },
	yf: { id: 153, name: '应付' },
	gr: { id: 154, name: '个人' },
	ygdf: { id: 155, name: '员工垫付' }
}

export const commonAccountId = {
	xj: { id: 4, name: '现金' },
	cjysk: { id: 5, name: '冲减预收款' },
	khqk: { id: 6, name: '暂不支付' },
	cjyfk: { id: 7, name: '冲减预付款' },
	qgysk: { id: 8, name: '暂不支付' },
	cygjk: { id: 9, name: '冲员工借款' },
	ygdf: { id: 10, name: '员工垫付' }
}


// export const ticketType = {
// 	pp: { id: 200000000000050, code: '001', name: '增值税普通发票' },
// 	zp: { id: 200000000000051, code: '002', name: '增值税专用发票' },
// 	qt: { id: 200000000000052, code: '003', name: '其他票据' },
// 	hgzp: { code: "004", id: 200000000000053, name: "海关进口增值税专用缴款书" },
// 	np: { code: "005", id: 200000000000054, name: "农产品发票" },
// 	qtp: { code: "006", id: 200000000000055, name: "其他发票" },
// 	qtpk: { code: "007", id: 200000000000056, name: "其他发票(可抵扣)" },
// 	wkp: { code: "008", id: 200000000000057, name: "未开票" }
// }

export const ticketType = [
	{ id: 200000000000050, code: '001', name: '增值税普通发票' },
	{ id: 200000000000051, code: '002', name: '增值税专用发票' },
	{ id: 200000000000052, code: '003', name: '其他票据' },
	{ code: "004", id: 200000000000053, name: "海关进口增值税专用缴款书" },
	{ code: "005", id: 200000000000054, name: "农产品发票" },
	{ code: "006", id: 200000000000055, name: "其他发票" },
	{ code: "007", id: 200000000000056, name: "其他发票(可抵扣)" },
	{ code: "008", id: 200000000000057, name: "未开票" }
]



export const incomeType = {
	sr: { id: 10000, code: '10', name: '收入' },
	zc: { id: 10001, code: '20', name: '支出' },
	cbzjtx: { id: 10002, code: '30', name: '成本/折扣和摊销' },
	cqxj: { id: 10003, code: '40', name: '存取现金/内部账户互转' },
	sk: { id: 10004, code: '50', name: '收款/付款' },
	kj: { id: 10005, code: '60', name: '请会计处理' }
}

export const industryType = {
	gy: { id: 1, name: '工业' },
	sm: { id: 2, name: '商贸' },
	fw: { id: 3, name: '服务' },
	qt: { id: 4, name: '其他' }
}

export const vatTaxpayerType = {
	ybnsr: { id: 41, name: '一般纳税人' },
	xgmnsr: { id: 42, name: '小规模纳税人' }
}

export const taxRateType = {
	hundred: { id: 100, name: '100%', value: 1 },
	seventeen: { id: 17, name: '17%', value: 0.17 },
	thirteen: { id: 13, name: '13%', value: 0.13 },
	eleven: { id: 11, name: '11%', value: 0.11 },
	six: { id: 6, name: '6%', value: 0.06 },
	five: { id: 5, name: '5%', value: 0.05 },
	four: { id: 4, name: '4%', value: 0.04 },
	three: { id: 3, name: '3%', value: 0.03 },
	two: { id: 2, name: '3%减按2%', value: 0.03 },
	oneHalf: { id: 1, name: '1.5%', value: 0.015 },
	zero: { id: 0, name: '0%', value: 0 },
	nothing: { id: 1000, name: '免税', value: 0 }
}

export const columns = {
	noTaxAmount: { id: 1, name: '金额' },
	amount: { id: 2, name: '价税合计' },
	tax: { id: 3, name: '税额' },
	department: { id: 4, name: '部门' },
	employee: { id: 5, name: '人员' },
	customer: { id: 6, name: '客户' },
	goods: { id: 7, name: '商品或服务名称' },
	assetsType: { id: 8, name: '资产类别' },
	assets: { id: 9, name: '资产' },
	number: { id: 10, name: '数量' },
	price: { id: 11, name: '单价' },
	settlement: { id: 12, name: '结算方式' },
	abstract: { id: 13, name: '摘要' },
	bankAccount: { id: 14, name: '银行账户' },
	billNumber: { id: 15, name: '票据号' },
	taxRate: { id: 16, name: '税率' },
	isDeduct: { id: 17, name: '抵扣' },
	investmentObject: { id: 18, name: '投资对象' },
	investmentType: { id: 19, name: '投资类别' },
	investor:{id:20, name:'  投资人'},
	creditor: { id: 21, name: '债权人' },
	obligor: { id: 22, name: '债务人' },
	penaltyType: { id: 23, name: '罚款性质' },
	loanTerm: { id: 24, name: '借款期限' },
	incomeAccount: { id: 25, name: '收款账户' },
	project: { id: 26, name: '项目' },
	invoiceNO: { id: 27, name: '票据编码' },
	billingDate: { id: 28, name: '开票日期' },
	isQualification: { id: 29, name: '认证' },
	certificationMonth: { id: 30, name: '认证月份' },
	deductibleInputTax: { id: 31, name: '可抵扣进项税额' },
	// investor:{id:32,name:'投资人'},

	ext0: { id: 1000, name: '自定义项0' },
	ext1: { id: 1001, name: '自定义项1' },
	ext2: { id: 1002, name: '自定义项2' },
	ext3: { id: 1003, name: '自定义项3' },
	ext4: { id: 1004, name: '自定义项4' },
	ext5: { id: 1005, name: '自定义项5' },
	ext6: { id: 1006, name: '自定义项6' },
	ext7: { id: 1007, name: '自定义项7' },
	ext8: { id: 1008, name: '自定义项8' },
	ext9: { id: 1009, name: '自定义项9' },

	extString0: { id: 1020, name: "字符自定义项0" },
	extString1: { id: 1021, name: "字符自定义项1" },
	extString2: { id: 1022, name: "字符自定义项2" },
	extString3: { id: 1023, name: "字符自定义项3" },
	extString4: { id: 1024, name: "字符自定义项4" },

	// taxBreaks: { id: 90001, name: '减免税款' },

}


export const statusType = {
	normal: { value: 2, label: '未审核' },
	audit: { value: 3, label: '已审核' },
	draft: { value: 1, label: '暂存' },
	reject: { value: 4, label: '驳回' },
}

export const sourceVoucherType = {
	lsz: { id: 109, name: '流水账' },
	yhdzd: { id: 147, name: '银行对账单' },
	gzd_gz_jt: { id: 100001, name: '工资单-工资-计提' },
	gzd_sb_jt: { id: 100002, name: '工资单-社保-计提' },
	gzd_zfgjj_jt: { id: 100003, name: '工资单-住房公积金-计提' },
	gzd_gz_ff: { id: 100004, name: '工资单-工资-发放' },
	gzd_sb_jn: { id: 100005, name: '工资单-社保-缴纳' },
	gzd_zfgjj_jn: { id: 100006, name: '工资单-住房公积金-缴纳' },
	gzd_gs_jn: { id: 100007, name: '工资单-个税-缴纳' },
}
