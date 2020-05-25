// 多个异步请求如何同时获取最终结果


const fs = require('fs');

let school = {};

const after = (times, callback) => {
  return function() {
    if(--times === 0) {
      callback();
    }
  }
}
const cb = after(2, function() {
  console.log(school);
})

fs.readFile('./name.txt', 'utf8', function(err, data) {
  school.name = data;
  cb();
});

fs.readFile('./age.txt', 'utf8', function (err, data) {
  school.age = data;
  cb();
});


