const crypto = require('crypto');
const fs = require('fs');

const sha1Stream = crypto.createHash('sha1');
sha1Stream.setEncoding('base64');

const md5Stream = crypto.createHash('md5');
md5Stream.setEncoding('base64');

const inputStream = fs.createReadStream(process.argv[2]);

inputStream.pipe(sha1Stream).pipe(fs.createWriteStream(process.argv[2] + '.sha1'));
inputStream.pipe(md5Stream).pipe(fs.createWriteStream(process.argv[2] + '.md5'));