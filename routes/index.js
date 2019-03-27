var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("inside route");
	res.render('index');
});

router.post('/index', function(req, res, next) {
	
	res.send(res.data);
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