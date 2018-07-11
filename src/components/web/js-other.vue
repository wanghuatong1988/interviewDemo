<template>
	<div>
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
