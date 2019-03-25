var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log("made it here");
	res.send('respond with a resource');
});

/* GET users listing. */
router.post('/', function(req, res, next) {
	res.render("Posting");
});

module.exports = router;