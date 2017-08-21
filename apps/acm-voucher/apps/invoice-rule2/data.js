export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className:'invoice-rule2',
		children: [{
			name: 'subjectGroup',
			component: '::div',
			className:'invoice-rule2-item',
			children: [{
				name:'item-label',
				className:'item-label',
				component:'::span',
				children:'科目分组：'
			},{
				name:'group',
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
			}]
		},{
			name: 'factors',
			component: '::div',
			className:'invoice-rule2-item',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'影响因素：'
			},{
				name:'group',
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
		},{
			name: 'factorsVal',
			className:'invoice-rule2-item',
			component: '::div',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'影响因素取值：'
			},{
				name:'group',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'默认'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'管理部门'
				},{
					name:'option2',
					component:'Select.Option',
					value:'2',
					children:'销售部门'
				},{
					name:'option3',
					component:'Select.Option',
					value:'3',
					children:'生产部门'
				},{
					name:'option4',
					component:'Select.Option',
					value:'4',
					children:'加工修理部门'
				}]
			}]
		},{
			name: 'direction',
			className:'invoice-rule2-item',
			component: '::div',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'借贷方：'
			},{
				name:'group',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'借'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'贷'
				}]
			}]
		},{
			name:'amountType',
			component:'::div',
			className:'inputItem invoice-rule2-item',
			children:[{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'金额来源：'
			},{
				name:'amountTypeInput',
				component:'Input',
				width:100
			}]
		},{
			name:'amountTypeDetail',
			component:'::div',
			className:'inputItem invoice-rule2-item',
			children:[{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'金额来源说明：'
			},{
				name:'detailInput',
				component:'Input',
				width:100
			}]
		},{
			name: 'subject',
			className:'invoice-rule2-item',
			component: '::div',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'科目：'
			},{
				name:'group',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'1001 库存现金'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'1002 库存现金'
				}]
			}]
		},{
			name: 'subjectSrc',
			component: '::div',
			className:'invoice-rule2-item',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'对方科目来源：'
			},{
				name:'group',
				component:'Select',
				defaultValue:'0',
				style:{ width: 120 },
				// onChange:'{{$handleChange}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'0',
					children:'结算方式'
				},{
					name:'option1',
					component:'Select.Option',
					value:'1',
					children:'本表'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'hello world'
		}
	}
}
