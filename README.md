##验证手机
function verMobile(val){
    val = parseInt($.trim(val));
    var re = new RegExp("^1[3456789][0-9]{9}$");
    return re.test(val);
}
##UM编辑器过滤获取内容
s.push(item.getContent());
s = s.join("\n");
s = $('<div>'+s+'</div>').find('img').each(function(index, el) {
    $(this)[0].src = $(this)[0].src.split('/').reverse()[0];
}).end().html()


//https://vuejs-templates.github.io/webpack https://www.jianshu.com/p/1626b8643676
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = __dirname +'/dist/';
module.exports = {
    //devtool: 'eval-source-map',
	entry: {
        'a': './src/js/a.js',
		'b': './src/css/b.css',
        'c': './src/css/c.scss'
	},
	output: {
		path: path,
		filename:'js/[name].js'
	},
	module: {
		rules:[
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:["es2015"]
                    }
                }
            },
            { 
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader: 'css-loader', options: {minimize: true}}]
                })
            },
            { 
                test: /\.scss$/, //安装失败使用node rebuild node-sass
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader: 'css-loader', options: {minimize: true}},{loader: 'sass-loader'}]
                })
                //[{ loader: 'style-loader' }, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            },
            {
                test: /\.(png|jsp|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: '/assets/[name].[hash:5].[ext]',
                        limit: 20000
                    }
                }]
            }/*,
            {
                test: /\.tpl$/,
                user: 'ejs-loader'
            }*/
		]
	},
	plugins: [
        new htmlWebpackPlugin({
            tempalte:'index.html',
            filename: 'index.html',
            inject: 'body', //js存放标签位置
            title: 'webpack',
            minfy: {
                removeComments: true,
                collapseWhitespace:true
            }
            //excludeChunks: ['b', 'c'], 排除外引入文件
            //chunks: ['a', 'c']
        }),
        
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,

        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks:true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                context: __dirname
            }
        })
    ]
}



//模拟form提交参数
$.extend({
	StandardPost:function(url, args){
		var form = $("<form method='post' style='display:none'></form>"), input;
		form.attr({ "action":url });
		args=JSON.parse(args);
		$.each(args, function(key2, value2){
			$.each(value2,function(key, value){
				input = $("<input type='hidden'>");
				input.attr({ "name":'objectArray['+key2+']['+key+']'});
				input.val(value);
				form.append(input);
			});
		});
		form.appendTo($('body'));
		form.submit();
		form.remove();
	}
});
