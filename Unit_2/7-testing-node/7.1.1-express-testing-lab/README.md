
# Express Testing Lab

Today, you will be adding automated testing to your Express API. You should have tests for each of the endpoints:

* GET `/gifs` which will list out all gifs
* GET `/gifs/:id` which will get a gif with a specific ID
* POST `/gifs` which will add a new gif and return that new gif
* PUT `gifs/:id` which will update a gif and return that gif
* DELETE `gifs/:id` which will delete a gif

Your code should make sure that each endpoint returns what it is supposed to. Directions for setting up testing and implementing tests can be found in the [Express Testing](/Unit_2/6-testing-node/6.1-express-tdd-master/README.md) lesson. 

### Set Up

1. First, fork and clone this repo and change directory into it.
2. Run `npm i` to download required dependencies.
3. Make sure you have `mongodb` running!
4. Create a `.env` file and add your `DATABASE_URL` to it with your MongoDB Atlas connection string:

```
DATABASE_URL=mongodb+srv://dbuser:dfsasdt3qfvs@cluster0.scylw.mongodb.net/gaphyTestingLab?retryWrites=true&w=majority
```
### Getting Started

1. Run `node db/seed.js` to populate your database with seed data.
1. Run `nodemon index.js` to start your development server. You should see the following:

```
[nodemon] starting `node index.js`
Hello world! Express GAphy API listening on port 3000
mongo connected at:  mongodb+srv://dbuser:gm1W3HMJ3L3tvVxx@cluster0.scylw.mongodb.net/gaphy?retryWrites=true&w=majority
✅ mongo connection made!
```

Happy coding!!!

### Bonus: Add Testing to your MEHN Lab

If you have time, look up how to test a non-JSON webpage endpoint. Add testing to your MEHN lab using your research! You could also convert your application to an API and add testing to it that way if you prefer.