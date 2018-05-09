const zlib = require('zlib');
const crypto = require('crypto');
const combine = require('multipipe');

const compressAndEncrypt = password => {
  return combine(zlib.createGzip(), crypto.createCipher('aes192', password));
}

const decryptAndDecompress = password => {
  return combine(crypto.createDecipher('aes192', password), zlib.createGunzip);
}

const fs = require('fs');
// fs.createReadStream(__dirname + '/' + process.argv[3], { encoding: 'utf8' })
//   .pipe(compressAndEncrypt(process.argv[2]))
//   .pipe(fs.createWriteStream(`${process.argv[3]}.gz.enc`, { encoding: 'utf8' }));

fs.createReadStream(__dirname + '/' + process.argv[3] + '.gz.enc', { encoding: 'utf8' })
  .pipe(decryptAndDecompress(process.argv[2]))
  .pipe(fs.createWriteStream(`${process.argv[3]}`, { encoding: 'utf8' }));