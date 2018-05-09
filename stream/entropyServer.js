const http = require('http');
const Chance = require('chance');
const chance = new Chance();

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  function generateMore() {
    while(chance.bool({ likelihood: 95 })) {
      let shouldContinue = res.write(chance.string({ length: (16 * 1024) - 1 }));
      if (!shouldContinue) {
        console.log('背压产生');
        return res.once('drain', generateMore);
      }
    }

    res.end('\n The end... \n', () => console.log('end'));
  }

  generateMore();
});

server.listen(8080);
