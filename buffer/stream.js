const fs = require('fs');

// const buffer = Buffer.alloc(8);

// fs.open('./buffer/name.txt', 'r', (err, fd) => {
//     fs.read(fd, buffer, 0, 8, 0, (err, bytesRead) => {
//         console.log(bytesRead, buffer, buffer.toString());
//     })
// });


const wBuffer = Buffer.from('珠峰架构');

fs.open('./buffer/copy.txt', 'w', 438, (err, fd) => {
    console.log(fd, 'fd');
    fs.write(fd, wBuffer, 0, 6, 0, (err, writen) => {
        if (err) console.log(err);
        console.log('读取成功');
    });
});
