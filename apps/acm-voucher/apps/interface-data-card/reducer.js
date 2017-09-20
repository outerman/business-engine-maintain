import { Map } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
        this.config = config.current
    }

    init = (state, initData) => {
        const initState = getInitState()

        initState.data.dataSources = initData.dataSources
        initState.data.form = initData.form
        initState.data.other = {}
        
        return this.metaReducer.init(state, initState)
    }

    modifyContent = (state) => {
        const content = this.metaReducer.gf(state, 'data.content')
        return this.metaReducer.sf(state, 'data.content', content + '!')
    }
    editForm = (state,option) =>{
        debugger
        for (let attr in option){
            state = this.metaReducer.sf(state,'data.form.'+attr,option[attr])
        }
        return state
    }
}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
