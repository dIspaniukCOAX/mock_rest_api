const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://danyloispaniuk:RMeO8VlcFGQlZOfs@cluster0.tgnfn67.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

module.exports = connectToDatabase;