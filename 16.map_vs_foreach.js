/*
✅ map vs forEach in JavaScript

👉 Purpose:
- map: Transforms each item and returns a **new array**
- forEach: Executes a function for each item, **does not return** anything meaningful

👉 Return Value:
- map returns a new array
- forEach returns undefined

👉 Mutability:
- map is pure (does not mutate original array if used properly)
- forEach is often used for side effects (e.g., logging, updating external variables)

👉 Chainable:
- map can be chained with other array methods
- forEach is not chainable

✅ Example - map:
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2); // [2, 4, 6]

✅ Example - forEach:
const nums = [1, 2, 3];
nums.forEach(n => console.log(n * 2)); // Logs: 2 4 6

📌 Use `map` when:
- You want to create and use a **new transformed array**

📌 Use `forEach` when:
- You just want to **perform side effects** like logging, updating external state, DOM updates

⚠️ Do not use `map` if you’re not using the returned array
*/
