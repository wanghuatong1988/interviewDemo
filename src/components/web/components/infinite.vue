<template>
    <div class="infinite" ref="infinite">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "infinite",
        props: {
            disabled: Boolean, //开关
            offset: { //下偏移量
                type: [Number, String],
                default: 10
            },
        },
        data() {
            return {
                main: {
                    normal:true //当缓存页面离开时设为false，禁止请求
                }
            };
        },
        computed: {

        },
        created() {

        },
        mounted() { //非缓存页面，初始化绑定
            if(!this.$route.meta.keep) this.bind();
        },
        activated() { //缓存页面，初始化绑定
            this.bind();
        },
        deactivated() { //缓存页面，离开解绑
            this.unbind();
        },
        destroyed() { //非缓存页面，销毁解绑
            this.unbind();
        },
        methods: {
            bind() { //绑定
                this.main.normal=true;
                document.addEventListener('scroll', this.scroll);
                this.scroll();
            },
            unbind() { //解绑
                this.main.normal=false;
                document.removeEventListener('scroll', this.scroll);
            },

            // 绑定滚动事件
            scroll() {
                if(this.disabled) return false;
                setTimeout(() => {
                    this.check();
                }, 500);
            },

            // 检测位置是否滚动到
            check() {
                if (!this.$refs.infinite) return false;
                if(this.disabled) return false;
                if(!this.main.normal) return false;
                var win_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var scroll = this.getScrollTop();
                var height = this.$refs.infinite.offsetTop + this.$refs.infinite.offsetHeight;
                if (scroll >= height - parseInt(this.offset) - win_height) {
                    this.$emit('infinite');
                }
            },

            // 获取滚动位置
            getScrollTop() {
                return parseInt(document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop);
            }
        },
        watch: {
            disabled(val) { //监控开关，
                if (val) return false;
                this.scroll();
            }
        }
    };
</script>