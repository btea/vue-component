<template>
    <div class="provide">
       {{str}}
       <inject></inject>
    </div>
</template>
<script>
import inject from './inject';
export default {
    components: {
        inject
    },
    provide: function(){
        return {
            onProvide: this.changeVal,
            ins: this
        }
    },
    data(){
        return {
            str: '默认值'
        }
    },
    methods: {
        changeVal(){
            this.str = '修改后的值'
        }
    }
}
</script>