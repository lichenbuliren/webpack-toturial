module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        // 不转义目录配置
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
          cacheDirectory: true // 是否缓存编译的结果,缓存结果能够提高最多 2倍 编译速度
        },
        // loader: 'babel?presets[]=2015'  这个写法和方面的写法是一样的
      }
    ]
  },
  // webpack-dev-server 配置
  devServer: {
    port: 8088
  }
}
