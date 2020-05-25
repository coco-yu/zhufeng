// 函数柯里化

const isType = (type, value) => {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}

const currying = (fn, arr = []) => {
  const len = fn.length;
  return function(...args) {
    let concatValue = [...arr, ...args];
    if(concatValue.length < len) {
      return currying(fn, arr);
    } else {
      return fn(...args);
    }
  }
}

const isArray = currying(isType)('Array'); // 判断是否为数组类型
const isString = currying(isType)('String'); // 判断是否为字符串类型

