/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */


import { fetch } from 'mk-utils'

export default {
    businessTypeTemplate: {
        init:()=> fetch.post('/v1/web/businessTypeTemplate/init',{}),
        query:(option)=> fetch.post('/v1/businessTypeTemplate/query',option),
        accountQuery:(option) => fetch.post('/v1/account/query',option),
        update:(option)=> fetch.post('/v1/businessTypeTemplate/update',option)

    },

    tree: {
        query: (option) => fetch.post('/v1/tree/query', option)
    }
}
