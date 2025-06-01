
var name = 'Sharma';

function greet() {
    console.log(`${this.name}`);
}

const obj = {
    name: 'Warun',
    greet1: () => {
        console.log(`${this.name}`);
        console.log(`${obj.name}`);
    },
    greet2() {
        console.log(`${this.name}`);
    }
}

greet(); // undefined
obj.greet1(); // undefined Warun
obj.greet2(); // 'Warun'

/*

Arrow functions do not have their own this — they lexically inherit it from their surrounding scope.

*/