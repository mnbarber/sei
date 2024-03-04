<img src="https://i.imgur.com/fx2orT2.png">

# Token-based Auth with React & JWTs
---

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Explain the use case of token authentication |
| Encode/decode a JSON Web Token (JWT) |
| Persist a JWT on the client |
| Send a JWT with each request |
| Verify a JWT on the server |
| Protect "private" client-side routes |
| Protect "private" server routes with middleware |

## Roadmap

#### Token-based Authentication:

- Advantages of JWT-based authentication
- What's a JSON Web Token (JWT)?
- Flow of token-based authentication

#### Review the Starter App:

- Review the code

#### Essential Questions & Lab

## Token-based Authentication

### Advantages of JWT-based Authentication

Here's a graphic contrasting session-based and token-based authentication:

<img src="https://i.imgur.com/HlzMMRq.jpg" width="900">

Sessions are stateful on the server - they have to be maintained in a server's memory or a database.  The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.

The key to token-based authentication is that it's **stateless**, meaning there is no _state_ being stored on the server regarding the session/login.

A JSON web token is self-contained, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.

The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.

When making an HTTP request, a token can be sent in an HTTP header (or even the HTTP body). They don't have to be sent in a cookie, which are implemented by web browsers. Thus, you can use token-based authentication without a web browser - great news for _native mobile apps_.

### What's a JSON Web Token (JWT)?

A _JSON Web Token_ is a single encoded (not encrypted) string that plays the role of a "token".

The key points about a JWT are:

- The token can contain whatever custom data (called _claims_) we want to put in it.
- The token is cryptographically _signed_ by the server when it is created so that if the token is changed in any way, it is considered invalid.
- The token is _encoded_, but **not encrypted**.  It is encoded using a standard known as _base64url encoding_ so that it can be easily serialized across the internet or even be included in a URL's _querystring_. It's easy to look at **encoded** data and think that its content cannot be read - this is not the case, as you'll soon see.

Here is how a JWT is structured:

<img src="https://i.imgur.com/8J6Rhx9.jpg">

There is a great website dedicated to JWTs that explains in detail their format as well as has the ability to create them:  [https://jwt.io/](https://jwt.io/)

Allow me to take a JWT from the website and demonstrate the fact that the token can be easily decoded in the browser's console:

```js
> var jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
> var payload = jwt.split('.')[1]  // only interested in the payload (claims)
> window.atob(payload)
< "{"sub":"1234567890","name":"John Doe","admin":true}"
```
> The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

Okay, JWTs are cool, how does the client get one; and how do we use them?

### Flow of Token-based Authentication

<img src="https://i.imgur.com/3quZxs4.png">

The diagram above shows that the client app:

1. Attempts to log in a user by sending an HTTP POST request, sending along the user's credentials.
2. The server will, if the creds check out, generate a JWT and send it back to the client. It may be sent back as JSON, or in a header (usually named **Token**).
3. Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in `localStorage`.
4. The reason a client needs to persist a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a best practice, in a header named `Authorization`.
5. The server will then validate the token and respond to the request.

**SERVER CODE**

- The `dotenv` module has been installed and required in **server.js**.

- We are connecting to a MongoDB using a **config/database.js** module as usual.

- There is a simple `User` model defined in **models/user.js**.

- API Routes for `User` are defined in **routes/api/users.js**

### The User Model

Open up **models/user.js**.

We're already using Mongoose's `set` method on the schema to ensure that a user's password is not included when serialized to JSON (sent to the browser).

Now we will take advantage of Mongoose middleware to salt and hash the password whenever a user instance is being saved **and** the password has changed (including when a user is being created for the first time).

To perform the actual salting and hashing, we will use the ever so popular **bcrypt** library - let's install and save it as a dependency:

`$ npm install bcrypt`

First, bring in **bcrypt**:

```js
// models/user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
```

**bcrypt** has a setting that tells it how many times to randomize the generation of salt. Let's add a constant in the module to set it - usually 6 is enough:

```js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;
```

Now for the middleware. We will be writing a function that runs before a user is saved. This is called **pre** middleware, also known as a "hook".

Type in this skeleton just above the `module.exports`:

```js
userSchema.pre('save', function(next) {
  // this will be set to the current document
  const user = this;

});
```

Note that we are assigning `this` (the user document being saved) to a variable. The reason is that we will need to access this user doc from within the `bcrypt.hash()` method's callback (see code below). **What is another option we have at our disposal to solve this problem?**

Now let's add the code that checks if the password for this user document has been changed, and if so, salt & hash it, then assign the hash to password, replacing the cleartext version:

```js
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});
```


### Setting up the JWT

`$ npm install jsonwebtoken` (Note its included in package.json already for you)

With **jsonwebtoken** installed, **controllers/users.js** is where we're going to use it:

```js
// controllers/users.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');
```

Creating a JWT requires a "secret" string used for "signing" the JWT. Let's define one in our **.env** file:

```
DATABASE_URL=mongodb+srv://<user>:<pw>@cluster0-oxnsb.azure.mongodb.net/mastermind?retryWrites=true&w=majority
SECRET=SEIRocks!
```

Let's create a shortcut variable in our controller to hold the SECRET:

```js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// Add the SECRET
const SECRET = process.env.SECRET;
```

The **jsonwebtoken** library has a `sign` method that creates JWTs. Let's add a `createJWT` helper function at the bottom of **controllers/users.js** that we can use both when a user signs up and when they log in:

```js
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
```

> Note: There are several ways to specify the expiration of the JWT. Check [the docs](https://www.npmjs.com/package/jsonwebtoken) for more info.

The `signup` method is configured to return a JWT:

```js
async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    // Be sure to first delete data that should not be in the token
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}
```

> Since the user document is going to be put in the token's data payload, be sure to delete data properties to prevent bloating the token unnecessarily.  Some data is fine, however, it's best to avoid relating data on the user side by referencing the user on the related Model instead.

The `signup` method is transporting the token string to the client within an object (assigned to a key named `token`). Keep this in mind because thats what **userService.js** on the client is using to If  extract only the token string.

If you Open up the Network tab in Chrome's DevTools, clear the requests, and then sign up for a user to verify that a token is being returned.

### Step 3: Persist the token (JWT) in the client

As discussed, token-based authentication requires the client to send the token when making a request to a server's API. To pull this off, we're going to have to persist it somewhere in the browser...

`localStorage` is typically where web apps persist data in the browser.

> Note: Data saved in `localStorage` is persisted by domain until removed. If you want to save data for only the duration of the browser session, use `sessionStorage` instead.

Keeping the token string stored in `localStorage` allows users to remain logged in until the token expires. We will be logged in, even if we close the browser and come back tomorrow! However, you get to determine how long the token is good for when you generate it on the server.

#### Refactor the `signup` method in **userService.js**

Again, we only want to store the token **string** in `localStorage`, however, the token string is received by the client within an object.

Here's what the  `signup` method on the client (your react app) will look like:

```js
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}
```

This funky syntax, `.then(({token}) => ...`, is object parameter destructuring!


#### the `tokenService` utility module

Just like with the `userService` module, we're going to follow the single-responsibility principle by putting token related methods in a module for:

- Storing, retrieving and removing tokens from `localStorage`
- Verifying that a token has not expired and removing it from storage if it has.
- Extracting the data payload (the user's info).

Theres a file for our token service:

`$ touch src/utils/tokenService.js`

Just a `setToken` method for now:

```js
function setToken(token) {
  localStorage.setItem('token', token);
}

export default {
  setToken
};
```

We'll add other methods in a bit, but for now, this is all we need to persist the token...

#### Persisting the token to `localStorage`


 **tokenService.js**:

```js

// sets the token to localstorage
// localStorage is predefined, like the document object
function setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Check if expired, remove if it is
      // atob is a function that decodes a base-64 string
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }
  
  function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };
  ```

  > Note: We needed to divide Date.now() by 1000. This is because the JWT spec says the `exp` claim should be in Unix time - Unix Time is the number of seconds since the Unix epoch (Jan 1, 1970). However, JS returns the number of milliseconds (not seconds) since the Unix epoch. We therefore must divide by 1000 to convert milliseconds to seconds.

  **The Rest of User Service**

```js
function getUser() {
    // this function will return the user object from the jwt token
  return tokenService.getUserFromToken();
}

function logout() {
    // this removes the token from localStorage
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
  signup, 
  getUser,
  logout,
  login
};
```

**logging in on the server**

When adding functionality on the server, a great place to start is defining the route.

In **routes/api/users.js**:

```js
/*---------- Public Routes ----------*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
```

Now we need that `usersCtrl.login` method - in **controllers/users.js**:

```js
async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

// don't forget this:
module.exports = {
  signup,
  login
};
```

The above code is using a `comparePassword` instance method on the `User` model that doesn't exist yet. We need it!

When we want to add custom functionality to a particular instance of a Mongoose model, we can define instance methods like this:

In **models/user.js**:

```js
userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};
```

As you can see, `bcrypt` includes a 	`compare` method for verifying that a cleartext password matches a given hash.

Also note that we coded the `comparePassword`'s function to accept a callback function that has the same signature that bcrypt's `compare` method expects, which results in that single line of sweet code.

> Interestingly, bcrypt's `compare` method is written as an asynchronous method, thus the necessity to provide a callback. The developers of bcrypt made this decision due to the fact that hashing is a CPU intensive task. There is a synchronous version available, `compareSync`, but it's use is not recommended.


Thats everything!

Remember as beginning developers you won't handle creating auth, but you will use it! So that is the way we are going to start of learning about it, and we'll start using it this afternoon! If you need to make your own project, remember you can start with a boilerplate, or follow the steps to this readme, and you'll be able to implement it yourself, but we're focusing learning on React.  Remember there are a 1000 things to learn!
