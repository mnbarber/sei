<img src="https://i.imgur.com/qsSi07H.png">

# Intro to<br>Flexbox & CSS Grid

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the Use Case of Flexbox & CSS Grid |
| Use Flexbox for One-Dimensional Layout |
| Use CSS Grid for Two-Dimensional Layout |

## Road Map

1. Setup
2. Intro to Flexbox & CSS Grid
3. Why use Flexbox?
4. Flexbox Fundamentals
5. Your First Flexbox
6. Main Axis & Cross Axis
7. Why use CSS Grid?
8. CSS Grid Fundamentals
9. Your First CSS Grid
10. Making Grid Items Span Multiple Columns & Rows
11. Grid Gaps
12. Flexbox & CSS Grid Practice Sites
13. Further Study
14. References

## 1. Setup

For this lesson, we'll be using [replit.com](https://replit.com) to learn about Flexbox & CSS Grid:

1. Create a new **HTML/CSS/JS** Repl

2. Name the Repl something like _Flexbox & CSS Grid_

3. Sprinkle in a bit of starting CSS inside of `style.css`:

	```css
	* {
	  /* height & width now includes border & padding */
	  box-sizing: border-box;
	}
	
	body {
	  margin: 0;
	  font-family: Helvetica;
	}
	```

## 2. Intro to Flexbox & CSS Grid

As a front-end developer, you will be required to precisely lay out the elements on web pages.

Prior to Flexbox & CSS Grid, laying out the parts of a web page from basic navigation headers to complex full-page layouts has not been as straightforward as it could be - Flexbox & Grid, however, are game changers.

The capabilities of Flexbox & CSS Grid complement each other and using both side-by-side and even nesting one within the other is possible.

The difference between Flexbox and CSS Grid is how they are designed to lay out their children:

<img src="https://i.imgur.com/2ie45ct.png">

## Flexbox

### 3. Why Use Flexbox?

Flexbox excels at assisting devs with the following tasks:
	
- Centering content & elements within a container element
	
- Spacing child elements within a container uniformly
	
### 4. Flexbox Fundamentals

We use a CSS `display: flex;` declaration to make an element a **flex container**, for example: 

```css
section {
  display: flex;
}
```

The above would make all `<section>` elements **flex containers** and all direct children will automatically become **flex items**.

Let's browse to what has become the [de facto guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) to check out some of its features and properties.

### 5. Your First Flexbox

We're going to make a navigation bar using Flexbox.

Add the following markup for the nav bar inside of the `<body>`:

```html
<nav>
  <div>HOME</div>
  <div>ABOUT</div>
  <div>WIDGETS</div>
  <div>LOG OUT</div>
</nav>
```

Run the Repl to check it out - definitely not what we're looking for - yet!

Because the `<nav>` & `<div>` elements are block elements, they each want to take up all available width, but not for long...

<details>
<summary>
❓ Which element do we need to make the flex container?
</summary>
<hr>

The `<nav>` element.

Let's make it a Flexbox Container:

```css
nav {
  display: flex;
}
```

<hr>
</details>

Run again, and we can make the following observations:

- The `<div>` elements have become **flex items** and no longer behave as block elements - their width has collapsed to that of their content and they are willing to sit side-by-side other elements.

- The **flex items** are laid out horizontally in a **row** - this is the default layout of a **flex container**.

### 👉 YOU DO:  CSS Practice (4 mins)

This just in... Our client has informed us that:

- The navigation bar must:
	- Be `50px` in height
	- Have a background color of `#a2cbb6`.
- The menu items in the nav bar need:
	- A font size of `20px`
	- A margin of `10px` on all 4 sides
	- A text color of `#f3dba8`

- Add the CSS to make the client happy!

### 6. Main Axis & Cross Axis

A **flex container** has a `flex-direction` property that defines the direction of its **main axis**.

There are four values:

- `row` (the default)
- `row-reverse`
- `column`
- `column-reverse`

Let's check them out by adding a `flex-direction` to the `<nav>`.

A flex container's **cross axis** represents the opposite direction of its **main axis**.

For example, if the container's `flex-direction` is `row` (the default), the:

- **main axis** is **horizontal** (row)
- **cross axis** is **vertical** (column)

If the `flex-direction` is set to `column`, they flip:

- **main axis** is **vertical**
- **cross axis** is **horizontal**

The orientation of the **main axis** & **cross axis** impact the behavior of other flex properties, such as:

- `justify-content`: Controls alignment for the **main axis**

- `align-items`: Controls alignment for the **cross axis**

| `flex-direction`<br>(determines the<br>**main axis**) | `justify-content`<br>(lays out the **main axis**) | `align-items`<br>(lays out the **cross axis**) |
|:--:|:--:|:--:|
| row (default) | horizontal | vertical |
| column | vertical | horizontal |

Be sure to check out the cool alignment values we can assign to `justify-content` & `align-items` in the Guide to Flexbox we browsed to earlier.

### Back to the `<nav>` Bar

With the following alignment properties set:

```css
nav {
  display: flex;
  flex-direction: row; /* default */
  justify-content: flex-start; /* default */
  align-items: center; /* center vertically (cross-axis) */
  height: 50px;
  background-color: #a2cbb6;
}
```

The nav bar is not looking too bad...

<img src="https://i.imgur.com/j8lyhB7.png">

However, we want the `LOG OUT` menu item to be aligned on the right like this:

<img src="https://i.imgur.com/zRlWaUW.png">
	
We could wrap the other elements with another element and set `justify-content` to `space-between`.

Or, we can use this bit of CSS goodness:

```css
nav > div:last-child {
  margin-left: auto;
}
```

Assigning `auto` makes the left margin of the nav's last div to take up available space.
	
### ❓ Review Questions - Flexbox (2 mins)

<details>
<summary>
1. When an element has a CSS property of <code>display: flex;</code>, that element becomes a Flex C__________.
</summary>
<hr>

**Container**

<hr>
</details>

<details>
<summary>
2. When an element has a CSS property of <code>display: flex;</code>, its direct children become Flex I_____.
</summary>
<hr>

**Items**

<hr>
</details>

<details>
<summary>
3. What value is the default for the <code>flex-direction</code> property?
</summary>
<hr>

**`row`**

<hr>
</details>

<details>
<summary>
4. Is it <code>justify-content</code> or <code>align-items</code> that controls the alignment along the main axis?
</summary>
<hr>

**`justify-content`**

<hr>
</details>

## CSS Grid

### 7. Why use CSS Grid?

**CSS Grid** is a great option when you have:

1. A page layout like this (or as complex as you'd like):
	<img src="https://i.imgur.com/tkBPUd0.png">
2. Any other "components" that would benefit from a grid-type layout such as a "profile card", in other words, CSS Grid doesn't have to apply to the whole page - it can be useful for laying out smaller "components" as well.

### 8. CSS Grid Fundamentals

Unlike Flexbox, **CSS Grid** lays out its **grid items** in **two-dimensions**.

**CSS Grids** have the following "parts":

- **Tracks**
- **Cells**
- **Areas**
- **Grid Lines**
- **Gaps**

<img src="https://i.imgur.com/yNTGxhx.png">

As you might expect, there are plenty of CSS Grid-related properties and values.

Here's the [CSS Grid equivalent of that Flexbox guide we used earlier](https://css-tricks.com/snippets/css/complete-guide-grid/).

Let's browse to it and take a peek.

### 9. Your First CSS Grid

To try out CSS Grid, we'll continue to work in the Repl to layout this UI:

<img src="https://i.imgur.com/d1nl2fn.png">

Let's modify the existing CSS to turn the `<body>` element into a **grid container**:

```css
body {
  margin: 0;
  font-family: Helvetica;
  <!-- new css below -->
  height: 100vh;
  display: grid;
}
```

> Again, CSS Grid is handy beyond laying out the "page" - it's also awesome for laying out smaller UI components such as the "Profile Card" in the upcoming lab.

Using `height: 100vh;` will make the `<body>` fill the height of the browser window so that the `<footer>` is at the bottom.

> `vh`, and its other viewport unit siblings are awesome!  Be sure to check out the link in the Further Study section when you have a chance.

Now let's add the additional HTML required by the UI:

```html
<body>
  <nav>
    <div>HOME</div>
    <div>ABOUT</div>
    <div>WIDGETS</div>
    <div>LOG OUT</div>
  </nav>
  <aside>SIDE BAR</aside>
  <main>MAIN CONTENT</main>
  <footer>FOOTER</footer>
</body>
```

Now for a bit of styling to change the color of the elements we just added so that we can more easily see them:

```css
aside {
  background-color: #a2b4da;
}
	
main {
  background-color: #f3dba8;
}
	
footer {
  background-color: #a2cbb6;
}
```

One more stylistic touch... What if we want to center the text in those elements both horizontally and vertically?

Centering content is very common, so let's create a class that will make any element with that class a Flexbox that centers its content:

```css
.flex-ctr {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 👉 YOU DO:  CSS Practice (1 min)

Add the newly created `flex-ctr` class to the following elements:

- `<aside>`
- `<main>`
- `<footer>`

<hr>

Using Chrome DevTools to explore the page's elements, we can make the following observations:

- A **CSS Grid** has a single column by default.
- By default, each **grid item** is placed in a column from left-to-right until there are no more columns, then after the columns are filled, a new row is created.

Now let's define the columns and rows necessary to layout our page as desired.

#### ❓ Go back and examine the page layout we want, then answer the following (1 min):

> Hint:  Think "spreadsheet"

<details>
<summary>
How many columns will we need to define to attain the desired layout?
</summary>
<hr>

**2**

<hr>
</details>

<details>
<summary>
How many rows?
</summary>
<hr>

**3**

<hr>
</details>

Okay, let's define those columns and rows:

```css
body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr 30px;
  ...
```

> The `fr` unit is used by CSS Grid to represent a _fraction_ of the available space. So in our layout, the first column will be 1/5th the width of the window. Note that `fr` is similar to using the percentage unit (`%`), however, `%` does not consider any grid `gap` set, therefore its use can lead to the grid items overflowing its grid container. 

Running the repl shows that we've made a mess.  But notice how each **grid item** is simply being placed in each cell across the columns from left to right. This is the default behavior.

To fix the layout we need both the `<nav>` and the `<footer>` to span two columns each...

### 10. Making Grid Items Span Multiple Columns & Rows

There are a couple of ways to make **grid items** cover rectangular grid **areas**.

One way is by defining `grid-template-areas` on the grid container; then using  the `grid-area` property on the **grid item**.

However, in this lesson, we'll look at a somewhat simpler option that works well in this case...

The `grid-column` CSS property determines which **grid lines** a **grid item** starts and ends on.  For example:

```css
nav, footer {
  grid-column: 1 / 3;
}
```

> Note: The lines are numbered starting with 1 (not zero).

We can also use `span x` to specify how many columns we want the grid item to span:

```css
nav, footer {
  grid-column: span 2;
}
```

Unsurprisingly, there's a `grid-row` property as well.

Both `grid-column` & `grid-row` are shorthand for `grid-column-start` & `grid-column-end`, and `grid-row-start` & `grid-row-end`, respectively.

### 11. Grid Gaps

The last thing we'll look at in regards to CSS Grid are grid **gaps** which specify the size of the **grid lines**.

Update the CSS of the `<body>` (grid container) to the following:

```css
body {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 50px 1fr 30px;
  gap: 5px;  /* specifies width of grid lines */
  ...
```
	
> Note:  Other than their width, it's not possible to style grid gaps - the grid's background simply shows through.

> Also, the `gap` property sets the width of both row and column gaps, if you want different widths, use the `row-gap` and `column-gap` properties.

### 12. Flexbox & CSS Grid Practice Sites

We've covered the key fundamentals of these two fine additions to CSS.

For a fun way to practice and learn more, check out these awesome apps:

- [FLEXBOX FROGGY](https://flexboxfroggy.com/)
- [GRID GARDEN](https://cssgridgarden.com/)

## 13. Further Study

Check out [this article](https://css-tricks.com/fun-viewport-units/) to learn more about viewport units!

## 14. References

[MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

[MDN - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

[Learn CSS Grid](https://learncssgrid.com/)
