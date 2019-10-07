'use strict';

/**
 * The exports property is an object of objects, whose sizes vary from small to large, meant
 * to be used in performance.js.
 *
 * @type Object
 */
module.exports = {
  smallObj: generateObject({},  10, 'howdy, grill', 0, 5),
  medObj:   generateObject({}, 100, 'howdy, grill', 0, 5),
  largeObj: generateObject({}, 500, 'howdy, grill', 0, 5),
};


/**
 * Generates an arbitrarily big object to for testing DeepClone against Lodash and vanilla JS.
 *
 * @param {Object} obj Initially an empty object, but it will refer to each sub-object at some
 *   point during the recursion.
 * @param {Number} numberOfKeys Denotes the number of keys to place in each object (including
 *   sub-objects).
 * @param {String} dummyValue Some dummy value to populate the values with.
 * @param {Number} currentLevel=0 The current level, out of the total `nestLevel`, being iterated
 *   over.
 * @param {Number} nestLevel=0 The total number of nesting to do; currently, I've everything set
 *   to 5 levels of nesting. This is a good candidate value for changing around to see whether it
 *   makes a difference to the perf tests.
 * @returns {Object} An object fit for testing in performance.js.
 */
function generateObject (obj, numberOfKeys, dummyValue, currentLevel = 0, nestLevel = 0) {
  let i = 0;
  while (i++ < numberOfKeys) {
    obj[i] = { dummyValue };
    if (currentLevel < nestLevel) {
      generateObject(obj[i], numberOfKeys, dummyValue, ++currentLevel, nestLevel);
    }
  }

  return obj;
}

