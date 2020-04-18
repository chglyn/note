var http = require('http')

var server = http.createServer()

var fs = require('fs')

var wwwDir = 'C:/Users/Administrator/Desktop/node-demo/www'

server.on('request', function(req, res) {
	
	res.setHeader('Content-type', 'text/plain;charset=utf-8')
	
	var url = req.url
	var filePath = '/index.html'

	if(url !== '/') {
		filePath = url
	}

	fs.readFile(wwwDir + filePath, function(err, data) {

		res.setHeader('Content-type', 'text/html;charset=utf-8')

		if(err){
			return res.end('404 Not Found')
		}

		fs.readdir(wwwDir, function (err, files) {
			if(err) {
				return res.end('can`t find www dir')
			}
			console.log(files)
		})

		res.end(data)
	})
	
})

server.listen(3000, function() {
	console.log('server runing...')
})