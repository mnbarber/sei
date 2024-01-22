<img src="https://i.imgur.com/rkCk34H.png">

# Control Flow in JavaScript

## Learning Objectives

| Students will be able to: |
|---|
| Use conditional expressions with branching & looping |
| Identify what is "truthy" and "falsy" in JavaScript |
| Understand what the logical `\|\|` and `&&` operators return |
| Use the `if...else` statement to perform branching |
| Use the `for` & `while` statements to perform looping |

## Road Map                             

1. What is Control Flow?
2. Conditional Expressions
3. The Logical `||` (or) and `&&` (and) Operators
4. Branching
5. Looping
6. Number Guessing Game Code-Along
7. Essential Questions
8. Further Study

## Lesson Setup

1. We will use [replit.com](https://replit.com/) to work with the concepts and complete the exercises in this lesson - create a new Node.js-based Repl.
2. Name the Repl something like "JS Control Flow"
3. Open a tab in your browser and copy/paste this snippet into the address bar for a convenient note pad:
    ```
    data:text/html, <html contenteditable style="font-family: 'Lucida Console', Monaco">
    ```
    Bookmark it too for future use!

## 1. What is Control Flow?

> #### _"The execution sequence of instructions in a program determined at run time with the use of control structures"_

### Basic Types of Control Flow

- **Sequence**:
    ```js
    let name = prompt('Enter your name: ');
    let city = prompt('What city do you live in? ');
    ```
	Statements execute one at a time in sequence.

- **Branching**:
    ```js
    //  ↓--------- ↓ -> conditional expression
    if (points > 100) {
      console.log('Congrats!');
    } else {
      console.log('Keep playing!');
    }
    ```
	Different code paths/branches are executed based upon a conditional expression.

- **Looping**:
    ```js
    //     ↓--------- ↓ -> conditional expression
    while (points < 100) {
      let move = getPlayerMove();
      points += getPoints(move);
    }
    ```
	Code is repeatedly executed while a condition is truthy.

## 2. Conditional Expressions

As we see above, both branching and looping depend upon a **conditional expression**.

Examples of conditional expressions:

```js
(word === secretWord)
(numWrongGuesses > MAX_WRONG_GUESSES)
(winner)
```
A conditional expression, like any JS expression, is a piece of code that evaluates to a single value/thing (object) - and **every single value/thing is truthy or falsy**.

Let's take a look at what values/things are considered to be truthy and falsy...

### What is `true`/truthy & What is `false`/falsy?

A "truthy" value is a value that is considered to be `true` when used in a conditional expression such as that used in an `if` statement. Similarly, a "falsy" value is a value that is considered to be `false`.

Why this _truthy_ and _falsy_ business? Why not just `true` and `false`?

**Answer:** The ability to use non-boolean expressions as booleans (`true` or `false`) allows us to write code that is more concise.

To test what is truthy and what is falsy, let's type the following code into replit:

```js
if (true) {
  console.log('truthy!');
} else {
  console.log('falsy!');
}
```

<details>
<summary>
❓ As written above, clicking Replit's [Run] button will always print what to the console?
</summary>

**`'truthy!'` because the `if` statement's conditional expression has the value `true`**

</details>

Now we can easily test expressions by typing it in the place of `true`... 

For example, the number `3`, is considered to be _truthy_ - let's try it and see.

#### Everything in JS is truthy except for the following six things:

1. `false` (of course)
2. The `null` data type
3. The `undefined` data type
4. The empty string `''`
5. The number `0` (zero)
6. `NaN` (special number)

**If it's not in the above list, it's truthy!**

### The Not Operator

The _not operator_ (`!`), also known as the "bang" operator, "flips" a true/truthy expression to the boolean value of `false`, and vice-versa.  For example:

```js
!false === true // true
!null === true // true
!3 === false // true
!'' === true // true
```

A double `!` operator is a great way to force an expression into its actual boolean value of `true` or `false`:

```js
console.log(!!3); // outputs true
```

### Boolean Logic <small> (Comparison Operators)</small>

Comparison Operators are used to compare the values of left and right operands which can be variables, literal values, object properties, etc.:

| Operator | Purpose |
|---|---|
| **`===`** | strict equality - best practice |
| **`==`** | performs type conversion (called coercion) - its use is not recommended |
| **`!==`** | strict inequality |
| **`!=`** | inequality |
| **`<`** | less than |
| **`>`** | greater than |
| **`<=`** | less than or equal |
| **`>=`** | greater than or equal |

In your pre-work you saw a `for` loop use the `<` comparison operator to ensure that the looping variable, `i`, didn't exceed an array's upper bound...

```js
for (let i = 0; i < array.length; i++) {
  // statement block
}
```

### ❓ Review Questions - Conditional Expressions (1 min)

<details>
<summary>
(1) Is the value of <code>0</code> (zero) truthy or falsy?
</summary>

**falsy**

</details>

<details>
<summary>
(2) Is an empty string truthy or falsy?
</summary>

**falsy**

</details>

<details>
<summary>
(3) Is an "empty" object (an object with no properties) truthy or falsy?
</summary>

**truthy**

</details>

<details>
<summary>
(4) What the expression <code>!!0</code> evaluate to?
</summary>

**`false`**

</details>

## 3. The Logical `||` (or) and `&&` (and) Operators

The logical operators **`||`** and **`&&`** can be used to combine multiple conditional expressions like this:

```js
if (num < 1 || num > 10) {
  console.log('Number is not between 1 and 10 inclusive');
}
```
However, because of the fact that **they always return either their left or right operands** they can be used in other ways as well...

**The logical `||` (OR) operator** always returns the first operand if it is truthy, otherwise return the second operand:

```js
'hello' || 'goodbye'  // evaluates to 'hello'
0 || null  // evaluates to null
```

**The logical `&&` (AND) operator** always returns the first operand if it is falsy, otherwise return the second operand:

```js
'hello' && 'goodbye'  // evaluates to 'goodbye'
0 && null  // evaluates to 0
```

#### 💪 You Do - Logical Operators (1 min)

Jot down what each of following expressions evaluate to:

<details>
<summary>(1) <code>'cat' || 'dog'</code></summary>

```js
'cat'
```
</details>
<details>
<summary>(2) <code>false || true</code></summary>

```js
true
```
</details>
<details>
<summary>(3) <code>true && false</code></summary>

```js
false
```
</details>
<details>
<summary>(4) <code>false && true</code></summary>

```js
false
```
</details>
<details>
<summary>(5) <code>10 || 'ten'</code></summary>

```js
10
```
</details>
<details>
<summary>(6) <code>10 && 'ten'</code></summary>

```js
'ten'
```
</details>

Note that if the expression results in the first operand being returned, JS won't even evaluate the second operand.  This "short circuiting" as it's called, can be used in interesting ways...

#### 💪 You Do - Advanced Use of Logical Operators (1 min)

Analyze the following two code snippets and do your best to predict what will happen based upon what values might be returned from the functions:

```js
winner = checkWinAcross() || checkWinVertical();
```
<details>
<summary>View explanation for above snippet</summary>

**If <code>checkWinAcross()</code> returns a truthy value, that truthy value will be assigned to <code>winner</code>, otherwise, <code>winner</code> will be assigned whatever value is returned by <code>checkWinVertical()</code>**

</details>

```js
winner && handleWinner();
```
<details>
<summary>View explanation for above snippet</summary>

**The <code>handleWinner()</code> function will run only if <code>winner</code> holds a truthy value**

</details>

## 4. Branching

As you saw in the pre-work, the `if..else` statement allows us to conditionally execute code.

### The `if` Statement <small> (Single Path)</small>

```js
// Assume char holds a character inputted by the user
if ('aeiou'.includes(char)) {
  console.log('char is a vowel!');
}
```

> Again, the conditional expression must be surrounded by parens.

If you have only a single statement that needs to execute, you can write that statement without using curly braces (used to define a block of statements):

```js
// This code is functionally identical to the above code
if ('aeiou'.includes(char)) console.log('char is a vowel!');
```

### The `if...else` Statement <small> (Dual Path)</small>

When you verbalize logic using language like:

> "If _something_ is true do _this_, otherwise, do _that_"

The `if`/`else` statement is your go to: 

```js
// Assume winner holds true or false
if (winner) {
  console.log('Game has been won!');
} else {
  console.log('Keep playing!');
}
```

### The `if...else...if` Statement <small> (Three or More Paths)</small>

If you have three or more code paths use `if` with as many `else if` clauses as necessary and optionally a final `else`:

```js
if (guessNum < secretNum) {
  console.log('Guess higher!');
} else if (guessNum > secretNum) {
  console.log('Guess lower!');
} else {
  console.log('You guessed the number!');
}
```

FYI, a final `else` is not mandatory and can be skipped if your app's logic doesn't need it.

### 👉 You Do - Branching (5 mins)

Write the `if...else..if` statement that console.logs the following based upon the value of a variable named `color`:

- If the value is `'green'`, log `'Go'`
- If the value is `'yellow'`, log `'Slow'`
- If the value is `'red'`, log `'Stop'`
- If the value is anything else, log `'Whatever'`

> Hint: Don't forget to declare and initialize a variable named `color` BEFORE the `if...else...if`.

## 5. Looping

Looping statements provide us with the ability to execute a block of code multiple times while a conditional expression remains truthy.

We'll take a look at these statements:

- **`for`**: Used to iterate a known number of times
- **`while`**:  Used to iterate an undetermined number of times

### Looping - `for` loop

`for` loops are commonly used to run a block of code a certain number of times:

```js
let upTo = prompt('Iterate from 1 to ?');
upTo = parseInt(upTo);
for (let n = 1; n <= upTo; n++) {
  console.log('Current number: ', n);
}
```

Notice the `for` loop has three parts after the `for` keyword:

1. The _initializer_ which runs only once before looping begins. It is used to declare and initialize a looping variable.
2. The _condition_ which will be evaluated before each loop. If truthy, the code block will execute.
3. The last part will execute after each loop and is typically used to increment or decrement the looping variable by one or more units.

### Looping - `while` Statement

The `while` loop is the go to when the number of iterations is **unknown** and has the following syntax:

```js
while (/* conditional expression */) {
  // statement block
}
```

<details>
<summary>
❓ What determines when the looping will end?
</summary>

**When the conditional expression evaluates to a falsy value**

</details>

> **Beware of infinite loops!** If the conditional expression fails to sooner or later evaluate to a `falsy` value, the loop will continue endlessly.  This often results in the computer being unresponsive.  Another way to exit the loop is with the break statement (see the Further Study section).

## 6. Number Guessing Game Code-Along

Let's use branching and looping to code a simple number guessing game!

Before coding programs it's often beneficial to [pseudocode](https://en.wikipedia.org/wiki/Pseudocode), i.e., write down the logic/steps in plain language that are necessary to solve the problem at hand...

```js
// 1. Generate a random secret number
// 2. Declare a variable to hold the player's guess
// 3. Loop while the player's guess is not correct
  // 3.1. Prompt for the player's guess
  // 3.2. Convert the player's input into a number
  // 3.3. If the guess is lower or higher than the secret 
  //      number, print a message that informs the player as such
// 4. Print a message congratulating the player
```

Let's copy/paste the above pseudocode and use it as our guide as we implement the code.

<details>
<summary>
For reference, here's a potential solution...
</summary>

```js
// 1. Generate a random secret number
// Using a "constant" helps document the code
// and make it more maintainable
const MAX_NUM = 100;
// Adding 1 makes the number one-based instead of zero-based
const secretNum = Math.floor(Math.random() * MAX_NUM) + 1;
// 2. Declare a variable to hold the player's guess
let guessNum;
// 3. Loop while the player's guess is not correct
while (guessNum !== secretNum) {
  // 3.1. Prompt for the player's guess
  guessNum = prompt('Enter your guess: ');
  // 3.2. Convert the player's input into a number
  guessNum = parseInt(guessNum);
  // It's also possible to do the above on with a single line
  // guessNum = parseInt(prompt('Enter your guess: '));
  // 3.3. If the guess is lower or higher than the secret 
  //      number, print a message that informs the player as such
  if (guessNum < secretNum) {
    console.log('Your guess was too low - try again!');
  } else if (guessNum > secretNum) {
    console.log('Your guess was too high - try again!');
  }
}
// 4. Print a message congratulating the player
console.log('Congrats, you guessed the secret number!');
```
</details>


### Bonus Challenge

As a stretch bonus challenge, consider adding the following features on your own:

1. Let the player input the maximum value of the secret number.
2. Keep track of the number of wrong guesses and print a message if that number exceeds a predetermined maximum amount.

## 7. ❓ Essential Questions

<details>
<summary>
(1) The three primary types of control flow are:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A) Sequence<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B) ___________<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C) ___________
</summary>

**A) Sequence &nbsp;&nbsp; B) Branching &nbsp;&nbsp; C) Looping**

</details>

<details>
<summary>
(2) What does the expression <code>'happy' || 'sad'</code> return?
</summary>

**`'happy'`**
</details>

<details>
<summary>
(3) If we don't know in advance how many times we need to iterate, we should use a ___________ loop.
</summary>

**`while` loop**
</details>

## 8. Further Study

### Ternary Operator

The _ternary_ operator is ideal when you need to return one of two values depending upon a condition:

```js
let message = score > 100 ? "You rock!" : "Keep trying!";
```
	
The above one line of code replaces this code:
	
```js
let message;
if (score > 100) {
  message = "You rock!";
} else {
  message = "Keep trying!";
}
```

A ternary can also be used to evaluate one of two expressions, so you can actually run a method if you'd like:

```js
score > 100 ? gameWinner() : gameLoop();
```

> Note that unlike with `if` and `while`, ternary expressions do not require the conditional expression to be within parenthesis.

### `switch` Statement

Look into using the [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement instead of `if...else` if you have more than three code paths and your conditionals always check the same variable.

### `do`...`while`

You may choose to use the `do...while` statement instead of `while` to force the code block to always execute at least once.  This is rarely used, but useful to recognize when reading other developer's code.

```js
let num = 0;
do {
  console.log(num + ' is even');
  num += 2;
} while (num <= 10);
```

**Do you see why the code block will always run at least once?**

Again, beware of infinite loops!

### The `break` & `continue` Statements

The [break statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) is used to immediately exit a `while` or `for` loop. For example:

```js
let word = '';
let words = [];
while (true) {
  word = prompt('Enter a word ("end" to quit)');
  if (word === 'end') break;
  words.push(word);
  console.log("You've entered: " + words.join(', '));
}
```
> Note again how the `if` statement does not require braces since there's a single statement to execute.

The [continue statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) skips remaining code in the current iteration and returns to the top of the `while` or `for` loop.
