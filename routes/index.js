var express = require('express');
var router = express.Router();

// Get the scores from the form
//var getScores = require("../public/js/placement");


/* GET home page. */
// router.get('/', function(req, res, next) {
// 	console.log("inside route");
// 	res.render('index');
// });


router.get('/', function(req, res, next) {
	console.log("here!");
	res.render('index');
	// console.log(scores);
});

router.get('/map', function(req, res, next) {
	console.log("Make the map!");
	res.render('map');
	// console.log(scores);
});

router.get('/data', function(req, res, next) {
	res.render("data posted");
});

// router.get('/map', function(req, res, next) {
// 	res.sendFile(express.static("../public/map.html"));
// 	console.log("inside route");
// 	res.render('map');
// });

module.exports = router;