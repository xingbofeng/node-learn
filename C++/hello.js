const addon = require('./build/Release/addon');
const add = addon.add;
const args = process.argv.slice(2).map(v => parseInt(v));
console.log(add(...args));