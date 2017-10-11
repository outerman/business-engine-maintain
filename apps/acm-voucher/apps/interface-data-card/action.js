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
        this.initData = component.props.initData

        this.injections = injections

        if (this.component.props.setOkListener)
            this.component.props.setOkListener(this.onOk)

        injections.reduce('init',this.initData)
    }

    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    getInvoiceDefaultValue = () => {
        return this.initData.form && this.initData.form.invoiceType || 200000000000050
    }
    getInvoiceOptions = () => {
        let invoiceType = this.initData.dataSources.invoiceType,
            res = []

        invoiceType.map(o=>{
            res.push(<Select.Option value = {o.id}>{o.name}</Select.Option>)
        })

        return res
    }
    invoiceTypeChange = (invoiceType)=>{
        this.metaAction.sf('data.form.invoiceType',invoiceType)
    }

    getDefaultRate = (key)=>{
        let defaultRate =[],
            form = this.initData.form,
            taxRate = this.initData.dataSources.taxRate
        if(!form) {
            return defaultRate
        }
        if(!form[key] || !form[key].length) return defaultRate
        form[key].map(o=>{
            defaultRate.push(taxRate.filter(oo=>{
                return oo.id == o
            })[0].name)
        })
        return defaultRate
    }

    getTaxRateOption = ()=>{
        let taxRate = this.initData.dataSources.taxRate,
            res = []

        taxRate.map(o=>{
            res.push(o.name)
        })

        return res
    }

    getDefaultSettlement = ()=>{
        let defaultSettlement = [],
            settlementType = this.initData.dataSources.settlement,
            settlement = this.initData.form && this.initData.form.settlement

        if(!settlement || !settlement.length) return defaultSettlement

        settlement.map(o=>{
            defaultSettlement.push(settlementType.filter(oo=>{
                return oo.id == o
            })[0].name)
        })
        return defaultSettlement
    }
    getSettlementTypeList = ()=>{
        let settlementType = this.initData.dataSources.settlement,
            res = []
        settlementType.map(o=>{
            res.push(o.name)
        })
        return res
    }
    settlementTypeChange = (checkedValues)=>{
        let settlement = [],
            settlementTypes = this.initData.dataSources.settlement

        checkedValues.map(o=>{
            settlement.push(
                settlementTypes.filter(oo=>{
                    return oo.name == o
                })[0].id
            )
        })

        this.injections.reduce('editForm',{settlement})
    }
    getDefaultVat = ()=>{
        let initForm = this.initData.form,
            defaultVat = []

        if(!initForm) return []
        if(initForm.vatTaxpayerNormal) defaultVat.push('一般纳税人')
        if(initForm.vatTaxpayerSmall) defaultVat.push('小规模纳税人')

        return defaultVat
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
    getDefaultIndustry = (industryIdList)=>{
        let initForm =  this.initData.form,
            defaultIndustry = []

        if(!initForm) return []
        if(industryIdList){
            initForm.industryIdList = industryIdList
        }

        initForm.industryIdList.map(o=>{
            switch (o) {
                case 1:
                    defaultIndustry.push('工业')
                    break
                case 2:
                    defaultIndustry.push('商贸')
                    break
                case 3:
                    defaultIndustry.push('服务')
                    break
                case 4:
                    defaultIndustry.push('信息技术')
                    break
            }
        })
        return  defaultIndustry
    }
    industryChange = (checkedValues)=>{
        let industryIdList = []

        checkedValues.map(o=>{
            switch (o) {
                case '工业':
                    industryIdList.push(1)
                    break
                case '商贸':
                    industryIdList.push(2)
                    break
                case '服务':
                    industryIdList.push(3)
                    break
                case '信息技术':
                    industryIdList.push(4)
                    break
            }
        })

        this.injections.reduce('editForm',{industryIdList})
    }
    detailRadioChange = (key) => (e)=>{
        this.injections.reduce('editForm',{[key]:e.target.value})
    }
    extTittleChange = (key) =>(e)=>{
        this.injections.reduce('editForm',{[key]:e.target.value})
    }
    // industryChange =(data)=>{
    //     let industryIdList = []
    //
    //     data.map(o=>{
    //         switch (o) {
    //             case '工业':
    //                 industryIdList.push(1)
    //                 break;
    //             case '商贸':
    //                 industryIdList.push(2)
    //                 break;
    //             case '服务':
    //                 industryIdList.push(3)
    //                 break;
    //             case '信息技术':
    //                 industryIdList.push(4)
    //                 break;
    //         }
    //     })
    //
    //     this.injections.reduce('editForm',{industryIdList})
    // }

    tabsChange = (key)=>{

    }

    taxRateChange = (key)=>(checkedValues)=>{
        let taxRateType = this.initData.dataSources.taxRate,
            rateType = []

            checkedValues.map(o=>{
                taxRateType.map(oo=>{
                    if(o==oo.name)
                        rateType.push(oo.id)
                })
            })

        this.injections.reduce('editForm',{[key]:rateType})
    }
    amountRadioChange = (e)=>{

    }
    taxNormalSelect = ()=>{

    }
    onOk = () => {
        let {metaAction} = this,
            list = metaAction.gf('data.form').toJS()


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
