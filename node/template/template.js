var template = require('art-template')

//template('script 标签id', { 对象 })

var fs = require('fs')

fs.readFile('./tpl.js', function(err, data) {
	if(err) {
		return console.log('读取文件失败')
	}

	data = data.toString()

	var  res = template.render(data, {
		name: 'jack',
		title: '个人信息'
	})

	console.log(res)

})
