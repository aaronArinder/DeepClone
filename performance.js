'use strict';

const _             = require('lodash');
const { Benchmark } = require('benchmark');
const { DeepClone } = require('.');

const { smallObj, medObj, largeObj } = require('./test-data');

console.log('\n Go grab yerself a coffee, grill, this might take a while.');

Object.entries({
  smallObj,
  medObj,
  largeObj
}).forEach(([testDataName, testData]) => {
  Object.entries({
    Lodash: (testData) => _.cloneDeep(testData),
    JSONParseStringify: (testData) => JSON.parse(JSON.stringify(testData)),
  }).forEach(([ methodName, method ]) => {
    // separate the test methods to keep from blowing the heap
    testPerf(testDataName, methodName, method, testData);
  });
});


/**
 * Creates and runs a test suite, DeepClone against Lodash, logging which is fastest and by what
 * hz (i.e., operations per second)
 *
 * @param {String} sizeName A string picking out which object is being tested: small, medium, or
 *   large. Those objects are created by ./test-data.js.
 * @param {Object} sizeObj A test object, whose size and level of nesting can vary
 */
function testPerf (sizeName, methodName, method, testData) {
  const suite = new Benchmark.Suite;
  suite
    .add('DeepClone', () => DeepClone(testData))
    .add(methodName, () => method(testData))
    .on('complete', function () {
      const fastest = this.filter('fastest')['0'];
      const slowest = this.filter('slowest')['0'];
      console.log(`For ${sizeName}, ${fastest.name} is faster than ${slowest.name} by ${fastest.hz - slowest.hz} operations per second`);
    })
    .run();
}
