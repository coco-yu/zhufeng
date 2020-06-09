const EventEmitter = require('./event');
const event = new EventEmitter();

const doSomething = (name) => {
    console.log('坚持', name);
}

const undo = (name) => {
    console.log('懈怠', name);
}

const onceFun = (name) => {
    console.log('执行一次', name);
}

event.once('coco', onceFun);
event.on('coco', doSomething);
event.on('coco', undo);

console.log(event, '------', event._events);
event.emit('coco', '可可');

event.emit('coco', '可可');

event.off('coco', onceFun);
console.log(event, '++++++');