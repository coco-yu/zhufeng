// promise是一个类
// promise有三种状态 pending（默认） resolve reject
// 用户自己决定成功的原因和失败的原因，成功和失败也是用户自己定义的
// promise默认执行器立即执行
// promise实例都有一个then方法， 一个参数是成功的回调一个参数是失败的回调
// 如果执行函数的时候发生异常也会执行失败的逻辑
// promise的状态一旦改变就不会再变

// 实现一个

// 定义promise的三个状态
const RESOLVE = 'RESOLVE'; // 成功状态
const REJECT = 'REJECT'; //失败状态
const PENDING = 'PENDING'; // 等待态

class Promise {
  constructor(exector) {
    this.status = PENDING; // 默认状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVE;
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
      }
    }

    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === RESOLVE) {
      onFulfilled(this.value);
    }

    if (this.status === REJECT) {
      onRejected(this.reason);
    }
  }
}

module.exports = Promise;