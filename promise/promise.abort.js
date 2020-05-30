// 想要终端一个promise 使用promise.race

// const wrap = promise => {
//   let abort;
//   let myP = new Promise((resolve, reject) => {
//     abort = reject;
//   });
//   let p = Promise.race([promise, myP]);
//   p.abort = abort;
//   return p;
// }

// 示例：

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('成功');
//   }, 10000)
// })

// let p = wrap(promise);
// p.then((data)=> {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// });

// setTimeout(() => {
//   p.abort('promise 超时');
// }, 2000);


// 中断promise

// 可以取到值
// Promise.resolve(100).then().then().then((data) => {
//   console.log('获取值'+data);
// });

// 如果我想在第二个then的地方中断，可以使用一个promise， 不让它成功也不让它失败

Promise.resolve(100).then().then(() => {
  return new Promise((resolve, reject) => {
    // 相当于链断了
  })
}).then((data) => {
  // 不会执行到这里， 在第二个then的时候就不再往下执行了
  console.log('测试是否中断'+data);
}, (err) => {
  console.log(err);
})