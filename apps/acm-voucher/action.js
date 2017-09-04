import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import * as consts from './consts'
import { Map,fromJS } from 'immutable'
import * as util from './util'
import { Tree,Input ,DataGrid} from 'mk-component'
const TreeNode = Tree.TreeNode

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
        this.queryTree()
    }
    queryTree = async () => {
        let response = await this.webapi.businessTypeTemplate.init(),
            ret = {}

        //收支数据
        ret.incomeTypes = util.enumToArray(response.paymentsTypeList)
        //业务类型
        ret.bizTypes = util.enumToArray(response.businessTypeList)
        //左树数据
        ret.types = util.typesToTree(response.businessTypeList)
        // response.filter = filter

        this.injections.reduce('initTree', ret)
        this.injections.reduce('saveData',response)
    }
    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    addBisness = () =>{
        this.injections.reduce('addBisness')
    }
    onSearch = (val)=>{
        console.log(val)
    }
    handleSelect=(checkedNode,selectedNode)=>{
        if(selectedNode.node.props.className === 'z-tree-parent'){//点父级  不查询
            return
        }
        let code = selectedNode.node.props['data-code']
        this.queryTemplate(code)
    }
    queryTemplate = async (code)=>{
        let response = await this.webapi.businessTypeTemplate.query({code})
        // console.log(response)
        switch (response.businessType.code.substr(0,1)) {
            case '1':
                response.businessType.typeName = '收入'
                break;
            case '2':
                response.businessType.typeName = '支出'
                break;
            case '3':
                response.businessType.typeName = '成本/折旧和摊销'
                break;
            case '4':
                response.businessType.typeName = '存取现金/内部账户互转'
                break;
            case '5':
                response.businessType.typeName = '收款/付款'
                break;
            case '6':
                response.businessType.typeName = '请会计处理'
                break;
            default:

        }
        this.injections.reduce('initTemplate',response)
        this.injections.reduce('initForm',this.transData4List(response))
    }
    handleCheck = () => {

    }
    parseRuleList = (ruleList) => {
        // let res = []
        let res = ruleList.map(o=>{
            o.direction = o.direction? '贷':'借'
            o.isSettlement = o.isSettlement? '结算方式':'本表'
            o.taxType = o.taxType? '一般计税':'建议计税'
            o.vatTaxpayer = o.vatTaxpayer == 41? '一般纳税人':'小规模纳税人'
            if(o.personAttr == 10050){
                o.personAttr ='管理人员'
            }
            if(o.personAttr == 10051){
                o.personAttr ='生产人员'
            }
            return o
        })
        return res
    }
    handleStandardChange = (e)=>{
        this.metaAction.sf('data.standard', e.target.value)

        let ruleData = this.metaAction.gf('data.templateData').toJS().docTemplateList,
            ruleList = []
        if(ruleData){
            if(e.target.value == 18){
                ruleList = ruleData[0]? ruleData[0].details:[]
            }else{
                ruleList = ruleData[1]? ruleData[1].details:[]
            }

            this.metaAction.sf('data.rule.list', fromJS( this.parseRuleList(ruleList) ))
        }
    }
    transData4List = (res)=> {
        let interfaceData = res.tacticsList,
            ruleData = res.docTemplateList,
            interfaceDataList = [],
            resData = {},
            standard = this.metaAction.gf('data.standard')

        interfaceData.map(o=>{
            let item = {}
            item.invoiceType =consts.ticketType.filter(obj=>{
                return obj.id ==  o.invoiceId
            })[0]


            for (let attr in consts.columns){
                let temp = o.details.filter( oo =>{
                    return oo.columnsId ==  consts.columns[attr].id
                })[0] || {}
                item[attr] = temp.flag
                if(temp.columnsId == 14){//结算方式
                    let settlements = temp.specialList,
                    settlementType = consts.settlementType,
                    settlement = []
                    settlements.map(o=>{
                        settlement =settlement.concat(settlementType.filter(oo=>{
                            return oo.id == o.optionValue
                        }))
                    })
                    item.settlement = settlement
                }
                if(temp.columnsId == 16){//税率
                    let rates = temp.specialList,
                        rateSource = consts.taxRateType,
                        smallRateIdx=[],normalRateIdx=[],
                        smallRate=[],normalRate=[]
                    rates.map(oRates=>{
                        if(oRates.vatTaxpayer == 41){
                            normalRateIdx.push(oRates.optionValue)
                        }else{
                            smallRateIdx.push(oRates.optionValue)
                        }
                    })
                    normalRateIdx.map(oNormalRateIdx=>{
                        rateSource.map(ooRateSource=>{
                            if(oNormalRateIdx == ooRateSource.id)
                                normalRate.push(ooRateSource)
                        })
                    })
                    smallRateIdx.map(oSmallRateIdx=>{
                        rateSource.map(ooRateSource=>{
                            if(oSmallRateIdx == ooRateSource.id){
                                smallRate.push(ooRateSource)
                            }
                        })
                    })
                    item.normalRate = normalRate
                    item.smallRate = smallRate
                }

            }
            interfaceDataList.push(item)
        })


        resData.interface = {
            other:{
                focusCellInfo:undefined
            },
            list: interfaceDataList
        }
        // let ruleDataList = ruleData.map(o=>{return o.details})
        resData.rule = {
            other:{
                focusCellInfo:undefined
            },
            list:this.parseRuleList(standard == 18? (ruleData[0]? ruleData[0].details:[]):(ruleData[1]? ruleData[1].details:[]))
        }
        return resData

    }
    getTreeNode = (types) =>{
        let parseNade = (types)=>{
            let ret =[]
            for (let o of types){
                if(o.subTypes){

                    ret.push(
                        <TreeNode  className = 'z-tree-parent' title={o.name} key={o.id} data-code = {o.code}>
                            {parseNade(o.subTypes)}
                        </TreeNode>
                    )
                }else{
                    ret.push(
                        <TreeNode  className = 'z-tree-leaf' title={o.name} key={o.id} data-code = {o.code}>
                        </TreeNode>
                    )
                }
            }
            return ret
        }
        return parseNade(types)
    }
    getTreeChild = () =>{
        if(!this.metaAction.gf('data.tree')) return []

        return this.getTreeNode(this.metaAction.gf('data.tree').toJS())
    }
    nameChange =(ps)=>{
        // console.log(ps)
    }
    isFocusCell = (ps, columnKey,type) => {
        const focusCellInfo = type == 'rule'?
        this.metaAction.gf('data.rule.other.focusCellInfo'):
        this.metaAction.gf('data.interface.other.focusCellInfo')

        if (!focusCellInfo)
            return false
        return focusCellInfo.columnKey == columnKey && focusCellInfo.rowIndex == ps.rowIndex
    }
    cellClick = (ps, columnKey,type) => (e) => {
        e.stopPropagation()
        if(type == 'rule'){

            this.metaAction.sf('data.rule.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        }else{
            this.metaAction.sf('data.interface.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })

        }

        // if (columnKey == 'name') {
        //     setTimeout(() => {
        //         const dom = ReactDOM.findDOMNode(this.refName)
        //         dom.select()
        //     }, 0)
        // }
        // else if (columnKey == 'mobile'){
        //     setTimeout(() => {
        //         const dom = ReactDOM.findDOMNode(this.refMobile)
        //         dom.select()
        //     }, 0)
        // }

    }
    handleChange = (a,b,c,d)=>{
        // console.log(a,b,c,d)
    }
    cellGetterRule = (columnKey) => (ps) => {
        var cellValue = this.metaAction.gf(`data.rule.list.${ps.rowIndex}.${columnKey}`)
        var showValue = cellValue

        if (!this.isFocusCell(ps, columnKey,'rule')) {
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey,'rule')}
                    value={showValue}
                />
            )
        }

        return (
                <Input
                   className='mk-app-editable-table-cell'
                   onChange={this.nameChange(ps)}
                   value={cellValue}
                   ref={o => this.refName = o}
                />
            )
    }
    cellGetter = (columnKey,columnKey2) => (ps) => {
        var cellValue = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`),
            cellValue2 = ''
        if(typeof columnKey2 === 'string'){
            cellValue2 = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey2}`)
            cellValue2 && (cellValue = cellValue + ','+cellValue2)
        }
        // if(columnKey === 'settlementTypeList'){
        //     cellValue =cellValue? cellValue.toJS().join(','):cellValue
        // }
        if(columnKey === 'settlement' || columnKey === 'smallRate' ||columnKey === 'normalRate' ){
            if(cellValue){
                cellValue = cellValue.toJS().map(o=>{return o.name}).join(',')
            }
        }

        var showValue =  cellValue

        if (!this.isFocusCell(ps, columnKey)) {
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey)}
                    value={showValue}
                />
            )
        }

        return (
                <Input
                   className='mk-app-editable-table-cell'
                   onChange={this.nameChange(ps)}
                   value={cellValue}
                   ref={o => this.refName = o}
                />
            )
    }

    // 弹框 界面元数据
    addInvoiceType = async () => {
        if(!this.metaAction.gf('data.templateData.businessType.code'))
            return this.metaAction.toast('error','请先选择业务类型')
        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑界面元数据',
            width:900,
            children: this.metaAction.loadApp('interface-data-card', {
                store: this.component.props.store,
                initData:this.metaAction.gf('data.store').toJS()
            })
        })

        if (ret) {
            debugger
            let list = this.metaAction.gf('data.interface.list').toJS(),
                val = ret.value.list
            for(let o of list){
                if(o.invoiceType.id === val.invoiceType.id){
                    return this.metaAction.toast('error','票据类型重复')
                }
            }
            list.push(val)
            this.metaAction.sf('data.interface.list',fromJS(list))
            // const response = await this.webapi.education.query()
            // this.metaAction.sfs({
            //     'data.other.educationDataSource': fromJS(response),
            //     'data.form.education': fromJS(ret)
            // })
        }

    }
    // 弹框 新增规则1
    newInvoiceRule = async ()=>{
        if(!this.metaAction.gf('data.templateData.businessType.code'))
            return this.metaAction.toast('error','请先选择业务类型')

        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则：',
            width:900,
            children: this.metaAction.loadApp('invoice-rule', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            const response = await this.webapi.education.query()
            this.metaAction.sfs({
                'data.other.educationDataSource': fromJS(response),
                'data.form.education': fromJS(ret)
            })
        }
    }
    // 弹框 新增规则2
    newInvoiceRule2 = async ()=>{
        if(!this.metaAction.gf('data.templateData.businessType.code'))
            return this.metaAction.toast('error','请先选择业务类型')

        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则2：',
            width:400,
            children: this.metaAction.loadApp('invoice-rule2', {
                store: this.component.props.store,
            })
        })

        if (ret) {
            const response = await this.webapi.education.query()
            this.metaAction.sfs({
                'data.other.educationDataSource': fromJS(response),
                'data.form.education': fromJS(ret)
            })
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
