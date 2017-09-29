import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
		this.initData = component.props.initData
		
		if(this.component.props.setOkListener)
			this.component.props.setOkListener(this.onOk)
		
        injections.reduce('init', this.initData)
    }

    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
	
	handleChange = (key) => (e) => {
		let value = e
		if(key == 'name' || key == 'code') {
			value = e.target.value
		}
		this.injections.reduce("changeData", key, value)
	}

    onOk = () => {
        let list = this.metaAction.gf('data').toJS(),
			data = {}
		
		data.isShow = true
		data.name = list.name
		data.code = list.code
		data.treeCode = list.code
		data.paymentsType = list.paymentsType
		
        return {result: true, value:data}
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}