//安装 cnpm i  mysql --save-dev



var mysql      = require('mysql');

//创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'secret',
  database : 'my_db'
});
 
//连接数据库
connection.connect();

//执行数据操作
connection.query('SELECT * FROM uers', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});


// connection.query('INSERT INTO uers VLUES(null, "admin", "1234")', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });
 
//关闭连接
connection.end();