A walk through for JS unit tests using Jest as our test runner, assertion library & coverage reporter

## Setting up for tests using Jest
- If you've not already, run `npm init` to start a new package for your project
- Install [jest](https://jestjs.io/) as a dev dependency `npm install jest --save-dev`
- Make a `/test` folder and make your first spec file eg `spec.js`
- Decide what you want to test! Let's make a function that adds two numbers together.

## Making your code accessible to your test suite
Let's say you have a `.js` file with several functions inside it that you wish to test. The easiest way to make them accessible to other files is to export them.

```js
function add(a, b){
    return a + b;
}

function multiply(a, b){
    return a * b;
}

module.exports = { add, multiply }
```

Note the use of destructuring above. What we have on the last line is the equivalent of putting: \
`module.exports = { add: add, multiply: multiply }` \
- which is perfectly valid JavaScript, just a bit unnecessarily verbose!

Now we are exporting our functions, we can import them into our test file.
```js
// in test file
const myFuncs = require('/path/to/my/functions/file')
```

Since we exported an object in this example, we can access those functions as properties of our object eg. `myFuncs.add`

_Note that when testing client side code, if not using a module bundler such as webpack or [browserify](https://github.com/getfutureproof/fp_guides_wiki/wiki/Browserify), you will get a warning in the browser console that `module` is not defined. This isn't too big of a deal since you only need the exports during test, but to get rid of the console warning, you can wrap the export in a try/catch._

## Writing your first test using Jest
Invoke jest's `describe` function which takes two arguments: a string & a function. \
The first argument (the string) says what you're testing - this will be used in the output. \
The second argument (the function) will say how we're going to test it. \

```js
describe ('addThese', () => {} )
```
Now let's fill out that function block (the bit in between the curly braces)
```js
describe ('addThese', () => {
  // adding code here!
})
```

Now we have access to that function, we can make some assertions about it. \
For each assertion, we will call on another jest function, `test`, which takes 2 arguments just as `describe` does - a string and a function. 
```js
describe('addThese', () => {
    expect(myFuncs.addThese).toBeDefined();
})
```

In the example above, `toBeDefined` is one of many ['matchers'](https://jestjs.io/docs/en/using-matchers) offered by Jest. Other very common ones include `toBe`, `toContain`, `toEqual`, `toBeTruthy` and many more. You can negate most of these matchers by adding the `.not` method before them eg: 
```js
test('sentence', () => {
    let greeting = "Hello!"
    expect(greeting).not.toContain("goodbye")
})
```

## Running your tests
The easiest way to run your tests is to write an npm script to do it for you! In your `package.json` file, add (or update) a `"test"` script to look something like this:
```js
 "scripts": {
    "test": "jest --watch"
  },
```
Jest will automatically look for files with a `.test.js` extension and run as many as it finds. \
The `--watch` flag is optional but recommended as it will keep the test runner up and re-run your tests when any changes are detected. \
Another handy flag is `--silent` which will silence (not print out) and console log/warn/error calls you may be making in your app code. Whilst not essential, you may find the log output distracting during the test run.


## Checking your test coverage
To get a check on what percentage of your code has test coverage, jest comes with a built in reporter:
- Add a new npm script in your package.json:
```js
 "scripts": {
    "test": "jest --watch --silent",
    "coverage": "jest --coverage"
  },
```
- Now you can see your test coverage with `npm run coverage`

# Jest and node.js ESM vs cjs modules

Something you'll run into when writing unit tests with jest is that jest doesn't support ESM out of the box. ESM means ecma script modules, these are also referred to as ES6 modules. This module pattern is supported in newer versions of node but not out of the box in jest. Jest is built to deal with common javascript modules(cjs). If you want jest to support ESM, you'll have to configure your jest test project to utilize an interpreter with ESM enabled, typically this is babel. 

Read up on the jest's teams current state of supporitng ESM modules [here](https://jestjs.io/docs/ecmascript-modules).

Read up more on ESM vs cjs modules as well as some other alternative modules paradigms [here](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)