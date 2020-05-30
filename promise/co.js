const fs = require('fs').promises;

function* read() {
  const name = yield fs.readFile('./name.txt', 'utf8');
  const age = yield fs.readFile('./age.txt', 'utf8');
  return age;
}


const co = it => {
  return new Promise((resolve, reject) => {
    function next(data) {
      const { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then(next, reject);
      } else {
        resolve(value);
      }
    }
    next();
  });
}

co(read()).then((data) => {
  console.log(data);
})