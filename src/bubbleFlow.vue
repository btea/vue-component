<template>
	<canvas ref="bubble" style="background: rgba(102, 204, 255, .2);"></canvas>
</template>
<script>
export default {
	data() {
		return {
			width: null,
			height: null,
			num: 10,
			max: 100,
			min: 50
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init(){
            let w = window.innerWidth
            let h = window.innerHeight
            this.width  = w
            this.height = h
            this.initCanvas(w, h)
        },
        initCanvas(w, h){
            this.el = this.$refs.bubble
            this.ctx = this.el.getContext('2d')
			// let ratio = this.getPixelRatio(this.ctx)
			let ratio = 1
            this.el.width  = w * ratio
            this.el.height = h * ratio
            this.el.style.width  = w + 'px'
            this.el.style.height = h + 'px'

            this.startDraw()
            // this.startAnimation();
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
		startDraw() {
			this.bubbles()

			this.lists.forEach(bubble => {
				let r1 = bubble.r * 0.6
				let rgb = bubble.rgb.join(',')
				let c = this.ctx.createRadialGradient(bubble.x, bubble.y, r1, bubble.x, bubble.y, bubble.r)
				c.addColorStop(0, `rgba(${rgb}, 0)`)
				c.addColorStop(.7, `rgba(${rgb}, .1)`)
				c.addColorStop(1, `rgba(${rgb}, .8)`)
				this.ctx.beginPath()
				this.ctx.fillStyle = c
				this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, 2 * Math.PI)
				// this.ctx.stroke()
				this.ctx.fill()
				this.ctx.beginPath()
				let children = bubble.children
				let c_c = this.ctx.createRadialGradient(children.x, children.y, children.r * 0.8, children.x, children.y, children.r)
				c_c.addColorStop(0, `rgba(255, 255, 255, 0)`)
				c_c.addColorStop(.8, `rgba(255, 255, 255, .7)`)
				c_c.addColorStop(1, 'rgba(255, 255, 255, .8)')
				this.ctx.fillStyle = c_c
				console.log('children', children)
				this.ctx.lineTo(children.x, children.y)
				this.ctx.arc(children.x, children.y, children.r, Math.PI * (- 5 / 6), 0)
				this.ctx.fill()
				this.ctx.save()
				this.ctx.beginPath()
				let w = 20
				let h = 10
				this.ctx.fillStyle = '#000'
				this.ctx.rotate(20 * Math.PI / 180)
				this.ctx.rect(bubble.x - 20, bubble.y - bubble.r + 25, w, h)
				this.ctx.fill()
				this.ctx.restore()
				
			})
		},
		bubbles() {
			let lists = []
			for (let i = 0; i < this.num; i++) {
				lists.push(this.createBubble())
			}
			this.lists = lists
		},
		createBubble() {
			let obj = {}
			let r = this.random(this.max, this.min)
			let r1 = r * 0.8
			let s = (Math.random()).toFixed(1)
			obj.x = this.random(this.width, r)
			obj.y = this.height - r
			obj.s = s
			obj.c = this.color()
			obj.r = r
			obj.rgb = this.colorTorgb(obj.c)
			obj.children = {
				x: obj.x,
				y: obj.y - (r - r1),
				s: s,
				c: obj.c,
				r: r1
			}
			return obj
		},
		colorTorgb(str) {
			let r, g, b
			str = str.slice(1)
			r = str.slice(0, 2)
			g = str.slice(2, 4)
			b = str.slice(4)
			
			r = parseInt(r, 16)
			g = parseInt(g, 16)
			b = parseInt(b, 16)
			return [r, g, b]
		},
		color() {
			let str = '0123456789abcdef'
			let s = '#'
			for (let i = 0; i < 6; i++) {
				s += str[this.random(15, 0)]
			}
			return s
		},
		random(max, min) {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
	}
}
</script>