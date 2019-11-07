<template>
    <canvas ref="canvas" style="background: #000;"></canvas>
</template>
<script>
export default {
    data(){
        return {
            width: 0,
            height: 0
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            let w = window.innerWidth;
            let h = window.innerHeight;
            this.width  = w;
            this.height = h;
            this.initCanvas(w, h);
        },
        initCanvas(w, h){
            this.el = this.$refs.canvas;
            this.ctx = this.el.getContext('2d');
            let ratio = this.getPixelRatio(this.ctx);
            this.el.width  = w * ratio;
            this.el.height = h * ratio;
            this.el.style.width  = w + 'px';
            this.el.style.height = h + 'px';

            this.stars();
            // this.drawStar();
            this.startAnimation();
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
        startAnimation(){
            setTimeout(() => {
                this.drawStar();
                setTimeout(() => {this.startAnimation()}, 16.7);
            }, 16.7);
            // window.requestAnimationFrame(() => {
            //     this.drawStar();
            //     window.requestAnimationFrame(this.drawStar);
            // })
        },
        stars(){
            let s = [];
            for(let i = 0; i < 100; i++){
                s.push(this.createStar());
            }
            this.stars = s;
        },
        drawStar(){
            let star = this.stars;
            this.ctx.clearRect(0, 0, this.width, this.height);
            for(let i = 0; i < star.length; i++){
                let s = star[i];
                this.ctx.beginPath();
                this.ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
                this.ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                this.ctx.fill();
                if(s.r >= 6){
                    s.r1 = -Math.abs(s.r1);
                }
                if(s.r <= 1){
                    s.r1 = Math.abs(s.r1);
                }
                s.r += s.r1;
                if(s.opacity >= 1){
                    s.o1 = -0.1;
                }
                if(s.opacity <= 0.5){
                    s.o1 = 0.1;
                }
                s.opacity += s.o1;
            }
        },
        createStar(){
            let r = this.random(6, 2);
            let c = '#ffffff';
            let x = this.random(this.width - r / 2, r / 2);
            let y = this.random(this.height - r / 2, r / 2);
            let opacity = Math.random(99, 70);
            let r1 = Math.random();
            let o1 = 2;
            return {r, c, x, y, opacity, r1, o1};
        },
        random(max, min){
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
}
</script>