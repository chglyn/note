/*
*
*路由模块
*
*/

// var fs = require('fs')

// express提供了更好的方式
var express = require('express')

//把路由都挂载router中
var router = express.Router()

var Students = require('./students')

router
	.get('/', function(req, res) {
		res.send(`
			<a href="/students">学生列表</a>
		`)
	})

	.get('/students', function(req, res) {
		// fs.readFile('./db.json', 'utf8', function(err, data) {
		// 	if(err) {
		// 		return res.status(500).end('Server err...')
		// 	}
		// 	res.render('index.html', {
		// 		title: '管理系统',
		// 		students:JSON.parse(data).students
		// 	})
		// })

		Students.findAll(function(err, students) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.render('index.html', {
				title: '管理系统',
				students:students
			})
		})
	})

	.get('/students/new', function(req, res) {
		res.render('new.html')
	})

	.post('/students/new', function(req, res) {
		//console.log(req.body)

		Students.save(req.body, function(err) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.redirect('/students')
		})

	})

	.get('/students/edit', function(req, res) {
		//console.log(req.query.id)
		Students.findById(parseInt(req.query.id), function(err, student) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.render('edit.html', {
				student: student
			})
		})

	})

	.post('/students/edit', function(req, res) {
		// console.log(req.body)

		Students.updateById(req.body, function(err) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.redirect('/students')
		})
	})



	.get('/students/delete', function(req, res) {

		Students.deleteById(parseInt(req.query.id), function(err) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.redirect('/students')
		})
	})

module.exports = router

/* 第一种路由
module.exports = function(app) {
	app.get('/', function(req, res) {
		fs.readFile('./db.json', 'utf8', function(err, data) {
			if(err) {
				return res.status(500).end('Server err...')
			}
			res.render('index.html', {
				title: '管理系统',
				students:JSON.parse(data).students
			})
		})
	})
}
*/
