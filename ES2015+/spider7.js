const utils = require('./utils');
const promisify = require('./promisify');
const request = promisify(require('request'));
const mkdirp = promisify(require('mkdirp'));
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const path = require('path');

const TaskQueue = require('./taskQueue');
const downloadQueue = new TaskQueue(2);

function spiderLinks(currentUrl, body, nesting) {
  if (nesting === 0) {
    return Promise.resolve();
  }
  const links = utils.getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    let completed = 0;
    let errored = false;
    links.forEach(link => {
      let task = () => {
        return spider(link, nesting - 1)
          .then(() => {
            if (++completed === links.length) {
              resolve();
            }
          })
          .catch(() => {
            if (!errored) {
              errored = true;
              reject();
            }
          });
      }
      downloadQueue.pushTask(task);
    });
  });
}

function download(url, filename) {
  console.log(`Downloading ${url}`);
  let body;
  return request(url)
    .then(response => {
      body = response.body;
      return mkdirp(path.dirname(filename));
    })
    .then(() => writeFile(filename, body))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`);
      return body;
    });
}

const spidering = new Map();
function spider(url, nesting) {
  if(spidering.has(url)) {
    return Promise.resolve();
  }
  spidering.set(url, true);
  
  const filename = utils.urlToFilename(url);
  return readFile(filename, 'utf8')
    .then(
      body => spiderLinks(url, body, nesting),
      err  => {
        if(err.code !== 'ENOENT') {
          throw err;
        }
        
        return download(url, filename)
          .then(body => spiderLinks(url, body, nesting));
      }
    );
}

spider(process.argv[2], 1)
  .then(() => console.log('Download complete'))
  .catch(err => console.log(err));
