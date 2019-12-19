<template>
    <div class="radar" ref="radar">
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
export default {
	data(){
		return {
			w: 0,
			h: 0,
			el: null,
			ctx: null,
			radius: 0,
			color: '#6cf',
			start: 0,
			end: 1 / 6,
			add: 1 / 180,
			speed: 3
		}
	},
    mounted(){
		this.animationFrame();
		this.init();
    },
    methods: {
        init(){
            let s = this.getStyle(this.$refs.radar);
            if(!s){
                return
            }
            let w = parseInt(s.width);
			let h = parseInt(s.height);
            this.w = w;
            this.h = h;
            this.el = this.$refs.canvas;
            this.ctx = this.el.getContext('2d');
			// let ratio = this.getPixelRatio(this.ctx);
			let ratio = 1
            this.el.width  = w * ratio;
            this.el.height = h * ratio;
            this.el.style.width  = w + 'px';
			this.el.style.height = h + 'px';

			this.drawCircle();
			this.startAnimation();
        },
        drawCircle(){
			this.ctx.clearRect(0, 0, this.w, this.h);
			let r;
			let p = 5; // 左右两边空隙
			let n; // 均为成5个圆，每个圆之间间隔距离
			this.ctx.beginPath();
			if (this.h < this.w){
				r = this.h / 2;
			} else{
				r = this.w / 2;
			}
			r = r - p;
			this.radius = r;
			this.color = '#00ffff';
			this.ctx.fillStyle = 'rgba(31, 243, 202, .1)';
			this.ctx.arc(this.w / 2, this.h / 2, r, 0, Math.PI * 2);
			this.ctx.fill();
			this.ctx.strokeStyle = '#00ffff';
			this.ctx.arc(this.w / 2, this.h / 2, r, 0, Math.PI * 2);
			n = Math.floor(r / 5);
			this.ctx.arc(this.w / 2, this.h / 2, r - n , 0, Math.PI * 2);
			this.ctx.arc(this.w / 2, this.h / 2, r - n * 2, 0, Math.PI * 2);
			this.ctx.arc(this.w / 2, this.h / 2, r - n * 3, 0, Math.PI * 2);
			this.ctx.arc(this.w / 2, this.h / 2, r - n * 4, 0, Math.PI * 2);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(p, this.h / 2);
			this.ctx.lineTo(this.w - p, this.h / 2);
			this.ctx.stroke();

			this.ctx.beginPath();
			this.ctx.moveTo(this.w / 2, this.h / 2 - r);
			this.ctx.lineTo(this.w / 2, this.h / 2 + r);
			this.ctx.stroke();

			this.radarArea();
		},
		radarArea(){
			let r = this.radius;
			let c = this.ctx.createRadialGradient(this.w / 2, this.h / 2, 5, this.w / 2, this.h / 2, r);
			let s = this.start;
			let e = this.end;
			c.addColorStop(0, 'rgba(102, 204, 255, 0)');
			c.addColorStop(0.5, 'rgba(102, 204, 255, .5)');
			c.addColorStop(1, 'rgba(102, 204, 255, .8)');
			this.ctx.beginPath();
			this.ctx.fillStyle = c;
			this.ctx.moveTo(this.w / 2, this.h / 2);
			this.ctx.arc(this.w / 2, this.h / 2, r, Math.PI * s, Math.PI * e);
			this.ctx.fill();
			
			this.start -= this.add * this.speed;
			this.end -= this.add * this.speed;
		},
		startAnimation(){
			this.animationFrame()(() => {
				this.drawCircle();
				this.animationFrame()(() => {
					this.startAnimation();
				})
			})
		},
		animationFrame(){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			(callback => {
				window.setTimeout(() => { callback }, 1000 / 60);
			})
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
        getStyle(el){
            if(window.getComputedStyle){
                return window.getComputedStyle(el, null)
            }
            return el.currentStyle;
        }
    }
}
</script>
<style lang="scss" scoped>
    .radar{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 0;
        z-index: 20;

        // background: linear-gradient(#03A9F4,#03A9F4), 
        //     linear-gradient(90deg, #ffffff33 1px,transparent 0,transparent 19px),
        //     linear-gradient(#ffffff33 1px,transparent 0,transparent 19px),
        //     linear-gradient(transparent, #2196f387);
        // background-size:100% 1.5%, 10% 100%,100% 10%, 100% 100%;
        // background-repeat: no-repeat,repeat,repeat,no-repeat;
        // background-position: 0 0,0 0, 0 0, 0 0;
        // clip-path: polygon(0% 0%, 100% 0%, 100% 1.5%, 0% 1.5%);
        // animation: move 2s infinite linear;
    }
    @keyframes move{
	    to{
		    background-position: 0 100%,0 0, 0 0, 0 0;
		    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
	    }
    }
</style>