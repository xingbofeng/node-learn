const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor() {
    super({
      objectMode: true,
    });
  }

  _write(chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), (err) => {
      if (err) {
        return callback(err);
      }
      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

const tfs = new ToFileStream();

tfs.write({ path:'file.txt', content: 'hello world' });

tfs.end(() => console.log('tfs end...'));
