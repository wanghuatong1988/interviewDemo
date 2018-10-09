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

      <!--搜索-->
      <div class="common-header">
        <ul>
          <li>
            <div class="label">订单号：</div>
            <div class="value">
              <el-input v-model="form.order_sn" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <div class="label">买家：</div>
            <div class="value">
              <el-input v-model="form.buy_name" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <div class="label">退款申请单：</div>
            <div class="value">
              <el-input v-model="form.refund_sn" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <div class="label">下单时间：</div>
            <div class="value">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="time" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </li>
          <li>
            <div class="label">来源商城：</div>
            <div class="value">
              <el-input v-model="form.mall_name" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <el-button @click.native="resetBtn">重置</el-button>
            <el-button type="primary" @click.native="searchBtn">搜索</el-button>
          </li>
        </ul>
      </div>

      <!--表格-->
      <div class="common-table">
            <table class="table_head">
                <thead>
                    <tr>
                        <td width="12%" align="center">id</td>
                        <td width="12%" align="center">用户名称</td>
                        <td width="12%" align="center">实体店名</td>
                        <td width="12%" align="center">地区</td>
                        <td width="50%" align="center">
                            <div class="pro-list-table">
                                <span>设备类型</span>
                                <span>设备号</span>
                                <span>时间</span>
                                <span>操作</span>
                            </div>
                        </td>
                    </tr>
                </thead>
            </table>
            <div>
                <table class="table_main">
                    <tbody>
                        <tr v-for="(item, index) of dataList" :key="index">
                            <td width="12%" align="center">
                                {{item.id}}
                            </td>
                            <td width="12%" align="center">
                                {{item.account}}
                            </td>
                            <td width="12%" align="center">
                                {{item.entity_name}}
                            </td>
                            <td width="12%" align="center">
                                {{item.region}}
                            </td>
                            <td width="50%" v-if="item.hardware_list.length">
                                <div class="pro-list-table" v-for="(itx, idx) of item.hardware_list" :key="idx">
                                    <span>
                                        {{itx.client}}
                                    </span>
                                    <span>
                                        {{itx.meid}}
                                    </span>
                                    <span>
                                        <times :time="itx.created" />
                                    </span>
                                    <span>
                                        <el-button plain size="small" @click="untie(itx.id, item.id)">解绑</el-button>
                                        <el-button plain size="small" @click="locking(itx.id, item.id)"><em v-if="+itx.lock === 0">锁定</em><em v-else>解锁</em></el-button>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <el-pagination
                v-if="+query.totalRecord > +query.pageSize - 1"
                @current-change="handleCurrentChange"
                :current-page.sync="query.pageNum"
                :page-size="query.pageSize"
                background
                layout="prev, pager, next"
                :total="query.totalRecord">
            </el-pagination>
            <nothing :state="load_flag"/>
        </div>

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
            query: {//分页码
                pageNum: 1, //当前是第几页
                pageSize: 15, //每页显示条目个数
                totalRecord: 0 //总共有多少条
              },
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
              },
              $api: {
                url: {
                  dealerLockHardware: 'wew',
                }
              },
              load_flag: false,
          }
      },
      created() {
          //scope.$index    获取行的index
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

        this.$confirm('是否确定锁定！', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$api.ajax({
                type: 'post',
                url: this.$api.url.dealerLockHardware,
                data: {},
                successAll: res => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                }
            });
        }).catch(() => { });
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
        },
        handleCurrentChange() {

        },
        searchBtn() {

        }

      },
  }
</script>

<style lang="sass" scoped>
// .element-ui{
//   .common-table {
//     .table_head {
//         td {
//             padding: 15px 20px;
//             .pro-list-table {
//                 display: flex;
//                 align-items: center;
//                 span {
//                     &:nth-child(1) {
//                         flex: 1;
//                     }
//                     flex: 0 0 25%;
//                 }
//             }
//         }
//         font-weight: bold;
//         color: #000;
//         border: 1px solid #eee;
//         background: #f5f7fa;
//         margin: 0 0 0 0;
//     }
//     .table_main {
//       tbody {
//           border-left: 1px solid #eee;
//           border-right: 1px solid #eee;
//           border-bottom: 1px solid #eee;
//           overflow: hidden;
//           td {
//               padding: 15px 20px;
//               border: 1px solid #eee;
//               border-top: 0;
//               .pro-list-table {
//                   display: flex;
//                   align-items: center;
//                   span {
//                       &:nth-child(1) {
//                           flex: 1;
//                       }
//                       // &:last-child {
//                       //     border-right: 0;
//                       // }
//                       // border-right: 1px solid #eee;
//                       flex: 0 0 25%;
//                   };
//                   text-align: center;
//               }
//           }
//       }
//     }
//   }
// }
</style>
