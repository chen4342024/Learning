var path = require('path');

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
  },
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules!postcss'//添加对样式表的处理
      },
      {
        test: /\.scss/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'//添加对样式表的处理
      }
    ]
  },
  postcss:[
    require('autoprefixer')
  ]
};