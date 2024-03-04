<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Create a login page |
| Learn how to setup up a signup form |
| Configure multer and AWS to setup photo uploading |

## Semantic UI

We'll be using semantic UI's react components to style our components!

Lets take a look at the [semantic ui react](https://react.semantic-ui.com/usage)

## Setting it up

```
npm install semantic-ui-react semantic-ui-css
```

Then we just need to import it in our index.js to make the styling availible throughout our app

```js
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css' // import
import './index.css';
import App from './pages/App/App';
// rest of code
```


## Signup page 

- Setup

![Imgur](https://i.imgur.com/fUEUKWj.png)

- Looking at this we will need a few pieces of state to keep track of what we want in our form.  

```js
  const [error, setError ]          = useState('')
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    bio: ''
  });
  
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
```

An error component was set up for you to render errors.

- Now lets set up the actual UI.  

- First lets take a look at how we can use Semantic ui really easily by looking at the [layout examples](https://react.semantic-ui.com/layouts)

- As you can see we can use the source code to get our initial setup
- Note you just import the styled components from react at the top!
- I'm going to go ahead and give you the setup for the signup below

```js
 return (
     <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
         <Header as="h2" color="purple" textAlign="center">
          <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Tell us more about your dogs..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>

      );
```

- Now lets take a look at something we haven't done before, we see that we are uploading a photo in our form

```js
   <Form.Field> 
     
        <Form.Input
          type="file"
          name="photo"
          placeholder="upload image"
          onChange={handleFileInput}
        />
      
    </Form.Field>
```

If you look closely we have a new function in our `onChange` handler to handle the File input,

- So what do we have to do know???

*Setup up State*

```js
const [selectedFile, setSelectedFile] = useState('');
```

*handleFileInput*

```js
 function handleFileInput(e){
      console.log(e.target.files)
      setSelectedFile(e.target.files[0])
    }
```

if we upload a file, it will be in the first place of the files array given to us by the dom api!

Okay so now we have our form setup! Let's import our userService in order to make our signup request!

```js
import userService from '../../utils/userService';
```

We'll be using the following function 


```js
const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email, you can throw whatever 
    // you want it goes to the catch block where this function is called 
    // in the SignupPage
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
}
```

- Okay Almost ready to make an API Call, but since we are sending over an image as binary, we have to send over a special request called multipart/formdata

from mdn 

> multipart/form-data: each value is sent as a block of data ("body part"), with a user agent-defined delimiter ("boundary") separating each part. The keys are given in the Content-Disposition header of each part.

- So this well require us to set up our data as `formData` in order to properly make the request to our server!

- So lets set up our handle submit function


```js
async function handleSubmit(e){
      e.preventDefault()
      
      // Photos have to be sent over using FormData,
      // they are sent over to the server in multiple requests
      const formData = new FormData()
      formData.append('photo', selectedFile)
      
      for (let fieldName in state){
        console.log(fieldName, state[fieldName])
        // append the rest of the data to the form obejct
        formData.append(fieldName, state[fieldName])
      }
     
      try {
          // If you want to view the formData you need to loop over the object
          console.log(formData.forEach((item) => console.log(item)))
          
          // use the userService to make the fetch request
          await userService.signup(formData);

          // Route to wherever you want!
          // after you get a response from the server from 
          // the signup request, you need to grab the token from 
          // local storage and set the user!
        
        
        } catch (err) {
          // Invalid user data (probably duplicate email)
          console.log(err.message)
          setError(err.message)
        }
    }


// on the form 

 <Form autoComplete="off"  onSubmit={handleSubmit}>
```

The Javascript api for `FormData` allows us to create a form data, and thats what we are doing above! This is required whenever we are uploading forms!

- So before we get to the server part, since we are sending over formData as our type, we have do a refactor on our signup fetch.

```js
function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    // headers: new Headers({'Content-Type': 'application/json'}),
    body: user // < - no need stringify the user data because we're not sending over json we are sending over form/data
  })

```

we have to remove the headers, because we aren't sending pure json, and now we are sending multi-part form data which the browser will automatically detect and set for us!

**Server** 

Lets make sure our user model has everything we want including the file and photourl.  


```js
const userSchema = new mongoose.Schema({
  username: {type: String, required: true, lowercase: true, unique: true},
  email: {type: String, required: true, lowercase: true, unique: true},
  password: {type: String, required: true},
  photoUrl: String,
  bio: String
}, {
  timestamps: true
});
```

Okay cool we set up our user model, lets go ahead and make a request to our server and log out our `req.body`

We should be able to log something like the following at this point!


- inside our controller 

```js
async function signup(req, res) {
  console.log('hitting signup router')
  console.log(req.body, req.file)
  // rest of code
```
- our terminal

```js
{
  username: 'gary',
  email: 'gary@gary.com',
  password: 'gary',
  passwordConf: 'gary',
  bio: 'gary'
} undefined
```

- So we have a problem! our `req.file` is undefined! OHHH NOOO! How do we fix that. Multer to the rescue!

**multer** 

Lets check out the [multer](https://www.npmjs.com/package/multer)

The part that is useful for us is this 

```js
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
 
var app = express()
 
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
```

- notice `avatar` has to be the field, (the keyname) on the form we are sending to the server.

Whats our Keyname?

**Setup multer**

Okay lets set it up now for our purposes!

```js
const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
import multer from 'multer'
const upload = multer()

/*---------- Public Routes ----------*/
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);


module.exports = router;
```

We see that we just need to require multer, and then initialize the function that we can use stored in the `upload` variable.  Then we just set it up in a middleware chain before our final route!

Now lets go ahead and make another request and we should see a happy log like the following!

```js
{
  username: 'jjj',
  email: 'jjj@jim.com',
  password: 'jjj',
  passwordConf: 'jjj',
  bio: 'jjj'
} {
  fieldname: 'photo',
  originalname: 'icon.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 9b 00 00 03 70 08 03 00 00 00 96 36 8e 63 00 00 00 19 74 45 58 74 53 6f 66 74 77 61 72 65 00 ... 166869 more bytes>,
  size: 166919
}
```

- notice the buffer part is the image!

- Okay cool almost done! But do we save files to our database, what did we do in django!


**AWS** 

Lets upload our photos to AWS!

It will be very similar to how we did it in django but lets take a look at the [aws sdk](https://www.npmjs.com/package/aws-sdk)

- Remember what service did we use for AWS?

**S3**

- We use S3 for our image hosting, so we will reuse the same bucket from our catCollector to save time.

- users/controllers
```js
const { v4: uuidv4 } = require('uuid');
// uuid, helps generate our unique ids
const S3 = require('aws-sdk/clients/s3');
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME
```

-okay so now we have to refactor our signup function to upload the photo!
```js
async function signup(req, res) {
  console.log(req.body, " <- contents of the form", req.file, ' <- this is req.file')

  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"})

  // where we will store our image on aws s3 bucket
  const filePath = `pupstagram/${uuidv4()}-${req.file.originalname}`
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
  // s3.upload is making the request to s3
  s3.upload(params, async function(err, data){ // < inside the function in the response from aws
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      res.status(400).json({error: 'error from aws, check your terminal'})
    }


    const user = new User({...req.body, photoUrl: data.Location}); // data.Location is the url for your image on aws
    try {
      await user.save(); // user model .pre('save') function is running which hashes the password
      const token = createJWT(user);
      res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }



  }) // end of the s3 callback
} // end of signup
```

- Notice we are using the same bucket from before ```collectorcat```, please use whatever bucket you created
- the `Key` is the filePath we are generating with the unique name, this is what the link we will use to save to our db
- the `Body` is the actual buffer of our file Image to save!

- Then we are using the spread opertor on `req.body` to include all our other form properties, and then setting our `photoUrl` property that was defined on our model, to the response from s3, which gives us our photoUrl, in the callback accessing the Location property on `data.Location`

- Then we are sending back the jwt token we created to verify our user back to the client to be store and sent with every request!

*Back to client* 

- Storing and setting our JWT!

We'll store our user in the top most component in case any other component needs access to the user object 

- App.js 

```js
import userService from '../../utils/userService';

function App() {

  // grab the user from localStorage and set the State
  const [user, setUser] = useState(userService.getUser())


  function handleSignupOrLogin(){
    setUser(userService.getUser());
  }
/// rest of code


return(
 // code 
<Route exact path="/signup">
   <SignupPage handleSignupOrLogin={handleSignupOrLogin}/>
</Route>

```

- Here we are getting the user when the page first loads up incase their is a jwt token in local storage
- We are also setting up the ```handleSignUpOrLogin``` function that we can use to set the user in our state!
- We need to pass that function down to our signup page, in order to login!

Almost done I swear! Back to Signup component

*Signup component* 

- Where do we want to use the `hanldeSignUpOrLogin` function?

```js
  
  // top of code setup useHistory
  import { useNavigate } from 'react-router-dom';
  // top of code 
   const navigate = useNavigate();
  //

  try {
          console.log(formData.forEach((item) => console.log(item)))
          
          // use the userService to make the fetch request
          await userService.signup(formData);

          // Route to wherever you want!
          // after you get a response from the server from 
          // the signup request, you need to grab the token from 
          // local storage and set the user!
          props.handleSignupOrLogin()
          navigate('/')
        
        } catch (err) {
          // Invalid user data (probably duplicate email)
          console.log(err.message)
          setError(err.message)
        }
    }
```

- We'll use it after we send the request and get a response from our user signup 
- when we call ``` props.handleSignupOrLogin()``` we are setting the user to our state in our app, (Go check the devtools, ALWAYS CHECK THE DEVTOOLS)
- Then we can use are `useNavigate` hook from react router, and route to our homePage!

Woooo That was alot, but now we can successfully login into our app!!



