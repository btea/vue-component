<template>
    <canvas ref="canvas"></canvas>
</template>
<script>
export default {
    props: ['options'],
    data(){
        return {
            width: 400,
            height: 300
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            let el = this.$refs.canvas.parentNode;
            let style = this.getStyle(el);
            let w = parseInt(style.width);
            let h = parseInt(style.height);
            this.width  = w;
            this.height = h;
            this.initCanvas(w, h);
        },
        getStyle(el){
            if(window.getComputedStyle){
                return window.getComputedStyle(el, null);
            }
            return el.currentStyle;
        },
        initCanvas(w, h){
            this.el = this.$refs.canvas;
            this.ctx = this.el.getContext('2d');
            let ratio = this.getPixelRatio(this.ctx);
            this.el.width  = w * ratio;
            this.el.height = h * ratio;
            this.el.style.width  = w + 'px';
            this.el.style.height = h + 'px';

            this.drawCircle();
            this.drawText();
        },
        getPixelRatio(context){
            let backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        },
        drawCircle(){
            let r = this.options.r || 50;
            let c = this.options.colors || ['#66ccff','#999999'];
            let w = this.options.width || 20;
            let v = this.options.value || 30;
            let clockWise = this.options.clockWise || true;
            // 规定逆时针还是顺时针绘图  false顺时针， true逆时针

            this.ctx.beginPath();
            this.ctx.lineWidth = w;
            this.ctx.strokeStyle = c[1];
            this.ctx.arc(this.width / 2, this.height / 2, r, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.lineWidth = w;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = c[0];
            this.ctx.arc(this.width / 2, this.height / 2, r, -Math.PI / 2, this.vaueToAngle(v, clockWise), !clockWise);
            this.ctx.stroke();
        },
        vaueToAngle(v, clockWise){
            if(typeof v === 'string' && /%/.test(v)){
                v = parseInt(v);
            }
            // canvas绘制圆默认起点在顺时针的90度的位置,减去1/4的百分比值
            if(!clockWise){
                v = -v;
            }
            v -= 25;
            let angle = 2 * Math.PI * v / 100;
            return angle;
        },
        drawText(){
            let text = this.options.text || '';
            let size = this.options.size || 14;
            this.ctx.font = `${size}px bolid`;
            this.ctx.textAlign = 'center';
            this.ctx.fillText(text, this.width / 2, 20);

            this.ctx.fillStyle = '#66ccff';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('这是一段文字', this.width / 2, this.height / 2);
            this.ctx.fillText('文字', this.width / 2, this.height / 2 + size);
        }   
    }
}
</script>