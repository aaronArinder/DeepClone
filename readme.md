### Overview
This project is for deeply cloning JavaScript objects using a Node native add-on. I have a module that does the dirt, but that's the least interesting part. The interesting part is the performance tests! BenchmarkJS is used to show (at least at the time of writing, v8 version 7.6 has some improvements to `JSON.parse()` that might make change the outcome of one of the perforrmance tests--who knows) that both Lodash and _a_ vanilla JavaScript implementation are both slower.

The vanilla JavaScript implementation is `JSON.parse(JSON.stringify())`. Note that not everything cloneable is stringifiable; e.g., functions aren't stringifiable and thereby aren't cloneable with `JSON.parse(JSON.stringify())`. There are other vanilla JavaScript implementations of deep clone, but I'm only testing Lodash's library function: let it be the golden standard hoisted by the unwashed hordes of vanilla JavaScript implementations. If you know of a good vanilla JavaScript implementation, send it my way! I'd love to include it in tests.


### Use
Eventually I'll make DeepClone into an npm module. Until then, its use is running the tests and checking its performance against other deep clones.

First, `npm install`. Then, to run the tests: `npm run test`. To test its performance: `npm run performance`.

These both make use of `npm run build`, which uses `node-gyp` to build the add-on. You might run into trouble if you don't have `node-gyp` installed (you likely do). If you run into trouble, you might need to install `node-gyp`: `npm install -g node-gyp`.

