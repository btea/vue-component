<template>
    <div class="item" :style="{width: width + 'px'}" :class="prop">
        {{prop}}
    </div>
</template>

<script>
export default {
    props: {
        prop: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            list: this.$parent.data
        }
    },
    mounted(){
        console.log(this);
    }
}
</script>
<style lang="scss" scoped>
    .item{
        display: table-cell;

    }
</style>


