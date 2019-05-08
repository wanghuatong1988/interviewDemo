<template>
  <div class="element-ui">

      <!--
        在使用 element ui 的el-table 组件时，表头进行v-if判断来动态显示，正常来说这样的操作时没得任何毛病的，
        但是如果在这基础上使用 <template slot-scope="scope"> 操作的话表头一旦切换就会报错
        这是因为在v-for或者v-if切换标签时，多个相同的标签被渲染，如果不添加key来区分则会出现复用的情况。
        而原本这些标签每一个都是独立的，故，需要添加key来做区分！
        <el-table :key="1" v-if="a"></el-table>
        <el-table :key="2" v-else></el-table>
      -->
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
          :before-close="close"
          width="300px">
          <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="examineCuase">确 定</el-button>
          </span>
      </el-dialog>

      <!---->
      <el-switch v-model="is_nav" @change="tabNav($event, '默认change只有一个传,想传多个只需要把那个参数变为$event,因为内联语句支持')"></el-switch>

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
              <el-input v-model="form.order_sn" spellcheck="false" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <div class="label">买家：</div>
            <div class="value">
              <el-input v-model="form.buy_name" spellcheck="false" @keyup.enter.native="searchBtn"></el-input>
            </div>
          </li>
          <li>
            <div class="label">退款申请单：</div>
            <div class="value">
              <el-input v-model="form.refund_sn" spellcheck="false" @keyup.enter.native="searchBtn"></el-input>
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
      </div>

      <!--form-->

      <div class="common-table">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="邮箱地址：" prop="email">
            <el-input v-model="ruleForm.email" spellcheck="false" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password" :required="!$route.params.id">
              <el-input v-model="ruleForm.password" spellcheck="false" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="repassword" :required="!$route.params.id">
              <el-input v-model="ruleForm.repassword" spellcheck="false" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
              <el-input type="textarea" spellcheck="false" :rows="2" placeholder="请输入内容" v-model="ruleForm.job_title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model="ruleForm.sort" spellcheck="false" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--自带loading加载-->
      <el-table border style="width: 100%" v-loading="load_flag" element-loading-text="正在加载中。。。。"></el-table>

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
              is_nav: true,

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

              form: {
                id: '',
                name: '',
                sort: '',
                icon: '',
                attributes: []
              },

              ruleForm: {
                account: '',
                mobile: '',
                username: '',
                email: '',
                job_title: '',
                status: 1,
                sort: '',
                role_id: '',
              },

              rules: {
                account: [
                    { required: true, message: "请输入账户", trigger: "blur" }
                ],
                username: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                role_id: [
                    { required: true, message: "请选择管理员角色", trigger: "change" }
                ],
                mobile: [
                    { required: true, validator: this.validateMobile, trigger: "blur" }
                ],
                sort:  [
                    { required: true, validator: this.validateSort, trigger: "blur" }
                ],
                email: [
                    { required: false, validator: this.validateEmail, trigger: "blur" }
                ],
                password: [
                    { required:!this.$route.params.id, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    { validator: (rule, value, callback)=>{
                        if(this.ruleForm.repassword) {
                            if(value != this.ruleForm.repassword) {
                                callback(new Error("密码不一致"));
                            }
                        }
                        callback();
                    }, trigger: "blur" }
                ],
                re_password: [
                    { required:!this.$route.params.id, message: '确认密码不能为空', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
                    { validator: (rule, value, callback)=>{
                        if(this.ruleForm.password) {
                            if(value != this.ruleForm.password) {
                                callback(new Error("密码不一致"));
                            }
                        }
                        callback();
                    }, trigger: "blur" }
                ],
              }
          }
      },
      created() {
           //<el-form> 单独移除某个表单验证 role_id 是某个字段
           //this.$refs.form.validateField('role_id');
          //scope.$index    获取行的index

          /*

            if(row){
              let arr = [];
              for(let v of row.attributes) {
                arr.push(v.id);
              }
              this.form = {
                id: row.id,
                name: row.name,
                sort: row.sort,
                icon: row.icon,
                //attributes: [...arr], (正确)
              }

              //this.form.attributes = [...arr],   (错误)
              this.attributeList = row.attributes;
            }

            像这种赋值操作不要把某个单独拎出来操作
            比如如果把attributes拎出上面的this.form已经重新
            赋值过了就等于对象里没有attributes
            这就会破坏他原有的数值
            再赋值的话数据已无法响应
          */
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

        },
        validateMobile(rule, value, callback) {
            if (value === "") {
                callback(new Error("请输入手机号码"));
            } else if (!this.$fn.validate('mobile',value)) {
                callback(new Error("手机输入有误"));
            }
            callback();
        },
        validateSort(rule, value, callback) {
            if (value === "") {
                callback(new Error("请输入排序"));
            } else if (!/^([0]|[1-9]([0-9]+)?)$/.test(value)) {
                callback(new Error("排序输入有误"));
            }
            callback();
        },
        validateEmail(rule, value, callback) {
            if (!/^(\w*)@[a-z1-9]*\.(\w+)$/.test(value) && value) {
                callback(new Error("邮箱输入有误"));
            }
            callback();
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {

                    if (this.ruleForm.password !== this.ruleForm.repassword) {
                        this.$message({
                            message: "密码不一致",
                            type: "warning"
                        });
                        return false;
                    }
                } else {
                    return false;
                }
            });
        },
        tabNav(isflag, name) {

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
