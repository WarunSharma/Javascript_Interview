// 1. Use of forEach

/*
const nums = [1, 2, 3, 4, , 6, 7];

nums.forEach((num) => {
    if (num % 2 === 0)
        break;
    console.log(num);
});
    // Illegal break statement
*/

// 2.

/*
function foo() {
  return "I'm the outer function";
}

function test() {
  console.log(bar);
  return foo();
  var bar = "I'm a variable";
  function foo() {
    return "I'm the inner function";
  }
}
console.log(test());

*/

// 3.

/*
let a = true;
setTimeout(() => {
  a = false;
}, 2000)


while(a) {
  console.log(' -- inside whilee -- ');
}

*/

// 4.

/*
setTimeout(() => console.log(1), 0);

console.log(2);

new Promise(res => {
  console.log(3)
  res();
}).then(() => console.log(4));

console.log(5);

// 2 3 5 4 1

*/

// 5.

/*
async function foo() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log("C");
}

console.log("D");
foo();
console.log("E");

// D A E B C

*/