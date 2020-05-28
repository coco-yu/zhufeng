// promise调用then方法时可能当前的promise还是pending状态
// 使用发布订阅模式 如果当前状态是pending，我们需要将成功的回调、失败的回调存放起来。
// 稍后再调用promise的resolve和reject的时候重新执行

const RESOLVE = 'RESOLVE'; // 成功状态
const REJECT = 'REJECT'; //失败状态
const PENDING = 'PENDING'; // 等待态

class Promise {
  constructor(exector) {
    this.status = PENDING; // 默认状态
    this.value = undefined; // 成功的原因
    this.reason = undefined; // 失败的原因
    this.resolveCallbacks = []; //存放成功的回调
    this.rejectCallbacks = []; // 存放失败的回调
    let resolve = (value) => {
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
    if (this.status === RESOLVE) {
      onFulfilled(this.value);
    }

    if (this.status === REJECT) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      this.resolveCallbacks.push(() => {
        onFulfilled(this.value);
      });

      this.rejectCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

module.exports = Promise;