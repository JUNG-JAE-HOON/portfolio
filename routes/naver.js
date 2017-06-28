// get이랑 post 받을 때 모두 같은 스크립트 사용함. 
// 리팩토링 해야함 ㅎㅎ


//네이버api로 블로그 검색하기
var express = require('express');
var router = express.Router();
//모듈로드
var https=require('https');
var parseString=require('xml2js').parseString;

//검색어 및 파라미터 설정
var contArr=[];
var keyword='쭈꾸미';

var client_id='jZ5dr2UqotgxyU7bzi8A';
var client_secret='jdl9GLnUfU';
var host='openapi.naver.com';
var port =443;
var uri = '/v1/search/blog.xml?query='+encodeURIComponent(keyword);
// https://openapi.naver.com/v1/search/blog
var options={
	host:host,
	port:port,
	path:uri,
	method:'GET',
	headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
}
var result="";
// api요청
var req=https.request(options,function(res){
	res.setEncoding('utf8');

	res.on('data',function(chunk){
		result=result+chunk;
	});

	res.on('end',function(){
		// xml을 json으로 변환 후에 검색결과 출력
		parseString(result,function(err,pStr){
			var items=pStr.rss.channel[0].item;
			for(var i in items){
				
				var user=items[i].bloggername[0];
				var title=items[i].title[0];
				var desc=items[i].description[0];
				contArr.push({user:user,title:title,desc:desc});
			}
			
			// console.log(contArr);
		});
	});
});
router.get('/', function(req, res, next) {
	res.render('naver',{list:contArr});
});
router.post('/', function(req, res, next) {
	var keyword='쭈꾸미';

	var client_id='jZ5dr2UqotgxyU7bzi8A';
	var client_secret='jdl9GLnUfU';
	var host='openapi.naver.com';
	var port =443;
	var uri = '/v1/search/blog.xml?query='+encodeURIComponent(keyword);
	// https://openapi.naver.com/v1/search/blog
	var options={
		host:host,
		port:port,
		path:uri,
		method:'GET',
		headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
	}
	var result="";
	// api요청
	var req=https.request(options,function(res){
		res.setEncoding('utf8');

		res.on('data',function(chunk){
			result=result+chunk;
		});

		res.on('end',function(){
			// xml을 json으로 변환 후에 검색결과 출력
			parseString(result,function(err,pStr){
				var items=pStr.rss.channel[0].item;
				for(var i in items){
					
					var user=items[i].bloggername[0];
					var title=items[i].title[0];
					var desc=items[i].description[0];
					contArr.push({user:user,title:title,desc:desc});
				}
				
				// console.log(contArr);
			});
		});
	});
	res.send({list:contArr});
});
req.end();
module.exports = router;
