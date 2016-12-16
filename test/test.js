
import PropertyProxy from '../src/property-proxy'
// const PropertyProxy = require('../index')

let testObject = { 
	a: 1,
	b: {
		c: [1,2,3,4,5]
	}
}

PropertyProxy.watchSet(testObject, 'b.c.2', function (value) {
	console.log(`${value}---set`, this.toString())
})
PropertyProxy.watchInvoke(testObject, 'b.c.push', function (value) {
	console.log(`${value}---push`, this.toString())
})
PropertyProxy.set(testObject, 'b.c.2', 'hahaha')
PropertyProxy.get(testObject, 'b.c').push('666')
