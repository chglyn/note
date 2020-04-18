// 浏览器中的js没有文件操作的能力, 但是node中的js具有操作文件的能力
// fs是file-systen的简写, 就是文件系统的意思
// 在node中想要进行文件操作, 就必须引入fs这个核心模块
// 在fs这个核心模块中, 就提供额所有文件操作相关的API

// 例如：fs.readFile就是用来读取文件的
// 1.使用require方法加载fs核心模块
// var fs = require('fs');

// 2.读取文件
var fs = require('fs');

fs.readFile('./hello.txt', function(error, data) {
	// fs.readFile(要读取的文件路径, 回调函数(error:成功/失败, data:成功或者失败))
	// 读取的数, 文件中存储的是二进制数据 0 1
	// 为何看不到二进制：二进制转化为十六进制
	// 可以通过toString方法把其转化为能够认识的字符
	
	//console.log(data.toString());

	//console.log(error); //成功 -> null; 失败 报错
	//console.log(data); //c成功 -> null; 失败 -> undefined


	if(error) {
		console.log('读取文件失败了');
		return;
	}else {
		console.log(data.toString());
	}


})

