
// console.log(exports === module.exports)

// var foo = 'hello nodejs'


// function add(x, y) {
// 	return x + y
// }

// //导出多个模块内容
// exports.foo = foo

 //单独导出一个模块成员, 用下面方式
 //如果一个模块直接导出某个成员, 而非挂载方式
// module.exports = add

// module.exports = function(x, y) {
// 	return x + y
// }


// module.exports = {
// 	add: function(x, y) {
// 		return x + y
// 	},
// 	str: 'hello'
// }


/**
* 在node中, 每个模块都有一个自己的module对象
* 在module中, 有一个成员叫exports也是一个对象 默认是空对象
*  
	var module = {
		exports: {
			
		}
	}

*
*	隐式的默认在最后一句默认添加
* 	return module.exports
*	谁来require, 谁就能module.exports
*/

//-----------------------特例--------------------------------

// exports === module.exports

// exports.foo = 'bar'

// module.exports.fn = function(x, y) {
// 	return x + y
// }

// var str = 'hello'

// function add(x, y) {
// 	return x + y
// }

// exports.str = str

// module.exports.add = add


//--------------------------特例----------------------

// module.exports = 'hello'

// exports.foo = 'world'

//--------------------------特例-----------------------

// module.exports = {
// 	foo: 'bar'
// }

// exports = module.exports

// exports.foo = 'hello'

//-----------------------特例----------------------

exports.foo = 'bar' // { foo: 'bar'}

module.exports.a = 123  // { foo: 'bar', a: 123 }

//此时exports  != module.exports  --> { a: 'hello' }
exports = {  
	a: 'hello'
}

module.exports.foo = 'haha' // { foo: 'haha', a: 123 }

exports.c = 456  // { a: 123, c: 456 }

exports = module.exports

exports.a = 789 // { foo: 'bar', a: 789 }

//此时把上面全部覆盖  
module.exports = function() {
	console.log('hello nodejs')
}

/*
	补充 
	var obj = {
		1: 'hello'
		2: 'nodejs',
		length: 2
	}

[].slice.call(obj)

*/