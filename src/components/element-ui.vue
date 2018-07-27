<template>
  <div class="element-ui">
      <!--提示-->
      <el-button type="primary" :loading="loading.query" @click="send">发送按钮</el-button>
      <el-button type="success" @click="dialogVisible = true">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>

      <!--弹窗-->

      <el-dialog
          title="审核"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          before-close="close"
          width="300px">
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="examineCuase">确 定</el-button>
          </span>
      </el-dialog>


      <!--发送参数值最少是三个-->
      <router-link :to="{
              path: '/orders/list/detail',
              query: Object.assign({},pageParams(),{
                  order_sn: item.order_sn,
                  tag: tag,
                  isOrder: form.order_sn ? '1' : '0'
              })}">
          <el-button type="primary" size="mini">查看详情</el-button>
      </router-link>

      <!--tips-->
      <el-popover placement="bottom" trigger="hover">
          <div style="line-height:25px;">
              你好<br/>
              知道吗
          </div>
              <span slot="reference">
                  小子 <i class="el-icon-info"></i><br/>
              </span>
      </el-popover>
  </div>
</template>

<script type="text/javascript">

  import axios from 'axios';
  export default {
      name: 'element-ui',
      components: {

      },
      props: {

      },
      data() {
          return {
              loading: {
                query: false,
                query_seq_1: false,
                query_seq_2: false,
                query_seq_3: false,
              },
              dialogVisible: false,


              //做个兼容处理
              item: {
                order_sn: 1654654156,
              },
              tag: 'all',
              form: {
                order_sn: '',
              }
          }
      },
      created() {

      },
      mounted() {
        this.$message({
            message: '退款原因必填！',
            type: 'warning'
        });
        this.$message({
            message: '退款成功！',
            type: 'success'
        });
      },
      methods: {
        send() {
            this.loading.query = true;
            axios({
              method:'POST',
              url:'/v2/book/search',
              data:{
                  q: 'jquery',
                  alt:'json',
                  start: 1,
                  count: 15
              }
            }).then((data)=>{
                this.loading.query = false;
            })
            .catch(function(error){
                this.loading.query = false;
            });
        },
        close(done) {
          done();
        },
        pageParams() {
            return {};
        },
        //返回
        goBack() {
            if(Object.keys(this.$route.query).length > 1) {
                this.$router.push({
                    path: '/orders/list',
                    query:  Object.assign({},this.$route.query, {
                        order_sn: +this.$route.query.isOrder ? this.$route.query.order_sn : '',
                    })
                })
            } else {
                this.$router.push({
                    path: '/orders/list'
                })
            }
        }

      },
  }
</script>

<style lang="scss" scopd>

</style>
