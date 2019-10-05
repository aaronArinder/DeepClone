/*
 * strict mode: gives err diff when objects tested,
 * and uses strict versions of operators (e.g., equality).
 * */

const assert        = require('assert').strict;
const { DeepClone } = require('.');

console.log('\n Successfully rebuilt; logging DeepClone to show it\'s native code:\n');
console.log('DeepClone', DeepClone, '\n');

const testObj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 4,
    f: 5,
    g: {
      h: 'e double hockey sticks',
    }
  }
};

const clonedObj1 = DeepClone(testObj1);

assert.deepStrictEqual(clonedObj1, testObj1);
console.log('PASSED: deeply cloned objects strictly equal');

// mutated cloned object and original object not deeply equal. This is the core
// test of difference.
clonedObj1.i = 4;
assert.notDeepStrictEqual(clonedObj1, testObj1);
console.log('PASSED: mutating deeply cloned objects don\'t mutate same object');

console.log('\n');

