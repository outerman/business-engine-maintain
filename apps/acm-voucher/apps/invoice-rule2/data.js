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
				component:'Input',
				defaultValue:'A',
				value:'{{data.form.flag}}',
				style:{ width: 120 },
				onChange:'{{$handleChange("flag")}}'

			}]
		},{
			name: 'influence',
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
				defaultValue:'{{data.dataSources.influence[0].value}}',
				style:{ width: 120 },
				// value:'{{data.other.influence.value}}',
				onChange:'{{$handleSelectChange("influence")}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'{{data.dataSources.influence ? data.dataSources.influence[_rowIndex].value:""}}',
					children:'{{data.dataSources.influence ? data.dataSources.influence[_rowIndex].name:""}}',
					_power:  'for in data.dataSources.influence'
				}]
			}]
		},{
			name: 'influenceVal',
			className:'invoice-rule2-item',
			component: '::div',
			children: '{{$getInfluenceValChildren(data.form.influence)}}'
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
				defaultValue:false,
				style:{ width: 120 },
				// value:'{{data.other.direction.value}}',
				onChange:'{{$handleSelectChange("direction")}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'{{data.dataSources.direction ? data.dataSources.direction[_rowIndex].value:""}}',
					children:'{{data.dataSources.direction ? data.dataSources.direction[_rowIndex].name:""}}',
					_power:  'for in data.dataSources.direction'
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
				value:'{{data.form.fundSource}}',

				onChange:'{{$handleChange("fundSource")}}',
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
				defaultValue:'{{data.dataSources.accountSource[0].id}}',
				style:{ width: 120 },
				// value:'{{data.other.account.id}}',
				onChange:'{{$handleSelectChange("account")}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:'{{data.dataSources.accountSource ? data.dataSources.accountSource[_rowIndex].id :""}}',
					children:'{{data.dataSources.accountSource ? data.dataSources.accountSource[_rowIndex].name:""}}',
					_power:  'for in data.dataSources.accountSource'
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
				defaultValue:true,
				style:{ width: 120 },
				// value:'{{data.other.isSettlement.value}}',
				onChange:'{{$handleSelectChange("isSettlement")}}',
				children:[{
					name:'option0',
					component:'Select.Option',
					value:true,
					children:'结算方式'
				},{
					name:'option1',
					component:'Select.Option',
					value:false,
					children:'本表'
				}]
			}]
		},{
			name: 'industry',
			component: '::div',
			className:'invoice-rule2-item',
			children: [{
				name:'item-label',
				component:'::span',
				className:'item-label',
				children:'支持行业：'
			},{
				name:'group',
				component:'Checkbox.Group',
				defaultValue:['工业'],
				options:'{{data.dataSources.industryIdList}}',
				// options:['一般纳税人','小规模'],
				// defaultValue:['一般纳税人'],
				style:{ width: 120 },
				onChange:'{{$handleSelectChange("industryIdList")}}',

			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			dataSources:{},
			content: 'hello world',
			other:{
				influence:{id:0,value:0,name:'默认'},
				direction:{},
				account:{id:0,value:0,name:'默认'},
				isSettlement:{id:0,value:0,name:'默认'},
			},
			form:{
				flag:'A',
				influence:'departmentAttr' ,
				direction:false,
				accountCode:'1001',
				accountName:'库存现金',
				isSettlement:true,
				industryIdList:[1]

			}
		}
	}
}
