export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className:'acm-voucher',
		children: [{
			name: 'left',
			component: 'Card',
			className:'acm-voucher-left',
			children: [{
				name:'left-header',
				component:'::div',
				className:'acm-voucher-left-header',
				children:[{
					name:'add',
					component:'Button',
					children:'新增业务',
					onClick:'{{$addBisness}}' //btnClick在action中声明
				}]

			},{
				name:'left-content',
				component:'::div',
				className:'acm-voucher-left-content',
				children:[{
					name:'serach',
					className:'acm-voucher-left-search',
					component:'Input.Search',
					placeholder: "请输入业务类型名称",
                    onSearch:'{{$onSearch}}'
				},{
					name:'tree',
					className:'acm-voucher-left-tree',
					checkable:false,
				   	defaultExpandedKeys:['0-0-0', '0-0-1'],
				   	defaultSelectedKeys:['0-0-0', '0-0-1'],
				   	defaultCheckedKeys:['0-0-0', '0-0-1'],
				   	onSelect:'{{$handleSelect}}',
					//   	onCheck:'{{$handleCheck}}',
					component:'Tree',
					children:'{{$getTreeChild()}}'
				}]
			}]
		},{
			name: 'right',
			component: 'Card',
			className:'acm-voucher-right',
			children:[{
				name:'right-header',
				component:'::div',
				className:'acm-voucher-right-header',
				children:[{
					name:'right-header-l',
					className:'acm-voucher-right-header-l',
					component:'::ul',
					children:[{
						name:'item1',
						component:'::li',
						children:['业务编码:',{
							name:'itme1-1',
							component:'::span',
							children:'201000'
						}]
					},{
						name:'item2',
						component:'::li',
						children:['业务类型:',{
							name:'itme2-1',
							component:'::span',
							children:'收入'
						}]
					},{
						name:'item3',
						component:'::li',
						children:['业务名称:',{
							name:'itme3-1',
							component:'Input',
							size:'small',
							width:100,
							value:'销售商品'
						}]
					}/*,{
						name:'item4',
						component:'::li',
						children:['涉税属性:',{
							name:'itme4-1',
							component:'Select',
							defaultValue:'0',
							style:{ width: 120 },
							onChange:'{{$handleChange}}',
							children:[{
								name:'option0',
								component:'Select.Option',
								value:'0',
								children:'劳务'
							},{
								name:'option0',
								component:'Select.Option',
								value:'1',
								children:'服务'
							},{
								name:'option0',
								component:'Select.Option',
								value:'2',
								children:'货物'
							},{
								name:'option0',
								component:'Select.Option',
								value:'3',
								children:'无形资产'
							}]
						}]
					}*/]
				},{
					name:'right-header-r',
					className:'acm-voucher-right-header-r',
					component:'::ul',
					children:[{
						name:'item-r-1',
						component:'::li',
						children:[{
							name:'item-r-1-1',
							component:'Radio'
						},'隐藏业务']
					},{
						name:'item-r-2',
						component:'::li',
						children:[{
							name:'item-r-2-1',
							component:'Radio'
						},'需要结算']
					}]
				}]
			},{
				name:'right-content',
				component:'::div',
				className:'acm-voucher-right-content',
				children:[{
					name:'interface',
					className:'acm-voucher-interface',
					component:'::div',
					children:getInterfaceMeta()
				},{
					name:'rule',
					className:'acm-voucher-rule',
					component:'::div',
					children:getRuleMeta()
				}]
			},{
				name:'right-footer',
				component:'::div',
				className:'acm-voucher-right-foooter',
				children:[{
					name:'preview',
					component:'Button',
					children:'预览'
				},{
					name:'save',
					component:'Button',
					children:'保存'
				}]
			}]
		}]
	}
}

function getInterfaceMeta(){
	return [{
		name:'interface-header',
		component:'::div',
		className:'acm-voucher-interface-header',
		children:[{
			name:'title',
			component:'::span',
			children:'界面元数据:'
		},{
			name:'add-invoice',
			component:'Button',
			className:'acm-voucher-add-btn',
			onClick:'{{$addInvoiceType}}',
			children:'新增发票类型'
		}]
	},{
		name:'interface-tab',
		className: 'acm-voucher-interface-table',
		component: 'Layout',
		children:[{
			name: 'table',
			component:'DataGrid',
			headerHeight: 40,
			rowsCount: '{{data.interface.list.length}}',
			rowHeight: 40,
			readonly: false,
			// enableSequence: true,
			// enableAddDelrow: true,
			// startSequence: 1,
			// onAddrow: '{{$addrow}}',
			// onDelrow: '{{$delrow}}',
			columns:[{
				name: 'invoiceType',
				component: 'DataGrid.Column',
				columnKey: 'invoiceType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '票据类型'
				},
				cell: "{{$cellGetter('invoiceType')}}",
			},{
				name: 'amountNotax',
				component: 'DataGrid.Column',
				columnKey: 'amountNotax',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额'
				},
				cell: "{{$cellGetter('amountNotax')}}",
			},{
				name: 'tax',
				component: 'DataGrid.Column',
				columnKey: 'tax',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税额'
				},
				cell: "{{$cellGetter('tax')}}",
			},{
				name: 'invoiceDate',
				component: 'DataGrid.Column',
				columnKey: 'invoiceDate',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '开票日期'
				},
				cell: "{{$cellGetter('invoiceDate')}}",
			},{
				name: 'certification',
				component: 'DataGrid.Column',
				columnKey: 'certification',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证'
				},
				cell: "{{$cellGetter('certification')}}",
			},{
				name: 'certificationDate',
				component: 'DataGrid.Column',
				columnKey: 'certificationDate',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证月份'
				},
				cell: "{{$cellGetter('certificationDate')}}",
			},{
				name: 'deductibleAmount',
				component: 'DataGrid.Column',
				columnKey: 'deductibleAmount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '可抵扣进项税额'
				},
				cell: "{{$cellGetter('deductibleAmount')}}",
			},{
				name: 'deductible',
				component: 'DataGrid.Column',
				columnKey: 'deductible',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '抵扣'
				},
				cell: "{{$cellGetter('deductible')}}",
			},{
				name: 'taxRate',
				component: 'DataGrid.Column',
				columnKey: 'taxRate',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '税率（征收率）'
				},
				cell: "{{$cellGetter('taxRate')}}",
			},{
				name: 'amount',
				component: 'DataGrid.Column',
				columnKey: 'amount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '价税合计'
				},
				cell: "{{$cellGetter('amount')}}",
			},{
				name: 'department',
				component: 'DataGrid.Column',
				columnKey: 'department',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '部门'
				},
				cell: "{{$cellGetter('department')}}",
			},{
				name: 'employee',
				component: 'DataGrid.Column',
				columnKey: 'employee',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '业务员'
				},
				cell: "{{$cellGetter('employee')}}",
			},{
				name: 'client',
				component: 'DataGrid.Column',
				columnKey: 'client',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '客户'
				},
				cell: "{{$cellGetter('client')}}",
			},{
				name: 'goods',
				component: 'DataGrid.Column',
				columnKey: 'goods',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '商品或服务名称'
				},
				cell: "{{$cellGetter('goods')}}",
			},{
				name: 'assetsType',
				component: 'DataGrid.Column',
				columnKey: 'assetsType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '资产类别'
				},
				cell: "{{$cellGetter('assetsType')}}",
			},{
				name: 'assets',
				component: 'DataGrid.Column',
				columnKey: 'assets',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '资产'
				},
				cell: "{{$cellGetter('assets')}}",
			},{
				name: 'number',
				component: 'DataGrid.Column',
				columnKey: 'number',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数量'
				},
				cell: "{{$cellGetter('number')}}",
			},{
				name: 'price',
				component: 'DataGrid.Column',
				columnKey: 'price',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '单价'
				},
				cell: "{{$cellGetter('price')}}",
			},{
				name: 'investor',
				component: 'DataGrid.Column',
				columnKey: 'investor',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '投资人'
				},
				cell: "{{$cellGetter('investor')}}",
			},{
				name: 'creditor',
				component: 'DataGrid.Column',
				columnKey: 'creditor',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '债权人'
				},
				cell: "{{$cellGetter('creditor')}}",
			},{
				name: 'obligor',
				component: 'DataGrid.Column',
				columnKey: 'obligor',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '债务人'
				},
				cell: "{{$cellGetter('obligor')}}",
			},{
				name: 'bankAccount',
				component: 'DataGrid.Column',
				columnKey: 'bankAccount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '银行账号'
				},
				cell: "{{$cellGetter('bankAccount')}}",
			},{
				name: 'bankAccountOther',
				component: 'DataGrid.Column',
				columnKey: 'bankAccountOther',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '银行账号(对方)'
				},
				cell: "{{$cellGetter('bankAccountOther')}}",
			},{
				name: 'penaltyType',
				component: 'DataGrid.Column',
				columnKey: 'penaltyType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '罚款性质'
				},
				cell: "{{$cellGetter('penaltyType')}}",
			},{
				name: 'loanTerm',
				component: 'DataGrid.Column',
				columnKey: 'loanTerm',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '借款期限'
				},
				cell: "{{$cellGetter('loanTerm')}}",
			},{
				name: 'abstract',
				component: 'DataGrid.Column',
				columnKey: 'abstract',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '摘要'
				},
				cell: "{{$cellGetter('abstract')}}",
			},{
				name: 'project',
				component: 'DataGrid.Column',
				columnKey: 'project',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '项目名称'
				},
				cell: "{{$cellGetter('project')}}",
			},{
				name: 'invoiceNO',
				component: 'DataGrid.Column',
				columnKey: 'invoiceNO',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '票据编码'
				},
				cell: "{{$cellGetter('invoiceNO')}}",
			},{
				name: 'ext',
				component: 'DataGrid.Column',
				columnKey: 'ext',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展'
				},
				cell: "{{$cellGetter('ext')}}",
			},{
				name: 'stringExt',
				component: 'DataGrid.Column',
				columnKey: 'stringExt',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '字符扩展'
				},
				cell: "{{$cellGetter('stringExt')}}",
			}]
		}]
	}]
}
function getRuleMeta(){
	return [{
		name:'rule-header',
		component:'::div',
		className:'acm-voucher-rule-header',
		children:[{
			name:'title',
			component:'::span',
			children:'凭证生成规则:'
		},{
			name:'adds',
			component:'::div',
			children:[{
				name:'add-invoice1',
				component:'Button',
				onClick:'{{$newInvoiceRule}}',
				className:'acm-voucher-add-btn',
				children:'新增凭证规则1'
			},{
				name:'add-invoice2',
				component:'Button',
				onClick:'{{$newInvoiceRule2}}',
				className:'acm-voucher-add-btn',
				children:'新增凭证规则2'
			}]
		}]
	},{
		name:'rule-tab',
		className: 'acm-voucher-rule-table',
		component: 'Layout',
		children:[{
			name: 'table',
			component:'DataGrid',
			headerHeight: 40,
			rowsCount: '{{data.rule.list.length}}',
			rowHeight: 40,
			readonly: false,
			// enableSequence: true,
			// enableAddDelrow: true,
			// startSequence: 1,
			// onAddrow: '{{$addrow}}',
			// onDelrow: '{{$delrow}}',
			columns:[{
				name: 'subjectGroup',
				component: 'DataGrid.Column',
				columnKey: 'subjectGroup',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目分组'
				},
				cell: "{{$cellGetterRule('subjectGroup')}}",
			},{
				name: 'factors',
				component: 'DataGrid.Column',
				columnKey: 'factors',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '影响因素'
				},
				cell: "{{$cellGetter('factors')}}",
			},{
				name: 'taxpayer',
				component: 'DataGrid.Column',
				columnKey: 'taxpayer',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '纳税人身份'
				},
				cell: "{{$cellGetter('taxpayer')}}",
			},{
				name: 'departmentStatus',
				component: 'DataGrid.Column',
				columnKey: 'departmentStatus',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '部门属性'
				},
				cell: "{{$cellGetter('departmentStatus')}}",
			},{
				name: 'employeeStatus',
				component: 'DataGrid.Column',
				columnKey: 'employeeStatus',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '人员属性'
				},
				cell: "{{$cellGetter('employeeStatus')}}",
			},{
				name: 'goodsStatus',
				component: 'DataGrid.Column',
				columnKey: 'goodsStatus',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '存货属性'
				},
				cell: "{{$cellGetter('goodsStatus')}}",
			},{
				name: 'taxType',
				component: 'DataGrid.Column',
				columnKey: 'taxType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '计税方式'
				},
				cell: "{{$cellGetter('taxType')}}",
			},{
				name: 'certification',
				component: 'DataGrid.Column',
				columnKey: 'certification',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证'
				},
				cell: "{{$cellGetter('certification')}}",
			},{
				name: 'extStatus',
				component: 'DataGrid.Column',
				columnKey: 'extStatus',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '扩展影响因素'
				},
				cell: "{{$cellGetter('extStatus')}}",
			},{
				name: 'direction',
				component: 'DataGrid.Column',
				columnKey: 'direction',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '借贷方'
				},
				cell: "{{$cellGetter('direction')}}",
			},{
				name: 'amountType',
				component: 'DataGrid.Column',
				columnKey: 'amountType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额来源'
				},
				cell: "{{$cellGetter('amountType')}}",
			},{
				name: 'amountTypeDetail',
				component: 'DataGrid.Column',
				columnKey: 'amountTypeDetail',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额来源说明'
				},
				cell: "{{$cellGetter('amountTypeDetail')}}",
			},{
				name: 'subjectCode',
				component: 'DataGrid.Column',
				columnKey: 'subjectCode',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目编码'
				},
				cell: "{{$cellGetter('subjectCode')}}",
			},{
				name: 'subjectName',
				component: 'DataGrid.Column',
				columnKey: 'subjectName',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目名称'
				},
				cell: "{{$cellGetter('subjectName')}}",
			},{
				name: 'subjectSrc',
				component: 'DataGrid.Column',
				columnKey: 'subjectSrc',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '对方科目来源'
				},
				cell: "{{$cellGetter('subjectSrc')}}",
			}]
		}]
	}]
}



export function getInitState() {
	return {
		data: {
			content: 'hello world',
			interface:{
				other:{
					focusCellInfo:undefined
				},
				list:[{
					invoiceType:'增值税普通发票',
					bankAccount:'现金、银行、支付宝、微信',
					stringExt:'2,工资月份'
				},{
					invoiceType:'增值税专用发票'
				},{
					invoiceType:'农产品发票'
				},{
					invoiceType:'其他发票'
				}]
			},
			rule:{
				other:{
					focusCellInfo:undefined
				},
				list:[{
					subjectGroup:'A'
				},{
					subjectGroup:'B'
				},{
					subjectGroup:'C'
				},{
					subjectGroup:'A'
				}]
			}
		}
	}
}
