
const PropertyProxy = require('../index')

let testObject = {
	a: 1,
	b: {
		c: [1,2,3,4,5]
	}
}

PropertyProxy.watchSet(testObject, 'b.c.2', function (value) {
	console.log(`${value}---set`)
})
PropertyProxy.set(testObject, 'b.c.2', 'hahaha')
let value = PropertyProxy.get(testObject, 'b.c.2')

console.log(`${value}---value`)