export function getChildTypeIds(id, types) {
    let t = findType(types, null, id),
        ret = []

    let forEachSubTypes = (subTypes) => {
        if (!subTypes) return
        subTypes.forEach(subType => {
            ret.push(subType.get('id').toString())
            if (subType.get('subTypes')) {
                forEachSubTypes(subType.get('subTypes'))
            }
        })
    }

    if (!t) return ret

    forEachSubTypes(t.get('subTypes'))

    return ret
}
/**
 * 后台返回枚举数据转换成数组
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function enumToArray(data) {
    if (data.enumDetail) {
        return data.enumDetail.map((o,i)=> {
            return { id: parseInt(o.enumItemId), name: o.enumItemName }
        })
    }

    return data.map((o,i) => {
        return { id: parseInt(o.id), name: o.name }
    })
}
export function typesToTree (types) {
	let ret = [],
		findParent = (code) => {
		return ret.find(o => o.code == code.substring(0, 2))
	}

	for (let t of types) {
		//types.forEach(t => {
		//if( t.isShow === false )
		//  continue

		if (t.code.length == 2)
			ret.push(t)
		if (t.code.length == 6) {
			//if(isUseful(t.id))
			//   continue

			let parent = ret[ret.length - 1]
			if (!parent.subTypes)
				parent.subTypes = []

			parent.subTypes.push(t)
		}

		if (t.code.length == 10) {
			//if(isUseful(t.id))
			//    continue
			if (!ret[ret.length - 1].subTypes) {
				// da.setMessage({ type: 'error', mode: 'message', content: `编码${t.code}业务类型找不到父级，请联系元数据维护人员` })(injectFuns)
				alert(`编码${t.code}业务类型找不到父级，请联系元数据维护人员`)
				return
			}
			let parent = ret[ret.length - 1].subTypes[ret[ret.length - 1].subTypes.length - 1]
			if (!parent.subTypes)
				parent.subTypes = []

			parent.subTypes.push(t)
		}
	}
	return ret
}
