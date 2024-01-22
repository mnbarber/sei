<img src="https://i.imgur.com/ijRQ97Z.jpg" width="300">

# Intro to the DOM

## Learning Objectives

| Students Will Be Able To: |
|---|
| Use DevTools to Explore the DOM |
| Select a Single Element in the DOM |
| Select Multiple Elements in the DOM |
| Change the Content of an Element |
| Change the Style of an Element |
| Manipulate the Attributes of an Element |
| Manipulate the Classes of an Element |
| Iterate Over a Collection of Elements |

## Road Map

1. Setup
2. What's the DOM?
3. Using DevTools to Explore the DOM
4. Selecting DOM Elements
5. Selecting a Single Element by its `id`
6. Selecting a Single Element Using a CSS Selector
7. Changing the Content of an Element
8. Changing the Style of an Element
9. Accessing/Modifying the Attributes of an Element
10. The `class` Attribute
11. Selecting Multiple Elements
12. DOM Selection Summary
13. Iterating Over a Collection of Elements
14. Further Study

## 1. Setup

Today we will use an actual project structure instead of working within Replit.

### Create the Project Files

1. Move in your `code` folder/directory: `cd ~/code`
2. Create a new directory named `dom-practice`:  `mkdir dom-practice`
3. Move into the new directory: `cd dom-practice`
4. Create an `index.html` file:  `touch index.html`
5. Open the directory in VS Code: `code .`
6. Open `index.html` in the editor and use `! [tab]` to create the HTML boilerplate
7. Create a `js` directory and touch a `js/main.js` file
8. Add a `<script>` tag to include `main.js` in the `<head>`:

	```html
	<head>
	  ...
	  <title>DOM Practice</title>
	  <script defer src="js/main.js"></script>
	</head>
	```
	> The `defer` attribute ensures the DOM is ready before the script executes.
9. Finally, let's add an `<h1>` inside of the `<body>` as follows:

	```html
	...
	<body>
	  <h1 id="title" class="main-title">DOM Practice</h1>
	  
	</body>
	</html>
	```
	> Note: It's a best practice to use double quotes and kebob-casing in HTML.

### View `index.html` in Live Server

In order to view the `index.html` page in the browser, we're going to install a popular extension in VS Code called [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

Click on the Extensions icon in VS Code's activity bar:

<img src="https://i.imgur.com/Lz2ZFgU.png" width="50%">

Type "Live Server" into the Search input and click the green `[Install]` button for the top Live Server result as shown:

<img src="https://i.imgur.com/KPJaX7K.png" width="50%">

To return to the file explorer, click the icon in the top-left, then, to start Live Server, click "Go Live" in the status bar at the bottom:

<img src="https://i.imgur.com/fUPBsng.png" width="50%">

Live Server should automatically open `index.html` in a new browser tab:

<img src="https://i.imgur.com/8iCPHQm.png">

## 2. What's the DOM?

The [DOM (Document Object Model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) is the in-memory data structure that represents the browser's web document.

<img src="https://i.imgur.com/W9ahTXh.png">

As you can see, it's a tree-like data structure with the top (root) being the `document` object.

<details>	
<summary>❓ What JS data type would each of those nodes be?
</summary>
<hr>

**Nodes most certainly will be JS objects with properties used to get/set information and methods to manipulate the DOM.**

<hr>
</details>

If we type `document` in DevTool's console, we'll see the HTML-centric representation of the document, however, we want to explore the JavaScript data structure that is the DOM.  We can do this by typing `dir(document)` in console and exploring the objects and properties of the DOM.

The DOM has an application programming interface ([API](https://en.wikipedia.org/wiki/Application_programming_interface)) that enables developers to make the UI dynamic by using JavaScript to:

-  Add/remove elements to/from the document
-  Change the content of elements
-  Change an element's styling
-  Listen for events, e.g., when an element is clicked
-  Animate elements

## 3. Using DevTools to Explore the DOM

Use the **open in browser** VS Code extension to open the `index.html`   file in the browser by right-clicking and selecting `Open in default browser` or by using the keyboard shortcut `option-b`.

After `index.html` is opened in Chrome, use the keyboard shortcut of `option command J` (macOS) or `ctrl shift J` (Windows) to open Chrome's DevTools.

Click on the **Elements** tab to browse the HTML hierarchy of the DOM.

Let's try out the DevTools by clicking on the `h1` element and using the **Styles** panel to add a CSS property of `color: red;`

<img src="https://i.imgur.com/RAvgNl0.png">

Look closely after the closing `</h1>` tag - you see that _`== $0`_?

That tells us that Chrome has created a variable named `$0` that represents the `<h1>` element in the DOM!

Click on the **Console** tab and let's explore the properties on the `$0` element/object by typing `dir($0)`.

You are now able to explore the `<h1>` element's DOM object - referred to as a **node**.

Now try typing this in: `$0.style.backgroundColor = 'yellow'`

> CSS property names in the DOM are lowerCamelCased because hyphens would be interpreted as minus signs.

## 4. Selecting DOM Elements

Developers make web pages dynamic by manipulating the DOM using JavaScript.

For example, in a To-Do app, a user typically would:

- Type the text of the new to-do into an `<input>`
- Click an `[Add Todo]` `<button>`

The developer certainly would have coded a JavaScript function that would run in response to the button being clicked.

That function would then perform the following:

1. Create a new element, e.g., an `<li>`
2. Access the text entered into the `<input>` element
3. Set the content of the `<li>` to that text
4. Append the new element to the appropriate parent element, e.g., a `<ul>`
5. Finally, for a better user experience (UX), "reset" the input by clearing out the current text

Several of the above steps requires the JS to access existing elements. Let's see how we can select those DOM elements...

## 5. Selecting a Single Element by its `id`

The [getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method is the most efficient way to select a DOM element if it has an `id` assigned to it (using the `id` attribute).

Let's select the `<h1>` by its `id` and save the reference to the DOM element in a variable named `titleEl`:

```js
const titleEl = document.getElementById('title');
console.log(titleEl);
```

If you wish to explore the element's JS object representation (the DOM), use `console.dir()` instead of `console.log()`.

> Note: When using `getElementById`, be sure not to preface the name of the id with `#`, e.g., `document.getElementById('#title');` will return `null`!

Cool, but how do we select a single element without an `id`?  Let's see...

## 6. Selecting a Single Element Using a CSS Selector

The [querySelector(selector)](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method is the go to method for selecting a single element using the power of CSS3's selectors.

The **`selector`** argument is a string that follows the rules of regular CSS3 selectors.

Yes, we can select DOM elements using CSS3 selectors just like do to target elements for styling!

<details>	
<summary>
❓ What selector would be used to select a <code>&lt;section&gt;</code> element with a class of <code>main</code>?
</summary>
<hr>

**`section.main`**

<hr>
</details>

If the CSS selector provided to `querySelector()` matches multiple elements, it returns the **"first"** matching element, however, it's best to avoid this scenario by using a more specific selector.

If no matching DOM element is found, `querySelect()` will return `null`.

### 👉 YOU DO: Practice (3 mins)

1. In `index.html`, add a `<p>` tag below the `<h1>` and give it a `class` of `cool`, then...

2. Add some content inside of the `<p>` tag - try typing `lorem [tab]` to emit (using _emmet_) random _lorem ipsum_ text.

3. Use `document.querySelector()` to select the `<p>` element with a class of `cool` and assign it to a variable named `pEl`.

4. Verify that the `<p>` element was selected by logging out `pEl`.

## 7. Changing the Content of an Element

Now that we're able to select an element of our choosing, let's see how we can change the content of that element...

Inspecting the properties of a DOM element in the console reveals a couple of properties that we can use to read and set its content:

- [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) - Used to retrieve/set content as an HTML string
- [innerText](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) - Used to retrieve/set content as plain text

Let's check out changing the content of the `<p>` element by assigning the string **`Comments for <strong>Today</strong>`** first to `innerText`, then to `innerHTML`.

So, as you saw, if you want to include HTML in the content, use `innerHTML`.

The power of `innerHTML` may not be obvious at first, however, the string being assigned can be as complex as you want - containing multiple elements with attributes, etc.

If the string you want to assign does not contain any HTML, assigning to `innerText` is more efficient because internally, JS would not have to scan the string looking for HTML to process.

> Note:  There is another property, [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent), that is very similar to `innerText` - the primary difference between the two is that `textContent` returns all text content regardless of styling, whereas, `innerText` takes styling into consideration.  For example, `innerText` will not return text that has been hidden using CSS.

## 8. Changing the Style of an Element

DOM elements have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property that can be used to set CSS styling!

Check out the CSS properties in the console.

<details>	
<summary>
❓ What naming convention is used for CSS properties in the DOM?
</summary>
<hr>

**lowerCamelCasing**

<hr>
</details>

<details>	
<summary>
❓ What naming convention is used for CSS properties in CSS?
</summary>
<hr>

**kebob-casing**

<hr>
</details>

<details>	
<summary>
❓ Why can't kebob-casing be used for the DOM as well?
</summary>
<hr>

**The DOM is JS so the hyphen would be interpreted as a minus sign**

<hr>
</details>

This is how we can center the text in the `<h1>` by setting the `text-align` CSS property on the `style` object:

```js
const titleEl = document.getElementById('title');
titleEl.style.textAlign = 'center';
```

### 👉 YOU DO: Setting Styling on a DOM Element (1 min)

- Change the `color` of the `<p>` element to a color of your choosing.

## 9. Accessing/Modifying the Attributes of an Element

You may need to get, set, or check if an element has a certain **attribute**.

The following are methods that the [Element API](https://developer.mozilla.org/en-US/docs/Web/API/element) has for working with an element's attributes:

- [getAttribute(name)](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)
- [setAttribute(name, value)](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- [hasAttribute(name)](https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute)

### 👉 YOU DO: Attributes (5 mins)

1. In `index.html`, add an `<a>` element to `index.html` with content of "Visit Google" but **without an `href` attribute**.

2. Reload the page and verify that the link does not work. In fact, it won't even look like a link.

3. In the JS, write the line of code that will add an `href` attribute that will make the link navigate to "https://www.google.com".

> Hint: Which of the attribute methods above looks tasty?

## 10. The `class` Attribute

Technically, you could use those attribute methods above to work with an element's classes.

However, the [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) property offers a better approach. 

`classList` is an object with the following methods pertaining to classes:

- `add(className, className, ...)` 
- `remove(className, className, ...)`
- `toggle(className)`
- `contains(className)`
- `replace(oldClass, newClass)`

### ❓ Review Questions

<details>
<summary>
(1) If we want to change the text (without HTML) inside of a <code>&lt;div&gt;</code>, which property should we assign to?
</summary>
<hr>

**innerText**

<hr>
</details>

<details>
<summary>
(2) How many DOM elements are returned by the <code>querySelector</code> method?
</summary>
<hr>

**one**

<hr>
</details>

<details>
<summary>
(3) What DOM element property is used to style a DOM element using JS?
</summary>
<hr>

**`style`**

<hr>
</details>

## 11. Selecting Multiple Elements

Before we checkout selecting multiple elements, let's add the following HTML below the existing `<p>` element.

VS Code includes [Emmet](https://docs.emmet.io/abbreviations/syntax/), which is a great tool for quickly generating markup. Type the following to generate most of the desired markup below:
<br>`ul#comments>li{comment}*3`

```html
<ul id="comments">
  <li>first comment</li>
  <li>second comment</li>
  <li>third comment</li>
</ul>
```

Like `querySelector()`, the [querySelectorAll(selector)](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method uses the power of CSS3 selectors to specify which DOM elements we want to select.

Of course, like the name says, it selects **all** DOM elements that match the provided selector.

### 👉 YOU DO: Selecting Multiple Elements (2 mins)

1. Use `document.querySelectorAll()` to select all `<li>` elements that are children of the element with an id of `comments`, assigning them to a variable named `commentEls`.

2. `console.log(commentEls)` to verify it worked. 

## 12. DOM Selection Summary

In summary, use the following to help you decide which method to use to select DOM elements:

- **`getElementById`**: Use when you need to select a single element that has an `id` assigned to it.

- **`querySelector`**: Use when you need to select a single element that **does not** have an `id`.

- **`querySelectorAll`**: Use when you need to select multiple elements.

## 13. Iterating Over a Collection of Elements

`querySelectorAll` returns an array-like object called a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList).

There are three approaches we can use to iterate over the elements in a NodeList:

1. **A regular [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) loop**:  This works, but it's not as readable or elegant...

2. **The NodeList's [forEach](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) method**:  A good option when you want to iterate through **all** elements and/or need to access the **index** of the iteration.

3. **A [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) loop**:  Elegant and allows early exit of the loop with the `break` statement.  However, if we need to access the **index** of the iteration, we would need to track it manually by initializing a separate variable before the loop and incrementing it within the loop.

Let's type the following `for...of` loop in the console to log each element:

```js
for(let commentEl of commentEls) {
  console.log(commentEl);
}
```

Now let's use the same `for...of` statement to modify those comment elements...

### 👉 YOU DO: Iterating and Updating Styling (3 mins)

- Add a `for...of` loop to `main.js` that changes the font size of all the `<li>` comment elements to `30px`.

  > Hint: You must use a string like `'30px'` - just the number `30` or the string of `'30'` will not work. 

## 14. ❓ Essential Questions (3 mins)

<details>
<summary>
(1) What method is the most efficient for selecting an element that has an <code>id</code>?
</summary>
<hr>

**`getElementById`**

<hr>
</details>

<details>
<summary>
(2) If we want to assign content to an element that includes HTML, what property on the DOM element would we assign to?
</summary>
<hr>

**`innerHTML`**

<hr>
</details>

<details>
<summary>
(3) If we want to assign plain text (no embedded HTML), what property on the DOM element would we assign to?
</summary>
<hr>

**`innerText` (or `textContent`)**

<hr>
</details>

<details>
<summary>
(4) Which property on a DOM element is used to set the CSS styling for that element?
</summary>
<hr>

**`style`**

<hr>
</details>

## 15. Further Study

### Turning `NodeList` & `HTMLCollection` Array-Like Objects Into Actual Arrays

As discussed in the lesson, methods designed to return a collection of DOM elements return "array-like" objects that have a `forEach` method, but don't contain other useful methods that full-fledged arrays have.

If you would need to hold your DOM elements in an actual array, either of the following two approaches will do the trick...

#### `Array.from()` Method

Here's how you can use the [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) static method to convert an iterable, such as a NodeList, into an actual array:

```js
const itemEls = Array.from(document.querySelectorAll('.item'));
```

Now, `itemEls` would be an actual array with all array methods available.

For example, here's how you could find the index of a clicked DOM element in the array:

```js
const itemEls = Array.from(document.querySelectorAll('.item'));
const containerEl = document.querySelector('section');

containerEl.addEventListener('click', handleClick);

function handleClick(evt) {
  const indexOfClickedItem = itemEls.indexOf(evt.target);
  console.log(indexOfClickedItem);
}
```

#### Spread Syntax

Another way to convert a NodeList or HTMLCollection into an array is by using the [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) within an array literal:

```js
const itemEls = [...document.querySelectorAll('.item')];
```

### Other Methods to Select Multiple Elements

The following methods _can_ also be used to select multiple elements:

- `getElementsByTagName(namesString)`
- `getElementsByClassName(namesString)`

The above methods return a **live** [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection).

Although it's pretty cool that the returned list is automatically updated to include/exclude DOM elements as the DOM changes, the above methods are not as flexible as the `querySelectorAll` method.

## References

- [Locating DOM Elements using Selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors)

- [Intro to the DOM on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
