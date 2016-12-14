
let propertyProxy = require('../dist/src/index')

let testObject = {
	a: 1,
	b: {
		c: [1,2,3,4,5]
	}
}
propertyProxy.define(testObject, 'b.c.2', {
	get(value) {
		console.log(`${value}---get`)
	},
	set(value){
		this.c = '23234234'
	}
})
propertyProxy.set(testObject, 'b.c.2', 'hahaha')
let v = propertyProxy.get(testObject, 'b.c.2')

console.log(testObject)
