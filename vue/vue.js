class Vue{
    // 构造函数，主要是数据的初始化
    constructor(option = {}){
        this.$el = document.querySelector(option.el);
        let data = this.data = option.data;

        // 代理data，是其能直接this.xxx方式访问data，正常需要this.data.xxx
        Object.keys(data).forEach(key => {
            this.proxyData(key);
        })

        this.methods = this.methods;
        this.watcherTask = {}; // 需要监听的任务列表
        this.observer(data); // 初始化劫持监听所有数据
        this.compiler(this.$el); // 解析dom 
    }

    // 数据代理
    proxyData(key){
        let that = this;
        Object.defineProperty(that, key, {
            enumerable: true,
            configurable: false,
            set(newVal){
                that.data[key] = newVal;
            },
            get(){
                return that.data[key];
            }
        })
    }

    // 劫持监听所有数据
    observer(data){
        Object.keys(data).forEach(key => {
            let value = data[key];
            that.watcherTask[key] = [];
            Object.defineProperty(data, key, {
                configurable: false,
                enumerable: true,
                set(newVal){
                    if(newVal !== value){
                        value = newVal;
                        // 批量更新视图
                        that.watcherTask.forEach(task => {
                            task.update();
                        })
                    }
                },
                get(){
                    return value;
                }
            })

        }, this);
    }

    // 解析dom
    compiler(el){
        let nodes = el.childNodes;
        for(let i = 0; i < nodes.length; i++){
            const node = nodes[i];
            if(node.nodeType === 3){
                let text = node.textContent.trim();
                if(!text) continue;
                this.compileText(node, 'textContent')
            }else if(node.nodeType === 1){
                if(node.childNodes.length > 0){
                    this.compiler(node);
                }
                // let attributes = node.attributes;
                // console.log(attributes);
                return;
                if(node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')){
                    node.addEventListener('input', (() => {
                        let attrVal = node.getAttribute('v-model');
                        this.watcherTask[attrVal].push(new Watcher(node, this, attrVal, 'value'));
                        node.removeAttribute('v-model');
                        return () => {
                            this.data[attrVal] = node.value;
                        }
                    })())
                }
                if(node.hasAttribute('v-html')){
                    let attrVal = node.getAttribute('v-html');
                    this.watcherTask[attrVal].push(new Watcher(node,this,attrVal,'innerHTML'))
                    node.removeAttribute('v-html')
                }
                this.compileText(node,'innerHTML');

                if(node.hasAttribute('@click')){
                    let attrVal = node.getAttribute('@click')
                    node.removeAttribute('@click')
                    node.addEventListener('click',e => {
                        this.methods[attrVal] && this.methods[attrVal].bind(this)()
                    })
                }
            }
        }
    }
    
    // 解析dom里处理纯双花括号的操作
    compileText(node,type){
        let reg = /\{\{(.*?)\}\}/g, txt = node.textContent;
        if(reg.test(txt)){
            node.textContent = txt.replace(reg, (matchMedia, value) => {
                let tpl = this.watcherTask[value] || []
                tpl.push(new Watcher(node,this,value,type))
                if(value.split('.').length > 1){
                    let v = null;
                    value.split('.').forEach((val,i)=>{
                        v = !v ? this[val] : v[val]
                    })
                    return v
                }else{
                    return this[value]
                }
            })
        }
        console.log(node,type);
    }
}

// 更新视图操作
class Watcher{
    constructor(el, vm, value, type){
        this.el = el;
        this.vm = vm;
        this.value = value;
        this.type = type;
        this.update();
    }

    update(){
        this.el[this.type] = this.vm.data[this.value];
    }
}


