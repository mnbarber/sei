
# LAB

## Wireframe 

![Imgur](https://i.imgur.com/3hY0xP0.png)


You're requirements are to render out all the posts in your the state, as Card components just like the wireframe!

Hints:

1. In the Feed component you'll want to write a function that when the component loads it will fetch all the existing posts, because right now they are only being updated in state when you create something. 

-(do you need to call a function (maybe your utilitiy function) in useEffect to do this?) 
- You'll be making a get request to the following controller function

controllers/posts

- refer to the server.js and the routes, to make sure you know the correct endpoint you're making a call too. 
```js
async function index(req, res){
    try {
        // this populates the user when you find the posts
        // so you'll have access to the users information 
        // when you fetch teh posts
        const posts = await Post.find({}).populate('user').exec()
        res.status(200).json({posts})
    } catch(err){

    }
}
```

- So you'll want to create a util function that makes that request, What do you have to include in the header to make sure you send over your json web token?

- The format of the function will essentially be the same as the Post except you are making a get request, also do you need a body of the request if its a get request?

- After you confirm that you are loading posts when the component loads, by checking the devtools and viewing the `Feed` components state, then you'll want to pass those `posts` as props to the `PostFeed.jsx` component

**PostFeed.jsx** 

- The job of this component is to set up the layout that will render out all the `PostCard` components.

- Check out the CardGroup component to maninpulate the layout from semantic ui react

- Then finally this component will render out each post, but will pass the *EACH* post to the `PostCard` component you made earlier that will contain all the styling for *EACH* post

- Look at the devtools to view your props!

**PostCard.jsx**

- Check out semantic ui's [Card component](https://react.semantic-ui.com/views/card/), be sure to click on the 'try it' on each example to see what the code looks like!

- Be sure to use the devtools and click on the component to see what properties you have as props to render out!

- The Icon image will be helpful for rendering out the 'heart' and the Image component will be helpful as well!





