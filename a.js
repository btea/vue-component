function v(obj){
    let arr = Object.keys(obj);
    let $obj = {};
    arr.map(key => {
        let attrs = key.split('.');
        attrs.reduce((str, v) => {
            let s = `$obj.${str}`;
            if(!eval(s)){eval(`${s}={}`);}
            return str += '.' + v;
        });
        eval(`$obj.${key}=obj[key]`);
    });
    return $obj;
}
v({'m': 10,'a.d.xx': 'adxx', 'a.e': 'ae'});


function t(obj){
    let arr = Object.keys(obj);
    let $obj = {};
    arr.map(key => {
        let attrs = key.split('.'), l = attrs.length;
        attrs.reduce((o, v, i) => {
            if(l === 1){
                $obj[v] = obj[key];
                return $obj;
            }
            if(!i){
                $obj[v] = $obj[v] || {};
                return $obj[v];
            }else{
                if(i === l - 1){
                    o[v] = obj[key];
                }else{
                    o[v] = {};
                }
                return o[v];
            }
        }, {})
    })
    return $obj;
}

// 连续并且出现次数最多

'abcaakjbb' => {'a':2,'b':2}
'abbkejsbcccwqaa' => {'c':3}


function s(str){
    let obj = {};
    str.split('').map((key, i, a) => {
        
    })
    console.log(s, t);
}