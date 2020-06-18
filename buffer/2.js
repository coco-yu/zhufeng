const fs = require('fs');

// 同步读取文件
// const r = fs.readFileSync('./buffer/name.txt');
// console.log(r, r.toString());
// 默认会将二进制文件转换成字符串写到文件中
// fs.writeFileSync('./buffer/copy.txt', r);

// 异步读取文件
fs.readFile('./buffer/name.txt', (err, data) => {
    if(err) {
        return console.log(err);
    }

    fs.writeFile('./buffer/copy.txt', data, (err, data) => {
        console.log('写入成功');
    })
})

