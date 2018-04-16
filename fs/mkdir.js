const fs = require('fs');

fs.mkdir(__dirname + '/hello', (err) => {
  if (err) {
    console.error('mkdir error: ' + err.message);
  } else {
    console.log('创建' + __dirname + '/hello 成功');
  }
});
