
export function watchSet(obj, path, callback) {
	defineProperty(obj, path, {
		set(value, oldValue) {
			callback.call(this, value, oldValue)
			return
		}
	})
}

export function watchInvoke(obj, path, callback) {
	defineProperty(obj, path, {
		invoke(...args) {
			callback.call(this, ...args)
		}
	})
}

export function d(obj, path, descriptor) {
		return typeof path === 'object' && !Array.isArray(path) ? defineProperties(obj, path) : defineProperty(obj, path, descriptor)
}

export function defineProperty(obj, path, descriptor) {
	if (typeof path === 'number') {
		path = [path]
	}
	if (obj == null || !path || path.length === 0 || !descriptor) {
		return
	}
	if (typeof path === 'string') {
		path = path.split('.')
	}
	set(obj, path, null, true)

	let parentObj = get(obj, path.slice(0, -1))
	let propertyName = path[path.length - 1]

	const proxyMapName = '__property-proxy-map__'
	!parentObj.hasOwnProperty(proxyMapName) && Object.defineProperty(parentObj, proxyMapName, { value: {} }) 

	let delegateGet = descriptor.get
	let delegateSet = descriptor.set
	let invokeCallback = descriptor.invoke 
	let delegateValue = descriptor.value || parentObj[propertyName]
	

	parentObj[proxyMapName][propertyName] = delegateValue
	parentObj[propertyName] = null
	descriptor.get = function () {
		let getValue = parentObj[proxyMapName][propertyName]
		if (delegateGet) {
			let newValue = delegateGet.call(this, getValue)
			newValue !== undefined && (getValue = newValue)
		}
		if (invokeCallback && typeof getValue === 'function') {
			let tempValue = getValue
			getValue = function(...args) {
				let callbackResult = invokeCallback.apply(this, args)
				return callbackResult === false ? null : tempValue.apply(this, args)
			}
		}
		return getValue
	}
	descriptor.set = function (value) {
		let oldValue = parentObj[proxyMapName][propertyName]
		let setValue = value
		if (delegateSet) {
			let newValue = delegateSet.call(this, setValue, oldValue)
			newValue !== undefined && (setValue = newValue)
		}
		parentObj[proxyMapName][propertyName] = setValue
	}

	Object.defineProperty(parentObj, propertyName, descriptor)
}

export function defineProperties(obj, props) {
	Object.keys(props).forEach(path => {
		defineProperty(obj, path, props[path])
	})
}

export function get(obj, path, defaultValue) {
	if (typeof path === 'number') {
		path = [path]
	}
	if (!path || path.length === 0) {
		return obj
	}
	if (obj == null) {
		return defaultValue
	}
	if (typeof path === 'string') {
		return get(obj, path.split('.'), defaultValue)
	}

	let result = obj[path[0]]
	if (result === undefined) {
		return defaultValue
	}
	if (path.length === 1) {
		return result
	}

	return get(result, path.slice(1), defaultValue)
}

export function set(obj, path, value, doNotReplace) {
	if (typeof path === 'number') {
		path = [path]
	}
	if (!path || path.length === 0) {
		return obj
	}
	if (obj == null) {
		return defaultValue
	}
	if (typeof path === 'string') {
		return set(obj, path.split('.'), value, doNotReplace)
	}

	let currentPath = path[0]
	let currentValue = obj[currentPath]
	if (path.length === 1) {
		if (currentValue === undefined || !doNotReplace) {
			obj[currentPath] = value
		}
		return currentValue
	}

	if (currentValue === undefined) {
		obj[currentPath] = typeof path[1] === 'number' ? [] : {}
	} 

	return set(currentValue, path.slice(1), value, doNotReplace)
}

export default { watchSet, watchInvoke, d, defineProperty, defineProperties, get, set }
