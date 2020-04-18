//引包
var express = require('express')

//nodemon 自动启动服务
//安装 npm install --global nodemon
//执行 nodemon xxx.js

//创建服务器
var app = express()

var comment = [
	{
		name: 'kangkang',
		msg: '2019-03-14 天气很好',
		data: '2019-09-20 13:20:30'
	},
	{
		name: 'Jack',
		msg: '2019-03-16 未来天气很好',
		data: '2019-09-20 23:20:30'
	}
]

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//###  公开指定目录
//第一种方式
app.use('/public/', express.static('./public'))

//第二种方式
//当第一个参数不写, 可以通过省略/public的方式访问
//访问url省略/public
//app.use(express.static('./public'))




//#### 配置 art-template

//配置使用art-template模版引擎
//第一个参数 渲染以.art结束的文件时, 使用art-template模版引擎
//express-art-template是专门用来在express中把art-template整合到express中

app.engine('html', require('express-art-template'))

// app.set('view options', {
//     debug: process.env.NODE_ENV !== 'production'
// })


//如果想要修改默认viewsmul
//用法 app.set('views', render函数默认路径)


//服务器收到get请求 / 时, 执行回调方法
app.get('/', function(req, res) {
	//get方法请求 /时候 , 执行对应的处理函数
	//console.log(req.query) 
	//res.send('hello express')

	// express为response响应对象同一个方法 render
	// render方法默认不可用, 但是如果使用模版引擎就可以使用
	// res.render('html模版名', { 模版数据 })
	// 参数1可以不写路径, 默认会项目中views目录找该模版文件
	res.render('index.html', {
		comment:comment
	})

})


app.get('/post', function(req, res) {
	res.render('post.html')
})



// app.post('/a', function(req, res) {
// 	//以post请求 /时候, 指定对应的处理函数
// 	res.send('hello express a文件')
// })


//post 请求方法
app.post('/post', function(req, res) {
	//console.log(req.query) //只能拿到get方法请求参数
	//在express获取表单post数据 使用第三方插件 body-parser

	var cont = req.body
	cont.data = '2109-03-20 10:38:50'
	comment.unshift(cont)
	res.redirect('/')
})

//get 请求方法
/*
app.get('/pinglun', function(req, res) {
	var cont = req.query
	cont.data = '2109-03-20 10:38:50'
	comment.unshift(cont)

	res.redirect('/')
	// res.statusCode = 302
	// res.setHeader('Location', '/')
	
})
*/


app.get('/admin', function(req, res) {
	res.render('admin/index.html', {
		title: '管理系统'
	})
})




//### 监听
app.listen(3000, function() {
	console.log('server runing...')
})