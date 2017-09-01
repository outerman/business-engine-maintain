import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import md5 from 'md5'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
        this.webapi = this.config.webapi
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        injections.reduce('init')
        if(sessionStorage['_accessToken'] && sessionStorage['password']){
            this.login()
        }
    }

    getLogo = () => this.config.logo
    handleKeyDown =(e)=>{
        if(e.keyCode ===13){
            this.login()
        }
    }
    login = async (option) => {
        let form = this.metaAction.gf('data.form').toJS()
        if(form.password){
            form.password =  md5(form.password+'yiJia9*')
        }
        if(!form.account && !form.password ){
            form.account = sessionStorage['account'],
            form.password = sessionStorage['password']
        }

        const response = await this.webapi.user.login(form)

        this.metaAction.context.set('user', response.value.sysUser)

        sessionStorage['account'] = form.account
        sessionStorage['username'] = response.value.sysUser.name
        sessionStorage['_accessToken'] = response.token
        sessionStorage['password'] = form.password
        if (this.component.props.onRedirect && this.config.goAfterLogin) {
            this.component.props.onRedirect(this.config.goAfterLogin)
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
