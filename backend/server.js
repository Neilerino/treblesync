const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const logger = require('morgan');
const http = require('http');
const passport = require('passport');

const API_PORT = 3001;
const app = express();
app.use(cors());

const db = require('./config/database');

//Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

//Routes
const spotify = require('./routes/spotify');
app.use('/spotify', spotify);

const user = require('./routes/users');
app.use('/user', user)

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