

var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log('读取失败')

		//抛出异常
		//组织程序的执行
		//把错误消息打印到控制台

		throw err
	}
	console.log(data)
})


fs.readFile('./data/b.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log('读取失败')

		//抛出异常
		//组织程序的执行
		//把错误消息打印到控制台

		throw err
	}
	console.log(data)
})


fs.readFile('./data/c.txt', 'utf8', function(err, data) {
	if(err) {
		return console.log('读取失败')

		//抛出异常
		//组织程序的执行
		//把错误消息打印到控制台

		throw err
	}
	console.log(data)
})

