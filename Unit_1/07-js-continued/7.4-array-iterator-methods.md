<img src="https://i.imgur.com/wVPKb5D.png">

# Array Iterator Methods Walk-Through

## Learning Objectives

| Students Will Be Able To: |
|---|
| Identify the Purpose (Use Case) of Several Useful Array Iterator Methods |

## Intro

JavaScript Arrays have lots of helpful built-in methods.

These methods enable us to write code following a modern [functional programming](https://en.wikipedia.org/wiki/Functional_programming) approach verses that of [imperative programming](https://en.wikipedia.org/wiki/Imperative_programming).

#### Imperative Programming

Imperative programming is a more step-by-step way of writing code.

`for` loops, for example, are imperative: 

```js
for (let index = 0; index < array.length; index++) {
    // do stuff
}
```

With a `for` loop we're saying:

1. Initialize a looping variable
2. Use the looping variable to access an element in the array
3. Increment the looping variable
4. If the looping variable is less than the length of the array, loop again

#### Functional/Declarative Programming

In functional/declarative programming, we write code that describes what we want to do:

```js
array.forEach(function(val, idx) {
    // do stuff
});
```

How are we iterating? We, don't need to worry about that.

## Method Summary

| Method | Purpose | Returns | Callback Should | Callback's Args |
| --- | --- | :-: | --- | --- |
| [forEach(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | General purpose |`undefined` | Do whatever needs to be done | `(elem, idx)` | 
| [map(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Transform source array into a new array | New array | Return what goes in the new array | `(elem, idx)` | 
| [filter(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Filter source array | New array | Return truthy value if current `elem` is to be included in new array | `(elem, idx)` | 
| [find(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | Find a certain element | The "found" `elem`, otherwise `undefined` | Return truthy when `elem` is "found" | `(elem, idx)` |
| [findIndex(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Find the index of a certain element | The index of the first `elem` "found", otherwise `-1` | Return truthy when `elem` is "found" | `(elem, idx)` |
| [some(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) | Check if at least one element matches a condition | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx)` |
| [every(cb)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) | Check if every element matches a condition | `true` or `false` | Return truthy if `elem` is what you're checking for | `(elem, idx)` |
| [reduce(cb, initAcc)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) | Reduce the array to a single value/object | Final value of `acc` (accumulator) | Return the new value of `acc` for the next iteration | `(acc, elem, idx)` | 

## Observations

The following observations will make it easier to remember the syntax of these important methods...

- Each of the methods invoke a callback function for each iteration.

- Most methods have to iterate over the entire array in order to fulfil their purpose, however, the following methods will "short circuit" and stop iterating once their return value has been determined:

  - `find`: Stops iterating when the callback returns a truthy value
  - `findIndex`: Stops iterating when the callback returns a truthy value
  - `some`: Stops iterating when the callback returns a truthy value
  - `every`: Stops iterating when the callback returns a falsy value

  > **VOCAB:** Note that the `filter`, `find`, `findIndex`, `some` and `every` iterator methods rely on the truthy-ness or falsy-ness returned by the callback function. In programming, a function designed to return `true` or `false` is called a **predicate function**. 

- All of the iterator methods, except `reduce`, have identical signatures, that is, they all accept a single argument - a callback function.

  Additionally, the signature of that callback functions are all the same as well!

## Code Examples

### `forEach`

**PURPOSE:** General purpose iterator method.

```js
const friends = ["Melissa", "Marc", "Andrew", "Nick"];

friends.forEach(function(friend) {
  console.log(`I have a friend named ${friend}`);
});

// logs out "I have a friend named <friend's name>" for each friend
```

##### YOU DO

Using `forEach` log out each of my `friends` but with the first letter of their name lower-cased. Use the `<str>.toLowerCase()` method. 

```js
"Cats".toLowerCase(); //=> cats
``` 

---

### `map`

<img src="https://i.imgur.com/Ey05BEt.png">

**PURPOSE:** Create a new array from a source array by replacing or transforming its elements.

The returned array is always the same length as the source array.

##### Transform an array

```js
const nums = [1, 2, 3];
const squared = nums.map(function(num) {
  return num * num;
});

// squared -> [1, 4, 9]

/*--- using an arrow function for the callback ---*/
const squared = nums.map((num) => num * num);
```

##### The new elements can be anything!

Here we want to map an object of "people" objects into an array of DOM elements:

```js
const people = [
  {name: 'Fred', town: 'Bedrock'},
  {name: 'Susan', town: 'Miami'},
  {name: 'John', town: 'Arcadia'}
];

const els = people.map((person, idx) => {
  const el = document.createElement('div');
  el.innerHTML = `${person.name} <span>(${person.town})</span>`;
  // The new array will contain whatever
  // is returned from the callback 
  return el;
});

// Append the <div>s to the end of the <body>
els.forEach(el => document.body.append(el));
```

##### YOU DO

Given an array of instructors,

```js
const instructors = ["Alex", "Stephanie", "Daniel"];
```

Use `map` to create a new array that adds the string " is awesome" to each element in the array.

```js
["Alex is awesome", "Stephanie is awesome", "Daniel is awesome"]
```

---

### `filter`

<img src="https://i.imgur.com/JRSWt5X.png">

**PURPOSE:** Select certain elements from a source array.

##### Obtain just the odd numbers

```js
const nums = [100, 2, 5, 42, 99];
const odds = nums.filter((num) => num % 2);

// odds -> [5, 99]
```

##### YOU DO

Filter out all "jerks"!

```js
const people = ["jerks", "nice people", "jerks", "nice people", "nice people"];
```

---

### `find`

<img src="https://i.imgur.com/q2BnDth.png">

**PURPOSE:** Find an element within an array.

##### Find a certain car object

```js
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'black', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

const firstWhiteCar = cars.find((car) => car.color === 'white');
// firstWhiteCar -> {color: 'white', make: 'Toyota', year: 2013}

const missingCar = cars.find((car) => car.color === 'blue');
// missingCar -> undefined
```

##### YOU DO

Find the first car whose year is older than 2014 and assign it to a variable named `notTooOldCar`;

---

### `findIndex`

<img src="https://i.imgur.com/lmxp4lp.png">

**PURPOSE:** Like `find` above, but returns the found element's index instead of the element. Note that this is usually used to find the index of an object, or one of its built-in variations (Array, Date, Regular Expression, Error) within the array. If trying to find the index of a primitive type, use [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) instead.


##### Find the index of the first match

```js
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'black', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

const idxFirstCarNewerThan2015 = cars.findIndex((car) => car.year > 2015);
// idxFirstCarNewerThan2015 -> 3

// findIndex returns -1 if callback never returns a truthy value
const missingCarIdx = cars.findIndex((car) => car.year > 2020);
// missingCarIdx -> -1
```
---

### `some`

<img src="https://i.imgur.com/aqzFLpD.png">

**PURPOSE:** Check if array has at least one element that meets a certain condition.

Henry would be proud...

```js
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'black', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

const hasFord = cars.some((car) => car.make === 'Ford');
// hasFord -> true
```

##### YOU DO

Do I have an _evil monkey_ in my room? 

```js
const myRoom = ["evil monkey", "bed", "lamp"];
const isEvilMonkeyInRoom = /* Fill code in here */
```

---

### `every`

<img src="https://i.imgur.com/891yZrw.png">

**PURPOSE:** Check if **every** element in the array meets a certain condition.

##### Are all cars newer than 2000?

```js
const cars = [
  {color: 'red', make: 'BMW', year: 2001},
  {color: 'white', make: 'Toyota', year: 2013},
  {color: 'black', make: 'Ford', year: 2014},
  {color: 'white', make: 'Tesla', year: 2016}
];

const everyCarIsNewerThan2000 = cars.every((car) => car.year > 2000);
// everyCarIsNewerThan2000 -> true
```
---

### `reduce`

<img src="https://i.imgur.com/sSZ0s92.png">

**PURPOSE:** Reduce an array into a single value or thing (such as an object).

##### Sum up the numbers in an array

```js
const nums = [25, 6, 100, 3];

// The callback returns the value of
// acc (accumulator) for the next iteration.
// The second argument, `0`, is the value
// of acc on the first iteration.
const sum = nums.reduce((acc, num) => acc + num, 0);

// The reduce method returns whatever the callback
// returns for the last iteration.
// sum equals 134 (the final value returned)
```

##### Count votes

The `reduce` method can return any single thing, such as an object!

```js
const votes = ['Yes', 'No', 'No', 'Yes', 'Yes'];
const tally = votes.reduce((acc, vote) => {
  // Assign 1 if first time seeing a certain "type" of vote
  // otherwise increase count by 1
  acc[vote] = acc[vote] ? acc[vote] + 1 : 1;
  return acc;
}, {});  // Note the initial value is an empty object

// tally -> {"No": 2, "Yes": 3}
```

## Reference

[Array Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
