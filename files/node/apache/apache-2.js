var fs = require('fs')
fs.readdir('C:/Users/Administrator/Desktop/node-demo/www', function(err, files) {
	if(err) {
		return console.log('目录不存在')
	}else{
		console.log(files)
	}
})