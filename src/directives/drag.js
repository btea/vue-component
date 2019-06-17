import Vue from 'vue';

Vue.directive('drag',{
    inserted(el, binding){
        // 元素需默认定位
        let left;
        let top;
        let c_x;
        let c_y;
        let val = binding.value;
        let isMove = false, isEnlarge = false;
        let w, h;
        let getStyle = (el, attr) => {
            return parseInt(getComputedStyle(el)[attr]);
        }
        w = getStyle(el, 'width');
        h = getStyle(el, 'height');
        let callback = (e) => {
            if(isMove && !isEnlarge){
                let l, t, $l, $t;
                l = e.clientX - c_x;
                t = e.clientY - c_y;
                el.style.left = `${left + l}px`;
                el.style.top = `${top + t}px`;
                $l = left + l;
                $t = top + t;
                if(el.offsetLeft <= 0){
                    $l = w / 2;
                }
                if(el.offsetTop <= 0){
                    $t = h / 2;
                }
                if(el.offsetLeft >= val.left - w){
                    $l = val.left - w / 2;
                }
                if(el.offsetTop >= val.top - h){
                    $t = val.top - h / 2;
                }
                
                el.style.left = `${$l}px`;
                el.style.top = `${$t}px`;
            }
        }
        el.addEventListener('mousedown', (e) => {
            isMove = true;
            left = parseInt(getComputedStyle(el).left);
            top = parseInt(getComputedStyle(el).top);
            c_x = e.clientX;
            c_y = e.clientY;
            document.addEventListener('mousemove', callback);
            el.addEventListener('mouseup', () => {
                isMove = false;
                document.removeEventListener('mousemove', callback);
            });
        });
        // el.addEventListener('mousemove', this.callback);
        // el.addEventListener('mouseup', (e) => {
        //     isMove = false;
        //     event.$emit('startMapMove');
        // })
        
    },
    componentUpdated(el, binding){
        // console.log(el);
    }
})