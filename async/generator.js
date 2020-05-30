// generator是一个生成器=>生成遍历器
// 类数组 有索引、有长度
// 类数组不能使用[...likeArr], 可以使用likeArr[Symbol.interator] = function (params) {}或者是Array.form(likeArr)
// const likeArr = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };

// likeArr[Symbol.iterator] = function () {
//   let i = 0;
//   return {
//     next: () => {
//       return { value: this[i], done: i++ === this.length };
//     }
//   }
// }

// likeArr[Symbol.iterator] = function *() {
//   let i = 0; 
//   while(i !== this.length) {
//     yield this[i++];
//   }
// }

// console.log([...likeArr]);

// function* read() {
//   yield 1;
//   yield 2;
//   yield 3;
// }
// const it = read();
// let flag = false;
// do {
//   const { value, done } = it.next();
//   console.log(value, done);
//   flag = done;
// } while (!flag);

function *read() {
  const a = yield 1;
  console.log(a, 'a');
  const b = yield 2;
  console.log(b, 'b');
  const c = yield 3;
  console.log(c, 'c');
  return c;
}

// 除了第一个next方法之外其他的next方法都是把next中的参数传递给上一次yield的返回结果
// 给第一个next传值毫无意义
const it = read();
it.next();
it.next('coco');
it.next('coco1');
