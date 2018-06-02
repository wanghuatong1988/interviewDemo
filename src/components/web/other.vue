<template>
	<div>
		<ul>
			<li><strong>Echarts的基本了解</strong></li>
			<li>
				Echarts底层依赖轻量级的Canvas类库ZRender,zRender这个库使用的是mvc结构,分别对应三个js
			</li>
			<li>基本配置参数：</li>
			<textarea style="height:250px;">
				theme = {
					//全图默认背景
					backgroundColor: 'red',
					//默认色板
					color: ['red','green','blue'],
					//图表标题
					title:{

					}
					//提示框
					tooltip:{

					}
					//网格配置
					grid: {
						xAxis: {},//x轴
						yAxis: {},//y轴
					}

				}
			</textarea>
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
