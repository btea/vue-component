import Vue from 'vue';
import App from './app'

// import 'element-ui/lib/theme-chalk/index.css'
import Button from './button'
import Alert from './alert'
import './style/index.less'

// 全局注册组件
Vue.component('Button',Button);
Vue.component('Alert',Alert);

new Vue({
    el: '#app',
    render: h => h(App)
})

