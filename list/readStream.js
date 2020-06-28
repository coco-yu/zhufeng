const EventEmitter = require('events');
const fs = require('fs');
const { Buffer } = require('buffer');
const { DEFAULT_MIN_VERSION } = require('tls');
class ReadStream extends EventEmitter {
  constructor(path, opts = {}) {
    super()
    this.path = path;
    this.flags = opts.flags || 'r';
    this.mode = opts.mode || 0o666;
    this.autoClose = opts.autoClose || true;
    this.start = opts.start || 0;
    this.end = opts.end;
    // 读取的数量默认是64k  如果文件大于64k 就可以采用流的方式
    this.highWaterMark = opts.highWaterMark || 64 * 1024;

    // 记录读取的偏移量
    this.pos = this.start;
    // 默认创建一个可读流 是非流动模式 不会触发data事件,如果用户监听了data事件后 需要变为流动模式
    this.flowing = false; // 是否是流动模式
    this.open(); // 打开文件  fs.open
    this.on('newListener', (type) => {
      if (type === 'data') {
        // 用户监听了data
        this.flowing = true;
        this.read(); // fs.read
      }
    });
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        return this.emit('error', err)
      }
      this.fd = fd; // 保存到实例上，用于稍后的读取操作
      this.emit('open', fd)
    })
  }
  read() {
    // 读取必须要等待文件打开完毕， 如果打开了会触发open事件 
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read());
    }
    // fs.read(this.fd);
    const buffer = Buffer.alloc(this.highWaterMark);
    const howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark;

    fs.read(this.fd, buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
      if (err) {
        return this.emit('error', err);
      }

      if (bytesRead) {
        this.pos += bytesRead;
        this.emit('data', buffer.slice(0, bytesRead));

        if (this.flowing) {
          this.read();
        }
      } else {
        this.emit('end');
        if (this.autoClose) {
          fs.close(this.fd, () => {
            this.emit('close');
          })
        }
      }
    });
  }

  pause() {
    this.flowing = false;
  }

  resume() {
    this.flowing = true;
    this.read();
  }
};

module.exports = ReadStream;