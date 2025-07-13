// ✅ This file demonstrates JavaScript module systems with notes

// ==============================
// 📦 CommonJS Module (Node.js default)
// ==============================

// math.js
// This exports a function using CommonJS syntax
function add(a, b) {
  return a + b;
}
module.exports = { add };

// In another file (main.js):
// const math = require('./math');
// console.log(math.add(2, 3)); // 5

// CommonJS is:
// - Synchronous
// - Used by default in Node.js
// - Uses `require()` and `module.exports`


// ==============================
// 📦 ES Modules (Modern syntax)
// ==============================

// math.mjs or when "type": "module" is set in package.json

// This exports a function using ES Module syntax
export function multiply(a, b) {
  return a * b;
}

// In another file (main.mjs):
// import { multiply } from './math.mjs';
// console.log(multiply(2, 3)); // 6

// ES Modules:
// - Asynchronous (can use top-level await)
// - Native in browsers and Node.js (v12+)
// - Uses `import` / `export`

// Note: Use `.mjs` or set "type": "module" in package.json to enable ESM in Node.js

// ==============================
// 🔁 Summary
// ==============================

// CommonJS:
// - `require()` to import
// - `module.exports` to export
// - Works synchronously
// - Ideal for older Node.js versions

// ES Modules:
// - `import` / `export` syntax
// - Asynchronous, supports top-level `await`
// - Preferred in modern JS and browsers

// ✅ Both systems are supported in Node.js (>= v12)
// ❗ Mixing them requires care: e.g., you can't `import` a CommonJS module using `import` without compatibility tricks.
