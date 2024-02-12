const Gif = require('./schema');
const seedData = require('./seeds.json');

Gif.deleteMany({})
	.then(() => {
		return Gif.insertMany(seedData);
	})
	.then((gifs) => {
		console.log('Inserted gifs!', gifs);
	})
	.catch(console.error)
	.finally(() => process.exit());
