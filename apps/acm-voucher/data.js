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
							children:'{{data.templateData.businessType.code}}'
						}]
					},{
						name:'item2',
						component:'::li',
						children:['业务类型:',{
							name:'itme2-1',
							component:'::span',
							children:'{{data.templateData.businessType.typeName}}'
						}]
					},{
						name:'item3',
						component:'::li',
						children:['业务名称:',{
							name:'itme3-1',
							component:'Input',
							size:'small',
							width:100,
							value:'{{data.templateData.businessType.name}}'
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
							component:'Checkbox',
							// onChange:'{{$onChange}}',
							children:'隐藏业务'
						}]
					},{
						name:'item-r-2',
						component:'::li',
						children:[{
							name:'item-r-2-1',
							component:'Checkbox',
							// onChange:'{{$onChange}}',
							children:'需要结算'
						}]
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
	}
	,{
		name:'interface-tab',
		className: 'acm-voucher-interface-table',
		component: 'Layout',
		children:[{
			name: 'table',
			component:'DataGrid',
			headerHeight: 30,
			rowsCount: '{{data.interface.list.length}}',
			rowHeight: 30,
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
				cell: "{{$cellGetter('invoiceType.name')}}",
			},{
				name: 'noTaxAmount',
				component: 'DataGrid.Column',
				columnKey: 'noTaxAmount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额'
				},
				cell: "{{$cellGetter('noTaxAmount')}}",
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
					children: '人员'
				},
				cell: "{{$cellGetter('employee')}}",
			},{
				name: 'customer',
				component: 'DataGrid.Column',
				columnKey: 'customer',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '客户'
				},
				cell: "{{$cellGetter('customer')}}",
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
			},
			// {
			// 	name: 'settlement',
			// 	component: 'DataGrid.Column',
			// 	columnKey: 'settlement',
			// 	flexGrow: 1,
			// 	width: 100,
			// 	header: {
			// 		name: 'header',
			// 		component: 'DataGrid.Cell',
			// 		children: '结算方式'
			// 	},
			// 	cell: "{{$cellGetter('settlement')}}",
			// },
			{
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
				name: 'bankAccount',
				component: 'DataGrid.Column',
				columnKey: 'bankAccountR',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '银行账号'
				},
				cell: "{{$cellGetter('bankAccount')}}",
			},{
				name: 'settlement',
				component: 'DataGrid.Column',
				columnKey: 'bankAccountName',
				flexGrow: 1,
				width: 150,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '结算方式'
				},
				cell: "{{$cellGetter('settlement')}}",
			},{
				name: 'incomeAccount',
				component: 'DataGrid.Column',
				columnKey: 'incomeAccount',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '银行账号(对方)'
				},
				cell: "{{$cellGetter('incomeAccount')}}",
			},{
				name: 'billNumber',
				component: 'DataGrid.Column',
				columnKey: 'billNumber',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '票据号'
				},
				cell: "{{$cellGetter('billNumber')}}",
			},{//normalRate
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
			},{//normalRate
				name: 'normalRate',
				component: 'DataGrid.Column',
				columnKey: 'taxRate',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '一般纳税人税率'
				},
				cell: "{{$cellGetter('normalRate')}}",
			},{//normalRate
				name: 'smallRate',
				component: 'DataGrid.Column',
				columnKey: 'smallRate',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '小规模税率）'
				},
				cell: "{{$cellGetter('smallRate')}}",
			},{
				name: 'isDeduct',
				component: 'DataGrid.Column',
				columnKey: 'isDeduct',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '抵扣'
				},
				cell: "{{$cellGetter('isDeduct')}}",
			},{
				name: 'byInvestor',
				component: 'DataGrid.Column',
				columnKey: 'byInvestor',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '被投资人'
				},
				cell: "{{$cellGetter('byInvestor')}}",
			}/*,{
				name: 'investmentType',
				component: 'DataGrid.Column',
				columnKey: 'investmentType',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '投资类别'
				},
				cell: "{{$cellGetter('investmentType')}}",
			}*/,{
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
				cell: "{{$cellGetter('billingDate')}}",
			},{
				name: 'isQualification',
				component: 'DataGrid.Column',
				columnKey: 'isQualification',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证'
				},
				cell: "{{$cellGetter('isQualification')}}",
			},{
				name: 'certificationMonth',
				component: 'DataGrid.Column',
				columnKey: 'certificationMonth',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证月份'
				},
				cell: "{{$cellGetter('certificationMonth')}}",
			},{
				name: 'deductibleInputTax',
				component: 'DataGrid.Column',
				columnKey: 'deductibleInputTax',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '可抵扣进项税额'
				},
				cell: "{{$cellGetter('deductibleInputTax')}}",
			},{
				name: 'vatTaxpayerSmall',
				component: 'DataGrid.Column',
				columnKey: 'vatTaxpayerSmall',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '票据类型小规模'
				},
				cell: "{{$cellGetter('vatTaxpayerSmall')}}",
			},{
				name: 'vatTaxpayerNormal',
				component: 'DataGrid.Column',
				columnKey: 'vatTaxpayerNormal',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '票据类型一般'
				},
				cell: "{{$cellGetter('vatTaxpayerNormal')}}",
			},{
				name: 'ext0',
				component: 'DataGrid.Column',
				columnKey: 'ext0',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展0'
				},
				cell: "{{$cellGetter('ext0','extTitle0')}}",
			},{
				name: 'ext1',
				component: 'DataGrid.Column',
				columnKey: 'ext1',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展1'
				},
				cell: "{{$cellGetter('ext1')}}",
			},{
				name: 'ext2',
				component: 'DataGrid.Column',
				columnKey: 'ext2',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展2'
				},
				cell: "{{$cellGetter('ext2')}}",
			},{
				name: 'ext3',
				component: 'DataGrid.Column',
				columnKey: 'ext3',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展3'
				},
				cell: "{{$cellGetter('ext3')}}",
			},{
				name: 'ext4',
				component: 'DataGrid.Column',
				columnKey: 'ext4',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展4'
				},
				cell: "{{$cellGetter('ext4')}}",
			},{
				name: 'ext5',
				component: 'DataGrid.Column',
				columnKey: 'ext5',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展5'
				},
				cell: "{{$cellGetter('ext5')}}",
			},{
				name: 'ext6',
				component: 'DataGrid.Column',
				columnKey: 'ext6',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展6'
				},
				cell: "{{$cellGetter('ext6')}}",
			},{
				name: 'ext7',
				component: 'DataGrid.Column',
				columnKey: 'ext7',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展7'
				},
				cell: "{{$cellGetter('ext7')}}",
			},{
				name: 'ext8',
				component: 'DataGrid.Column',
				columnKey: 'ext8',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展8'
				},
				cell: "{{$cellGetter('ext8')}}",
			},{
				name: 'ext9',
				component: 'DataGrid.Column',
				columnKey: 'ext9',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '数值扩展9'
				},
				cell: "{{$cellGetter('ext9')}}",
			},{
				name: 'stringExt0',
				component: 'DataGrid.Column',
				columnKey: 'stringExt0',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '字符扩展0'
				},
				cell: "{{$cellGetter('stringExt0')}}",
			},{
				name: 'stringExt1',
				component: 'DataGrid.Column',
				columnKey: 'stringExt1',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '字符扩展1'
				},
				cell: "{{$cellGetter('stringExt1')}}",
			},{
				name: 'stringExt2',
				component: 'DataGrid.Column',
				columnKey: 'stringExt2',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '字符扩展2'
				},
				cell: "{{$cellGetter('stringExt2')}}",
			},{
				name: 'stringExt3',
				component: 'DataGrid.Column',
				columnKey: 'stringExt3',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '字符扩展3'
				},
				cell: "{{$cellGetter('stringExt3')}}",
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
			name:'rule-header-left',
			component:'::div',
			children:[{
				name:'title',
				component:'::span',
				children:'凭证生成规则:'
			},{
				name:'standard',
				component:'Radio.Group',
				defaultValue:18,
				onChange:'{{$handleStandardChange}}',
				children:[{
					name:'standard1',
					component:'Radio',
					value:18,
					// defaultChecked:true,
					children:'07准则'
				},{
					name:'standard2',
					component:'Radio',
					value:19,
					children:'13准则'
				}]
			}]
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
			headerHeight: 30,
			rowsCount: '{{data.rule.list.length}}',
			rowHeight: 30,
			readonly: false,
			// enableSequence: true,
			// enableAddDelrow: true,
			// startSequence: 1,
			// onAddrow: '{{$addrow}}',
			// onDelrow: '{{$delrow}}',
			columns:[{
				name: 'flag',
				component: 'DataGrid.Column',
				columnKey: 'flag',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目分组'
				},
				cell: "{{$cellGetterRule('flag')}}",
			},{
				name: 'influence',
				component: 'DataGrid.Column',
				columnKey: 'influence',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '影响因素'
				},
				cell: "{{$cellGetterRule('influence')}}",
			},{
				name: 'vatTaxpayer',
				component: 'DataGrid.Column',
				columnKey: 'vatTaxpayer',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '纳税人身份'
				},
				cell: "{{$cellGetterRule('vatTaxpayer')}}",
			},{
				name: 'departmentAttr',
				component: 'DataGrid.Column',
				columnKey: 'departmentAttr',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '部门属性'
				},
				cell: "{{$cellGetterRule('departmentAttr')}}",
			},{
				name: 'personAttr',
				component: 'DataGrid.Column',
				columnKey: 'personAttr',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '人员属性'
				},
				cell: "{{$cellGetterRule('personAttr')}}",
			},{
				name: 'goodsAttr',
				component: 'DataGrid.Column',
				columnKey: 'goodsAttr',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '存货属性'
				},
				cell: "{{$cellGetterRule('goodsAttr')}}",
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
				cell: "{{$cellGetterRule('taxType')}}",
			},{
				name: 'qualification',
				component: 'DataGrid.Column',
				columnKey: 'qualification',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '认证'
				},
				cell: "{{$cellGetterRule('qualification')}}",
			},{
				name: 'extendAttr',
				component: 'DataGrid.Column',
				columnKey: 'extendAttr',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '扩展影响因素'
				},
				cell: "{{$cellGetterRule('extendAttr')}}",
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
				cell: "{{$cellGetterRule('direction')}}",
			},{
				name: 'fundSource',
				component: 'DataGrid.Column',
				columnKey: 'fundSource',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额来源'
				},
				cell: "{{$cellGetterRule('fundSource')}}",
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
				cell: "{{$cellGetterRule('amountTypeDetail')}}",
			},{
				name: 'accountCode',
				component: 'DataGrid.Column',
				columnKey: 'accountCode',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目编码'
				},
				cell: "{{$cellGetterRule('accountCode')}}",
			},{
				name: 'accountName',
				component: 'DataGrid.Column',
				columnKey: 'accountName',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目名称'
				},
				cell: "{{$cellGetterRule('accountName')}}",
			},{
				name: 'isSettlement',
				component: 'DataGrid.Column',
				columnKey: 'isSettlement',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '对方科目来源'
				},
				cell: "{{$cellGetterRule('isSettlement')}}",
			}]
		}]
	}]
}



export function getInitState() {
	return {
		data: {
			dataSources:{},
			store:{},
			templateData:{
				businessType:{
				}
			},
			content: 'hello world',
			standard:18,
			interface:{
				other:{
					focusCellInfo:undefined
				},
				list:[{
					invoiceType:{
						name:'农产品发票',
						id:200000000000054
					},
					bankAccount:2,
					settlement:[
						{id: 1, name: "现金"}
					],
					stringExt:'',
					noTaxAmount:'',
				    "stringExt0": 1,
				    "extTitle7": "数值",
				    "stringExt1": 1,
				    "extTitle8": "数值",
				    // "settlement": [5, 2, 3, 4],
					// settlement:1,
				    "abstract": 1,
				    "stringExt2": 1,
				    "extTitle9": "数值",
				    "noTaxAmount": 2,
				    "stringExt3": 1,
				    "penaltyType": 1,
				    "assets": 2,
				    "incomeAccount": 1,
				    "stringExt4": 1,
				    "isQualification": 2,
				    "certificationMonth": 2,
				    "stringExtTitle0": "字符",
				    "billingDate": 2,
				    "stringExtTitle1": "字符",
				    "price": 2,
				    "number": 2,
				    "stringExtTitle2": "字符",
				    "stringExtTitle3": "字符",
				    "taxRate": 2,
				    "tax": 2,
				    "stringExtTitle4": "字符",
				    "isDeduct": 2,
				    "invoiceNO": 1,
				    "employee": 2,
				    "ext0": 1,
				    "ext1": 1,
				    "ext2": 1,
				    "ext3": 1,
				    "department": 2,
				    "ext4": 1,
				    "ext5": 1,
				    "vatTaxpayerSmall": 1,
				    "ext6": 1,
				    "deductibleInputTax": 2,
				    "ext7": 1,
				    "goods": 2,
				    "ext8": 1,
					billNumber:1,
				    "industryIdList": [2, 3],
				    "amount": 2,
				    "investor": 2,
					byInvestor:0,
				    "ext9": 1,
				    "extTitle0": "数值",
				    "project": 1,
				    "extTitle1": "数值",
				    "vatTaxpayerNormal": 0,
				    "obligor": 2,
				    "extTitle2": "数值",
				    "loanTerm": 1,
				    "extTitle3": "数值",
				    "creditor": 2,
				    "drawbackPolicy": 2,
				    "assetsType": 2,
				    "extTitle4": "数值",
				    "extTitle5": "数值",
				    "customer": 2,
				    "extTitle6": "数值"
				},{
					invoiceType:{name:'增值税专用发票'}
				},{
					invoiceType:{name:'增值税专用发票'},
					noTaxAmount:''
				},{
					invoiceType:{name:'其他发票'}
				}]
			},
			rule:{
				other:{
					focusCellInfo:undefined,
					account:[],
					influence:[],
					vatTaxpayer:[],
					departmentAttr:[],
					personAttr:[],
					goodsAttr:[],
					taxType:[],
					qualification:[]

				},
				list:[{
				    "orgId": 0,
				    "flag": "B",
				    // "influence": "vatTaxpayer,taxType",
				    // "vatTaxpayer": 41,
				    // "taxType": false,
				    // "direction": true,
				    // "fundSource": "税额",
				    // "accountCode": "222108",
				    // "accountName": "应交税费-简易计税",
				    // "isSettlement": true,
				    // "industryIdList": [2],
				    // "idList": [498927]
				}]
			}
		}
	}
}
