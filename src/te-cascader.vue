<template>
    <div class="be-cascader" :class="{isFocus: isFocus}">
        <input type="text" @focus="focus" ref="input" >
    </div>
</template>

<script>
export default {
    data(){
        return {
            isFocus: false
        }
    },
    methods: {
        focus: function(){
            this.isFocus = true;
        },
        blur: function() {
            this.isFocus = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .be-cascader{
        display: inline-block;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            right: 10px;
            top: 14px;
            width: 10px;
            height: 10px;
            border: 1px solid #eeeeee;
            border-left: none;
            border-top: none;
            transform: rotate(45deg);
            transition: all .5s;

        }
        input{
            outline: none;
            height: 40px;
            cursor: pointer;
            padding: 0 20px 0 10px;
            border: 1px solid #eeeeee;
            color: transparent;
        }
        &.isFoucus{
            input{
                border-color: #6cf;
            }
            &:after{
                transform: rotate(-45deg);
            }
        }
        
    }
</style>



