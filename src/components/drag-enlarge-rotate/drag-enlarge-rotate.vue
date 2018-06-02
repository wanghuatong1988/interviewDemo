<template>
    <!-- <div ref="el" class="drag-enlarge-rotate" @touchstart.stop.prevent="onStart" @touchmove.stop.prevent="onMoveParsent" @touchend.stop.prevent="onEnd" style="background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');background-size: cover;">
      <div ref="left" class="left" @touchstart.stop.prevent="onStart" @touchmove.stop.prevent="onMoveLeft" @touchend.stop.prevent="onEnd"><div></div></div>
      <div ref="right" class="right" @touchstart.stop.prevent="onStart" @touchmove.stop.prevent="onMoveRight" @touchend.stop.prevent="onEnd"><div></div></div>
      <div ref="bottom" class="bottom" @touchstart.stop.prevent="onStart" @touchmove.stop.prevent="onMoveBottom" @touchend.stop.prevent="onEnd"><div></div></div>
      <div ref="top" class="top" @touchstart.stop.prevent="onStart" @touchmove.stop.prevent="onMove" @touchend.stop.prevent="onEnd"><div></div></div>
    </div> -->
    <div class="drag" style="background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');background-size: cover;">

    </div>
</template>

<script>

export default {
    name: 'drag-enlarge-rotate',
    props: {

    },
    data() {
        return{
            sPageX: 0, // x轴方法距离
            sPageY: 0, // y轴方法距离
            scale: 1, //初始缩放
            rotation: 0, //初始旋转值
            now: '',
            start: [], //
        }
    },

    mounted() {
        var box=document.querySelector(".drag");
          var boxGesture=setGesture(box);
          var _this = this; //得到一个对象
          boxGesture.gesturestart=function(){  //双指开始
              box.innerHTML = `开始的值:${_this.scale}:${_this.rotation}`;
          };
          boxGesture.gesturemove=function(e){  //双指移动
            _this.scale = e.scale;
            _this.rotation = e.rotation;
            box.style.transform=`scale(${_this.scale}) rotate(${_this.rotation}deg)`;//改变目标元素的大小和角度

          };
          boxGesture.gestureend=function(){  //双指结束
            //box.style.transform=`scale(${this.scale}) rotate(${this.rotation}deg)`;
          };

          function setGesture(el){
            var obj={}; //定义一个对象
            var istouch=false;

            el.addEventListener("touchstart",function(e){
                if(e.touches.length>=2){  //判断是否有两个点在屏幕上
                    istouch=true;
                    _this.start=e.touches;  //得到第一组两个点
                    obj.gesturestart&&obj.gesturestart.call(el); //执行gesturestart方法
                };
            },false);
            el.addEventListener("touchmove",function(e){
                e.preventDefault();
                if(e.touches.length>=2&&istouch){

                    _this.now=e.touches;  //得到第二组两个点
                    _this.scale=getDistance(_this.now[0],_this.now[1])/getDistance(_this.start[0],_this.start[1]); //得到缩放比例
                    _this.rotation=getAngle(_this.now[0],_this.now[1])-getAngle(_this.start[0],_this.start[1]);  //得到旋转角度
                    obj.gesturemove&&obj.gesturemove.call(el,{
                        scale: _this.scale.toFixed(2),
                        rotation: _this.rotation.toFixed(2)
                    });  //执行gesturemove方法
                };
            },false);
            el.addEventListener("touchend",function(e){
                if(istouch){
                    istouch=false;
                    obj.gestureend&&obj.gestureend.call(el);  //执行gestureend方法
                };
            },false);
            return obj;
          }
          function getDistance(p1, p2) {
              var x = p2.pageX - p1.pageX,
                  y = p2.pageY - p1.pageY;
              return Math.sqrt((x * x) + (y * y));
          }
          function getAngle(p1, p2) {
              var x = p1.pageX - p2.pageX,
                  y = p1.pageY- p2.pageY;
              return Math.atan2(y, x) * 180 / Math.PI;
          }
    },
    methods: {
        onStart(e) {
          this.sPageX = e.targetTouches[0].pageX; //存储起始位置X轴距离
          this.sPageY = e.targetTouches[0].pageY; //存储起始位置Y轴距离
        },
        onMoveBottom(e) { //向下
          this.onMove(e, 'bottom');
        },
        onMoveLeft(e) { //向左
          this.onMove(e, 'left');
        },
        onMoveRight(e) { //向右
          this.onMove(e, 'right');
        },
        onMoveParsent(e) { //外层盒子
          this.onMove(e, 'parent');
        },
        onMove(e, direction) {
          //移动距离
          let mPageX = e.targetTouches[0].pageX,
              mPageY = e.targetTouches[0].pageY,
              moveX = mPageX - this.sPageX,
              moveY = mPageY - this.sPageY,

              el_width = this.$refs.el.clientWidth,
              el_height = this.$refs.el.clientHeight,
              offsLeft = this.$refs.el.offsetLeft,
              dom_width, dom_height;

          //每次move都把起始位置设置为当前移动位置
          this.sPageX = mPageX;
          this.sPageY = mPageY;

          if(direction === 'right') {
            dom_width = el_width + moveX;
            dom_height = el_height + moveX;
          }

          if(direction === 'left') {
            dom_width = el_width - moveX;
            dom_height = el_height - moveX;
            this.$refs.el.style.left = (this.$refs.el.offsetLeft + moveX) + 'px';
          }

          if(direction === 'bottom') {
            dom_width = el_width + moveY;
            dom_height = el_height + moveY;
          }

          //放大dom
          if(direction !== 'parent') {
            this.$refs.el.style.width = dom_width + 'px';
            this.$refs.el.style.height = dom_height + 'px';
          }
          //拖拽dom
          if(direction === 'parent') {
            this.$refs.el.style.left = (this.$refs.el.offsetLeft + moveX) + 'px';
            this.$refs.el.style.top = (this.$refs.el.offsetTop + moveY) + 'px';
          }
        },
        onEnd() {

        }
    },
    watch: {

    }
}
</script>

<style>

    .drag{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 100px;
        left: 180px;
        transform: scale(1) rotate(0deg);
    }
    .drag-enlarge-rotate{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 100px;
        left: 180px;
    }
    .drag-enlarge-rotate > div {
        width: 40px;
        height: 40px;
        background: #000;
        border-radius: 50%;
        position:absolute;
    }
    .drag-enlarge-rotate > div > div {
        width: 0;
        height: 0;
        border: 12px solid transparent;
    }
    .drag-enlarge-rotate > .left {
        left: -45px;
        top: 50%;
        margin-top: -20px;
    }
    .drag-enlarge-rotate > .right {
        right: -45px;
        top: 50%;
        margin-top: -20px;
    }
    .drag-enlarge-rotate > .top {
        top: -45px;
        left: 50%;
        margin-left: -20px;
    }
    .drag-enlarge-rotate > .bottom {
        bottom: -45px;
        left: 50%;
        margin-left: -20px;
    }
    .drag-enlarge-rotate > div.left > div {
        border-color: transparent #fff transparent transparent;
        margin: 8px 0 0 0px;
    }
    .drag-enlarge-rotate > div.right > div {
        border-color: transparent transparent transparent #fff;
        margin: 8px 0 0 17px;
    }
    .drag-enlarge-rotate > div.top > div {
        border-color: transparent transparent #fff transparent;
        margin: 2px 0 0 8px;
    }
    .drag-enlarge-rotate > div.bottom > div {
        border-color: #fff transparent transparent transparent;
        margin: 15px 0 0 8px;
    }
</style>
