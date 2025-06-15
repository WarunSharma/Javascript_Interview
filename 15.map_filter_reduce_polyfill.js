
/*

https://www.youtube.com/watch?v=dGq0gi0wv64&list=PLKhlp2qtUcSaCVJEt4ogEFs6I41pNnMU5

*/

Array.prototype.myMap = function(cb){
    const modifiedArr = [];

    for (let i = 0; i < this.length; ++i) {
        modifiedArr.push(cb(this[i], i, this));
    }

    return modifiedArr;
}

const arr = [1, 2, 3, 4, 5];

const modifiedArr = arr.myMap((num, idx, arr) => num * 2);

console.log("Modified Array: ", modifiedArr);


Array.prototype.myFilter = function(cb){
    const modifiedArr = [];

    for (let i = 0; i < this.length; ++i) {
        if (cb(this[i], i, this)) {
            modifiedArr.push(this[i]);
        }
    }

    return modifiedArr;
}

const filteredArray = arr.myFilter((num, idx, arr) => num > 2);

console.log("Filtered Array: ", filteredArray);

Array.prototype.myReduce = function(cb, initialValue) {
    let accumulator = initialValue;

    for (let i = 0; i < this.length; ++i) {
        accumulator = accumulator ? cb(accumulator, this[i], i, this) : this[i];
    }

    return accumulator;
}

const reduceValue = arr.myReduce((acc, num, idx, arr) => num + acc, 0);

console.log("Reduced Value: ", reduceValue);