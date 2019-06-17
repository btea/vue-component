<template>
    <button :class="[color,{ghost: ghost}]">{{text}}<h1>{{title}}</h1></button>
</template>

<script>
// https://cn.vuejs.org/v2/guide/components-props.html
/**
 * 单向数据流
 *     所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。
 * 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
 *     额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。
*/
export default {
    // prop验证
    /**
     * props: {
     *    // 基础的类型检查 (`null` 匹配任何类型)
     *    propA: Number,
     *    // 多个可能的类型
     *    propB: [String, Number],
     *    // 必填的字符串
     *    propC: {
     *      type: String,
     *      required: true
     *    },
     *    // 带有默认值的数字
     *    propD: {
     *      type: Number,
     *      default: 100
     *    },
     *    // 带有默认值的对象
     *    propE: {
     *      type: Object,
     *      // 对象或数组默认值必须从一个工厂函数获取
     *      default: function () {
     *          return { message: 'hello' }
     *      }
     *    },
     *    // 自定义验证函数
     *    propF: {
     *      validator: function (value) {
     *      // 这个值必须匹配下列字符串中的一个
     *          return ['success', 'warning', 'danger'].indexOf(value) !== -1
     *      }
     *    }
     * }
     * 当prop验证失败的时候，（开发环境构建版本的）Vue将会产生一个控制台的警告。
     * 注：注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的。
     * 
     * 
     * 类型检查
     * type可以是下列原生构造函数中的一个：
     * String
     * Number
     * Boolean
     * Array
     * Object
     * Date
     * Function
     * Symbol
     * 额外的，type还可以是一个自定义的构造函数......
    */
    /**
     * mixins混入
     * https://cn.vuejs.org/v2/guide/mixins.html
     * 钩子函数混入会和已经存在的同名钩子合并成一个数组，都会被调用。并且，混入对象的钩子将在自身钩子之前调用
     * data和值为对象的选项，比如 methods,components,watch等，将会被混合为同一个对象，两个对象键名冲突时，取组件对象的键值对。
    */
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
        console.log(this.$data);
        let slots = this.$slots.default;
        if(slots && Array.isArray(slots)){
            slots.map(item => {
                if(!item.tag){
                    this.text = item.text;
                }
            }, this)
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

