<template>
    <div class="tab-select">
        <div :class="[
            'tab-list',
            {'l_loca': location==='left'},
            {'r_loca': location==='right'},
            {[`h_sty_${data.length + 1}`]: direction === 'right' || direction === 'left'}]">
            <dl>
                <dt :class="[
                    {'upbox-active': (isUp && direction !== 'left' && direction !== 'right')},
                    {'rightbox-active': (isUp && direction === 'right')},
                    {'leftbox-active': (isUp && direction === 'left')},
                    {'dirleft': location === 'right' && direction === 'left'}
                    ]"
                    :style="{'background': bgColor}"
                    @click.stop.prevent="isUp=!isUp"></dt>
                <dd v-if=" direction !== 'left' && direction !== 'right'" :class="[
                            'ul_vertical_box',
                            {'h_hide': !isUp && direction !== 'left' && direction !== 'right'},
                            {[`h_show_${data.length}`]: isUp}]">
                    <ul :class="[
                            {'h_hide': !isUp && direction !== 'left' && direction !== 'right'},
                            {[`h_show_${data.length}`]: isUp},
                        ]">
                        <li v-for="(item, index) of data" :key="index" :style="{'background': bgColor}">
                            <div class="name">{{item.label}}</div>
                        </li>
                    </ul>
                </dd>
                <dd v-else :class="[
                    'ul_transverse_box',
                    {'m_15_l': direction === 'right'},
                    {'m_15_r': direction === 'left'},
                    {'w_hide': !isUp},{['w_show_'+ data.length +'']: isUp}]">
                    <ul :class="[
                            {'w_hide': !isUp},
                            {['w_show_'+ data.length +'']: isUp},
                        ]">
                        <li v-for="(item, index) of data" :key="index" @click.stop.prevent="changeList(item)" :style="{'background': bgColor}">
                            <div class="name">{{item.label}}</div>
                        </li>
                    </ul>
                </dd>
            </dl>
        </div>
        <slot/>

    </div>
</template>

<script>
/**
 *   @params location 摆放位置(左或者右) [left, right]
 *   @params direction 往哪个位置弹出(左边或者右边) [left, right]
 *   @params data 格式 {label: '场景', value: '1'}
 *   @params click 点击事件
 *   @params bgColor 主色调设置
 *   @params beforeClose(done) 关闭Dialog前回调
*/

export default {
    name: 'tab-select',
    props: {
        location: {
            type: String,
            default: 'right', //left, right
        },
        direction: String, // left , right
        data: [Array, Object],
        bgColor: {
            type: String,
            default: 'rgba(0,0,0,.6)'
        },
        value: String,
        beforeClose: Function,
    },
    data() {
        return{
            isUp: false,
            index: '',
        }
    },
    mounted() {
        document.onclick = (ev) => {
            this.$emit('input',this.index);
        }
    },
    methods: {
        changeList(item) {
            //this.$emit('update:value').value
            this.index = item.value;
            this.$emit('input', `${(new Date()).valueOf()}_${item.value}`);
        }
    },
    watch:{
        'isUp'(val) {
            if(!val) {
                this.$emit('input',this.index);
            }
        }
    }
}
</script>

<style>
    ul,li {
        margin: 0;
        padding: 0px;
        list-style-type: none;
        text-align: left;
    }
    .tab-select {
        background: url('http://www.030.cn/path/pdb/201801/5a1e84cdc4c1f.jpg!bpdb');
        background-size: cover;
        width: 100%;
        height: 100vh;
    }
    .tab-select .tab-list {
        position: absolute;
        top: 20px;
    }
    .tab-select .l_loca {
        left: 20px;
    }
    .tab-select .r_loca {
        right: 20px;
    }
    .tab-select .h_sty_1 { width: 48px; overflow: hidden; height: 48px}
    .tab-select .h_sty_2 { width: 126px; overflow: hidden; height: 48px}
    .tab-select .h_sty_3 { width: 189px; overflow: hidden; height: 48px}
    .tab-select .h_sty_4 { width: 252px; overflow: hidden; height: 48px}
    .tab-select .h_sty_5 { width: 315px; overflow: hidden; height: 48px}
    .tab-select .h_sty_6 { width: 378px; overflow: hidden; height: 48px}
    .tab-select .h_sty_7 { width: 441px; overflow: hidden; height: 48px}
    .tab-select .h_sty_8 { width: 504px; overflow: hidden; height: 48px}
    .tab-select .h_sty_9 { width: 567px; overflow: hidden; height: 48px}
    .tab-select .h_sty_10 { width: 630px; overflow: hidden; height: 48px}
    .tab-select .h_sty_11 { width: 693px; overflow: hidden; height: 48px}

    dl, dd {
        margin: 0;
        padding: 0;
    }
    .tab-list dl > dt {
        width: 48px;
        height: 48px;
        -background: rgba(0,0,0,.6);
        border-radius: 50%;
        position: relative;
    }
    .tab-list dl > dt::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        top: 4px;
        left: 12px;
        border-color: transparent transparent #fff transparent;
    }

    .tab-list dl > .w_hide{width: 0px;}
    .tab-list dl > .h_hide{height: 0px;}

    .tab-list dl > .h_show_1 {height: 63px}
    .tab-list dl > .h_show_2 {height: 126px}
    .tab-list dl > .h_show_3 {height: 189px}
    .tab-list dl > .h_show_4 {height: 252px}
    .tab-list dl > .h_show_5 {height: 315px}
    .tab-list dl > .h_show_6 {height: 378px}
    .tab-list dl > .h_show_7 {height: 441px}
    .tab-list dl > .h_show_8 {height: 504px}
    .tab-list dl > .h_show_9 {height: 567px}
    .tab-list dl > .h_show_10 {height: 630px}

    .tab-list dl > .w_show_1 {width: 63px}
    .tab-list dl > .w_show_2 {width: 126px}
    .tab-list dl > .w_show_3 {width: 189px}
    .tab-list dl > .w_show_4 {width: 252px}
    .tab-list dl > .w_show_5 {width: 315px}
    .tab-list dl > .w_show_6 {width: 378px}
    .tab-list dl > .w_show_7 {width: 441px}
    .tab-list dl > .w_show_8 {width: 504px}
    .tab-list dl > .w_show_9 {width: 567px}
    .tab-list dl > .w_show_10 {width: 630px}
     /**up**/
    .tab-list dl > .upbox-active::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        top: 18px;
        border-color: #fff transparent transparent transparent;
    }
    /**right**/
    .tab-list dl > .rightbox-active::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        top: 13px;
        left: 20px;
        border-color: transparent transparent  transparent #fff;
    }
    .tab-list .rightbox-active {
        float: left;
    }
    /**left**/
    .tab-list dl > .dirleft {
        float: right;
    }
    .tab-list dl > .leftbox-active::before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        top: 12px;
        left: 4px;
        border-color: transparent #fff transparent  transparent ;
    }
    .tab-list dl > .leftbox-active {
        float: right;
    }

    .tab-list dl > .ul_vertical_box{
        overflow: hidden;
        transition: height .5s ease-in-out;
    }
    .tab-list dl > .ul_transverse_box{
        overflow: hidden;
        transition: width .5s ease-in-out;
    }
    .tab-list dl > .m_15_l li {
        margin: 0 0px 0 15px !important;
    }
    .tab-list dl > .m_15_r li {
        margin: 0 15px 0 0 !important;
    }
    .tab-list dl > .ul_vertical_box li{
        width: 48px;
        height: 48px;
        -background: rgba(0,0,0,.6);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin: 15px 0 0 0;
        color: #fff;
        font-size: 12px;
        font-weight: normal;
    }
    .tab-list dl > .m_15_l {
        float: left;
    }
    .tab-list dl > .m_15_r {
        float: right;
    }
    .tab-list dl > .ul_transverse_box li{
        width: 48px;
        height: 48px;
        -background: rgba(0,0,0,.6);
        border-radius: 50%;
        position: relative;
        margin: 0px 0 0 15px;
        color: #fff;
        font-size: 12px;
        font-weight: normal;
        float: left;
        text-align: center;
        line-height: 48px;
    }
</style>
