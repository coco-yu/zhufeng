const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');
const WriteStream = require('./writeStream');
// fs.createReadStream(path.resolve(__dirname, 'name.txt')).pipe(fs.createWriteStream(path.resolve(__dirname, 'copy.txt')));
// console.log(path.resolve(__dirname, 'name.txt'), '===')
const rs = new ReadStream('./list/name.txt', { highWaterMark: 6 }); // highWaterMark需要是字节数的倍数， 否则乱码
const ws = new WriteStream('./list/copy.txt', { highWaterMark: 3 });

rs.on('data', (data) => {
   const flag =  ws.write(data);
   console.log(flag);
});