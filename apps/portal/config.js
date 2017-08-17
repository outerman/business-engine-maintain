import logo from './img/logo.png'
import webapi from './webapi'

var _options = {
	webapi,
	goAfterLogout: {
		appName: 'mk-app-login',
		appParams: {}
	},
	menu: [{
		key: '1',
		name: 'about',
		appName: 'mk-app-portal-about',
		isDefault: true
	}, {
		key: '2',
		name: '流水账模板管理',
		isExpand:true,
		children: [{
			key: '201',
			name: '模板编辑',
			appName: 'acm-voucher'
		}, {
			key: '202',
			name: '模板列表',
			appName: 'mk-app-complex-table'
		}]
	}],
	logo
}

function config(options) {
	if (options) {
		Object.assign(_options, options)
	}
}

config.current = _options

export default config
