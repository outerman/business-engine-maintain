export function getMeta() {
	return {
		name: 'root',
		component: '::div',
		className: 'mk-app-portal-about',
		children: '{{data.about}}'
	}
}

export function getInitState() {
	return { data: {
		about:'北京人人时代科技有限公司流水账业务模版管理系统'
	} }
}
