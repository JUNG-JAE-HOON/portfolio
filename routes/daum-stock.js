var express=require('express');
var router=express.Router();

// 모듈 로드
var client=require('cheerio-httpcli');

// 다음 "전종목 시세"에서 종목코드 가져오기!
url="http://finance.daum.net/quote/all.daum";

var codes=[];
var names=[];
client.fetch(url,function(err,$,res){
	if(err){
		console.log("종목코드 조회 실패;;");
	}else{
		$(".txt > a").each(function(idx){
			var stockName=$(this).text();
			var fullHref=$(this).attr('href')
			var code=fullHref.split('=');
			names.push(stockName);
			codes.push(code[1]);
		});
	}
});

router.get('/', function(req, res, next) {
	res.render('daum-stock',{names:names,codes:codes});
});


module.exports = router;

