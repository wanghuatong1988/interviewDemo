<template>
  <div class="xjw-tab-item" @click="onItemClick">
    <div class="info"><slot></slot></div>
  </div>
</template>

<script>
  export default {
    name: 'tab-item',
    data() {
      return {
        currentIndex: -1,
      }
    },
    mounted() {
      this.$parent.updateIndex()
    },
    methods: {
      onItemClick() {
        this.$parent.currentIndex = this.currentIndex
        this.$nextTick(_=> {
          this.$emit('on-item-click', this.currentIndex)
        })
      }
    },
    beforeDestroy() {
      const $parent = this.$parent
      this.$nextTick(_=> {
        $parent.updateIndex()
      })
    }
  }
</script>
