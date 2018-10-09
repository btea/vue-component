<template>
    <div class="body">
        <Button><span>this is a span</span></Button>
        <Button type="primary" title="文字">登录</Button>
        <Button type="primary" ghost :title="news"></Button>
        <Button type="warning"></Button>
        <Button type="warning" ghost></Button>
        <Button type="error">自定义按钮</Button>
        <Button type="error" ghost>自定义按钮，样式修改</Button>
        <Alert num="12" @zeng="bili">
            <div style="color: #6cf;" class="con">
                <p>第一个</p>
                <p style="color: #000;">第二个</p>
            </div>
            <div>456</div>
            弹窗
        </Alert>
    </div>
</template>

<script>
// 局部注册
// import Button from './button/button'
// console.log(Button);
export default {
    data(){
        return {
            news: 'no game no life'
        }
    },
    methods: {
        bili(target){
            console.log(target);
            console.log('bilibili');
        }
    }
    // 局部注册组件
    // components: {
        // Button: Button
    // },
}
</script>

