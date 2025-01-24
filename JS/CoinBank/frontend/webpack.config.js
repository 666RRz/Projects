const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')

module.exports = env => ({
	entry: './src/main.js',
	output: {
		filename: '[contenthash].js',
		assetModuleFilename: 'assets/[hash][ext][query]',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},

	resolve: {
		fallback: {
			path: false,
			os: false,
			crypto: false,
		},
	},

	module: {
		rules: [
			{
				test: /.*\.s?css$/i,
				use: [
					env ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]',
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						targets: 'defaults',
						presets: [['@babel/preset-env']],
					},
				},
			},
		],
	},
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [['optipng', { optimizationLevel: 10 }]],
					},
				},
			}),
			new CssMinimizerPlugin(),
			new TerserPlugin(),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			title: 'CardValidation',
			favicon: 'src/assets/img/favicon.png',
		}),
		new MiniCssExtractPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		hot: true,
		port: 8080,
	},
})
