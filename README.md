## webpack 基本使用方法教程

### 初始化项目

1、全局安装 webpck
``` bash
npm install webpack -g
```

2、安装 webpack 到项目依赖中
``` bash
npm install webpack --save-dev
```

3、安装 webpack 开发工具
``` bash
npm install webpack-dev-server --save-dev
```

### webpack loader

webpack 本身仅仅只能用来处理 JavaScript 代码，因此我们需要一些其它的插件来处理其它类型的文件。

例如：编译处理 CSS 文件， 我们需要安装 `css-loader`，同时还需要 `style-loader`来将编译之后的样式写入 CSS 文件中去。

**安装 css-loader style-loader**
``` bash
cnpm install css-loader style-loader --save-dev
```


### 配置文件中配置 loader
使用 `cssloader`, `style-loader` 编译 CSS 文件，具体使用方法见 `./demo01/`;
``` javascript
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
}
```

### 常用 loader

- [css-loader](https://github.com/webpack/css-loader) 
- [style-loader](https://github.com/webpack/style-loader) 


- [sass-loader](https://github.com/jtangelder/sass-loader)  安装 sass-loader 依赖 node-sass，同时需要 css-loader, style-loader 

  ``` bash
  npm install sass-loader node-sass --save-dev
  ```

  ​

- [babel-loader](https://github.com/babel/babel-loader)  安装 babel-loader 依赖 babel-core、babel-preset-es2015，用来将 es6 的 js 编译成 es5

  ``` bash
  npm install babel-loader babel-core babel-preset-es2015 --save-dev
  ```

  ​

在有了 webpack.config.js 配置文件之后，我们就可以直接在命令行执行

``` bash
# 直接运行
webpack

# 显示编译进度和不同颜色
webpack --progress --colors

# 监听文件改动
wepback --progress --colors --watch
```

### 安装 webpack 开发者工具

``` bash
npm install webpack-dev-server -g
```

``` bash
webpack-dev-server --progress --colors
```

使用这个开发者工具将会在本地的 `8080 ` 端口启动一个小型的 `express` 服务，用来作为静态文件的服务器，`webpack-dev-server` 使用的是 `webpack --watch ` 模式来监听文件变化的。启动服务之后，打开  [http://localhost:8080/webpack-dev-server/bundle](http://localhost:8080/webpack-dev-server/bundle) 来访问我们 Demo 文件。

__webpack-dev-server 使用  `watch` 模式，它会阻止 webpack 发射目标文件的改动到本地硬盘的文件中，取而代之的是将文件的改动存储到内存中__

