function iterate(index, array, preValue, func) {
  if (index === array.length) {
    return preValue;
  }
  const currentValue = array[index];
  const newValue = func(preValue, currentValue);
  return iterate(index + 1, array, newValue, func);
}

function reduce(func, start) {
  if (start !== void 0) {
    return iterate(0, this, start, func);
  } else {
    return iterate(1, this, this[0], func);
  }
}

Array.prototype.reduce2 = reduce;

console.log([1, 2, 3].reduce2((pre, cur) => pre + cur, 0));
console.log([1, 2, 3].reduce2((pre, cur) => pre + cur));
