'use strict';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public/scripts');
const APP_DIR = path.resolve(__dirname, 'src');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');


const VENDOR_LIBS = [
	'react',
	'react-dom',
	// 'antd',
	'apollo-client',
	'react-router',
	'lodash',
	'sortablejs',
	'react-sortablejs',
	'graphql-tag'
];

const WebpackConfig = {

	entry: {
		bundle: APP_DIR + '/app.js',
		vendor: VENDOR_LIBS
	},
	output: {
		path: BUILD_DIR,
		filename: '[name].[hash].js',
		publicPath: 'scripts/',
	},

	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: '/node_modules/',
				include : APP_DIR,
				options: {
					presets: [ 'env', 'react' ],
					plugins: [[ 'import', { libraryName: 'antd', style: 'css' } ]]
				}
			},
			{
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
				}),
				test: /\.css$/
			},
			{
				loader: 'json',
				test: /\.json$/
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'eslint-loader',
				include : APP_DIR
			},
		],
	},

	plugins: [
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		new HTMLWebpackPlugin({
			inject: false,
			filename: '../index.html',
			template: 'src/index.ejs',
			minify: {
				collapseBooleanAttributes: true,
				removeComments: true,
				collapseWhitespace: true,
			}
		}),

		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.AggressiveMergingPlugin()
	],

	resolve: {
		alias: {
			app: APP_DIR
		},
		extensions: [ '.js', '.json' ]
	},


};

module.exports = WebpackConfig;



/*

new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false
}),

		// filename: 'bundle.js',
		// filename: '[name].js',
		// chunkFilename: '[name]-[chunkhash].js', 

		// publicPath: 'scripts/'
		// filename: '[hash].js',


				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: true,
							modules: false,
						}
					}
				]

 */

