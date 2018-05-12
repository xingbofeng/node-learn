const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utils = require('./utils');

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if(err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if(err) {
      return callback(err);
    }
    saveFile(filename, body, err => {
      if(err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

function iterate(index, nesting, links, callback) {
  if (index === links.length) {
    return callback();
  }
  const url = links[index];
  spider(url, nesting - 1, err => {
    if (err) {
      return callback(err);
    }
    iterate(index + 1, nesting, links, callback);
  });
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }
  const links = utils.getPageLinks(currentUrl, body);
  
  iterate(0, nesting, links, callback);
}

function spider(url, nesting, callback) {
  const filename = utils.urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, body) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return callback(err);
      }
    }
    return download(url, filename, (err, body) => {
      if (err) {
        return callback(err);
      }
      spiderLinks(url, body, nesting, callback)
    });
  });
}


spider(process.argv[2], 1, (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of ${filename}`);
  } else {
    console.log(`${filename} was already downloaded`);
  }
});
