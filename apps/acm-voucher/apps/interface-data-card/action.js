import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { Select } from 'mk-component'
import config from './config'

class action {
    constructor(option) {
        this.metaAction = option.metaAction
        this.config = config.current
    }

    onInit = ({ component, injections }) => {
        this.component = component
        this.injections = injections
        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        injections.reduce('init',this.component.props.initData)
    }

    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    getInvoiceDefaultValue = () => {
        return  this.component.props.initData.invoiceTypeList[0].enumItemId
    }
    getInvoiceOptions = () => {
        let invoiceTypes = this.component.props.initData.invoiceTypeList,
            res = []

        invoiceTypes.map(o=>{
            res.push(<Select.Option value = {o.enumItemId}>{o.enumItemName}</Select.Option>)
        })

        return res
    }
    invoiceTypeChange = (invoiceTypeId)=>{
        let invoiceTypes = this.component.props.initData.invoiceTypeList,
            invoiceType = invoiceTypes.filter(o=>{
                return o.enumItemId === invoiceTypeId
            })[0]

        this.injections.reduce('editForm',{invoiceType:{id:invoiceType.enumItemId,name:invoiceType.enumItemName}})
    }
    getTaxRateOption = ()=>{
        let taxRateList = this.component.props.initData.taxRateList,
            res = []
        taxRateList.map(o=>{
            res.push(o.name)
        })
        return res
    }
    getBankAccountOption = ()=>{
        let accountTypeList = this.component.props.initData.accountTypeList,
            res = []
        accountTypeList.map(o=>{
            res.push(o.enumItemName)
        })
        return res
    }
    bankAccountChange = (checkedValues)=>{
        let bankAccount = [],
            accountTypeList = this.component.props.initData.accountTypeList
        checkedValues.map(o=>{
            bankAccounts.push(accountTypeList.filter(oo=>{
                return oo.enumItemName === o
            })[0].enumItemId)
        })
        this.injections.reduce('editForm',{bankAccount})
    }
    getSettlementTypeList = ()=>{
        let settlementTypeList = this.component.props.initData.settlementTypeList,
            res = []
        settlementTypeList.map(o=>{
            res.push(o.name)
        })
        return res
    }
    settlementTypeChange = (checkedValues)=>{
        let settlement = [],
            settlementTypes = this.component.props.initData.settlementTypeList
        checkedValues.map(o=>{
            settlement.push(
                settlementTypes.filter(oo=>{
                    return oo.name == o
                })[0]
            )
        })
        this.injections.reduce('editForm',{settlement})
    }
    vatTaxpayerChange = (checkedValues)=>{
        let vatTaxpayerSmall = 0,vatTaxpayerNormal = 0
        switch (checkedValues.length) {
            case 0:
                vatTaxpayerSmall = 0
                vatTaxpayerNormal = 0
                break
            case 1:
                vatTaxpayerSmall = checkedValues[0]=='一般纳税人'?  0:1
                vatTaxpayerNormal = checkedValues[0]=='一般纳税人'?  1:0
                break
            case 2:
                vatTaxpayerSmall = 1
                vatTaxpayerNormal = 1
                break
        }
        this.injections.reduce('editForm',{vatTaxpayerSmall,vatTaxpayerNormal})
    }
    industryChange = (checkedValues)=>{
        let industryList = []
        checkedValues.map(o=>{
            switch (o) {
                case '工业':
                    industryList.push(1)
                    break
                case '商贸':
                    industryList.push(2)
                    break
                case '服务':
                    industryList.push(3)
                    break
                case '信息技术':
                    industryList.push(4)
                    break

            }
        })
        this.injections.reduce('editForm',{industryList})
    }
    detailRadioChange = (key) => (e)=>{
        this.injections.reduce('editForm',{[key]:e.target.value})
    }
    extTittleChange = (key) =>(e)=>{
        this.injections.reduce('editForm',{[key]:e.target.value})
    }

    normalTaxerChange =(data)=>{
        debugger
    }
    industryChange =(data)=>{
        debugger
        let industryIdList = []
        data.map(o=>{
            switch (o) {
                case '工业':
                    industryIdList.push(1)
                    break;
                case '商贸':
                    industryIdList.push(2)
                    break;
                case '服务':
                    industryIdList.push(3)
                    break;
                case '信息技术':
                    industryIdList.push(4)
                    break;
            }
        })
        this.injections.reduce('editForm',{industryIdList})
    }

    tabsChange = (key)=>{

    }

    taxerChange = (key)=>(checkedValues)=>{
        debugger
        let taxRateType = this.component.props.initData.taxRateList,
            rateType = []
            checkedValues.map(o=>{
                taxRateType.map(oo=>{
                    if(o==oo.name)
                        rateType.push(oo)
                })
                
            })
        this.injections.reduce('editForm',{[key]:rateType})
    }
    amountRadioChange = (e)=>{

    }
    taxNormalSelect = ()=>{

    }
    onOk = () => {
        let list = this.metaAction.gf('data.form').toJS()
        return {result:true,value:{list}}
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
