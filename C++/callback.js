const callback = require('./build/Release/callback');
console.log(callback((value) => {
  console.log(value);
}));
