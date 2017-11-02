/**
 * webapi.js 封装app所需的所有web请求
 * 供app测试使用，app加入网站后webpai应该由网站通过config,提供给每个app
 */

import { fetch } from 'mk-utils'

const post = fetch.post

export default {
    /*person: {
        query: (option) => post('/v1/person/query', option)
    }*/
}