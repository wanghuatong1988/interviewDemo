<template>
	<div>

		<ul>
			<li><strong>怎样使用webpack?</strong></li>
			<li>
				npm install webpack、webpack-dev-server(创建本地服务器)、webpack-dev-middleware(文件进行监控，编译)、webpack-hot-middleware(热加载)
			</li>
		</ul>

		<ul>
			<li><strong>webpack是一种模块化解决方案,一种模块化的打包机</strong></li>
			<li><strong>gulp和webpack的区别?</strong></li>
			<li><b>gulp</b>是强调前端开发的工作流程,他是通过配置一系列的task(如压缩合并、雪碧图),然后定义执行顺序,一个一个跑任务</li>
			<li><b>webpack</b>是一个前端模块化方案,更侧重模板打包</li>
		</ul>
		<ul>
			<li><strong>快速搭建vue-cli</strong></li>
			<li>
				1、cnpm install -g vue-cli<br/>
				2、vue init webpack 项目名
			</li>
		</ul>

		<ul>
			<li><strong>怎么快速创建一个package.json文件?</strong></li>
			<li>npm init --yes</li>
		</ul>

		<ul>
			<li><strong>插件介绍</strong></li>
			<li>
				<b>Babel</b>编译javaScript(ES6、ES7)<br/>
				核心包是：babel-core、babel-loader、babel-prsest-env、babel-prsest-react
			</li>
			<li>
				编译vue是：vue-loader、vue-template-compiler、vue-style-loader
			</li>
			<li>
				编译Sass是: sass-loader、node-sass<br/>
				编译Less是：less-loader、less
			</li>
		</ul>

		<ul>
			<li><strong>webpack模块化原理?</strong></li>
			<li>
				<textarea style="height:350px;">
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
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>常用webpack人Loader和plugin</strong></li>
			<li>
				<textarea style="height:250px;">
					Plugin:
					1、webpack.HotModuleReplacementPlugin()  //热加载插件
					2、webpack.DefinePlugin //配置全局变量
					3、ParallelUglifyPlugin //代码压缩
					4、ExtractTextPlugin //代码提取
					5、webpack.optimize.MinChunkSizePlugin  //合并小文件
					6、webpack.optimize.CommonsChunkPlugin  //提取公用代码插件
					Loader:
					1、(vue、html、css、less、sass、style、babel、url、file)-loader
				</textarea>
			</li>
		</ul>

	</div>
</template>
<script>
</script>
<style lang="scss" scoped="" type="text/css">
ul,li {
  margin: 0;
  padding: 10px;
  list-style-type: none;
}
ul {
  border:1px solid #000;
  margin: 20px 0;
}
ul {
  border:1px solid #000;
  margin: 10px 0;
}
textarea {
  width: 80%;
  height: 100px;
}
.contenteditable {
  width:80%;border:1px solid #000;
  margin:0 auto;
}
ul {
 box-shadow: 2px 2px 5px #333;
}
</style>
