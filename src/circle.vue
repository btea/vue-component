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
        // https://www.html.cn/archives/9297
    },
    methods: {
        init(){
            let el = this.$refs.canvas.parentNode;
            let style = this.getStyle(el);
            let w = parseInt(el.width);
            let h = parseInt(el.height);


        },
        getStyle(el){
            if(window.getComputedStyle){
                return window.getComputedStyle(el, null);
            }
            return el.currentStyle;
        },
        initCanvas(){
            this.el = this.$refs.canvas;
            this.ctx = this.el.getContext('2d');
            console.log(this.getPixelRatio(this.ctx));
        },
        getPixelRatio(context){
            let backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        }
    }
}
</script>
<style lang="less" scoped>

</style>