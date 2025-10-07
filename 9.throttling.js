/*
Throttling is a technique to slow down or limit the rate at which a process, function, or data flow occurs, often to prevent resource exhaustion, ensure availability, and improve performance. It can be applied to internet data, software functions, and even physical processes. In software, throttling is similar to debouncing, but whereas debouncing delays an action until a period of inactivity, throttling ensures an action is performed at a maximum rate, even when invocations are continuous. 
*/

function throttle(fn, delay) {
  let isThrottled = false;
  return function (...args) {
    if (!isThrottled) {
      fn.apply(this, args); // Call immediately
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}

const func = throttle((...args) => {
  console.log(args);
}, 1000);

func(1, 2, 3, 4);

for (let i = 0; i < 4; ++i) {
  setTimeout(() => {
    func(5, 6);
  }, i * 1000);
}

/*

https://www.freecodecamp.org/news/throttling-in-javascript/

*/
