let express = require('express')

var app = express()

var path = require('path')

app
	// __dirname 用来获取当前文件模块所属目录的绝对路径
	// __filename 可以获取当前文件的绝对路径
	//以上都不受node执行命令影响
	.use('/public/', express.static(path.join(__dirname, './public')))

	.engine('html', require('express-art-template'))

	.set('views', path.join(__dirname, './views')) //设置默认

	.get('/', (req, res) => {
		res.render('index.html', {
			name: 'nodejs'
		})
	})

	.listen(3000, () => {
		console.log('server runing...')
	})


// console.log(__dirname)
// console.log(__filename)