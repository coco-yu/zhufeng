// 使用async await来实现同步的创建目录

const fs = require('fs').promises;

const mkdirP = async (paths) => {
  const arr = paths.split('/');
  for (let i = 0; i < arr.length; i++) {
    const currentPath = arr.slice(0, i + 1).join('/');

    try {
      await fs.access(currentPath);
    } catch (e) {
      await fs.mkdir(currentPath);
    }
  }

}

mkdirP('a/b/c/d/e/f');