<template>
    <button :class="[color,{ghost: ghost}]">{{text}}<h1>{{title}}</h1></button>
</template>

<script>
export default {
    props: {
        size: 'small',
        title: {
            type: String,
            default: '标题'
        }
    },
    data(){
        return {
            text: '默认按钮'
        }
    },
    mounted(){
        let slots = this.$slots.default,self = this;
        if(slots && Array.isArray(slots)){
            slots.map(item => {
                if(!item.tag){
                    self.text = item.text;
                }
            })
        }
        // console.log(this.$slots.default[0].text);
    },
    computed:{
        color(){
            let type = this.$attrs.type;
            return type;
        },
        ghost(){
            let ghost = this.$attrs.ghost;
            return ghost === '';
        }
    }
}
</script>


<style lang="less" scoped>
    button{
        margin: 0;
        padding: 5px 15px;
        border: 1px solid #fff;
        border-radius: 5px;
        outline: none;
        color: #fff;
        line-height: 1.5;
        cursor: pointer;
        &:hover{
            opacity: .9;
        }
        &.primary{
            background: #6cf;
            border-color: #6cf;
            &.ghost{
                background: none;
                color: #6cf;
            }
        }
        &.warning{
            background: #f90;
            border-color: #f90;
            &.ghost{
                background: none;
                color: #f90;
            }
        }
        &.info{
            background: #2db7f5;
            border-color: #2db7f5;
            &.ghost{
                background: none;
                color: #2db7f5;
            }
        }
        &.error{
            background: red;
            border-color: red;
            &.ghost{
                background: none;
                color: red;
            }
        }
    }
</style>

