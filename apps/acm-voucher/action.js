import React from 'react'
import { action as MetaAction, AppLoader } from 'mk-meta-engine'
import config from './config'
import * as util from './util'
import { Tree } from 'mk-component'
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
        const response = await this.webapi.tree.query()
        let ret = {}
        //收支数据
        ret.incomeTypes = util.enumToArray(response.paymentsType)
        //业务类型
        ret.bizTypes = util.enumToArray(response.businessType)
        //左树数据
        ret.types = util.typesToTree(response.businessType)
        // response.filter = filter
        this.injections.reduce('initTree', ret)
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
    handleSelect=(a,b)=>{
        // console.log(a,b,c,d,e,f,g)

    }
    handleCheck = () => {

    }
    getTreeNode = (types) =>{
        let parseNade = (types)=>{
            let ret =[]
            for (let o of types){
                if(o.subTypes){

                    ret.push(
                        <TreeNode title={o.name} key={o.id} data-code = {o.code}>
                            {parseNade(o.subTypes)}
                        </TreeNode>
                    )
                }else{
                    ret.push(
                        <TreeNode  className = 'z-tree-leaf' title={o.name} key={o.id} data-key =   {o.code}>
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
}

export default function creator(option) {
    const metaAction = new MetaAction(option),
        o = new action({ ...option, metaAction }),
        ret = { ...metaAction, ...o }

    metaAction.config({ metaHandlers: ret })

    return ret
}
