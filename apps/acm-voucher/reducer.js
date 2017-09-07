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
    setAccountSource = (state,data)=>{
        let accountSource = data.map(o=>{
            return {id:o.code,name:o.gradeName}
        })

        state = this.metaReducer.sf(state, 'data.dataSources.accountSource', fromJS(accountSource))
        state = this.metaReducer.sf(state, 'data.rule.other.account', fromJS([accountSource[0]]))
        return state
    }
    setRuleList = (state,columnKey,ps,val,selected)=>{
        state = this.metaReducer.sf(state,`data.rule.list.${ps.rowIndex}.${columnKey}`,val)
        if(columnKey == 'accountName'||columnKey == 'accountCode'){
            state = this.metaReducer.sf(state,`data.rule.other.account.${ps.rowIndex}`,fromJS(selected))
        }else{
            state = this.metaReducer.sf(state,`data.rule.other.${columnKey}.${ps.rowIndex}`,fromJS(selected))
        }
        return state
    }
    initRuleList = (state,initRuleList)=>{
        let other = this.metaReducer.gf(state,'data.rule.other').toJS(),
            dataSources = this.metaReducer.gf(state,'data.dataSources').toJS()

        state = this.metaReducer.sf(state,`data.rule.list`,fromJS(initRuleList))
        state = this.metaReducer.sf(state,`data.rule.other`,fromJS(other,dataSources,parseSelected(initRuleList)))
        return state
    }

    saveData = (state,data) =>{
        let dataSources = this.metaReducer.gf(state,'data.dataSources').toJS(),
            temp = this.getDataSource(data)

        for(let o in temp){
            dataSources[o] = temp[o]
        }
        state = this.metaReducer.sf(state,'data.store',fromJS(data))
        state = this.metaReducer.sf(state,'data.dataSources',fromJS(dataSources))
        return  state
    }
    getDataSource = (data) =>{
        let dataSources = {}
        dataSources.influence = data.influenceList.map(o=>{
            let temp = {id:o}
            switch (o) {
                case 'departmentAttr':
                    temp.name = '部门属性'
                    break;
                case 'departmentAttr,personAttr':
                    temp.name = '部门属性,人员属性'
                    break;
                case 'vatTaxpayer':
                    temp.name = '纳税人身份'
                    break;
                case 'vatTaxpayer,qualification':
                    temp.name = '纳税人身份,认证'
                    break;
                case 'vatTaxpayer,taxType':
                    temp.name = '纳税人身份,计税方式'
                    break;
                case 'punishmentAttr':
                    temp.name = '纳税人身份,计税方式'
                    break;
                case 'borrowAttr':
                    temp.name = '借款期限属性'
                    break;
                case 'inventoryAttr':
                    temp.name = '存货属性'
                    break;
                case 'assetAttr':
                    temp.name = '资产属性'
                    break;
                case 'accountInAttr':
                    temp.name = '账户属性流入'
                    break;
                case 'accountOutAttr':
                    temp.name = '账户属性流出'
                    break;
                case 'formula':
                    temp.name = '公式'
                    break;
            }
            return temp
        })
        dataSources.vatTaxpayer = data.vatTaxpayerList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.departmentAttr= data.departmentAttrList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.personAttr = data.personAttrList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.goodsAttr = data.inventoryPropertyList.map(o=>{
            return {id:o.templateId,name:o.name}
        })
        dataSources.taxType = [{id:true,name:'一般计税'},{id:false,name:'建议计税'}]
        dataSources.qualification = [{id:true,name:'是'},{id:false,name:'否'}]

        return dataSources
    }
    initTemplate = (state,templateData) =>{
        return this.metaReducer.sf(state,'data.templateData',fromJS(templateData))
    }
    initForm = (state,data) =>{
        let metaReducer = this.metaReducer
        let other = this.metaReducer.gf(state,'data.rule.other').toJS(),
            dataSources = this.metaReducer.gf(state,'data.dataSources').toJS()

        state = this.metaReducer.sf(state,'data.interface.list',fromJS(data.interface.list))
        state = this.metaReducer.sf(state,'data.rule.list',fromJS(data.rule.list))
        state = this.metaReducer.sf(state,`data.rule.other`,fromJS(parseSelected(other,dataSources,data.rule.list)))
        return state
    }
}
function parseSelected (other,dataSources,list){

    list.map((o,i)=>{
        if(o.accountCode){
            other.account[i] = dataSources.accountSource.filter(oo=>{
                return oo.id == o.accountCode
            })[0]
        }
        other.influence[i] = dataSources.influence.filter(oo=>{
            return oo.id == o.influence
        })
        other.vatTaxpayer[i] = dataSources.vatTaxpayer.filter(oo=>{
            return oo.id = o.vatTaxpayer
        })[0]
        other.departmentAttr[i] = dataSources.departmentAttr.filter(oo=>{
            return oo.id = o.departmentAttr
        })[0]
        other.personAttr[i] = dataSources.personAttr.filter(oo=>{
            return oo.id = o.personAttr
        })[0]
        other.goodsAttr[i] = dataSources.goodsAttr.filter(oo=>{
            return oo.id = o.goodsAttr
        })[0]
        other.taxType[i] = dataSources.taxType.filter(oo=>{
            return oo.id = o.taxType
        })[0]
        other.qualification[i] = dataSources.qualification.filter(oo=>{
            return oo.id = o.qualification
        })[0]
    })
    return other
}
export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
