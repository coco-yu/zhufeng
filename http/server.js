const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // res.write('hello'); // 可写流、end之后不能再写write方法， end方法相当于write+end
    console.log(req.method);
    const { pathname, query } = url.parse(req.url, true);
    console.log(pathname, query, '---');
    console.log(req.httpVersion);
    console.log(req.headers);
    res.end(pathname + ' ' +JSON.stringify(query));
});

let port = 3000;

server.listen(port, () => {
    console.log('server start', port)
});

server.on('error', (err) => {
    if (err.errno === 'EADDRINUSE') {
        server.listen(++port);
    }
})