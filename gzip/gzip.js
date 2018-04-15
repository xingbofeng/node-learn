const zlib = require('zlib');
const fs = require('fs');

fs.readFile(__dirname + '/hello.txt', 'utf-8', (readFileErr, readFileData) => {
  if (readFileErr) {
    return console.error('readFileErr error:' + readFileErr.message);
  }
  zlib.gzip(readFileData, (gzipErr, gzipData) => {
    if (gzipErr) {
      return console.error('gzipErr error:' + gzipErr.message);
    }
    fs.writeFile(__dirname + '/hello.txt.gz', gzipData, (writeFileErr) => {
      if (writeFileErr) {
        return console.error('writeFile error:' + writeFileErr.message);
      }
    });
  });
});