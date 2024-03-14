<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
|Create a Feed Page to Render out Posts |
| Create a Form in order to submit a Post |
| Understand the flow of a post request client to server |


## Wireframe 


![Imgur](https://i.imgur.com/3hY0xP0.png)


We are going to develop our Feed Page today.  

- Lets go ahead and create a component to hold our page! Anything rendered by a route is put in the pages folder. 

```
mkdir src/pages/FeedPage
touch src/pages/FeedPage/FeedPage.jsx
```

and then lets just render out something simple to test it

```js
export default function FeedPage(props){  
    return (
        <>
        <span>The Feed</span>
        </>
    )
}
```


and then render it out instead of our home page.

```js
// top of file
import FeedPage from '../FeedPage/FeedPage'

// rest of code

return (
    <div className="App">
      <Switch>
          <Route exact path="/">
              <FeedPage />
          </Route>
          <Route exact path="/login">
             <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
          <Route exact path="/signup">
             <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>
          </Route>
      </Switch>
    </div>
  );
```

**Planning The components**
Looking back on the wireframe 

<details open>
<summary>what components are being rendered out on the page?</summary>
<br>
1. Header Component <br/>
2. a addPostForm Component <br/>
3. PostFeed Component that will render each Post <br/>
4. A Card for each Post <br />
</details>


Okay now that we know what components we need lets go ahead and create all of those in our components folder. We're going to assume from here on out you can make the proper file structure

- components/Header/Header.jsx

```js
import React from 'react';

import { Header, Segment} from 'semantic-ui-react';


export default function PageHeader(){
    return (
        <Segment>
            <Header as='h2' >
              This is the HEADER!
            </Header>
        </Segment>
    )
}
```

- components/AddPostForm/AddPostForm.jsx

```js
import React, { useState } from 'react';

export default function AddPostForm(){
    
    return (
        <span> Post Form</span>
    )
}

```

- components/PostFeed/PostFeed.jsx

```js
import React from 'react';

export default function PostFeed(props){

    return (
       <div>THIS IS THE POST FEED THAT WILL RENDER OUT EACH POST AS A CARD</div>
    )
}
```
- componets/PostCard/PostCard.jsx

```js
import React from 'react';

function PostCard(props) { 

  return (
    <div>I will render each post as a semantic ui card</div>
  );
}

export default PostCard;
```

- Okay, So we created all of our components that will be rendered as children or further descendents of our `Feed` Component.

**Rendering the components in our Feed Component**

```js
import React, { useState } from "react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostFeed from "../../components/PostFeed/PostFeed";

import { Grid } from "semantic-ui-react";

export default function FeedPage() {


  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPostForm  />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostFeed />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

```


**Creating a Post**

- Lets first create our form, It is going to look very similiar to yesterday 

- AddPostForm

**Challenge**

```js
import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

export default function AddPostForm() {
  // create the state, pay attention to how the inputs are setup!

  // The function that handles the changes on the input, Look at the inputs for the name of it

  function handleSubmit(e) {}

  return (

        <Segment>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Input
              className="form-control"
              name="caption"
              value={state.caption}
              placeholder="What's on your pups mind?"
              onChange={handleChange}
              required
            />
            <Form.Input
              className="form-control"
              type="file"
              name="photo"
              placeholder="upload image"
              onChange={handleFileInput}
            />
            <Button type="submit" className="btn">
              ADD PUPPY
            </Button>
          </Form>
        </Segment>
   
  );
}
```

### solution

```js
import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

export default function AddPostForm({handelAddPost}) {
  // create the state, pay attention to how the inputs are setup!
  const [state, setState] = useState({
    caption: "",
  });
  // The function that handles the changes on the input, Look at the inputs for the name of it
  const [selectedFile, setSelectedFile] = useState("");

  function handleFileInput(e) {
    console.log(e.target.files, " < - this is e.target.files!");
    setSelectedFile(e.target.files[0]);
  }

  function handleChange(e) {
    setState({
     ...state,
     [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);
    formData.append("caption", state.caption);
    handleAddPost(formData); // formData is the data we want to send to the server!
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={state.caption}
          placeholder="What's on your pups mind?"
          onChange={handleChange}
          required
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
          ADD PUPPY
        </Button>
      </Form>
    </Segment>
  );
}


```

**key things to note**

Styling - we are using semantic ui's [grid prop](https://react.semantic-ui.com/collections/grid/) verticalAlign, to align our component in the middle of the page! We are also setting the max-width to make sure our form doens't take up the whole page.

formData - Since we have to send over a formData to the server we have to create formData and append our state propeties to it, and this is what we will pass to our function that will make our api call to our server.

**Creating a fetch Post function in handleAddPost**



```js
// Making a request to create a POST
// this function will occur when a user is logged in
// so we have to send the token to the server!
  const [posts, setPosts] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)
  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddPost(postToSendToServer){
	console.log(postToSendToServer, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: postToSendToServer, // < No jsonify because we are sending a photo
			headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }


```

- Things to note here, the header is how we have to send over our token that is being stored in localstorage. We have to do this for every resource besides login and signup, because those are the operations that create the token. We are using `tokenService.getToken()` Remember when we send over the token, it goes through our ```app.use(require('./config/auth')); ``` middleware and inside of that module, we check to see if the token exists and is valid, and if it is we assign the decoded tokens value to req.user ```req.user = decoded.user;```

- What we want to do is think about where we want to keep our state for all the Posts that will be rendered in our feed!

- Since we want to be able to pass down all of our posts in the future to our `PostFeed` component, it would make sense to set up our function in our `Feed` component!

```js
import React, { useState } from "react";

import PageHeader from "../../components/Header/Header";
import AddPost from "../../components/AddPost/AddPost";
import PostFeed from "../../components/PostFeed/PostFeed";

import { Grid } from "semantic-ui-react";


import tokenService from "../../utils/tokenService";

export default function FeedPage() {
  const [posts, setPosts] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)
  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddPost(postToSendToServer){
	console.log(postToSendToServer, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: postToSendToServer, // < No jsonify because we are sending a photo
			headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		setPosts([data.post, ...posts])
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPost handleAddPost={handleAddPost} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

```

Here we set up our utility function in `handleAddPost` in the PostFeed component that will hold our state that contains all the posts for our app!

**Now lets use it!**

AddPostForm

```js
 function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('caption', state.caption)
    props.handleAddPost(formData); // calling our function!
 }
```

- How would you confirm that it worked!

- Check the response and check the server!

**Checking the server**

we see our server just has a simple response

```js
function create(req, res){
   console.log(req.body, req.file)
   res.json({data: 'working'})
}
```

- Seeing an empty object and undefined for our logs, what do we have to set up again? What kind of request are we making?

**Setting up a form/multipart process on the server**

- setup our multer!

- routes/posts.js

```js
const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');
const multer  = require('multer')
const upload = multer()
// /*---------- Public Routes ----------*/
router.post('/', upload.single('photo'), postsCtrl.create);
router.get('/', postsCtrl.index)


/*---------- Protected Routes ----------*/

module.exports = router;
```

- As we can see we set up it up the same way, We initialize multer, and then add it to the middlechain on the function that is recieving a file

- `upload.single('photo')` - photo is the property we are expecting from the request that has the value of our image.

- Testings again we should be able to confirm the proper logs!

**Setting up the Post Create function**

- We need the aws/sdk again in order to upload our image to aws
- Also be sure to check the model in order to see what properties you need to be adding!

controllers/posts.js
```js
const Post = require("../models/post");

const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); // initate the S3 constructor which can talk to aws/s3 our bucket!
// import uuid to help generate random names
const { v4: uuidv4 } = require("uuid");
// since we are sharing code, when you pull you don't want to have to edit the
// the bucket name, thats why we're using an environment variable
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

module.exports = {
  create,
  index,
};

function create(req, res) {
  console.log(req.body, req.file, req.user); // < req.user comes the config/auth middleware that is mounted before our controllers in the server.js
  const key = `pupstagram/posts/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log("=======================");
    console.log(err, " err from aws");
    console.log("=======================");
    if (err) return res.status(400).json({ err: "Check Terminal error with AWS" });
    try {
      // Using our model to create a document in the posts collection in mongodb
      const post = await Post.create({
        caption: req.body.caption,
        user: req.user,
        photoUrl: data.Location, // < this is from aws
      });
      // respond to the client!
      res.status(201).json({ data: post });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
}
```

Looking at the post model we see have the following properties (photoUrl, user)

```js
const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    caption: String,
    likes: [likesSchema]
  })
```

- so we have to pass to our create both the userId, and the photoUrl of our image location on aws!

- Where is req.user coming from again? If you can't remeber, scroll up and read again!

**Setting are state**

PostFeed.jsx

```js
import AddPost from '../../components/AddPostForm/AddPostForm';
import * as postsAPI from '../../utils/postApi';

export default function Feed({ user,handleLogout}){
  const [posts, setPosts] = useState([]); // this will be an array of objects!	
  const [loading, setLoading] = useState(true)
  // Wherever you store your state, 
  // this is where we will define the api calls, 
  // because when they finish we need to update state
  // to reflect whatever CRUD operation we just performed
  async function handleAddPost(postToSendToServer){
	console.log(postToSendToServer, " formData from addPost form")

	try {
		// Since we are sending a photo
		// we are sending a multipart/formdData request to express
		// so express needs to have multer setup on this endpoint!
		const response = await fetch('/api/posts', {
			method: 'POST',
			body: postToSendToServer, // < No jsonify because we are sending a photo
			headers: {
					// convention for sending jwts, tokenService is imported above
					Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
					//and and it to our api request
					// so the server knows who the request is coming from when the client is trying to make a POST
				}
		})

		const data = await response.json();
		//       res.status(201).json({ post }); this value is from express/posts/create controller
		console.log(data, ' response from post request! This from express')
		setPosts([data.post, ...posts])
	} catch(err){
		console.log(err.message)
		console.log('CHECK YOUR SERVER TERMINAL!!!!')
	}

  }
```

- Here our actually object is inside of data.post, where is post coming from? Check the controller function!

- Then in our setPosts, we are creating a new array, adding our post to the front of the array, and spreading out all the old posts into the rest of the array!

- Then confirm that it works by looking in the devtools at your Feed component and you should see something like this

![Imgur](https://i.imgur.com/I9NiqGp.png)


**Resources**

1. [multer](https://www.npmjs.com/package/multer)
2. [aws/sdk](https://www.npmjs.com/package/aws-sdk)
3. [semantic ui react](https://react.semantic-ui.com/)
