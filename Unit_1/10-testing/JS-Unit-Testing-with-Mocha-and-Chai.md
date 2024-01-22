A walk through for JS unit tests using Mocha as our test runner, Chai as our assertion library & nyc as a coverage reporter

## Setting up for tests using Mocha & Chai
- If you've not already, run `npm init` to start a new package for your project
- Install [mocha](https://mochajs.org/) as a dev dependency `npm install mocha --save-dev`
- Install [chai](https://www.chaijs.com/) as a dev dependency `npm install chai --save-dev`
- Make a `/test` folder and make your first spec file eg `spec.js`
- Bring chai's 'expect' library to your `spec.js` with `const expect = require('chai').expect;`
- Decide what you want to test! Let's make a function that adds two numbers together.


**BONUS** Use [rewire](https://www.npmjs.com/package/rewire) to streamline the sharing of code to you test suite. \
- `npm install rewire --save-dev`
- In your spec file, add
```js
const rewire = require('rewire');
```
- In your spec file, make a reference to the file your code is in that you wish to test. Note it is using a relative path.
```js
let app = rewire('../theNumberGames');
```


## Writing your first test in Mocha / Chai
Invoke mocha's `describe` function which takes two arguments: a string & a function. \
The first argument (the string) says what you're testing - this will be used in the output. \
The second argument (the function) will say how we're going to test it. \

```js
describe ('addThese', () => {} )
```
Now let's fill out that function block (the bit inbetween the curly braces)
```js
describe ('addThese', () => {
  // adding code here!
})
```

If you are using `rewire`, now is the time to grab the specific function you need to test.
```js
describe ('addThese', () => {
  let add = app.__get__('add');
})
```

Now we have access to that function, we can make some assertions about it. \
For each assertion, we will call on another mocha function, `it`, which takes 2 arguments just as `describe` does - a string and a function. \
```js
describe('addThese', () => {
    let add = app.__get__('add');

    it('should exist', () => {
        // we need to make our assertion here
    })
})
```

Now we'll start making use of chai's library. Chai has lots of really great, semantically beautiful, offerings. Using chai we can practically write in English!
`expect(add).to.be.a('function');` - Wow that's nice! Have a look at the chai docs for more!

Our first is now looking like this and is ready to go!
```js
describe('addThese', () => {
    let add = app.__get__('add');
    it('should exist', () => {
        expect(add).to.be.a('function');
    })
})
```


## Running your tests
You can run mocha with `mocha <your-test-file>` \
Optional commands include `--reporter=nyan` for some nice output formatting and `--bail` to force and exit after the first failure.

Why not make an npm script to run this for you? In your `package.json` file, add (or update) a `"test"` script to look something like this:
```js
 "scripts": {
    "test": "mocha --reporter=nyan --bail"
  },
```
Mocha will automatically look for a folder called `test` and run through all the files at the top level. If you want it to run recursively through sub-folders as well, add `--recursive` to your test command.


## Checking your test coverage
To get a check on what percentage of your code has test coverage, [istanbul](https://istanbul.js.org/) is one of several options. \
Istanbul's CLI app, [`nyc`](https://github.com/istanbuljs/nyc) is easy to get up and running:
- Install as a dev dependency: `npm install nyc --save-dev`
- Add it to your test script: `"test": "nyc reporter=text-summary mocha --reporter=nyan --bail"`
- If you prefer, add a separate script eg.
```js
 "scripts": {
    "test": "mocha --reporter=nyan --bail"
    "test-with-coverage": "nyc --reporter=text-summary mocha --reporter=nyan --bail"
  },
```
