* 怎样使用webpack?
```
npm install webpack、webpack-dev-server(创建本地服务器)、webpack-dev-middleware(文件进行监控，编译)、webpack-hot-middleware(热加载)
```
- webpack是一种模块化解决方案,一种模块化的打包机
* gulp和webpack的区别?
```
gulp：是强调前端开发的工作流程,他是通过配置一系列的task(如压缩合并、雪碧图),然后定义执行顺序,一个一个跑任务
webpack：是一个前端模块化方案,更侧重模板打包
```
* 快速搭建vue-cli
```
1、cnpm install -g vue-cli
2、vue init webpack 项目名
```
* 怎么快速创建一个package.json文件?
```
npm init --yes
```
* 插件介绍
```
Babel编译javaScript(ES6、ES7)
核心包是：babel-core、babel-loader、babel-prsest-env、babel-prsest-react
编译vue是：vue-loader、vue-template-compiler、vue-style-loader
编译Sass是: sass-loader、node-sass
编译Less是：less-loader、less
```
* webpack模块化原理?
```
//1.定义一个模块缓存的容器
var installedModules = {};

//2.webpack的require实现
function __webpack_require__(moduleId) {//传参是模块ID

 //3.判断模块是否缓存，若是缓存了就不用加载，直接返还这个已缓存的模块
 if(installedModules[moduleId]) {
     return installedModules[moduleId].exports;}

 // 4.若是没有被缓存，则缓存这个模块
 var module = installedModules[moduleId] = {
     i: moduleId, //模块ID
     l: false,    //标识模块是否加载
     exports: {}
 };

 //5.执行模块函数，modules代表一系列的模块函数，要动态绑定module.exports，绑定this；可以交叉连续引用。
 modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 // 6.标记模块已经被加载
 module.l = true;

 // 7.返回该模块的exports
 return module.exports;
}

 //8.require第一个 模块
 return __webpack_require__(0);
}
```