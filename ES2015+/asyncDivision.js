function asyncDivision(dividend, divisor, cb) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const result = dividend / divisor;
      if (isNaN(result) || !Number.isFinite(result)) {
        const error = new Error('Invalid operands');
        if (cb) {
          cb(error);
        }
        return reject(error);
      }
      if (cb) {
        cb(null, result);
      }
      return resolve(result);
    });
  });
}

asyncDivision(10, 10)
  .then((result) => console.log(result));

asyncDivision(10, 10, (err, result) => {
  if (!err) {
    console.log(result);
  }
});
