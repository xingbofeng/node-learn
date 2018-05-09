process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk;
  while((chunk = process.stdin.read()) !== null) {
    console.log(chunk);
    if (chunk === '\n') {
      process.exit(0);
    }
  }
});

process.stdin.on('end', () => {
  console.log(`end`);
});