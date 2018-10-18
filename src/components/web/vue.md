* 什么是MVVM？
```
MVVM：由Model,View,ViewModel构成,M代表数据模型,V代表Ul组件,ViewModel是一个同步View和Model的对象
```
* 什么是MVC?
```
MVC：由View视图、Model模型、Controller控制器组成
MVC可分为两种一个是通过View接受指令传递给Controller再改变Model,
另一个是Controller接受指令传递给Model,再去改变View
```
* Vue生命周期
```
1、beforeCreate :创建前状态 el 和 data 并未初始化
2、created ：创建完毕状态 完成了 data 数据的初始化，el没有
3、beforeMount : 挂载前状态 完成了 el 和 data 初始化
4、mounted : 挂载结束状态 完成挂载
5、beforeUpdate : 更新前状态
6、updated : 更新完成状态
7、activated : keep-alive组件激活时调用
8、deactivated : keep-alive组件停用时调用
9、beforeDestroy : 销毁前状态
10、destroyed : 销毁完成状态

7-8和9-10是同一级别的
不使用keep-alive ：beforeRouteEnter --> created --> mounted --> destroyed
  使用keep-alive ：beforeRouteEnter --> created --> mounted --> activated --> deactivated
```
* 计算属性和侦听属性比较
```
计算属性computed和侦听属性Watch优先选择计算属性,因为计算属性是基于依赖进行缓存的
```
* Vue怎样会无法监听依赖数据？
```
1、当你利用索引直接设置一个项时,vm.items[2] = newValue;
2、当你修改数组的长度时,vm.items.length = newLength
解决方法： Vue.set和splice
```
* Vue 路由中 $route 和 $router 的区别
```
1、$route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。
2、$router是“路由实例”对象包括了路由的跳转方法，钩子函数等。
```
* 子父组件是怎么传递的?
```
父组件传递给子组件子组件通过props来接受父组件传递内容
子组件传递给父组件是通过自定义事件,子组件通过$emit触发事件,父组件通过$on来监听事件
```
* Vue的MVVM原理?
```
大致原理：
有三个函数对象一个是Observer管理数据模型的变更
              一个是Compile管理视图变更
              一个是Watcher上以上两个的互通桥梁

Observer是监听数据对象的获取和设置工作,一旦有数据的获取或变更,会把这次行为当做是一个订阅者
存放到一个Dep对象里,订阅者其实就是Watcher,
触发Watcher的方式是通过对数据对象绑定Object.defineProperty,在getter方法下定义一个属性，
在Watcher每次实例化的时候就会把数据对象下getter下的属性指向自己,
Watcher获取到值后他会通知Complie这个对象对视图进行更新,
Compile对象是利用文档碎片,对模板里面的表达式进行正则匹配和指令进行解析从而更新视图
```
* 对vue的认知
```
1、vue通过把真实的DOM树抽象成一棵javaScript抽象树,通过修改抽象树数据后,
  将抽象树转化成真实DOM重绘到页面上,它通过VNode节点模拟真实DOM,
  VNode性能的展现是通过diff算法进行计算,它通过对比同层节点，而非对树进行遍历搜索
2、在列表渲染过程中,当列表数据发生变化时,为了避免大规模渲染,Vue会尽可能复用缓存frag,当数据对象为Array时,缓存id为数组的value,当数据对象为Object时,
缓存id对象的$key,但是比如在数组中有重复相同的值,会出现缓存id冲突警告,会导致插入失败,这就是我们为什么会在v-for循环上加上key,它将使用数据的索引作为缓存id,
(总结：为了避免大规模数据变化造成列表渲染,vue会可能复用相同的数据,会把数据值作用缓存id,但是有时会出现重复的值,造成id冲突,所以用在v-for循环上会把key当成缓存id)
```
* Vuex源码
```
vuex源码有将进一千行代码,里面分为几块，一块是定义了一些工具方法,一个Model类，一个Store类,
页面进来先看是否安装了vuex,然后分版本去初始化vuex,挂载Store到根组件,方便统一访问,
像commit、watch、dipsatch都是定义在Store原型方法上的
Store类里定义一些属性，及调用Model类，Model类都是一些遍历action,getter之类的方法,
```
* 自定义组件怎样完善?
```
1、可以通用
2、代码尽量简洁
3、容易修改
4、功能丰富
```
* 对vue的理解？
```
1、vue不必担心对dom操作,因为他靠数据驱动双向绑定
2、组件化开发,让项目可拓展、可复用、重用性高
3、单页应用体验好
4、学习成本低小而轻量
```
* vue-router有哪几种导航钩子?
```
第1种：全局导航钩子点击导航前router.beforeEach(),点击导航后router.afterEach()
第2种：组件内的钩子beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
第3种：单独路由独享组件beforeEnter
```
* v-if和v-show的区别
```
共同点：都是动态显示DOM元素
区别：
1、v-if是动态向DOM添加或删除DOM元素,v-show是通过设置DOM的display样式控制显示隐藏
2、编译过程：v-if切换有一个局部编译/卸载过程，切换过程中合适销毁和重建内部事件监听子组件,
v-show只是简单的基于css切换
3、编译条件：v-if是惰性的,如果初始条件为假,则什么也不做,v-show是在任何条件 下都会被编译
4、性能消耗：v-if有更高的切换消耗,v-show有更高的初始渲染消耗
5、使用场景：v-if适合运营条件不太可能改变,v-show适合频繁切换
```
* vue开发过程中遇到的问题
```
1、初始定义了一个data数组对象为空，然后把请求的对象赋给data，在渲染的时候如果是对象下的对象会出现undefined
比如:data.children.name,他会报name为undefined，则时需要在判断v-if="data.children"是否存在
2、有时添加router-link链接时少写一个"/"和多写一个"/"是有差别的，比如链接地址是www.dd.com/aa/12,你要跳到
www.dd.com/bb/12,如果是to="bb/12"它是会变成拼接最后成为"www.dd.com/aa/12/bb/12",所以要加上"/"号"/bb/12"
3、有时父组件传给子组件的值是异步的，你在created或moutheds打印获取的值是空的，这时要在子组件上去判断传给子
组件的对象是否不为空<child v-if="dataList"/>,或者可以在子组件里watch下dataList
4、组件的嵌套过深，子组件要传递给最上面的父组件值时会传递不到
5、我们在使用v-for进行渲染时，尽可能使用渲染元素自身属性的id给渲染的元素绑定一个key值，
  这样在当前渲染元素的DOM结构发生变化时，能够单独响应该元素而不触发所有元素的渲染
6、v-if尽量不要与v-for在同一节点使用:v-for 的优先级比 v-if 更高,如果它们处于同一节点的话，那么每一个循环都会运行一遍v-if。
```
* 什么时候需要用的Vue.nextTick()
```
1、你在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中。
  原因是什么呢，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，
  而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。
  与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，
  此时在该钩子函数中进行任何DOM操作都不会有问题 。
2、在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
  这个操作都应该放进Vue.nextTick()的回调函数中。
  Vue是异步执行dom更新，一旦观察到数据变化，Vue就会开启一个队列，然后把数据变化的watcher推送进事件循环队列中，
  如果这个watcher被触发多次，也只会被推送到队列一次。这种行为可以有效的去掉重复数据和不必要的计算和DOM操作.
  而在下一个事件循环时,Vue会清空队列,并进行必要的DOM更新。
  当你设置vm.someData = 'yan',DOM并不会马上更新，而是在异步队列被清除后也就下一个事件循环开始时执行更新才会
  进行必要的DOM更新。
```
* 如果给组件使用v-model获取值?
```
在当前组件里的prop里加上{value:String},
在触发事件里调用 this.$emit('input', '要传的值');
```
* 当前组件里怎样获取父级里的所有值？
```
直接调用console.log(this.$emit('update:value'));
```
* 父组件获取子组件里的所有值?
```
直接用ref绑在子组件上
```