<template>

    <div>
        <!--sass用法-->
        <div class="sass">你好<article>hello</article></div>

        <!--css相关-->
        <!-- 画三角 -->
        <div class="sanjian"></div>
        <!-- 三种居中方式 -->
        <div class="divCenter"><span></span><span></span><span></span></div>
        <!-- css居中未知图片大小 -->
        <div class="thumbanil"><img src="../assets/logo.png"></div>  
        <!-- calc用法 -->
        <ul class="calcBox"><li></li><li></li><li></li><li></li></ul>
        <!--CSS 清除浮动的作用是什么-->
        <div class="floatBox"><div></div><div></div><div></div></div>
        <ul>
          <li><strong>CSS 清除浮动的作用是什么</strong></li>
          <li>
            如上三个div,中间div设置了浮动那么它将脱离文档流,<br/>
            紧接着他后面的元素将占据浮动元素的位置,变成新的标准流<br/>
            清除浮动的原因也是因为上面那样照成的结果
          </li>
        </ul>

        <ul>
          <li><strong>盒模型分为：标准盒模型、IE盒模型</strong></li>
          <li>- 标准盒模型：内容(content)、填充(padding)、边界(maring)、边框(border)</li>
          <li>- IE盒模型：它把border和padding算进content</li>
          <li>box-szing属性：</li>
          <li>1、content-box,默认值，border-padding不计算入width内</li>
          <li>2、padding-box, padding计算入width内</li>
          <li>3、border-box, border和padding计算入width内</li>
        </ul>



        <ul>
          <li><strong>position有多少个值分别是什么有什么作用</strong></li>
          <li>- absolute:生成绝对定位的元素，相对于值不为static的第一个父元素进行定位。</li>
          <li>- fixed：生成绝对定位元素，相对于浏览器窗口进行定位。</li>
          <li>- static: 默认什么，没有定位</li>
          <li>- relative: 生成相对定位的元素，相对于正常位置进行定位。</li>
          <li>- inherit: 规定应该从父元素继承position属性的值。</li>
        </ul>

        <ul style="text-align:left">
          <li style="text-align:center"><strong>css兼容性问题</strong></li>
          <li>1、ie6下如果设置高度小于10px,显示出来的样子比实际设置的还有要高，解决办法overflow:hidden</li>
          <li>2、ie6块级元素如果加了float,又有margin的情况下，显示的margin要比设置的大一倍，解决办法display:inline</li>
          <li>3、ie下如果两个块级元素设置了margin值，第一个bottom和第二个top的间距他会取两个元素中较大的值</li>
          <li>4、ie6\7下li元素都浮动下会产生4px的间隙，解决办法{vertacal-algin:top}</li>
          <li>5、ie6下png24位的图片会有问题，做成png8</li>
          <li>6、浏览器默认的margin和padding不同</li>
          <li>
            css hack<br/>
            {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: orange; // 所有浏览器<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: red\0; // ie8\9\10<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: blue\9\0; // ie9\10<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;*background: black; // ie6\7<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;_background: green; // ie6<br/>
            }
          </li>
        </ul>

        <ul>
          <li><strong>渐进增强和优雅降级</strong></li>
          <li>渐进增强：先兼容低版本浏览器，再向上兼容高版版浏览器</li>
          <li>优雅降级：先兼容高版本浏览器，然后再针对低版本浏览器进行兼容。</li>
        </ul>

        <ul>
          <li><strong>手动写动画，你认为最小时间间隙是多久，为什么？</strong></li>
          <li>多数显示器频率为60Hz,即1秒刷新60次,所以理论上最小间隔为1/60*1000ms = 16.7ms</li>
        </ul>

        <ul>
          <li><strong>css选择符有哪些？哪些属性可以继承</strong></li>
          <li>1、id选择器(#id)</li>
          <li>2、类选择器(.class)</li>
          <li>3、标签选择器(div,span)</li>
          <li>4、相邻选择器(h1 + p)</li>
          <li>5、子选择器(ul > li)</li>
          <li>6、后代选择器(div a)</li>
          <li>7、属性选择器(a[rel='external'])</li>
          <li>8、伪类选择器(a:hover, li:nth-child)</li>
          <li>可继承的样式：font-size, font-family, color, ul li dl dd dt</li>
          <li>不可继承的样式：border padding margin whith height</li>
        </ul>

        <ul>
          <li><strong>css优先级算法</strong></li>
          <li>!important > id > class > tag</li>
        </ul>

        <ul>
          <li><strong>css多列等高如何实现</strong></li>
          <li>利用padding-bottom|margin-bottom正负值相抵</li>
        </ul>
    </div>

</template>
<style lang="scss" scoped="" type="text/css">
ul,li {
  margin: 0;
  padding: 0;
}
ul {
  border:1px solid #000;
  margin: 20px 0;
}
//sass主要内容
$nav-color: #F90;
$w: 100px;

//混合器
@mixin round-s {
  border-radius: 5px;
};

@mixin fn($h, $hover) {
  height: 40px + $h;
  &:hover {
    color: $hover;
  }
};

.extend { background: #ccc;}
.sass {
  width: $w;
  border: 1px solid red;
  color: $nav-color;
  @include round-s; 
  @include fn(10,blue);
  @extend .extend;
}

//画三角
.sanjian {
  width: 0;
  height: 0;
  border:20px solid transparent;
  //border-color: rgba(0,0,0,0) red rgba(0,0,0,0) rgba(0,0,0,0); 
  border-color: transparent red transparent transparent;
}

//居中方式3种
.divCenter {
  width: 200px;
  height: 200px;
  border: 1px solid red;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  span:nth-child(1) {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    background: pink;
    transform: translate(-50%, -50%)
  }
  span:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    background: green;
    margin-top: -50px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
  }
  span:nth-child(3) {
    width: 100px;
    height: 100px;
    background: blueviolet;
  }
}

//未知图片大小，让其居中显示纯css方法
.thumbanil {
  width: 300px;
  height: 300px;
  border:1px solid #ccc;
  border-radius: 3px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

//calc用法
.calcBox {
  width: 100%;
  overflow: hidden;
  li{
    float: left;
    height: 20px;
    padding: 10px;
    margin-right: 10px;
    background: #ff6666;
    border:5px solid #dac8a7;
    width: calc(25% - (5px + 10px) * 2 - 10px);
  }
}

.floatBox {
  width: 300px;
  border: 1px solid #ff6666;
  margin: 20px;
  overflow: hidden;
  div {
    width: 100px;
    height: 100px;
    background: #592;
    &:nth-child(2) {
      float: left;
      background: greenyellow;
      width: 80px;
    }
    // &:nth-child(3) {
    //   clear: both;
    // }
  }
}
</style>
