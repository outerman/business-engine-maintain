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
		this.injections.reduce("changeData", key, e.target.value)
	}

    onOk = () => {
        let list = this.metaAction.gf('data').toJS()
		
		list.isShow = true
		list.treeCode = list.code
		
        return {result: true, value:list}
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}