const fs = require('fs');
const EventEmitter = require('events');
const LinkedList = require('./linkedlist');

class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    offer(element) {
        console.log(element, 'element');
        this.linkedList.add(element);
        console.log(this.linkedList, 'this.linkedList');
    }

    poll() {
        this.linkedList.remove(0);
    }
}

class WriteStream extends EventEmitter {
    constructor(path, options) {
        super();
        this.path = path;
        this.flags = options.flags || 'w';
        this.autoClose = options.autoClose || true;
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 0o666;
        this.start = options.start || 0;
        this.highWaterMark = options.highWaterMark || 16 * 1024; // 16k 这么多个字节

        this.len = 0;
        this.offset = this.start;
        this.writing = false;
        this.needDrain = false;
        this.cache = new Queue();

        this.open(); // 默认打开文件
    }

    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) return this.emit('error', err);
            this.fd = fd;
            this.emit('open', fd);
        });
    }

    write(chunk, encoding = 'utf8', cb = () => { }) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);

        this.len += chunk.length;
        const flag = this.len < this.highWaterMark;
        this.needDrain = !flag;

        console.log(this.writing, 'this.writing');
        if (this.writing) {
            this.cache.offer({ chunk, encoding, cb });
        } else {
            this.writing = true;
            this._write(chunk, encoding, () => {
                cb();
                this.clearBuffer();
            });
        }
        return flag;
    }

    _write(chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            // 订阅open事件， 当打开完毕触发fs.write
            return this.once('open', () => this._write(chunk, encoding, cb));
        }

        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            this.offset += written;
            this.len -= written;
            cb();
        });
    }

    clearBuffer() {
        const data = this.cache.poll();
        if (data) {
            const { chunk, encoding, cb } = data;
            this._write(chunk, encoding, () => {
                cb;
                this.clearBuffer();
            })
        } else {
            this.writing = false;
            if (this.needDrain) {
                this.needDrain = false;
                this.emit('drain');
            }
        }
    }
}

module.exports = WriteStream;