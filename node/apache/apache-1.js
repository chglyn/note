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

	fs.readFile('./template.html', function(err, data) {

		res.setHeader('Content-type', 'text/html;charset=utf-8')

		if(err){
			return res.end('404 Not Found')
		}

		fs.readdir(wwwDir, function (err, files) {
			if(err) {
				return res.edn('can`t find www dir')
			}
			
			var content = ''
			files.forEach(function(item) {
				content += `
					<tr>
						<td data-value="^_^/">
						<a class="icon dir" href="/apple/">${item}</a></td>
						<td class="detailsColumn" data-value="0"></td>
						<td class="detailsColumn" data-value="1552355370">2019/3/12 上午9:49:30</td>
					</tr>
				`
			})

			data = data.toString();
			//普通的字符串解析替换
			data = data.replace('apple', content)

			res.end(data)

		})

	})
	
})

server.listen(3000, function() {
	console.log('server runing...')
})