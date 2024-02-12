[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Testing Node with Mocha/Chai

## Learning Objectives
- Describe the importance of testing your code programmatically
- Use describe and assertion functions to do basic testing

## Framing

We've now created a number of applications.  Many of these apps cover a single topic, so most of the time, they are quite small.  But when you create a larger application, the codebase will become bigger and more complex every time you add some features. At some point, adding code in File A will break features in File B, and to avoid these "side-effects", or at least recognize to immediately when they happen, we need to write tests our app and run them on each change. 

As programmers, we use code to solve problems. Most libraries and frameworks have testing libraries available that let us write code to evaluate the robustness, completeness and flexibility of our applications. In a production-level application, providing a high level of [test coverage](https://www.guru99.com/test-coverage-in-software-testing.html) for an application is almost always required in order to guarantee that code is bug-free and functions as intended.

There are many types of tests that we can create for our applications: 

- Unit tests: the smallest, most microscopic level of testing. Evaluates individual methods and functions within a codebase. The kind we'll be writing today!
- Integration tests: ensure that different services and modules work together. 
- End-to-end tests: verify that application responds as expected to user interactions, such as evaluating how user input edge cases are handled. 
- Performance tests: also known as load testing, and evaluate application's response to heavy traffic (number of requests, large amounts of data).
- Acceptance tests: ensure that the application meets its given business requirements. 

... and more! As we graduate from focusing on _how_ to build applications, we focus on learning how to build _better_ applications. The next level of sophistication we can introduce is testing coverage to ensure that our applications are robust and can maintain their integrity in the face of changes. Automated testing is also an important part of the Continuous Integration/Continuous Delivery model in DevOps. For many junior developers and engineers, their first few weeks or months at an organization might include writing tests to gain familiarity with a codebase. 

### Essential Questions

**❓ What testing library have we used so far, and what type of tests did we write?**

## TDD: Test-Driven Development

A development methodology of writing the tests first, then writing the code to make those tests pass. Thus the process is:

1. Define a test set for the unit
2. Implement the unit
3. Verify that the implementation of the unit makes the tests succeed
4. Refactor
5. Repeat

### Essential Questions

**❓ How is this approach different than the one we've taken so far when building our APIs?**

## Intro to JavaScript Testing with Mocha & Chai

To test our code in Node, we will use two primary libraries: one to run the tests and a second one to run the assertions.

Mocha will be our testing framework, but we're mostly just using it as a test runner. From the [Mocha Website](https://mochajs.org/)...

> "Mocha is a feature-rich JavaScript test framework running on Node.js and the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping (associating) uncaught exceptions to the correct test cases."

For assertions, we will use Chai. From the [Chai website](http://chaijs.com/)...

> "Chai is a BDD / TDD assertion library for Node and the browser that can be delightfully paired with any JavaScript testing framework."

> Q: What the heck is an assertion? It's a way of writing a unit test that tests whether or not a test case is passing or failing by comparing the expected result with the actual result of a test.

To be able to make HTTP requests inside tests, we will use [Supertest](https://github.com/visionmedia/supertest)...

> "The motivation with this module is to provide a high-level abstraction for testing HTTP"

## We Do: Create Tests

### Setting up the app

Clone down the starter code from [this
repository](../../../express-tdd-exercise).
Take a moment to familiarize yourself with the Express app and get everything
set up. 

1. Run ```npm install``` from the root directory.
1. To test this app, we need to install a couple of dependencies. Let's install `mocha`, `chai` and `supertest`:

```bash
$ npm install mocha chai supertest --save-dev
```

> Note that we are installing these as `dev` dependencies because they will be used to test our application but are not going to be used in production. 

Run ```nodemon app.js``` to start your express server. The app will be served at ```localhost:3000```. Check it out in the browser!


### Files and Folders

Now that we're configured, let's set up our file and folder structure. All the
tests will be written inside a folder `test` inside of `/app`.

```bash
mkdir test
```

Then we will write the tests inside a file called `candies.test.js`...

```bash
 $ touch test/candies.test.js
```

### Writing Our First Test

Open the file `candies.test.js`. We now need to require some dependencies at the top of this file:

```js
const should = require('chai').should()
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest(require('../app.js')
```

For more information on the difference between `should` and `expect`, let's turn to the very readable [Chai documentation](https://www.chaijs.com/guide/styles/). 

All the tests need to be inside a `describe` function. We will use one `describe` block per route:

```js
describe("GET /candies", () => {
  //tests will be written inside this function
})
```

First, we will write a test to make sure that a request to the index path `/candies` returns a http status 200...

```javascript
describe("GET /candies", () => {
  it("should return a 200 response", done => {
    api
      .get("/candies")
      .set("Accept", "application/json")
      .expect(200, done)
  })
})
```

Let's break down what's happening here.

* `describe()` is a function that takes 2 arguments
  * a string describing a group of operations that are about to happen (like
      the title of this group of tests)
  * a callback function that contains all of the individual tests
* `it()` is a function that takes 2 arguments
  * a string describing some behavior e.g. "should return an array of objects"
  * a callback function that runs the actual test code. The callback takes an argument that you must call when the test is finished: e.g. `done`
* Inside of `it()`, we are using an instance of `supertest` which we've assigned to the variable `api`.
  * The first method called on `api` is `.get()` which actually performs a get request to the specified URL
  * `.set()` sets an http header on the request. In this case we're specifying what type of data we want to receive
  * `.expect()` tests the response. In this case we're checking to see if the status code is `200`. The second argument is the `done` function we've declared at the top of `it()`. Passing it in here tells the code we're finished with this block.

Now go in the command line and type `mocha`. When you do, you may get an error
saying that the `mocha` command cannot be found.

This is because `mocha` is not installed globally on our machines (though it's
possible you may have it already installed). While we could simply install mocha
globally and run the test, we would not be using the specified version of
`mocha` listed a dev dependency in our `package.json` and contained in
`node_modules`.

In order to run mocha from our local `node_modules` folder, do the following:

1. Run mocha directly from our `node_modules` folder to ensure you've installed it properly:
    ```bash
    node_modules/.bin/mocha
    ```
    
2. Alias the `mocha` command to an npm script in our `package.json`:
    ```javascript
    {
      ...
      "scripts": {
        "test": "node_modules/.bin/mocha"
      },
      ...
    }
    ```
    > One thing to keep in mind when using NPM to run tests (really running anything with NPM scripts for that matter) is that NPM will prefer local node modules over globally installed modules. If something has not been installed properly locally this could lead to [differing behavior](https://stackoverflow.com/a/28666483) between running `mocha` and `npm test`.
3. Run `npm test`. Now we can run it locally from our projects without having to install it globally on our machines, and manage another globally installed package.

>     You can also simply run `npx mocha`, which will look inside the specified dependency and execute the binary it finds. `npx` executes whatever command you put after it, first looking in your `node_modules` directory. If it doesn't exist in `node_modules` then it is installed locally.

> So you can also run `npx mocha` and it will execute `node_modules/.bin/mocha` for you.

You will know the test successfully ran when if get an output looking like this...

![CLI Screenshot](./images/Screen_Shot_2015_08_12_at_12_17_01.png)

This test is passing!

> If you get an error like `ECONNREFUSED` make sure your express server is running.

> If you get an error that says your server responded with a 404 instead of a 200 or if your test code hangs, try changing your PORT number to another one, like 3005!

### Test Blocks

Every block of code that starts with `it()` represents a test. Each test is performed in sequence, one after the other, in a queue.

The `callback` represents a function that Mocha will pass to the code so that the next test will be executed only when the current is finished and the `done` function is called - this allows tests to be executed once at a time. It's almost like the resolve function of a `Promise`.

Now, let's verify the content of the response by looking at the data sent back by hitting the `/candies` endpoint...

```javascript
[
  {
    id: 1,
    name: 'Toffee Bar',
    color: 'Brown, Caramel'
  }, {
    id: 2,
    name: 'Pez',
    color: 'Green'
  }, {
    id: 3,
    name: 'Pop Rocks',
    color: 'Pink'
  }, {
    id: 4,
    name: 'Sour Patch Kids',
    color: 'Blue'
  }
]
```

We can write a test that verifies the response is an array...

```javascript
it("should return an array", done => {
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end((error, response) => {
      expect(response.body).to.be.an('array');
      done()
    })
  })
```

NB: In the first test, we were using the `.expect` method of `supertest`. Here we are using the expect function provided by `chai`.

We can write another test that verifies the presence of a field in the response...

```javascript
it("should return an array of objects that have a field called 'name' ", done => {
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end((error, response) => {
        response.body.forEach(candy => {
          expect(candy).to.have.property('name');
        });
      done()
   })
})
```

We can also send data to the server and test the behavior - in our case, we want to make sure that when we post some JSON to `/candies`, a new object is added to the array candies.

Because we are going to test another route, lets add another describe block...

```javascript
describe("POST /candies", () => {

})
```

For this test, we need to:

1. Create a new object by sending a `POST` request
2. Verify that a new object has been "saved" by requesting the index route

For this, we will use `before` blocks. A `before` block will be executed ONCE BEFORE all the tests in the `describe` block.

Add this inside the new `describe` block...

```javascript
describe("POST /candies", () => {
  const newCandy = {
    id: 5,
    name: 'Lollipop',
    color: 'Red'
  };
  before(done => {
    api
      .post('/candies')
      .set('Accept', 'application/json')
      .send(newCandy)
      .end(done);
  });
})
```

This code will be called at the beginning of the test block. There's also another method called `beforeEach()` which runs before every test.

For more information on the difference between `before` and `beforeEach`: https://stackoverflow.com/questions/21418580/what-is-the-difference-between-before-and-beforeeach

Now, we can verify that calling "POST" will add an object to candies...

```javascript
  it('should add a candy object to the collection candies and return it', done => {
    api
      .get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.find(candy => candy.id === newCandy.id)).to.be.an(
          'object'
        );
        done();
      });
  });
```

Run `npm test` in your CLI, you should now have four passing tests!

**❓❓ What other ways can we test whether this route works? How many times can you run these tests and have them pass?**

## Break (10 min / 1:15)

## Practice

Write your own tests now!

1. Write a test that makes sure the object is returned with right fields (i.e., ```id```, ```name```, ```color```) when you call ```GET /candies/:id```.
2. Write a test that ensures an object is deleted from the array candies when you call ```DELETE /candies/:id```.
3. Write a test that ensures a property is updated when you call ```PUT /candies/:id```.

<!--
   - ## Review practice (30 min / 2:05)
   - 
   - <details>
   -   <summary>
   -   Code for 1
   -   </summary>
   - 
   -   ```js
   - describe('GET /candies/:id', function() {
   -   it('should return an object with id, name, color', done => {
   -     api.get('/candies/2')
   -     .end((err, response) => {
   -       expect(response.body).to.have.property('name')
   -       expect(response.body).to.have.property('color')
   -       expect(response.body).to.have.property('id')
   -       done()
   -     })
   -   })
   - })
   -   ```
   - </details>
   - 
   - <details>
   -   <summary>
   -   Code for 2
   -   </summary>
   - </details>
   - 
   - <details>
   -   <summary>
   -   Code for 3
   -   </summary>
   - </details>
   -->

## Conclusion

<!--
   - > Review the answers to the tests specs above
   -->

We've covered the principles of testing in JavaScript, but Chai offers a lot of different expectations syntaxes. Check the [Chai Documentation](http://chaijs.com/api/)

- How does Mocha work with Chai to write tests in your JavaScript application?
- Describe how to configure your app to use Mocha and Chai.


## BONUS: Testing Glossary

See: [Types of Software Testing](http://www.softwaretestinghelp.com/types-of-software-testing/)

* How tests are executed:
  - **Manual** - user runs test via the UI
  - **Automated** - test scripts are executed that call into the code and compare results to expected values
* Granularity:
  - **Unit** - focuses on testing individual "units" of code, usually individual components, functions or methods
  - **Integration** - set of components that are collaborating (interacting) to perform a task
  - **End-to-end (E2E)** - complete application running in an environment that mimics a real-world production environment
* Purpose:
  - **Functional**
     * **Positive testing** - does it work when it is supposed to work.
     * **Negative testing** - does it fail when it is supposed to fail.
  - **Regression** - Did we break anything?
  - **Smoke** - Did the build work?
  - **Performance / Load** - How does the software behave under a heavy load?
     * Lots of users / traffic
     * Large data sets
  - **Usability** - How intuitive (easy to use) is the software?
  - **Security** - How secure is the application?
  - **Compatibility** - How well does the software work with various hardware, O.S., network environments?
  - **Recovery** - How well does the system respond to hardware or software failures? Is it fault-tolerant?
  - **User Acceptance Testing (UAT)** - Does the software do what the customers want it to do?
     * Actual software users test the software to make sure it can handle required tasks in real-world scenarios, according to specifications.


## BONUS: Behavior-Driven Development (BDD)

A development methodology that was derived from `TDD` and [`DDD`](https://en.wikipedia.org/wiki/Domain-driven_design) (Domain-driven design) where tests are written in an English-like language (i.e. the `Gherkin` language) that specifies the external *behavior* (the specifications) of the unit without reference to how the unit was implemented (thus it is a form of *black box* testing). The purpose of BDD is to both describe and test the behavior of a unit of code in a single *specification* file.

> See [What’s the difference between Unit Testing, TDD and BDD?](https://codeutopia.net/blog/2015/03/01/unit-testing-tdd-and-bdd/)
