/*

JavaScript runs in a single thread but uses the event loop to handle asynchronous tasks (like setTimeout, Promises, or fetch calls) efficiently.

When async code is executed, like a setTimeout() or fetch(), the actual operation (e.g. HTTP request or timer) is handled by the browser/Web APIs.

Once the operation completes, a callback or continuation (like .then()) is queued:

Macrotask queue: setTimeout, setInterval, setImmediate

Microtask queue: Promise.then(), async/await, queueMicrotask

The event loop constantly checks if the call stack is empty. If it is, it:

First processes all microtasks,

Then takes one macrotask and processes it.

async/await is just syntactic sugar over Promises. It makes asynchronous code look and behave like synchronous code, which improves readability and error handling using try/catch.

*/