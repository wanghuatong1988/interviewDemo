<template>
  <div class="c-swipe" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend" @touchcancel="handleTouchend">
    <div class="c-swipe-wrapper" ref="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiper',

  data() {
    return {
      hasMounted: false,
      insideValue: this.value,
      pages: [],
      width: 0,
      length: 0,
      inited: false,
      startx: 0,
      moveDistance: 0,
      touchStartTime: 0,
      moving: false,
      starty: 0,
      firstMove: true,
      horizontalMove: true,
      copyNum: 2,
      autoplayTimer: null,
    };
  },

  props: {
    value: {
      type: Number,
      default: 0,
    },
    loop: {   // 循环滑动
      type: Boolean,
      default: true,
    },
    minMoveDistance: {  // 成功触发切换 item 的最小滑动距离
      type: String,
      default: '20%',
    },
    quickTouchTime: {  // 快速滑动时只要距离大于 10px 便可以触发滑动
      type: Number,
      default: 150,
    },
    speed: {    // 切换屏幕的速度
      type: Number,
      default: 300,
    },
  },

  computed: {
    c_minMoveDistance(val) {
      let value = val;
      let mode = '';

      if (/px$/.test(val)) {
        mode = 'pixel';
      } else if (/^\d+$/.test(val)) {
        mode = 'pixel';
      } else if (/%$/.test(val)) {
        mode = 'percent';
      } else {
        value = '20%';
        mode = 'percent';
      }

      const stgy = {
        pixel() {
          const parsedValue = parseInt(value, 10);
          return `${value}px`;
        },
        percent() {
          const parsedValue = parseInt(value, 10) / 100;
          return this.width * parsedValue;
        },
      };

      return stgy[mode].apply(this);
    },

    c_translatex() {
      return -this.width * this.insideValue;
    },

    c_isEnd() {
      return this.insideValue === this.length - 1;
    },

    c_isBegin() {
      return this.insideValue === 0;
    },
  },

  watch: {
    insideValue(val) {
      if (val !== this.value) {
        this.$emit('input', val);
      }
      this.valueChangeHandler(val);
    },
    value(val) {
      this.insideValue = val;
    },
  },

  mounted() {
    this.hasMounted = true;
    this.init();
    this.initOnce();
  },

  destroyed() {
    clearTimeout(this.autoplayTimer);
  },

  methods: {
    reset() {
      this.init();
      this.initOnce();
    },

    init() {
      if (!this.hasMounted) return;
      const success = this.initDatas();
      if (!success) {
        return;
      }
      this.$refs.wrapper.style.width = `${this.width}px`;
      this.clearCopies();
      this.addCopies();
    },

    initOnce() {
      this.setTranslate(this.c_translatex);
    },

    initDatas() {
      const style = getComputedStyle(this.$el, false).width;
      this.width = parseInt(style, 10);
      if (!this.$slots.default) {
        return false;
      }

      this.pages = this.$slots.default
        .filter(vnode => vnode.tag && vnode.elm.classList.contains('c-swipe-item'))
        .map(vnode => vnode.elm);

      if (!this.pages.length) {
        return false;
      }
      this.length = this.pages.length;
      return true;
    },

    clearCopies() {
      const children = this.$refs.wrapper.querySelectorAll('.c-swipe-item-copy');
      [...children].forEach(el => {
        this.$refs.wrapper.removeChild(el);
      }, this);
      this.$refs.wrapper.style.marginLeft = '0';
    },

    addCopies() {
      const fronts = [];
      const ends = [];
      this.pages.forEach((item, index) => {
        if (index < 2) {
          const copy = item.cloneNode(true);
          copy.classList.add('c-swipe-item-copy');
          fronts.push(copy);
        }
        if (index > this.pages.length - 3) {
          const copy = item.cloneNode(true);
          copy.classList.add('c-swipe-item-copy');
          ends.push(copy);
        }
      }, this);

      this.copyNum = ends.length;
      while (ends.length) {
        const item = ends.pop();
        const firstNode = this.$refs.wrapper.querySelector('.c-swipe-item');
        this.$refs.wrapper.insertBefore(item, firstNode);
      }

      while (fronts.length) {
        const item = fronts.shift();
        this.$refs.wrapper.appendChild(item);
      }
      this.$refs.wrapper.style.marginLeft = `-${this.width * this.copyNum}px`;
    },

    handleTouchstart(e) {
      if (this.length <= 1 || this.moving) return;
      this.startx = e.touches[0].pageX;
      this.starty = e.touches[0].pageY;
      this.touchStartTime = new Date().getTime();
      if (this.autoChange) {
        this.autoChange();  // 重置自动轮播的计时器
      }
      this.firstMove = true;
    },

    handleTouchmove(e) {
      if (this.length <= 1 || this.moving) return;
      this.moveDistance = e.touches[0].pageX - this.startx;

      if (this.firstMove) {
        this.firstMove = false;
        const moveY = e.touches[0].pageY - this.starty;
        this.horizontalMove = Math.abs(this.moveDistance) >= Math.abs(moveY);
      }

      // 用户非水平滑动屏幕
      if (!this.horizontalMove) {
        return;
      }

      e.preventDefault();

      const translate = this.c_translatex + this.moveDistance;
      let finalTranslate = translate;
      finalTranslate = this.handleTouchmove_loop(translate);
      this.setTranslate(finalTranslate);
    },

    handleTouchend(e) {
      if (this.length <= 1 || this.moving) return;
      if (!this.horizontalMove) return;
      const isQuick = new Date().getTime() - this.touchStartTime < this.quickTouchTime;
      if (this.loop) {
        this.handleTouchend_loop(this.cartChange(this.moveDistance, isQuick));
      } else {
        this.updateInsideValue(this.cartChange(this.moveDistance, isQuick));
      }
      this.moveDistance = 0;
    },

    handleTouchmove_loop(translate) {
      if (this.loop) {
        return translate;
      }
      const leftBoundary = 0;
      const rightBoundary = -this.width * (this.length - 1);
      if (translate > leftBoundary) {
        return leftBoundary;
      }
      if (translate < rightBoundary) {
        return rightBoundary;
      }
      return translate;
    },

    handleTouchend_loop(deviation) {
      if (!this.loop) return;
      const newValue = this.insideValue + deviation;

      if (this.insideValue === 0 && newValue < this.insideValue) {
        this.setTranslate((-this.width * this.length) + this.moveDistance);
        setTimeout(() => {
          this.updateInsideValue(deviation);
        }, 40);
        return;
      }

      if (this.insideValue === this.length - 1 && newValue > this.insideValue) {
        this.setTranslate(this.width + this.moveDistance);
        setTimeout(() => {
          this.updateInsideValue(deviation);
        }, 40);
        return;
      }

      this.updateInsideValue(deviation);
    },

    updateInsideValue(deviation) {
      if (deviation === 0) {
        this.valueChangeHandler(deviation);
        return;
      }
      const newValue = this.insideValue + deviation;
      const chain = this.chain(
        this.updateInsideValue_loop,
        this.updateInsideValue_normal,
        newValue => { this.insideValue = newValue; },
      );

      chain(newValue);
    },

    updateInsideValue_loop(newValue) {
      if (!this.loop) return false;
      if (newValue < 0) {
        this.insideValue = this.length - 1;
        return 'done';
      }
      if (newValue > this.length - 1) {
        this.insideValue = 0;
        return 'done';
      }
      return false;
    },

    updateInsideValue_normal(newValue) {
      if (newValue < 0) {
        this.insideValue = 0;
        this.valueChangeHandler(0);
        return 'done';
      }
      if (newValue > this.length - 1) {
        this.insideValue = this.length - 1;
        this.valueChangeHandler(this.length - 1);
        return 'done';
      }

      return false;
    },

    cartChange(moveDistance, quick) {
      const absMove = Math.abs(moveDistance);
      const absMin = Math.abs(this.c_minMoveDistance);
      const strategies = {
        normal() {
          if (absMove < absMin) return 0;
          if (moveDistance > 0) return -1;
          if (moveDistance < 0) return 1;
          return 0;
        },
        quick() {
          if (absMove < 10) return 0;
          if (moveDistance > 0) return -1;
          if (moveDistance < 0) return 1;
          return 0;
        },
      };

      let stgy = 'normal';
      switch (true) {
        case (quick === true):
          stgy = 'quick';
          break;
        default:
          stgy = 'normal';
          break;
      }
      return strategies[stgy].apply(this);
    },

    valueChangeHandler(value) {
      this.duration();
      this.setTranslate(this.c_translatex);
    },

    autoChangeHandler() {
      if (this.c_isEnd) {
        this.setTranslate(this.width);
      }
      setTimeout(() => {
        this.insideValue = this.insideValue < this.length - 1
          ? this.insideValue + 1
          : 0;
      }, 40);
    },

    setTranslate(d) {
      if ('transform' in document.documentElement.style) {
        this.setTranslate = transform;
        this.setTranslate(d);
      } else {
        this.setTranslate = webkitTransform;
        this.setTranslate(d);
      }
      function transform(d) {
        this.$refs.wrapper.style.transform = `translate3d(${d}px, 0, 0)`;
        this.$refs.wrapper.style.transform = `webkikTranslate3d(${d}px, 0, 0)`;
      }
      function webkitTransform(el, d) {
        this.$refs.wrapper.style.webkitTransform = `translate3d(${d}px, 0, 0)`;
        this.$refs.wrapper.style.webkitTransform = `webkitTranslate3d(${d}px, 0, 0)`;
      }
    },

    duration() {
      this.moving = true;
      const el = this.$refs.wrapper;
      const speed = this.speed;
      el.style.transitionDuration = `${speed}ms`;
      el.style.webkitTransitionDuration = `${speed}ms`;
      el.style.transitionTimingFunction = 'ease-out';
      el.style.webkitTransitionTimingFunction = 'ease-out';

      clearTimeout(this.durationTimer);
      this.durationTimer = setTimeout(() => {
        el.style.transitionDuration = '';
        el.style.webkitTransitionDuration = '';
        this.moving = false;
      }, speed);
    },

    chain(...fns) {
      return (...args) => {
        for (let index = 0; index < fns.length; index += 1) {
          const result = fns[index](...args);
          if (result === 'done') break;
        }
      };
    },
  },
};
</script>

<style lang="postcss">
  .c-swipe{
    overflow: hidden;
  }

  .c-swipe-wrapper{
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .c-swipe-item{
    width: 100%;
    height: 100%;
    flex: none;
  }

  .c-swipe-pagination{
    position: relative;
    height: 0;
  }

  .c-swipe-pagination-bar{
    position: absolute;
    left: 0;
    right: 0;
    top: -12px;
    bottom: 0;
    height: 4px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .c-swipe-pagination-item{
    display: block;
    width: 8px;
    height: 4px;
    border-radius: 3px;
    background-color: rgb(181,181,181);
    margin: 0 3px;
    transition: all .1s;
  }

  .c-swipe-pagination-item.active{
    width: 20px;
    background-color: rgb(72,163,241);
  }
</style>
