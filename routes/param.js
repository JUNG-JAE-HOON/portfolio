var express=require('express');
var router=express.Router();

router.get('/', function(req, res, next) {
	
	res.render('param',{stockName:req.query.stockName});
	
});
module.exports = router;

