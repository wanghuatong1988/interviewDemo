<template>
	<div>
		<ul>
			<li><strong>var、let、const区别？</strong></li>
			<li>
				1、let声明的变量拥有块级作用域、不存在变量提升<br/>
				2、let声明的全局变量不可以通过window.去访问<br/>
				3、const定义的是常量值,不可以重新赋值,不过对象就可以
			</li>
		</ul>

		<ul>
			<li><strong>箭头函数的好处、及注意的地方</strong></li>
			<li>
				<b>好处：</b><br/>
				1、省略了funciton、return返回值<br/>
				2、函数体内的this始终指向定义它所在的对象,不会指向调用它的对象<br/>
				<b>注意的地方：</b><br/>
				1、当不确定this所指向谁的时候不要用<br/>
				2、不可以当作构造函数去使用,也就是说不能new<br/>
				3、不能秀arguments对象<br/>
				4、不能用作Generator函数使用
			</li>
		</ul>

		<ul>
			<li><strong>Promise实现原理？</strong></li>
			<li>
				Promise实现是按照Promise/A+规范
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
strong {
    color: firebrick;
}
</style>
