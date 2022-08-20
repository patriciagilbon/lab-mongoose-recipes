const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.insertMany(data)
.then(recipe => console.log('The recipe is:', recipe ))
.catch(error => console.log('An error happened:', error))

new Recipe({ title: 'soup', cuisine: 'german' })
  .save()
  .then(() => {
    Promise.all([
      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100}), 
      Recipe.deleteOne({ title: 'Carrot Cake' })]);
    mongoose.connection.close();
  })
  .catch(err => console.log(`Error while creating a new recipe: ${err}`))
