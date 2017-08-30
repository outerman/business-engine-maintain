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
        // console.log(a,b)
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
        debugger
        this.injections.reduce('initTemplate',response)
        this.injections.reduce('initForm',this.transData4List(response))
    }
    handleCheck = () => {

    }
    handleStandardChange = (e)=>{
        debugger
        this.metaAction.sf('data.standard', e.target.value)

        let ruleData = this.metaAction.gf('data.templateData').toJS().docTemplateList,
            ruleList = []
        if(ruleData){
            if(e.target.value == 18){
                ruleList = ruleData[0]? ruleData[0].details:[]
            }else{
                ruleList = ruleData[1]? ruleData[1].details:[]
            }

            this.metaAction.sf('data.rule.list', fromJS(ruleList))
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
            })[0].name


            for (let attr in consts.columns){
                let temp = o.details.filter( oo =>{
                    return oo.columnsId ==  consts.columns[attr].id
                })[0] || {}
                item[attr] = temp.flag||''
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
            list:standard == 18? (ruleData[0]? ruleData[0].details:[]):(ruleData[1]? ruleData[1].details:[])
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

        let types = this.metaAction.gf('data.tree').toJS()

        return this.getTreeNode(types)
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
    cellGetter = (columnKey) => (ps) => {
        var cellValue = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`)
        var showValue = cellValue

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
        const ret = await this.metaAction.modal('show', {
            title: '新增/编辑界面元数据',
            width:900,
            children: this.metaAction.loadApp('interface-data-card', {
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
    // 弹框 新增规则1
    newInvoiceRule = async ()=>{
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
