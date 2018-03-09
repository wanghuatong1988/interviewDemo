<template>
	<div>
		<ul>
			<li><strong>基本类型和引用类型都有哪些?</strong></li>
			<li>基本类型：Undefined、Null(特殊的对象值)、Boolean、String、Number、Symbol</li>
			<li>引用类型：Object、Array、Date、Function</li>
			<li>基本类型存放在栈上,引用类型存放在堆上</li>
		</ul>

		<ul>
			<li><strong>查找元素有几种?</strong></li>
			<li>
				document.querySelector("#demo"); <br/>
				document.getElementById('demo'); //查找id为demo<br/>
				document.querySelectorAll(".demo"); //查找所有带demo的class<br/>
				document.getElementsByName('input');//查找元素为name="input"的属性<br/>
				document.getElementsByTagName('h1'); //返回所有带h1元素的名<br/>
				document.getElementsByClassName('tag');// 获取页面用所有带tag的类名集合
			</li>
		</ul>

		<ul>
			<li><strong>如何将字符串转化为数字,例如'12.3b'</strong></li>
			<li>parseFloat('12.3b')</li>
		</ul>
		
		<ul>
			<li><strong>script标签的defer、async的区别</strong></li>
			<li>
				(他两都是异步加载)<br/>
				1、defer是在DOMContentLoaded事件(仅当DOM加载成不包括样式表、图片)解析完之后才会执行,如果是多个,按照加载的顺序依次执行<br/>
				2、async是在加载完成后立即执行,如果是多个,执行顺序和加载顺序无关
			</li>
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
			<li>
				<textarea style="height:170px;">
					function Person(){}
					var person = new Person(); 
					// 上一行代码等同于以下过程 ==> 
					var person = {};
					person.__proto__ = Person.prototype;
					Person.call(person);
					我先创建了一个空对象 person，然后把 person.__proto__ 指向了 Person 的原型对象，
					便继承了 Person 原型对象中的所有属性和方法，
					最后又以 person 为作用域执行了 Person 函数，person 便就拥有了 Person 的所有属性和方法
				</textarea>
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
			<li><strong>事件委托</strong></li>
			<li>
				<textarea style="height:130px;">
					oUl.onclick = function(ev) {
				  		var ev = ev || window.event;
				  		var target = ev.target || ev.srcElement;
				  		if(target.nodeName.toLowerCase() == 'li') {
				  			//.....
				  		}
				  	}
				</textarea>
			</li>
			<li><strong>自定义事件触发</strong></li>
			<li>
				<textarea style="height:280px;">
					function customClickEvent() {
				  		var clickEvt;
				  		if(window.CustomEvent) {
				  			clickEvt = new window.CustomEvent('click',{
				  				canBubble: true,
				  				cancelabe: true,
				  			})
				  		}else{
				  			clickEvt = document.createEvent('Event');
				  			clickEvt.initEvent('click', true, true);
				  		}
				  		return clickEvt;
				  	}

				  	document.querySelector('#cc').dispatchEvent(customClickEvent());
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>localStorage的缺点</strong></li>
			<li>
				1、浏览器的存储大小不一<br/>
				2、localStorage的值只可限定为string类型<br/>
				3、localStorage在浏览器隐私模式下是不可读取<br/>
				4、如果存储内容过多会导致页面变卡<br/>
				5、爬虫抓取不到
			</li>
		</ul>

		<ul>
			<li><strong>有几种跨域？</strong></li>
			<li>
				1、jsonp：原理利用script标签不会跨域的限制<br/>
				jsonp优点：可以解决跨域、兼容性好<br/>
				jsonp缺点：只支持get请求、不会返回http状态码、存在安全性问题
			</li>
			<li>2、CORS: 原理告诉浏览器这个请求是安全的</li>
			<li>3、postMessage</li>
			<li>4、nginx代理转发</li>
		</ul>

		<ul>
			<li><strong>怎样会引起内存泄漏?</strong></li>
			<li>1、全局变量引起内存泄漏</li>
			<li>2、闭包引起的内存泄漏</li>
			<li>3、清除dom但没有清除dom上的事件</li>
			<li>4、定时器忘记清理</li>
			<li>5、移除父级的时候没有把他下面的子级同时清理,只移除父级子级还在会存在</li>
		</ul>
		
		<ul>
			<li><strong>如何判断一个对象是否属于某个类？</strong></li>
			<li>
				<textarea style="height:230px;">
					var a=new Array();
					alert(a instanceof Array); // true，
					同时 alert(a instanceof Object) //也会返回 true;
					这是因为 Array 是 object 的子类。

					另外，更重的一点是 instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型,例如：

					function Foo(){} 
					Foo.prototype = new Aoo();//JavaScript 原型继承 
					var foo = new Foo(); 
					console.log(foo instanceof Foo)//true 
					console.log(foo instanceof Aoo)//true
				</textarea>
			</li>
			<li>in判断的是对象的所有属性，包括对象实例及其原型的属性</li>
			<li>hasOwnProperty不会去查找原型的属性方法</li>
		</ul>

		<ul>
			<li><strong>为啥要深拷贝?</strong></li>
			<li>
				在很多情况下,我们都需要给变量赋值,给内存地址赋予一个值,但是在赋值引用类型的时候<br/>
				只是共享一个内存区域,导致赋值的时候,还跟之前的值保持一样
			</li>
			<li>
				<textarea style="height:300px;">
					function deepClone(source) {
				  		if(!source || typeof source !== 'object') {
				  			throw new Erro('error arguments', 'shallowClone');
				  		}
				  		var targetObj = {};
				  		for(var keys in source) {
				  			if(source.hasOwnProperty(keys)) {
				  				if(source[keys] && typeof source[keys] === 'object') {
				  					targetObj[keys] = deepClone(source[keys]);
				  				}else{
				  					targetObj[keys] = source[keys];
				  				}
				  			}
				  		}
				  		return targetObj;
				  	}

				  	var o1 = {
				  		arr: 1,
				  		obj: {
				  			key: 'value'
				  		},
				  		func: function() {
				  			return 1;
				  		}
				  	};

				  	var o3 = deepClone(o1);
				  	o1.obj.key = 'hello';
				  	console.log(o3);
				</textarea>
			</li>
		</ul>

		<ul>
			<li><strong>为什么要对函数进行柯里化?</strong></li>
			<li>
				1、算是一种小技巧<br/>
				2、延迟计算<br/>
				3、固定易变因素
			</li>
			<li>
				<textarea>
					function curryingHelper(fn) {
				  		var _args = Array.prototype.slice.call(arguments, 1);

				  		return function() {
				  			var _newArgs = Array.prototype.slice.call(arguments);
				  			var _totalArgs = _args.concat(_newArgs);
				  			return fn.apply(this, _totalArgs);
				  		}
				  	}

				  	function showMsg(name, age, fruit) {
				  		console.log('我的名字是：' , name , '我', age, '岁,我喜欢吃：',fruit);
				  	}

				  	var curryingShowMsg1 = curryingHelper(showMsg, 'dreamapple');
				  	curryingShowMsg1(22, 'apple');

				  	var curryingShowMsg2 = curryingHelper(showMsg, 'dreamapple', 20);
				  	curryingShowMsg2('watermelon');
				</textarea>
			</li>
		</ul>
		
		<ul>
			<li><strong>判断对象类型</strong></li>
			<li>
				Object.prototype.toString.call(对象名);
			</li>
		</ul>

		<ul>
			<li><strong>执行上下文堆栈</strong></li>
			<li>ECMAScript代码分为三种：全局代码、函数代码、eval代码,每个代码是在其执行上下文中被求值的</li>
			<li>对函数的每次调用,会进入到函数执行上下文中,并对函数代码类型进行求值</li>
			<li>对eval函数进行调用,会进入eval执行上下文并对其代码进行求值</li>
			<li>一个函数可能会创建无数个上下文,因为对函数的每次调用都会生成一个新状态的上下文</li>
			<li>一个执行上下文可能会触发另一个上下文,比如一个函数调用另一个函数</li>
			<li>一个触发其他上下文的上下文叫作caller,被触发的上下文叫作callee</li>
			<li>当一个caller触发了一个callee,这个caller会暂缓自身的执行,然后把控制权传递给callee,这个callee被push到栈中</li>
			<li>在callee上下文结束后,它会把控制权返回给caller,然后caller上下文继续执行</li>
			<li>换句话说,所有ECMAScript程序的运行时,可以执行上下文栈来表示,栈顶是当前活跃的上下文</li>
			<li></li>
			<li></li>
		</ul>
		
		<ul>
			<li><strong>单线程</strong></li>
			<li>
				是指在JS引擎中负责解释和执行javascript代码的线程,可以叫做主线程<br/>
				但是实际上还存在其他线程,例如：处理ajax请求的线程、处理DOM事件的线程、定时 器线程、等<br/>
				这些线程可能存在js引擎之内,也可能存在js引擎之外,暂时叫做工作线程<br/>
				主线程负责派任务,工作线程负责执行任务并返回结果
			</li>
			<li><strong>消息队列和事件循环(Event Loop)</strong></li>
			<li>
				在异步过程中,工作线程在异步操作完成后需要通知主线程,那么个通知机制就是靠消息队列和事件循环<br/>
				工作线程将消息(回调函数)放到消息队列,主线程通过事件循环获取消息<br/>
				<strong>消息队列中放的消息具体是什么东西？</strong><br/>
				消息就是注册异步任务时添加的<b>回调函数</b>比如：<br/>
				<textarea>
					主线程发起ajax请求 $.ajax(),工作线程合到响应后,会把他封装成一个javascript对象:
					var message = function() {
						callbackFn(response);
					}
					这个callbackFn就是回调函数
				</textarea>
			</li>
			<li><strong>异步与事件</strong></li>
			<li>
				事件循环为什么里面会有个事件呢？那是因为<b>消息队列中的每条消息实际上都对应着一个事件</b><br/>
				举例来说:<br/>
				<textarea>
					var btn = document.getElementById('#btn');
					btn.addEventListener('click',function(e){
						alert(1);
					})
				</textarea><br/>
				当按钮被触发,事件监听器函数被调用
			</li>
		</ul>

		<ul>
			<li><strong>什么是原型、原型链</strong></li>
			<li>
				所有对象(Object)或数组(Array)都是function(函数)<br/>
				原型其实就是一个对象,其它对象可以通过它来继承<br/>
				使用原型的好处是让所有对象实共享它所包含的属性和方法，节约内存<br/>
				<textarea style="height:400px;">
					//普通构造函数
				  	function obj(name){
				  		this.name = name;
				  		this.sayName = function() {
				  			console.log(this.name)
				  		}
				  	}

				  	var a = new obj('wanghuatong');
				  	var b = new obj('wanghuatong');

				  	console.log(a.sayName === b.sayName);// false

				  	//原型
				  	function obj22(name){
				  		this.name = name;
				  	}
				  	obj22.prototype.sayName = function() {
				  		console.log(this.name);
				  	}

				  	var a22 = new obj22('wanghuatong');
				  	var b22 = new obj22('wanghuatong');
				  	console.log(a22.sayName === b22.sayName);// true

				  	function Fn(){}
				  	Fn.prototype.name = 'wanghuatong';
				  	var fn = new Fn();
				  	console.log(fn.name);
				  	//上面fn对象是从Fn函数new出来的,这样fn对象就可以调用Fn.prototype中的属性,
				  	//因为每个对象都有一个隐藏属性"__proto__",这个属性引用了创建这个对象的函数prototype,
				  	//即：fn.__proto__ = Fn.prototype;
				  	//Function也是一个函数，函数是一种对象，也有__proto__属性。既然是函数，那么它一定是被Function创建
				  	//console.log(Fn.__proto__ === Function.prototype); //true
				</textarea><br/>
				<img src="./../assets/a.png" /><br/>
				先说下prototype和__proto__的区别:<br/>
				prototype是<strong>函数</strong>才有的属性,但是__proto__是每个对象都有的属性包括函数。<br/>
				<textarea style="height:120px;">
					var a = {};
					console.log(a.prototype); //undefined;
					console.log(a.__proto__); //object{};

					var b = function(){};
					console.log(b.prototype);// b{}
					console.log(b.__proto__);// function(){}
				</textarea><br/>
				所有函数或对象都有constructor属性,指向这个函数本身<br/>
				__proto__属性指向谁？<br/>
				它指向创建它的构造函数的prototype(原型)属性<br/>
				xx.__proto__指向它的构造函数原型xx.constructor.prototype<br/>
				<textarea style="height:250px;">
					//1、字面量方式
					var a = {};
					console.log(a.constructor); //function Object()
					console.log(a.__proto__ === a.constructor.prototype); //true
					//2、构造器方式
					var A = function(){};
					var a = new A();
					console.log(a.constructor); // function(){}
					console.log(a.__proto__ === a.constructor.prototype); //true
				</textarea>
			</li>
			<li>
				<strong>什么是原型链？</strong>
			</li>
			<li>
				<strong>instanceof</strong><br/>
				<textarea>
					function Foo(){};
					var f1 = new Foo();
					console.log(f1 instanceof Foo); //true;
					console.log(f1 instanceof Object); // true;

					//还有下面这三个看上面的图就知道为什么为true
					console.log(Object instanceof Function);// true;
					console.log(Function instanceof Object);//true;
					console.log(Function instanceof Function);// true
				</textarea><br/>
			</li>
			<li>
				访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。<br/>
				<textarea>
					function Foo(){};
					var f1 = new Foo();
					f1.a = 10;

					Foo.prototype.a = 100;
					Foo.prototype.b = 200;

					console.log(f1.a); //10;
					console.log(f1.b); // 200
					//hasOwnProperty用来判断不存在原型的属性					
				</textarea>
			</li>
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
			<li><strong>斐波那契数列</strong></li>
			<li>
				<textarea>
					//斐波那契数列：1、1、2、3、5、8、13、21、34
				  	function fn(n) {
				  		if(n <= 0) {
				  			return 0;
				  		}else if (n == 1) {
				  			return 1;
				  		}else{
				  			return fn(n-1) + fn(n-2);
				  		}
				  	}
				  	console.log(fn(4));
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
  	console.log(commafy('12000000.11'));


  	var ObjCreate = {name:'one'};
	var ObjCreate2 = Object.create(ObjCreate);
	ObjCreate2.name = 'two';
	console.log(ObjCreate.name); //one

  	var ObjCreate3 = {prop:{name: 'one',}}
  	var ObjCreate4 = Object.create(ObjCreate3);
  	ObjCreate4.prop.name = 'two';
  	console.log(ObjCreate3.prop.name);// two

  	//一在赋值前可以输出下obj2.name的值，其实是one，赋值的时候obj2.name，
  	//会当成属性去找，但是这时候是把自身的name属性赋值成了two，
  	//并不会动obj1中的属性，也就是说对象的属性是无法修改其原型链中的同名属性，
  	//而只会自身创建一个同名的属性并为其赋值。


  	var obj = new Object();
  	var events = {
  		m1: 'clicked',
  		m2: 'changed'
  	}

  	for(var e in events) {
  		(function(){
  			var aValue = e;
  			obj[e] = function() {
  				console.log(events[aValue]);
  			}
  		}());
  	};

  	console.log(obj.m1 === obj.m2);

  	obj.m1();
  	obj.m2();

  	function aFunc() {
  		function MyFunc(){}
  		return MyFunc;
  	}
  	var f1 = aFunc();
  	var f2 = aFunc();
  	console.log(f1 === f2);
  	//每次执行aFunc的时候,都会创建一个aFunc的新执行环境
  	//每次执行aFunc都会创建一个新的myFunc
  	//因此f1与f2是两个不同的内存地址的函数

  	var aFunc_3 = function() {
  		var MyFunc = function(){}
  		return function(){
  			return MyFunc;
  		}
  	}();

  	var f3 = aFunc_3();
  	var f4 = aFunc_3();
  	console.log(f3 === f4);

  	//aFunc3右侧是一个立即执行函数,aFunc的值即是立即执行函数的返回值.
  	//aFunc_3指向一个立即执行函数执行后返回的函数，这个函数处在一个闭包环境中，每次执行总是返回闭包中的MyFunc函数，所以f3和f4是相同的

  	function a(){
        var i=0;
        function b(){
            console.log(++i);
        }
        return b;
    }

    var c=a(); //函数a执行后返回函数b，并将函数b赋给c
    c();//输出 1


    console.log('对象深拷贝')
    function deepClone(source) {
  		if(!source || typeof source !== 'object') {
  			throw new Erro('error arguments', 'shallowClone');
  		}
  		var targetObj = {};
  		for(var keys in source) {
  			if(source.hasOwnProperty(keys)) {
  				if(source[keys] && typeof source[keys] === 'object') {
  					targetObj[keys] = deepClone(source[keys]);
  				}else{
  					targetObj[keys] = source[keys];
  				}
  			}
  		}
  		return targetObj;
  	}

  	var o1 = {
  		arr: 1,
  		obj: {
  			key: 'value'
  		},
  		func: function() {
  			return 1;
  		}
  	};

  	var o3 = deepClone(o1);
  	o1.obj.key = 'hello';
  	console.log(o3);


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
