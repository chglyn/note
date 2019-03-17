//优先从缓存中加载
//a文件已经加载过 直接从缓存中加载
require('./a')
var fn = require('./b')

console.log(fn)

// ./ 当前目录 不可省略
//首位的 / 表示当前文件模块所属根目录



// 第三方包

// 既不是核心文件 也不是路径形式的模块

// 先找到当前文件所出文件目录中的node_module目录

// 再去找node_module/xxx/package.json文件, 再去找main属性

// main属性中记录了当前文件的入口模块

// main 不存在或者 指定文件不存在或错误 默认指向index.js备项文件

//然后加载使用第三包

// 如果所有文件没有一个成立, 会向上一级目录寻找 node_module