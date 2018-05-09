const stream = require('stream');
const Chance = require('chance');
const chance = new Chance();

class RandomStream extends stream.Readable {
  constructor(options) {
    super(options);
  }

  _read(size) {
    const chunk = chance.string();
    console.log(`Pushomg chunk of size ${chunk.length}`);
    this.push(chunk, 'utf8');
    if (chance.bool({likelihood: 5})) {
      this.push(null);
    }
  }
}

const randomstream = new RandomStream();

randomstream.on('readable', () => {
  let chunk;
  while((chunk = randomstream.read()) !== null) {
    console.log(`Chunk received: ${chunk.toString()}`);
  }
});