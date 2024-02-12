<img src="https://www.cyclic.sh/og/summary_large_image.png">

# Deploying a Node/Express App to Cyclic.SH

## Intro

Project 1 was a static application that required no code to run on a server.  However, SEI's Project 2 and beyond are full-stack web applications that need to run code on a backend server.

[Cyclic](https://www.cyclic.sh/vs-heroku)  is a good alternative to Heroku if you are looking for a modern cloud architecture, serverless hosting infrastructure, easy on-boarding experience


#### Important Messages from the docs!

1. **CI/CD**
A pipeline is built into every app and integrated with GitHub. Changes are live in a few seconds with every git push. Each deployment is registered, along with build/deploy logs pointing to the specific git change set. You will know exactly what changes went out and when
<br/>

2. We can link our githubs here to use the CI/CD pipeline

* Sign up: [here](https://app.cyclic.sh/api/login)
*	Using github as your login
* Choose "Link my own", and type in your repo name
*	Click deploy
*	Approve "Cyclic - Preview" app in github
*	Watch the terminal for your deployment logs

### Cloud Architecure

Cyclic apps are built and deployed into AWS. We pre-provision a serverless app using [cloudformation](https://www.contino.io/insights/aws-cloudformation).

At first launch we select an available stack and deploy the code for your app into the existing [lambda](https://aws.amazon.com/lambda/features/#:~:text=AWS%20Lambda%20is%20a%20serverless,cart%20on%20an%20ecommerce%20website.).

---
**AWS VOCABULARY**

[cloudformation](https://www.contino.io/insights/aws-cloudformation) - AWS CloudFormation is an AWS service that uses template files to automate the setup of AWS resources like ec2 instances, s3 buckets, lambda functions. This enables efficient and quick distrubution of services.  Cyclic uses this under the hood for us.  

[lambda](https://aws.amazon.com/lambda/features/#:~:text=AWS%20Lambda%20is%20a%20serverless,cart%20on%20an%20ecommerce%20website.) - AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources for you. These events may include HTTP Requests (what our express server does), S3 bucket changes, DynamoDB, and others!

*So this means, everytime we push to github Cyclic, we will update our lambda to use our latest code of our recent git push! Very cool!*

---
---
## 1. Deployment

**follow the directions to setup your code on the lambda**

* Sign up: [here](https://app.cyclic.sh/api/login)
*	Using github as your login
* Choose "Link my own", and type in your repo name
*	Click deploy
*	Approve "Cyclic - Preview" app in github
*	Watch the terminal for your deployment logs

---

2. Set up your environment variables!

- on cyclic naviage to the `Variables` tab. 

<img src="https://i.imgur.com/D7GTYOS.png?1">

- You need to encode all the environment variables your app needs to run 
<br/>
- Remember you're putting your code on a different machine (lambda), and you're setting the Variables that only exist while our server code on the lambda is running.

---


### PORT Number

*Cyclic supports but does not require setting a port via the environment variables.*

Hosting services determine what port a Node application will listen for HTTP requests on.

Hosting services set a Node environment variable, `process.env.PORT`, that our application needs to listen on during production (not development).

If your Express application was generated using express-generator, you're all set thanks to this line of code in the `www` file:

```js
var port = normalizePort(process.env.PORT || '3000');
```

However, if you created your Express app "from scratch", then you need to ensure that the app listens on `process.env.PORT` if it's deployed.

### Node Version

Specifying a Node version in the `package.json` is **not** necessary.

### Specifying a Start Script

Again, you're already set if you generated your app using express-generator.

Here's some useful information on start scripts [here](https://docs.cyclic.sh/overview/launch). Highly recommend reading through it.


### Database Connection

**Connections in a Serverless Runtime (lamda environment)**
MongoDB is not an on-demand database and its connection mechanism is persistent, it can also take a moment to establish the connection for the first time. For best performance, avoid making a connection inside a route handler.* - **per the docs**

So this means we need to establish our database connection as soon as our lambda wakes up when it recieves a new http request. essentially it means we need to establish our database connection and then start our server, on every request.  

We need to update our `config/database.js` file, it will be a bit different then the [docs](https://docs.cyclic.sh/how-to/using-mongo-db#connection-example-mongoose) since we're using express-generator.

*config/database.js*

```js
const mongoose = require("mongoose");

// export the function that creates a database connection
module.exports = {
  connectDB,
};

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (err) {
    console.log("err");
    console.log(err, ' connecting to mongodb')
    process.exit(1);
  }
}
```

Then we need to setup the database connection before our server starts, we can use that function in our 

- bin/www

```js
// top of the file import the connectDB function
const { connectDB } = require("../config/database");


// Rest of code... 

/**
 * Create HTTP server.
 */
 var server = http.createServer(app);



/**
 * Listen on provided port, on all network interfaces.
 */
// Call our connectDB function then start our server listening on the port!
connectDB().then(() => {
 
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  
});

```
- we just connect to mongodb by calling our function than we have our express server starting listening on the port.  
- This will guarentee our database is always connected when the lambda function wakes up when it recieves an http request.  
---
### Setting up a session store

In development, our session data, is stored in the servers memory.  Unfornately that means everytime our app starts or stops running (staring and shutting down the server) we are no longer capable of keeping track of who was logged in.  

This will happen alot with a lamdba in a serverless environment. 

```js
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
```
> *The session cookie used with passport lets us keep track of who the logged in user is when an http request is made to our server*

So to tackle this issue we will install `connect-mongo`.

```bash
npm install connect-mongo
```

This will allow us to use our mongodb database on atlas to track our session data, so we can maintain the logged in users regardless of whether our app starts or stops, because we can load the data from the database.

**setup**

- server.js

```js

//import near the top of the file
const MongoStore = require('connect-mongo');

// rest of code then update the middleware
// setting up our session to use the Mongostore

app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
```

---

### Updating deployed app

So we just changed some code in our app to deploy that we just need to push our `main` branch on github.  

**deploy**

```bash
git add -A
git commit -m "configured deployment code!"
git push origin main
```
---

### Monitoring deployment 

**Click on Deployments**


<img src="https://i.imgur.com/hJbJv75.png?1">

---

### Monitoring HTTP requests and the server's terminal

**Click on the Logs tab**

<img src="https://i.imgur.com/RPxUFED.png?1">

- Here on the left,  you can see the http requests coming into your express server running on your lambda.
<br/>

- On the write you can see all the `console.logs` that are occuring in your application that is running on your lambda on aws. 
---


### Update the App's Google OAuth Registration

As discussed in the OAuth lesson, the time would come after deployment that we would need to update the app's **Authorized redirect URIs**  in the [Google Developer Console](https://console.developers.google.com) for the project.

Ensure that the correct project is selected in the dropdown:

<img src="https://i.imgur.com/M1pB6JX.png">

Click the project's **Credentials** menu choice on the left, then click the name listed in the **OAuth 2.o Client IDs**:

<img src="https://i.imgur.com/dp91TAD.png"> 

Now click the **+ ADD URI** button that's below **Authorized redirect URIs**:

<img src="https://i.imgur.com/FGApdkD.png">

Finally, enter the exact URI that your app is has. 

- on cyclic click on the **overview tab** and then copy the **App URL** link

<img src="https://i.imgur.com/pDIQKQa.png?1">

Assign that to your GOOGLE_CALLBACK environment variable and click the **SAVE** button:

<img src="https://i.imgur.com/sNsr3r8.png?1">

### Browse to the App

Okay, now the big moment, browse to your deployed app.

Remember you can find your deployed link under your app on [cylic](cyclic.sh) in the ***Overview*** tab

<img src="https://i.imgur.com/pDIQKQa.png?1">


### Congrats on deploying to Cyclic!

## Troubleshooting

Deployment messages, error messages, as well as the output you typically see in your terminal when running your app during development (including output from your code's `console.log` statements) can be viewed by going to the ***Logs** tab on [cyclic](cyclic.sh)

<img src="https://i.imgur.com/RPxUFED.png?1"><br/>
Since the proper setting of environment variables is a common source of problems, always double check that you have all the variables set that your app needs in order to run.<br/>

- on cyclic naviage to the `Variables` tab. 
- check your variables are correct, spelling and all!

<img src="https://i.imgur.com/D7GTYOS.png?1">

##### Docs

- [docs cyclic](https://docs.cyclic.sh/overview/architecture)
- [AWS lamda](https://aws.amazon.com/lambda/features/#:~:text=AWS%20Lambda%20is%20a%20serverless,cart%20on%20an%20ecommerce%20website.)
- [AWS cloud formation](https://www.contino.io/insights/aws-cloudformation)




