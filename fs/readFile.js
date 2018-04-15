const fs = require('fs');

// 异步读取文件的方式

fs.readFile(__dirname + '/hello.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.error('readFile error: ' + err.message);
  }
  return console.log(data);
});