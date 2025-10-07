/*
Debouncing is a technique that limits how often a function can be executed by delaying its execution until a certain period of inactivity has passed. When a debounced function is called repeatedly within the specified interval, a timer is reset each time, ensuring that the actual function only runs once after the user has paused their activity. This is commonly used to improve performance in scenarios like search autosuggestions, window resizing, or button clicks, preventing lag and unnecessary resource consumption by consolidating rapid, repeated events into a single action.
*/

function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, ...args);
    }, delay);
  };
}

const debouncedFn = debounce(() => {
  console.log("Fn called");
}, 2000);

debouncedFn();

setTimeout(debouncedFn, 4000);

/*

If asked to support immediate mode (i.e., call the function on the leading edge instead of the trailing edge), you can mention this optional enhancement:

function debounce(fn, delay, immediate = false) {
    let timerId;
    return function(...args) {
        const callNow = immediate && !timerId;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    }
}

*/
