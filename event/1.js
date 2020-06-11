const EventEmitter = require('./event');
const event = new EventEmitter();
const util = require('util');
console.log(util, 'util');

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

event.once('coco', onceFun);
event.once('coco', twoFun);
event.once('coco', threeFun);
console.log(event);
event.on('coco', doSomething);
event.on('coco', undo);

event.emit('coco', '可可');

event.emit('coco', '可可');

event.off('coco', onceFun);