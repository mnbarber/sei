<img src="https://i.imgur.com/vUOu9NW.jpg">

# Intro to the<br>Express Framework<br>for Node

## Learning Objectives

| Students Will Be Able To: |
|---|
| List the Fundamental Capabilities of Web Frameworks |
| Create a Basic Express Web App |
| Define Basic Routes |
| Respond to HTTP Requests |
| Render Dynamic Views Using EJS |

## Road Map

1. Setup
2. The Three Fundamental Capabilities of Web Frameworks 
3. Intro to the Express Framework
4. Express "Hello World"
5. Basic Structure of the Express Server
6. Auto-Restart the Server Using Nodemon
7. The Route's Callback Function
8. Request & Response Objects
9. Ways to Respond to a Request
10. Rendering Views
11. Dynamic Templating using EJS
12. Redirecting
13. Essential Questions

## 1. Setup

1. Move into your code folder:

    ```
    cd ~/code
    ```

2. Create a folder and cd into it:

    ```
    mkdir intro-express
    cd intro-express
    ```
	
3. Create a `package.json` using this command:

    ```
    npm init
    ```
    Accept the defaults, **except** for the **entry point** - set this to be "**server.js**".

4. Open the project's folder in your code editor:

    ```
    code .
    ```

## 2. The Three Fundamental Capabilities of Web Application Frameworks

Welcome to Full-Stack development!

Unlike last unit where all of the code we wrote ran on the "front-end" (the browser), the code we're about to write in this lesson runs on the "back-end" as depicted by the green box in the following diagram:

<img src="https://i.imgur.com/ltB5IYA.png">

[Web Application Frameworks](https://en.wikipedia.org/wiki/Web_framework) such as Express help developers code web applications that run on the back-end.

Regardless of which specific Web Framework we choose to use, they all provide three capabilities fundamental to developing a web application that runs on a server in the cloud:

1. The ability to define routes
2. The ability to process HTTP requests using middleware
3. The ability to use a view engine to render dynamic templates

Over the next few lessons, you will learn about how the Express framework implements these three fundamental capabilities.

## 3. Intro to the Express Framework

[Express](https://expressjs.com/) is the most popular web framework for Node.js.

It is minimalistic and lightweight, especially when compared to massive frameworks like Django and Rails.

Express uses Node's built-in HTTP module to listen for, and respond to, HTTP requests - Express simply adds those three web application capabilities on top of Node.

### Install the Express Module

Let's use `npm` to install the Express module in this project:

```
npm i express
```
> Note that `i` is a shortcut for `install`

Create a `server.js` module to put our web app's main code in:

```
touch server.js
```

## 4. Express - Hello World!

Let's write the obligatory "Hello World!" application:

```js
// Load express
const express = require('express');

// Create our express app
const app = express();

// Define a "root" route directly on app
// Tomorrow, we'll use best practice routing
app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

// Tell the app to listen on port 3000
// for HTTP requests from clients
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
```

Run the app:

```
node server
```
	
Browsing to `localhost:3000` will hit our app's root route that we defined and return "Hello World!".

Using DevTools, we will find that despite just sending back the text of<br>`<h1>Hello World!</h1>`,<br>the browser "built" a minimal HTML document to display it in.

Using `send()` is a general purpose way to respond to the request, however, it's kind of like using `console.log()` - soon we'll be using more specific methods.

## 5. Basic Structure of the Express Server

In `server.js`, let's document using comments what a typical Express server needs to do:

```js
// Require modules
const express = require('express');
  
// Create the Express app
const app = express();
  
// Configure the app (app.set)
  
  
// Mount middleware (app.use)
  
  
// Mount routes
app.get('/', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});
  
// Tell the app to listen on port 3000
app.listen(3000, function() {
  console.log('Listening on port 3000');
});
```

### Update the Route

Let's make a minor update to our root route:

```js
// Mount routes
app.get('/', function(req, res) {
  res.send('<h1>Hello Express</h1>');
});
```

Refreshing the page will reveal that it didn't work!  This is because we have to restart the server, or...

## 6. Auto-Restart the Server Using Nodemon

`nodemon` is a popular development tool used to automatically restart the Express app when we save changes.

You may have installed it during installfest, however, you can make sure you have the latest version by running:

```
npm i -g nodemon
```

> Command line tools are installed using the `-g` (global) option

If you received an error during the install, there's a workaround by using:

```
npx nodemon <module name>
```

instead of 

```
nodemon <module name>
```

Now, thanks to the `main` entry in `package.json`, we can start the server by simply typing `nodemon` (or `npx nodemon`).

### Back to routing...

Like most web frameworks, Express uses the `HTTP Method` and the `Path/Endpoint` of the HTTP request to match a route defined in the application.
	
In our first route, we defined a route using the `get` method on the Express `app` object. 

The `get` method defines a route that listens for a `GET` request. There are other methods such as `post`, `put` and `delete`, that map to the other HTTP verbs.

The first argument provided to `app.get`, `/`, defines the path for the route. In this case the root of the application, i.e., just the host name like `localhost:3000`.

In Express, all strings used to define a path should start with a forward-slash character (`/`).

In the next Express lesson, we'll learn a preferred way of defining routes using the Express `Router` object, but you need to be aware of defining routes this way as well.

## 7. The Route's Callback

The second argument provided to `app.get()` is a callback function that is executed by Express when the server receives an HTTP Request that matches the route:

```js
app.get('/', function(req, res, next) {
  res.send('<h1>Hello Express</h1>');
});
```

<details>
<summary>
❓ What part(s) of the HTTP Request does Express use when determining what route the request matches?
</summary>
<hr>

The **HTTP Method** and the **Path**/**Endpoint**

<hr>
</details>

When Express calls the callback function it will provide two objects as arguments...

## 8. Request & Response Objects

The callback function defines two parameters conventionally named `req` & `res`:

1. **`req`**: Represents Express's [request object](https://expressjs.com/en/4x/api.html#req) has properties and methods used to access information regarding the current HTTP request, including any data being sent from the browser.

2. **`res`**: Represents Express's [response object](https://expressjs.com/en/4x/api.html#res) has properties and methods used to end the request/response cycle - like we've done so far using the `res.send` method.

3. **`next`**: This third parameter is used to continue a request to the next matching route, this is typically used when incorporating middleware functionality like authentication and attaching properties to a request as they enter your web server. `next` will not be talked about much in the introduction to node modules, for right now, just be aware there is a third parameter and it is used to continue a request to a different route. For more information on the `next` parameter consider reviewing [this documentation from express on middleware](https://expressjs.com/en/guide/using-middleware.html). 

### You Do 👉 Define Another Route <small>(3 mins)</small>

1. Define another route that matches a request of `GET /home`<br>and sends a text response of <br>`<h1>Home Page</h1>`.

2. Test it by browsing to<br>`localhost:3000/home`.

### ❓ Review Question - Routing

Assuming the following two routes:

```js
app.get('/cars', function(req, res) {
  res.send("Here's a list of my cars...");
});

app.post('/cars', function(req, res) {
  res.send('Thanks for the new car!');
});
```
<details>
<summary>
Both routes are defined with the same path of <code>/cars</code> - is this okay?<br>Hint: Look closely
</summary>
<hr>

**Yes**, because they defined to match different HTTP Methods which makes those two routes unique.

<hr>
</details>

## 9. Ways to Respond to a Request

So far we have responded in our route handler (the callback function) by using the `res.send()` method.

The [Express docs for the Response object](https://expressjs.com/en/4x/api.html#res) lists the other ways to respond to an HTTP request.

Here are the common methods we'll be using during the course:

- `res.render()`: Render a view template and send the resulting HTML to the browser.
- `res.redirect()`:	Tell the browser to issue another `GET` request.
- `res.json()`: Send a JSON response (used when we communicate via AJAX).

## 10. Rendering Views

One of the three fundamental capabilities of a web framework discussed earlier is to be able to use a view engine to render dynamic templates.

A template can include a mixture of static (unchanging) HTML and "code" that generates HTML dynamically.

For example, code in a template could generate a series of `<li>` elements for data provided to it in an array.

### View Engines

In Express, we use `res.render()` to process a template using a _view engine_ and return the resulting HTML to the browser.

Express can work with a multitude of view engines, including:

- [`Pug`](https://pugjs.org/api/getting-started.html) (formerly `Jade`) - A template language that leverages indentation to create HTML with a "shorthand" syntax.
- [`EJS`](https://www.npmjs.com/package/ejs) (Embedded JavaScript) - A super cool templating language that, like the name says, embed JavaScript within the HTML!

### Create the `views/home.ejs` View

Let's use EJS to render a "home" view for the existing `GET /home` route.

A common Express application architecture is to use a design pattern called MVC(Model, view, Controller) This is a pattern based off of MV*, you can read more on MVC and similar MV* design patterns at [Mozilla Developer Network MVC documentation](https://developer.mozilla.org/en-US/docs/Glossary/MVC). let's put all the templates inside of a folder named `views`:

```
mkdir views
touch views/home.ejs
```

> `ejs` is the file extension for the EJS view engine.

Open `home.ejs` then type `!` and press tab to generate the HTML boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" 
      content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>First Express</title>
</head>
<body>
    
</body>
</html>
```

For now, we will need to include the HTML boilerplate inside of every view.

However, EJS includes the ability to make our views more DRY by using _partial views_.  We will cover partial views later, however, if you can't wait, check out how to use the `include()` function [here](https://www.npmjs.com/package/ejs#includes). 

Update the `<title>` as shown above and add an `<h1>` inside `<body>` so that we see something displayed:

  ```html
  <body>
    <h1>Home Page</h1>
  </body>
  ```

### Refactor the "Home" Route

Okay, now let's refactor the `GET /home` route's callback to render our new `home.ejs` template:

```js
app.get('/home', function(req, res) {
  res.render('home');
});
```
It's convention to specify just the template's name, dropping the `ejs` extension.

Browse to `localhost:3000/home` and - it doesn't work...

Now's a great time to get a little practice reading Express errors!

### Configure Express to Use EJS

The Express error<br>**_Error: No default engine was specified..._**<br>makes it clear that we need to specify a view engine.

This is our first opportunity to configure the server using Express's `app.set()` method:

```js
// Configure the app (app.set)
app.set('view engine', 'ejs');
```

We also need to inform Express **where** all of our views can be found:

```js
// Configure the app (app.set)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

Don't be intimidated by the code:<br>`path.join(__dirname, 'views')`...

`path.join()` is simply a Node method that builds a properly formatted path from segment strings passed to it.

`__dirname` is available in Node modules and represents the path of the current folder where the currently running code lives; and `views` is the name of the folder we created to hold our views.

#### `require()` the `path` Module

`path` is a core Node module, but it still must be required before we can use it.

Core Node modules don't have to be installed with `npm install`, but we do have to `require` them:

```js
// Require modules
const express = require('express');
const path = require('path');
```

Refresh and let's see what the next error is...

### Install EJS

**_Error: Cannot find module 'ejs'_**<br>
tells us that we need to install the EJS view engine:

```
npm i ejs
```

We don't need to `require` the view engine - Express knows how to find it.

Refresh the page - success 😀

## 11. Dynamic Templating Using EJS

Thus far, we've only rendered a static template, but now it's time to use EJS to dynamically generate HTML!

In addition to passing the template name as an argument to `res.render()` method, we can also pass in a JavaScript **object** as a second argument and all of its properties will be accessible in the view within `ejs` tags!

Let's get to work rendering the list of To Dos...

### Create the `data/todo-db.js` Module

Normally, the To Dos would be coming from a database, however, we'll "fake" a DB by putting the To Dos in a module and export a method to return them.

Let's create the module:

```
mkdir data
touch data/todo-db.js
```

Start with a copy/paste of the following array of To Do objects:

```js
// data/todo-db.js

const todos = [
  {todo: 'Feed Dogs', done: true},
  {todo: 'Learn Express', done: false},
  {todo: 'Buy Milk', done: false}
];
```

Now let's export a `getAll()` method that can be used by any other module to obtain the To Dos:

```js
module.exports = {
  getAll: function() {
    return todos;
  }
};
```

### Require the `data/todo-db.js` Module

To access our To Do "database", we need to `require()` it inside of **server.js**:

```js
const path = require('path');

// require the To Do "database"
const todoDb = require('./data/todo-db');
```

### Add a Route to List the To Dos

If we want to be able to implement the "To Do List" functionality, we're going to need another another route:

```js
app.get('/todos', function(req, res) {
  res.render('todos/index', {
    todos: todoDb.getAll()
  });
});
```

As discussed, to pass data to a view, we pass an object as a second argument to `res.render()`.

We will now be able to access a `todos` variable in the `todos/index` view!

### Create the EJS Template

It's a best practice to group views related to a data resource such as "todos" in their own folder.

We also commonly use `index` as a name for views that render **all** of something - in this case, displaying all To Dos.

Therefore, we need an `index.ejs` view inside of a `views/todos` folder:

```
mkdir views/todos
touch views/todos/index.ejs
```

Now let's code the `todos/index.ejs` view. Start by copying over the HTML from `home.ejs` and refactor it to this:

```html
<body>
  <h1>All To Dos</h1>
  <ul>
    <% todos.forEach(function(t) { %>
      <li>
        <%= t.todo %>
          - 
        <%= t.done ? 'done' : 'not done' %>
      </li>
    <% }); %>
  </ul>
</body>
```

That my friends is embedded JavaScript between those `<% %>` and `<%= %>` tags and I believe you are going to love their simplicity!

The `<% %>` EJS tags are for executing JavaScript such as control flow.

The `<%= %>` EJS tags are for writing JS expressions into the HTML page.

Refresh and browse to `localhost:3000/todos` - yay!

## 12. Redirecting

One last bit of fun...

Currently, if we browse to the root route, we see "Hello Express", however, we can use the `res.redirect` method to redirect to `GET /home` to see the Home page instead.

Refactor the root route as follows:

```js
app.get('/', function(req, res) {
  res.redirect('/home');
});
```

When the server responds with a redirect it causes the browser send a new `GET` request to the provided path.

> Note: It's very important that the path provided to `res.redirect()` begin with a forward slash! 

### Determining when to `res.render()` or `res.redirect()`

Certain functionality requires the server to respond using `res.redirect()` instead of `res.render()`:

- When the browser sends a `GET` HTTP request, the server should respond with `res.render()`.
- Any request other than a `GET` method, i.e. `POST`, `PUT` or `DELETE`, results in data being changed on the server and typically should be responded to using `res.redirect()`.

## 13. ❓ Essential Questions <small>(1 min)</small>

<details>
<summary>
(1) Does the Express server "run" on the <strong>Back-End</strong> or the <strong>Front-End</strong>?
</summary>
<hr>

**Back-End** 

<hr>
</details>

<details>
<summary>
(2) When we define routes on the server, we are mapping/connecting HTTP requests to ________.
</summary>
<hr>

**Code** which performs its purpose such as creating, reading, updating or deleting data, then ultimately responds to the request using `res.render()` or `res.redirect()`.

<hr>
</details>
<details>
<summary>
(3) Which EJS tags do we use to emit content into the HTML page: <code><% %></code> or <code><%= %></code>?
</summary>
<hr>

`<%= %>` ("Squids", not "Flounders")

<hr>
</details>
