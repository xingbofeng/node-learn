const fs = require('fs');
const readableStream = fs.createReadStream(__dirname + '/hello.txt', 'utf-8');

let data = '';

readableStream.on('data', (chunk) => {
  data += chunk;
});

readableStream.on('end', () => {
  console.log(data);
});

readableStream.on('error', (err) => {
  console.error('readableStream error: ' + err.message);
});