import { Map,fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import * as consts from './consts'
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
    initTree = (state,data, businessTypeList)=>{
        state = this.metaReducer.sf(state, 'data.businessTypeList', fromJS(businessTypeList))
        state = this.metaReducer.sf(state, 'data.tree', fromJS(data.types))
        return state
    }

    setInventoryProperty = (state,value)=>{
        let inventoryPropertyList = value.map(o=>{
            return {name:o}
        })

        state = this.metaReducer.sf(state,'data.other.inventoryProperty',fromJS(value))
        state = this.metaReducer.sf(state,'data.templateData.inventoryPropertyList',fromJS(inventoryPropertyList))

        return state

    }


    setAccountSource = (state,data)=>{
        let accountSource = data.map((o,i)=>{
            return {id: i+1,value:o.code,name:o.gradeName}
        })

        accountSource.unshift({id:0,value:0,name:'默认'})

        state = this.metaReducer.sf(state, 'data.dataSources.accountSource', fromJS(accountSource))
        state = this.metaReducer.sf(state, 'data.rule.other.account', fromJS([accountSource[0]]))
        return state
    }
    setRuleList = (state,columnKey,ps,val,selected)=>{
        if(columnKey !=='extendAttr' ){
            val = selected.value
        }
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
        state = this.metaReducer.sf(state,`data.rule.other`,fromJS(parseSelected(other,dataSources,initRuleList)))
        return state
    }
    saveData = (state,data) =>{

        let inventoryPropertyList = JSON.parse(JSON.stringify(data.inventoryPropertyList))

        state = this.metaReducer.sf(state,'data.store',fromJS(data))
        state = this.metaReducer.sf(state,'data.dataSources.inventoryPropertyList',fromJS(inventoryPropertyList))
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
                    temp.name = '罚款性质'
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
        dataSources.inventoryAttr = data.inventoryPropertyList.map(o=>{
            return {id:o.templateId,name:o.name}
        })
        dataSources.punishmentAttr = data.penaltyTypeList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.borrowAttr = data.loanTermList.map(o=>{
            return {id:o.enumItemId,name:o.enumItemName}
        })
        dataSources.assetAttr = []

        for(let o of data.inventoryPropertyList ){
            if(!o.detailList) continue
            o.detailList.map(oo=>{
                dataSources.assetAttr.push({
                    id:oo.templateId,
                    name:oo.name
                })
            })
        }
        dataSources.industryIdList = data.industryIdList.map(o=>{
            return o.enumItemName
        })

        dataSources.taxType = [{id:true,name:'一般计税'},{id:false,name:'简易计税'}]
        dataSources.qualification = [{id:true,name:'是'},{id:false,name:'否'}]

        return dataSources
    }

    initTemplate = (state,templateData,typeName) =>{
        state = this.metaReducer.sf(state,'data.typeName',typeName)
        state = this.metaReducer.sf(state,'data.other.codeEditable',false)
        state = this.metaReducer.sf(state,'data.other.isHide',!templateData.businessType.isShow)
        state = this.metaReducer.sf(state,'data.templateData',fromJS(templateData))
        state = this.metaReducer.sf(state,'data.other.status',false)
        return state
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
    newBusiness = (state,typeName) =>{
        state = this.metaReducer.sf(state,'data.other.codeEditable',true)
        state = this.metaReducer.sf(state,'data.typeName','1')
        state = this.metaReducer.sf(state,'data.templateData',fromJS(this.newBusinessData(state,typeName)))
        state = this.metaReducer.sf(state,'data.interface.list',fromJS([]))
        state = this.metaReducer.sf(state,'data.rule.list',fromJS([]))
        state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right')
        state = this.metaReducer.sf(state,'data.other.status',true)
        return state
    }
    newBusinessData =(state,typeName)=>{
        let paymentsType = 10000
        // let templateData = this.metaReducer.gf(state,'data.templateData').toJS()
        let templateData = {
            businessType:{
                isShow:true,
                paymentsType: getPaymentsType(typeName)
            },
            docTemplateList:[],
            inventoryPropertyList:[],
            tacticsList:[],
            taxProperty:{}
        }
        function getPaymentsType(typeName){
            let ret = 10000
            switch (typeName) {
                case '1':
                    ret = 10000
                    break;
                case '2':
                    ret = 10001
                    break;
                case '3':
                    ret = 10002
                    break;
                case '4':
                    ret = 10003
                    break;
                case '5':
                    ret = 10004
                    break;
            }
            return ret
        }
        return templateData
    }
	selectInOrOutInfo = (state, selectInOrOutInfo) => {
		state = this.metaReducer.sf(state, 'data.other.selectInOrOutInfo', selectInOrOutInfo)
		let treeType = this.metaReducer.gf(state, 'data.businessTypeList'), isTypeClass
		treeType.map(o => {
			if(o.get('code') == selectInOrOutInfo['data-code']) {
				isTypeClass = o.get('isCategory')
			}
		})
		if(selectInOrOutInfo['data-code'].length == 6 && isTypeClass) {
//			state = this.metaReducer.sf(state, 'data.other.addOrDelBussiness', '删除分类')
			state = this.metaReducer.sf(state, 'data.other.addOrDelBus', 'del')
			state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right1')
		} else {
//			state = this.metaReducer.sf(state, 'data.other.addOrDelBussiness', '新增分类')
			state = this.metaReducer.sf(state, 'data.other.addOrDelBus', 'add')
			state = this.metaReducer.sf(state, 'data.other.rightVisible', 'right')
		}
		return state
	}
}

function parseSelected (other,dataSources,list){

    list.map((o,i)=>{

        for(let attr in o){
            if(attr == 'accountCode'){
                other.account[i]  = dataSources.accountSource.filter(oo=>{
                    return oo.value == o.accountCode
                })[0]
            }
            if(
                attr == 'influence'||
                attr == 'vatTaxpayer'||
                attr == 'departmentAttr'||
                attr == 'personAttr'||
                // attr == 'inventoryAttr'||
                attr == 'taxType'||
                attr == 'qualification'||
                attr == 'punishmentAttr'||
                attr == 'borrowAttr'||
                attr == 'assetAttr'||
                attr == 'direction'||
                attr == 'isSettlement'

            ){
                other[attr][i] = consts[attr].filter(oo=>{
                    return oo.value == o[attr]
                })[0]
            }
            if(attr == 'extendAttr'){
                let influence = o.influence,
                    id = consts.influence.filter(oo=>{
                        return oo.value == influence
                    })[0].id,
                    extendAttrArr = consts[consts.extendAttr[id]]
                if(extendAttrArr) {
                    other.extendAttr[i] = extendAttrArr.filter( oo=>{
                        return oo.value == o.extendAttr
                    })
                }
            }
        }

    })
    return other
}
export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}
