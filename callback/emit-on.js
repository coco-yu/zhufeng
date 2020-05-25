// 发布订阅模式 主要分成两部分 on emit 
// on是把一些函数维护到一个数组中
// emit让数组中的方法一次执行
// 订阅和发布没有明显的联系， 靠中介

const fs = require('fs');

const event = {
  arr:[],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn()); // 有两个读取是因为第二次emit的时候里面有两个方法
  }
}

event.on(function() {
  console.log('读取了一个');
});

event.on(function() {
  if(Object.keys(school).length === 2) {
    console.log(school);
  }
})

let school = {};
fs.readFile('./name.txt', 'utf8', function(err, data) {
  school.name = data;
  event.emit();
});

fs.readFile('./age.txt', 'utf8', function(err, data) {
  school.age = data;
  event.emit();
})
