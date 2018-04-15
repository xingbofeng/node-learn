const fs = require('fs');

try {
  fs.writeFileSync(__dirname + '/hello2.txt', 'hello world 2', 'utf8');
} catch (err) {
  console.error('writeFile error: ' + err.message);
}