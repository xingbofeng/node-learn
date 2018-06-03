const readFile = require('./thunkify')(require('fs').readFile);
function asyncFlowWithThunks(generatorFn) {
  let gen = generatorFn(); // 首次执行generator函数，第一次中断
  function next(err, data) {
    // 先将gen执行到下一步
    // data作为next函数的参数，会被传递给外层的变量，例如下面例子中的f1
    let result = gen.next(data);
    if (result.done) {
      return;
    }
    // 由于thunk化，gen.value就是对应API的callback
    // 例如readFile，next就是readFile的回调函数，在回调函数中去触发next
    result.value(next);
  }
  next();
}

asyncFlowWithThunks(function*() {
  var f1 = yield readFile('./package.json', 'utf-8');
  console.log(f1);
  var f2 = yield readFile('./utils.js');
});
