const fs = require('fs');
const path = require('path');

// 同步创建目录
// const mkdirP = (paths, cb) => {
//     const arr = paths.split('/');
//     for (let i = 0; i < arr.length; i++) {
//         const currentPath = arr.slice(0, i + 1).join('/');

//         if (i + 1 === arr.length) {
//             cb();
//         }
//         if (!fs.existsSync(currentPath)) {
//             fs.mkdirSync(currentPath);
//         }
//     }
// }


// mkdirP('a/b/c/d/e', () => {
//     console.log('同步目录创建成功')
// });

const mkdirP = (paths, cb) => {
    const arr = paths.split('/');
    let index = 0;
    function next() {
        if (index === arr.length) {
            return cb();
        }
        const currentPath = arr.slice(0, ++index).join('/');
        fs.access(currentPath, (err) => {
            // 说明目录不存在
            if (err) {
                fs.mkdir(currentPath, next);
            } else {
                next();
            }
        })
    }

    next();
}

mkdirP('a/b/m/n/p', () => {
    console.log('异步目录创建成功');
})