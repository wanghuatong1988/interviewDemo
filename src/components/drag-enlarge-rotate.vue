<template>

    <div class="drag"
      v-dragScaleRotate
      style="background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');background-size: cover;">
    </div>
</template>

<script>

import dragScaleRotate from './drag-enlarge-rotate/drag-scale-rotation';

export default {
    name: 'drag-enlarge-rotate',
    directives: { dragScaleRotate },
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
</style>
