/*
What is typescript ?
- It is a strictly typed superset of javascript.
- It transpiles to javascript to run in browser or node.
- It adds types and compile time checking.
*/

/*
Basic types
*/
const personName: string = 'Warun Sharma';
const age: number = 30;
const canVote: boolean = true;

/*
Arrays
*/
const friends: string[] = ['Suman Dalh', 'Varinder Singh'];
const friendsAge: number[] = [28, 32];

/*
Tuples: A tuple is a typed array with a pre-defined length and types for each index.
*/
let friendWithAge: [string, number] = ['Suman Dahl', 28];

/*
enum: An enum is a special "class" that represents a group of constants (unchangeable variables).
*/

enum Role {
    USER = 0,
    ADMIN,
    SUPERADMIN
}

const myRole: Role = Role.ADMIN;
console.log(myRole);

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

/*
type
*/
type Student = {
    name: string,
    class: number | string
}

/*
interface: In TypeScript, an interface serves as a contract that defines the structure or "shape" of an object.
*/
interface Product {
    name: string,
    id: number,
    price: number
}

/*
Union: In TypeScript, a union type allows a variable or parameter to hold values of multiple specified types.
It is declared using the pipe symbol (|) between the types.
*/
let userId: string | number = 123;
userId = '123';

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

const myCar = {number: 'XC23671908', brand: 'Celerio'};

/*
Literal types & type narrowing
*/
type Direction = 'Left' | 'Right';
function move(dir: Direction) {
    console.log(dir);
}
move('Right');

/*
Generics: Generics in TypeScript provide a way to create reusable and type-safe components that can work
with a variety of data types, rather than being restricted to a single, fixed type.
*/
function wrapInArray<T>(value: T): T[] {
    return [value];
}

/*
Decorators: A decorator is a special kind of declaration that can be attached to classes, methods, properties,
accessors, or parameters to modify their behavior at runtime.
*/

function logger(constructor: Function) {
    console.log('Logging function: ', constructor);
}

@logger
class User{
    constructor(public name: string) {

    }
}

/*
Create a generic ApiResponse<T> interface and use it for:

// user: { id: number; name: string }
// product: { id: string; price: number }
*/

interface ApiResponse<T> {
    status: number,
    message: string,
    data: T
}

interface User {
    id: number | string,
    name: string
}

interface Item {
    id: number | string,
    price: number
}

const userRespone: ApiResponse<User> = {
    status: 200,
    message: 'User created successfully',
    data: {
        id: 1,
        name: 'Alice'
    }
}

const itemResponse: ApiResponse<Item> = {
    status: 200,
    message: 'Item created successfully',
    data: {
        id: '1',
        price: 3000
    }
}

/*
Use a union type to define LoginResult as either:
// { success: true, token: string } | { success: false, error: string }
*/
const loginResult: {success: boolean, token: string} | {success: boolean, error: string} = { success: true, error: 'login failed'};