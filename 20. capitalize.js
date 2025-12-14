/*
https://www.freecodecamp.org/learn/daily-coding-challenge/2025-12-14
Given a string title, return a new string formatted in title case using the following rules:

Capitalize the first letter of each word.
Make all other letters in each word lowercase.
Words are always separated by a single space.
*/

function titleCase(title) {
  return title
    .toLowerCase()
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

// Example
console.log(titleCase("hELLo woRLD")); 
// Output: "Hello World"