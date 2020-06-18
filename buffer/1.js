import { Buffer } from "buffer";

// Buffer
length // 获取字节长度
Buffer.alloc(5) // 创建5个字节大小的Buffer
Buffer.from('可可'); // 将汉字转为十六进制
Buffer.isBuffer(buf) // 判断是否为Buffer
const buf = Buffer.from('可可');
const bigBuf = Buffer.alloc(12);
// 参数一 源Buffer 参数二 从源Buffer的哪个位置开始复制 参数三 复制目标Buffer的开始位置 参数四 复制目标Buffer的结束位置
buf.copy(bigBuf, 0, 0, 6); 

Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd= this.length) {
    for(let i = sourceStart; i < sourceEnd; i++) {
        targetBuffer[targetStart++] = this[i];
    }
}

// Buffer.concat();

Buffer.concat = function(bufferList, length = bufferList.length) {
    const buffer = Buffer.alloc(length);
    let offset = 0;
    bufferList.forEach(buf => {
        buf.copy(buffer, offset);
        offset+= buf.length;
    });

    return buffer.slice(0, offset);
}
