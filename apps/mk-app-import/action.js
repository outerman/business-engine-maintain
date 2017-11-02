import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import webapi from './webapi'
import logo3 from '../portal/img/mobanguanli/3.png'
import logo4 from '../portal/img/mobanguanli/4.png'
import logo5 from '../portal/img/mobanguanli/5.png'
import logo6 from '../portal/img/mobanguanli/6.png'
import logo7 from '../portal/img/mobanguanli/7.png'

let fileInfos = {}

class action {
	constructor(option) {
		this.metaAction = option.metaAction
		this.config = config
	}
	
	key = ''
	url = ''
	word = ''
	
	onInit = ({ component, injections }) => {
		this.component = component
		this.injections = injections
		
		let data = component.props.initData
		this.key = data
		
		switch(data){
			case '2':
				this.url = ''
				this.word = ''
				break
			case '3':
				this.url = logo3
				this.word = '(仅识别和导入“允许客户自行修改科目的业务”一个页签即可)'
				break
			case '4':
				this.url = logo4
				this.word = '(仅识别和导入“收入类型对应属性表”一个页签即可)'
				break
			case '5':
				this.url = logo5
				this.word = '(仅识别和导入“业务类型存货关系表”一个页签即可)'
				break
			case '6':
				this.url = logo6
				this.word = ''
				break
			case '7':
				this.url = logo7
				this.word = ''
				break
		}
		injections.reduce('init', data)
	}
	
	getLogo = () => this.url
	
	getWord = () => this.word
	
	handleImportStatementChange = (type, btnType) => {
		if(type.file.status != 'uploading')
			//this.props.hideLoadingMask()
		
		if (type.file.status === 'done') {
			if (type.file.response.error && type.file.response.error.message) {
				this.metaAction.toast('error', type.file.response.error.message)
				return
			}else if(type.file.response.result && type.file.response.value){
				let initData = type.file.response.value.setEnclosureList
				
				if(this.key != '2'){
					fileInfos['info'+this.key] = initData
				}else{
					 if(btnType == 'type1'){
						 if(fileInfos['info'+this.key]){
							 fileInfos['info'+this.key].type1 = initData
						 }else{
							 fileInfos['info'+this.key] = {
								 type1: initData
							 }
						 }
					 }
					 if(btnType == 'type2'){
						 if(fileInfos['info'+this.key]){
							 fileInfos['info'+this.key].type2 = initData
						 }else{
							 fileInfos['info'+this.key] = {
								 type2: initData
							 }
						 }
					 }
				}
				this.metaAction.toast('success', '导入文件成功！')
			}
		}else if (type.file.status === 'error') {
			this.metaAction.toast('error', `${type.file.name} 上传失败`)
		}
	}
	
	handleBeforeUpload = (file) => {
		let three=file.name.split("."),
			suffix=three[three.length-1]
		
		if(suffix === 'xls' || suffix === 'xlsx'){
			//this.props.showLoadingMask({content:'正在上传...'})
			return true
		}
		
		this.metaAction.toast('error', '只支持导入excel格式文件')
		
		return false
	}
	
	importFile = () => {
		debugger
		console.log(fileInfos)
		switch(this.key){
			case '2':
				debugger
				break
			case '3':
				debugger
				break
			case '4':
				debugger
				break
			case '5':
				debugger
				break
			case '6':
				debugger
				break
			case '7':
				debugger
				break
		}
	}
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}