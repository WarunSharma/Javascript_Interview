const original = {
  name: "Warun",
  age: 30,
  skills: ["JavaScript", "React"],
  address: {
    city: "Delhi",
    coords: { lat: 28.6, lng: 77.2 }
  }
};
original.self = original

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object')
    return obj;

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }
  const cloneObj = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      cloneObj[key] = deepClone(obj[key]);
  }

  return cloneObj;
}

const copy = deepClone(original);
copy.name = "Someone Else";
copy.address.city = "Mumbai";

console.log(original.address.city);