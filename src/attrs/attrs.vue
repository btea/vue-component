<template>
    <div class="attrs">
        <button v-on="$listeners">按钮</button>
        <input v-bind="$attrs">
        <pro></pro>
    </div>
</template>

<script>
// $attrs 是将没有被组件内部 Props 声明的传值（也叫非 Props 特性）收集起来的一个对象，再通过 v-bind 将其绑定在指定元素上
// 通过￥attrs指定给元素的属性，不会与该元素原有属性发生合并或替换，而是以原属性为准。
// $listeners同$attrs类似，可以看做是一个包含了组件上所有事件监听器（包括自定义事件、不包括.native修饰的事件）的对象。
import pro from './provide'
export default {
    components: {
        pro
    }
}
</script>