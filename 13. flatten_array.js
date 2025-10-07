
// Flatten array till particular depth
function flattenArray(arr, depth = 1) {
    if (depth === 0)
        return arr;
    const result = [];

    for (let ele of arr) {
        if (Array.isArray(ele)) {
            result.push(...flattenArray(ele, depth - 1));
        }
        else 
            result.push(ele);
    }

    return result;
}

function flattenArrayIterative(arr = [], depth = 0) {
    const result = [];
    const stack = arr.map(item => ({item, currentDepth: depth}));

    while (stack.length > 0) {
        const {item, currentDepth} = stack.pop();
        if (Array.isArray(item) && currentDepth > 0) {
            for (let ele of item) {
                stack.push({item: ele, currentDepth: currentDepth - 1});
            }
        }
        else 
            result.push(item);
    }

    return result.reverse();
}

// const result = flattenArray([1, [2, [3, 4]], 5, 6, [[7, 8, [9, 10]], 11, [12, [13, [14, 15]]]]], 0);
const result = flattenArrayIterative([1, [2, [3, 4]], 5, 6, [[7, 8, [9, 10]], 11, [12, [13, [14, 15]]]]], 2);
console.log(result);