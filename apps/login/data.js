export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'mk-app-login',
		onKeyDown:'{{$handleKeyDown}}',
		children: [{
			name: 'header',
			className: 'mk-app-login-header',
			component: 'Layout',
			children: [{
				name: 'logo',
				component: '::img',
				className: 'mk-app-login-header-logo',
				src: '{{$getLogo()}}'
			}, '北京人人时代科技有限公司']
		}, {
			name: 'content',
			className: 'mk-app-login-content',
			component: 'Layout',
			children: [{
				name: 'contentLeft',
				className: 'mk-app-login-content-left',
				component: 'Layout',
			}, {
				name: 'form',
				component: 'Form',
				className: 'mk-app-login-content-form',
				children: [{
					name: 'item1',
					component: 'Form.Item',
					className: 'mk-app-login-content-form-title',
					children: 'Login'
				}, {
					name: 'item2',
					component: 'Form.Item',
					children: [{
						name: 'user',
						component: 'Input',
						placeholder: 'user name',
						onChange: "{{(e)=>$setField('data.form.account', e.target.value)}}",
						value: '{{data.form.account}}',
						prefix: {
							name: 'userIcon',
							component: 'Icon',
							type: 'user',
						}
					}]
				}, {
					name: 'item3',
					component: 'Form.Item',
					children: [{
						name: 'password',
						component: 'Input',
						placeholder: 'password',
						type: 'password',
						onChange: "{{(e)=>$setField('data.form.password', e.target.value)}}",
						value: '{{data.form.password}}',
						prefix: {
							name: 'passwordIcon',
							component: 'Icon',
							type: 'lock',
						}
					}]
				}, {
					name: 'item4',
					component: 'Form.Item',
					children: [{
						name: 'remember',
						component: 'Checkbox',
						children: 'Remember me'
					}, {
						name: 'forgot',
						component: '::a',
						style: { float: 'right' },
						children: 'Forgot password'
					}]
				}, {
					name: 'item5',
					component: 'Form.Item',
					children: [{
						name: 'loginBtn',
						component: 'Button',
						type: 'primary',
						children: 'Log in',
						onClick: '{{$login}}'
					}]
				}, {
					name: 'item6',
					component: 'Form.Item',
					children: [{
						name: 'register',
						component: '::a',
						children: 'Register now!'
					}]
				}]
			}, {
				name: 'contentRight',
				className: 'mk-app-login-content-right',
				component: 'Layout',
			},]
		}, {
			name: 'footer',
			className: 'mk-app-login-footer',
			component: 'Layout',
			children: 'copyright © 2015-2017 Monkey King'
		}]
	}
}

export function getInitState() {
	return {
		data: {
			form: { account: '', password: '' }
		}
	}
}
