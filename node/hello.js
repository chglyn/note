// https://standardjs.com
// http://airbnb.io/javascript/



//demo-one
var foo = 'hello nodejs';

console.log('foo的值：' + foo);

// console.log(window);

// console.log(document);





exports.a = 'hello'


exports.add = function(x, y) {
	return x + y
}


function add(x, y) {
	return x + y
}


exports.readFile = function(path, callback) {
	console.log('文件路径：' + path);
}