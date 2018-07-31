
npm install

npm run dev

localhost:8088

##工作中的一些记录

> * 下拉搜索选择插件
[下拉搜索组件git演示  /src/components/input-select](http://chuantu.biz/t6/348/1532593131x-1566688688.gif)
这些是他的基本配置

| 参数   |  功能  | 默认值|
| --------  | :----:  |:----:  |
| getSearchName     |   获取搜索文本    |  |
| data     |   数据格式 [{label: '飞机', value: 1}]    |  |
| visibleInput     |   是否隐藏搜索框   | false |
| autoQuery     |   是否输入后就触发    | true |
| width     |   设置输入框宽度值    | 210 |
| delay     |   请求延时间隔(autoQuery为false时)    | 500 |


---------

> * 移动端放大缩小和旋转插件
[目录地址(暂无演示，可下载项目自行到真机演示) /src/components/drag-enlarge-rotate]
这里用的是自定义指令的方法

```
<div class="drag"
      v-dragScaleRotate:getScaleRotate="getVal"
      ref="drag"
      style="background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');background-size: cover;">
    </div>
```
放大缩小其中的注意点是，在双指下放大缩小会出现bug，这里是通过下面的这个判断下解决的
```
//如果是双指同时把手指离开 changedTouches 的长度就等于手指的长度, touches 和 targetTouches 为空
            //如果是双指同时把手指按下，其中有一个离开, changedTouches、touches、targetTouches长度都为1，
            //如果是单指按下, touches、targetTouches长度都为0，changedTouches为1
            let t = Object.keys(e.touches).length,
                tt = Object.keys(e.targetTouches).length,
                ct = Object.keys(e.changedTouches).length;

            if(t >= 2) {
                double.isTouch = true;
                single.isTouch = true;
            } else if(t && tt && ct) {
                double.isTouch = true;
                single.isTouch = false;
            } else if(!t && !tt && ct) {
                double.isTouch = false;
                single.isTouch = true;
            }
```
在项目中使用没出现什么问题，这里要说的是，双指缩放后可能会太小，再次想放大就很困难了，
所以分开来再加了个功能就是在图片比例小于1的时候就会显示放大缩小的图标
```
<!--这里用指令爆露出来的数据进行放大、缩小(防止缩到太小的时候两指无法操作)-->
<div class="control-size-box" v-if="show">
  <div class="big-btn" @click="scaleBtn('enlarge')">放大</div>
  <div class="small-btn" @click="scaleBtn('narrow')">缩小</div>
</div>
```
通过指令返回的数据进行判断
```
scaleBtn(value){
        let dom = this.$refs.drag.style.transform,
          s = +this.regText('scale') || 1,
          r = this.regText('rotate') || '0deg';
        if(!dom) {
          if(value === 'enlarge') {
            this.coefficient +=  this.coefficient * 0.1;
          }else {
            this.coefficient -= 0.1;
          }
        }else {
          if(value === 'enlarge') {
            this.coefficient = s + s * 0.1;
          } else {
            this.coefficient = s;
            this.coefficient -= 0.1;
          }
        }
        this.show = (s <= 0.9) ? true : false;
        this.$refs.drag.style.transform = `scale(${this.coefficient.toFixed(2)}) rotate(${r})`;
      },
      //获取括号里的内容
      regText(name){
        let dom = this.$refs.drag.style.transform,
          val = 0;
        let reg = new RegExp('\\b(' + name + '\\()(.*?)(\\b\\))','g');
          dom.replace(reg, ($1, $2, $3)=>{
            val = $3;
          });
        return val;
      },
      getVal(el, val) {
        //缩放比小于1人时候显示
        this.show = (val.scale <= 0.9) ? true : false;
      }
```

> * 移动端弹窗组件
[组件git演示  /src/components/tabSelect](http://chuantu.biz/t6/348/1532595763x-1376440150.gif)

| 参数   |  功能  | 默认值|
| --------  | :----:  |:----:  |
| location     |   位置(左或者右)    | right |
| direction     |   往哪个位置弹出(左边或者右边)    | left|right |
| data     |   格式 {label: '场景', value: '1'}   |  |
| click     |   点击事件    |  |
| bgColor     |   主色调设置    | rgba(0,0,0,.6) |
| beforeClose     |   关闭Dialog前回调    |  |

```
<tab-select
  v-model="tabValue"
  location="left"
  direction="right"
  :data="tabList">
  <tab-pane label="场景" name="1">场景</tab-pane>
  <tab-pane label="灯饰" name="2">灯饰</tab-pane>
  <tab-pane label="购物" name="3">购物</tab-pane>
  <tab-pane label="历史" name="4">历史</tab-pane>
  <tab-pane label="帮助" name="5">帮助</tab-pane>
</tab-select>

tabList: [
    {label: '场景', value: '1'},
    {label: '灯饰', value: '2'},
    {label: '购物', value: '3'},
    {label: '历史', value: '4'},
    {label: '帮助', value: '5'},
  ],
```


前端笔记 [路径  /src/components/web]这里包括
-

> css：一些常见的布局方式比如flex 、table布局，还有一些css的原理
> js ：记录有关js的技术，如什么是原型链、作用域、单线程、异步与事件、等等及一些算法
> vue：记录vue的一些MVVM原理、及开发中要注意的东西
> regexp： 记录一些常用的正则
> networke： 记录的内容是前端安全防范、浏览器渲染、缓存机制、状态码等


