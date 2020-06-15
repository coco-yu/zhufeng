const EventEmitter = require('./events');
const event = new EventEmitter();
const util = require('util');
// console.log(util, 'util');

const doSomething = (name) => {
    console.log('坚持', name);
}

const undo = (name) => {
    console.log('懈怠', name);
}

const onceFun = (name) => {
    console.log('执行一次1', name);
}

const twoFun = (name) => {
    console.log('执行一次2', name);
}

const threeFun = (name) => {
    console.log('执行一次3', name);
}

event.on('newListener', (type) => {
    console.log('type', type);
    if(type === 'coco') {
        // 在当前同步代码执行完毕后触发事件
        process.nextTick(() => {
            event.emit(type);
        })
        
    }
});

// event.once('coco', onceFun);
// event.once('coco', twoFun);
// event.once('coco', threeFun);
// console.log(event);
// event.on('coco', doSomething);
event.once('coco', undo);
event.once('coco', doSomething);
// event.emit('coco', '可可');

// event.emit('coco', '可可');

// event.off('coco', onceFun);
