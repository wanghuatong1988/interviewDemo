//求两点之间的距离 勾股定理  
function getDistance(a, b) {
    let x = b.pageX - a.pageX,
        y = b.pageY - a.pageY;
    return Math.sqrt((x * x) + (y * y));
}

//求旋转角度 反三角函数
function getAngle(a, b) {
    let x = a.pageX - b.pageX,
        y = a.pageY - b.pageY;
    return Math.atan2(y, x) * 180 / Math.PI;
}

export default {
    bind(el, binding, vnode) {
        let type = binding.arg, 
            start = [], //记录手指按下位置
            now = [], //记录当前移动距离 
            //双指
            double = {
                obj : {},
                scale : 1, //缩放
                old_scale : 1, //记录每次缩放
                rotation : 0, //旋转度数
                old_rotation : 0, //记录每次旋转
                isTouch : true, // 是否开始touch事件

            },
            //单指
            single = {
                pageX: 0,
                pageY: 0,
                left: 0,
                right: 0,
                isTouch: true,
            }

        el.addEventListener('touchstart', (e)=>{
            
            if(Object.keys(e.touches).length >= 2 && Object.keys(e.targetTouches).length >=2 ) {
                double.isTouch = true;
                single.isTouch = false;
            }

            start = e.touches;
            el.style.border = '1px dashed #e2e2e2';
            if(start.length >= 2 && double.isTouch) { //双指按下
                if(binding.arg === 'doubleStart') {
                    binding.value(start);
                }
                // old_scale = +scale;
                // old_rotation = +rotation;
                double.old_scale = +(double.obj.scale || 1);
                double.old_rotation = +(double.obj.rotation || 0); 
            }else if( start.length === 1 && single.isTouch) { //单指按下
                single.pageX = start[0].pageX;
                single.pageY = start[0].pageY;
                single.left = el.offsetLeft;
                single.top = el.offsetTop;
            }
        }, false);

        el.addEventListener('touchmove', (e)=>{
            
            now = e.touches;
            if(e.preventDefault){
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
            if(now.length >= 2 && double.isTouch) { //双指按下
                double.scale = getDistance(now[0], now[1]) / getDistance(start[0], start[1]);
                double.rotation = getAngle(now[0], now[1]) - getAngle(start[0], start[1]);
                double.obj = {
                    scale: double.old_scale * double.scale.toFixed(2),
                    rotation: +double.old_rotation + +double.rotation.toFixed(2)
                }
                if(binding.arg === 'doubleMove') {
                    binding.value(el, double.obj);
                } else {
                    el.style.transform = `scale(${double.obj.scale}) rotate(${double.obj.rotation}deg)`;
                }
            } else if(now.length === 1 && single.isTouch) { //单指按下
                el.style.left = single.left + (now[0].pageX - single.pageX) + 'px';
                el.style.top = single.top + (now[0].pageY - single.pageY) + 'px';
            }
        }, false);
        
        el.addEventListener('touchend', (e)=>{
            el.style.border = ''
         
            if(binding.arg === 'doubleEnd') {
                binding.value();
            }

            //如果是双指同时把手指离开 changedTouches 的长度就等于手指的长度, touches 和 targetTouches 为空
            //如果是双指同时把手指按下，其中有一个离开, changedTouches、touches、targetTouches长度都为1，
            //如果是单指按下, touches、targetTouches长度都为0，changedTouches为1
            let t = Object.keys(e.touches).length,
                tt = Object.keys(e.targetTouches).length,
                ct = Object.keys(e.changedTouches).length;

            if(t >= 2) {
                double.isTouch = true;
                single.isTouch = true;
            } else if(t && tt && ct) {
                double.isTouch = true;
                single.isTouch = false;
            } else if(!t && !tt && ct) {
                double.isTouch = false;
                single.isTouch = true;
            }
        }, false);
    }
}