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

/*
 * The following tests demonstrate that certain failures of JSON.parse(JSON.stringify())
 * aren't problems for this native addon. Specifically, anything that can't be stringified
 * won't be cloned: functions, Symbols, undefined, and circular references. (I _think_ that's
 * it).
 * */


/* FUNCTIONS */
const functionObj = {
  helloWorld: () => 'hello, world',
};

const functionCloned = DeepClone(functionObj);

assert.deepStrictEqual(functionCloned, functionObj);
assert.strictEqual(functionCloned.helloWorld(), 'hello, world');
console.log("PASSED: functions cloned");


/* UNDEFINED */
const undefinedObj = {
  undefined: undefined,
};

const undefinedCloned = DeepClone(undefinedObj);
assert.deepStrictEqual(undefinedCloned, undefinedObj);
console.log("PASSED: undefined cloned");


/* NULL */
const nullObj = {
  null: null,
};

const nullCloned = DeepClone(nullObj);
assert.deepStrictEqual(nullCloned, nullObj);
console.log("PASSED: null cloned");


/* SYMBOL */
const symbolKey = Symbol('key');
const symbolVal = Symbol('val');
const symbolObj = {};
symbolObj[symbolKey] = symbolVal;

const symbolCloned = DeepClone(symbolObj);
assert.deepStrictEqual(symbolCloned, symbolObj);
console.log("PASSED: Symbol cloned");


/* ARRAYS */
const array = [ 1, 2, 3, 4, 5 ];
const arrayCloned = DeepClone(array);

assert.deepStrictEqual(arrayCloned, array);
console.log("PASSED: array cloned");


console.log('\n');

