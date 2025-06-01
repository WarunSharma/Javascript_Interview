/*

A closure is a function that remembers the variables from its outer lexical scope even after the outer function has finished executing.

When a function is defined inside another function, it closes over the variables from the outer function — meaning it retains access to them even if the outer function has already returned.

Closures are heavily used in data privacy, encapsulation, function factories, and even in frameworks like React (e.g., hooks).
*/

function outer() {
  let counter = 0;
  
  return function inner() {
    counter++;
    console.log(counter);
  };
}

const increment = outer();
increment(); // 1
increment(); // 2
