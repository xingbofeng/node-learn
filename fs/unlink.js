const fs = require('fs');

fs.unlink(__dirname + '/hello.txt', (err) => {
  if (err) {
    console.error('unlink error: ' + err.message);
  } else {
    console.log('删除' + __dirname + '/hello 成功');
  }
});