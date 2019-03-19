var express = require('express')

var app = express();

var fs = require('fs')

var path = require('path')

// 中间件：处理请求的 本质就是函数

// 在express中, 对中间件有几种分类
// 不关心路径和请求方法的中间件

// 中间件本身是一个方法, 该方法有三个参数
// requrest 请求对象
// response 响应对象
// next 下一个中间件

// 当一个请求, 进入中间件之后, 如果不调用next会停留在当前中间件
//next是一个方法, 是用来调用下一个中间件
//next也要匹配的, 不是调用紧挨着那一个

// app.use((req, res, next) => {
// 	console.log(1)
// 	next()
// })





// 以 /xxx 开头的路径中间件


// app.use('/a', (req, res, next) => {
// 	console.log(req.url)
// 	req.foo = 'bar'
// 	next()
// })

// app.use((req, res, next) => {
// 	console.log(2)
// 	console.log(req.foo)
// })





// 配一个处理404中间件
app.get('/b', (req, res, next) => {
	fs.readFile(path.join(__dirname, './b.txt'), (err, data) => {
		if(err) {
			//调用next 如果传递参数, 直接往后面找到带有四个参数的应用程序级别的中间件
			//发生错误时候, 可以调用next传递错误
			//就会被全局错误处理中间件匹配到并处理
			return next(err)
		}
		res.end(data)
	})
})


app.get('/', (err, req, res, next) => {
	res.end('err1')
})

app.use((err, req, res, next) => {
	console.log('err2')
})

app.listen(3000, () => {
	console.log('server runing...')
})