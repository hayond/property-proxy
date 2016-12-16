property-proxy
===========

Proxy and Monitor deep properties 

## Install
```
npm install property-proxy --save
```

## Method
```javascript
var propertyProxy = require('property-proxy')
var o = {}
```

### defineProperty (obj, path, descriptor)
like Object.defineProperty, but can use path

```javascript
propertyProxy.defineProperty(o, 'a.b.c', {
	value: 37,
  	writable: true,
  	enumerable: true,
  	configurable: true
})
console.log(o.a.b.c)
// 37

propertyProxy.defineProperty(o, 'a.b.c', {
	get: function (value) {
		console.log('get--' + value)
		return value
	},
	set: function (value, oldValue) {
		console.log('set--' + value + '--instead-of--' + oldValue)
		return value
	}
})
o.a.b.c
// get--37
o.a.b.c = 666
// set--666--instead-of--37
```

### defineProperties (obj, props)
```javascript
propertyProxy.defineProperties(o, {
	'a.b': {...},
	'a.b.c': {...},
	...
})
```

### watchSet (obj, path, callback)
Monitor property value change

```javascript
propertyProxy.watchSet(o, 'a.b.c', function (value, oldValue) {
	console.log('set--' + value + '--instead-of--' + oldValue)
	// something else, like DOM operator
	// document.querySelector('H2').innerHTML = value
})
o.a.b.c = 'hello es!'
// set--hello es!--instead-of--666
```

### watchInvoke (obj, path, callback)
Monitor method invoke

```javascript
propertyProxy.set(o, 'a.b.d.l', [1,2,3,4,5,6,7])
propertyProxy.watchInvoke(o, 'a.b.d.l.push', function (value) {
	console.log('push--' + value + '--into--' + this.toString())
})
propertyProxy.get(o, 'a.b.d.l').push(8)
// push--8--into--1,2,3,4,5,6,7
```

### get (obj, path, defaultValue)
```javascript
propertyProxy.get(o, 'a.b.d.l')
console.log(o.a.b.d.l.toString())
// 1,2,3,4,5,6,7,8
```

### set (obj, path, value, doNotReplace)
```javascript
propertyProxy.set(o, 'a.b.d.l', [6,6,6])
console.log(o.a.b.d.l.toString())
// 6,6,6
```

## Inspire By
* [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
* [object-path](https://github.com/mariocasciaro/object-path)