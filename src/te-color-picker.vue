<template>
    <div class="te-color-picker">
        <div class="te-color-box" :style="{background: c}" ref="colorPicker" @click="startPicker($event)"></div>
        <div class="te-paint-color">
            <div class="te-paint-container" :style="{background: c}">
                <div class="te-color-white"></div>
                <div class="te-color-black"></div>
                <div class="te-color-cursor"></div>
            </div>
            <div class="te-color-change"></div>
            <div class="te-color-picker-value"><input type="text"></div>
            <div class="te-color-picker-btn">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    props: [],
    data(){
        return {
            c: '#6cf',
            w: 320,
            h: 250,

        }
    },
    methods: {
        startPicker(e){
            let left, bottom;
            debugger
        },
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
    $h: 180px;
    $w: 40px;
    $H: 250px;
    $W: 320PX;
    .te-color-picker{
        width: $w;
        height: $w;
        @include radius(2px);
        border: 1px solid #e6e6e6;
        cursor: pointer;
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
            .te-paint-container{
                width: $W - 60PX;
                height: $H - 30px;
                position: relative;
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
        .te-color-change{
            width: 10px;
            height: $h;
            background: linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
        }
    }
</style>


