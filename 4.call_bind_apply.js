/*

"call and apply are for method borrowing. You can call methods from another object; arguments are passed comma-separated in call and as an array in apply. bind returns a function to be called later."
call and apply invoke a function with a specific this value — call uses comma-separated arguments, apply uses an array.
bind returns a new function with this bound, which can be called later.
*/

/* 
    Call
    Use Case: Borrowing a method from another object
*/
function greet(greeting) {
  console.log(`${greeting} ${this.name}`);
}

const Users = [
  { name: "Warun Sharma", occupation: "Engineer" },
  { name: "Ankit Kapadia", occupation: "Social Activist" },
  { name: "Sunidhi Rawat", occupation: "Criketer" },
];

Users.forEach((user) => {
  greet.call(user, "Hello");
});

function User(name, occupation) {
  this.name = name;
  this.occupation = occupation;
  this.greet = function (greeting) {
    console.log(`${greeting} ${this.name}`);
  };
}

const newUsers = [user1, user2, user3];

const user1 = new User("Warun Sharma", "Engineer");
const user2 = new User("Ankit Kapadia", "Social Activist");
const user3 = new User("Sunidhi Rawat", "Cricketer");

newUsers.forEach((user) => {
  user.greet(user, "Hello");
});

/*
    Apply
    Use Case: Passing variable arguments to a function
*/

const salaries = [120000, 200000, 70000, 160000];
const maxSalary = Math.max.apply(null, salaries);
console.log(maxSalary);

/*
    Bind
    Use Case: Passing Methods as Callbacks Without Losing Context
*/

// Important: bind returns a new function with the context set, it does not call the function immediately.
const person = {
  name: "Warun Sharma",
  sayHello() {
    console.log(`Hello my name is ${this.name}`);
  },
};

person.sayHello();
setTimeout(person.sayHello, 0); // Undefined, context of person is lost
setTimeout(() => person.sayHello(), 0);
setTimeout(person.sayHello.bind(person), 0);
