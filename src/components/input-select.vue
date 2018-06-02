<template>
  <div>
    <input-search
      v-model="text"
      @getSearchName="getName"
      :data="dataList"
      :autoQuery="true">
    </input-search>
  </div>
</template>

<script type="text/javascript">

  import axios from 'axios';

  export default {
      name: '',
      components: {
      },
      props: {
      },
      data() {
          return{
              text: '',
              dataList:[],
          }
      },
      created() {

      },
      mounted() {
        axios.get('/v2/book/search?q=jquery&alt=json&start=1&count=20')
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
            //axios.get('/v2/book/search?q=" + val + "&alt=json&start=1&count=10')
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
