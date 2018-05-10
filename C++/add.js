const add = require('./build/Release/add');
const args = process.argv.slice(2).map(v => parseInt(v));
console.log(add(...args));
