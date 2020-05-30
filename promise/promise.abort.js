// 想要终端一个promise 使用promise.race

const wrap = promise => {
  let abort;
  let myP = new Promise((resolve, reject) => {
    abort = reject;
  });
  let p = Promise.race([promise, myP]);
  p.abort = abort;
  return p;
}

示例：

let p = warp(promise).then((data)=> {
  console.log(data);
}, (err) => {
  console.log(err);
});

setTimeout(() => {
  p.abort('promise 超时')；
})
