const zlib = require('zlib');
const fs = require('fs');

let readFileData;
try {
  readFileData = fs.readFileSync(__dirname + '/hello.txt', 'utf-8');
} catch (readFileErr) {
  console.error('readFileErr error:' + readFileErr.message);
}

let gzipData;
try {
  gzipData = zlib.gzipSync(readFileData);
} catch (gzipErr) {
  return console.error('gzipErr error:' + gzipErr.message);
}

try {
  fs.writeFileSync(__dirname + '/hello.txt.gz', gzipData);
} catch (writeFileErr) {
  return console.error('writeFile error:' + writeFileErr.message);
}