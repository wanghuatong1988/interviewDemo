<template>
  <div class="promise">
    获取的是值是：{{text}}
    <input-search
      v-model="text"
      @getSearchName="getName"
      :data="dataList">
    </input-search>
  </div>
</template>



<script type="text/javascript">
  import axios from 'axios';

  export default {
      name: '',
      props: {
      },
      data() {
          return{
              text: '',
              dataList:[]
          }
      },
      created() {

      },
      methods: {
        getTextHandler() {
          console.log(this.text);
        },
        getName(val) {
          axios.get("/v2/book/search?q=" + val + "&alt=json&start=1&count=10")
          .then((data)=>{
              this.dataList = [];
              for(let v of data.data.books) {
                this.dataList.push({
                  value: v.id,
                  label: v.title
                })
              }
          })
        }
      }
  }
</script>

