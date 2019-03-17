var http = require('http')

var server = http.createServer()

var fs = require('fs')

var template = require('art-template')

var wwwDir = 'C:/Users/Administrator/Desktop/node-demo/www'

server.on('request', function(req, res) {
	
	res.setHeader('Content-type', 'text/plain;charset=utf-8')
	
	var url = req.url
	var filePath = '/index.html'

	if(url !== '/') {
		filePath = url
	}

	fs.readFile('./template.html', function(err, data) {

		res.setHeader('Content-type', 'text/html;charset=utf-8')

		if(err){
			return res.end('404 Not Found')
		}

		fs.readdir(wwwDir, function (err, files) {
			if(err) {
				return res.edn('can`t find www dir')
			}
			
			data = data.toString()

			var htmlStr = template.render(data, {
				files: files
			})

			res.end(htmlStr)
		})
	})
})

server.listen(3000, function() {
	console.log('server runing...')
})