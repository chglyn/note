webpack打包优化没有固定模式，需要不断的尝试优化。并且根据项目不同，需要的配置各有差异。webpack打包一般从解析文件入口开始、分块打包、输出文件等。

### 查看打包速度

可以使用`speed-measure-webpack-plugin`查看构建期间各个阶段花费的时间。

```
	const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
	const smp = new SpeedMeasurePlugin();
	//...
	module.exports = smp.wrap(prodWebpackConfig)

```
根据打包花费时间进行各个阶段相关的调优工作。

### 调优构建速度

webpack启动后会从entry入口不断地递归解析文件，来查找打包内容所依赖的模块，因此可以**减少搜索文件范围**

resolve字段给说明了webpack如何搜索文件

* 优化resolve.modules

resolve.modules用于webpack去哪些地方查找第三方模块，默认值`['node_modules']`，会依次查找./node_modules、../node_modules、../../node_modules、...

* 优化resolve.alias

庞大的第三方模块，设置resolve.alias可以让webpack直接使用库的min文件，避免库内解析。如：
```
	resolve.alias:{
	    'react':patch.resolve(__dirname, './node_modules/react/dist/vue.min.js')
	}
```

这样会影响Tree-Shaking，如果是像lodash这类工具类的比较分散的库，比较适合Tree-Shaking，避免使用这种方式。

* 优化resolve.extensions

合理配置resolve.extensions可以减少文件的查找，默认值`['.js', '.json']`，当文件名没有后缀时，webpack会根据extensions的定义后缀列表进行文件查找。

因此注意一下几点
1.列表的值尽量少
2.频率高的文件类型后缀写在前面
3.源码中导入的文件尽可能的写上后缀名，避免查找。如`require(./data)`写成`require(./data.json)`。

* 优化resolve.mainFields 

有些第三方文件会根据不同的环境提供不同的代码。如：分别提供ES5和ES6代码
这两份代码写在package.json文件，如下：

```
	{
	  "jsnext:main": "es/index.js",// 采用 ES6 语法的代码入口文件
	  "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
	}
```

webpack会根据mainFields配置决定采用代码，mainFields默认值`['browser', 'main']`，webpack会按照默认值去查找，只会用到第一个。

假如想使用ES6那份代码，可以这样配置：`mainFields: ['jsnext:main', 'browser', 'main']`

* 优化module.noParse

noParse字段用于webapck不必解析哪些文件，可以用来排除对非模块化文件解析。如：jQuery。因为对vue.min.js经过构建，已经可以运行在浏览器中非模块化文件。

* 优化loader

配置loader，可以使用test、exclude、include缩小搜索范围。

* 配置thread-loader

thread-loader只要放置在其他loader之前，thread-loader之后的loader就会在一个单独的worker池中允许。

代码如下：

```
	...
	model: {
		rules: [
			{
	        	test: /\.js$/,
	        	exclude: /node_modules/,
	        	// 创建一个worker池
		        use: [ 
		          'thread-loader',
		          'babel-loader'
		        ] 
			},
			{
		        test: /\.s?css$/,
		        exclude: /node_modules/,
		        // 创建一个 css worker 池
		        use: [
		          	'style-loader',
		          	'thread-loader',
		          	{
		            	loader: 'css-loader',
		            	options: {
		              		modules: true,
		              		localIdentName: '[name]__[local]--[hash:base64:5]',
		              		importLoaders: 1
		            	}
		          	},
		          	'postcss-loader'
		        ]
			}
		]
	}

```
thread-loader放在style-loader之后，原因是thread-loader没办法存取文件，也没办法获取webpack的选项设置。

官方为了防止启动的worker高延迟，提供了worker池**预热**。这一项是在耗时的loader上使用。

代码如下：
```
	...
	const threadLoader = require('thread-loader');
	const jsWorkerPool = {
		// options

		// 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
		// 当 require('os').cpus() 是 undefined 时，则为 1
		workers: 1,

		// 闲置时定时删除 worker 进程
		// 默认为 500ms
		// 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
		poolTimeout: 2000
	};


	const cssWorkerPool = {
		// 一个 worker 进程中并行执行工作的数量
		// 默认为 20
		workerParallelJobs: 2,
		poolTimeout: 2000
	};

	threadLoader.warmup(jsWorkerPool, ['babel-loader']);

	model.exports = {
		model: {
			rules: [
				{
		        	test: /\.js$/,
		        	exclude: /node_modules/,
		        	// 创建一个worker池
			        use: [ 
							{
								loader: 'thread-loader',
								options: jsWorkerPool
							},
							'babel-loader'
			        ] 
				}
			]
		}
	}

```

* 开启多进程
使用terser开启多进程运行提高构建速度。并发运行的默认数量` os.cpus().length - 1`
代码：
```
	module.exports = {
		optimization: {
			minimizer: [
		  		new TerserPlugin({
		    		parallel: true,
		  		}),
			],
		},
	};

```


* 配置HappyPack优化压缩时间

使用HappyPack可以开启多进程loader转换。

运行在node上的webpack是单线程，只能一个一个文件处理，不能并行处理。HappyPack可以将任务分解成多个子任务，最后将结果发给主进程。JS是单线程模式，只能通过这种多进程方式提高性能。

代码如下：

```

	...
	const HappyPack = require('happypack');

	model.exports = {
		model: {
			rules: [
				{
	                test:/\.js$/，
	                use:['happypack/loader?id=babel']
	                exclude:path.resolve(__dirname, 'node_modules')
	            },
				{
	                test:/\.js$/，
	                use:['happypack/loader?id=babel']
	                exclude:path.resolve(__dirname, 'node_modules')
	            }
			],
	        plugins:[
	            new HappyPack({
	                id:'babel',
	                loaders:['babel-loader?cacheDirectory']
	            }),
	            new HappyPack({
	                id:'css',
	                loaders:['css-loader']
	            })
	        ]
		}
	}


```

HappyPack还支持 `threads、verbose、threadpool`参数，threadpool具有共享池功能，即多个HappyPack实例，能用同个进程池的子任务处理任务，防止资源站用过多。

* 配置ParallelUglifyPlugin优化压缩时间

使用ParallelUglifyPlugin开启多进程压缩JS文件。

ParallelUglifyPlugin压缩JS代码时，需要先将代码解析成Object表示的AST(抽象语法树)，再去应用各种规则去分析和处理AST，所以这个过程计算量大耗时多。开启多个子进程，每个子进程可使用ParallelUglifyPlugin压缩代码，并行执行压缩时间。

* 合理使用缓存

webpack缓存方式有：cache-loader、HardSourceWebpackPlugin、 babel-loader的cacheDirectory，这些缓存方法都有启动的开销。重新运行期间在本地节省时间很大，在初始运行上会慢。

如果项目生产版本每次都必须进行初始化构建，缓存增加构建时间，减慢速度。

使用cache-loader代码如下：

```
	model.exports = {
		model: {
			rules: [
		        test: /\.ext$/,
		        use: ['cache-loader', ...loaders],
		        include: path.resolve('src')
			]
		}
	}

```
此缓存只针对性能开销较大的loader使用。

* 输出质量

1.减少打包的整体体积

压缩代码，删除调试语句，可以使用UglifyJS插件。但是压缩代码可操作性空间过小。典型的方式就是**空白替换**、**缩短变量名**

代码如下：

```
	//before
	function sum(first, second) {
		return first + second;
	}


	//after
	function s(x,y) {return x+y}
```

2.剔除不必要的模块

对于引入的一些模块，项目中没有使用该模块。但是实际打包还是会打包进去的，可以使用`eslint`提高代码质量。

3.按需引入模块

项目中的ECharts为典型，用到什么模块就引入什么模块，以免导致浪费影响性能。

4.按需加载

懒加载方式。典型例子界面首次加载只展示一个按钮，点击按钮时再加载成功后的内容。

5.使用Tree Shaking剔除JS死代码

正常工作的前提代码必须**采用ES6模块化语法**。因为ES6模块化语法是静态化，不能放入其他代码块中。

用法：

修改.babelrc以保留ES6模块化语句

```
{
    "presets": [
        [
            "env", 
            { "module": false },   //关闭Babel的模块转换功能，保留ES6模块化语法
        ]
    ]
}

```

启动webpack带上 --display-used-exports可以打印出关于代码剔除的提示

使用UglifyJSPlugin，或者启动时使用--optimize-minimize

在使用第三方库时，需要配置 resolve.mainFields: ['jsnext:main', 'main']以指明解析第三方库代码时，采用ES6模块化的代码入口


6.开启CSS文件、图片使用CDN缓存

CSS文件、图片使用hash值

7.提取公共代码利用缓存。

如果不提取公共代码，多个界面依赖相同的文件代码，会打包多个文件具有相同的代码块。如果提取浏览器只会运行一次并且加入缓存中，当用户访问界面
加载一次公共文件，在访问其他依赖公共文件的网页时，就会使用文件在浏览器的缓存。


8.通过imagemin-webpack-plugin压缩图片，通过webpack-spritesmith制作雪碧图

总结以上调优webpack构建、打包输出。

详情[webpack性能优化](https://segmentfault.com/a/1190000015883378)