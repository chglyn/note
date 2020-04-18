//用来获取机器信息的
var os = require('os');

//用来操作路径的
var path = require('path');

//获取当前机器的cpu信息
console.log(os.cpus())


//memory 内存
console.log(os.totalmem())

console.log(path.extname('/c:/a/b/c/1.txt'))

// require是加载模块  外部访问不到内部 内部访问不了外部
//相对路径必须加 ./

console.log('hello.js start')

var foo = 'os'

var res = require('./hello.js') //后缀名可以省略

console.log('hello.js end')

console.log('foo的值' + foo);





console.log(res.a)

console.log(res.add(1, 2))





var fs = require('fs')

fs.readFile('./hello.js', function(err, data) {
	if(err) {
		console.log('读取文件失败')
	}else{
		console.log(data.toString())
	}
})
