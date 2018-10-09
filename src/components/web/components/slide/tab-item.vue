<template>
  <a class="ly-tab-item"
       :style="$parent.value === id ? activeStyle : {}"
       @click="onItemClicked">
    <div class="ly-tab-item-label"><slot></slot></div>
  </a>
</template>

<script>

export default {
  name: 'LyTabItem',
  computed: {
    activeStyle () {
      return {
        color: this.$parent.activeColor,
        borderColor: this.$parent.activeColor,
        borderWidth: this.$parent.lineWidth,
        borderBottomStyle: 'solid'
      }
    }
  },
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  },
  methods: {
    onItemClicked () {
      this.$parent.$emit('input', this.id)
    }
  }
}
</script>

<style lang="less">
.ly-tab-item {
  text-decoration: none;
  text-align: center;
  .ly-tab-item-label {
    margin: 0 auto 10px;
    line-height: 18px;
  }
}
</style>
