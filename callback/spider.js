const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utils = require('./utils');

function spider(url, callback) {
  const filename = utils.urlToFilename(url);
  fs.exists(filename, exists => {
    if (!exists) {
      console.log(`Downloading ${url}`);
      request(url, (err, response, body) => {
        if (err) {
          return callback(err);
        }
        mkdirp(path.dirname(filename), err => {
          if (err) {
            return callback(err);
          }
          fs.writeFile(filename, body, err => {
            if (err) {
              return callback(err);
            }
            callback(null, filename, true);
          });
        });
      });
    } else {
      callback(null, filename, false);
    }
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of ${filename}`);
  } else {
    console.log(`${filename} was already downloaded`);
  }
});
