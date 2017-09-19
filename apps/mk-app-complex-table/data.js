export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-complex-table',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'mk-app-complex-table-header',
			children: [{
				name: 'left',
				component: 'Layout',
				className: 'mk-app-complex-table-header-left',
				children: ['收支类型:', {
					name: 'inoutType',
					component: 'Select',
					allowClear: true,
					value: '{{data.filter.inoutType}}',
					onChange: '{{$inoutTypeChange}}',
					children: [{
						name: 'option1',
						component: 'Select.Option',
						value: '0',
						children: '收入'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '1',
						children: '支出'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '2',
						children: '成本、折旧和摊销'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '3',
						children: '存取现金、内部账户互转'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '4',
						children: '付款、收款'
					}, {
						name: 'option2',
						component: 'Select.Option',
						value: '5',
						children: '请会计处理'
					}]
				}, 	'日期:', {
						name: 'birthdayRange',
						component: 'DatePicker.RangePicker',
						format: 'YYYY-MM-DD',
						value: '{{$getBirthdayRange()}}',
						onChange: '{{$birthdayRangeChange}}'
					}, {
						name: 'clear',
						component: 'Button',
						type: 'softly',
						children: '清空条件',
						onClick: '{{$clearFilter}}'
					}]
			}]
		}, {
			name: 'content',
			className: 'mk-app-complex-table-content',
			component: 'Layout',
			children: [{
				name: 'table',
				component:'Table',
				pagination:false,
				scroll:{x: true, y: true },
				bordered:true,
				width:true,
				dataSource:'{{data.list}}',
				columns:[{
					title:'收支项',
					// fixed: 'left' ,
					children:[{
						title:'收支A',
						key:'inoutNameA',
						width:100,
						render:'{{$rowSpan}}',

						dataIndex:'inoutName',
					},{
						title:'收支B',
						key:'inoutNameB',
						width:100,
						dataIndex:'inoutName',
					}]
				},{
					title:'编码一级',
					key:'code1',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code1'
				},{
					title:'编码二级',
					key:'code2',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code2'
				},
				{
					title:'编码三级',
					key:'code3',
					width:100,
					// fixed: 'left' ,
					dataIndex:'code3'
				},
				{
					title:'业务类型',
					key:'bizType',
					width:100,
					// fixed: 'left' ,
					dataIndex:'bizType'
				},{
					title:'票据类型',
					key:'invoiceType',
					width:150,
					// fixed: 'left' ,
					dataIndex:'invoiceType'
				},{
					title:'金额',
					key:'noTaxAmount',
					width:150,
					dataIndex:'noTaxAmount'
				},{
					title:'税额',
					key:'tax',
					width:150,
					dataIndex:'tax'
				},{
					title:'开票日期',
					key:'billingDate',
					width:150,
					dataIndex:'billingDate'
				},{
					title:'认证',
					key:'isQualification',
					width:150,
					dataIndex:'isQualification'
				},{
					title:'认证月份',
					key:'certificationMonth',
					width:150,
					dataIndex:'certificationMonth'
				},{
					title:'可抵扣进项税额',
					key:'deductibleInputTax',
					width:150,
					dataIndex:'deductibleInputTax'
				},{
					title:'抵扣',
					key:'isDeduct',
					width:150,
					dataIndex:'isDeduct'
				},{
					title:'税率',
					key:'taxRate',
					width:150,
					dataIndex:'taxRate'
				},{
					title:'价税合计',
					key:'amount',
					width:150,
					dataIndex:'amount'
				},{
					title:'部门',
					key:'department',
					width:150,
					dataIndex:'department'
				}, {
					title:'人员',
					key:'employee',
					width:150,
					dataIndex:'employee'
				}, {
					title:'客户',
					key:'customer',
					width:150,
					dataIndex:'customer'
				}, {
					title:'商品或服务名称',
					key:'goods',
					width:150,
					dataIndex:'goods'
				}, {
					title:'资产类别',
					key:'assetsType',
					width:150,
					dataIndex:'assetsType'
				}, {
					title:'资产',
					key:'assets',
					width:150,
					dataIndex:'assets'
				}, {
					title:'数量',
					key:'number',
					width:150,
					dataIndex:'number'
				}, {
					title:'单价',
					key:'price',
					width:150,
					dataIndex:'price'
				}, {
					title:'投资对象',
					key:'InvestmentObject',
					width:150,
					dataIndex:'InvestmentObject'
				}, {
					title:'投资类别',
					key:'InvestmentType',
					width:150,
					dataIndex:'InvestmentType'
				}, {
					title:'股东',
					key:'shareholder',
					width:150,
					dataIndex:'shareholder'
				}, {
					title:'债权人',
					key:'creditor',
					width:150,
					dataIndex:'creditor'
				}, {
					title:'债务人',
					key:'obligor',
					width:150,
					dataIndex:'obligor'
				}, {
					title:'现金',
					key:'cash',
					width:150,
					dataIndex:'cash'
				}, {
					title:'银行存款',
					key:'bankAcount',
					width:150,
					dataIndex:'bankAcount'
				}, {
					title:'支付宝',
					key:'alipay',
					width:150,
					dataIndex:'alipay'
				}, {
					title:'微信',
					key:'weChat',
					width:150,
					dataIndex:'weChat'
				}, {
					title:'冲减预收款',
					key:'prePaymentReceivable',
					width:150,
					dataIndex:'prePaymentReceivable'
				}, {
					title:'欠供应商款',
					key:'underSupplier',
					width:150,
					dataIndex:'underSupplier'
				}, {
					title:'冲员工借款',
					key:'lendingToEmployees',
					width:150,
					dataIndex:'lendingToEmployees'
				}, {
					title:'银行账号',
					key:'bankAccount',
					width:200,

					dataIndex:'bankAccount'
				},{
					title:'票据号',
					key:'invoiceNum',
					width:100,

					dataIndex:'invoiceNum'
				},{
					title:'罚款性质',
					key:'fineNature',
					width:100,

					dataIndex:'fineNature'
				},{
					title:'借款期限',
					key:'loanPeriod ',
					width:100,

					dataIndex:'loanPeriod'
				},{
					title:'摘要',
					key:'abstract',
					width:100,

					dataIndex:'abstract'
				},{
					title:'项目名称',
					key:'project',
					width:100,

					dataIndex:'projectName'
				},{
					title:'票据编码',
					key:'invoiceCode',
					width:100,

					dataIndex:'invoiceCode'
				},{
					title:'一般纳税人税率',
					key:'taxRate1',
					width:120,

					dataIndex:'taxRate1'
				}]
			}]

		}, {
			name: 'footer',
			className: 'mk-app-complex-table-footer',
			component: 'Layout',
			children: [{
				name: 'pagination',
				component: 'Pagination',
				showSizeChanger: true,
				pageSize: '{{data.pagination.pageSize}}',
				current: '{{data.pagination.current}}',
				total: '{{data.pagination.total}}',
				onChange: '{{$pageChanged}}',
				onShowSizeChange: '{{$pageChanged}}'
			}]
		}]
	}
}
