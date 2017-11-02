let token = sessionStorage.getItem("_accessToken")

export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'import',
		children: [
			getHeaderBtn(),
			getHeaderBtnV(),{
			name: 'prompt',
			component: 'Layout',
			className: '{{data.key=="2" ? "prompt-v" : "prompt"}}',
			children: '{{data.key=="2" ? "选择界面模板该界面使用Excel方式管理模板，效果与“凭证模板”管理相同！请同时选择以上两个模板后，一起导入！" : "选择文件选择下图的Excel模板，确认后，点击“开始导入”"}}'
			
		},{
			name: 'img',
			component: '::img',
			_visible: '{{data.key!="2"}}',
			className: 'img',
			src: '{{$getLogo()}}'
		},{
			name: 'importBtn',
			component: 'Layout',
			className: 'importBtn',
			children: [{
				name: 'btn',
				component: 'Button',
				type: "primary",
				className: 'btn',
				onClick: '{{$importFile}}',
				children: '开始导入'
			}, {
				name: 'word',
				component: 'Layout',
				className: 'word',
				children: '{{$getWord()}}'
			}]
		}]
	}
}

function getHeaderBtn() {
	return {
		name: 'checkBtn',
		component: 'Layout',
		className: 'checkBtn',
		_visible: '{{data.key!="2"}}',
		children: [{
			name: 'upload',
			component: 'Upload',
			showUploadList: false,
			action: '/v1/setEnclosure/enclosureDispose',
			headers: {token: token},
			multiple: false,
			onChange: '{{$handleImportStatementChange}}',
			accept:'.xls,.xlsx',
			className: 'check',
			beforeUpload: '{{$handleBeforeUpload}}',
			children: '选择文件'
		}]
	}
}

function getHeaderBtnV() {
	return {
		name: 'checkBtnV',
		component: 'Layout',
		className: 'checkBtn checkBtn-v',
		_visible: '{{data.key=="2"}}',
		children: [{
			name: 'upload1',
			component: 'Upload',
			showUploadList: false,
			action: '/v1/setEnclosure/enclosureDispose',
			headers: {token: token},
			multiple: false,
			onChange: '{{(file) => $handleImportStatementChange(file, "type1") }}',
			accept:'.xls,.xlsx',
			className: 'check',
			beforeUpload: '{{$handleBeforeUpload}}',
			children: '选择界面模版'
		},{
			name: 'upload2',
			component: 'Upload',
			showUploadList: false,
			action: '/v1/setEnclosure/enclosureDispose',
			headers: {token: token},
			multiple: false,
			onChange: '{{(file) => $handleImportStatementChange(file, "type2")}}',
			accept:'.xls,.xlsx',
			className: 'check',
			beforeUpload: '{{$handleBeforeUpload}}',
			children: '选择凭证模版'
		}]
	}
}

export function getData() {
	return {
		data: {
			key: ''
		},
	}
}