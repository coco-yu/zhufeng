const fs = require('fs');
const path = require('path');

// 异步并行删除目录

const rmdir = (dir, cb) => {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            const dirs = fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item));
                
                if (dirs.length === 0) fs.rmdir(dir, cb);

                let index = 0;
                const done = () => {
                    if (++index === dirs.length) {
                        fs.rmdir(dir, cb);
                    }
                }

                
                for (let i = 0; i < dirs.length; i++) {
                    const dir = dirs[i];
                    rmdir(dir, done);
                }
            })
        } else {
            fs.unlink(dir, cb);
        }
    })
}

rmdir('a', () => {
    console.log('异步并行删除目录');
})



// 异步串行删除目录 连成一条线

// function rmdir(dir, cb) {
//     fs.stat(dir, (err, statObj) => {
//         if (statObj.isDirectory()) {
//             fs.readdir(dir, (err, dirs) => {
//                 dirs = dirs.map(item => path.join(dir, item));
//                 let index = 0;
//                 function next() {
//                     if(index === dirs.length) return fs.rmdir(dir, cb);
//                     const current = dirs[index++];
//                     rmdir(current, next);
//                 }
//                 next();
//             })
//         } else {
//             fs.unlink(dir, cb);
//         }
//     })
// }

// rmdir('a', (err) => {
//     console.log(err);
//     console.log('异步串行删除成功');
// })