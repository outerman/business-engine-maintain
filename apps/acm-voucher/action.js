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
        if(!sessionStorage['_accessToken'] || !sessionStorage['password']){// 未登录不允许操作
            location.href = location.protocol+'//'+location.hostname+':'+location.port
            return
        }

        // 防止越过权限直接访问
        let re = new RegExp('share/acm_engine')

        if(re.test(location.href)){
            location.href = location.protocol+'//'+location.hostname+':'+location.port
        }

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

        this.injections.reduce('initTree', ret, response.businessTypeList)
        this.injections.reduce('saveData',response)
    }
    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    addBisness = () =>{
        this.injections.reduce('addBisness')
    }
    onSearch = (val)=>{
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
            standard = this.metaAction.gf('data.standard'),
            dataSources = this.metaAction.gf('data.interface.dataSources').toJS()


        interfaceData.map((o,i)=>{
            let item = {}

            // let invoiceType = consts.ticketType.filter(obj=>{
            //     return obj.id ==  o.invoiceId
            // })[0]

            item.invoiceType = o.invoiceId
            item.industryIdList = o.industryIdList

            for (let attr in consts.columns){
                let temp = o.details.filter( oo =>{
                    return oo.columnsId ==  consts.columns[attr].id
                })[0] || {}

                item[attr] = temp.flag
                if(o.columnsName){
                    item[attr+'Title'] = o.columnsName
                }



                if(temp.columnsId == 14){// 结算方式
                    let settlements = temp.specialList

                    item.settlement = []

                    settlements && settlements.length && settlements.map(obj=>{
                        item.settlement.push(obj.optionValue)
                    })
                }
                if(temp.columnsId == 16){// 税率
                    let rates = temp.specialList,
                        rateSource = consts.taxRateType,
                        smallRate=[],normalRate=[]

                    rates && rates.map(oRates=>{
                        if(oRates.vatTaxpayer == 41){
                            normalRate.push(oRates.optionValue)
                        }else{
                            smallRate.push(oRates.optionValue)
                        }
                    })

                    item.normalRate = normalRate
                    item.smallRate = smallRate
                }

            }
            interfaceDataList.push(item)

        })

        if(interfaceDataList.length<4){
            let a = 4 - interfaceDataList.length

            for(let i = 0;i <a;i++){
                interfaceDataList.push({})
            }
        }
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
        if(resData.rule.list.length<4){
            let a = 4 - resData.rule.list.length
            for(let i = 0;i<a;i++){
                resData.rule.list.push({})
            }
        }
        return resData

    }

    onDrop = async(info) => {
        let sourceCode = info.dragNode.props['data-code'],
            moveCodeInfo = info.node.props,
            treeType = this.metaAction.gf('data.businessTypeList').toJS(),
            option = {
                "source": { //-- 需要移动的业务类型
                    "code": "" //-- 编码
                  },
                //   "previous": { //-- 目标位置前一个业务类型
                //     "code": ""
                //   },
                //   "next": { //-- 目标位置后一个业务类型，previous 有值以 previous 为准
                //     "code": "" 
                //   },
                //   "parent": { //-- 目标位置上级业务类型
                //     "code": ""
                //   }
            }, ret = {}

        option.source.code = sourceCode
        if(moveCodeInfo.className == "z-tree-leaf") {
            if(moveCodeInfo.dragOverGapBottom) {
                option.previous = {}
                option.previous.code = moveCodeInfo['data-code']
            } else if(moveCodeInfo.dragOverGapTop) {
                option.next = {}
                option.next.code = moveCodeInfo['data-code']
            }
        } else if(moveCodeInfo.className == "z-tree-parent") {
            option.parent = {}
            option.parent.code = moveCodeInfo['data-code']
        }

        let response = await this.webapi.businessTypeTemplate.move(option)
       
        if(response.isActualMove) {
            this.metaAction.toast('success','移动成功!')
            treeType.map(o => {
                if(o.code == response.source.code) {
                    o.code = response.source.treeCode
                }
                if(o.subTypes) {

                }
            })
            let moveTypeInfo = []
            let sortTypeFuns1 = (treeType) => {
                treeType.map((o, i) => {
                    if(o.subTypes) {
                        sortTypeFuns1(o.subTypes)
                    } else {
                        if(o.code == response.source.code) {
                            o.code = response.source.treeCode
                            moveTypeInfo.push(o)
                            treeType.splice(i, 1)
                        }
                        
                    }                   
                })
            }
            let sortTypeFuns2 = (treeType) => {
                treeType.map((o, i) => {
                    if(o.subTypes) {
                        sortTypeFuns2(o.subTypes)
                    } else {
                        if(o.code == moveCodeInfo['data-code']) {
                            if(option.previous.code) {
                                treeType.splice(i + 1, 0, moveTypeInfo[0])
                            } else if(option.next.code) {
                                treeType.splice(i, 0, moveTypeInfo[0])
                            }
                        }
                    }                   
                })
            }
            sortTypeFuns1(treeType)
            sortTypeFuns2(treeType)
            ret.types = util.typesToTree(treeType)
            this.injections.reduce('initTree', ret, this.metaAction.gf('data.businessTypeList').toJS())
        }
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
        let {metaAction} = this,
        code = metaAction.gf('data.templateData.businessType.code')
        if(type == 'rule'){
            if(!code) return metaAction.toast('error','请选择业务类型')
            return metaAction.sf('data.rule.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        }
        if(columnKey === 'invoiceType'){
            if(!code) return metaAction.toast('error','请选择业务类型')

            let item  = metaAction.gf(`data.interface.list.${ps.rowIndex}`).toJS()

            this.addInvoiceType(item)

            debugger
        }
        // else{
        //     this.metaAction.sf('data.interface.other.focusCellInfo', { rowIndex: ps.rowIndex, columnKey })
        //
        // }

    }
    handleChange = (a,b,c,d)=>{
        // console.log(a,b,c,d)
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
    nameChange =(ps,columnKey)=>(e)=>{
        this.metaAction.sf(`data.rule.list.${ps.rowIndex}.${columnKey}`,e.target.value)
        // console.log(ps)
    }
    interfaceChange = (columnKey,ps)=>(val)=>{
        this.metaAction.sf(`data.interface.list.${ps.rowIndex}.${columnKey}`,val)
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
                    })[0]
                    showValue = showValue? showValue.name:cellValue
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
            if(columnKey == 'extendAttr' ){
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
    cellGetter = (columnKey,type) => (ps) => {
        let metaAction = this.metaAction
        var cellValue = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`),
            cellValue2 = ''
        if(type === 'ext'){
            cellValue2 = this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}Title`)
            cellValue2 && (cellValue = cellValue + ','+cellValue2)
        }

        if(columnKey === 'settlement' || columnKey === 'smallRate' ||columnKey === 'normalRate'||columnKey === 'industryIdList'){
            if(cellValue){
                cellValue = cellValue.toJS().join(',')
            }
        }
        if(columnKey =='invoiceType'){
            let a  = consts.ticketType.filter(o=>{
                return o.id == cellValue
            })[0]
            cellValue =a ? a.name:cellValue
            return (
                <DataGrid.TextCell
                    onClick={this.cellClick(ps, columnKey)}
                    style = {{color: '#2db7f5',cursor:'pointer'}}
                    value={cellValue}
                />
            )
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
        /*  //不提供编辑功能
        if(type == 'select'){
            let dataSource = this.metaAction.gf(`data.interface.dataSources.${columnKey}`).toJS()

            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder={showValue}
                    value = {this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`)}
                    onChange = {::this.interfaceChange(columnKey,ps)}
                    optionFilterProp="children"
                    optionLabelProp="children">
                    {
                        dataSource.map(o=>{
                            return <Select.Option
                                value={o.id}>
                                {o.name}
                            </Select.Option>
                        })
                    }
                </Select>
            )
        }
        if(type == 'multiple'){
            let dataSource = []
            if(columnKey == 'normalRate'||columnKey == 'smallRate'){
                dataSource = this.metaAction.gf(`data.interface.dataSources.taxRate`).toJS()
            }else{
                this.metaAction.gf(`data.interface.dataSources.${columnKey}`).toJS()
            }
            return (
                <Select
                    mode = 'multiple'
                    style={{ width: 200 }}
                    placeholder={showValue}
                    value = {this.metaAction.gf(`data.interface.list.${ps.rowIndex}.${columnKey}`)}
                    onChange = {::this.interfaceChange(columnKey,ps)}
                    optionFilterProp="children"
                    optionLabelProp="children">
                    {
                        dataSource.map(o=>{
                            return <Select.Option
                                value={o.id}>
                                { o.name}
                            </Select.Option>
                        })
                    }
                </Select>
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
        */
    }
    handlePreview = ()=>{
        return this.metaAction.toast('error','尚未开发')
    }
    handleSave = async()=>{
        let metaAction = this.metaAction,
            templateData = metaAction.gf('data.templateData').toJS(),
            interfaceData = metaAction.gf('data.interface').toJS(),
            ruleData = metaAction.gf('data.rule').toJS(),
            tacticsList = this.parseTacticsList(templateData,interfaceData),
            docTemplateList = this.parseDocTemplateList(templateData,ruleData)

            templateData.tacticsList = tacticsList
            templateData.docTemplateList = docTemplateList

            delete templateData.businessType.typeName

        let response = await this.webapi.businessTypeTemplate.update(templateData)

        this.injections.reduce('initTemplate',response)
        this.injections.reduce('initForm',this.transData4List(response))

    }
    parseTacticsList = (templateData,interfaceData)=>{
        let tacticsList = []
        interfaceData.list.map((o,i)=>{// interfaceData
            tacticsList[i] = {}
            tacticsList[i].invoiceId = o.invoiceType
            tacticsList[i].industryIdList = o.industryIdList
            tacticsList[i].details = templateData.tacticsList[i].details

            tacticsList[i].details = tacticsList[i].details.map(oo=>{// templateData
                oo.flag = o[this.getColumnsById(oo.columnsId)]
                if(o.columnsName){
                    oo.columnsName = o.columnsName
                }
                if(oo.columnsId == 14){
                    let specialList = []
                    o.settlement.map((ooo,oooIdx)=>{
                        specialList.push({
                            columnsId: 12,
                            isDefault: 0,
                            optionValue:ooo,
                            idList:oo.specialList[oooIdx].idList
                        })
                    })
                    specialList[0].isDefault = 1
                    oo.specialList = specialList
                }
                if(oo.columns == 16){
                    let specialList = []
                    o.normalRate.map((ooo,oooIdx)=>{
                        specialList.push({
                            "columnsId": 16,
                            "isDefault": 0,
                            "vatTaxpayer": 41,
                            "optionValue": ooo,
                            idList:oo.specialList[oooIdx].idList
                        })
                    })
                    specialList[0].isDefault = 1
                    oo.specialList = specialList
                }
                return oo
            })
        })


        return tacticsList
    }
    parseDocTemplateList = (templateData,ruleData)=>{
        let accountingStandardId = this.metaAction.gf('data.standard'),
            idx = templateData.docTemplateList.map((o,i)=>{
                if(o.accountingStandardId == accountingStandardId){
                    return i
                }
            })[0],
            docTemplate = ruleData.list.map((o,i)=>{
                let item = {}

                item.fundSource = o.fundSource
                item.flag = o.flag
                item.isSettlement = o.isSettlement
                item.taxType = !(o.taxType =='简易计税')
                item.vatTaxpayer = o.vatTaxpayer == '一般纳税人' ?41:42
                item.accountName = o.accountName
                item.influence = o.influence

                item.accountCode = o.accountCode
                item.orgId = o.orgId
                item.direction = !(o.direction == '借')
                if(o.departmentAttr){
                    item.departmentAttr = o.departmentAttr
                }
                if(o.personAttr){
                    item.personAttr = o.personAttr
                }
                if(o.qualification){
                    item.qualification = o.qualification
                }

                let id = consts.influence.filter(oo=>{
                        return oo.value === item.influence
                    })[0].id
                if(consts.extendAttr[id]){
                        item.extendAttr = consts[consts.extendAttr[id]].filter(oo=>{
                        return (oo.value == o.extendAttr || oo.id == o.extendAttr)
                    })[0].value
                }


                item.industryIdList = o.industryIdList
                item.idList = o.idList

                return item
            })
            templateData.docTemplateList[idx].details = docTemplate
            return templateData.docTemplateList
    }
    getColumnsById = (id)=>{
        let columns = consts.columns
        for( let attr in columns){
            if(columns[attr].id == id){
                return attr
            }
        }
    }

    // 弹框 界面元数据
    addInvoiceType = async (data) => {
        let {metaAction} = this
        if(!metaAction.gf('data.templateData.businessType.code'))
            return metaAction.toast('error','请先选择业务类型')

        if(data.target) data = undefined
        const ret = await metaAction.modal('show', {
            title: '新增/编辑界面元数据',
            width:900,
            children: metaAction.loadApp('interface-data-card', {
                store: this.component.props.store,
                initData:{form:data,dataSources:metaAction.gf('data.interface.dataSources').toJS()}
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
            inventoryAttr:consts.inventoryAttr,
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
