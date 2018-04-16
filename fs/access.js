const fs = require('fs');

fs.access(__dirname + '/hello.txt', (err) => {
  if (err) {
    console.error('access error: ' + err.message);
  } else {
    console.log(__dirname + '/hello.txt 文件存在');
  }
});

fs.access(__dirname + '/hello4.txt', (err) => {
  if (err) {
    console.error('access error: ' + err.message);
  } else {
    console.log(__dirname + '/hello4.txt 文件存在');
  }
});