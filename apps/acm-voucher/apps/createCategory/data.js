export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'createCategory',
		children: [{
			name: 'addType',
			component: '::ul',
			children: [{
				name: 'code',
				component: '::li',
				children: ['业务分类编码:', {
					name: 'name-1',
					component: 'Input',
					size: 'small',
					value: '{{data.code}}',
					onChange: '{{$handleChange("code")}}'
				}]
			}, {
				name: 'name',
				component: '::li',
				children: ['业务分类名称:', {
					name: 'name-1',
					component: 'Input',
					size: 'small',
					value: '{{data.name}}',
					onChange: '{{$handleChange("name")}}'
				}]
			}, {
				name: 'class',
				component: '::li',
				children: ['所属大类:', {
					name: 'class-1',
					component: 'Select',
					style:{ width: 160 },
					defaultValue: '{{data.classDataSource[0].id}}',
					onChange: '{{$handleChange("paymentsType")}}',
					children: [{
						name: 'option0',
						component: 'Select.Option',
						value: '{{data.classDataSource? data.classDataSource[_rowIndex].id:""}}',
						children: '{{data.classDataSource? data.classDataSource[_rowIndex].name:""}}',
						_power: 'for in data.classDataSource'
					}]
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			code: '',
			name: '',
			paymentsType: '10000',
			classDataSource: []
		}
	}
}