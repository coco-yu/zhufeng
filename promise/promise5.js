// promise有两个静态方法 
// Promise.resolve() 快速创建一个成功的promise
// Promise.reject() 快速创建一个失败的promise

// resolve会等待里面的promise执行完毕
// reject不会等待
const RESOLVE = 'RESOLVE'; // 成功状态
const REJECT = 'REJECT'; //失败状态
const PENDING = 'PENDING'; // 等待态

// 所有的promise都要兼容
const resolvePromise = (promise2, x, resolve, reject) => {
  // 循环引用 自己等待自己完成
  if (promise2 === x) { // 用一个类型错误结束promise
    return reject(new TypeError('Chaining cycle deteched for promise #<Promise>'))
  }
  // 严格判断， 保证自己写的能和别的库一起使用
  let called;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 是函数、对象、但不一定是Promise

    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 这里只能认为这里是一个promise, 多次取值可能报错 
        then.call(x, y => { // 根据promise的状态来决定是成功还是失败
          // resolve(y);
          if (called) return; // 成功失败只能调用一个
          called = true;
          resolvePromise(promise2, y, resolve, reject); // 递归解析过程
        }, e => {
          if (called) return;
          called = true;
          reject(e);
        });
      } else {
        resolve(x);
      }
    } catch (e) { // 防止失败在进入成功
      if (called) return;
      called = true;
      reject(e); // 取值出错
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(exector) {
    this.status = PENDING; // 默认状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.resolveCallbacks = []; //存放成功的回调
    this.rejectCallbacks = []; // 存放失败的回调
    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject); // 递归解析resolve的值， 直到这个值是普通值

      }

      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVE;
        this.resolveCallbacks.forEach(fn => fn());
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        this.rejectCallbacks.forEach(fn => fn());
      }
    }

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVE) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value); // 普通值 Promise
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECT) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            // todo... 扩展
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.rejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        })
      }
    });
    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data)
    });
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    })
  }
}

module.exports = Promise;