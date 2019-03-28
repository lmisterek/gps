var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var routes = require('./routes/index');
var routes = require('./routes/index');
var exphbs = require('express-handlebars');

//var users = require('./routes/users');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("public/favicon.ico"));
app.use(express.static("public"));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
app.use('/', routes);

// app.use('/users', users);


app.listen(8000, function () {
  console.log('App is listening on port 8000!')
})