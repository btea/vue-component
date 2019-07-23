<template>
    <div class="te-color-picker">
        <div class="te-color-box" :style="{background: c}" ref="colorPicker" @click="startPicker($event)"></div>
        <div class="te-paint-color">
            <div class="te-paint-container"></div>
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
            width: 320px;
            height: 250px;
            position: absolute;
        }
        .te-color-change{
            width: 10px;
            height: $h;
            background: linear-gradient(180deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
        }
    }
</style>


