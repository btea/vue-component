<template>
    <component :is="routerView" />
</template>

<script>
import router from './route';

export default {
    data(){
        return {
            routerView: null,
            title: document.getElementsByTagName('title')[0]
        }
    },
    created(){
        this.boundHashChange = this.onHashChange.bind(this);
        this.stateChange = this.onPopState.bind(this);
    },
    beforeMount(){
        window.addEventListener('hashchange', this.boundHashChange);
        // window.addEventListener('popstate', this.stateChange);
        window.onpopstate = this.stateChange;
    },
    mounted(){
        this.onHashChange();
        this.refresh();
    },
    beforeDestory(){
        window.removeEventListener('hashchange', this.boundHashChange);
    },
    methods: {
        onHashChange(){
            const path = window.location.href.split('#')[1];
            console.log('%c hash', 'color: #6cf');
            if(!path){return;}
            this.routerView = router[path].template;
            this.title.innerText = router[path].name;
            // this.routeView = this.$root.$routes[path] || null
            console.log('vue:hashchange:', path)
        },
        refresh(){
            if(history.state){
                this.contentSwitch(history.state);
            }
        },
        onPopState(e){
            // 注: js执行history.pushState和replaceState不会触发popState事件，只有点击浏览器的前进后退按钮才会触发
            let state = e.state;
            this.contentSwitch(state);
        },
        contentSwitch(state){
            if(!state){return}
            let path = state.path;
            this.routerView = router[path].template;
            this.title.innerText = router[path].name;
        }
    }
}
</script>

