<img src="https://i.imgur.com/fx2orT2.png">

## Learning Objectives

| Students Will Be Able To: |
| --- |
| Create a Profile Page  |
| Understand the flow of a post request client to server |
| Understand flow of props and Create user Bio Section |


## Wireframe 

#### Profile Page

![Imgur](https://i.imgur.com/dUdOeu3.png)


- What components do we have?

1.  It looks like we have the header component
2.  A Profile Bio with the image of the user and thier information
3.  A container for the the users posts
4.  Cards to render out each Post!


### Step One

**Set up your the basic components!**

1. Create the Profile Page. Remember anything rendered by a route is put in the pages folder. 

pages/ProfilePage/ProfilePage.jsx

```js
import {  Grid } from 'semantic-ui-react'
export default function ProfilePage(){

  return (
    <div> This is Profile Page</div>
  )
}
```

2. Render it out in the app!

- Here we need to Create a new Route for the profile page,
- We'll use the username for the profile route to make navigation easy just like fb and instagram!

*app.js*

```js
 <Routes>
    <Route path="/" element={<Feed/>}>
    <Route path="/login" element={ <LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    <Route path="/signup" element={ <SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    <Route path="/:username" element={<ProfilePage />} />
</Routes>

```

- We are using params here so the user can search any username!

3. Lets Create our other components that we will need, the Profile Bio and ProfilePostDisplay!

*components/ProfilePostDisplay/ProfilePostDisplay*

```js
import React from 'react';
import { Card } from 'semantic-ui-react'
import Post from '../PostCard/PostCard';


export default function ProfilePostDisplay(props){

    return (
      
       <div>Profile Post Display Container</div>
    
    )
}
```

- Notice how this component is importing the Post component we'll be able to reuse, and the Card from semantic ui which will be helpful later on in styling (in the lab). 

*components/ProfileBio/ProfileBio*

```js
import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';


function ProfileBio() { 
  return (
   <h1>Profile Bio Area</h1> 
  );
}



export default ProfileBio;
```

### Setting up the Profile Page 

- Lets import our components and render them out in different rows like the wireframe


```js
import React, { useState, useEffect } from 'react';
import {  Grid } from 'semantic-ui-react'
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import ProfilePostDisplay from '../../components/ProfilePostDisplay/ProfilePostDisplay';
import PageHeader from '../../components/Header/Header';


export default function ProfilePage(){


    return (
    
  
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                    <PageHeader />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <ProfileBio />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column style={{ maxWidth: 750 }}>
                        <ProfilePostDisplay />
                    </Grid.Column>
                </Grid.Row>
            </Grid>     
    )
}
```

### Fetching the Users Data

- When we navigate to a users profile page we'll have to fetch that particular users information when the page loads up!
- So we'll have to use our `useEffect` hook to make sure we run our fetch when the page loads!

- Lets take a look at the route we'll have to make a request to on the backend!

*routes/api/users.js*

```js
router.get('/:username', usersCtrl.profile);
```

- We see we have a route which it's full address is `/api/users/:username` and when that endpoint is hit, it will trigger our `usersCtrl.profile` route. Lets go checkout that route as well!


*controllers/users.js*

```js
async function profile(req, res){
  try {
    // First find the user using the params from the request
    // findOne finds first match, its useful to have unique usernames!
    const user = await User.findOne({username: req.params.username})
    // Then find all the posts that belong to that user
    if(!user) return res.status(404).json({error: 'User not found'})

    const posts = await Post.find({user: user._id}).populate("user").exec();
    console.log(posts, ' this posts')
    res.status(200).json({data: posts, user: user})
  } catch(err){
    console.log(err)
    res.status(400).json({err})
  }
}
```

- So we see here that this endpoint will return both the user's posts and the users information in the same respective properties, so making a call to this endpoint will give us everything we need!




- We see our function has a parameter called `username` (which whatever the username in the url will be!), and we are sending over our jwt for authentication!
- now back to the profilePage

**Making the api call when the page loads**

- make the imports at the top 

```js
import userService from '../../utils/userService';
import { useParams } from 'react-router-dom';
```

- We will use the `useParams` hook from react-router-dom in order to figure out what username is in the url!

*ProfilePage Component*

```js
export default function ProfilePage(){

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    
     const { username } = useParams();
    
   useEffect(() => {
      getProfileInfo()
    }, [username]);


    async function getProfileInfo(){
        try {
          setLoading(true)
          const response = await fetch(`/api/users/${username}`, {
            method: 'GET',
            headers: {
              // convention for sending jwts, tokenService is imported above
              Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
              //and and it to our api request
              // so the server knows who the request is coming from when the client is trying to make a POST
            }
          })
            //.ok property comes from fetch, and it checks the status code, since profile not found
          // is a 404 the code throws to the fetch block
          if(!response.ok) throw new Error('Whatever you put in here goes to the catch block')
          // this is recieving and parsing the json from express
          const data = await response.json();
          console.log(data)
          setLoading(false)
          setPosts(data.data)
          setProfileUser(data.user)
          setError(''); // set error back to blank after successful fetch


        } catch(err){
          console.log(err.message)
          setError('Profile Does Not Exist! Check the Terminal!')
          setLoading(false)
        }
      }
    
    
      if (error) {
          return (
            <>
              <PageHeader />
              <h1>{error}</h1>
            </>
          );
        }
        
      if (loading) {
        return (
          <h1>Loading....</h1>
        );
      }

    return (
    
          <Grid>
              <Grid.Row>
                  <Grid.Column>
                  <PageHeader />
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column>
                      <ProfileBio profileUser={profileUser}/>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row centered>
                  <Grid.Column style={{ maxWidth: 750 }}>
                      <ProfilePostDisplay />
                  </Grid.Column>
              </Grid.Row>
          </Grid>   
      
    )
}
```

- Here we added a ternary that we flip from `true` to `false` after the page `userService.getProfile(username);` is finished!
- Then since our controller function is returning the data for the user's posts and the users information, we need to set them both in our state!


*passing props*

- Notice we are then passing the users information as a prop to `ProfileBio` so we can render out the users information and profile bio info!

**ProfileBio**

- Lets update the profile bio to render out our information

*components/ProfileBio/ProfileBio*


```js
import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';


function ProfileBio({profileUser}) { 
  return (
  <Grid textAlign='center' columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Image src={`${profileUser.photoUrl ? profileUser.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
           <h3>{profileUser.username}</h3>
        </Segment>
        <Segment>
           <span> Bio: {profileUser.bio}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>

  );
}



export default ProfileBio;
```

- We are just using semantic ui default image incase the user doesn't have a profile image saved! 
- We are using another nested grid to complete our two column layout!
