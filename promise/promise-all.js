// 判断是否是Promise
const isPromise = value => typeof value === 'function';

romise.all = function(promises) {
  return new Promise ((resolve, reject) => {
    for(let i = 0; i < promises.length; i++) {
    const result = promises[i];
      if(isPromise(result)) {
        result.then(resolve, reject);
      } else {
        resolve(result)
      }
    }
  })
}
