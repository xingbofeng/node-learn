const stream = require('stream');
const fs = require('fs');
const split = require('split');
const request = require('request');

class LimitParallelStream extends stream.Transform {
  constructor(concurrency, userTransform) {
    super({
      objectMode: true,
    });
    this.concurrency = concurrency;
    this.userTransform = userTransform;
    this.running = 0;
    this.terminateCallback = null;
    this.continueCallback = null;
  }

  _transform(chunk, enc, done) {
    this.running++;
    this.userTransform(chunk, enc, this.push.bind(this), this._onComplete.bind(this));
    if (this.running < this.concurrency) {
      done();
    } else {
      this.continueCallback = done;
    }
  }

  _flush(done) {
    if (this.running > 0) {
      this.terminateCallback = done;
    } else {
      done();
    }
  }

  _onComplete(err) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    const tempCallback = this.continueCallback;
    this.continueCallback = null;
    tempCallback && tempCallback();
    if (this.running === 0) {
      this.terminateCallback && this.terminateCallback();
    }
  }
}

fs.createReadStream(process.argv[2])
  .pipe(split())
  .pipe(new LimitParallelStream(1, (url, enc, push, done) => {
    if (!url) {
      return done();
    }
    request.head(url, (err, response) => {
      push(url + ' is ' + (err ? 'down' : 'up') + '\n');
      done();
    });
  }))
  .pipe(fs.createWriteStream('results.txt'))
  .on('finish', () => console.log('All urls were checked'));