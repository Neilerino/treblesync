const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const Data = require('./data');
const http = require('http');

const API_PORT = 3001;
const app = express();
app.use(cors());

//Routes
const spotify = require('./routes/spotify');
app.use('/spotify', spotify);

// this is our MongoDB database
const dbRoute = "mongodb://localhost/app";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.static(__dirname + '/public'))
.use(cors())
.use(cookieParser());

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));