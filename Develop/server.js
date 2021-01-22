const express = require('express');
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config({path: './config.env'})

// port
const PORT = process.env.PORT || 9090;
const app = express();

app.use(logger("dev"));
// Serve static content for the app from the "public" directory in the application directory.
// (html allower)
app.use(express.static(__dirname + '/public'));

// Parse application body as JSON
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes and give the server access to them.
require("./routes/htmlroutes")(app);
require("./routes/apiRoutes")(app);

const connectionString = process.env.DB_CONNECTION.replace('<password>', process.env.DB_PASSWORD).replace('<dbname>', process.env.DB_NAME)
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('🤪')).catch(err => console.log(err))

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});