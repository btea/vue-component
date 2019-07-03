import Vue from 'vue';
import App from './app';

// 自定义指令
import './directives/drag';

import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui';

import Button from './button';
import Alert from './alert';
import './style/index.less';

Vue.use(ElementUI);

// 全局注册组件
Vue.component('Button',Button);
Vue.component('Alert',Alert);

import router from './route/hash/route';

new Vue({
    data: {
        router
    },
    el: '#app',
    render: h => h(App)
})