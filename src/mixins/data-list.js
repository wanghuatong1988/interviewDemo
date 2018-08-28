
/**
 *  @适合普通列表切换
 *  @params restful ['列表接口','tabs接口'];
 *  @isTab 是否有tabs切换
 */
export default function(isTab, restful) {
    return {
        data() {
            return {
                dataList: [],
                tabList: [],
                //分页码
                query: {
                    pageNum: +this.$route.query.page || 1, //当前是第几页
                    pageSize: 15, //每页显示条目个数
                    totalRecord: 0 //总共有多少条
                },
                form: {}, //搜索列表
                tag: '', //tabs
                isSearch: false, //是否搜索过
                onceQuery: true, //页面进来加载query参数
                time:[], //时间
            };
        },
        created() {
            this.getTab().then(() => {
                this.getDataList();
            });
        },
        methods: {
            //时间格式的在不同浏览器的处理
            isBrowser() {
                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    return true;
                } else {
                    return false;
                }
            },
            //tab的点击事件
            tabClick(val) {
                this.query.pageNum = 1;
                this.resetBtn();
                this.getDataList();
            },
            //搜索的重置按钮
            resetBtn() {
                for (let v in this.form) {
                    if(Array.isArray(this.form[v])) {
                        this.form[v] = [];
                    }else if(Object.prototype.toString.call(this.form[v]) === '[object Object]') {
                        this.form[v] = {};
                    }else {
                        this.form[v] = '';
                    }
                }
                this.time = [];
            },
            //查询按钮
            searchBtn() {
                this.isSearch = true;
                this.query.pageNum = 1;
                this.getDataList();
            },
            //列表展示
            getDataList() {
                if(restful[0]) {

                    let strat_time = this.time[0] || '',
                        stop_time = this.time[1] || '';

                    if (this.isBrowser()) {
                        strat_time = strat_time ? strat_time.replace(new RegExp(/-/gm), "/") : '';
                        stop_time = stop_time ? stop_time.replace(new RegExp(/-/gm), "/") : '';
                    }

                    strat_time = strat_time ? new Date(strat_time).getTime() : '';
                    stop_time = stop_time ? new Date(stop_time).getTime() : '';

                    this.form.start_time = strat_time / 1000;
                    this.form.stop_time = stop_time / 1000;

                    this.$api.ajax({
                        type: "post",
                        url: this.$api.path+(restful[0] || ''),
                        data: Object.assign({}, this.form, {
                            tag: this.tag,
                            page: this.query.pageNum,
                            pageSize: this.query.pageSize
                        }, Object.keys(this.$route.query).length > 1 && this.onceQuery ? this.$route.query : {}),
                        successAll: res=> {
                            this.dataList = res.list;
                            this.query.totalRecord = +res.total;
                            if(this.onceQuery) {
                                this.onceQuery = false;
                            }
                        },
                        error: _=> {}
                    });
                }
            },
            //获取tab
            getTab() {
                return new Promise(resolve => {
                    if(isTab) {
                        this.$api.ajax({
                            type: "post",
                            url: this.$api.path+(restful[1] || ''),
                            success: res=>{
                                resolve();
                                this.tabList = res;
                                this.tag = this.$route.query.tag || res[0].tag_code;
                            },
                            error: _=> {}
                        });
                    }else {
                        resolve();
                    }
                });
            },
            //翻页
            handleCurrentChange(val) {
                this.query.pageNum = val;
                this.getDataList();
            },
            //离开时带走的所有参数
            pageParams() {
                let query = {};
                for(let v in this.form) {
                    query[v] = this.form[v] || ''
                }
                //查看是否需要带搜索参数
                if(this.isSearch) {
                    return Object.assign({}, query, {
                        tag: this.tag,
                        page: this.query.pageNum,
                    });
                }
            }
        }
    }
};
