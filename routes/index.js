var express = require('express');
var router = express.Router();

// Get the scores from the form
//var getScores = require("../public/js/placement");


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("inside route");
	res.render('index');
});

router.post('/', function(req, res, next) {
	res.render("working");
	console.log(scores);
});



router.get('/hello', function(req, res, next) {
	res.send('hello');
	// console.log("inside route");
	// res.render('index');
});

router.post('/map', function(req, res, next) {
	res.render("working");
	//console.log("inside route");
	//res.render('map');
});

module.exports = router;