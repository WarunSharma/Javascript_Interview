const original = {
  name: "Warun",
  age: 30,
  skills: ["JavaScript", "React"],
  address: {
    city: "Delhi",
    coords: { lat: 28.6, lng: 77.2 }
  }
};

const copy = deepClone(original);
copy.name = "Someone Else";
copy.address.city = "Mumbai";

console.log(original.address.city);