var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  // port     : 3306,
  database : 'stocks'
});

conn.connect(function(err){
	if(err){
		console.log("db접속 에러");
	}else{
		console.log("db접속 성공");
	}
});

router.get('/', function(req, res, next) {
	conn.query('SELECT stock_name from stocks where stock_name like "%'+req.query.key+'%"',function(err, rows, fields) {
	if (err) throw err;
	var data=[];
	for(i=0;i<rows.length;i++)
	{
	data.push(rows[i].stock_name);
	}
	res.end(JSON.stringify(data));
	});

});


module.exports = router;
