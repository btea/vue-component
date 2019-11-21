<template>
    <div class="alert" v-html="tips" @click="sure"></div>
</template>

<script>
export default {
    // https://cn.vuejs.org/v2/guide/components-props.html

    data(){
        return {
            tips: 'tips'
        }
    },
    beforeCreate(){
       
    },
    created(){
        console.log(this.$slots);
        this.tips = this.render(this.$slots.default);
    },
    methods: {
        sure(){
            this.$emit('zeng',20);
        },
        render(arr){
            console.log(arr);
            let _self = this;
            if(arr.length && Array.isArray(arr)){
                let html = '';
                arr.map(item => {
                    let styles = "",classList = '' ,id = '', para = item.tag,ele = '';
                    if(item.data){
                        let style = item.data.staticStyle,
                        classList = item.data.staticClass,
                        id = item.data.staticId;
                        if(style){
                            for(let sty in style){
                                styles += sty + ":" + style[sty] + ";"
                            }
                        }
                        if(style){ para += '  style=' + styles;}
                        if(classList){ para += '  class=' + classList;}
                        if(id){para += '  id=' + id}
                    }
                    if(para){
                        ele = '<' + para + '>';
                    };
                    if(item.children){
                        ele += _self.render(item.children);
                    }else{
                        if(item.tag){
                            ele += item.text;
                            return ;
                        }
                        html += item.text;
                    }
                    html += ele + '</' + item.tag + '>';
                })
                return html;
            }
        }
    },
    mounted () {
        // console.log(this.$slots);
    }
}
</script>


<style lang="less" scoped>
    .alert{
        position: fixed;
        left: 50%;
        top: 50%;
        color: #ffffff;
        transform: translate(-50%,-50%);
        background-color: #333333;
        z-index: 9999;
        padding: 10px 15px;
        .con{
            border: 1px solid #6cf;
        }
    }
    .con{
        border: 1px dotted #6cf;
    }
</style>

