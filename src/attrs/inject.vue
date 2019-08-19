<template>
    <div class="inject">
        <button @click="onProvide">click</button>
    </div>
</template>
<script>
export default {
    inject: ['onProvide', 'ins'],
    mounted(){
        console.log(this.ins); // 父组件实例
    }
}
</script>