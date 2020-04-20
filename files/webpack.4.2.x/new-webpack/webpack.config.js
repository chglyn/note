const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } =require('clean-webpack-plugin');//自动清除dist目录
const webpack = require('webpack');

module.exports = {
  	mode:"development",
  	entry: './src/index.js',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	filename: '[hash:6].js'
  	},
	module: {
	    rules: [
		    {
		        test: /\.css$/,
		        use: [ 
		        	{ loader: "style-loader" },  
			        {
			            loader: MiniCssExtractPlugin.loader,
			            options: {
			            	esModule: true,
			            },
			        },
		        	'css-loader',
		        ]
		    },
		    {
		        test: /\.(png|jpe?g|gif)$/i,
		        loader: 'file-loader',
		        options: {
		          	outputPath: 'images',
		          	name: '[1]-[name].[ext]'
		        },
		    },
		    {
		      	test: /\.(js|jsx)$/,
		      	exclude: /(node_modules|bower_components)/,
		      	use: {
		        	loader: 'babel-loader',
		        	options: {
		          		presets: ['@babel/preset-env']
		        	}
		      	}
		    },
		    {
		        test: /\.s[ac]ss$/i,
		        use: [
		          'style-loader',
		          'css-loader',
		          'sass-loader',
		        ],
		    }
	    ]
	},
  	plugins: [
    	new HtmlWebpackPlugin({
    		title: '学习webpack'
    	}),
    	new MiniCssExtractPlugin({
    		filename: 'style.css'
    	}),
    	new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
	],
	devServer: {
		contentBase:path.resolve(__dirname, 'dist'),
		host: 'localhost',
		port:8090,
		open: true,  //自动打开浏览器
		hot: true  //热更新
	}
};
