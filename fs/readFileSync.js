const fs = require('fs');

// 直接同步读取文件的方式

try {
  const data = fs.readFileSync(__dirname + '/hello.txt', 'utf-8');
  console.log(data);
} catch(err) {
  console.error('readFileSync error: ' + err.message);
}
