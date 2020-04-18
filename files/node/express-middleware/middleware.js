var http = require('http')

var url = require('url')


var server = http.createServer()


var query = require('./query')

server.on('request', (req, res) => {
	// console.log(req.query)
	// console.log(req.body)
	// console.log(req.cookie)
	// console.log(req.session)

	//解析请求地址中的get参数
	// var urlObj = url.parse(req.url, true)
	// req.query = urlObj.query
	//导出一个模块, 相当于下面这段话, 下面方法类似
	query(req, res);


	//解析请求地址中的post
	req.body = {
		foo: 'bar'
	}


	// 解析cookie
	req.cookie = {
		islogin: true
	}


	//配置session
	var session = {}


	res.render = function() {}

	
	res.end('hello')

})


server.listen(3000, () => {
	console.log('server runing...')
})