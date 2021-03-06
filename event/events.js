function EventEmitter() {
    this._events = {}; // 给EventEmitter添加事件对象
}

EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = {}; // 给实例添加事件对象
    // 如果不是newListener，那就需要触发newListener的回调，emit的是newListener的第二个参数的方法
    if(eventName !== 'newListener'){
        this.emit('newListener', eventName);
    }

    (this._events[eventName] || (this._events[eventName] = [])).push(callback);
}

EventEmitter.prototype.emit = function (eventName, ...args) {
    if (this._events && this._events[eventName]) {
        this._events[eventName].forEach(event => event(...args));
    }
}

EventEmitter.prototype.off = function (eventName, callback) {
    if (this._events && this._events[eventName]) {
        this._events[eventName] = this._events[eventName].filter(cb => (cb !== callback && cb.l !== callback));
    }
}

EventEmitter.prototype.once = function (eventName, callback) {
    const once = (...args) => {
        callback(...args);
        this.off(eventName, once);
    }

    once.l = callback;
    this.on(eventName, once);
}

module.exports = EventEmitter;