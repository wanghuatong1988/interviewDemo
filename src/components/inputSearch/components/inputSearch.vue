<template>
    <div class="input-search-box" @click="popChange">
        <div class="search-box" @click="show =!show;textValue=''" :style="{width: width + 'px'}">
            <span>{{ title|| '请选择'}}</span>
            <i :class="{iconActive: show}"></i>
        </div>
        <transition name="fade">
            <div class="input-box" v-show="show" :style="{width: width + 'px'}">
                <div class="inputStyle" v-if="visibleInput">
                    <input type="input" v-model="textValue"  placeholder="请输入搜索内容"/>
                </div>
                <ul class="ul-box" @mouseleave="mouseLeaveList">
                    <li v-for="(item,index) in data" @mouseover="liHandler(index)"  :class="{selectLi: index == itemIndex}" @click="selectLiHandler()">
                        {{item.label}}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
/**
    @getSearchName 获取搜索内容
    @data 数据格式 [{label: '飞机', value: 1}]
**/

export default {
    name: 'input-search',
    props: {
        width: {//设置选择框长度
            type: [String, Number],
            default: 210,
        },
        value: {
            type: [String, Number],
            default: ''
        },
        data: {//数据
            type: [Array],
            default: ''
        },
        visibleInput: {
            type: [Boolean],
            default: true
        }
    },
    data() {
        return{
            show: false,
            itemIndex: -1,
            textValue: '',
            title:''
        }
    },
    mounted() {
        //全局监听上下键
        document.onkeydown = (ev) => {
            this.keyupChange(ev);
        }

        document.onclick = (ev) => {
            this.show = false;
        }
    },
    methods: {
        liHandler(index) {
            this.itemIndex = index;
        },
        mouseLeaveList() {
            this.itemIndex = -1;
        },
        keyupChange(ev) {
            const e = ev || window.event;
            if(e.keyCode == 40) {
                if(this.itemIndex === this.data.length - 1) {
                    this.itemIndex = 0;
                } else {
                    this.itemIndex++;
                }
            }
            if(e.keyCode == 38) {
                if(this.itemIndex === 0) {
                    this.itemIndex = this.data.length - 1;
                } else {
                    this.itemIndex--;
                }
            }
            if(e.keyCode == 13 && this.itemIndex != -1) {
                this.selectLiHandler();
            }
        },
        selectLiHandler() {
            this.$emit('input', this.data[this.itemIndex]['value']);
            this.title = this.data[this.itemIndex]['label'];
            this.show = false;
        },
        popChange(ev) {
            const e = window.event || ev;
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
        }
    },
    watch: {
        'textValue': function(val) {
            if(val) {
                this.$emit('getSearchName',val);
            }
        },
    }
}
</script>

<style scoped>
    ul,li {
        margin: 0;
        padding: 0px;
        list-style-type: none;
        text-align: left;
    }
    .input-search-box {
        font-size: 12px;
        position: relative;
    }
    .input-search-box .search-box{
        height: 35px;
        border: 1px solid #DCDFE6;
        border-radius: 3px;
        background: #fff;
        line-height: 35px;
        padding: 0 10px;
        position: relative;
        text-align: left;
    }
    .input-search-box .search-box:hover {
        border: 1px solid #C0C4CC;
        cursor: pointer;
    }
    .input-search-box .search-box span {
        width: -webkit-calc(100% - 10px);
        width: calc(100% - 10px);
        display: block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .input-search-box .search-box i {
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #ccc transparent transparent transparent;
        position: absolute;
        bottom: 7px;
        right: 10px;
    }
    .input-search-box .search-box .iconActive {
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: transparent transparent #ccc transparent;
        position: absolute;
        bottom: 13px;
        right: 10px;
    }
    .input-search-box .input-box {
        border: 1px solid #C0C4CC;
        border-radius: 3px;
        position: absolute;
        top: 38px;
        left: 0;
        padding: 10px;
        overflow: hidden;
    }
    .input-search-box .inputStyle {
        width: 100%;
        height: 35px;
        border: 1px solid #409EFF;
        border-radius: 4px;
        margin: 0 0 5px 0;
    }
    .input-search-box .inputStyle input[type="input"] {
        width: 96%;
        outline: none;
        border: 0;
        height: 33px;
        line-height: 33px;
        margin: 0 auto;
        display: block;
    }
    .input-search-box .input-box .ul-box {
        width: 100%;
        margin: 0 auto;
    }
    .input-search-box .input-box .ul-box li {
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        padding: 0 10px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    ::-webkit-input-placeholder {color:#C0C4CC;}
　　:-moz-placeholder {color:#C0C4CC;}
　　::-moz-placeholder {color:#C0C4CC;}
　　:-ms-input-placeholder {color:#C0C4CC;}

    .fade-enter-active,
    .fade-leave-active {
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        transition: all  .5s;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }
    .selectLi {
        background: #e4e4e4;
        border-radius: 4px;
    }
</style>
