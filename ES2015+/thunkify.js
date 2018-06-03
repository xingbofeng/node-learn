function thunkify(fn) {
  return function() {
    let args = [].slice.call(arguments);
    return function(callback) {
      args.push(callback);
      fn.apply(this, args);
    }
  }
}

module.exports = thunkify;