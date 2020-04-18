var fs = require('fs')

// ES6新增promise PAI

// 创建promise容器

console.log(1)


var p1 = new Promise((resolve, reject) => {

	console.log(2)

	fs.readFile('./data/a.txt', (err, data) => {
		if(err) {
			//把容器中的pending状态改为Reject
			reject(err)
		}else{
			
			resolve(data)

			console.log(3)

		}
	})
})

var p2 = new Promise((resolve, reject) => {

	fs.readFile('./data/b.txt', (err, data) => {
		if(err) {
			//把容器中的pending状态改为Reject
			reject(err)
		}else{
			
			resolve(data)

		}
	})
})

var p3 = new Promise((resolve, reject) => {

	fs.readFile('./data/c.txt', (err, data) => {
		if(err) {
			//把容器中的pending状态改为Reject
			reject(err)
		}else{
			
			resolve(data)

		}
	})
})

console.log(4)

// p成功, 然后then做...
p1
	.then((data) => {
		console.log(data)
		//当前函数中 return 的结果可以在后面的then中函数接收到
		//没有return后面收到的值是undefined
		//return 一个promise对象
		//当 return一个promise对象时候, 后续then中的方法 第一个参数作为跑的resolve
		return p2
	}, (err) => {
		console.log('读取文件失败', err)
	})

	.then((data) => {
		console.log(data)
		return p3
	}, (err) => {
		console.log('读取文件失败', err)
	})

	.then((data) => {
		console.log(data)
	}, (err) => {
		console.log('读取文件失败', err)
	})

