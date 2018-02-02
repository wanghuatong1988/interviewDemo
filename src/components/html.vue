<template>
    <div>
    <ul>
        <li><strong>Doctype作用？标准模式和兼容模式各有什么区别？</strong></li>
        <li>doctype是告之浏览器用什么文档标准解析文档</li>
        <li>标准模式是以浏览器支持最高的标准运行，兼容模式是为了兼容老浏览器</li>
    </ul>
    <ul>
          <li><strong>行内元素、块级元素、空元素有哪些？</strong></li>
          <li>行内元素：a、b、span、img、input、select、strong</li>
          <li>块级元素：div、ul、ol、li、dl、dt、dd、h1、hn...、p</li>
          <li>空元素：br、hr、img、link、meta、input</li>
        </ul>

        <ul>
          <li><strong>浏览器内核有哪些？</strong></li>
          <li>IE(Trident)、FF(Gecko)、Chrome(webkit)、Opera(Presto)</li>
        </ul>

        <ul>
          <li><strong>html语义化的理解</strong></li>
          <li>用正确的标签做正确的事,html语义化让页面的内容结构化、结构更清晰、便于搜索引擎解析利于SEO</li>
        </ul>

        <ul>
          <li><strong>描述cookies、sessionStorage、localStorage的区别？</strong></li>
          <li>1、cookie数据会在http请求中在浏览器和服务器间来回传递，而sessionStorage和localStorage不会</li>
          <li>2、cookie存储大小只有4k，而sessionStorage和localStorage有5M</li>
          <li>
            3、localStorage的存储数据持久的<br/>
               sessionStorage的存储数据只限于当前浏览器,浏览器一旦关闭数据将失效<br/>
               cookie设置cookie过期时间之前是一直有效的,即使窗口或浏览器关闭。
          </li>
        </ul>

        <ul>
          <li><strong>iframe有哪些优缺点</strong></li>
          <li>
            优点：<br/>
            1、iframe能够原封不会的展示网页。<br/>
            2、可增加代码的重用性
          </li>
          <li>
            缺点：<br/>
            1、iframe会阻塞主页面的onload事件;<br/>
            2、搜索引擎无法检索不利于SEO<br/>
            （解决这种缺点可用js动态加载）
          </li>
        </ul>

        <ul>
          <li><strong>Label的作用是什么?怎么用</strong></li>
          <li>
            label标签定义和表单间的关系，当用户选择该标签时，他会把焦点转到相关的控件上。
          </li>
          <li>
            <label for="Name">Number:</label>
            <input type="text" name="Name" id="Name"/>
          </li>
        </ul>

        <ul>
            <li><strong>多个标签之间的通信？</strong></li>
            <li>用localStroge、cookie</li>
        </ul>

        <ul>
            <li><strong>html5为什么需要写<!DOCTYPE HTML></strong></li>
            <li>HTML5不基于SGML,而html4基于SGML</li>
            <li>SGML是标准通用标记语言，是一种定义电子文档结构和描述内容的国际标准语言</li>
        </ul>

        <ul>
            <li><strong>input和textarea的区别</strong></li>
            <li>
                不同：<br/>
                input可以指定类型,而textarea只有一种类型<br/>
                input只能用css指定宽高而textarea还可以用rows,cols指定
            </li>
            <li>
                相同：都可以用maxlength和minlength
            </li>
        </ul>

        <ul>
            <li><strong>div怎么模拟textarea</strong></li>
            <li>给div加一个contenteditable</li>
        </ul>

        <ul>
            <li><strong>忽略页面中的电话号码</strong></li>
            <li>
              <textarea style="width:300px;height:100px;border:1px solid red;margin:0 auto;">
                <meta name="format-detection" content="telephone=no" />
              </textarea>
            </li>
        </ul>

        <ul>
          <li> <strong>html5标签如何兼容低版本浏览器</strong> </li>
          <li>1、通过document.createElement(html5标签)可让低版本浏览器识别</li>
          <li>2、使用html shim插件</li>
        </ul>
        
        <ul>
          <li><strong>html5的语义化</strong></li>
          <li>1、header标签页眉</li>
          <li>2、nav标签导航</li>
          <li>3、articel标签内容</li>
          <li>4、footer标签页脚</li>
          <li>5、aside侧边栏部份</li>
          <li>
          6、section主题内容<br/>
          <textarea style="width:300px;height:100px;border:1px solid red;margin:0 auto;">
            <section>
              <header>开始之放</header>
              <!--section就像div-->
            </section>
          </textarea>
        </li>
          <li>
            7、main显示页面主体内容<br/>
            比如左右布局，左边是导航，右边是导航对应的内容
          </li>
          <li>
            8、figure元素组合比如图片会带文字标题的组合<br/>
            <textarea style="width:300px;height:100px;border:1px solid red;margin:0 auto;">
              <figure>
                <img src="#"/>
                <figcaption>图片标题</figcaption>
              </figure>
            </textarea>
          </li>
        </ul>

        <ul>
            <li><strong>rem、em、px的区别</strong></li>
            <li>px:就是页面上的实际像素,不支持浏览器缩放</li>
            <li>em：是一种相对值,它会继承法父级元素的大小</li>
            <li>rem:是根据根元素html的font-size对应大小，比如html大小为50px那么1rem就为50px;</li>
            <li>
                这里说下em:
                <textarea name="" id="" cols="80" rows="10">
                    <style>
                        body {
                            font-size: 12px;
                        }
                        #div{
                             /* 该元素没有设置font-size，因此继承了父元素的font-size: 12px; */
                            width: 10em;    /* 10em = 12px * 10 = 120px */
                        }
                        #div1 {
                            font-size: 20px;
                            width: 10em;    /* 10em = 20px * 10 = 200px */
                        }
                    </style>
                    <body>
                        <div id="div"></div>
                        <div id="div1"></div>
                    </body>
                </textarea>
                <br/>
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
