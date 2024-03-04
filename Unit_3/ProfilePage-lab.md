
## Lab 

You're going to complete the `ProfilePostDisplay` from the lesson!

- Take a look at the wireframe again

![Imgur](https://i.imgur.com/dUdOeu3.png)


#### Requirments

1.  Make sure the Cards only show up in 3 items per row on a large screen. (Hint check out on semantic ui, the Card.Group props on the docs)
2.  Reuse the PostCard component that is already made to render each post
3.  Refactor the PostCard component to only render the header of the card if the card is being displayed on the profile! (Hint: maybe you can pass a prop to let the card know if it is on the profile page or not)


### Bonus

1. Do you notice how the our PostFeed and ProfilePostDisplay are similiar? See if you can refactor that into one component where the feed on the homepage shows
the cards in a single row like we have it now, and then on the profilePage they are rendered in rows of three!
2.  Instead of using the words `Loading...` like we are in the profile page, use a loading icon from semantic ui, also implement loading when you are creating a post!
3. Maybe you can create a Loading component that you can reuse maybe after you signup and when you're loading the cards in the homepage or the profile page!


