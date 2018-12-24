<template>
  <div style="width:250px;overflow:hidden;margin:250px auto;">
    <ct-select
      v-model="text"
      :data="dataList"
      @getSearchName="getName">
      <ct-option
        v-for="(item, index) of dataList"
        :key="index"
        :value="item.value"
        :label="item.label"
        :index="index">
      </ct-option>
    </ct-select>

    <!-- <colorPicker v-model="color" /> -->
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios';

  export default {
      name: '',
      data() {
          return{
              text: '',
              dataList:[],
              color: '#000'
          }
      },
      mounted() {
        axios.get('/v2/book/search?q=vue&alt=json&start=1&count=45')
        .then((data)=>{
            this.dataList = [];
            for(let v of data.data.books) {
              this.dataList.push({
                value: v.id,
                label: v.title
              })
            }
        })
        .catch(function(error){
            console.log(error);
        });
      },
      methods: {
        getTextHandler() {
          console.log(this.text);
        },
        getName(val) {
            axios({
              method:'POST',
              url:'/v2/book/search',
              data:{
                  q: val,
                  alt:'json',
                  start: 1,
                  count: 15
              }
            }).then((data)=>{
                this.dataList = [];
                for(let v of data.data.books) {
                  this.dataList.push({
                    value: v.id,
                    label: v.title
                  })
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
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
