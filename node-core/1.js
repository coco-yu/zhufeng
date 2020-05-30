// 前端有bom dom window
// node有glaobal

// global
// 1、process 进程!! （进程大于线程）
// 默认取值会先从glaobal中查找
// console.log(Object.keys(process));
// console.log(process);
// console.log(process.platform); // 判断当前执行的系统环境 win32 darwin
// console.log(process.argv); // 1、node的执行文件 2、指代node当前运行的文件 （解析用户自己传递的参数）
// 执行node文件 node 文件名 a b c d (参数)
// const args = process.argv.slice(2);
// console.log(args);

// let obj = {};
// args.forEach((item, index) => {
//   if(item.startsWith('--')) {
//     obj[item.slice(2)] = args[index + 1]
//   }
// });
// console.log(obj)


// commander yargs webpack
// const program = require('commander');
// program.version('1.0.0');
// program.command('create').action(() => {
//   console.log('创建项目');
// })
// program.name('coco');
// program.usage('coco-server');
// program.option('-p, --port <v>', 'set your port');
// program.option('-c --config <v>', 'set your config');
// let r = program.parse(process.argv);
// console.log(r);
// Buffer 处理二进制文件
// clearInterval clearTimeout
// setInterval setTimeout
// clearImmediate setImmediate

// 当用户在哪儿执行node命令的时候， 就去哪儿找配置文件
// console.log(process.cwd()); // 当前用户的工作目录
console.log(process.env);

// console.log(process.env); // 环境变量
// console.log(process.nextTick);