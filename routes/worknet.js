var express = require('express');
var router = express.Router();
var client=require('cheerio-httpcli');
var url='http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNJ3AT2XO1CX63TOEZ9C22VR1HL&callTp=L&returnType=XML&startPage=2&display=100';

var lenght;

var arr1=[];
client.fetch(url,function(err,$,res){
		console.log('일단 성공');
		length=$('wantedRoot wanted').length;
		$('wantedRoot wanted').each(function(idx){
			var title=$(this).find('title').text();
			var company=$(this).find('company').text();
			var sal=$(this).find('sal').text();
			var region=$(this).find('region').text();
			var minEdubg=$(this).find('minEdubg').text();
			var maxEdubg=$(this).find('maxEdubg').text();
			var career=$(this).find('career').text();
			// 게시일
			var regDt=$(this).find('regDt').text();
			// 마감일
			var closeDt=$(this).find('closeDt').text();
			// 기본주소
			var basicAddr=$(this).find('basicAddr').text();
			// console.log("asdkasjlkdj");
			
			// res.render('index', { title: title });
			arr1.push({title:title,company:company,sal:sal,region:region,minEdubg:minEdubg,maxEdubg:maxEdubg,career:career,regDt:regDt,closeDt:closeDt,basicAddr});

		});
	});	
	
router.get('/', function(req, res, next) {
	res.render('worknet',{list:arr1});
});
/* GET home page. */

module.exports = router;


// 