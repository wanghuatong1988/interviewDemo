<template>
    <div @click.stop.prevent
        :class="['tab-pane', {'tab-min-height': isShow}]"
        v-if="isShow"
        :style="{'background': $parent.bgColor}">
        <div class="close" @click="close"></div>
        <div class="pane-content" >
            <slot/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'tab-pane',
    props: {
        label: String,
        name: [String, Number],
    },
    data() {
        return{
            isShow: false,
        }
    },
    methods: {
        close() {
            if(typeof this.$parent.beforeClose === 'function') {
                this.$parent.beforeClose(this.closeFn);
            }else {
                this.isShow = false;
            }
        },
        closeFn() {
            this.isShow = false;
        }
    },
    watch: {
        '$parent.value'(val) {
            this.isShow = (this.name !== val.split('_')[1]) ? false : true;
        },
    }
}
</script>

<style>
    @keyframes movedown{
        0%   {
            transform:translate3d(0,0,0);
            opacity: 0;
        }
        100% {
            transform:translate3d(0,250,0);
            opacity: 1;
        }
    }
   .tab-pane {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 666666;
        font-size: 12px;
        color:#fff;
        overflow: hidden;
        height: 250px;
   }
   .tab-min-height {
        animation:movedown 0.8s alternate forwards;
        -webkit-animation:movedown 0.8s alternate forwards;
   }
   .close {
       background: url('../../assets/pdb_close.png');
       background-size: cover;
       width: 24px;
       height: 24px;
       position: absolute;
       top: 5px;
       right: 5px;
       z-index: 666666;
   }
</style>
