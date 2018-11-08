<template>
    <div>
        <input type="checkbox" :checked="checked" @change="$emit('change',$event.target.checked)">
    </div>
</template>

<script>

export default {
    name: 'tab-siblings',
    props: {
        checked: Boolean
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    data() {
        return{
        }
    },
    mounted() {
        console.log(this.$root);
    },
    methods: {

    },
    watch: {
      
    }
}
</script>

<style>

</style>
