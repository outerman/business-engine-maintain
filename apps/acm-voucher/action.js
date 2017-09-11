import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import * as consts from './consts'
import { Map,fromJS } from 'immutable'
import * as util from './util'
import { Tree,Input ,DataGrid,Select} from 'mk-component'
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
        this.getAccountList()
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
            // o.isSettlement = o.isSettlement? '结算方式':'本表'
            o.taxType = o.taxType? '一般计税':'简易计税'
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

            // this.metaAction.sf('data.rule.list', fromJS( this.parseRuleList(ruleList) ))
            this.injections.reduce('initRuleList',this.parseRuleList(ruleList))
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
                    settlements && settlements.length && settlements.map(o=>{
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
                    rates && rates.map(oRates=>{
                        if(oRates.vatTaxpayer == 41){
                            normalRateIdx.push(oRates.optionValue)
                        }else{
                            smallRateIdx.push(oRates.optionValue)
                        }
                    })
                    normalRateIdx.length && normalRateIdx.map(oNormalRateIdx=>{
                        rateSource.map(ooRateSource=>{
                            if(oNormalRateIdx == ooRateSource.id)
                                normalRate.push(ooRateSource)
                        })
                    })
                    smallRateIdx.length && smallRateIdx.map(oSmallRateIdx=>{
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

    }
    handleChange = (a,b,c,d)=>{
        // console.log(a,b,c,d)
    }
    nameChange =(ps,columnKey)=>(e)=>{
        this.metaAction.sf(`data.rule.list.${ps.rowIndex}.${columnKey}`,e.target.value)
        // console.log(ps)
    }
    handleInfluenceChange = (columnKey,ps,dataSource)=>(val)=>{
        let selected = dataSource.filter(o=>{
            return o.id == val
        })[0]

        this.injections.reduce('setRuleList',columnKey,ps,val,selected)
    }
    getAccountList =  async()=>{
        let val = await this.webapi.businessTypeTemplate.accountQuery({
                    "isEndNode": true,
                    "accountTypeId": 88,
                    "status": true
                })
        this.injections.reduce('setAccountSource',val)
    }
    cellGetterRule = (columnKey,type) => (ps) => {
        let metaAction = this.metaAction
        var cellValue = this.metaAction.gf(`data.rule.list.${ps.rowIndex}.${columnKey}`)
        let list =  this.metaAction.gf(`data.rule.list.${ps.rowIndex}`),
            option = this.metaAction.gf(`data.rule.other.${columnKey}.${ps.rowIndex}`)

        var showValue = cellValue

        if(type == 'text'){
            showValue = cellValue
        }else{
            option && (showValue = option.get('name'))
            if(columnKey == 'accountName' ){
                let account = this.metaAction.gf(`data.rule.other.account.${ps.rowIndex}`)
                account && (showValue = account.get('name'))
            }
            if(columnKey == 'accountCode' ){
                let account = this.metaAction.gf(`data.rule.other.account.${ps.rowIndex}`)
                account && (showValue = account.get('value'))
            }
            if(columnKey == 'extendAttr'){
                let influenceOption = this.metaAction.gf(`data.rule.other.influence.${ps.rowIndex}`),
                id = influenceOption ? influenceOption.get('id'):''
                if(!consts.extendAttr[id]) return <span>不存在扩展因素</span>

                if(id == 12){// 公式
                    showValue = cellValue
                }else{
                    showValue = consts[consts.extendAttr[id]].filter(oo=>{
                        return oo.value == cellValue
                    })[0].name
                }
            }
        }

        if (!this.isFocusCell(ps, columnKey,'rule')) {
            return (
                <DataGrid.TextCell
                    onClick={::this.cellClick(ps, columnKey,'rule')}
                    value={showValue}
                />
            )
        }
        if(type == 'text' ){
            return (
                <Input
                    className='mk-app-editable-table-cell'
                    onChange={this.nameChange(ps,columnKey)}
                    value={cellValue}
                    ref={o => this.refName = o}
                />
            )
        }else{
            // let data = this.metaAction.gf(`data.dataSources`).toJS()
            let dataSource,option

            if(columnKey == 'accountName'||columnKey == 'accountCode'){
                dataSource = this.metaAction.gf(`data.dataSources.accountSource`)?
                    this.metaAction.gf(`data.dataSources.accountSource`).toJS():
                    []
                option =this.metaAction.gf(`data.rule.other.account.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.account.${ps.rowIndex}`).toJS():
                    {}
            }else{
                option = this.metaAction.gf(`data.rule.other.${columnKey}.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.${columnKey}.${ps.rowIndex}`).toJS():
                    []
                dataSource = consts[columnKey]
            }
            if(columnKey == 'extendAttr'){
                let influenceOption = this.metaAction.gf(`data.rule.other.influence.${ps.rowIndex}`),
                    id = influenceOption ? influenceOption.get('id'):''

                if(!consts.extendAttr[id]) return <span>不存在扩展因素</span>

                dataSource = consts[consts.extendAttr[id]]
                option = this.metaAction.gf(`data.rule.other.${consts.extendAttr[id]}.${ps.rowIndex}`)?
                    this.metaAction.gf(`data.rule.other.${consts.extendAttr[id]}.${ps.rowIndex}`):{}

                if(id == 12){// 公式
                    return (
                        <Input
                            className='mk-app-editable-table-cell'
                            onChange={this.nameChange(ps,columnKey)}
                            value={showValue}
                            ref={o => this.refName = o}
                        />
                    )
                }else if (true) {

                }
            }
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={showValue}
                    value = {option.id}
                    optionFilterProp="children"
                    optionLabelProp="children"

                    onChange={::this.handleInfluenceChange(columnKey,ps,dataSource)}>
                    {
                        dataSource.map(o=>{
                            return <Select.Option
                                value={o.id}>
                                {columnKey == 'accountCode'?o.value :o.name}
                            </Select.Option>
                        })
                    }
                </Select>
            )
        }
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
    // 弹框 新增规则1（多个添加）
    newInvoiceRule = async ()=>{
        return this.metaAction.toast('error','功能尚未开发')
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
        let metaAction = this.metaAction
        if(!this.metaAction.gf('data.templateData.businessType.code'))
            return this.metaAction.toast('error','请先选择业务类型')

        let dataSources ={
            influence:consts.influence,
            extendAttr:consts.extendAttr,
            vatTaxpayer:consts.vatTaxpayer,
            departmentAttr:consts.departmentAttr,
            personAttr:consts.personAttr,
            goodsAttr:consts.goodsAttr,
            taxType:consts.taxType,
            qualification:consts.qualification,
            punishmentAttr:consts.punishmentAttr,
            borrowAttr:consts.borrowAttr,
            assetAttr:consts.assetAttr,
            direction:consts.direction,
            isSettlement:consts.isSettlement,
            industryIdList:['工业','商贸','服务','信息技术']
        }

        dataSources.accountSource = this.metaAction.gf('data.dataSources.accountSource').toJS()


        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑凭证规则2：',
            width:400,
            children: this.metaAction.loadApp('invoice-rule2', {
                store: this.component.props.store,
                initData:dataSources
            })
        })

        if (ret) {
            let list =this.metaAction.gf('data.rule.list').toJS()
            list.push(ret.value.list)
            // this.injectFuns.reduce('addInvoiceRule',ret.value.list)
            debugger
            this.injections.reduce('initRuleList',this.parseRuleList(list))
            // this.metaAction.sf('data.rule.list',fromJS(list))
            // this.metaAction.sfs({
            //     'data.other.educationDataSource': fromJS(response),
            //     'data.form.education': fromJS(ret)
            // })
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
