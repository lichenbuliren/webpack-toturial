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

​	__babel-loader 的缺点就是编译很慢，所以我们在配置的时候，一定要配置好哪些目录是需要编译的，哪些是不需要编译的，通过 `exclude` 配置项就能排除那些不需要编译的目录或文件了。__

基础配置如下：

``` javascript
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
        cacheDirectory: false, // 是否缓存编译的结果,缓存结果能够提高最多 2倍 编译速度
      }
      // loader: 'babel?presets[]=2015'  这个写法和方面的写法是一样的
    }
  ]
}
```

__babel 编译会注入一些帮助代码到每一个编译的文件中去，这样一来将会导致我们的代码变得很臃肿！ 使用 babel-plugin-transform-runtime 和  babel-runtime 插件来解决这个问题__

``` bash
npm install babel-plugin-transform-runtime --save-dev
npm install babel-runtime --save
```

``` javascript
loaders: [
  // the 'transform-runtime' plugin tells babel to require the runtime
  // instead of inlining it.
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }
  }
]
```

假设我们新建两个类文件，一个 Point.js、一个 Person.js

``` javascript
class Person{
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}

module.exports = Person;
```

``` javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

module.exports = Point;
```

在不加 `transform-runtime` 配置之前，我看可以看到编译之后的代码是这样子的：

``` javascript
// Point.js
function(module, exports) {

  'use strict';

  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Point = function() {
    function Point(x, y) {
      _classCallCheck(this, Point);

      this.x = x;
      this.y = y;
    }

    _createClass(Point, [{
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }]);

    return Point;
  }();

  module.exports = Point;
}
```

``` javascript
// Person.js
function(module, exports) {

  "use strict";

  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Person = function() {
    function Person(name) {
      _classCallCheck(this, Person);

      this.name = name;
    }

    _createClass(Person, [{
      key: "sayName",
      value: function sayName() {
        return this.name;
      }
    }]);

    return Person;
  }();

  module.exports = Person;
}
```

然后我们再来看看加上 `transform-runtime ` 参数，编译之后的代码：

```javascript
// Point.js
function(module, exports, __webpack_require__) {

  'use strict';

  var _classCallCheck2 = __webpack_require__(6);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(7);

  var _createClass3 = _interopRequireDefault(_createClass2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Point = function() {
    function Point(x, y) {
      (0, _classCallCheck3.default)(this, Point);

      this.x = x;
      this.y = y;
    }

    (0, _createClass3.default)(Point, [{
      key: 'toString',
      value: function toString() {
        return '(' + this.x + ', ' + this.y + ')';
      }
    }]);
    return Point;
  }();

  module.exports = Point;
}
```

```javascript
// Person.js
function(module, exports, __webpack_require__) {

  "use strict";

  var _classCallCheck2 = __webpack_require__(6);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass2 = __webpack_require__(7);

  var _createClass3 = _interopRequireDefault(_createClass2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Person = function() {
    function Person(name) {
      (0, _classCallCheck3.default)(this, Person);

      this.name = name;
    }

    (0, _createClass3.default)(Person, [{
      key: "sayName",
      value: function sayName() {
        return this.name;
      }
    }]);
    return Person;
  }();

  module.exports = Person;
}
```

这样子的好处就是不用把 `_classCallCheck` 和 `_createClass` 这两个帮助方法注入到每一个需要用到这个两个方法的文件里面去了，从而减小了我们的代码体积。

#### 使用 `cacheDirectory` 报错？

如果你在使用 `cacheDirectory` 这个配置选项的时候，抛出一个类似这样的错误

``` bash
ERROR in ./frontend/src/main.js
Module build failed: Error: ENOENT, open 'true/350c59cae6b7bce3bb58c8240147581bfdc9cccc.json.gzip'
 @ multi app
```

这个很可能表示你的配置文件没有正确的配置，你很可能是如下面的配置：

``` javascript
loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel?cacheDirectory=true'
  }
]
```

__注意上面的 `true` 配置项，对于 boolean 类型的值，并不是这么配置的，正确的配置如下：__

``` javascript
loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel?cacheDirectory'
  }
]
```

或者

``` javascript
loaders: [
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'babel',
    query: {
      cacheDirectory: true
    }
  }
]
```



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

