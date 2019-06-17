<template>
    <div class="table" :style="sty">
        <div class="header">
            <div class="item" 
                :class="{'is-sortable': sortable.includes(i)}" 
                v-for="(item,i) in header" 
                :key="item.prop" 
                :style="{width: item.width - 1+ 'px'}"
                @click="dataSort(item.prop, i)">
                {{item.label}}<em v-if="sortable.includes(i)"></em>
            </div>
        </div>
        <ul class="body">
            <li class="list-item" v-for="(d, i) in tableData" :key="i" :class="{mark: Number(d.overstep) > 0}">
                <div class="val" v-for="(v, j) in headerProp.slice(0, -1)" :key="j" :class="v" :style="{width: header[j].width - 1 + 'px'}">{{d[v]}}</div>
                <div class="val" :class="headerProp[last]" :style="{width: header[last].width - 1 + 'px'}" v-html="d[headerProp[last]]"></div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['header', 'data', 'sty', 'sortable'],
    data(){
        let $header = this.header;
        return {
            tableData: JSON.parse(JSON.stringify(this.data)),
            headerProp: (() => {
                let arr = [];
                $header.forEach(p => {
                    arr.push(p.prop);
                });
                return arr;
            })(),
            last: $header.length - 1,
            isSort: ''
        }
    },
    mounted(){
        console.log(this);
    },
    methods: {
        dataSort(key, i){
            if(this.sortable.includes(i)){
                if(this.isSort === key){
                    // 若排序的参数所有值都相等，不必变化
                    let first = this.tableData[0][key];
                    if(this.tableData.every(item => item[key] === first)){
                        return;
                    }
                    this.tableData = this.tableData.reverse();
                    return;
                }
                let data = JSON.parse(JSON.stringify(this.tableData));
                data.sort((f, s) => f[key] - s[key]);
                this.tableData = data;
                this.isSort = key;
            }
        },

    }
}
</script>

<style lang="scss" scoped>
    $c:#ebeef5;
    $font: 12px;
    $padding: 15px;
    .table{
        border: 1px solid $c;
        overflow: auto;
        .header{
            font-size: 0;
            .item{
                // display: inline-block;
                display: table-cell;
                text-align: center;
                // line-height: 1.5;
                font-size: $font;
                vertical-align: middle;
                padding: $padding;
                font-weight: 700;
            }
            .is-sortable{
                cursor: pointer;
            }
            em{
                position: relative;
                top: 10px;
                width: 0;
                height: 0;
                border: 5px solid #000;
                border-left-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
            }
            .item~div{
                border-left: 1px solid $c;
            }
        }
        .body{
            list-style: none;
            margin: 0;
            padding: 0;
            max-height: 300px;
            overflow-x: hidden;
            overflow-y: auto;
            .list-item{
                border-top: 1px solid $c;
                font-size: 0;
                .val{
                    text-align: center;
                    vertical-align: middle;
                    line-height: 1.5;
                    padding: 10px 5px;
                    font-size: $font;
                    // display: inline-block;
                    overflow: hidden;
                    // padding-bottom:3000px;
                    // margin-bottom:-3000px;
                    padding: $padding; 
                    display: table-cell;
                }
                .val~div{
                    border-left: 1px solid $c;
                }
            }
        }
    }
</style>


