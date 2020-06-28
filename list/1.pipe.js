const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');
const WriteStream = require('./writeStream');
// fs.createReadStream(path.resolve(__dirname, 'name.txt')).pipe(fs.createWriteStream(path.resolve(__dirname, 'copy.txt')));
const rs = new ReadStream(path.resolve(__dirname, 'name.txt'), { highWaterMark: 4 }); // highWaterMark需要是字节数的倍数， 否则乱码
const ws = new WriteStream(path.resolve(__dirname, 'copy.txt'), { highWaterMark: 2 });

rs.on('data', (data) => {
    const flag = ws.write(data);
    // 达到临界值停止读取
    if (!flag) {
        rs.pause()
    }
});
// 缓存清空的时候再去读（这一次读取到的字节数写入完毕再去读）
ws.on('drain', () => {
    rs.resume();
});