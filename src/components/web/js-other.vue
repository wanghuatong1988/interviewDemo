<template>
	<div>
    <input type="text" id="input" value=""/>
		<ul>
			<li>js关于小数点相加的运算</li>
      <li>由于首先声明这不是bug，
          原因在与十进制到二进制的转换导致的精度问题！
          其次这几乎出现在很多的编程语言中：C/C++,Java,Javascript中，
          准确的说：“使用了IEEE 754浮点数格式”来存储浮点类型(float 32,double 64)的任何编程语言都有这个问题！</li>
			<li>
      <li>
        这个例子是一个滑动数值变动的vant插件功能,由于插件只能支付整数，要处理相对较近的小数区间问题，这里就需要特殊处理
      </li>
      <li>
        这是一个可输入数值去改变滑条的值的功能，由于取值是在2-3.5之间，为15步，事个滑动条的长度是100，15/100大约是6.6为一步
        在这整个过程用由小数位相加会有错误，所以都要把他转为整数去处理
      </li>
			<li>
				<textarea style="height:550px">
            <template>
              <div class="set-price-box">
                  <input ref="price" type="number" v-if="flag" v-model="price" @change="getPrice"/>
              </div>
              <van-slider v-model="value" :step="6.6" bar-height="2px" :min="1" :max="100" @change="setValue"/>
            </template>

            <script type="text/javascript">
                export default {
                    data() {
                      return {
                        price: 2.0,
                        value: 1.5,
                      }
                    },
                    methods: {
                      setValue(val){
                        //记录上一次的值
                        let n = ((+val).toFixed(1) * 10) / 66, //求出区间总长度15
                          //这里不能取this.price要改为初始值2，但由要转换成整数都乘于10为20
                          t = ((20 + n) / 10).toFixed(1);
                        this.price = t;
                      },
                    },
                    watch: {
                      price(val) {
                        if(val) {
                          //15代表总长度 ，35代表最高值,先用整数处理，最后除于6.6转为小数
                          this.value = (15 - (35 - (+val * 10))) * 6.6;
                        }
                      }
                    },
                  }

            </script>
				</textarea>
			</li>
		</ul>

    <ul>
      <li>关于在vuejs上使用swpier</li>
      <li>引入import { swiper, swiperSlide } from 'vue-awesome-swiper' 和 'swiper/dist/css/swiper.css';</li>
      <li>
        上下滑动图片要注意的下面这是结构
      </li>
      <li>
        <textarea style="height:550px">
          <swiper ref="mySwiper" class="swiper-container my-container" :style="{'height': `${swiperOption.height * pages.length}px`}" :options="swiperOption" >
            <swiper-slide ref="mySlide"  v-for="(item, index) of pages" :key="index">
              <div class="img" :style="{'background':'url('+ $imgdesc(item) + ')'}"></div>
            </swiper-slide>
          </swiper>
          <div class="up" v-if="+currrentPage < pages.length - 1" @click="upHandler"></div>
          <div class="down" v-else @click="downHandler"></div>

          <script type="text/javascript">
              //配置
              swiperOption: {
                mousewheel: true,
                direction : 'vertical',
                height: window.innerHeight,
                watchSlidesProgress: true,
                on: {
                  slideChange:_=>{
                    this.currrentPage = this.swiper.activeIndex;
                  },
                  init:_=>{
                    this.$nextTick(_=>{
                      this.swiper.myIndex = 0;
                    })
                  },
                  setTransition: speed =>{
                    this.$nextTick(_=>{
                      for (let i = 0; i < this.swiper.slides.length; i++) {
                        let slide = this.swiper.slides.eq(i);
                        slide.transition(speed + 'ms');
                      }
                      this.swiper.mousewheel.disable();
                    })
                  },
                  progress: _=> {
                    this.$nextTick(_=>{
                      for (let i = 0; i < this.swiper.slides.length; i++) {
                        let slide = this.swiper.slides.eq(i),
                          progress = this.swiper.slides[i].progress,
                          translate = progress * this.swiper.height * 0.8,
                          scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                        if (i == this.swiper.myIndex) {
                          slide.transform('translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')');
                          slide.css({'z-index':0,'boxShadow':'0px 0px 10px rgba(0,0,0,.5)'});
                        }
                      }
                    })
                  },
                  transitionEnd:_=> {
                    this.$nextTick(_=>{
                      this.swiper.myIndex = this.swiper.activeIndex;
                      for (let i = 0; i < this.swiper.slides.length; i++) {
                        let slide = this.swiper.slides.eq(i);
                        slide.transform('');
                        slide.css('z-index',1);
                      }
                      this.swiper.mousewheel.enable();
                    })
                  },
                }
              },
          </script>
        </textarea>
      </li>
    </ul>
	</div>
</template>
<script>
    // let el = document.getElementById('input');
    // let obj = {
    //   name: ''
    // }

    // function oberseve(obj) {
    //   if (typeof obj !== 'object') return;
    //   for(let key in obj) {
    //     defineReactive(obj, key, obj[key]);
    //     oberseve(obj[key]);
    //   }
    // }

    // function defineReactive(target, property, value) {
    //   Object.defineProperty(target, property, {
    //     get() {
    //       el.value = value;
    //       return value;
    //     },
    //     set(newVal) {
    //       el.value = newVal;
    //       value = newVal;
    //     }
    //   })
    // }

    // oberseve(obj);
    // el.addEventListener('input', function(){
    //   obj.name = this.value;
    // })


    //数组对象去重
    /****
    let obj = {};
    this.tempProList = this.tempList.reduceRight((item,next)=>{
        obj[next.goods_item_id] ? '' : obj[next.goods_item_id] = true && item.push(next);
        return item;
    }, []);
    ****/

    //比较日期大小
    /******
    function format (date = new Date(), split = '-') {
        if (typeof date === 'string') {
            // 传入的是yyyymmdd
            if(!~date.indexOf(split)) {
                return date.substr(0, 4) + split + date.substr(4, 2) + split + date.substr(6, 2);
            }

            date = new Date();
        }

        let arr = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        arr.forEach((item, i) => {
            if (item < 10) {
                arr[i] = '0' + item;
            }
        })
        return arr.join(split);
    }

    function max (...args) {
      let dates = args.map((date)=>{
        return new Date(date + '00:00:00').getTime();
      });

      if(!dates.length) {
        return null;
      }
      return format(new Date(Math.max(...dates)))
    }
    console.log(max('2016-01-02', '2016-01-03'))
    ****/

    //递归数据
    /**
    //数据
      {
          "value":[
              {
                  "subMenus":[],
                  "menuName":"一级",
                  "clickUrl":"/"
              },
              {
                  "menuName":"一级",
                  "subMenus":[{
                      "subMenus":[],
                      "clickUrl":"/two/a"
                      "menuName":"二级"
                  },{
                      "subMenus":[],
                      "clickUrl":"/two/b",
                      "menuName":"二级"
                  }]
              }
          ]
      }

      //最终结果
      menus: [
          { title: '一级', path: '/'},
          {
              title: '一级',
              children: [
                  { title: '二级', path: '/two/a' },
                  { title: '二级', path: '/two/b' },
              ]
          },
          {
              title: '一级',
              children: [
                  {
                      title: '二级',
                      children: [
                          {title: '三级', path: '/three/c'}
                      ]
                  }
              ]
          }
      ]
    function convert(data){
        var deep = data.value || data.subMenus
        return !deep ? [] : deep.map(function(menu){
            return {
                title:menu.menuName,
                path:menu.clickUrl,
                children:convert(menu)
            }
        })
    }
    var menus = convert(yourobject)
    **/

    //冒泡排序

    /*function aaa(arr) {
        for(var i = 0 ; i < arr.length; i++) {
            for(var j = 0 ; j < arr.length - i; j++) {
                toCon(j, j+1);
            }
        }

        function toCon(prev, next) {
            var tmp = '';
            if(arr[prev] > arr[next]) {
                tmp = arr[prev];
                arr[prev] = arr[next];
                arr[next] = tmp;
            }
        }

        return arr;
    }

    console.log(aaa([4,7,2,3,1]))*/

    //选择排序
    /*function bbb(arr) {
        if(arr.length === 1) {
            return arr;
        }
        var iMin = arr[0];
        var index = 0;

        for(var i = 0; i < arr.length; i++) {
            if(arr[i] < iMin) {
                iMin = arr[i];
                index = i;
            }
        }

        var prev = arr.splice(index, 1);
        return prev.concat(bbb(arr));
    }
    console.log(bbb([4,7,2,3,1]))*/


    //随机排序
    /*
        var arr = [1,2,3,4,5,6,7,8];
        arr.sort(function(){
            return Math.random() - 0.5;
        })
        console.log(arr);
    */

    //二分查找
    /*function binSearch (arr, data) {
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
    console.log(binSearch(arr, 'g'));*/


    //单例模式
    /*var getSingle = function(fn) {
        var result;
        return function() {
            return result || (result = fn.apply(this, arguments));
        }
    }

    var createLogLayer = function() {
        var oDiv = document.createElement('div');
        oDiv.innerHTML = '我是登录浮窗';
        oDiv.style.display = 'none';
        document.getElementById('show').appendChild(oDiv);
        return oDiv;
    }

    var createSingleLoginLayer = getSingle(createLogLayer);

    document.getElementById('loginBtn').onclick = function() {
        var loginLayer = createSingleLoginLayer();
        loginLayer.style.display = 'block';
    }*/

    // 策略模式
    /*var strategies = {
        'S': function(salary) {
            return salary * 4;
        },
        'A': function(salary) {
            return salary * 3;
        },
        'B': function(salary) {
            return salary * 2;
        }
    };

    var calculateBouns = function(level, salary) {
        return strategies[level](salary);
    };

    console.log(calculateBouns('A',20000));
    console.log(calculateBouns('S',40000))*/

    //代理模式
    /*var mult = function() {
        console.log('begin....');
        var a = 1;
        for(var i =0; i < arguments.length; i++) {
            a = a * arguments[i];
        }
        return a;
    };

    //加入缓存代理:
    var proxyMult = (function(){
        var cache = {};
        return function() {
            var args = Array.prototype.join.call(arguments, ',');
            if(args in cache) {
                return cache[args];
            }
            return cache[args] = mult.apply(this, arguments);
        }
    })();

    proxyMult(1,2,3,4);
    proxyMult(1,2,3,4);*/

    //发布订阅模式
    //基本的发布订阅模式
    /*var salesOffices = {};
    salesOffices.clientList = [];

    salesOffices.listen = function( fn ) {
        this.clientList.push(fn);
    }

    salesOffices.trigger = function() {
        for(var i = 0; i < this.clientList.length ; i++) {
            this.clientList[i].apply(this,arguments);
        }
    }

    salesOffices.listen(function(price, squareMeter){
        console.log('价格=' + price);
        console.log('squareMeter=' + squareMeter);
    })

    salesOffices.trigger(20000000000, 12000);
    salesOffices.trigger(30000000000, 30000);*/

    //发布-订阅
    /*var event = {
        clientList: [],
        listen: function(key, fn) { // 负责收集
            if(!this.clientList[key]) {
                this.clientList[key] = [];
            }
            this.clientList[key].push(fn);
        },
        trigger: function() { // 负责传播
            var key = Array.prototype.shift.call(arguments),
                fns = this.clientList[key];

            if( !fns || fns.length === 0 ) {
                return false;
            }

            for( var i = 0; i < fns.length; i++ ) {
                fns[i].apply(this, arguments);
            }
        }
    };

    var installEvent = function(obj) {
        for( var i in event ) {
            obj[i] = event[i];
        }
    }

    var salesOffices = {};
    installEvent(salesOffices);

    salesOffices.listen('squareMeter88', function(price) {
        console.log('价格=' + price);
    })
    salesOffices.listen('squareMeter100', function(price) {
        console.log('价格=' + price);
    })

    salesOffices.trigger('squareMeter88', 2200000)
    salesOffices.trigger('squareMeter110', 3200000)*/

    //职责链模式(向下传递) ---> 可解决嵌套的if else
    /**
    var order500 = function(orderType,  pay, stock) {
        if ( orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            return 'nextSuccesor'
        }
    };
    var order200 = function(orderType, pay, stock) {
        if ( orderType === 2 && pay === true ) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            return 'nextSuccesor';
        }
    };
    var orderNormal = function(orderType, pay, stock) {
        if( stock > 0) {
            console.log('普通购买,无优惠券');
        } else {
            console.log('手机库存不足')
        }
    };
    var Chain = function(fn) {
        this.fn = fn;
        this.successor = null;
    }
    Chain.prototype.setNextSuccessor = function(successor) {
        return this.successor = successor;
    }
    Chain.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if( ret === 'nextSuccesor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret;
    };
    var chainOrder500 = new Chain( order500 );
    var chainOrder200 = new Chain( order200 );
    var chainOrderNormal = new Chain ( orderNormal );

    chainOrder500.setNextSuccessor( chainOrder200 );
    chainOrder200.setNextSuccessor( chainOrderNormal );
    chainOrder500.passRequest(1, true, 500);
    chainOrder500.passRequest(2, true, 500);
    chainOrder500.passRequest(3, true, 500);
    chainOrder500.passRequest(1, false, 0);
    **/

    //mz数据列表
    /***
    function search(data,p_id){
          var temp = [];
          for(var index in data){
              if (data[index].parentId === p_id) {
                  temp.push(data[index]);
              }
          }
          return temp;
      }

      function test(p_id = 0){
          var arr = [];
          var searchResult = search(list.value,p_id);
          for(var i in searchResult){
              arr.push({
                  "value": searchResult[i].nodeName,
                  "nodePath": searchResult[i].nodePath,
                  "code": searchResult[i].nodeId,
                  "children": test(searchResult[i].nodeId)
              })
          }
          return arr;
      }
    ***/
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
