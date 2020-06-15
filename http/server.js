const http = require('http');

const server = http.createServer((req, res) => {
    res.write('hello');
    // res.end();
});

let port = 3000;

server.listen(port, () => { 
    console.log('server start', port)
});

server.on('error', (err) => {
    if(err.errno === 'EADDRINUSE') {
        server.listen(++port);
    }
})