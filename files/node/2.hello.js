var fs = require('fs');
//参数：文件路径, 文件内容, 回调函数
//error
fs.writeFile('./hello.md', '大家好, 我是nodejs', function(error) {
	if(error) {
		console.log('写入文件失败了');
		return;
	}else{
		console.log('写入成功');
	}
	
})

//删除文件fs.unlink
//创建目录fs.makedir
