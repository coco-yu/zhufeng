const fs = require('fs');

const buffer = Buffer.alloc(8);

fs.open('./buffer/name.txt', 'r', (err, fd) => {
    fs.read(fd, buffer, 0, 8, 0, (err, bytesRead) => {
        console.log(bytesRead, buffer, buffer.toString());
    })
})