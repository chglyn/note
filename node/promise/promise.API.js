
var  fs = require('fs')


let promiseReadFile = ((filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if(err) {
				//把容器中的pending状态改为Reject
				reject(err)
			}else{
				
				resolve(data)

			}
		})
	})
}) 

promiseReadFile('./data/a.txt')
	.then((data) => {
		console.log(data)
		return promiseReadFile('./data/b.txt')
	})
	.then((data) => {
		console.log(data)
		return promiseReadFile('./data/c.txt')
	})
	.then((data) => {
		console.log(data)
	})