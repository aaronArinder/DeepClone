const { DeepClone } = require('./build/Release/DeepClone');

console.log('DeepClone', DeepClone);

const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = DeepClone(obj1);

obj1.d = 4;
obj2.e = 5;

console.log('obj2', obj2);
console.log('obj1', obj1);

module.exports = DeepClone;

