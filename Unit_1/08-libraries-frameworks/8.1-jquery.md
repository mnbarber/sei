<img src="https://i.imgur.com/Ga2O5gM.png">

# jQuery 

## Learning Objectives

| Students Will Be Able To: |
| :--- |
| Explain the use case of jQuery |
| Include jQuery in a project |
| Use the jQuery function to select DOM Elements |
| Use jQuery to modify content of elements |
| Use jQuery to modify the CSS of elements |
| Bind to events using jQuery |

## Road Map

1. Setup
2. What is jQuery?
3. Adding jQuery to a Project
4. Selecting DOM Elements with jQuery
5. The jQuery Object
6. Changing the Content of Elements Using jQuery
7. Modifying the CSS of Elements Using jQuery
8. Event Handling Using jQuery
9. Should I Use jQuery?
10. Summary
11. Further Study

## 1. Setup

What better way than to learn about jQuery than to refactor our amazing Connect-Four game!

1. Browse to the [Connect-Four Game Repl](https://replit.com/@SEIStudent/Connect-Four-Game#script.js).
2. As soon as you start typing new code, it will automatically fork (copy) into your own account.

## 2. What is jQuery?

[jQuery](https://jquery.com/) is an open-source JavaScript **library** designed to make front-end development more productive and satisfying.

It was created by [John Resig](https://en.wikipedia.org/wiki/John_Resig) in 2006 and is the world's most popular JS library of all time - [check out this comparison to React](https://www.similartech.com/compare/jquery-vs-react-js).

### Library vs. Framework

The terms **library** and **framework** are often used interchangeably.

Yes, the two are similar, however, there's a subtle difference:

- Libraries, such as jQuery and [lodash](https://lodash.com/) are focused on providing a set of utility or **general purpose** methods.
- Frameworks are more comprehensive, focussing on implementing higher-level capabilities and features that often the entire application is based upon.
- Frameworks often use libraries to implement their features, however, a library would never depend upon a framework.
- For an analogy - think of libraries as the tools and frameworks as the construction crew.

### Why (or Why Not) Use jQuery?

There's no doubt that today's modern JavaScript and client-side libraries/frameworks, such as React, have eliminated the need for jQuery.

jQuery's use in new projects is in steep decline.

However, there are  tons of legacy projects that continue to use jQuery so there are tons of jobs where jQuery is a required skill.

Therefore, you want to be able to include jQuery on your resume - so on with the lesson!

#### Browser Incompatibility

The API's of browsers of old had many incompatibility issues.

Programs required numerous `if...else` statements just to run the proper code for a given browser.

Then John, the genius that he is, created jQuery to provide a level of abstraction above these incompatibilities so that jQuery, not the developer had to deal with incompatibility issues. This is the main reason jQuery became so popular!

But, the Web API's of today's modern browsers are very compatible, so jQuery's browser API abstraction is no longer necessary.

#### Productivity

jQuery's motto is:<br>_"write less, do more"_

JQuery is capable of modifying multiple DOM elements without requiring a loop. But we're not afraid of loops - right?

All joking aside, jQuery can provide a minor productivity boost - just like the motto says.

#### Satisfaction

Some developers consider using jQuery to be more "fun" than writing plain vanilla JS.

#### AJAX

jQuery has a nice `ajax` method, but now that today's browsers have the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), we no longer need jQuery to make AJAX requests.

### What Can jQuery Do?

First, there is nothing jQuery can do that can't be accomplished with vanilla JavaScript - because jQuery uses vanilla JS itself to do what it does.

Okay, so _what_ can it do?

- Manipulate & modify DOM elements.
- Make binding to events more powerful.
- Perform simple animations.
- Communicate with servers via AJAX (asynchronous JS and XML).

### jQuery Documentation

[jQuery's main documentation](http://api.jquery.com/) can be unwieldy.

Those new to jQuery are best served by jQuery's [Learning Center](http://learn.jquery.com/) as their first reference.

## 3. Adding jQuery to a Project

To use any JavaScript library in a web application, we need to ensure that the script files are loaded in _index.html_.

### Including jQuery

There are two ways we can include jQuery in a project:

- [Download jQuery](http://jquery.com/download/) and save it somewhere within the project's folder. Then use the familiar `<script>` tag like this:
  
  ```js
  <script src="js/jquery-3.6.1.min.js"></script>
  ```
- Use a [CDN](https://en.wikipedia.org/wiki/Content_delivery_network) (content delivery network) like this:

    ```js
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    ```

Downloading libraries and saving them to a folder in your project allows you to work with your project without an internet connection. However, the downside of serving the library from your server is that you may be paying for the storage and bandwidth.

Using a CDN can provide performance benefits since most users already have it cached in their browser. Also, we don't incur the overhead of storage and delivery of the library - that's the job of the CDN.

Googling "jquery CDN" will return [this link](https://releases.jquery.com/) as its top result.

Let's use a CDN to load the jQuery library in the `<head>` of Connect-Four's _index.html_:

```html
<head>
  <meta charset="utf-8">
  ...
  <link href="style.css" rel="stylesheet" type="text/css" />
  <!-- Add jQuery before script.js -->
  <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
  <script defer src="script.js"></script>
</head>
```

> 👀 There's no reason to use `defer` when loading libraries because they themselves do not access the DOM.

## 4. Selecting DOM Elements with jQuery

Before we can change the properties of DOM elements, we must first select them as usual.

You've already had some practice doing this with vanilla JavaScript.

<details>
<summary>
❓  What vanilla JS methods have we used to select elements in the DOM?
</summary>
<hr>

`getElementById`, `querySelector` & `querySelectorAll`

<hr>
</details>

### The jQuery Function, aka - `$()`

The **jQuery function** provides different functionality depending upon its arguments, but when provided a CSS selector, it selects elements very much like how `querySelelectorAll` does.

> 👀 The function `$()` is actually a shorthand alias for a function named `jQuery()`.

Let's try selecting the `<h1>` tag in the console using jQuery:

```js
> const $msgEl = $('h1');
< undefined
> $msgEl
< S.fn.init [h1, prevObject: S.fn.init(1)]
```

> 👀 jQuery's naming convention is to begin the variable name with a `$`. There's nothing special about the `$` to JS it's just like any other character used to name a variable, however, it's extremely important to developers because this informs us that the variable is holding a jQuery Object.   

What the heck kind of object is that being referenced by `$msgEl`?

It's called a jQuery Object...

## 5. The jQuery Object

The jQuery selector function, `$()`, returns a special object, known as the [jQuery Object](https://learn.jquery.com/using-jquery-core/jquery-object/).

The jQuery Object "wraps" the selected DOM elements and provides them with jQuery's super-power methods:

<img src="https://i.imgur.com/Nmz13Kd.png">

Exploring `$msgEl` in the console will reveal that it is an array-like object with lots of functionality - just look at all those methods in the `__proto__` (link to an object's prototype)!

To check how many elements a jQuery Object contains in its array, we can use its `length` property:

```js
> $msgEl.length
< 1
```

We can access the vanilla DOM elements using square bracket notation:

```js
> $msgEl[0]
< <h1>...</h1>
```

### ❓ Review Questions (1 min)

<details>
<summary>
(1) What does the jQuery function return when it is passed a string representing a CSS selector?
</summary>
<hr>

**A jQuery Object**<br>
which is a special object that "wraps" the selected DOM elements and provides them with jQuery's super-power methods.

<hr>
</details>

<details>
<summary>
(2) The jQuery Object contains an array of zero or more vanilla _____ __________.
</summary>
<hr>

**DOM Elements**

<hr>
</details>

## 6. Changing the Content of Elements Using jQuery

Let's refactor `messageEl` in Connect-Four to use jQuery!

### Select `messageEl`

#### 👉 YOU DO - Select an Element (1 min)

1. Refactor:
    ```js
    /*----- cached elements  -----*/
    const messageEl = document.querySelector('h1');
    ```
    to use the jQuery function to select the `<h1>` instead of `document.querySelector`.
2. Be sure to rename the variable according to the jQuery naming convention.

### The `html()` Method

jQuery's [html()](https://api.jquery.com/html/) method is used for both getting & setting a DOM element's `innerHTML` property.

Let's refactor the `renderMessage` function to use `$messageEl` and the `html()` method:

```js
function renderMessage() {
  if (winner === 'T') {
    // Use the html method as a setter by passing in the new HTML/text
    $messageEl.html("It's a Tie!!!");
  } else if (winner) {
    $messageEl.html(`<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`);
  } else {
    // Game is in play
    $messageEl.html(`<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`);
  }
}
```

Be aware that when using a jQuery Object's setter method like `html()`, the update will be applied to **all elements** in the jQuery Object.

For example, try the following in the console to update the content of all `<div>` elements in the board:

```js
$('#board > div').html('SEI')
```

No loop required!

### Getters & Setters

Many of jQuery's methods are designed to both **get** and **set** data on an element.

Whether a method behaves as a **getter** or **setter** depends upon the arguments passed to it.

Take the `html()` method for example:

- `html()`: No arguments, behaves as a getter
- `html('new value')`: One argument, behaves as a setter

Checking the arguments within a function is JavaScripts's way of implementing the concept of [function/method overloading](https://en.wikipedia.org/wiki/Function_overloading). Overloading is when a function behaves differently when a different number and/or type of argument(s) are provided. Other languages with overloading implement it by allowing a function/method of the same name to be defined multiple times with different [signatures](https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function).

## 7. Modifying the CSS of Elements Using jQuery

### The `css()` Method

jQuery's [css()](https://api.jquery.com/css/) method is used to modify an element's CSS properties.

Here's how to change the border of the `<div>` elements in the Connect-Four board in the console:
 
```js
$('#board > div').css({borderColor: 'lime', borderWidth: '4px'})
```

> 👀 You can also use kebob-casing for the CSS property if you quote the key name, e.g., `'border-color'`.

Above we have passed the `css()` method an **object** where the keys represent the CSS property.


The `css()` method also has a different signature used to set a single CSS property at a time:

```js
$('header').css('font-size', '2rem');
```

#### 👉 YOU DO - Refactor Rendering the Board (2 mins)

1. Refactor the following two lines within the `renderBoard` function to use jQuery instead:
    ```js
    const cellEl = document.getElementById(cellId);
    cellEl.style.backgroundColor = COLORS[cellVal];
    ```
2. Bonus if you do the above in one line of code!

> Hint:  How would you select an element by its id using `querySelector`?

## 8. Event Handling Using jQuery

### Basic Event Handling

Adding basic event listeners using jQuery is very much like that in vanilla JS, just a bit more concise as usual thanks to the [on()](https://api.jquery.com/on/) method.

Let's update Connect-Four's `[Play Again]` button to use jQuery...

#### 👉 YOU DO - `[Play Again]` Button Refactor (3 mins)

1. In the "cached elements" code section, select the button using jQuery instead.

2. With step 1 completed, it's necessary to refactor the following line of code in the `renderControls` function:
    
    ```js
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
    ```
    > Hint: Put jQuery's `.css()` method to work!

3. Temporarily comment out the following line in the "event listeners" code section:

    ```js
    playAgainBtn.addEventListener('click', init);
    ```

4. Refresh and verify that the game still works.

#### Refactor Adding an Event Listener to the `[Play Again]` Button

Let's uncomment the line of code in step 3 above and make the minor refactor to jQuery:

```js
$playAgainBtn.on('click', init);
```

Yep, just more concise.

Now on to using jQuery to implement event delegation...

### Event Delegation Using jQuery

We've already discussed and have used **event delegation** - time for a memory check...

<details>
<summary>
❓ What is <strong>Event Delegation</strong>?
</summary>
<hr>

**Event Delegation uses a single event listener to listen for events on any number of nested elements.**

<hr>
</details>

One issue we've had to address when using event delegation is when the user "misses" and clicks a nested element other than the ones we're interested in.

For example, in Connect-Four, we had to guard against the user clicking just outside of the column markers with this code in the `handleDrop` function:

```js
function handleDrop(evt) {
  const colIdx = markerEls.indexOf(evt.target);
  // Guards...
  if (colIdx === -1) return;  // check if player "missed" marker
```

As you'll soon see, jQuery has a more elegant approach to dealing with this issue.

Let the refactor begin!

#### 👉 YOU DO - Column Marker Refactor (1 min)

1. Refactor the following line of code in the "event listeners" code section:
    
    ```js
    document.getElementById('markers').addEventListener('click', handleDrop);
    ```
    > Hint: Once again, you're selecting an element by its id, then putting jQuery's `.on()` method to work!

2. Refresh and verify that the game still works.

#### Remove the Current "Guard" Code

Let's comment out the follow line of code in `handleDrop` that guards against a missed click:

```js
  // Guards...
  // if (colIdx === -1) return;
```

With the guard removed, we will now see an error in the console if we click between the column markers:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'indexOf')
```

#### 👉 YOU DO - Evaluate the Error (1 min)

1. Closely read the error.
2. Determine which line of code the error is occurring on.
3. Determine why the error is occurring.

#### Specifying Which Elements to Listen To

jQuery's implementation of event delegation allows us to specify which nested elements to listen to!

The secret sauce calls for providing a third argument to the `.on()` method used to add the event listener:

```js
/*----- event listeners -----*/
$('#markers').on('click', 'div', handleDrop);
```

The extra argument added between the name of the event (`'click'`) and the `handleDrop` callback is a CSS selector string that determines which elements to listen to.

Since we only want to listen for clicks on the `<div>` elements nested within the `section#markers` element, a simple `'div'` selector does the trick!

Verify that we're error-free when clicking between the column markers!

Of course, the CSS selector can be as comprehensive as necessary.

## 9. Should I Use jQuery?

For all the reasons already discussed, such as jQuery's rapid decline of use in new projects, you will likely benefit more by focusing on honing your vanilla JavaScript skills.

However, practicing DOM manipulation with or without jQuery is always a good thing, so be sure to complete the jQuery lab.

Also, be sure to check with your instructional team before choosing to use jQuery in your upcoming project.

## 10. Summary

Shout out to jQuery's legacy for all that it has done for web development!

There's no doubt that it has had a positive influence on the advancement of today's JavaScript.

For example, it's not a coincidence that `querySelector`/`querySelectorAll` were added to the browsers after jQuery showed us the way with how the jQuery function selects elements.

Our refactor of Connect-Four has demonstrated how to use jQuery to:

- Select elements in the DOM
- Change the content of DOM elements
- Change the CSS styling of DOM elements
- Implement event handling, including event delegation

Of course, jQuery has other tricks up its sleeve, so if you want to learn more, be sure to check out the Further Study section.

## 11. Further Study

### Other jQuery DOM Manipulations

jQuery can perform pretty much any DOM manipulation you can think of, such as:
- Adding classes, removing classes and checking if an element has a certain class.
- Creating new elements using the multi-purpose jQuery function.
- Adding and removing elements from the DOM.
- Manipulating the attributes of an element.

Thanks to jQuery's influence, modern JavaScript has similar APIs available to perform the above tasks.

However, jQuery does offer some methods that make it easier to provide eye candy that would require a bit more work without it.  Check out methods like:
- [fadeOut()](https://api.jquery.com/fadeout/)
- [fadeIn()](https://api.jquery.com/fadein/)
- [hide()](https://api.jquery.com/hide/)
- [show()](https://api.jquery.com/show/)
- [toggle()](https://api.jquery.com/toggle/)

### Adding jQuery Powers to Vanilla DOM Elements

Although vanilla DOM elements have numerous useful methods and properties by default, they don't have jQuery's shortcuts and super powers like these:

```js
> $('div').fadeOut()
> $('div').fadeIn()
```

Luckily, we can turn any vanilla DOM element into a super-powered jQuery Object by wrapping it in the jQuery function.  Still in the console, type...

```js
// Set a variable to reference a raw DOM element
const divs = document.querySelectorAll('div');

// Bummer, no super powers
divs.fadeOut(); // causes an error

// Turn it into a jQuery Object with super powers!
const $divs = $(divs);
// see you later alligator
$divs.fadeOut();  
// More big fun...
$divs.hide();
$divs.show();
$divs.toggle();
// A callback can be provided too!
$divs.toggle(function() {
  console.log('done being toggled!');
});
```

### Iterating Elements in a jQuery Object

Although the jQuery Object is an array-like object, it does not have the built-in handy array methods like `forEach()`.

However, jQuery usually provides its own methods, typically named using less characters 😀
 
Instead of `forEach()`, jQuery provides the [each()](https://api.jquery.com/each/) method on the jQuery Object that can be used to iterate over each raw DOM element:

```js
$('div').each(function(idx) {
  console.log( idx + ': ' + this.innerHTML );
});
```

Note that the `each()` method passes in an argument to the callback representing the index of the current iteration. **How is this different from an array's `forEach()` method?**

How do you access the actual DOM element during the iteration?  Well, jQuery has set the `this` keyword to point to the iteration's current vanilla DOM element.

### The jQuery `eq()` Method

The [eq()](https://api.jquery.com/eq/) method can be used to index into the array of DOM elements instead of using square brackets.

However, `eq()` automatically wraps the DOM element in a jQuery Object with all of the magic:

```js
const $divs = $('div');

// Fade out just the second <div>
$divs.eq(1).fadeOut();
```

### Chaining Methods

Each jQuery method, **when used as a setter**, returns the updated jQuery Object.  This allows us to **"chain"** methods like this:

```js
// Change all <p> tag's content and color
$('p').html('Awesome things jQuery can do:').css('background-color', 'peachpuff');
```

Often, you will see method chaining indented like this to enhance readability:

```js
// Change our <p> tag's content and color
$('p')
  .html('Awesome things jQuery can do:')
  .css('background-color', 'peachpuff');
```

### jQuery Plugins

There are lots of "plugins" available for jQuery that provide all sorts of functionality, such as UI components:


[jQuery Plugin Registry](https://plugins.jquery.com/)

### Code Minification

Often you will see library and framework files end with `.min.js`. This is a naming convention used to signify that the code has been _minified_.

Minification is the process of making a javascript file smaller by removing all line breaks and whitespace, reducing the length of variable and function names, and stripping out all comments.

The **benefits** of using minified versions of libraries is that they use less memory; and take less time to load, parse and execute since they are significantly smaller - usually around a third in size.

The **downside** of using minified code is that it can't easily be understood or debugged. We won't have to worry about debugging jQuery, but reading source code is a great way to learn coding techniques and in this case you would want to use the non-minified versions.

## References

[Official jQuery website](https://jquery.com/)

[jQuery Learning Center](http://learn.jquery.com/)

