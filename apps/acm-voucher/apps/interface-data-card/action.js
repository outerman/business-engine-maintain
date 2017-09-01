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


    vatTaxpayerChange = (checkedValues)=>{
        debugger
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
                vatTaxpayerNormal = 2
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
    invoiceTypeChange = (data)=>{

    }
    normalTaxerChange =(data)=>{

    }
    industryChange =(data)=>{

    }
    tabsChange = (key)=>{

    }
    amountRadioChange = (e)=>{

    }
    taxNormalSelect = ()=>{

    }
    onOk = () => {
        let res = this.metaAction.gf('data.form')
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
