// https://www.bilibili.com/video/av27670326/?p=1
// 构建一个web服务器
//在node中提供一个核心模块http, 帮助创建编写服务器


//加载http核心模块
var http = require('http')


var fs = require('fs')

//使用http.createServer()方法创建一个web服务器, 返回一个server实例
var server = http.createServer()



//提供对数据的服务
//发送请求
// 接受请求
// 处理请求
// 发送响应
//注册request请求事件, 当客户端请求过来, 就会自动触发服务器的request请求事件,然后执行第二个参数, 回调处理函数
// request 请求对象
// response 响应对象
server.on('request', function(request, response) {
	//console.log('收到客户端请求了');

	console.log('请求客户端的端口号是：' + request.socket.remotePort)

	console.log('请求远程地址：' + request.socket.remoteAddress)
	//console.log('请求路径是：' + request.url)

	//response对象有一个方法, write可以用来给客户端发送响应数据
	//write可以使用多次, 但是最后一次使用end响应结束, 否则客户端一直等待
	// response.write('hello')   
	// response.write(' nodejs')
	// response.end();

	//简写
	//response.end('hello nodejs');

	//text/plain普通文本
	response.setHeader('Content-type', 'text/plain;charset=utf-8')

	//区分路径
	var url = request.url.toLowerCase();
	if(url === '/') {
		//响应内容只能是二进制数据或者字符串
		//对象, 数组 布尔值 都不行
		//response.end('index');

		var products = [
			{
				name: 'apple X',
				price: 8888
			},
			{
				name: '小米 X',
				price: 1999
			}
		]

		response.end(JSON.stringify(products))

	}else if(url ==='/b') {

		response.setHeader('Content-type', 'text/html;charset=utf-8')
		response.end('<p>login</p>');

	}else if(url === '/html') {
		// ./... 相对于执行node命令所处的终端路径
		fs.readFile('./resource/index.html', function(err, data) {
			if(err) {
				response.setHeader('Content-type', 'text/plain;charset=utf-8')
				response.end('读取文件失败')
			}else{
				response.setHeader('Content-type', 'text/html;charset=utf-8')
				response.end(data)
			}
		})


	}else if(url === '/a'){ //http://tool.oschina.net
		fs.readFile('./resource/1.jpg', function(err, data) {
			if(err) {
				response.setHeader('Content-type', 'text/plain;charset=utf-8')
				response.end('读取文件失败')
			}else{
				response.setHeader('Content-type', 'image/jpeg')
				response.end(data)
			}
		})
	}else{

		response.end('404 not found');
		
	}

})



//绑定端口号, 启动服务器  端口号范围 0-65536之间
server.listen(3000, function() {
	console.log('服务器启动成功, 可以通过http://localhost进行访问')
})