const fs = require('fs');
const path = require('path');

// 同步穿行删除目录 连成一条线

function rmdir(dir, cb) {
    fs.stat(dir, (err, statObj) => {
        if (statObj.isDirectory()) {
            fs.readdir(dir, (err, dirs) => {
                dirs = dirs.map(item => path.join(dir, item));
                let index = 0;
                function next() {
                    if(index === dirs.length) return fs.rmdir(dir, cb);
                    const current = dirs[index++];
                    rmdir(current, next);
                }
                next();
            })
        } else {
            fs.unlink(dir, cb);
        }
    })
}

rmdir('a', (err) => {
    console.log(err);
    console.log('异步串行删除成功');
})