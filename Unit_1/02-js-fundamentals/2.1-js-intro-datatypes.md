<img src="https://i.imgur.com/DEsPVNw.png">

# Intro to JavaScript & Data Types

## Learning Objectives

| Students will be able to: |
| :--- |
| Define Variables Using Proper Naming Conventions |
| Identify JavaScript's Data Types |

## Road Map
1. What are Computer Programs?
2. Intro to JavaScript
3. Variables
4. Explore JavaScript's Data Types
5. Review Questions
6. Further Study

## Setup

There won't be much code written during this introductory  walk-through on JavaScript.

However, I'll be using Chrome's Developer Tools to experiment and demonstrate some code - feel free to join me or simply watch and take notes, etc....

To open the DevTools in Chrome, press:
- `option + command + J` (macOS)
- `shift + CTRL + J` (Windows/Linux)

Within the **console** tab we can enter JS code and have it immediately evaluated.

#### Turning a Browser Tab Into a Notepad

If you'd like to turn your browser into a convenient notepad, open a tab and copy/paste this snippet into the address bar:
    
```
data:text/html, <html contenteditable style="font-family: 'Lucida Console', Monaco">
```
Bookmark it for future use!

## 1. What are Computer Programs?

Before we dive into any particular programming language, we should first consider what programming languages are used for - developing applications.

We develop computer applications/programs to solve problems and/or provide services (entertainment included) to our users.

Generally, applications primarily manipulate and display data.

When we program, we're concerned about the application's:

- Data
- Code (Program Statements)
- Input/Output

<img src="https://i.imgur.com/Vgn4gbS.png">

## 2. Intro to JavaScript

As the popularity of web-based applications has grown over time, so has the demand for JavaScript developers because JavaScript is the only language included in web browsers.

> _Atwood's Law:_<br>
> "Any application that can be written in JavaScript will eventually be written in JavaScript."<br>
> _\- Jeff Atwood, co-founder of Stack Overflow_

#### JavaScript's Role

The primary responsibility of JavaScript is to allow developers to implement behavior in web applications via client-side script that runs in the browser.

![](https://i.imgur.com/FwvjQVO.jpg)

> The popularity of a technology known as _Node.js_ has made JavaScript popular outside the browser as well.  We'll learn about _Node.js_ in the next unit!

#### A Few Facts About JavaScript:

- Created in 10 days in 1995 by [Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich).
- Not to be confused with Java (a [compiled language](https://en.wikipedia.org/wiki/Compiled_language)) - although Mr. Eich was tasked with making JavaScript's syntax similar to that of Java's.
- JavaScript is an implementation of [ECMAScript](https://tc39.es/ecma262/), a standard maintained by the [European Computer Manufacturers Association](https://www.ecma-international.org/)).
- JavaScript continues to be updated with new features.  The largest update/advancement, version ES2015/ES6, ushered in the era of "Modern JavaScript". [This website](http://kangax.github.io/compat-table/es6/) tracks the status of browser implementations of the latest features.

## 3. Variables

#### Purpose

The purpose of a **variable** in computer programming is to hold or reference data.

Think of variables as a way to name a "slot" in computer memory used to hold data.

Variables are ubiquitous in programming regardless of programming language!

#### `var`, `let` or `const`?

Variables in JS are created by declaring them using the `var`, `let` or `const` keywords.

> "Keywords" are predefined/reserved words that have special meaning to a programming language.

`var` was the only option available until the release of ES2015.

So why was `let` and `const` added to the language 20+ years after its creation?

##### Scope

The difference between `var` and `let`/`const` is what we call _scope_. Scope pertains to the accessibility of variables & functions at a given point in the code.

We're going to cover scope in an upcoming lesson, but feel free to refer to the Further Study section later for a preview.

##### `let` vs. `const`

The difference between `let` and `const` is that a variable declared using `const` cannot be **reassigned** to after its initialization.

For example, `let` and `var` variables can be updated after they are declared:

```js
let score = 25;
score = 100;  // no problem
```

However, a `const` variable cannot be updated:

```js
const score = 25;
score = 100;  // Uncaught TypeError: Assignment to constant variable
```

Although it's not possible to reassign to a `const` variable, if the variable references an object (or any sub-type of object, e.g., an array), the object itself can be mutated (changed):

```js
const person = {name: 'Fred'};
// No problem updating the person object
person.age = 25;  // no error
// Can't reassign to person variable!
person = {name: 'Barney'}  // Uncaught TypeError: Assignment to constant variable
```

#### Identifiers & Defining Variables

_Identifiers_ are used to give variables a name:

```js
// the identifier is "points" and names the variable "points"
let points;
```

> Note:  Identifiers are also used to name other parts of our programs such as functions and classes.

We can also assign a value to a variable at the time we declare it by using the `=` (assignment) operator:

```js
let winner = false;
```

and change it's value later...

```js
// Update an existing variable named winner
winner = true;
```

Multiple variables separated by commas can be defined in a single statement (this is typically avoided as it can be harder to read):

```js
let name = 'Wilma', age, town = 'Bedrock';

// above is equivalent to
let name = 'Wilma';
let age;
let town = 'Bedrock';
```

##### Identifier Naming Rules

In JavaScript, when naming variables, the convention is to name the identifiers using lowerCamelCase, e.g.,  `numActivePlayers`.

Identifiers in JS:

- Are case-sensitive!
- Cannot begin with a number
- Can contain letters, digits, underscores, and dollar signs

<details>
<summary>
❓ Is <code>player-2</code> a valid variable identifier?
</summary>

**No, because a hyphen is not a letter, a digit, an underscore or a dollar sign.**

**In the case of `player-2`, the JS engine would think we are trying to subtract `2` from a variable named `player`.**

</details>

## 4. Explore JavaScript's Data Types

#### Dynamic vs. Static Typed Languages

Dynamically-typed languages such as JavaScript, Python and Ruby allow variables to be assigned different types of data during runtime (as the program executes).

For example, in JavaScript we can do this:

```js
// Declare variable named data and initialize with a number
let data = 123;

// Reassigning a different type of data is allowed
data = 'Hello';

```

However, statically-typed languages such as Java and C++ require a variable's type to be declared in advance and any data assigned to the variable must be of that type:

```c++
// Declare variable as an integer and initialize
int data = 123;

// Assigning anything other than an integer raises an error
data = "Hello";  // NOT ALLOWED
```

There is a newer language called [TypeScript](https://www.typescriptlang.org/) gaining popularity - this language is a superset of JS - adding strong typing and other advanced features.  Many developers agree that strong typing makes code less error prone.

#### Exploring JavaScript's Data Types

JavaScript has eight main data types:

- Seven primitive data types which represent a **single** value:

  - [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type)
  - [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#string_type)
  - [Number & BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#number-type)
  - [Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#null_type)
  - [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#undefined_type)
  - [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#symbol_type)

- ...and an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#objects) type which is a collection of properties, where each property itself can hold any data type, including another object.

In addition to "plain objects", there are several [built-in object sub-types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) such as:

  - [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  - [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  - [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) (yes, functions are objects in JavaScript!)
  - [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
  - [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

> **KEY POINT: If a variable does not hold one of the seven primitive values, it is an object!**
 
Let's take a brief look at each of the above data types...

#### string

A **string** represents textual data with zero or more characters wrapped by single or double quotation marks such as `"John"` or `'Jane'`. A pair of quotes with nothing between them is still a **string** - an _empty string_.

```js
> 'Hello World'
< "Hello World"
> typeof "I'm a string"
< "string"
```

Note that the `typeof` operator itself always returns a string describing the data type.

> ES2015 Note: In addition to using single and double quotes to delimit a string, ES2015 adds a third way by using the backtick character to create what's called a _template literal_.  We'll learn more about _template literals_ soon.

#### number

A **number** represents a numeric value.

Unlike many other programming languages, there is no distinction between integer (`15`, `3`, etc.) and floating-point/decimal types (`17.24`, `3.1416`, etc.).

Internally, JS represents all numbers as floating-point values.

```js
> 15
< 15
> typeof 15
< "number"
> typeof 12.34
< "number"
> typeof '12.34'  // what will this return as the type?  
```

#### bigint

Added with ES2015, a bigint value can hold a massive integer value but it is not commonly needed or used - primarily because it is incompatible with the `number` type and none of the `Math` object's methods work with it.

```js
> 15n
< 15n
> typeof 15n
< "bigint"
```

#### boolean

Whereas strings and numbers can have a virtually unlimited number of different values, the **boolean** data type only has two possible values: `true` and `false`.

#### 👉 You Do: Data Type Examples (1 min)

**Strings**, **numbers** and **booleans** are the most common data types used to represent real-world data in applications.

For example, in a Social Gaming app, we would represent a Gamer's Handle using a **string**.

Before we review the other data types, take a couple of minutes to identify a couple of pieces of information for each of the three common data types that might be used in that social gaming app:

<table>
	<thead>
		<tr><th>Application</th><th>Data Type</th><th>Example Data/Information</th></tr>
	</thead>
	<tbody>
		<tr><td rowspan="3">Social Gaming App</td><td>String</td><td><code>gamerHandle</code>, ?</td></tr>
		<tr><td>Number</td><td>?, ?</td></tr>
		<tr><td>Boolean</td><td>?, ?</td></tr>
	</tbody>
</table>

<details>
<summary>
Examples...
</summary>

- String: Excellent for names and descriptions, e.g., `roomName`
- Number: Excellent for numerical info, e.g., `pointsScored`, the player's age, etc.
- Boolean: Great for info that's true/false, yes/no, on/off, etc.  For example: `isOnline`, `winner`, etc.

</details>

Excellent!  Now let's continue by looking at the other data types...

#### null

The _null_ data type has only one value: `null`.

We often assign the value `null` to a variable to represent the fact that it has no "real" value 😊

```js
> typeof null
< "object"  // Fail! Remember, JS was written in 10 days by one dude!
> let winner = null;
> winner === null
< true
```

#### undefined

```js
> typeof undefined
< "undefined"
```

Unlike `null` which we use to _intentionally_ represent no value, `undefined` is commonly used by JavaScript itself to represent no value:

- A variable that is defined but not assigned to has the value `undefined`, for example:
  ```js
  // cohort will be undefined
  let cohort;
  ```
- A function that doesn't return a value will return `undefined` instead.
  ```js
  function noReturn() {
    console.log('This function will return undefined');
  }
  // result will be undefined
  let result = noReturn();
  ```

We will commonly see `undefined` output in the console. For example, the `console.log()` below returns `undefined` because the `log` method was not designed to return anything:

```js
> console.log('hello')
  "hello"
< undefined
```

#### symbol

The _symbol_ data type was added with ES2015 and is primarily used to create uniquely named and less visible properties on objects.

Their use is rare in general JavaScript programming.

#### object

The seven data types that we've looked at thus far are classified as **_primitive_/_value_** data types because they hold only a **single value**.

Most programming languages also have **complex/reference** data types designed to hold more complex data structures.

JavaScript only has one **reference** type - the **object**.

Objects are collections of zero or more `key: value` pairs known as **properties**.

We will learn more about objects in a later lesson.

For now, let's just verify what `typeof` returns:

```js
> typeof {course: 'SEI', cohort: 99}
< "object"
> typeof []
< "object"
```

Although _functions_ are also considered objects (_callable objects_ to be exact), the `typeof` operator returns a more helpful data type:

```js
> typeof function(){}
< "function"
```

Yay, we've covered all eight data types!

## 5. ❓ Review Questions

<details>
<summary>Do all variables have a data type?</summary>

**Yes.  Even `undefined` is a data type.**
</details>

<details>
<summary>Is <code>let _save = '';</code> a valid variable declaration?</summary>

**Yes.  Variable identifiers can contain underscores.**
</details>

<details>
<summary>If a variable is not a string, number, boolean, null, undefined or a symbol, it must be an __________.
</summary>

**object**
</details>

## 6. Further Study

### Primitive vs. Reference Types (Objects)

The following diagram shows that JS objects, including object sub-types such as Arrays, are stored in a separate part of memory known at the "heap".

<img src="https://i.imgur.com/1NUgHM3.png">

Accordingly, instead of an actual value being held in the variable's "slot" in memory, a reference/pointer is held instead.

In JS, objects are considered equal to each other only if they are the very same object in memory.  For example, in the above diagram, the `clone` and `person` variables reference the same object, thus:

```js
clone === person  //-> true
```

However, different objects are not considered equal, even if they contain identical properties:

```js
const car1 = {make: 'Toyota'};
const car2 = {make: 'Toyota'};
car1 === car2  //-> false
```

### Scope - `var` vs. `let`/`const`

`var` has _function scope_ (also known as _local scope_), for example:

```js
// A single top-level "Global" (outside of functions) scope exists 
var result = 100;

function add(n1, n2) {
  var result = n1 + n2;
  return result;
}

function subtract(n1, n2) {
  var result = n1 - n2;
  return result;
}

console.log( add(10, 5) )  //=> 15
console.log( subtract(10, 5) )  //=> 5
console.log( result )  //=> 100 (global variable)
```

Note that each `result` variable is an independent variable.

Now, let's take a look at `let`/`const` which have more limited _block scope_.  In computer programming, it's considered a better practice to limit a variables scope (access) which reduces the chance of accidentally changing a variable's value.

In JS, we define a _block_ using curly braces, thus the above code example would behave identically if `let` or `const` were used instead of `var` because the functions' curly braces define a block.

In the following code example:

```js
// var version - will work because var has function scope
function getMsg(emotion) {
  if (emotion === 'happy') {
    var msg = 'Happy message';
  } else if (emotion === 'sad') {
    var msg = 'Sad message';
  }
  return msg;
}
```

The above example will work because the `msg` variable is accessible anywhere within the function (it has function scope thanks to the use of `var`).

However, let's see what happens if we use `let` instead...

```js
// let version - will not work because let has block scope
function getMsg(emotion) {
  if (emotion === 'happy') {
    let msg = 'Happy message';     // this msg is only accessible within its enclosing curly braces
  } else if (emotion === 'sad') {
    let msg = 'Sad message';       // this msg is only accessible within its enclosing curly braces
  }
  return msg;
}
```

Testing out the above will cause an error because the two `msg` variables are scoped to their code block and are not accessible outside of those blocks causing the `return msg;` to raise an error.

In order to be able to use `let` would require that the `msg` variable be declared "higher up" in the function, for example:

```js
// let version - will now work because msg now lives in the function's scope
function getMsg(emotion) {
  let msg;                     // msg is now scoped to the function's block
  if (emotion === 'happy') {
    msg = 'Happy message';     // update to the msg variable
  } else if (emotion === 'sad') {
    msg = 'Sad message';       // update to the msg variable
  }
  return msg;
}
```

### Type Conversion

JavaScript is very relaxed when it comes to data types. Contrary to non-dynamic languages, a variable can change its type.

```js
let m = 15;  // I'm a number
m = 'hey';   // Now I'm a string!
```

#### Beware of Implicit Conversion

JavaScript is friendly and tries to help us whenever it can. However, we all know that sometimes it's better to be left alone.

__Try adding a string to a number.  What did JS do?__

__Now try comparing a number and a string containing the same digits using the equality (`==`) comparison operator__

```js
13 == "13"  // returns true!
```

This is why, unless there's a reason not to do so, we use the _strict equality operator_ (`===`) as it will not perform type conversion. 

#### Explicit Type Conversion

We can easily convert a number to a string using the `toString()` and `toFixed()` methods:

```js
let n = 123.456;
let s1 = n.toString();  // "123.456"
let s2 = n.toFixed(2);  // "123.46"
```

There are a couple of handy methods used to convert strings to numbers: `parseInt()` and `parseFloat()`

```js
let s = "1234.567";
let n1 = parseInt(s);  // 1234
let n2 = parseFloat(s);  // 1234.456
```
Remember however, that the data type for both flavors, integer and float (short for floating-point), is _number_.

## References

[MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
