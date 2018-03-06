<template>
	<div>
		<ul>
			<li><strong>Echarts的基本了解</strong></li>
			<li>
				Echarts底层依赖轻量级的Canvas类库ZRender,zRender这个库使用的是mvc结构,分别对应三个js
			</li>
		</ul>
		<ul>
			<li><strong>esLint规范</strong></li>
			<li>https://calpa.me/2017/11/08/you-dont-know-javascript-eslint-config/</li>
			<li>https://github.com/AlloyTeam/eslint-config-alloy#react</li>
			<li>
				esLint规范分为下面这几种：<br/>
				1、<b>Airbnb</b>,它差不多包含所有javaScript的角度.如果众多的项目是基于<b>React</b>,那么可以选择安装<b>eslint-config-airbnb</b>(包含ECMAScript 6 + React代码检查规范),或者选择最基本的<b>eslint-config-airbnb-base</b>(这个是通用的包含ECMAScript代码检查规范)
				2、<b>standard</b>,选择安装<b>eslint-config-standard</b>
			</li>
		</ul>
	</div>
</template>
<script>

	//import Mock from './mockjs';
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
strong {
    color: firebrick;
}
</style>
