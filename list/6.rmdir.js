// 同步删除目录 使用先序遍历

const fs = require("fs");
const path = require('path');

const rmdirP = (dir) => {
  const stat = fs.statSync(dir);

  if(stat.isDirectory()) {
    // 如果是目录， 获取子目录或文件
    const dirs = fs.readdirSync(dir);
    dirs.forEach(item => rmdirP(path.join(dir, item)));
    fs.rmdirSync(dir);
  } else {  
    fs.unlinkSync(dir);
  }
}

rmdirP('a');