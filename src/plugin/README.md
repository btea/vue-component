[说明](https://cn.vuejs.org/v2/guide/plugins.html)

插件通常会为Vue添加全局功能。插件的范围没有限制--一般有下面几种：
1、添加全局方法或者属性，如：vue-custom-element
2、添加全局资源：指令/过滤器/过渡等，如vue-touch
3、通过全局mixin方法添加一些组件选项，如：vue-router
4、添加Vue实例方法，通过把它们添加到Vue.prototype上实现
5、一个库，提供自己的API，同时提供上面提到的一个或多个功能，如vue-router

### 使用插件
##### 通过全局方法Vue.use()使用插件。它需要在你调用new Vue()启动应用之前完成:  
// 调用MyPlugin.install(Vue)
Vue.use(MyPlugin)
new Vue({
    // ...options
})

##### 也可以传入一个选项对象：
Vue.use(MyPlugin, {someOption: true})

##### Vue.use会自动阻止多次注册相同插件，届时只会注册一次该插件。
