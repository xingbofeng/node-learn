const fs = require('fs');
const zlib = require('zlib');

const gunzip = zlib.createGunzip();
const readableStream = fs.createReadStream('./hello.txt.gz');
const writeableStream = fs.createWriteStream('./hello2.txt');

readableStream.pipe(gunzip).pipe(writeableStream);