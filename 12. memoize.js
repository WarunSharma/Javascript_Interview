/*

* Memoization is an optimization technique used to speed up function calls by caching the results of expensive function calls and returning the cached result when the same inputs occur again.

*/

function memoize(fn) {
  let cache = {};
  return function (...args) {
    const key = JSON.stringify(args);

    // if (key in cache)
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    } else {
      cache[key] = fn(...args);
      return cache[key];
    }
  };
}

function sum(a, b) {
  return a + b;
}

const memoizedFn = memoize(sum);

let result = memoizedFn(1, 2);

console.log(result);
