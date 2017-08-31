import { Map,fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, option) => {
        const initState = getInitState()
        return this.metaReducer.init(state, initState)
    }

    modifyContent = (state) => {
        const content = this.metaReducer.gf(state, 'data.content')
        return this.metaReducer.sf(state, 'data.content', content + '!')
    }
    addBisness = (state)=>{
        return state
    }
    initTree = (state,data)=>{
        return this.metaReducer.sf(state, 'data.tree', fromJS(data.types))
    }
    saveData = (state,data) =>{
        return  this.metaReducer.sf(state,'data.store',fromJS(data))
    }
    initTemplate = (state,templateData) =>{
        return this.metaReducer.sf(state,'data.templateData',fromJS(templateData))
    }
    initForm = (state,data) =>{

        state = this.metaReducer.sf(state,'data.interface.list',fromJS(data.interface.list))
        state = this.metaReducer.sf(state,'data.rule.list',fromJS(data.rule.list))
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
