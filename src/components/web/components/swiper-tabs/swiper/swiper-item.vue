<template>
  <div class="c-swipe-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'swiper-item',
  mounted() {
    this.$parent.init();
  },
};
</script>
