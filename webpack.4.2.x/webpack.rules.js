const ExtractTextPlugin=require('extract-text-webpack-plugin'); //使用@next
const rules = {
		rules:[
			{
				test:/\.css$/,
				//use:['style-loader', 'css-loader']
				//loader:['style-loader', 'css-loader']
		        use: ExtractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader",
		          publicPath: '../' //图片打包的路径
		        })
			},
			{
				test:/\.(png|jpg|gif)$/,
				use:[
					{
						loader:'url-loader',
						options: {
							limit:50,
							outputPath:'images', //打包所有图片
							name:'[name].[ext]'
						}
					}
				]
			 },
			 {
			 	test:/\.(js|jsx)$/,
			 	use:['babel-loader'],
			 	exclude:/node_modules/
			 },
			{
				test:/\.vue$/,
				use:['vue-loader'],
				exclude:/node_modules/
			}
			// {
			// 	test:/\.(sass|scss)$/,
			// 	use:ExtractTextPlugin.extract({
			// 		fallback:'style-loader',
			// 		user:['style-loader', 'css-loader', 'sass-loader']
			// 	})
			// },
			// {
			// 	test:/\.less$/,
			// 	use:ExtractTextPlugin.extract({
			// 		fallback:'style-loader',
			// 		user:['style-loader', 'css-loader', 'less-loader']
			// 	})
			// }
		]
	}

	module.exports=rules;
