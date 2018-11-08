<template>
  <div>
    <tab-select
      v-model="tabValue"
      location="left"
      direction="right"
      :data="tabList">
      <tab-pane label="场景" name="1">场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/>场景<br/></tab-pane>
      <tab-pane label="灯饰" name="2">灯饰</tab-pane>
      <tab-pane label="购物" name="3">购物</tab-pane>
      <tab-pane label="历史" name="4">历史</tab-pane>
      <tab-pane label="帮助" name="5">帮助</tab-pane>

      <tab-check v-model="lovingVue"></tab-check>

      <tab-input v-model="val_input"></tab-input>
    </tab-select>
  </div>
</template>

<script type="text/javascript">

  import tabSelect from './tabSelect/tab-select';
  import tabPane from './tabSelect/tab-pane';
  import tabCheck from './tabSelect/tab-check';
  import tabInput from './tabSelect/tab-input';

  export default {
      name: '',
      components: {
        tabSelect,
        tabPane,
        tabInput,
        tabCheck
      },
      props: {
      },
      data() {
          return{
              //最多十个tabs
              tabList: [
                {label: '场景', value: '1'},
                {label: '灯饰', value: '2'},
                {label: '购物', value: '3'},
                {label: '历史', value: '4'},
                {label: '帮助', value: '5'},
              ],
              tabValue: '',
              lovingVue: '',
              val_input: '',
          }
      },
      created() {

      },
      mounted() {
        
      },
      methods: {

      },
      watch: {
         lovingVue(val) {
           console.log(val);
         },
         val_input(val) {
           console.log(val);
         }
      }
  }
</script>

<style lang="scss">
	ul,li {
	  margin: 0;
	  padding: 10px;
	  list-style-type: none;
	}
  html {
    margin:0;
    padding:0;
  }
  body {
    margin: 0;
  }
  #app {
    padding:0;
    margin: 0;
  }
</style>
