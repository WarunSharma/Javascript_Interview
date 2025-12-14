/*
Reffered: https://www.youtube.com/watch?v=SpwzRDUQ1GI&t=7565s
Simple TypeScript examples — kept minimal and clear.

/*
What is typescript ?
- It is a strictly typed superset of javascript.
- It transpiles to javascript to run in browser or node.
- It adds types and compile time checking.
*/

/* Basic primitives */
const myName: string = "Warun Sharma";
const noOfWheels: number = 4;
const isStudent: boolean = false;
const nothing: null = null; // explicit absence
const notAssigned: undefined = undefined; // "no value yet"

/*
any: The any type essentially disables TypeScript's type checking for the variable it's assigned to.
You can assign any value to an any type, and perform any operation on it, without TypeScript raising
any errors during compilation.
*/
let anyData: any = 'Hello';
anyData = 21;
//console.log(anyData.toLowerCase()); Error

/*
unknown: The unknown type, introduced in TypeScript 3.0, is a safer alternative to any. While you can
assign any value to an unknown type, TypeScript requires you to perform type checking or a type
assertion before you can safely use the value in operations.
*/
let unknownData: unknown = 'data';
unknownData = 21;
if (typeof unknownData === 'string')
    console.log(unknownData.toLowerCase());

const big: bigint = 9007199254740991n;
const sym = Symbol("id");

/* Arrays and tuple */
const numbers: number[] = [1, 2, 3];
const fruits: Array<string> = ["apple", "banana"];
const userTuple: [string, number] = ["Alice", 30];

/* Enum and union */
// Enum: named set of related constants.

enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

/*
Union: In TypeScript, a union type allows a variable or parameter to hold values of multiple specified types.
It is declared using the pipe symbol (|) between the types.
*/
type UserRole = "admin" | "customer" | "rider";

/*
Intersection: In TypeScript, an intersection type allows for the combination of multiple types into a single,
new type. This new type possesses all the properties and members from each of the constituent types.
*/

type Admin = {name: string, priveledges: string[]};
type Employee = {name: string, startDate: Date};

type AdminEmployee = Admin & Employee;

const newAdmin: AdminEmployee = {
    name: 'Warun Sharma',
    priveledges: ['read'],
    startDate: new Date()
}

/*
Optional & Readonly properties
*/
type Car = {
    readonly number: string,
    brand: string,
    model?: string
}

const myCar: Car = {number: 'XC23671908', brand: 'Celerio'};

/* Domain types */
// Interface describes the shape of an object.

interface Address {
  street: string;
  readonly city: string;
  zip?: string;
}

interface Person {
  id: number;
  name: string;
  age: number;
  isStudent: boolean;
  address?: Address;
}

/* Sample data */
const PERSONS: Person[] = [
  { id: 1, name: "Warun", age: 31, isStudent: false },
  { id: 2, name: "Abhishek", age: 31, isStudent: false },
];

/* Type narrowing: return possibly undefined */
function getPersonDetails(identifier: number | string): Person | undefined {
  if (typeof identifier === "string") {
    return PERSONS.find((p) => p.name.toLowerCase() === identifier.toLowerCase());
  }
  return PERSONS.find((p) => p.id === identifier);
}

/* Prefer specific types to `any`. Use Partial/Omit for payloads */
const man: Partial<Person> = { name: "Abhishek", age: 31 };

/* Create person helper using Omit (server assigns id) */
function addPerson(payload: Omit<Person, "id">): Person {
  const newPerson: Person = { id: PERSONS.length + 1, ...payload };
  PERSONS.push(newPerson);
  return newPerson;
}

/* Generics — simple utility */
function getLastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}
const lastNumber = getLastItem<number>(numbers);
const lastFruit = getLastItem<string>(fruits);

/* Type guard example */
function isPerson(value: unknown): value is Person {
  return typeof value === "object" && value !== null && "id" in (value as object) && "name" in (value as object);
}

/* Small demonstrations (safe/logging only) */
console.log({
  myName,
  noOfWheels,
  isStudent,
  numbers,
  userTuple,
  Role,
  lastNumber,
  lastFruit,
  found: getPersonDetails("Warun")?.name ?? "not found",
  added: addPerson({ name: "Sneha", age: 28, isStudent: false }),
});