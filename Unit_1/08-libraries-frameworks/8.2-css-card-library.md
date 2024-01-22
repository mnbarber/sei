<img src="https://i.imgur.com/zTfHMMS.png">

# How to Use the CSS Card Library

## Intro

If you are coding a card-based game, there's no need to find or create images for the cards.

Instead, we have an open-source CSS Card Library that renders beautify playing cards, both fronts and backs!

The library uses [Scalable Vector Graphics (SVGs)](https://developer.mozilla.org/en-US/docs/Web/SVG) so they cards will render clear and crisp at any size! 

## Code Example

The code in [this repl shown above](https://replit.com/@SEIStudent/How-to-Use-CSS-Card-Library#index.html) demonstrates:

- How to load the CSS Card Library
- How to build an array of card objects
- How to create new shuffled "decks" of card objects
- How to render the cards using the classes provided by the library

### Include the CSS Card Library in a Project

It's recommended that you duplicate the folder structure shown in the Repl so that you can use the same `<link>` element to load the library:

<img src="https://i.imgur.com/m2vLGiV.png">

You can obtain the library by downloading a zip file of the project, extracting it, and copying the `card-library` folder **and all of its contents** into the `css` folder:

<img src="https://i.imgur.com/tnfcsX0.png">

### Review the Code

Review the code and examine how:

- The `buildOriginalDeck()` function uses a nested `forEach` to create an array of card objects.
- The `getNewShuffledDeck()` function creates a copy of the `originalDeck` and randomly shuffles it.
- The `renderDeckInContainer()` function renders any deck into any DOM container element.
