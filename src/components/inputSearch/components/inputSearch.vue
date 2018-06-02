<template>
    <div class="input-search-box"  @click.stop.prevent>
        <div class="search-box" @click="show =!show;textValue=''" :style="{width: width + 'px'}">
            <span>{{ title|| '请选择'}}</span>
            <i :class="[{'icon':!show}, {'iconActive': show}]"></i>
        </div>
        <transition name="fade">
            <div class="input-box" v-show="show" :style="{width: width + 'px'}">
                <div class="inputStyle" v-if="visibleInput">
                    <input ref="inputblur" type="input" v-model="textValue" @keyup.enter="searchBtn" @keyup="clearStatus" @focus="getValue" placeholder="请输入搜索内容"/>
                </div>
                <div class="data-list-box" :style="{ 'height': (data.length > 10 ? scrollHeight : (data.length < 2 ? 160 : data.length * hLi)) + 'px' }">
                    <div class="data-scroll" v-if="data.length">
                        <ul class="ul-box" ref="ulbox" :style="{ 'height': (data.length * hLi) + 'px' }">
                            <li v-for="(item,index) in data" @mouseover="liHandler(index)"  :class="{selectLi: index == itemIndex}" @click="selectLiHandler()">
                                {{item.label}}
                            </li>
                        </ul>
                        <div class="scroll-box" v-if="data.length > 10" :style="{ 'height': (data.length > 10 ? scrollHeight : data.length * hLi) + 'px' }">
                            <scroll-into-view/>
                        </div>
                    </div>
                    <div v-else class="tiptxt">无数据</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
/**
 *   @params getSearchName      获取搜索文本
 *   @params data               数据格式 [{label: '飞机', value: 1}]
 *   @params visibleInput       是否隐藏搜索框
 *   @params autoQuery          是否输入后就触发
*/

import scrollIntoView from './scroll-into-view.js';

export default {
    name: 'input-search',
    components: {scrollIntoView},
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
        },
        autoQuery: {
            type: [Boolean],
            default: false
        }
    },
    data() {
        return{
            show: false,
            itemIndex: -1, //是否选中列表
            textValue: '',
            title:'',
            isCode_40_38: false,
            scrollHeight: 320,
            hLi: 32,
            isFlag: true,
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
        keyupChange(ev) {
            const e = ev || window.event;
            if(this.data.length) {
                if(e.keyCode === 40) { //向下
                    this.isCode_40_38 = true;
                    this.$refs.inputblur.blur();
                    this.isFlag = true;
                    if(this.itemIndex === this.data.length - 1) {
                        this.itemIndex = this.data.length - 1;
                    } else {
                        this.itemIndex++;
                    }
                }
                if(e.keyCode === 38) { // 向上
                    this.isCode_40_38 = true;
                    this.$refs.inputblur.blur();
                    this.isFlag = true;
                    if(this.itemIndex === 0) {
                        this.itemIndex = 0;
                    } else {
                        this.itemIndex--;
                    }
                }

                //选中下拉列表内容触发
                if(e.keyCode === 13 && this.itemIndex !== -1 && this.isCode_40_38 && this.isFlag) {
                    this.selectLiHandler();
                }
            }
        },
        selectLiHandler() {
            this.$emit('input', this.data[this.itemIndex]['value']);
            this.title = this.data[this.itemIndex]['label'];
            this.textValue = '';
            this.show = false;
            this.isCode_40_38 = false;
        },
        searchBtn(){
            if(this.textValue && this.autoQuery) {
                this.itemIndex = -1;
                this.$emit('getSearchName', this.textValue);
            }
        },
        clearStatus(){
            this.isFlag = false;
        },
        getValue() {
            this.isFlag = false;
        }
    },
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
        width: -webkit-calc(100% - 15px);
        width: calc(100% - 15px);
        display: block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        float: left;
    }
    .input-search-box .search-box i {
        width: 0;
        height: 0;
        border: 6px solid transparent;
        position: relative;
        display: block;
        float: left;
    }
    .input-search-box .search-box i::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 4px solid transparent;
    }
    .input-search-box .search-box .icon {
        border-color: transparent transparent #ccc transparent;
        margin: 8px 0 0 0px;
    }
    .input-search-box .search-box .icon::before {
        border-color: transparent transparent #fff transparent;
        top: -2px;
        left: -4px;
    }
    .input-search-box .search-box .iconActive {
        border-color:#ccc transparent transparent transparent;
        margin: 15px 0 0 0;
    }
    .input-search-box .search-box .iconActive::before {
        border-color:#fff transparent transparent transparent;
        top: -6px;
        left: -4px;
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

    .data-list-box {
        border: 1px solid #C0C4CC;
        border-radius: 4px;
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
    }
    .input-search-box .input-box .ul-box {
        width: 210px;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }
    .scroll-box {
        width: 6px;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 6;
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
    .input-search-box .input-box .tiptxt {
        color: #C0C4CC;
        text-align: center;
        height: 160px;
        line-height: 35px;
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
    }
</style>
