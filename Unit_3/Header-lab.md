
## Lab 

You're going to create the header

- Take a look at the wireframe 

<br/>
<br/>

![Imgur](https://i.imgur.com/K9VA14c.png)


#### User Story

1. If the user clicks on Logout the user will be logged out of the app and redirected to the log in page. 

The jwt token should be removed from localStorage, remember you can check by using the devtools and going to application > localstorage. Hint do you have have a function already in your `userService` that you can use?

2.  If the user clicks on the home icon they should be directed to the feed Page.

3. The logged in users profile picture should display to the left, and if clicked on should direct the user to thier profile page!


### Bonus

1. If the user clicks on the profile picture in the header of a card component they should be redirected to that particular users profile page!
2. When a user is logged out, Redirect them to the login page, and make sure they can't go to the profile or feed page (don't render those components if they are not logged in)

Think about what the value of the thing you are storing in your App.js state is?


