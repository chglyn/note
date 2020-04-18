//webapck4.2.x升级指南 https://segmentfault.com/a/1190000014247030
const path=require('path');//目录路径
const htmlWebpackPlugin=require('html-webpack-plugin');//html模版
const cleanWebpackPlugin=require('clean-webpack-plugin');//自动清除dist目录
const weback=require('webpack');//热更新需要
//const MiniCssExtractPlugin=require('mini-css-extract-plugin');//分离css
const ExtractTextPlugin=require('extract-text-webpack-plugin'); //使用@next
const PurifyCSSPlugin = require('purifycss-webpack'); //消除冗余的css
const glob=require('glob');
const rulesConfig = require('./webpack.rules.js');

const demoConfig=require('./modules/demo.js');
console.log(demoConfig+'-----------');

const jsonConfig=require('./webpack.config.json');
console.log(jsonConfig+'-----------');

const copyWebpackPlugin=require('copy-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader@15版本

module.exports={
	//mode: 'development',
	entry: {
		index:jsonConfig.entry1,
		jquery: 'jquery'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module:rulesConfig,
	//-----------------------------------
	resolve: {
		alias: {
			'vue':'vue/dist/vue.js'
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new weback.HotModuleReplacementPlugin(),
		new cleanWebpackPlugin(['dist']),
		new htmlWebpackPlugin({
			title: 'app',
			template:'./src/index.html',
			filename: 'index.html',
			chunks:['index', 'jquery'],
			hash: true
		}),
		new ExtractTextPlugin({
			filename:'css/[name].css',
			ignoreOrder: true //.vue文件中样式打包到公共css文件中
		}),
		new PurifyCSSPlugin({
			paths:glob.sync(path.join(__dirname, 'src/*.html'))
		}),
		new copyWebpackPlugin([{
			from:path.resolve(__dirname, 'src/assets'),
			to:'../public'
		}]),
		new weback.ProvidePlugin({
			$: 'jquery'
		})
	],
	optimization:{
		splitChunks:{
			cacheGroups:{
				aaa:{
					chunks:'initial',
					name:'jquery',
					enforce:true
				}
			}
		}
	},
	devServer: {
		contentBase:path.resolve(__dirname, 'dist'),
		host: 'localhost',
		port:8090,
		//open: true,  //自动打开浏览器
		hot: true  //热更新
	}
}
