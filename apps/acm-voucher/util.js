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
export function typesToTree1 (types) {
	let ret = [],
		findParent = (treeCode) => {
		return ret.find(o => o.treeCode == treeCode.substring(0, 2))
	}

	for (let t of types) {
		//types.forEach(t => {
		//if( t.isShow === false )
		//  continue

		if (t.treeCode.length == 2)
			ret.push(t)
		if (t.treeCode.length == 6) {
			//if(isUseful(t.id))
			//   continue
			if(t.isCategory && !t.subTypes) 
				t.subTypes = []
				
			let parent = ret[ret.length - 1]
			if (!parent.subTypes)
				parent.subTypes = []

			parent.subTypes.push(t)
		}

		if (t.treeCode.length == 10) {
			//if(isUseful(t.id))
			//    continue
			if (!ret[ret.length - 1].subTypes) {
				// da.setMessage({ type: 'error', mode: 'message', content: `编码${t.treeCode}业务类型找不到父级，请联系元数据维护人员` })(injectFuns)
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

export function typesToTree (typesOld) {
	let ret = [],
		types = sortArr(typesOld,'treeCode')
	
	types.map(o => {
		if(o.treeCode.length == 2) {
			ret.push(o)
		}
	})
	
	ret.map(x => {
		if(x.isCategory && !x.subTypes) {
			x.subTypes = []
		}
		types.map(o => {
			if(o.treeCode.length == 6) {
				let splitCode = o.treeCode.substr(0, x.treeCode.length)
				if(splitCode == x.treeCode) {
					x.subTypes.push(o)
				}
			}
		})
	})
	
	ret.map(x => {
		x.subTypes.map(c => {
			if(c.isCategory && !c.subTypes) {
				c.subTypes = []
			}
			types.map(o => {
				if(o.treeCode.length == 10) {
					let splitCode = o.treeCode.substr(0, c.treeCode.length)
					if(splitCode == c.treeCode) {
						c.subTypes.push(o)
					}
				}
			})
		})
	})
	
	return ret
}

function sortArr(arr,itemAttr) {
	for(let i =0; i< arr.length; i++){
		for (let j= i+1; j<arr.length; j++) {
			if(arr[i][itemAttr]> arr[j][itemAttr]){
				let temp   = arr[i]
				arr[i]=  arr[j]
				arr[j]= temp
			}
		}
	}
	return  arr
}
