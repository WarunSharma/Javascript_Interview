function once(fn) {
    let called = false;
    let val;
    return (...args) => {
        if (called) {
            return val;
        }
        val = fn(...args);
        called = true;
        return val;
    }
}

const sayHello = once((a, b) => {
    console.log("Called with", a, b);
    return a + b;
})

console.log(sayHello(1, 2));
console.log(sayHello(3, 4));