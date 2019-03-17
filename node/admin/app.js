var express = require('express')

var app = express()

var router = require('./router')

var bodyParser = require('body-parser')

app
	.use('/public/', express.static('./public'))

	.engine('html', require('express-art-template'))
	
	//一定要挂载路由之前
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())

	//把路由容器挂载到app服务中
	.use(router)

	.listen(3000, function(req, res) {
		console.log('server runing...')
	})

	//第一种路由
	//router(app)
	//module.exports = app