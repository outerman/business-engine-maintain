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
				children: ['编码:', {
					name: 'code-1',
					component: 'Input',
					size: 'small',
					value: '{{data.code}}',
					onChange: '{{$handleChange("code")}}'
				}]
			}, {
				name: 'name',
				component: '::li',
				children: ['名称:', {
					name: 'name-1',
					component: 'Input',
					size: 'small',
					value: '{{data.name}}',
					onChange: '{{$handleChange("name")}}'
				}]
			}]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			code: '',
			name: ''
		}
	}
}