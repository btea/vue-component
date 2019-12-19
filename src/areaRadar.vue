<template>
	<canvas ref="canvas" class="canvas-container" style="background: #66ccff50;"></canvas>
</template>
<script>
export default {
	data() {
		return {
			w: 0,
			h: 0,
			el: null,
			ctx: null,
			radius: 0,
			maxR: 0,  // 最外圆半径
			minR: 0,  //最内圆半径
			color: '#6cf',
			line: '#365997',
			lineWidth: 3,
			dials: null, // 保存刻度盘的所有刻度
			dial: 'rgb(0, 255, 255)',
			colorAdd: 1,
			dialR: 0,
			dialG: 255,
			dialB: 255,
			dialWidth: 2,
			dialY: 0,
			dash: '#7ebeff',
			dashR: 0,
			arcs: null, // 三条弧线
			arcsR: 0,
			outerArcs: null, // 外围包含不连续的圆弧
			outerArcs1: null,
			outerArcs2: null,
			outerArcsR1: 0,
			outerArcsR2: 0
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init(){
            let s = this.getStyle(this.$refs.canvas.parentNode);
            if(!s){
                return
            }
            let w = parseInt(s.width);
			let h = parseInt(s.height);
            this.w = w;
			this.h = h;
			this.el = this.$refs.canvas;
			this.ctx = this.el.getContext('2d');
			let ratio = this.getPixelRatio(this.ctx);
			// let ratio = 1
            this.el.width  = w * ratio;
            this.el.height = h * ratio;
            this.el.style.width  = w + 'px';
			this.el.style.height = h + 'px';
			
			let r
			if (this.w <= this.h) {
				r = this.w / 2
			} else {
				r = this.h / 2
			}
			this.maxR = r - 10
			this.minR = r - 200
			this.drawCircle(this.maxR, this.line, this.lineWidth)
			this.drawCircle(this.minR, this.line, this.lineWidth)
			this.dialY = r - 150
			this.dialLine()
			this.arcsR = r - 100
			this.allArcs(this.arcsR)
			
			this.outerArcsR1 = r - 30
			this.outerArcsR2 = r - 50
			this.outerArcsAll()

			this.dashR = r - 80
			this.drawDashLine(this.dashR)
			this.startAnimation()
		},
		startAnimation() {
			setInterval(() => {
				this.ctx.clearRect(0, 0, this.w, this.h)
				this.ctx.setLineDash([])
				this.drawCircle(this.maxR, this.line, this.lineWidth)
				this.drawCircle(this.minR, this.line, this.lineWidth)
				this.dialAnimation()
				// this.allArcs(this.arcsR)
				this.arcsAnimation()
				this.outerArcsAnimation()
				this.ctx.setLineDash([10, 10])
				this.drawDashLine(this.dashR)
			}, 1000 / 60)
		},
		drawCircle(r, c, w) {
			c = c || this.line
			this.ctx.beginPath()
			this.ctx.strokeStyle = c
			this.ctx.lineWidth = w || this.lineWidth
			this.ctx.arc(this.w / 2, this.h / 2, r, 0, Math.PI * 2)
			this.ctx.stroke()
		},
		dialLine() {
			let dial = Array.from('21111'.repeat(24), item => item * 20)
			dial = dial.map((d, i) => {
				return {
					rotate: i * 3,
					h: d
				}
			})
			dial.forEach(d => {
				this.drawLine(this.dial, 2, d.h, d.rotate)
			})
			this.dials = dial
		},
		dialAnimation() {
			if (this.dialG >= 255) {
				this.colorAdd = -1
			}
			if (this.dialG <= 190) {
				this.colorAdd = 1
			}
			this.dialG += this.colorAdd
			let c = `rgb(${this.dialR}, ${this.dialG}, ${this.dialB})`
			this.dials.forEach(d => {
				d.rotate += 1
				this.drawLine(c, 2, d.h, d.rotate)
			})
		},
		drawLine(c, w, h, rotate) {
			this.ctx.save()
			this.ctx.beginPath()
			this.ctx.translate(this.w / 2, this.h / 2)
			this.ctx.rotate(rotate * Math.PI / 180)
			this.ctx.strokeStyle = c || this.dial
			this.ctx.moveTo((this.w - w) / 2 - this.w / 2, this.dialY - this.h / 2)
			this.ctx.lineTo((this.w - w) / 2 - this.w / 2, this.dialY - h - this.h / 2)
			this.ctx.stroke()
			this.ctx.restore()
		},
		drawDashLine(r, c, w) {
			this.ctx.beginPath()
			this.ctx.setLineDash([10, 10])
			this.ctx.strokeStyle = c || this.dash
			this.ctx.lineWidth = w || this.lineWidth
			this.ctx.arc(this.w / 2, this.h / 2, r, 0, Math.PI * 2)
			this.ctx.stroke()
		},
		// 绘制外圆包含两个不连续弧线的圆
		outerArcsAll() {
			let arcs = [0, 90, 180, 270], arcs1, arcs2
			const add = 45
			arcs1 = arcs.map(a => {
				return {
					w: this.lineWidth,
					r: this.outerArcsR1,
					c: this.line,
					start: a,
					end: a + add
				}
			})
			arcs2 = arcs1.map(a => {
				return {
					w: this.lineWidth,
					r: this.outerArcsR2,
					c: this.line,
					start: a.start + 30,
					end: a.end + 45
				}
			})
			arcs1.forEach(a => {
				this.drawArcs(a.w, a.r, a.c, a.start, a.end)
			})
			arcs2.forEach(a => {
				this.drawArcs(a.w, a.r, a.c, a.start, a.end)
			})
			this.outerArcs1 = arcs1
			this.outerArcs2 = arcs2
		},
		outerArcsAnimation() {
			this.outerArcs1.forEach(a => {
				a.start += 1
				a.end += 1
				this.drawArcs(a.w, a.r, a.c, a.start, a.end)
			})
			this.outerArcs2.forEach(a => {
				a.start -= 1
				a.end -= 1
				this.drawArcs(a.w, a.r, a.c, a.start, a.end)
			})
		},
		// 绘制同一圆三种颜色弧线
		allArcs(r) {
			let s = Math.floor(Math.random() * 180)
			let e = s + 360
			let arcs = []
			arcs[0] = {
				c: this.getRandomColor(),
				start: s,
				end: this.getRandom(s + 180, s + 30)
			}
			arcs[1] = {
				c: this.getRandomColor(),
				start: arcs[0].end,
				end: this.getRandom(e - 30, arcs[0].end)
			}
			arcs[2] = {
				c: this.getRandomColor(),
				start: arcs[1].end,
				end: e
			}
			arcs.forEach(a => {
				this.drawArcs(8, r, a.c, a.start, a.end)
			})
			this.arcR = r
			this.arcs = arcs
		},
		arcsAnimation() {
			this.arcs.forEach(a => {
				a.start -= 1
				a.end -= 1
				this.drawArcs(8, this.arcsR, a.c, a.start, a.end)
			})
		},
		getRandomColor() {
			return '#' + Math.random().toString(16).slice(2, 8)
		},
		getRandom(max, min) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		},
		drawArcs(w, r, c, start, end) {
			this.ctx.beginPath()
			this.ctx.strokeStyle = c
			this.ctx.lineWidth = w || this.lineWidth
			this.ctx.arc(this.w / 2, this.h / 2, r, Math.PI / 180 * start, Math.PI / 180 * end)
			this.ctx.stroke()
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
<style lang="less" scoped>
	.canvas-container{
		position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 0;
        z-index: 20;
	}
</style>