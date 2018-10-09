<template>
  <div
    class="xjw-tab-wrap">
    <div class="xjw-tab-container">
      <div class="xjw-tab" :class="['xjw-tab-no-animate',{ scrollable }]" ref="nav">
        <slot></slot>
        <div class="xjw-tab-ink-bar" :class="barClass" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: {
    value: Number,
  },
  data () {
    return {
      direction: 'forward',
      right: '100%',
      hasReady: false,
      index: -1,
      currentIndex: this.index,
      number: this.$children.length
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReady = true
      }, 0)
    })

    if (this.value >= 0) {
      this.currentIndex = this.value
    }
    this.updateIndex()
  },
  methods: {
    updateIndex () {
      if (!this.$children || !this.$children.length) return
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].currentIndex = i
        if (children[i].currentSelected) {
          this.index = i
        }
      }
    },
    //运动
    scrollToActiveTab () {
      if (!this.scrollable || !this.$children || !this.$children.length) {
        return
      }
      const currentIndexTab = this.$children[this.currentIndex].$el
      let count = 0
      const step = _ => {
        const scrollDuration = 15
        const nav = this.$refs.nav
        nav.scrollLeft += (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) / scrollDuration
        if (++count < scrollDuration) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  },
  computed: {
    barLeft () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${this.currentIndex * (100 / count)}%`
      }
    },
    barRight () {
      if (this.hasReady) {
        const count = this.scrollable ? (window.innerWidth / this.$children[this.currentIndex || 0].$el.getBoundingClientRect().width) : this.number
        return `${(count - this.currentIndex - 1) * (100 / count)}%`
      }
    },
    barStyle () {
      return {
        left: this.barLeft,
        right: this.barRight
      }
    },
    barClass () {
      return {
        'xjw-tab-ink-bar-transition-forward': this.direction === 'forward',
        'xjw-tab-ink-bar-transition-backward': this.direction === 'backward'
      }
    },
    //长度大于4个
    scrollable () {
      return this.number > 4
    }
  },
  watch: {
    currentIndex (newIndex, oldIndex) {
      this.direction = newIndex > oldIndex ? 'forward' : 'backward'
      this.$emit('on-index-change', newIndex, oldIndex)
      this.hasReady && this.scrollToActiveTab()
    },
    index (val) {
      this.currentIndex = val
    },
    value (val) {
      this.index = val
    }
  },
}
</script>


<style lang="less">

@tab-text-active-color: #000;
@tab-bar-active-color: #000;
@tab-text-default-color: #000;
@tab-text-disabled-color: #000;
@prefixClass: xjw-tab;
@easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
@effect-duration: .3s;

.@{prefixClass} {

  &-ink-bar {
    position: absolute;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: @tab-bar-active-color;
    text-align: center;
    width: 90px;
    margin: 0 auto;

    &-transition-forward {
      transition: right @effect-duration @easing-in-out,
      left @effect-duration @easing-in-out @effect-duration * 0.3;
    }
    &-transition-backward {
      transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
      left @effect-duration @easing-in-out;
    }
  }

}

.xjw-tab-bar-top .@{prefixClass} {
  &-ink-bar {
    top: 0;
  }
}

.xjw-tab {
  display: flex;
  background-color: #fff;
  height: 60px;
  position: relative;
}

.xjw-tab .xjw-tab-item {
  display: block;
  flex: 1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
  background-size: 100% 1px;
  
  text-align: center;
  line-height: 44px;
  color: @tab-text-default-color;
}

.xjw-tab .xjw-tab-item.xjw-tab-selected {
  color: @tab-text-active-color;
  border-bottom: 3px solid @tab-text-active-color;
}

.xjw-tab-bar-top {
  .xjw-tab .xjw-tab-item {
    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) top left no-repeat;
    background-size: 100% 1px;
  }
  .xjw-tab .xjw-tab-item.xjw-tab-selected {
    border-bottom: none;
    border-top: 3px solid @tab-text-active-color;
  }
}

.xjw-tab .xjw-tab-item.xjw-tab-disabled {
  color: @tab-text-disabled-color;
}


.xjw-tab-item-badge {
  position: absolute;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
  display: inline-block;
  height: 18px;
  min-width: 18px;
  padding: 0 4px;
  border-radius: 30px;
  margin: auto 0 auto 4px;
  line-height: 18px;
  font-size: 11px;
  background-clip: padding-box;
  vertical-align: middle;
}

.xjw-tab-wrap {
  position: relative;
  padding-top: 44px;
  height: 20px;
}

.xjw-tab-container {
  height: 64px;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  position: absolute;
}

.scrollable {
  overflow-y: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 17px;
  box-sizing: content-box;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.scrollable .xjw-tab-ink-bar {
  display: block;
  height: 1px;
  bottom: 17px;
  position: absolute;
}

.scrollable .xjw-tab-item {
  flex: 0 0 22%;
  border: 0;
}

</style>
