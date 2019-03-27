var express = require('express');
var router = express.Router();

// Get the scores from the form
var getScores = require("../js/placement.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("inside route");
	res.render('index');
});

router.post('/placement', function(req, res, next) {
	
	console.log(scores);
});



router.get('/hello', function(req, res, next) {
	res.send('hello');
	// console.log("inside route");
	// res.render('index');
});

router.post('/map', function(req, res, next) {
	console.log("inside route");
	res.render('map');
});

module.exports = router;