<template>
    <div class="te-color-picker">
        <div class="te-color-box" :style="{background: color}" ref="colorPicker" @click="startPicker($event)"></div>
        <div class="te-paint-color">
            <div class="te-paint-container" :style="{background: c}" @click="colorPicker($event)">
                <div class="te-color-white"></div>
                <div class="te-color-black"></div>
                <div class="te-color-cursor" :style="{right: right + 'px', top: top + 'px'}"></div>
            </div>
            <div class="te-color-change" @click="barColorPicker($event)"><div class="te-color-picker-bar" :style="{top: barTop + 'px'}"></div></div>
            <div class="te-color-picker-value"><input type="text" readonly v-model="colorValue"></div>
            <div class="te-color-picker-btn" @click="getResult">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    props: [],
    data(){
        return {
            color: '#6cf',
            c: '#6cf',
            w: 260,
            h: 180,
            right: 0,
            top: 0,
            barW: 10, // 侧边颜色选择条的宽度
            barH: 180,
            barTop: 0,
            isCanMove: false,
            colorValue: ''
        }
    },
    mounted: function(){
        this.initElement();
        
    },
    methods: {
        initElement(){
            let ele = document.createElement('canvas');
            ele.width = this.w;
            ele.height = this.h;
            this.ctx = ele.getContext('2d');
            this.drawColor();
            this.drawColorBar();
            document.body.appendChild(ele);
            console.log(this.ctx);
        },
        drawColor: function(){
            this.ctx.fillStyle = this.c;
            this.ctx.fillRect(0, 0, this.w, this.h);
            this.drawBlack();
            this.drawWhite();
            this.datas = this.ctx.getImageData(0, 0, this.w, this.h).data;
        },
        drawWhite(){
            // 白色从下往上
            let gnt = this.ctx.createLinearGradient(0, 0, this.w, this.h);
            gnt.addColorStop(0, '#fff');
            gnt.addColorStop(1, 'rgba(255,255,255,0)');
            this.ctx.fillStyle = gnt;
            this.ctx.fillRect(0, 0, this.w, this.h);
        },
        drawBlack(){
            // 黑色从上往下
            let gnt = this.ctx.createLinearGradient(0, 0, 0, this.h);
            gnt.addColorStop(0, 'transparent');
            gnt.addColorStop(1, '#000');
            this.ctx.fillStyle = gnt;
            this.ctx.fillRect(0, 0, this.w, this.h);
        },
        drawColorBar(){
            let bar = document.createElement('canvas'), gnt;
            bar.width = this.barW;
            bar.height = this.barH;
            this.barCtx = bar.getContext('2d');
            gnt = this.createLinear(this.barCtx, {
                0: 'red', '17%': '#0f0', '33%': '#0ff', '50%': '#00f', '67%': '#f0f', '83%': 'red'
            }, 0, this.h);
            this.barCtx.fillStyle = gnt;
            this.barCtx.fillRect(0, 0, this.w, this.h);
            this.barDatas = this.barCtx.getImageData(0, 0, this.barW, this.barH).data;
        },
        createLinear(ctx, colors, w, h){
            let gnt = ctx.createLinearGradient(0, 0, w, h);
            // red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red
            gnt.addColorStop(0, 'red');
            gnt.addColorStop(0.17, '#ff0');
            gnt.addColorStop(0.33, '#0f0');
            gnt.addColorStop(0.5, '#0ff');
            gnt.addColorStop(0.67, '#00f');
            gnt.addColorStop(0.83, '#f0f');
            gnt.addColorStop(1, 'red');
            return gnt;
        },
        barColorPicker(e){
            let c;
            this.barTop = e.layerY;
            c = this.getColorValue(this.barDatas, this.barW, 0, this.barTop);
            this.c = this.color = c;
            this.right = this.top = 0;
            this.drawColor();
        },
        colorPicker(e){
            let x, y;
            x = e.layerX;
            y = e.layerY;
            this.top = y - 5;
            this.right = this.w - x - 5;
            this.color = this.getColorValue(this.datas, this.w, x, y);
            this.valueConvert(this.color);
        },
        valueConvert(v){
            let str = '#';
            let r, g, b;
            r = this.rV.toString(16);
            g = this.gV.toString(16);
            b = this.bV.toString(16);
            if(r.length === 1){
                r = '0' + r;
            }
            if(g.length === 1){
                g = '0' + g;
            }
            if(b.length === 1){
                b = '0' + b;
            }
            str = `${str}${r}${g}${b}`;
            this.colorValue = str;
            this.$emit('colorChange', str);
        },
        getColorValue(datas, w, x, y){
            let n = (w * (y - 1) + x) * 4;
            let r = datas[n], g = datas[n + 1], b = datas[n + 2], a = datas[n + 3];
            this.rV = r;
            this.gV = g;
            this.bV = b;
            this.aV = a;
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        },
        getResult(){
            console.log(this.colorValue);
        },
        // down(){
        //     this.isCanMove = true;
        // },
        // up(){
        //     this.isCanMove = false;
        // },
        // move(e){
        //     if(this.isCanMove){
        //         // this.throttle(this.colorPicker, 100)(e);
        //         this.colorPicker(e);
        //     }
        // },
        // throttle(fn, t){
        //     let time;
        //     return (e) => {
        //         if(!time){
        //             time = +new Date();
        //         }
        //         if(+new Date() - time > t){
        //             fn.call(this, e);
        //             t = undefined;
        //         }
        //     }
        // },
        positionJudge(){
            
        }
    }
}
</script>


<style lang="scss" scoped>
    @mixin radius($v){
        border-radius: $v;
    }
    @mixin middle($h){
        height: $h;
        line-height: $h;
        vertical-align: middle;
    }
    @mixin input($h, $w){
        width: $w;
        height: $h;
        @include radius(3px);
        border: 1px solid #999;
        padding: 0 10px;
        outline: none;
    }
    $h: 180px;
    $w: 40px;
    $H: 250px;
    $W: 320PX;
    $p: 10px;
    .te-color-picker{
        width: $w;
        height: $w;
        @include radius(2px);
        border: 1px solid #e6e6e6;
        // cursor: pointer;
        position: relative;
        .te-color-box{
            box-sizing: border-box;
            border: 1px solid #e6e6e6;
            width: $w;
            height: $w;
        }
        .te-paint-color{
            width: $W;
            height: $H;
            position: absolute;
            background: #fff;
            border: 1px solid #ebeef5;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            @include radius(5px);
            .te-paint-container{
                width: $W - 60PX;
                height: $h;
                position: relative;
                left: $p;
                top: $p;
                .te-color-white,.te-color-black{
                   position: absolute;
                   left: 0;
                   top: 0;
                   right: 0;
                   bottom: 0;
                }
                .te-color-black{
                    background: linear-gradient(0deg,#000,transparent);
                }
                .te-color-white{
                    background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0))
                }
            }
        }
        .te-color-cursor{
            position: absolute;
            border: 1px solid #fff;
            height: 6px;
            width: 6px;
            @include radius(10px);
        }
        .te-color-change{
            position: absolute;
            top: $p;
            right: $p;
            width: 10px;
            height: $h;
            background: linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
            .te-color-picker-bar{
                position: absolute;
                left: 0;
                width: 100%;
                height: 2px;
                background: #fff;
            }
        }
        .te-color-picker-value{
            position: absolute;
            left: $p;
            bottom: $p + 5px;
            input{
                @include input(25px, 120px);
            }
        }
        .te-color-picker-btn{
            position: absolute;
            right: $p;
            bottom: $p + 5px;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            @include middle(25px);
            @include input(25px, 35px);
            &:hover{
                color: #6cf;
                border-color: #6cf;
            }
        }
    }
</style>


