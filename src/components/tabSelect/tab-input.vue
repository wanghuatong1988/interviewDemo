<template>
    <div>
        <label>
            很多时间我们想监听input的事件比如foucs但是他里面的<br/>
            结构可能被改变了，在这个组件上是写监听事件是会无效的
  <input
    v-bind="$attrs"
    :value="value"
    v-on="inputListeners"
  >
</label>
    </div>
</template>

<script>

export default {
    inheritAttrs: false,
    name: 'tab-input',
    props: ['label', 'value'],
    data() {
        return{
        }
    },
    mounted() {
        
    },
    methods: {

    },
    watch: {
      
    },
    computed: {
        inputListeners() {
            let vm = this;
            return Object.assign({},
                this.$listeners,
                {
                    input: function(event) {
                        vm.$emit('input', event.target.value);
                    }
                }
            )
        }
    }
}
</script>

<style>

</style>
