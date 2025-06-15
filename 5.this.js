/**
 *
 * 🔍 Purpose: Demonstrate different `this` behavior in JavaScript
 * 📌 Key Concepts:
 *   - `this` depends on how a function is called
 *   - Arrow functions inherit `this` from parent scope
 *   - Use `.bind()` to explicitly fix `this`
 */

// Global scope
console.log("1. Global scope:", this); // In browser: window; In Node.js: {}

// Object method
const person = {
  name: "Warun",
  greet() {
    console.log("2. Object method:", this.name); // Warun
  },
};
person.greet();

// Regular function
function sayHello() {
  console.log("3. Regular function:", this); // undefined in strict mode
}
sayHello();

// Arrow function (global)
const arrowHello = () => {
  console.log("4. Arrow function (global):", this); // Inherits from parent scope
};
arrowHello();

// Arrow inside object method
const obj = {
  name: "Warun",
  greet() {
    setTimeout(() => {
      console.log("5. Arrow inside method:", this.name); // Warun
    }, 100);
  },
};
obj.greet();

// Method passed to setTimeout (loses `this`)
setTimeout(person.greet, 200); // undefined (not called as person.greet)

// Using bind to fix `this`
setTimeout(person.greet.bind(person), 300); // Warun

// Arrow function used incorrectly in object (bad for `this`)
const badObj = {
  name: "Incorrect",
  greet: () => {
    console.log("6. Arrow function as method:", this.name); // undefined
  },
};
badObj.greet();

// Class method `this`
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log("7. Class method:", this.name);
  }
}
const user = new User("Warun Sharma");
user.sayHi(); // Warun Sharma
