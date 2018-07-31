<template>
  <div>
    <!--这里只负现拖拽、旋转、放大缩小-->
    <div class="drag"
      v-dragScaleRotate:getScaleRotate="getVal"
      ref="drag"
      style="background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');background-size: cover;">
    </div>

    <!--这里用指令爆露出来的数据进行放大、缩小(防止缩到太小的时候两指无法操作)-->
    <div class="control-size-box" v-if="show">
      <div class="big-btn" @click="scaleBtn('enlarge')">放大</div>
      <div class="small-btn" @click="scaleBtn('narrow')">缩小</div>
    </div>
  </div>
</template>

<script>

import dragScaleRotate from './drag-enlarge-rotate/drag-scale-rotation';

export default {
    name: 'drag-enlarge-rotate',
    directives: { dragScaleRotate },
    data() {
      return {
        coefficient: 1 ,
        show: false,
      }
    },
    methods: {
      init() {
        this.updateOrientation();
      },
      //判断横竖屏
      updateOrientation() {
        let supportOrientation = (typeof window.orientation === 'number' && typeof window.onorientationchange === 'object'),
          orientation = '';
        if(supportOrientation) {
          orientation = window.orientation;
          switch(orientation) {
            case 90:
            case -90:
              orientation = 'landscape'; //横屏 90 -90
              break;
            default:
              orientation = 'portrait'; //竖屏 0 180
              break;
          }
        } else {
          orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
        }

        if(supportOrientation) {
          window.addEventListener('orientationchange', this.updateOrientation, false);
        } else {
          window.addEventListener('resize', this.updateOrientation, false);
        }

        if(orientation === 'portrait') {
          alert('请用横屏查看');
        }
      },
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
        //缩放比小于1的时候显示
        this.show = (val.scale <= 0.9) ? true : false;
      }
    },

}
</script>

<style>
  .drag{
    width: 200px;
    height: 200px;
    overflow: hidden;
    position: absolute;
    top: 100px;
    left: 180px;
  }

  .control-size-box {
    position: absolute;
    width: 40px;
    height: 80px;
    top: 50%;
    left:0;
    margin-top: -40px;
    background: rgba(0, 0, 0, 0.8);
    font-size: 12px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .control-size-box div{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .control-size-box div:first-child {
    border-bottom: 1px solid #fff;
  }
</style>
