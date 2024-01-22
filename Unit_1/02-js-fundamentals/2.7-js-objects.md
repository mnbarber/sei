<img src="https://i.imgur.com/DEsPVNw.png" height="400">

# Intro to JavaScript Objects

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the Use Case for Objects |
| Create Objects Using Object Literal Syntax |
| Add a Property to an Existing Object |
| Modify the Value of a Property |
| Explain When to Use Dot or Square Bracket Notation |
| Delete a Property |
| Iterate Over an Object's Properties |
| Use Property Shorthand Syntax |
| Identify when a Property is a Method |
| Describe How a Variable References an Object |

## Road Map

1. Setup
2. The What and Why of Objects
3. Creating Objects
4. Adding Properties to an Existing Object - Dot Notation
5. Practice - Adding/Updating Properties
6. Accessing Properties with Square Bracket Notation
7. Practice - Square Bracket Notation
8. Checking if an Object has a Property
9. Deleting a Property
10. Iterating Over an Object's Properties
11. Property Shorthand Syntax
12. Properties Known as Methods
13. How Variables Hold Values or Reference Objects
14. Essential Questions
15. Further Study

## 1. Setup

Create a new **Node.js-based** Repl at [https://replit.com/](https://replit.com/) and name it something like "JS Objects".

## 2. The What and Why of Objects

### What Are Objects?

**Objects** are the most common data structure in [Object Oriented Programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming).

In JavaScript, an **object** is an instance of the **Object** class/data type, or one of its subtypes (Date, Function, RegExp, etc.).

In JavaScript, an object might look like this....

```js
// The below object has three properties...
{
  name: 'Maria',
  birthDate: new Date(2000, 3, 15),
  numSiblings: 2
}
```

**Objects** are simply a collection of zero or more **properties** separated by a comma.

So what's a _property_? A _property_ consists of a **key: value** pair, where the:
- **key** is a _string_ or _symbol_ (other types will be coerced into strings), and the
- **value** is any JS expression (code that evaluates to a single value or object).

> Note:  It is not necessary, nor customary to wrap the key names with quotes, however, they will indeed be strings.

### Why Objects?

**In OOP, we often model the purpose of our application using real-world objects.**

The following is just a small example of what is modeled using objects:
- The browser window and the elements it visualizes are all represented in memory as JS objects.
- Those elements and most of their properties, including their styling, are represented as JS objects.
- Data submitted from the browser will be accessed on the backend server as objects.
- Data retrieved from a database will be stored in objects.

As you can see, there are objects everywhere - guess that's why they call it **Object Oriented Programming** 😀

## 3. Creating Objects

There are three different ways we can create objects:
1. By using _Object Literal Notation_ (also called an Object Initializer)
2. By invoking a _Class_ (also known as a *Constructor Function*)
3. By using the `Object.create` method

Today, we're going to focus on using _Object Literals_ to create objects.

In a future lesson, we'll learn how _Classes_ are used.

Using `Object.create` is not very common and won't be used during SEI, but as always, you're encouraged to research it if interested.

### Creating Objects using Object Literal Notation

Now let's create an object by using **Object Literal notation**, also known as an [Object Initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer):
	
```js
const game = {};
console.log(typeof game); // "object"
```

As you can see, _Object Literal notation_ consists of a set of opening  and closing curly braces, `{}`, used as a JS expression vs. when defining a statement/code block.

We just used curly braces to create an empty `game` object.

<details>	
<summary>
❓ An object is an <em>empty</em> object when it contains zero _________.
</summary>
<hr>

**properties (`key: value` pairs)**

<hr>
</details>

Let's update our code so that `game` has a property:

```js
const game = {title: 'Guess the Number!'};
console.log(game);
```

Stylistically, defining an object with a single property or a couple of "short" properties on a single line of code like...

```js
let point = {x: 10, y: -5};
```

isn't a problem (unless it is with your boss).<br>**It's all about readability.**

Properties are separated by commas:

```js
const game = {
  title: 'Guess the Number!',
  // Add this second property
  biggestNum: 100
};
```

Syntactically, [a trailing comma](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas) is permitted after the last property:

```js
const game = {
  title: 'Guess the Number!',
  biggestNum: 100,  // trailing comma
};
```

### ❓ Review Questions - Properties (1 min)

Considering the following object:

```js
const game = {
  title: 'Guess the Number!',
  biggestNum: 100,
};
```
	
Answer the following questions:

<details>	
<summary>
(1) How many properties does <code>game</code> contain?
</summary>
<hr>

**2**

<hr>
</details>

<details>	
<summary>
(2) What are the keys (AKA property names)?
</summary>
<hr>

**`title` and `biggestNum`**

<hr>
</details>

<details>	
<summary>
(3) What is the value of the <code>title</code> property?
</summary>
<hr>

**The string of `'Guess the Number!'`**

<hr>
</details>

<details>	
<summary>
(4) What are the data types of the keys?
</summary>
<hr>

**The object keys have a data type of `string`**

<hr>
</details>

## 4. Adding Properties to an Existing Object Using Dot Notation

There are two different syntaxes available to access, add or modify an object's properties:
- **Dot notation**, and
- **Square Bracket notation**

I'll discuss why there are two syntaxes in a bit, for now, let's use _dot notation_ to add another property to the `game` object:
	
```js
game.smallestNum = 0;
```

If we assign to a property that doesn't exist, it is created, otherwise it's updated.

## 5. 👉 You Do: Practice Adding/Updating Properties (1 min)

Using **dot notation** on the `game` object, write two lines of code to:
1. Add a property with a key of `numGuesses` set to a value of `0`.
2. Update the `smallestNum` property's value to be `1`.

## 6. Accessing Properties with Square Bracket Notation

The other way to access, add, update and delete properties is by using **square bracket notation**.

**We need to use _square bracket notation_ instead of _dot notation_ when at the time you're writing the code, you don't know which property needs to be accessed.**

In other words, we use _square brackets_ to access properties _dynamically_ during runtime.

> Less common is to have to resort to using _square brackets_ to access properties when the key name contains a space.

_Square bracket notation_ has the following syntax:

```js
someObject[<any JS expression>]
```
	
The `<any JS expression>` can be any JS expression, even a function call, that evaluates to a single "value" (typically a string).

For example, assume we have an object, `words`, with "categories" of words:

```js
const words = {
  animals: ['fox', 'zebra', 'bear', 'turkey'],
  colors: ['purple', 'orange', 'green'],
  // ...other categories
};
```

Now, the program can use a `selectedCategory` variable to access the array of words:

```js
let selectedCategory = "animals";

const wordList1 = words[selectedCategory];
// wordList1 -> [ 'fox', 'zebra', 'bear', 'turkey' ]
const wordList2 = words.selectedCategory;
// wordList2 -> undefined
```

<details>	
<summary>
❓ Why would <code>wordList2</code> be assigned <code>undefined</code>?
</summary>
<hr>

**There is not a property named `selectedCategory` on the `words` object and if we access a property on an object that does not exist, `undefined` is returned.**

<hr>
</details>

Again, we use square bracket notation to access properties dynamically during runtime.

> KEY POINT:  It is a best practice to use _Dot Notation_ whenever possible because it's more readable, concise and JS can access properties using Dot Notation more efficiently.

## 7. Square Bracket Notation - Example

Consider an object that represents a catalog of items where:
- Each property in the object represents an item for sale
- The _key_ of each property represents the item's SKU (Stock Keeping Unit - a retail store's unique ID for an item)
- The _value_ of the property represents the price of the item

Let's name our new object `catalog` that includes a few items for sale. Again, each item is a _property_ with its _key_ set to a unique alphanumeric string (a SKU) and its value set to a number representing its price.

> Note: It's possible to include special characters in the SKU (key) if we use quotes around the key name.

Now let's code a price lookup:

```js
let sku;
while (sku !== 'quit') {
  sku = prompt('Enter SKU or "quit" to exit: ');
  // Use break to immediately exit a while or for loop
  if (sku === 'quit') break;
  let price = catalog[sku];
  console.log(`The price of ${sku} is ${price}`);
}
```

<details>	
<summary>
❓ What kind of string is within the <code>console.log</code>?
</summary>
<hr>

**Template Literal**

<hr>
</details>

## 8. Checking if an Object has a Property

Notice that if we enter a non-existing SKU (key), we are logging a price of `undefined`.

Unlike when we try to access an undeclared variable, we don't receive an error when accessing a property that doesn't exist. Instead, `undefined` is returned - nice!

However, we can't rely on a value of `undefined` to check if a property exists because maybe a property legitimately has a value of `undefined`.

Instead, we can use the [in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) operator...

Let's refactor the code to use the `in` operator to check if the user has entered a valid SKU (key):

```js
let sku = '';
while (sku !== 'quit') {
  sku = prompt('Enter SKU or "quit" to exit: ');
  if (sku === 'quit') break;
  if (sku in catalog) {
    let price = catalog[sku];
    console.log(`The price of ${sku} is ${price}`);
  } else {
    console.log('Invalid SKU - try again');
  }
}
```

Nice work!

## 9. Deleting a Property

To completely remove a property from an object, we use the [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) operator:

```js
const geniuses = {
  Einstein: true,
  'Mr Bean': false,
  Newton: true,
  Snooki: true
};

// see ya!
delete geniuses['Mr Bean'];
```

<details>	
<summary>
❓ Why was <em>Square Bracket Notation</em> necessary to delete Mr Bean?
</summary>
<hr>

**Due to the space in the key name. This won't work...**

```js
delete geniuses.Mr Bean
```

<hr>
</details>

### 👉 You Do: `delete` Operator (1 min)

Write a line of code to remove one of the items from your `catalog` object.

## 10. Iterating Over an Object's Properties

Before continuing to work with the `game` object, comment out the price lookup code above.

Similar to how we often need to iterate over an array's elements, same goes for an object's properties.

We can iterate over the _keys_ of the properties using a [for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop:

```js
for (let key in game) {
  console.log(`The value of the ${key} property is ${game[key]}`);
}
```

Remember that we previously learned the `for...of` loop.  These two loops `for...in` and `for...of` have different behavior.  When iterating over object properties, you should always use `for...in`.

Note how we had to use Square Bracket Notation to access the property values.

## 11. Property Shorthand Syntax

It's a common scenario to want to create a property in an object literal where the key name is the same as a variable that you want to use as the new property's value.

For example, prior to Property Shorthand Syntax we would have to write:

```js
const latitude = getLat('Disneyland');
const longitude = getLng('Disneyland');

const location = {
  name: 'Disneyland',
  latitude: latitude,
  longitude: longitude
};
```

It is now preferable to use ES2015's **Property Shorthand** syntax, we can now do this

```js
const latitude = getLat('Disneyland');
const longitude = getLng('Disneyland');

const location = {
  name: 'Disneyland',
  latitude,
  longitude
};
```

The variable name determines the name of the property!

## 12. Properties Known as Methods

When a property references a function, we commonly refer to it as a **method** of the object.

Let's add a `play` _method_ to the `game` object:

```js
game.play = function() {
  const rndNum = Math.floor(Math.random() * (this.biggestNum - this.smallestNum + 1) + this.smallestNum);
  this.secretNum = rndNum;
}
```

Try it out in the console by calling `game.play()` and then checking the value of `game.secretNum` a few times.

Again, we will have a dedicated lesson covering the `this` keyword. In the case above, `this` is set by JavaScript to be the object the method is called on thus providing access to the object's properties.

## 13. How Variables Hold Values or Reference Objects

As you know, variables are slots in memory that hold a value.

All non-object data types are known as primitive, or value, types because they hold a single value. Picture a table in memory like this:
	
```
                      -- SCOPE TABLE --
ASSIGNMENT CODE        var | value/ref
                      -----------------
let x = 25        -->   x  |  25
var msg = 'hello' -->  msg | 'hello'
const y = x       -->   y  |  25
```
	
However, objects are complex/reference types because they can hold multiple pieces of data.

Objects, including Arrays, Functions, etc. are stored in a separate part of memory known as the _heap_. A variable for an object has as its value a "reference" (think pointer):

```
                      -- SCOPE TABLE --
ASSIGNMENT CODE         var | value/ref
                      -----------------
let x = 25         -->   x  |  25
var msg = 'hello'  -->  msg | 'hello'       ~HEAP~ 
const obj = {a: 1} -->  obj |  ref1   --->  {a: 1} <--|
let arr = [1,2]    -->  arr |  ref2   --->  [1,2]     |
let obj2 = obj     -->  obj2|  ref1   -----------------
```

> KEY POINT:  An assignment operation simply copies the value/ref from the source to the target, regardless the data type.

Further, the elements of an array and the properties of an object hold their values in the same way:

```
                      -- SCOPE TABLE --
ASSIGNMENT CODE         var | value/ref
                      -----------------
let x = 25         -->   x    |  25
var msg = 'hello'  -->  msg   | 'hello'       ~HEAP~ 
const obj = {a: 1} -->  obj   |  ref1   --->  {a: 1} <--|
let arr = [1,2]    -->  arr   |  ref2   --->  [1,2]     |
let obj2 = obj     -->  obj2  |  ref1   -----------------
obj.b = 2          -->  obj.b |  2              ^
obj.c = arr        -->  obj.c |  ref2   --------|
```

### ❓ Review Question

Assuming the following code:

```js
const nums1 = [1, 2, 3];
const nums2 = nums1;
nums2.push(4);
console.log(nums1);
```

<details>	
<summary>
❓ What would be logged out?
</summary>
<hr>

```js
[1, 2, 3, 4]
```
**Because `nums1` and `nums2` both reference the SAME array**

<hr>
</details>

Awesome!

Remember, you won't be able to remember all of the details of what we just covered about objects.

However, with a bit of time and repetition it won't be long before you can recall some of the common tasks without having to look them up.

## 14. ❓ Essential Questions (2 mins)

<details>	
<summary>
(1) An object is a collection of zero or more ___________.
</summary>
<hr>

**properties**

<hr>
</details>

<details>	
<summary>
(2) Properties are _____ : ______ pairs.
</summary>
<hr>

**`key: value`**

<hr>
</details>

<details>	
<summary>
(3) Assuming you have a choice between using Dot Notation and Square Bracket Notation to access an object's properties - which approach is considered to be the best practice?
</summary>
<hr>

**Dot Notation because it is more readable, concise & efficient**

<hr>
</details>

<details>	
<summary>
(4) What type of <code>for</code> loop is used to iterate over the keys of an object?
</summary>
<hr>

**A `for...in` loop**

<hr>
</details>

Assuming the following code:

```js
const name = prompt('Enter your name: ');
const age = prompt('Enter your age: ');
const person = {name, age};
```

<details>	
<summary>
(5) Will the <code>person</code> object be created as expected?
</summary>
<hr>

**Yes - `{name, age}` is taking advantage of Shorthand Property syntax!**

<hr>
</details>

## 15. Further Study

### Obtaining Arrays of an Object's Keys and/or Values

Recently added to JS are some cool ways to obtain an array of an object's keys and/or values:
- [Object.keys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [Object.values(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)
- [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

Although being relatively fresh, these _static methods_ have already been implemented in all modern browsers.

We'll learn what a _static method_ is in the upcoming lesson on JS Classes.

Each of the above methods returns an array that we can iterate over, for example:

```js
Object.values(game).forEach(function(val) {
  console.log(val);
});
```

> Note: The ECMAScript specification does not dictate how properties should be ordered, however, all browsers currently iterate over them in the order they are defined/added.

### Getter and Setter Properties

[getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) properties allow you to treat methods like regular properties that you can access without invoking and set using the assignment operator (`=`).

### Computed Property Name Syntax

[Computed Property Name syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) allows for an expression to determine the key name dynamically inside of an object literal - just like when using square bracket notation on an existing object.

