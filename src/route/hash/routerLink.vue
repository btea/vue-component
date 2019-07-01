<template>
    <a @click.prevent="onClick"><slot></slot></a>
</template>

<script>
import event from './event';

export default {
    props: {
        to: {
            type: Object,
            default: {}
        }
    },
    methods: {
        onClick(){
            let obj = this.to;
            let path = obj.path || obj.name;
            let type = obj.type;
            if(!type || type === 'hash'){
                window.location.hash = '#' + path;
            }
            if(type === 'history'){
                history.pushState(obj, '', path);
                event.$emit('history', path);
            }
        }
    }
}
</script>

