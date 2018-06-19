<template>

    <div style="text-align:left;">
        <div class="flex-poistion">
          <div></div>
        </div>

        <!--sass用法-->
        <div class="sass">你好<article>hello</article></div>

        <!--css相关-->
        <!-- 画三角 -->
        <div class="sanjian"></div>
        <!-- 三种居中方式 -->
        <div class="divCenter"><span></span><span></span><span></span></div>
        <!-- css居中未知图片大小 -->
        <div class="thumbanil"><img src="../../assets/logo.png"></div>
        <!-- calc用法 -->
        <ul class="calcBox"><li></li><li></li><li></li><li></li></ul>

        <ul>
          <li>table布局</li>
          <li>
              <div class="common-table">
                <table class="table_head">
                  <thead>
                    <tr>
                      <td width="61%"><div class="order-title"><em>商品信息</em><em>所属品牌</em><em>单价</em><em>数量</em></div></td>
                      <td width="7%" align="center">收货人</td>
                      <td width="7%" align="center">状态</td>
                      <td width="7%" align="center">实收货款</td>
                      <td width="7%" align="center">平台佣金</td>
                      <td width="11%" align="center">详情</td>
                    </tr>
                  </thead>
                </table>
                <table class="table_main">
                  <thead>
                    <tr>
                      <td colspan="10" class="fieldList">
                        <span>订单号：2185080</span>
                        <span>下单时间：2018</span>
                        <span>实体店：飞夺</span>
                        <span>联系厂商：18666929287</span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width="61%" style='padding: 15px'>
                          <div class='mergeBox'>
                            <div>
                              <div>
                                  <img src="https://afp.alicdn.com/afp-creative/creative/u124884735/e751d4e390fa705a4029b49b47b05909.jpg" alt="" height="120">
                              </div>
                              <div>
                                <div>品牌名称</div>
                                <div>规格：12356</div>
                                <div>商家型号：165</div>
                                <div>
                                  <div><span>样</span><span>预</span><span>限</span></div>
                                  <div><em>活动扣点/金额：</em></div>
                                </div>
                              </div>
                            </div>
                            <div><span class="brand-name">在洒洛杉矶</span></div>
                            <div >$135</div>
                            <div>111</div>
                          </div>
                      </td>
                      <td width="7%" align="center">中国</td>
                      <td width="7%" align="center">美 国</td>
                      <td width="7%" align="center">芬芬</td>
                      <td width="7%" align="center">张砂要</td>
                      <td width="11%" align="center">已催单</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </li>
        </ul>

        <ul>
          <li>
            <div class="base-message-box">
                <div class="left">
                        左右高度不一样<br/>设置他们同高<br/>sdfsd<br/>sdfsd<br/>sdfsd<br/>
                </div>
                <div class="right">
                    利用display:flex<br/>justfiy-content:space-between<br/>
                </div>
            </div>
          </li>
        </ul>
        <ul>
          <li>左右布局：左边定宽、右边自知应，三种</li>
          <li>
            <div class="layoutBox">
              <div class="layout1"><div>左边绝对定位</div><div>右边padding-left:左边的宽度</div></div>
              <div class="layout2"><div>flex布局：左边设置宽高</div><div>flex布局：右边flex-grow:1</div></div>
              <div class="layout3"><div>calc布局：左边左浮动</div><div>calc布局：右边右浮动并且用calc计算width: calc(100% - 左边宽px)</div></div>
            </div>
          </li>
        </ul>

        <ul>
          <li>左中固定，中间自适应</li>
          <li>
            <div class="layoutBox2">
              <div class="layout1"><div>flex布局：左边flex:0 0 100px;</div><div>flex布局：中间flex:1</div><div>flex布局：右边flex:0 0 100px;</div></div>
              <div class="layout2"><div>calc布局：左边浮动</div><div>calc布局：中间浮动并且用calc计算100% - 左右两边之和</div><div>calc布局：右边浮动</div></div>
            </div>
          </li>
        </ul>
        <ul>
          <li><strong>CSS 清除浮动的作用是什么</strong></li>
          <li>
            <!--CSS 清除浮动的作用是什么-->
            <div class="floatBox"><div></div><div></div><div></div></div>
          </li>
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
          <li>box-sizing属性：</li>
          <li>1、content-box,默认值，border/padding不计算入width内</li>
          <li>2、padding-box, padding计算入width内</li>
          <li>3、border-box, border和padding计算入width内</li>
        </ul>

        <ul>
          <li><strong>position有多少个值分别是什么有什么作用</strong></li>
          <li>- absolute: 针对有定位父级的原点进行定位，如果父级没有定位，会找父级的父级,如果都没就针对document进行定位</li>
          <li>- fixed：相对于浏览器窗口进行定位。</li>
          <li>- static: 默认什么，没有定位</li>
          <li>- relative: 针对自己本身的位置进行定位。</li>
          <li>- inherit: 规定应该从父元素继承position属性的值。</li>
        </ul>

        <ul style="text-align:left">
          <li style="text-align:center"><strong>css兼容性问题</strong></li>
          <li>1、ie6下如果设置高度小于19px,显示出来的样子比实际设置的还有要高，解决办法overflow:hidden</li>
          <li>2、ie6块级元素如果加了float,又有margin的情况下，显示的margin要比设置的大一倍，解决办法display:inline</li>
          <li>3、ie下如果两个块级元素设置了margin值，第一个bottom和第二个top的间距他会取两个元素中较大的值</li>
          <li>4、ie6\7下li元素都浮动下会产生4px的间隙，解决办法{vertacal-algin:top}</li>
          <li>5、ie6下png24位的图片会有问题，做成png8</li>
          <li>6、浏览器默认的margin和padding不同</li>
          <li>7、ie6下父级的宽度(宽:200px)会被子级(宽:200px + padding: 10px)撑大</li>
          <li>8、ie下p标签不能套div,页面会生成错误</li>
          <li>
            css hack<br/>
            {<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: orange; // 所有浏览器<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: blue\9\0; // ie9\10<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;background: red\0; // ie8\9\10<br/>
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
          <li>不可继承的样式：border padding margin whith height position display float</li>
        </ul>

        <ul>
          <li><strong>css优先级算法</strong></li>
          <li>!important > id > class > tag</li>
        </ul>

        <ul>
          <li><strong>css多列等高如何实现</strong></li>
          <li>利用padding-bottom|margin-bottom正负值相抵</li>
        </ul>

        <ul style="overflow:hidden">
          <li><strong>什么是BFC</strong></li>
          <li>BFC: 提供一个环境，html元素会在这个环境中按照一定的规则进行布局。</li>
          <li>形成BFC的几个条件</li>
          <li>1、浮动元素，float 除 none 以外的值</li>
          <li>2、绝对定位元素，position（absolute，fixed）</li>
          <li>3、display 为以下其中之一的值 inline-blocks，table-cells，table-captions</li>
          <li>4、overflow 除了 visible 以外的值（hidden，auto，scroll）</li>
          <li>如下面所示：1、外面的div高度受里面的浮动影响，高度塌陷</li>
          <li>2、浮动兄弟遮盖问题</li>
          <li>3、margin塌陷问题,在标准文档流中，块级标签之间竖直方向的margin会以大的为准</li>
          <li>清除浮动的方法可为伪类:after{content:'';display:block;clear:both}</li>
          <li>1<div class="bfcDiv1 clear"><span></span><span></span><span></span><span></span></div></li>
          <li style="overflow:hidden">2<div class="bfcDiv2"><span></span><span></span><span></span><span class="clear"></span></div></li>
          <li style="overflow:hidden">3<div class="bfcDiv3"><div></div><div class="clear"></div></div></li>
        </ul>

        <ul>
          <li><strong>什么是zoom:1</strong></li>
          <li>zoom是ie浏览器下的特性,在ie下大部份兼容性都是因为haslayout属性的触发问题,譬如外边距（margin）的重叠,譬如浮动的清除,尽量触发haslayout属性,可以减少很多兼容性问题</li>
          <li>当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染</li>
          <li>haslayout是ie渲染引擎的一个内部组成部分</li>
          <li>有些属性是可以触发haslayout比如display:inline-block,height,float,position,width,zoom</li>
          <li>zoom常规看就是放大元素的倍数</li>
        </ul>

        <ul>
          <li><strong>CSS中link和@import的区别</strong></li>
          <li>1、link属于html标签,而@import属于css提供的</li>
          <li>2、页面被加载时,link会同时被加载,而@import引用的css会等到页面加载完再加载</li>
          <li>3、import在低版本浏览器上无法被识别，而link不存在这个问题</li>
          <li>4、link的样式权重高于@import的权重</li>
        </ul>

        <ul>
          <li><strong>position:absolute和float属性的异同</strong></li>
          <li>共同点：他们都可以让元素脱离文档流</li>
          <li>不同点：float仍会占据位置,position会覆盖文档流中的其他元素</li>
        </ul>

        <ul>
          <li><strong>css优化、提高性能的方法</strong></li>
          <li>1、提取通用样式</li>
          <li>2、使用构建工具(自动补前缀、打包压缩、优雅降级)</li>
          <li>3、避免使用复杂的选择器</li>
          <li>4、不使用@import(无法影响css文件加载速度)</li>
        </ul>

        <ul>
          <li><strong>浏览器怎样解析css选择器的?</strong></li>
          <li>
          按照从右到左解析如下所示：<br/>
          <textarea style="width:400px;height:250px;overflow:hidden;">
              <div class="mod-nav">
                  <header>
                    <h3>
                      <span></span>
                    </h3>
                  </header>
                  <div>
                    <ul>
                      <li><a href=""></a></li>
                      <li><a href=""></a></li>
                    </ul>
                  </div>
              </div>
          </textarea><br/>
          为什么会这样，假如DOM的匹配规则是.mod-nav h3 span<br/>
          <div style="color:red">
          看从左到右的匹配，他会从.mod-nav开始，遍历子节点header和div，然后再遍历他们下面的子节点<br/>
          在右侧的div下最后遍历到叶子节点a,发现不符合规则需求回溯到ul节点<br/>
          假如有1000个li这样的遍历会损失 很多性能。
          </div>
          <div style="color: green">
          再看从右到左的匹配,先找到所有最右节点为span，很明显如果在子叶节点下没有span那么将不会做遍历
          </div>
          所以后代选择器在标准里是不那么推荐的，<br/>
          对于浏览器来说id选择器是最快的，然后是class、html元素选择器<br/>
          </li>
        </ul>

        <ul>
          <li><strong>元素竖向的百分比设定是相对于容器的高度吗？</strong></li>
          <li>不一定</li>
          <li>
            <div class="heightCon">
              <p>这是测试内容</p>
            </div>
          </li>
        </ul>

        <ul>
          <li><strong>line-height如何理解？</strong></li>
          <li>
            1、只能影响行内元素,并不能直接用于块级元素<br/>
            2、具有可继承性,块级元素的子元素会继承该 特性
          </li>
          <li>
            <div style="width:170px;background:#000;margin:0 auto;">
              <span style="font-size:16px;line-height:20px;background:red;">i'm first line</span>
              <span style="font-size:16px;line-height:50px;background:green;">i'm second line</span>
            </div>
            从上可以前到line-height指的是在同一个元素中,两个文本行基线间的距离<br/>
            指的是上面的line底到i'm sencond的底部距离为50px
          </li>
          <li><strong>line-height和height相等，为什么会使文字居中</strong></li>
          <li>
            <span style="height:40px;line-height:40px;background:red; display:inline-block;">i;m first line</span><br/>
            原因是这样文本属于textNode,它也是一个DOM元素,当外层元素设了line-height,它自然继承过来了
          </li>
          <li>
            <div style="font-size:20px; line-height:0; border:1px solid #cccccc; background:#eeeeee;">测试</div>
            <br/><br/>
            <div style="font-size:0; line-height:20px; border:1px solid #cccccc; background:#eeeeee;">测试</div>
          </li>
        </ul>


        <ul>
          <li><strong>怎么让Chrome支持小于12px的文字？</strong></li>
          <li>p{font-size:10px;-webkit-transform:scale(0.8)}</li>
        </ul>
    </div>

</template>
<style lang="scss" scoped="" type="text/css">

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
ul {
 box-shadow: 2px 2px 5px #333;
}

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
  width: 350px;
  height: 350px;
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
  margin: 0 auto;
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

//浮动脱离文档流1
.bfcDiv1 {
  width: 400px;
  border: 5px solid #F90;
  margin: 0 auto;
  span:not(:nth-child(4)) {
    width: 100px;
    height: 200px;
    border:1px solid #592;
    float: left;
  }
  // span:nth-child(4) {
  //     width: 300px;
  //     height: 300px;
  //     background: #999;
  //     display: block;
  // }
}
//浮动脱离文档流2
.bfcDiv2 {
  width: 400px;
  border: 5px solid #F90;
  margin: 0 auto;
  span:not(:nth-child(4)) {
    width: 100px;
    height: 200px;
    border:1px solid #592;
    float: left;
  }
  span:nth-child(4) {
      width: 300px;
      height: 300px;
      background: #999;
      display: block;
  }
}
//浮动脱离文档流3
.bfcDiv3 {
  width: 400px;
  border: 5px solid #F90;
  margin: 0 auto;
  div{
    width: 300px;
    height: 200px;
    margin: 20px auto;
    background: red;
  }
  div:nth-child(2) {
    margin: 40px auto;
  }
}

//清浮动的方法
.clear::after{content:"";display:block;clear:both}

//左右布局三种
.layoutBox {
  width: 100%;
  margin: 20px auto;
  overflow: hidden;
  text-align: left;
  //css布局
  .layout1 {
    position: relative;
    height: 100px;
    width: 100%;
    div:nth-child(1) {
      position: absolute;
      width: 100px;
      left: 0;
      height: 100%;
      background: #0f0;
    }
    div:nth-child(2) {
      background: #f00;
      width: 100%;
      height: 100%;
      padding-left: 100px;
    }
  }
  //flex布局
  .layout2 {
    display: flex;
    height: 100px;
    width: 100%;
    div:nth-child(1) {
      width: 100px;
      height: 100px;
      background: #ff6666;
    }
    div:nth-child(2) {
      flex-grow: 1;
      height: 100%;
      background: #F90;
    }
  }
  //calc方法
  .layout3 {
    height: 100px;
    width: 100%;
    div:nth-child(1) {
      width: 100px;
      height: 100px;
      background: #656786;
      float: left;
    }
    div:nth-child(2) {
      width: calc(100% - 100px);
      height: 100%;
      background: #bcb;
      float: right;
    }
  }
}

//左右固定中间自适应
.layoutBox2 {
  width: 100%;
  margin: 20px auto;
  overflow: hidden;
  text-align: left;
  .layout1 {
    display: flex;
    div{
      height: 100px;
      &:nth-child(1) {
        width: 100px;
        background: #ff6666;
        flex: 0 0 100px;
      }
      &:nth-child(2) {
        flex: 1;
        background: #F90;
      }
      &:nth-child(3) {
        flex: 0 0 100px;
        background: #ff6666;
      }
    }
  }
  .layout2 {
    div {
      height: 100px;
      float: left;
      &:nth-child(1),&:nth-child(3) {
        width: 100px;
        height: 100px;
        background: #F90;
      }
      &:nth-child(2) {
        width: calc(100% - 200px);
        background: #0f0;
      }
    }
  }
}

.heightCon {
  width: 200px;
  height: 200px;
  background: gray;
  margin: auto;
  p {
    margin-top: 20%;
    background: cornflowerblue;
    // height: 50%;
  }
}

.common-table {
  .table_head {
    td {
      padding: 15px 20px;
      span {
        display: inline-block;
        vertical-align: top;
      }
      .order-title {
        display: flex;
        em:not(:nth-child(1)) {
          flex: 0 0 12%;
          text-align: center;
        }
        em:first-child {
          flex: 1;
        }
      }
    }
    font-weight: bold;
    color: #000;
    border: 1px solid #eee;
    background: #f5f7fa;
    margin: 0 0 20px 0;
  }
  .table_main {
    width: 100%;
    margin: 0 0 20px 0;
    thead {
      tr {
        width: 100%;
        height: 40px;
        border: 1px solid #eee;
        background: #f5f7fa;
        .fieldList {
          span {
            margin:  0 15px;
            &:last-child {
              float: right;
              color: #FF0063;
            }
          }
        }
      }
    }
    tbody {
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      overflow: hidden;
      td {
        .mergeBox {
            display: flex;
            > div:not(:nth-child(1)) {
                flex: 0 0 12%;
                align-self: center;
                text-align: center;
                .brand-name {
                    padding: 3px 10px;
                    display: inline-block;
                    margin: 0 8px 0 0;
                    background: #ECF5FF;
                    color: #409EFF;
                    border:1px solid #CAE4FF;
                    border-radius: 4px;
                }
            }
            > div:nth-child(1) {
                flex: 1;
                overflow: hidden;
                margin: 5px 0;
                > div:nth-child(1) {
                    width: 120px;
                    float: left;
                    overflow: hidden;
                }
                > div:nth-child(2) {
                    width: calc(100% - 140px);
                    margin: 0 10px;
                    float: right;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 120px;
                    div:last-child {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        div {
                            &:nth-child(1) {
                                span {
                                    padding: 3px 10px;
                                    display: inline-block;
                                    margin: 0 8px 0 0;
                                    background: #ECF5FF;
                                    color: #409EFF;
                                    border:1px solid #CAE4FF;
                                    border-radius: 4px;
                                }
                            }
                        }
                    }
                }
            }
        }
      }
    }
  }
}

.base-message-box {
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
  overflow: hidden;
  div {
    width: calc((100% / 2) - 10px);
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid #797979;
  }
}
</style>
