const fs = require('fs');
const path = require('path');
// const { Buffer } = require('buffer');
const ReadStream = require('./readStream');

const rs = new ReadStream(path.resolve(__dirname, 'name.txt'), {
  flags: 'r',
  encoding: null,
  mode: 0o666,
  autoClose: true,
  // start: 0,
  // end: 0,
  highWaterMark: 3
});
 
// let buffers = [];

// rs.on('open', (fd) => {
//   console.log(fd, 'fd');
// })

rs.on('data', (chunk) => {
  // rs.pause();
  // console.log('暂停');
  // setTimeout(() => {
  //   console.log('恢复');
  //   rs.resume();
  // }, 1000);
  console.log(chunk, 'chunk');
  // buffers.push(chunk);
});

// rs.on('end', () => {
//   const data = Buffer.concat(buffers).toString();
//   console.log('end', data);
// });

// rs.on('error', (err) => {
//   console.log(err, 'err');
// });

// rs.on('close', () => {
//   console.log('close');
// });

