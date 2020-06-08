function EventEmitter() {
    this._events = {};
}

EventEmitter.prototype.on = function (eventName, callback) {
    if (!this._events) this._events = {};
    (this._events[eventName] || t(his._events[eventName] = [])).push(callback);
}