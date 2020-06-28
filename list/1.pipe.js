const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');
const WriteStream = require('./writeStream');
// fs.createReadStream(path.resolve(__dirname, 'name.txt')).pipe(fs.createWriteStream(path.resolve(__dirname, 'copy.txt')));
console.log(path.resolve(__dirname, 'name.txt'), '===')
const rs = new ReadStream(path.resolve(__dirname, 'name.txt'), { highWaterMark: 4 });
const ws = new WriteStream(path.resolve(__dirname, 'copy.txt'), { highWaterMark: 1 });

rs.on('data', (data) => {
    console.log(data.toString(), '---');
});