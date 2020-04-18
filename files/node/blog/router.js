var express = require('express')

var router = express.Router()

var users = []

router
	.get('/login', (req, res) => {
		res.render('login.html')
	})


	.post('/login', (req, res) => {
		console.log(req.body)
	})

	.get('/reg', (req, res) => {
		res.render('reg.html')
	})

	.post('/reg', (req, res) => {
		var data = req.body

		// xxx.findOne({
		// 	name: data.name
		// }, (err, data) => {
		// 	if(err) {
		// 		return res.status(500).end('server err')
		// 	}
		// 	// console.log(data)
		// 	if(data) {
		// 		//res.status(200).JSON.stringify(users).data
		// 		return res.status(200).json({
		// 			success: true,
		// 			code: 0,
		// 			users:data
		// 		})
		// 	}
		// new xxx(data).save((err, xxx) => {

		// })
		// })
		//服务器重定向对异步请求无效
			var userName = md5(md5(data.name) + 'keyboard')

			if(data) {
				return res.status(200).json({
					success: true,
					code: 0,
					users:data
				})
			}


	})

	.get('/', (req, res) => {
		res.render('index.html', {
			name: 'nodejs'
		})
	})

	.get('/lists', (req, res) => {
		res.render('lists.html')
	})

module.exports = router