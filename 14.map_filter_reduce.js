
/*
✅ map()
- Used to transform each element of an array.
- Returns a new array with the same length.

const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]

Use Case: Convert values, format data

✅ filter()
- Filters elements based on a condition.
- Returns a new array with matching elements.

const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

Use Case: Get subset of data

✅ reduce()
- Reduces the array to a single value.
- Takes a callback (accumulator, currentValue)

const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, curr) => acc + curr, 0); // 10

Use Case: Sum, average, flatten, group, count, etc.
*/


const arr = [1, 2, 3, 4, 5];

const modifiedArr = arr.map((num, idx, arr) => num * 2);

console.log("Modified Array: ", modifiedArr);

const filteredArray = arr.filter((num, idx, arr) => num > 2);

console.log("Filtered Array: ", filteredArray);

const reduceValue = arr.reduce((acc, num, idx, arr) => num + acc);

console.log("Reduced Value: ", reduceValue);