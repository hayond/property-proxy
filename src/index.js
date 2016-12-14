
export function define(obj, path, descriptor) {
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

	let parentObj = get(obj, path.splice(0, -1))
	let propertyName = path[path.length - 1]
	if (descriptor.invoke) {
		let invokeMethod = descriptor.invoke
		descriptor.value && (parentObj[propertyName] = descriptor.value)
		descriptor.get = function (originMethod) {
			return function (...args) {
				descriptor.invoke(...args)
				return originMethod(...args)
			}
		}
	}
	if (descriptor.get) {
		descriptor.get = function () { return descriptor.get(parentObj[propertyName]) }
	}

	Object.defineProperty(parentObj, propertyName, descriptor)
}

export function defineProperties(obj, props) {
	Object.keys(props).forEach(path => {
		defineProperty(obj, path, props[path])
	})
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

export default { define, get, set }
