/*
Scope:
✔️ var is function-scoped.
✔️ let and const are block-scoped.

Mutability:
✔️ let and var can be reassigned.
✔️ const cannot be reassigned (but note: objects/arrays declared with const can still have their contents mutated).

Hoisting:
✔️ var is hoisted and initialized as undefined.
✔️ let and const are hoisted too but remain in the Temporal Dead Zone (TDZ) until their declaration is evaluated—accessing them before that throws a ReferenceError.
*/