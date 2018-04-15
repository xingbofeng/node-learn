const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const readableStream = fs.createReadStream('./hello.txt');
const writeableStream = fs.createWriteStream('./hello.txt.gz');

readableStream.pipe(gzip).pipe(writeableStream);