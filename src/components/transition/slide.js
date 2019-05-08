
let h, flag = true;

export default {
    name: 'transition',
    functional: true,
    render (createElement, context) {
        let data = {
            on: {
                //进入之前
                beforeEnter (el) {
                },
                //进入
                enter(el) {
                    if(flag) {
                        h = el.clientHeight;
                        flag = false;

                    }
                    el.style.height = '0px';
                    el.style.overflow = 'hidden';
                    el.style.transition = 'height 100ms';
                },
                //进入后
                afterEnter(el) {
                    el.style.height = h + "px";
                },
                //离开之前
                beforeLeave(el) {
                    el.style.height = '0px';
                },
                //离开
                leave(el) {
                },
                //离开之后
                afterLeave (el) {
                }
            }
        };
        return createElement('transition', data, context.children)
    }
}
