// Configure Enviornment
require("dotenv").config({path: '../config.env'})


// Require Mongo & Models
const mongoose = require("mongoose");
const Workout = require("../models/workoutModel.js");
const data = require('./data');


// Create Connection String to Atlas
const connectionString = process.env.DB_CONNECTION.replace('<password>', process.env.DB_PASSWORD).replace('<dbname>', process.env.DB_NAME);


// Set Mongoose Options
const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}


// Seed Data
async function seed() {

  // Confirm Database Connection
  console.log('DB Connection Successful🤪');


  try {
    // Delete Existing Records
    await Workout.deleteMany();


    // Insert Seed Data
    const docs = await Workout.collection.insertMany(data);


    // Console Log Inserted Documents
    console.log(docs)


    // Log Successful Number Of Documents insterted to console
    console.log(`${docs.insertedCount} Documents inserted into Collection`);


    // Close Application in Terminal
    process.exit(0);
  }

  catch (err) {

    // Log Error
    console.log(err);

    // Close Application with Error State
    process.exit(1);

  }

  

}


// Connect To MongoDB and Seed Data
mongoose.connect(connectionString, mongooseOptions).then(seed).catch(err => console.log(err))




// OLD STUFF (localhost connection) ************************************************************************************

  // .then(() => db.collection.insertMany(workoutSeed))
  // .then(data => {
  //   console.log(data.result.n + " records inserted!");
  //   process.exit(0);
  // })
  // .catch(err => {
  //   console.error(err);
  //   process.exit(1);
  // });


  // console.log(db.Workout)
// mongoose.connect("mongodb://localhost/workoutDb", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });