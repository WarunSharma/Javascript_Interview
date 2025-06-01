const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 25 },
  { id: 4, name: "David", age: 35 }
];

function groupByAge(users) {
    const obj = {};

    for (let user of users) {
        (obj[user.age] ??= []).push(user);
    }

    return obj;
}

function calculateAverageAge(group) {
    let sumAge = 0;
    let noOfUsers = 0

    for (let g in group) {
        sumAge += Number(g) * group[g].length;
        noOfUsers += group[g].length;
    }

    return sumAge / noOfUsers;
}

const userGroup = groupByAge(users);
console.log(userGroup);
const averageAge = calculateAverageAge(userGroup);
console.log(averageAge);