<img src="https://i.imgur.com/oY0P1r0.png" width="400">

# JS Classes

## Learning Objectives

| Students will be able to: |
| --- |
| Describe the use case for classes |
| Describe encapsulation in OOP |
| Define a class |
| Instantiate a class |
| Include and use a constructor method in a class |
| Define prototype (instance) methods in a class |
| Define static (class) methods |
| Define static (class) properties |
| Use `extends` to implement inheritance (create a subclass) |

## Road Map

1. Setup
2. Use Case of Classes
3. Defining and Instantiating a Class
4. Defining Prototype Methods 
5. Defining Static Methods & Properties
6. Practice Exercise - Defining Another Class
7. Finish the Game Logic
8. Inheritance
9. Essential Questions
10. Further Study

## 1. Setup

1. Create a new HTML/CSS/JS-based Repl in [replit.com](https://replit.com/~)
2. Name it "JS Classes"
3. Add a bit of familiar looking HTML to _index.html_:

    ```html
    <body>
      <h1 id="message"></h1>
      <main id="board">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </main>
      <button>PLAY AGAIN</button>
    </body>
    ```
4. Some CSS:

  ```css
  * {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #message {
    margin-top: 0;
    margin-bottom: 5vmin;
    color: grey;
  }

  #board {
    display: grid;
    grid-template-columns: repeat(3, 20vmin);
    grid-template-rows: repeat(3, 20vmin);
    background-color: lightgrey;
    border-radius: 5vmin;
  }

  #board > div {
    margin: 3vmin;
    border: 1vmin solid white;
    border-radius: 50%;
    background-color: darkgrey;
    background-size: contain;
    animation: rotating 0s linear infinite;
  }

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  button {
    margin-top: 5vmin;
    padding: 1.5vmin;
    background-color: grey;
    color: white;
    border-radius: 2vmin;
    font-size: 4vmin;
  }
  ```

5. Finally, the starting JavaScript:

```js
/*----- app's state (variables) -----*/
let game;

/*----- cached element references -----*/
const boardEl = document.getElementById('board');
const msgEl = document.getElementById('message');

/*----- classes -----*/

/*----- functions -----*/
initialize();

function initialize() {

}
```

## 2. The Use Case of Classes

### What Are Classes?

**Classes are used to create objects**!

In [object-oriented programming (OOP)](https://en.wikipedia.org/wiki/Object-oriented_programming), we use objects to model our application's purpose.

Think of classes as the blueprints used to create objects of a certain "type"...

<img src="https://i.imgur.com/1EuXOlX.png">

### Why Use Classes?

<details>
<summary>
We've already been creating JS objects using object  ___________ notation.
</summary>
<hr>

**literal**

<hr>
</details>

So why do we need classes to create objects then?

Because at the time we're writing the code, we often don't know how many objects of a particular type the application needs, and...

Classes provide a convenient way to dynamically create objects as needed during runtime (when an application is running).

## Encapsulation in OOP

[Encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)) is a key principle of Object Oriented Programming.

Encapsulation is the concept of bundling data (properties/attributes) and related behavior (methods) within an object.

The following is a code example of encapsulating data (attributes/properties) & behavior (methods) within an object literal:

```js
const cohort = {
  id: 'SEI',
  students: ['Mary', 'Toni', 'Fred'],
  instructors: ['Susan', 'Phil'],
  addStudent: function(name) {
    name = name[0].toUpperCase() + name.substr(1).toLowerCase();
    this.students.push(name);
  },
  pickRandomStudent: function() {
    let rndIdx = Math.floor(Math.random() * this.students.length);
    return this.students[rndIdx];
  }
};
```

**Classes** allow us to define which properties and methods will be encapsulated within an object.

### ❓ Review Questions - OOP (1 min)

<details>
<summary>
(1) What does the acronym OOP stand for?
</summary>
<hr>

**Object-Oriented Programming**

<hr>
</details>


<details>
<summary>
(2) What are Classes used for in OOP?
</summary>
<hr>

**To create objects of a certain type.**

<hr>
</details>


<details>
<summary>
(3) Describe the OOP principle known as <em>encapsulation</em>.

</summary>
<hr>

**The bundling of data (properties/attributes) and related behavior (methods) within an object.**

<hr>
</details>

## 3. Defining and Instantiating a Class

We use the [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) keyword to define a class in JavaScript:

```js
/*----- classes -----*/
class TicTacToeGame {
  // Code to define the properties and methods
}
```

Although we haven't added any logic to the class, we're still able to create an object (instance) from it...

### Instantiating a Class (Creating an Object)

First, here's a bit more OOP vocabulary in regards to creating objects using a class:

- **instance**: An object created by a class.
- **instantiate**: We instantiate a class to create an object.
- **instantiation**: The process of creating an object.

In JS, we create objects using the `new` keyword when invoking (instantiating) the class.

Let's create our game object:

```js
function initialize() {
  game = new TicTacToeGame();
}
```

In the console, we can check what the `game` variable holds:

```
> game
< TicTacToeGame {}
```

We have an empty object of type `TicTacToeGame`!

### The `constructor` Method

When a class is being instantiated, a special [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) method defined in the class will **automatically** be called.

**The purpose** of the `constructor` method is to initialize the data properties of the new object being created (represented by the `this` keyword).

Let's give a game object references to the DOM outside of its world:

```js
class TicTacToeGame {
  constructor(boardElement) {
    // Add properties to the new object
    this.boardElement = boardElement;
    // A return statement is not needed because the
    // constructor returns the new object by default
  }
}
```

Now we can pass the arguments that the `constructor` is counting on when instantiating the class:

```js
function initialize() {
  game = new TicTacToeGame(boardEl);
}
```

So cool...

```
> game
< TicTacToeGame {boardElement: main#board}
```

#### 👉 YOU DO - Add Another Property <small>(2 mins)</small>

1. Modify the `TicTacToeGame` class by adding an additional property named  `messageElement`.  Don't forget to add a new
parameter to the `constructor` method.

2. Update the instantiation so that the `msgEl` cached element is passed as a second argument.

3. Verify that typing `game` in the console results in:

    ```
    > game
    < TicTacToeGame {boardElement: main#board, messageElement: h1#message}
    ```

### Not All Properties Need a Parameter in the Constructor

We can create any number of properties for a new game object within the `constructor`.

For example, let's create an array containing the 9 `<div>` elements within `this.boardElement`:

```js
class TicTacToeGame {
  constructor(boardElement, messageElement) {
    this.boardElement = boardElement;
    this.messageElement = messageElement;
    // Will want to use the map method later,
    // create an array instead of a NodeList
    this.squareEls = [...boardElement.querySelectorAll('div')];
  }
```

> 👀 Note how we can select elements nested within an element by calling `querySelector` and `querySelectorAll` on that element vs. the `document` object.


### Object Instantiation - Behind the Scenes

When we invoke the class prefaced with the `new` keyword, behind the scenes:

- JS creates a shiny new empty object and assigns it to the `this` keyword when calling the `constructor` method.
- The `constructor` method is called with the arguments we provided when invoking the class. Remember, the `constructor` method is where we create/initialize properties on the new object assigned to `this`.
- After the `constructor` is finished executing, the class automatically returns the shiny new object.

Although the `constructor` method is _special_ because it's called automatically, there's nothing special about how it's defined, other methods are defined the same way...

## 4. Defining Prototype Methods in a Class

We have already learned that **methods** are functions that are invoked after a dot on an object:

```js
nums.forEach(...);
```

There are two types of methods that can be added to a class...

#### [Prototype methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#prototype_methods)

**Prototype methods** are methods that are available on an instance of the class (object) - this is why they are called _instance methods_ in other OOP languages.

Prototype methods are very common, but there's another, less common, type of method that can be defined...

#### [Static methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#static_methods_and_properties)

**Static methods** are methods that are called on the class itself and are not available on instances.

Static methods are typically used to implement behavior that doesn't pertain to a specific instance.

[Array.isArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) is an example of a static method:

```js
const nums = [1, 2, 3, 4, 5];
console.log(Array.isArray(nums)); //-> true
```

### Defining Methods in a Class

Let's add a `play` method to our `TicTacToeGame` class:

```js
class TicTacToeGame {
  constructor(boardElement, messageElement) {
    this.boardElement = boardElement;
    this.messageElement = messageElement;
    // return is not needed because the
    // new object is returned by default
  }

  // Use the same syntax of the constructor method
  play() {
    // Initialize the game's state.
    // Instance methods have 'this' set to 
    // the actual instance (game object)
    this.turn = 1;
    this.winner = null;
    // We'll come back to this later
    // this.squares = ???;
    // Render the game
    this.render();
  }
}
```

> 👀 It's interesting that methods are not separated by a comma or any other character.

#### 👉 YOU DO - Add Another Instance Method <small>(1 min)</small>

1. Define the `render` method that the `play` method is invoking.

2. For now, code the new `render` method to simply log out "Render game...".

3. Test it out by typing `game.play()` in the console. Since the `play` method invokes the `render` method - you'll see:

    ```
    > game.play()
    Render game...
    < undefined
    ```

### Overriding Methods

Thanks to another OOP principle called [inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)), **subclasses** inherit methods from their parent classes.

JS implements inheritance a bit differently from traditional OOP languages like Java or Python in that JS's implementation is prototype-based.

We won't go into prototypes during this lesson because, thanks to the new class syntax we're currently learning about, knowing about prototypes isn't as important anymore. Check out the Further Study section for additional info.

In JS, the `Object` class is at the top of the class hierarchy and thus nearly all objects inherit its methods such as [toString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString):

```
> game.toString()
< '[object Object]'
```

However, it's possible to "override" inherited methods by simply redefining that method.

For example, we can override/replace `Object`'s implementation of `toString` by defining it in the `TicTacToeGame` class:

```js
  // existing methods above
  
  toString() {
    return `Tic-Tac-Toe / winner -> ${this.winner}`;
  }
```

So far, you've learned how to define a class that creates objects with properties and add prototype methods to it.

This represents about 80% there is to know about classes - congrats!

## 5. Defining Static Methods & Properties

Again, **static methods**, as well as **static properties** are accessible on a class itself - not on its instances.

### Static Methods

Static methods are used to implement behavior that does not pertain to a particular instance.

For example, a static `search` method could be defined to find instances previously created that meet some criteria.

Just so that we can see the syntax on how to add a static method, let's add one to `TicTacToeGame`:

```js
static about() {
  console.log("I'm the TicTacToeGame class!");
}
```
Yup, the only difference is the `static` keyword that prefaces the name of the method.

Try it out in the console:

```
> TicTacToeGame.about()
  I'm the TicTacToeGame class!
< undefined
```

However, attempting to call `about` on the `game` instance...
```
> game.about()
Uncaught TypeError: game.about is not a function
```

### Static Properties

A **static property** is a data property that lives on the class and is therefore shared by all instances of that class.

Since the winning combinations is the same for all games of Tic-Tac-Toe, it should be defined as a static property vs. a property that gets duplicated for each game instance:

```js
class TicTacToeGame {
  constructor(boardElement, messageElement) {
    ...
  }

  static winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  play() {
    ...
}
```

> 👀 Note that static properties should end with a semi-colon.


## 6. 💪 Practice Exercise - Defining Another Class <small>(15 min)</small>

As you know, the game of Tic-Tac-Toe consists of 9 "squares" - what a great opportunity for another class!

1. Create a fork (copy) of the current repl

    <img src="https://i.imgur.com/ujILa87.png">

2. **Before** the `TicTacToeGame` class, define a skeleton `Square` class. 
3. Add a `constructor` method with a parameter named `domElement`.
4. Code the `constructor` method so that it creates the following two properties:
    - `domElement`: Initialized to the `domElement` parameter.
    - `value`: Initialized to `null` but ultimately will hold player values of `1`/`-1`.
5. Define a **static** property named `renderLookup` used to determine what color to render for which value. Assign the following object (use whatever colors you wish):
    ```js
    {
      '1': 'purple',
      '-1': 'orange',
      'null': 'darkgrey'
    }
    ```
6. Square objects should be responsible for rendering themselves.  Define a `render` method with the following code line of code:
    ```js
    this.domElement.style.backgroundColor = Square.renderLookup[this.value];
    ```
    > 👀 Note how we access a class's static property via the name of the class
7. Back in the `TicTacToeGame` class, update the commented out line<br>`// this.squares = ???;`<br>in the `play` method so that assigns instances of your new `Square` class to `this.squares`.  
    ```js
    this.squares = this.squareEls.map(el => new Square(el));
    ```
    > 👀 The [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) iterator method is perfect for transforming an array of elements into a new array of something else. We'll learn about it soon.
8. Update the `initialize()` function so that it calls `game.play()` after the `game` object has been created.
9. Outside of the classes, select the **[PLAY AGAIN]** button and add a click event listener to it that simply calls the `initialize` function.
10. Test it out by refreshing - resulting in the "empty" squares rendering with a dark grey background!
<img src="https://i.imgur.com/70ogQVF.png">

Submit your link and navigate to the next page...

## 7. Finish the Game Logic

You're familiar with the Tic-Tac-Toe solution code, so let's finish off the game by copying/pasting over some code.

All of the below refactoring is in the `TicTacToeGame` class...

<details>
<summary>
Update the <code>constructor</code> method to add a delegated event listener to the <code>boardElement</code>...
</summary>
<hr>

```js
constructor(boardElement, messageElement) {
  this.boardElement = boardElement;
  this.messageElement = messageElement;
  this.squareEls = [...boardElement.querySelectorAll('div')];
  // NEW CODE BELOW
  // Attach a delegated event listener
  // Arrow function is necessary to ensure 'this'
  // is set to the game object
  this.boardElement.addEventListener('click', (evt) => {
    // Obtain index of square
    const idx = this.squareEls.indexOf(evt.target);
    // Guards
    if (
      // Didn't click <div> in grid
      idx === -1 ||
      // Square already taken
      this.squares[idx].value ||
      // Game over
      this.winner
    ) return;
    // Update the square object
    this.squares[idx].value = turn;  // common typo 
    // Update other state (turn, winner)
    this.turn *= -1;
    this.winner = this.getWinner();
    // Render updated state
    this.render();
  });
}
```

<hr>
</details>

Gonna need that `getWinner` method we just called!

<details>
<summary>
Add the <code>getWinner</code> method - right above the <code>render</code> method will do...
</summary>
<hr>

```js
getWinner() {
  // Shortcut variable
  const combos = TicTacToeGame.winningCombos;
  for (let i = 0; i < combos.length; i++) {
    if (Math.abs(this.squares[combos[i][0]].value + this.squares[combos[i][1]].value + this.squares[combos[i][2]].value) === 3)
      return this.squares[combos[i][0]].value;
  }
  // Array.prototype.some iterator method!
  if (this.squares.some(square => square.value === null)) return null;
  return 'T';
}
```

<hr>
</details>

Only rendering remains!

<details>
<summary>
Replace the <code>render</code> method so that it "tells" the squares to render themselves and renders a message above the board...
</summary>
<hr>

```js
render() {
  // Square objects are responsible for rendering themselves
  this.squares.forEach(square => square.render());
  // NEW CODE BELOW
  if (this.winner === 'T') {
    this.messageElement.innerHTML = 'Rats, another tie!';
  } else if (this.winner) {
    this.messageElement.innerHTML = `Player ${this.winner === 1 ? 1 : 2} Wins!`;
  } else {
    this.messageElement.innerHTML = `Player ${this.turn === 1 ? 1 : 2}'s Turn`;
  }
}
```

<hr>
</details>

There will be time to play later 😀

<img src="https://i.imgur.com/iRkiaGK.png">

## 8. Inheritance

### Inheritance in OOP

In OOP, inheritance is when a new class is derived from an existing class for the purpose of "specializing" it by:
- Adding additional properties
- Adding additional methods
- Overriding existing methods

The newly derived class is called a  **derived** or **subclass**.

The original class is called a **base** or **superclass**.

A subclass automatically inherits all of the superclass's properties and methods - whether you want them all or not.

<img src="https://i.imgur.com/MvXw4nD.gif" width="800">

For example, a `Payment` class could have `CreditCard` & `Cash` subclasses derived from it.

### Using the `extends` Keyword to Create a Subclass

Let's say we want to create a replacement for the `Square` class that renders images instead.

We use the `extends` keyword to define a subclass.

Be sure to add this new class below the existing `Square` class:

```js
class ImageSquare extends Square {
  // No new properties, so no reason to 
  // update the constructor

  // Override the inherited renderLookup
  static renderLookup = {
    '1': 'https://i.imgur.com/OrrI2Ab.png',
    '-1': 'https://i.imgur.com/eKFZUa2.png',
    'null': 'darkgrey'
  };

  // Override the inherited render
  render() {
    if (this.value) {
      this.domElement.style.backgroundImage = `url(${ImageSquare.renderLookup[this.value]})`;
    } else {
      this.domElement.style.backgroundImage = '';
    }
  }
}
```

With the `ImageSquare` class ready for use, let's refactor `TicTacToeGame` to use it instead of the `Square` class:

```js
play() {
    // Initialize the game's state
    // In instance methods, 'this' will be the 
    // actual instance (object)
    this.squares = 
      // Use the new ImageSquare!
      this.squareEls.map(el => new ImageSquare(el));
      // this.squareEls.map(el => new Square(el));
  ...
}
```

Aww...

<img src="https://i.imgur.com/CNW9yGw.png">

### Adding Additional Properties to a Subclass

In addition to overriding and adding methods in a subclass, **additional** properties can be initialized in the `constructor`.

To demonstrate, let's say that we want to rotate the cat and dog images once every x number of seconds.

First, let's update the `constructor` in `ImageSquare` to allow for the number of seconds per rotation to be passed in when instantiating the class:

```js
class ImageSquare extends Square {
  // Additional parameters must always be defined
  // after the parameters of the superclass
  constructor(domElement, secondsPerRotation = 0) {
    // Always initialize the superclass first
    super(domElement);
    // Specialize!
    this.domElement.style.animationDuration = `${secondsPerRotation}s`;
  }
  ...
```

The [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword is used to access properties of the superclass or invoke the superclass's `constructor` like above.

Now we just have to update the `play` method in `TicTacToeGame` to pass in the number of seconds at the time of instantiation:

```js
play() {
    // Initialize the game's state
    // In instance methods, 'this' will be the 
    // actual instance (object)
    this.squares = 
      // Rotate once every 3 seconds
      this.squareEls.map(el => new ImageSquare(el, 3));
      // this.squareEls.map(el => new Square(el));
  ...
}
```

Have fun!

## 9. ❓ Essential Questions (1 min)

<details>
<summary>
(1) What are classes used for?
</summary>
<hr>

**Classes are used to create objects.**

<hr>
</details>

<details>
<summary>
(2) What is the name of the "special" method in a class that is automatically called when we instantiate a class?
</summary>
<hr>

**`constructor`**

<hr>
</details>

<details>
<summary>
(3) What is the main purpose of the above method?
</summary>
<hr>

**To initialize the properties on the shiny new object.**

<hr>
</details>

<details>
<summary>
(4) True or False: Prototype methods are called on a class.
</summary>
<hr>

**False**, prototype methods are called on instances (objects) of a class.

<hr>
</details>

<details>
<summary>
(5) What keyword in JavaScript is used to implement inheritance (create a subclass)?
</summary>
<hr>

**`extends`**

<hr>
</details>

## 10. Further Study

### Example DOM Node Class Hierarchy

In complex systems, it's not uncommon to have several layers of inheritance - referred to as an object hierarchy:

<img src="https://i.imgur.com/JUFoRzu.png">

### Subclass JavaScript's Built-In Classes

It's possible to use `extends` to subclass JS's built-in classes.

For example, it would be nice to have `last` property on arrays that return's the last element of the array:

```js
class MyArray extends Array {
  get last() {
    return this[this.length - 1];
  }
}
```

You then would need to instantiate the `MyArray` class to create the specialized array:

```js
const nums = new MyArray(1, 2, 3, 4, 5);
console.log(nums.last); //-> 5
```

All other array properties and methods are available due to inheritance!

### Prototypal Inheritance and the Prototype Chain 

Learn more about prototypal inheritance and the prototype chain [here in the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain).

### Constructor Functions - B.C. (before classes 😀)

Before classes arrived via ES2015, we used _constructor functions_ to do the exact same thing as classes.

There's no doubt that new code today is going to be written using the `class` keyword.

However, older code would would have had to use _constructor functions_, so let's look at how the `TicTacToeGame` class can be written as a constructor function instead:

```js
function TicTacToeGame(boardElement, messageElement) {
  // Same code as the class's constructor method
}
TicTacToeGame.prototype.play = function() {
  // Same code as the play method
};
// other 'prototype' (instance) methods defined like above
  
// Instantiation is identical
let game = new TicTacToeGame(boardEl, msgEl);
```

Static methods would be created directly on the constructor function:

```js
TicTacToeGame.about = function() {
  // ...
};
```

## References

- [Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

- Old school [Prototypal Inheritance example](https://gist.github.com/jim-clark/e3fc426d73153fac6dc1)
