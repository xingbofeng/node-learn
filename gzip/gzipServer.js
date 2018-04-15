const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 如果HTTP报文头部是否含有Accept-Encoding首部，并且其值为gzip
  if (req.headers['accept-encoding'].indexOf('gzip') !== -1) {
    // 设定response HTTP报文头部的Content-Encoding首部值为gzip
    res.writeHead(200, {
      'Content-Encoding': 'gzip',
    });
    // 在每次请求到来时创建Gzip
    const gzip = zlib.createGzip();
    return fs.createReadStream(__dirname + '/hello.html').pipe(gzip).pipe(res);
  }
  return fs.createReadStream(__dirname + '/hello.html').pipe(res);
});

server.listen(80, () => {
  console.log('server listen in localhost:80')
});