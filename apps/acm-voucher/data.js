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
					/*[{
						name:'in',
						title:'收入',
						component:'Tree.TreeNode',
						key:"0-0-0",
						children:[{
							name:'',
							title:'销售商品',
							component:'Tree.TreeNode',
							key:"0-0-1",
						}]

					}, {
						name:'out',
						title:'支出',
						component:'Tree.TreeNode',
						key:"1-0-0",
						children:[{
							name:'',
							title:'采购商品',
							component:'Tree.TreeNode',
							key:"1-0-1",
						}]

					}]*/
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
