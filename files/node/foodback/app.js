var http = require('http')
var fs = require('fs')

var template = require('art-template')

var url = require('url')

var comment = [
	{
		name:'kangkang',
		msg:'今天天气很好',
		data: '2018-10-09'
	},
	{
		name:'jack',
		msg:'今天天气不错',
		data: '2018-06-20'
	}
]


http
	.createServer(function(req, res) {
		//url.parse()方法将路径解析为操作的对象
		//第二个参数通过query属性进行访问
		console.log('请求客户端的端口号是：' + req.socket.remotePort)
		var parseObj = url.parse(req.url, true)
		//单独获取 不包含查询字符串的路径部分(问号之后内容)
		var pathname = parseObj.pathname

		if(pathname === '/') {
			fs.readFile('./views/index.html', function(err, data) {
				if(err) {
					return res.end('404 Not Found')
				}
				var htmStr = template.render(data.toString(), {
					comment:comment
				})
				res.end(htmStr)

			})
		}else if(pathname === '/pinglun') {
			// 对应一次响应, 响应结束对应一次响应也就结束
			//console.log(JSON.stringify(parseObj.query))

			// console.log('收到请求啦...')
			// console.log(parseObj)
			var cot = parseObj.query
			cot.data = '2019-03-12 17:50:00'
			comment.unshift(cot)

			res.statusCode = 302
			res.setHeader('Location', '/')
			res.end()
			//res.redirect()
		}else if(pathname === '/post') {
			fs.readFile('./views/post.html', function(err, data) {
				if(err) {
					return res.end('404 Not Found')
				}
				res.end(data)
			})
		}else if(pathname.indexOf('/public/') === 0) {
			// /public/main.css
			// /public/main.js
			// ...
			fs.readFile('.' + pathname, function(err, data) {
				if(err) {
					return res.end('404 Not Found')
				}
				res.end(data)
			})
		}else {
			fs.readFile('./views/404.html', function(err, data) {
				res.end(data)
			})
		}

	})
	.listen(3000, function() {
		console.log('server runing...')
	})
