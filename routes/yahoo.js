var express=require('express');
var router=express.Router();


// 모듈 로드
var client=require('cheerio-httpcli');

// html다운로드
var code='137400.KQ'//종목코드
var url="https://finance.yahoo.com/q/hp";

var arr=[];

client.fetch(url,{
	"s":code
},function(err,$,res){
	if(err){
		console.log(err);
		return;
	}else{
		//값 취득
		$("#quote-leaf-comp > section > div > table > tbody > tr").each(function(idx){
			var date=$(this).find("td:nth-child(1)").text();
			var open=$(this).find("td:nth-child(2)").text();
			var high=$(this).find("td:nth-child(3)").text();
			var low=$(this).find("td:nth-child(4)").text();
			var close=$(this).find("td:nth-child(5)").text();
			var adjClose=$(this).find("td:nth-child(6)").text();
			var volume=$(this).find("td:nth-child(7)").text();

			arr.push({"date":date,"open":open,"high":high,"low":low,"close":close,"adjClose":adjClose,"volume":volume});
			// console.log(arr);
		})

			// //쉼표(,) 제거
			// str = str.replace(/,/g,"");
			// //'숫자.숫자'만 추출하기
			// var arr=str.match(/\d*\.\d*/);

			
			router.get('/', function(req, res, next) {
				
				res.render('yahoo',{priceList:arr,stockName:req.query.stockName});
				
			});


	}
	
});



module.exports = router;

