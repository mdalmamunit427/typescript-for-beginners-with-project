# TypeScript Overview

## 1. Installing TypeScript
You can install TypeScript globally using npm (Node Package Manager). Open your terminal and run:
```bash
npm install -g typescript
```
## 2. Variable Declaration:
TypeScript allows you to declare variables with explicit types or let the compiler infer the type.

```
// Explicit type declaration (specifying the data type of a variable, must have a clone (:))
let myNumber: number = 42;
let myString: string = 'Hello, TypeScript!'; 


// Type inference (dynamically defines type)
let anotherNumber = 10; // TypeScript infers the type as number
let anotherString = 'TypeScript is awesome!'; // TypeScript infers the type as string
```


## 3. Compiling TypeScript:
After writing TypeScript code, you need to compile it to JavaScript. Save your TypeScript code in a file with a .ts extension and use the tsc command to compile it.

```
tsc filename.ts
```

## 4. Basic Types:
TypeScript supports various basic types, including number, string, boolean, array, object, etc.

```
let num: number = 42;
let str: string = 'TypeScript';
let flag: boolean = true;
let arr: number[] = [1, 2, 3];
let obj: { key: string } = { key: 'value' };
```

## 5. Functions:
TypeScript allows you to specify types for function parameters and return values.

```
function add(x: number, y: number): number {
    return x + y;
}

let result: number = add(5, 10);
```

## 6. Interfaces:
TypeScript supports interfaces for defining the structure of objects. This helps in defining contracts for classes or functions.

```
// Example using interfaces
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return `Hello, ${person.name}!`;
}

let user: Person = { name: 'John', age: 30 };
console.log(greet(user));
```

## 7. Classes:
TypeScript supports class-based object-oriented programming with features like inheritance, access modifiers, and more.

```
// Example using classes
class Animal {
    constructor(public name: string) {}

    makeSound(): string {
        return 'Generic animal sound';
    }
}

class Dog extends Animal {
    makeSound(): string {
        return 'Woof! Woof!';
    }
}

let myDog = new Dog('Buddy');
console.log(myDog.makeSound()); // Outputs: Woof! Woof!
```

## 8. Enums:
Enums are a powerful feature in TypeScript that allow you to define named constants. They offer several advantages over regular constants, including:

- Improved Readability: Enums make your code more readable by using descriptive names instead of numeric values.
* Type Safety: TypeScript can enforce type safety by only allowing valid enum values to be used.
* Reduced Errors: Using enums can prevent common errors, such as typos or using invalid values.
+ Code Organization: Enums can help you organize related constants into a single location.

There are two main types of enums in TypeScript:
1. Numeric Enums: 
Default type, where each member starts with a value of 0 and subsequent members are incremented by 1.

```
enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

const today = Day.Wednesday;

console.log(today); // Output: 3
```
2.  String Enums: 
Explicitly assign unique string values to each member. More readable and suitable for scenarios where the meaning of each value is important.

```
enum FileType {
  Text = "text",
  Image = "image",
  Audio = "audio",
  Video = "video",
}

const document = FileType.Text;

console.log(document); // Output: "text"
```

## 9. Generics:
Generics are a way to create reusable components (functions, classes, interfaces, etc.) that can work with different data types without compromising type safety.

They are defined using type parameters, enclosed in angle brackets (<>), which act as placeholders for actual types when the component is used.

---
- Generic Function Declaration:
```
function identity<T>(arg: T): T {
    return arg;
}


```
1. identity<T>: Declares a generic function named identity with a type parameter T.
2. arg: T: The function takes one argument named arg of any type T.
3. return arg: The function returns the same value it received, ensuring the returned type is also T.
 
 ----
- Calling the Generic Function:

```
let output: string = identity('hello');
console.log(output); // This will print "hello" to the console
```
1. identity('hello'): Calls the identity function with a string argument.
2. TypeScript infers that T should be string in this case, making output a string as well.
3. console.log will print "hello" to the console

---


## 10. Modules:
TypeScript uses the ES6 module system, allowing you to organize your code into separate files.

```
// Example using modules
// math.ts
export function add(x: number, y: number): number {
    return x + y;
}

// app.ts
import { add } from './math';
let result = add(5, 10);
```

## 11. TypeScript Configuration File
You can configure TypeScript using a tsconfig.json file. This file includes compiler options and other settings.

```
tsc --init
```
- version check:
``tsc --version``