<template>
	<div>
		<ul>
			<li><strong>基本类型和引用类型都有哪些?</strong></li>
			<li>基本类型：Undefined、Null、Boolean、String、Number、Symbol</li>
			<li>引用类型：Object、Array、Date、Function</li>
			<li>基本类型存放在栈上,引用类型存放在堆上</li>
		</ul>

		<ul>
			<li><strong>如何将字符串转化为数字,例如'12.3b'</strong></li>
			<li>parseFloat('12.3b')</li>
		</ul>
		
		<ul>
			<li><strong>null、undefined的区别？</strong></li>
			<li>
				null：表示一个对象是没有值，值为空<br/>
				undefined: 表示一个变量声明了没有初始化赋值
			</li>
		</ul>

		<ul>
			<li><strong>Javascrip作用链域？</strong></li>
			<li>
				当需要从局部函数里查找某个属性或方法时,如果当前作用域没有<br/>
				它就会向上层作用域查找,直至到全局函数
			</li>
		</ul>

		<ul>
			<li><strong>谈谈对this的理解</strong></li>
			<li>1、this在函数定义的时候在不确定的,只有在运行时才能确定</li>
			<li>2、如果有new的话,this指向new出来的那个对象</li>
			<li>3、在严格模式this指向不是window,而是undefined</li>
		</ul>

		<ul>
			<li><strong>当new Foo()时发生了什么</strong></li>
			<li>
				1、创建了一个新对象<br/>
				2、将this指向这个新对象<br/>
				3、执行构造函数中的代码<br/>
				4、返回新对象
			</li>
		</ul>

		<ul>
			<li><strong>DOM事件模型是什么？</strong></li>
			<li>冒泡和捕获</li>
			<li><strong>DOM事件流是什么？</strong></li>
			<li>捕获阶段->目标阶段->冒泡阶段</li>
			<li><strong>描述DOM事件捕获的具体流程</strong></li>
			<li>window -> document -> html-> body -> ... -> 目标对象</li>
			<li><strong>描述DOM事件冒泡的具体流程</strong></li>
			<li>目标对象 -> ... -> body -> html -> document -> window</li>
			<li>addEventListener监听事件最后一个参数true为捕获false为冒泡</li>
			<li></li>
			<li></li>
		</ul>

		<ul>
			<li><strong>数组反序</strong></li>
			<li>
				<textarea>
					var a = [1,2,3,4];
					var arr = [];
					for(var i = a.length - 1; i>=0; i--) {
						arr.push(a[i])
					}
					console.log(arr)//[4,3,2,1]
					
					//第二种方法
					a.reverse();
					console.log(a) // [4,3,2,1]
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>数组随机排序</strong></li>
			<li>
				<textarea>
					[1,2,3,4].sort(function(){
						return Math.random() - 0.5
					})
				</textarea>
			</li>
		</ul>
		<ul>
			<li><strong>数组slice、splice方法</strong></li>
			<li>
				<textarea>
					var colors = ['red', 'yellow', 'orange', 'blue'];
					// 获取yellow、orange 从第一位开始，到第三位结束(不包括第三位)
					var removed = colors.slice(1,3);
					// 删除 ['red', 'blue']正好和上面相反，从第一位开始删除到第二位(包括第二位)
					var removed2 = colors.splice(1,2);
					//从第一个数组里插入'ddd'['red', 'ddd', 'yellow', 'orange', 'blue'];
					const removed2 = colors.splice(1,0, 'ddd');
				</textarea>
			</li>
			<li></li>
		</ul>

		<ul>
			<li><strong>js循环</strong></li>
			<li>
				<textarea style="height:300px;">
					var numbers = [1,2,3,4,5,4,3,2,1];
					//every只要其中一个不满足就返回false
					var everyResult = numbers.every(function(item){
						return item > 2
					})

					//some只要其中一个满足
					var someResult = numbers.som(function(item){
						return item > 2
					})

					//filter过滤所有大于2的数
					var filterResult = numbers.filter(function(item){
						return item > 2
					})

					//map循环有返回值
					var mapResult = numbers.map(function(item){
						return item * 2;
					})

					//forEach循环没有返回值,下面这里forEachReault为undefined
					var forEachResult = numbers.forEach(function(item){
						return item * 2;
					})
					
					//reduce 对数组进行计算
					var reduceResult = number.reduce(function(prev,cur,index,array){
						return prev + cur; //
					},2)

				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>常规正则</strong></li>
			<li>
				<textarea style="height:300px;">
					//去掉左右两边的空格
					var add = ' sdsfsds '
					String.prototype.trim = function() {
						return this.replace(/(^\s*)|(\s*$)/g,'');
					}

					//匹配电话号码邮箱
					
					var reg = {
						regEmail: /^(\w*)@[a-z]*\.(\w+)$/, 邮箱
						regMobile: /^1[3|4|5|8][0-9]\d{8}$/,手机
						regTel: /^0[\d]{3}-[\d]{7,8}$/,电话号码
					}
					
					//获取路径的字段
					var url = 'http://www.wanghuatong.com/ss=11&ss=22';
					var reg = /(^|\\?|&)ss=(\w*)/g;
					url.replace(reg, function($0,$1,$2){
						//$0 全部()内容 
						//$1 第一个()
						//$2 第二个()
						console.log($2);
					})

					//如何将12000000.11转化为12,000,000.11

					function commafy(num){
				      return num && num
				          .toString()
				          .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
				              	return $2 + ',';
				          });
				  	}
				  	console.log(commafy('12000000.11'))
				</textarea>			
			</li>
		</ul>

		<ul>
			<li><strong>bind的运用</strong></li>
			<li>
				<textarea>
					var obj = {
						user: 'wanghuatong',
						fn() {
							console.log(this.user);
						}
					}

					var b = obj.fn;
					var c = b.bind(obj);
					c(); //wanghuatong
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>数组去重</strong></li>
			<li>
				<textarea style="height:300px;">
					//第一种
					var arr = [1,2,5,4,3,3,4,2];

					Array.prototype.unqiure = function() {
						var newArr = [];
						var json = {};
						for(var i = 0; i < this.length; i++) {
							if(!json[this[i]]) {
								json[this[i]] = true;
								newArr.push(this[i])
							}
						}
						return newArr;
					}

					console.log(arr.unqiure());
					
					//第二种
					console.log([...new Set(arr)])
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>对象继承</strong></li>
			<li>
				<textarea style="height:200px;">
					function Person() {}
					Person.prototype.name = 'wanghuatong';
					Person.prototype.sayName = function() {
						console.log(this.name);
					}

					function Child() {
						Person.call(this);
					}
					Child.prototype = new Person();

					var c = new Child();
					c.sayName();
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>数组合并且去重</strong></li>
			<li>
				<textarea>
					var a = new Set([1,2,4]);
					var b = new Set([2,3,4]);
					var c = [...new Set([...a,...b])];
					console.log(c); // [1,2,4,3]
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>冒泡排序</strong></li>
			<li>
				<textarea style="height:250px;">
					function aaa(arr) {
						for(var i = 0; i < arr.length; i++) {
							for(var j = 0; j < arr.length; j++) {
								toCaon(j, j+1);
							}
						}

						function toCaon(prev, next) {
							var temp = '';
							if(arr[prev] > arr[next]) {
								temp = arr[prev];
								arr[prev] = arr[next];
								arr[next] = temp;
							} 
						}
						return arr;
					}

					console.log(aaa([4,3,1,7,2]));
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>选择排序</strong></li>
			<li>
				<textarea style="height:250px;">
					function aaa(arr) {
						if(arr.length === 1) {
							return arr;
						}

						var iMax = arr[0];
						var index = 0;
						for(var i = 0; i< arr.length; i++) {
							if(arr[i] < iMax) {
								iMax = arr[i];
								index = i;
							}
						}

						var prev = arr.splice(index,1);
						return prev.concat(aaa(arr));
					}

					console.log(aaa([4,3,1,7,2]));
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>二分查找</strong></li>
			<li>
				<textarea style="height:250px">
					function binSearch (arr, data) {
		                var low = 0;
		                var high = arr.length - 1;
		                while(low <= high) {//左边一定要小于等于右边
		                    var middle = Math.floor((low + high) / 2);//计算出一个中间值
		                    if(arr[middle] < data) {//用中间值去比较传进来的值如果小于他左边就要变为中间值+1
		                        low = middle + 1;
		                    }else if (arr[middle] > data) {//如果中间值大于传进来的值右边就要变为中间值-1
		                        high = middle - 1;
		                    }else {//如果不是大于小于那就是等于就直接返回
		                        return middle
		                    }
		                }
		                return -1;//如果都没有就返回-1
		            }
		            var arr = ["a","b","c","d","e","f","g","h","i","j"];
		            console.log(binSearch(arr, 'g'));
				</textarea>
			</li>
		</ul>
	</div>

</template>
<script>
	console.log(parseFloat('12.3b')) //12.3
	console.log(0.1 + 0.2) // 0.30000000000000004; 

	function commafy(num){
      return num && num
          .toString()
          .replace(/(\d)(?=(\d{3})+\.)/g, function($1, $2){
              	return $2 + ',';
          });
  	}
  	console.log(commafy('12000000.11'))

</script>
<style lang="scss" scoped="" type="text/css">
ul,li {
  margin: 0;
  padding: 10px;
  list-style-type: none;
}
ul {
  border:1px solid #000;
  margin: 10px 0;
}
strong {
    color: firebrick;
}
textarea {
	width: 80%;
	height: 100px;
}
.contenteditable {
	width:80%;border:1px solid #000;
	margin:0 auto;
}
</style>
