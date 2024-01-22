<img src="https://i.imgur.com/RZwMZi2.png">

# Responsive Web Design

---
## Learning Objectives

| Students Will Be Able To: |
| --- |
| Describe what Responsive Design is |
| Explain the benefits of Mobile First design |
| Use CSS Media Queries to alter page layout and styling |

## Road Map

1. Setup
2. Intro to Responsive Web Design
3. Examples of Responsive Design
4. Mobile First Design Philosophy
5. First Step to Enabling a Better Experience on Mobile
6. Using Media Queries to Apply Different CSS Rules to a Page
7. Essential Questions
8. References

## 1. Setup

To experiment with responsive design, open up a new HTML/CSS/JS Repl in [repl.it](https://repl.it) and name it **Media Queries**.

<details>
<summary>
👉 Copy/paste the following HTML inside of the <code>&lt;body&gt;</code>:
</summary>

```html
<header>MEDIA QUERIES</header>
<aside>SIDE</aside>
<main>CONTENT</main>
<footer>FOOTER</footer>
```

</details>

<details>
<summary>
👉 In addition, copy/paste the following CSS into <em>style.css</em>:
</summary>

```css
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  margin: 0;
  font-family: Helvetica;
  display: grid;
  /* mobile first - single column */
  grid-template-columns: 1fr;
  grid-template-rows: 50px 30px auto 100px;
  grid-template-areas: 
    "hdr"
    "ftr"
    "content"
    "side";
}

header {
  grid-area: hdr;
  background-color: #ff9e7a;
}

footer {
  grid-area: ftr;
  background-color: #b1fcc8;
}

aside {
  grid-area: side;
  background-color: #ffe07a;
}

main {
  grid-area: content;
  background-color: #bf9df7;
}

header, footer, aside, main {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

</details>

After copy/pasting the above, this starting point will be rendered:

<img src="https://i.imgur.com/RIVeyc1.png">

In a previous lesson you saw how to position **grid items** using the `grid-column` property.

Reviewing the above CSS reveals how the [grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) property can be used to define named areas and then assign grid items to those specific areas using the [grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area) property.

## 2. Intro to Responsive Web Design

### Background

Not that long ago, building a successful online presence meant just ensuring that your website worked correctly in all the major desktop browsers. 

Fast forward to today and desktop browsing is rapidly being replaced by surfing on mobile devices.

Over 83% percent of the world's population now own a smartphone and nearly 60% of web pages are served to smartphones globally!

It's becoming more and more important that our web apps be usable via mobile devices!

### Enter - Responsive Web Design

[Responsive Web Design](https://en.wikipedia.org/wiki/Responsive_web_design), refers to the process of making web pages adapt and render well on a variety of devices.

Specifically, the most important criteria to respond to is the **width** of the device's screen.

#### What specifically responds/adapts?

Primarily, the overall layout of the page.

But you can pretty much change anything on the page you want.  For example, I'm sure you've seen the menu links in a navigation bar disappear and be replaced with a "hamburger" icon before.

Take a look at the image at the top of this lesson too - notice how the number of columns changes?

Now that we know what Responsive Design is, let's look at some real-world examples out there.

## 3. Examples of Responsive Design

An excellent example of a responsive site is one you've become very familiar with, [GitHub](https://github.com/).

For another example check out the [Bootstrap](https://getbootstrap.com/) CSS framework's site.

## 4. Mobile First Design Philosophy

When designing and coding the base/main CSS for a site or app, there are two approaches that can be followed:

1. Write the base CSS for a large, desktop screen, then apply "new" CSS (using media queries) as the screen width **decreases**, or
2. Write the starting CSS for a mobile screen, then apply additional CSS as the width **increases**.

The experts tell us that it's better to use the second, **mobile first**, approach for the following reasons:

- Translating the design from mobile to desktop is easier than vice-versa, thus it should require less time to build the site.
- Mobile first encourages you to think about what content is the most important - and prioritize it.
- It's easier to detect performance related issues, such as the slow loading of large image files, on mobile devices and it's better to deal with performance issues early on.
- A design based on a small screen width, although not ideal, is usable on larger devices, however the reverse is often not the case.

## 5. First Step to Enabling a Better Experience on Mobile

For those of us that remember using smartphones when they first came out to browse the web, we often saw screens with tiny, unreadable content like this:

<img src="https://i.imgur.com/BXhiZRF.jpg">

Unlike on desktop browsers that render pixel-by-pixel, mobile browsers first render to a virtual **viewport** and then shrink the page to fit the screen.

For example, the browser internally might render the webpage virtually at 980px then display it by shrinking it down to the device's actual screen size, e.g., 640px.  This is what leads to the scenario seen above.

To improve this situation, Apple introduced the "viewport meta tag"...

#### `<meta name="viewport" ...>` to the Rescue

The viewport [`<meta name="viewport" ...>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) informs the browser not to scale the page as seen above and instead, display the content based upon the physical number of pixels available - just like desktop browsers do.

This viewport `meta` tag is so important, that tools such as Emmet/VS Code add it automatically in the HTML boilerplate.

The following should look familiar...

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

With that `meta` tag in the document's `head` element, the above page will now render as:

<img src="https://i.imgur.com/hdSBUzg.jpg">

Much better!  Be sure to always have `<meta name="viewport" ...>` in every web app you write!

## 6. Using Media Queries to Apply Different CSS Rules to a Page

### What's a Media Query?

A [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) provides a way to **conditionally** include CSS rules.

A media query contains its own section of CSS that is used to modify the current CSS when certain "media" conditions exist.

The media query can be composed of any number of _media feature expressions_, such as `(min-width: 768px)`, and optional _media types_, such as `print`, `screen`, or `all`.

### Our First Media Query

Let's add a media query to improve our current layout for devices larger than mobile.

The following conditionally adds CSS as the screen increases in width to at least 768 pixels - typically considered a common "breakpoint" width for tablets:

```css
@media only screen and (min-width: 768px) {
  body {
    /* tablet - two column display */
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 50px auto 30px;
    grid-template-areas: 
      "hdr hdr"
      "side content"
      "ftr ftr";
  }
}
```

Note that we only add CSS declarations for the properties we want to change - don't repeat any of the CSS above the media query.

Resize the window and check it out!

### Order May Matter

Be sure to put media queries **after** the "base" CSS rules in the stylesheet.

Also, the ordering of the media queries themselves may matter, for example:

```css
/* Base CSS */
* {
  color: red;
}

/* Desktop Device CSS */
@media (min-width: 1024px) {
  * {
    color: green;
  }
}

/* Tablet Device CSS */
@media (min-width: 768px) {
  * {
    color: blue;
  }
}
```

❓ Do you see why there can never be any green text?

### 👉 YOU DO - Media Query (5 min)

- Add another media query with a breakpoint of `(min-width: 1024px)` (a common breakpoint width for desktop displays).

- Within the media query, add some CSS to change the `color` property of at least one element.

- Within the media query, add some CSS to change the `background-color` property of at least one element.

<hr>

Let's wrap up with a few review questions for you...

## 7. ❓ Essential Questions (2 mins)

<details>
<summary>
1. In your own words, describe Responsive Design.
</summary>
<hr>

**Designing web pages so that they render well based on the features of a device (usually its screen width).**

<hr>
</details>

<details>
<summary>
2. When coding an app that we want to make responsive, is it preferable to write the "base" CSS for mobile screens or desktop?
</summary>
<hr>

**Mobile** (mobile first design)

<hr>
</details>

<details>
<summary>
3. What key CSS feature did we use in this lesson that's fundamental to the implementation of responsive design?
</summary>
<hr>

**Media Queries**

<hr>
</details>

## 8. References

[MDN - Using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

[MDN - grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
