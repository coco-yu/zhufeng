// 模版引擎 with语句+字符串拼接+new Function
// 实现一个模版引擎

const fs = require('fs');
const path = require('path');

const renderFile = (filePath,obj,cb) =>{
    fs.readFile(filePath,'utf8',function (err,html) {
        if(err){
            return cb(err,html);
        }
        // arguments[0] 就是匹配到的原字符串 arguments[1] 就是第一个原来括号
        html = html.replace(/\{\{([^}]+)\}\}/g,function () { // RegExp.$1
            let key = arguments[1].trim();
            return '${'+key+'}' // {{name}} => ${name}  
        });
        let head = `let str = '';\r\n with(obj){\r\n`;
        head += 'str+=`'
        html = html.replace(/\{\%([^%]+)\%\}/g,function () {
            return '`\r\n'+arguments[1] + '\r\nstr+=`\r\n'
        })
        let tail = '`}\r\n return str;'
        let fn = new Function('obj',head + html + tail);
        cb(err,fn(obj));
    });
}
renderFile(path.resolve(__dirname,'template.html'),{name:'zf',age:11,arr:[1,2,3]},function (err,data) {
    console.log(data);
});