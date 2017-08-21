export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'invoice-rule',
		children: [{
			name: 'header',
			component: 'Layout',
			className: 'invoice-rule-header',
			children: ['科目分组：',{
				name:'subItem',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'A'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'B'
				},{
					name:'option2',
					component:'Select.Option',
					value:'2',
					children:'C'
				}]
			},'影响因素：',{
				name:'factors',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'(无影响因素)'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'部门属性'
				},{
					name:'option2',
					component:'Select.Option',
					value:'2',
					children:'人员属性'
				},{
					name:'option3',
					component:'Select.Option',
					value:'3',
					children:'纳税人'
				},{
					name:'option4',
					component:'Select.Option',
					value:'4',
					children:'计税方式'
				}]
			}]
		}, {
			name: 'table',
			component: 'DataGrid',
			headerHeight: 30,
			rowsCount: '{{data.list.length}}',
			rowHeight: 30,
			readonly: false,
			// enableSequence: true,
			// enableAddDelrow: true,
			// startSequence: 1,
			// onAddrow: '{{$addrow}}',
			// onDelrow: '{{$delrow}}',
			columns: [{
				name: 'name',
				component: 'DataGrid.Column',
				columnKey: 'name',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '纳税人身份'
				},
				cell: "{{$cellGetter('name')}}",
			}, {
				name: 'mobile',
				component: 'DataGrid.Column',
				columnKey: 'mobile',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '计税方式'
				},
				cell: "{{$cellGetter('mobile')}}",
			}, {
				name: 'birthday',
				component: 'DataGrid.Column',
				columnKey: 'birthday',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '借贷方'
				},
				cell: "{{$cellGetter('birthday')}}",
			}, {
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
			}, {
				name: 'amountTypeDetail',
				component: 'DataGrid.Column',
				columnKey: 'amountTypeDetail',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '金额来源'
				},
				cell: "{{$cellGetter('amountTypeDetail')}}",
			}, {
				name: 'subject',
				component: 'DataGrid.Column',
				columnKey: 'subject',
				flexGrow: 1,
				width: 100,
				header: {
					name: 'header',
					component: 'DataGrid.Cell',
					children: '科目'
				},
				cell: "{{$cellGetter('subject')}}",
			},{
				name: 'subjectSrc',
				component: 'DataGrid.Column',
				columnKey: 'subject',
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
	}
}

export function getInitState() {
	return {
		data: {
			list: [],
			other: {}
		}
	}
}
