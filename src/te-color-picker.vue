<template>
    <div class="te-color-picker">
        <div class="te-color-box" :style="{background: color}" ref="colorPicker" @click="startPicker($event)"></div>
        <div class="te-paint-color" :style="{height: boxHeight + 'px'}">
            <div class="te-paint-container" :style="{background: c}">
                <div class="te-color-white"></div>
                <div class="te-color-black" @click="colorPickerPoint($event)"></div>
                <div class="te-color-cursor" @click.stop="void 0" :style="{right: right + 'px', top: top + 'px'}"></div>
            </div>
            <div class="te-color-change" @click="barColorPicker($event)"><div class="te-color-picker-bar" @click.stop="void 0" :style="{top: barTop + 'px'}"></div></div>
            <div class="te-color-picker-value"><input type="text" readonly v-model="colorValue"></div>
            <div class="te-color-picker-btn" @click="getResult">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value'],
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
            colorValue: '',
            boxHeight: 0,
            isColorBoxShow: false
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
            // document.body.appendChild(ele);

            this.initColor();
        },
        initColor(){
            let c = this.value;
            if(c){
                this.color = this.c = c;
                let v = this.HexToRgb(c);
                this.RgbToHsv(v.R, v.G, v.B);
            }
        },
        startPicker(){
            if(this.isColorBoxShow){
                this.boxHeight = 0;
            }else{
                this.boxHeight = 250;
            }
            this.isColorBoxShow = !this.isColorBoxShow;
        },
        drawColor(){
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
        colorPickerPoint(e){
            let x, y;
            x = e.layerX;
            y = e.layerY;
            this.top = y - 5;
            this.right = this.w - x - 5;

            this.top = this.top < 0 ? 0 : this.top;
            this.right = this.right < 0 ? 0 : this.right;
            // this.color = this.getColorValue(this.datas, this.w, x, y);
            // this.valueConvert(this.color);
            this.getHsv();
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

        // 颜色相互转换http://www.easyrgb.com/en/math.php#text21
        // 通过hsv拿到对应的颜色值，再转换成对应的hex值
        getHsv(){
            let h, s, v, c;
            h = this.getHue();
            s = this.getSaturation();
            v = this.getValue();
            c = this.hsvToRgb(h, s, v);
            this.color = `rgb(${c.R},${c.G},${c.B})`;
            this.rV = c.R;
            this.gV = c.G;
            this.bV = c.B;
            this.valueConvert();
        },
        getHue(){
            // 通过top坐标和hue元素高度计算出比例值，然后乘以360度计算出当前位置所处的度数
            let top = this.barTop;
            let hueHeight = this.barH;
            let hue = Math.round((top / hueHeight) * 100) / 100;
            return hue;
        },
        getSaturation(){
            let saturation = Math.round((this.w - this.right) / this.w * 100) / 100;
            return saturation;
        },
        getValue(){
            let v = Math.round((1 - this.top / this.h) * 100) / 100;
            return v;
        },
        hsvToRgb(H, S, V){
            let R, G, B;
            let var_h, var_i, var_1, var_2, var_3, var_r, var_g, var_b;
            if ( S == 0 ){
                R = V * 255
                G = V * 255
                B = V * 255
            }else {
                var_h = H * 6
                if ( var_h == 6 ) var_h = 0      //H must be < 1
                var_i = Math.floor(var_h );           //Or ... var_i = floor( var_h )
                var_1 = V * ( 1 - S )
                var_2 = V * ( 1 - S * ( var_h - var_i ) )
                var_3 = V * ( 1 - S * ( 1 - ( var_h - var_i ) ) )

                if      ( var_i == 0 ) { var_r = V     ; var_g = var_3 ; var_b = var_1 }
                else if ( var_i == 1 ) { var_r = var_2 ; var_g = V     ; var_b = var_1 }
                else if ( var_i == 2 ) { var_r = var_1 ; var_g = V     ; var_b = var_3 }
                else if ( var_i == 3 ) { var_r = var_1 ; var_g = var_2 ; var_b = V     }
                else if ( var_i == 4 ) { var_r = var_3 ; var_g = var_1 ; var_b = V     }
                else                   { var_r = V     ; var_g = var_1 ; var_b = var_2 }

                R = Math.floor(var_r * 255);
                G = Math.floor(var_g * 255);
                B = Math.floor(var_b * 255);
            }
            return {R, G, B};
        },
        HexToRgb(v){
            if(typeof v !== 'string'){
                throw Error('this function first parameter must be a string');
            }
            if(v.length !== 4 && v.length !== 7){
                throw Error('this hex value is not a avaliable value');
            }
            let s = v.slice(1), R, G, B;
            if(s.length === 3){
                R = s[0] + s[0];
                G = s[1] + s[1];
                B = s[2] + s[2];
            }else{
                R = s[0] + s[1];
                G = s[2] + s[3];
                B = s[4] + s[5];
            }
            R = parseInt(R, 16);
            G = parseInt(G, 16);
            B = parseInt(B, 16);
            return {R, G, B};
        },
        RgbToHsv(R, G, B){
            let var_R, var_G, var_B, var_Min, var_Max, del_Max, del_R, del_G, del_B, H, S, V;

            var_R = ( R / 255 );
            var_G = ( G / 255 );
            var_B = ( B / 255 );

            var_Min = Math.min( var_R, var_G, var_B );    //Min. value of RGB
            var_Max = Math.max( var_R, var_G, var_B );    //Max. value of RGB
            del_Max = var_Max - var_Min;             //Delta RGB value

            V = var_Max;

            if ( del_Max == 0 )                     //This is a gray, no chroma...
            {
                H = 0
                S = 0
            }
            else                                    //Chromatic data...
            {
                S = del_Max / var_Max;

                del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
                del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
                del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

                if ( var_R == var_Max ){
                    H = del_B - del_G
                }else if ( var_G == var_Max ) {
                    H = ( 1 / 3 ) + del_R - del_B
                }else if ( var_B == var_Max ) {
                    H = ( 2 / 3 ) + del_G - del_R
                }
                if ( H < 0 ) H += 1
                if ( H > 1 ) H -= 1
            }
            this.barPointPosition(H, S, V);
            console.log(H, S, V);
        },
        barPointPosition(H, S, V){
            this.barTop = this.barH * H;
            this.right = this.w * (1 - S);
            this.top = this.h * (1 - V);
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
            cursor: pointer;
        }
        .te-paint-color{
            width: $W;
            // height: $H;
            position: absolute;
            background: #fff;
            // border: 1px solid #ebeef5;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            overflow: hidden;
            transition: all .08s;
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
                    z-index: 1;
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
            z-index: 2;
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


