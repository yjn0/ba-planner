var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config();

// create new express app
var app = express();

// view engine configuration to render JSX templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// standard middleware
app.use(logger('dev'));   // logger
app.use(express.json());  // json parser
app.use(express.urlencoded({ extended: false })); // urlencoded request parser

// serve assets in /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// apply other global middleware
require('./config/routes')(app);

module.exports = app;
