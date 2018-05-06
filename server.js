// Our Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Using es6 js promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 4000;

// Use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// handlebars engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Public directory to serve files
app.use(express.static("public"));

// Mongoose connects to mongodb 
mongoose.connect("mongodb://heroku_nnx6fm0c:<dbpassword>@ds113700.mlab.com:13700/heroku_nnx6fm0c");
var db = mongoose.connection;

// if any errors than console errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// display a console message when mongoose is connected
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Require the routes in our controllers js file
require("./controllers/articlesController.js")(app);

//Listen on PORT 4000 & notify
app.listen(PORT, function () {
  console.log("App running on port 4000");
});