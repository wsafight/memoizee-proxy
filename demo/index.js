
const {memoizee} = require('../dist/index.js')

var fn = function(one, two, three) {
  /* ... */
};

var memoized = memoizee(fn);

memoized("foo", 3, "bar");
memoized("foo", 3, "bar"); // Cache hit