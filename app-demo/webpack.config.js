var path = require('path');
var projectRoot = __dirname;
var assetsRoot = path.resolve(__dirname, './dist/');
console.log(assetsRoot);
module.exports = {
  entry: {
    '/static/js/index': './static/js/index.js',
    '/static/js/demo': './static/js/demo.js'
  },
  output: {
    path: assetsRoot,
    publicPath: '/dist/',
    filename: '[name].js',
    sourceMapFilename: true
  },
  devServer: {
    port: 8088
  }
}
