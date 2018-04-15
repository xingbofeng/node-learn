const fs = require('fs');

const writeableStream = fs.createWriteStream(__dirname + '/hello3.txt', 'utf-8');

writeableStream.write('hello world 3', 'utf-8', (err, data) => {
  if (err) {
    console.error('write error: ' + err.message);
  }
});

writeableStream.on('close', () => {
  console.log('writeableStream is closed!');
});

writeableStream.end();
