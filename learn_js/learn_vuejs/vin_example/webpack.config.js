var path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');
var babelpolyfill = require("babel-polyfill");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'example.js'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(APP_PATH, 'components'),
      examples: path.resolve(APP_PATH, 'examples'),
      reset: path.resolve(APP_PATH, 'reset'),
      common: path.resolve(APP_PATH, 'common'),
    }
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: [NODE_MODULES],
        loader: 'babel-loader'
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', //添加对样式表的处理
          use: [{
              loader: 'css-loader', //添加对样式表的处理
              options: {
                modules: false,
                importLoaders: 2,
                sourceMap: true,
                localIdentName: '[folder]__[local]__[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader'
            }, //添加对样式表的处理
            {
              loader: 'sass-loader', //添加对样式表的处理
              options: {
                outputStyle: 'expanded',
                sourceMap: true
              }
            }
          ]
        })

      },
      {
        test: /\.(jpg?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'img/[name].[ext]'
          }
        }],
        exclude: [NODE_MODULES]
      },
    ]
  },
  devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项

  devServer: {
    contentBase: './dist', //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    compress: true, //开启gzip
    hot: true,
    port: 9001
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //   }
    // }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, './index.html'),
      filename: './index.html',
      inject: 'body'
    })
  ]
};