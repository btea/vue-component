<template>
    <div class="body">
        <Button><span>this is a span</span></Button>
        <Button type="primary" title="文字">登录</Button>
        <Button type="primary" ghost :title="news"></Button>
        <Button type="warning"></Button>
        <Button type="warning" ghost></Button>
        <Button type="error">自定义按钮</Button>
        <Button type="error" ghost v-drag>自定义按钮，样式修改</Button>
        <Alert num="12" @zeng="bili">
            <div style="color: #6cf;" class="con">
                <p>第一个</p>
                <p style="color: #000;">第二个</p>
            </div>
            <div>456</div>
            弹窗
        </Alert>
        <div>github commit test</div>
        <!-- <v-uploader></v-uploader> -->
        <div class="table">
            <be-table 
                :data="water.data" 
                :header="water.header" 
                :key="tableKey"
                :sortable="sort"
                :cell-style="cellStyle">
            </be-table>
        </div>
        <te-color-picker value="#0ff"></te-color-picker>
        <router-link v-for="(p, i) in routerList" :key="i" :to="p"><h2>{{p.desc}}</h2></router-link>
        <router-view></router-view>
        <video src="" id="video"></video>

        <attrs @click="buttonEvent($event)" type="checkbox" data-name="this is a inherit attr"></attrs>
        <div style="width: 400px; height: 400px;">
            <circle-ring :options="{}"></circle-ring>
        </div>
        <!-- <star></star> -->
		<!-- <line-flow></line-flow> -->
		<!-- <bubble-flow></bubble-flow>
		<div class="box" style="width: 600px; height: 600px; position: relative;">
			<radar></radar>
		</div> -->
		<div class="dial" style="width: 600px; height: 600px; position: relative; margin: 0 auto;">
			<area-radar></area-radar>
		</div>
		<el-table
		:data="tableData"
		style="width: 100%">
		<el-table-column
			prop="date"
			label="日期"
			width="180">
			<template slot-scope="scope">
				<div>{{JSON.stringify(scope.row)}}</div>
			</template>
		</el-table-column>
		<el-table-column
			prop="name"
			label="姓名"
			width="180">
		</el-table-column>
		<el-table-column
			prop="address"
			label="地址">
		</el-table-column>
		</el-table>
    </div>
</template>

<script>
// 局部注册
// import Button from './button/button'
// console.log(Button);

import beTable  from './be-table';
import beTableColumn from './be-table-column';
import teCascader from './te-cascader';
import teColorPicker from './te-color-picker';
import circleRing from './circle';
import star from './starSky';
import lineFlow from './lineFlow';
import bubbleFlow from './bubbleFlow'
import radar from './radar'
import areaRadar from './areaRadar'
// $attrs/$listeners
import attrs from './attrs/attrs';

// 路由测试
import routerLink  from './route/hash/routerLink';
import routerView from './route/hash/routerView';

export default {
    data(){
        return {
            news: 'no game no life',
            arr: new Array(10),
            water: {
                header: [
                    {prop: 'station', label: '水位站', width: '80'},
                    {prop: 'rain', label: '当前水位(m)', width: '75'},
                    {prop: 'limit', label: '汛限水位(m)', width: '75'},
                    {prop: 'overstep', label: '超汛限水位(m)', width: '80'},
                    {prop: 'status', label: '关注', width: '40'}
                ],
                data: (() => {
                    let arr = [], len = 1000;
                    for(let i = 0; i < len; i++){
                        arr.push({
                            stationId: '123',
                            station: '站名站名站名站名站名站名',
                            rain: this.randomVal(15,5),
                            limit: this.randomVal(30,20),
                            overstep: '-5',
                            lon: 28.1,
                            lat: 120.9,
                            focus: 1
                        })
                    }
                    return arr;
                })()
            },
            sort: [1, 2, 3],
            tableKey: Math.random().toString(16).slice(2),
            options: [{
                id: '1',
                name: '河南',
                children: [
                    {
                        id: '2',
                        name: '郑州',
                        children: [
                            {
                                id: '5',
                                name: '新密市'
                            }
                        ]
                    },
                    {
                        id: '3',
                        name: '济源'
                    }
                ]
            }],
            treeData: ['5'],
            routerList: [
                {path: '/a', name: 'a', desc: '个人中心', type: 'hash'},
                {path: '/b', name: 'b', desc: '菜单', type: 'hash'}
			],
			tableData: [
				{date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, 
				{date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄'}, 
				{date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄'}, 
				{date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1516 弄'}
			]
        }
	},
	mounted() {
		
	},
    methods: {
        randomVal(max, min){
            return Math.floor(Math.random() * (max - min  + 1) + min);
        },
        bili(target){
            console.log(target);
            console.log('bilibili');        
        },
        cellStyle(i, item){
            if(i === 1){
                if(item.rain > 10){
                    return {color: 'red'};
                }
            }
            if(i === 2){
                if(item.limit > 25){
                    return {
                        color: 'aqua',
                        fontWeight: 700    
                    };
                }
            }
            return {};
        },
        buttonEvent(e){
            console.log(e.target);
        },
    },
    // 局部注册组件
    // components: {
        // Button: Button
    // },
    components: {
        beTable,
        beTableColumn,
        teCascader,
        teColorPicker,
        routerLink,
        routerView,
        attrs,
        circleRing,
		star,
		lineFlow,
		bubbleFlow, 
		radar, 
		areaRadar
    }
}
</script>

<style lang="scss" scoped>
    .table{
        width: 380px;
    }
</style>


