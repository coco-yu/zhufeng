const http = require('http');

const server = http.createServer((req, res) => {
    res.write('hello');
    res.end('world'); // 有end表示响应完成一定要有end
});

const port = 3000;

server.listen(port, () => {
    console.log('server start', port)
});

// 出错的时候调用
server.on('error', (err) => {
    if (err.errno === 'EADDRINUSE') {
        server.listen(++port);
    }
});