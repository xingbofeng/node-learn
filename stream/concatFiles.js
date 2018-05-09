const fromArray = require('from2-array'); // 从数组创建一个可读的流，每个数组元素就是一个chunk
const through = require('through2');
const fs = require('fs');

function concatFiles(destination, files, callback) {
  const destStream = fs.createWriteStream(destination);
  fromArray.obj(files)
  .pipe(through.obj(function (file, enc, done) {
    const self = this;
    fs.readFile(file, (err, data) => {
      self.push(data);
      done();
    });
  }))
  .pipe(destStream)
  .on('finish', () => {
    destStream.end();
    callback();
  });
}

concatFiles(process.argv[2], process.argv.slice(3), () => {
  console.log('end');
});

