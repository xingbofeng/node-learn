const fs = require('fs');

fs.writeFile(__dirname + '/hello2.txt', 'hello world 2', 'utf8', (err) => {
  if (err) {
    console.error('writeFile error: ' + err.message);
  }
});