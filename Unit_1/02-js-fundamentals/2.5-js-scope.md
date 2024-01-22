<img src="https://i.imgur.com/fe5VQ4M.jpg">

# JavaScript Scope

| Learning Objectives - SWBAT |
| :--- |
| Describe What Scope Is |
| Describe How JS Looks for Variables in the Scope Chain |

## Road Map
1. What is Scope?
2. Types of Scope in JavaScript
3. The Scope Chain
4. Further Study

## 1. What is Scope?

In general, the **concept of scope** in computer programming pertains to the **accessibility** of variables and functions from a given point of the code. In other words, as you write a line of code, what variables and functions do you have access to?

If a line of code doesn't have access to a variable/function, we could say that variable/function is "out of scope".

More commonly, however, we think of **a scope** as a set of variables and functions that are defined within that scope.

## 2. Types of Scope in JavaScript

JavaScript has three types of scope:

- **Global Scope**:  There's always a single global scope which lives at the top of the scope chain.
- **Function Scope**, also known as **Local Scope**:  Every time a function runs, it creates its own function/local scope. 
- **Block Scope**: This scope is courtesy of ES2015's `let` & `const` keywords and in general, define a scope within a code block using curly braces.

### Why the Different Types of Scope?

There's a concept in programming known as [The Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).

One of the keys of this principle is based on the idea that limiting the accessibility of variables (and functions) helps reduce bugs in the code - think of it as a form of "code safety".

### Global Scope

There's only a single global scope.

If a variable is declared outside of a function, it will "live" in global scope.

```js
// main.js

let size, board;

function initialize() {
  size = getBoardSize();
  board = generateBoard(size);
  renderBoard();
}
```

<details>	
<summary>
❓ What variables/functions above exist in the global scope?
</summary>
<hr>

**`size` and `board`**

<hr>
</details>

### Function (local) Scope

A new function scope is created for each executing function.

Each variable and function defined within the function would be included within that function's scope.

> Note:  The Further Study section discusses how `let` and `const` variables may have a more limited "block" scope if not defined in the top-level of the function.

The variables within a function's scope only exist during its execution (unless something known as a "closure" exists - yup, another day).

```js
function initialize() {
  const playerName = getPlayerName();
  size = getBoardSize();
  board = generateBoard(size, playerName);
  renderBoard();
}
```

<details>	
<summary>
❓ What variables/functions live within the scope of the <code>initialize</code> function?
</summary>
<hr>

**`playerName`**

<hr>
</details>

A major benefit of having different scopes is being able to use the same names for variables in different functions!  If there were only one scope, this wouldn't be possible.

### Block Scope

To give you practice reading and researching independently, the topic of block scope is covered in the Further Study section of this lesson. 

## 3. The Scope Chain

When a variable or function is referenced in code, JavaScript must find that identifier in memory and retrieve its value or reference.

First, JS will look for the variable or function in the current scope that the code is executing in.

However, if JS doesn't find the identifier, up the **scope chain** it goes looking for it!

Let's review the following diagram which identifies 3 different scopes:

<img src="https://i.imgur.com/UtIoe7F.png">

Notice how the scopes are given a name followed by a list of the identifiers defined within that scope:

| Scope of... | Identifiers defined within... |
|---|---|
| global | `a`, `foo` |
| foo | `x`, `b`, `bar` |
| bar | `y`, `c` |

### Human Computer Demo 

Allow me to "execute" the function and explain what the computer is doing as it accesses variables and calls functions.

### You can go up the scope chain, but not down it!

As demonstrated by the "human computer", JavaScript searches the current scope then up the scope chain, but not down it.

If JS gets to the _global scope_ (which is the top of the food chain in the scope hierarchy) and still can't find what it's looking for, that's when your program crashes due to a **ReferenceError**.

<details>	
<summary>
❓ Would the function <code>foo</code> have access to the variable <code>c</code>?
</summary>
<hr>

**No, because `c` is not _up_ the scope chain**

<hr>
</details>

## 4. Further Study

### Block Scope

Both `let` and `const` define variables that can only be accessed within the **code block** they are defined in.

A _code block_ is created by using curly braces.

The following code from [MDN's docs about let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) demonstrates differences between `let` and `var`:

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

and another example of their differences:

<img src="https://i.imgur.com/K0uJx2P.jpg">

### More About Global Scope

In our browsers, the global scope is represented by the `window` object.

It is at the top of the scope chain and its properties are available to **every** function we write.

It is generally bad practice for our programs to create variables in the global scope.  Doing so risks us overwriting data in use by JS libraries/frameworks or other routines.

Creating lots of global variables is referred to as "polluting the global scope", and we all know that it's not nice to pollute!

If we define a variable (or a function) within the global scope, it becomes a property on the `window` object. You can see this in action by typing `var pollution = 'sucks'` in the console, then type `window.` (don't forget the dot), scroll down and find the pollution we have created - yuck!

> Although using both `var` and `let` in the global scope results in a global variable being created, interestingly, those created using `let` and `const` do not create properties on the `window` object like `var` does.

## References

[MDN Functions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
