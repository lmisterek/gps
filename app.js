// var url = require('url');
// var fs = require('fs');

// function renderHTML (path, response) {
	
// 	fs.readFile(path, null, function(error, data) {
// 		if(error) {
// 			response.writeHead(404);
// 		}

// 		else {
// 			response.write(data);
// 		}

// 		response.end();
// 	});
// }


module.exports = {
	
	handleRequest: function (request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});

		var path = url.parse(request.url).pathname;

		switch (path) {
			case '/': 
				renderHTML('./index.html', response);
				break;
			case '/login':
				renderHTML('./login.html', response);
				break;
			default:
				response.writeHead(404);
				response.write('Route not defined');
				response.end();
		}
	}
};


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('view', path.join(_dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(_dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(_dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to event handler
app.use(function (req, res, next) {
	var err = new Error ('Not Found');
	err.status = 404;
	next(err);

});