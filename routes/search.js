var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('search',{});
	
});

router.post('/', function(req, res, next) {
	var test1=req.param('stockName');
	console.log(test1);
	res.send()
});
/* GET home page. */

module.exports = router;


// 