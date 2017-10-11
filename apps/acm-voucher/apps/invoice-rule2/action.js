import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import { Input ,Select} from 'mk-component'
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


        injections.reduce('init',component.props.initData)
    }

    onOk = () => {
        let list = this.metaAction.gf('data.form').toJS()
        // let extendAttr = list.punishmentAttr || list.borrowAttr || list.assetAttr
        if(this.requiredCheck(list)){
            return {result:true,value:{list}}
        }else{
            return false
        }


    }
    requiredCheck =(list)=>{
        if(!list.fundSource){
            this.metaAction.toast('error','金额来源不能为空')
            return false
        }
        return true
    }
    btnClick = () => {
        this.injections.reduce('modifyContent')
    }
    handleSelectChange = (key)=>(val)=>{
        let dataSources = this.metaAction.gf(`data.dataSources`).toJS()

        if(key == 'punishmentAttr'||key == 'borrowAttr'||key == 'assetAttr'){
            key = 'extendAttr'
        }
        if(key == 'industryIdList' ){
            val = val.map(o=>{
                switch (o) {
                    case '工业':
                    return 1

                    case '商贸':
                    return 2

                    case '服务':
                    return 3

                    case '信息技术':
                    return 4

                }
            })
        }
        if(key == 'account'){
            let accountOption = dataSources.accountSource.filter(o=>{
                return o.id == val
            })[0]
            this.metaAction.sfs({
                'data.form.accountCode':accountOption.value,
                'data.form.accountName':accountOption.name
            })
        }else{
            this.metaAction.sf(`data.form.${key}`,val)
        }
    }
    handleChange = (key)=>(e)=>{
        if(key == 'formula'){
            key = 'extendAttr'
        }
        this.metaAction.sf(`data.form.${key}`,e.target.value)
    }
    openTips = ()=>{
        debugger
    }
    getcontent =()=>{
    	return (
    		<div>
    		    <p>认证</p>
    			<p>抵扣</p>
    			<p>不含税金额</p>
    			<p>价税合计金额</p>
                <p>不含税金额</p>
    		    <p>税额</p>
    			<p>税额*1/3</p>
                <p>0~7</p>
                <p>认证：抵扣#不含税金额#价税合计金额：不含税金额</p>
                <p>抵扣：税额：0</p>
    		</div>

    	)
    }
    getSelect =(o,dataSources)=>{
        let dataSource = dataSources[o],
            form = this.metaAction.gf(`data.form`).toJS()

        if(o == 'accountInAttr'||o == 'accountOutAttr'){
            dataSource = dataSources.accountSource
        }

        // if(o == 'inventoryAttr'){
        //     dataSource = dataSources.inventoryAttr
        // }
        if( o == 'punishmentAttr'|| o == 'borrowAttr'|| o == 'assetAttr'||o == 'inventoryAttr'){
            o = 'extendAttr'
        }
        return <Select
            value = {form[o]}
            onChange = {::this.handleSelectChange(o)}
            defaultValue = {dataSource[0].value}>
            {
                dataSource.map(oo=>{
                    return <Select.Option style={{ width: 120 }}  value = {oo.value}>{oo.name}</Select.Option>
                })
            }
        </Select>
    }
    getInfluenceValChildren=(influence)=>{
        influence = influence? influence:'departmentAttr'
        let dataArr =influence? influence.split(','):[],
            dataSources = this.metaAction.gf(`data.dataSources`).toJS(),
            form = this.metaAction.gf(`data.form`).toJS()


        return <div>
            <span className = 'item-label'>影响因素取值：</span>
            {

                dataArr.map(o=>{

                    if(o =='formula'){
                        return <Input
                            value = {form.formula}
                            onChange = {::this.handleChange('formula')}
                            style={{ width: 120 }}
                            className = 'formula-input' />
                    }else {
                        return this.getSelect(o,dataSources)
                    }
                })
            }
        </div>
    }
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
