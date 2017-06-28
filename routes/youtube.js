var express = require('express');
var router = express.Router();
// var client=require('cheerio-httpcli');
var exec=require('child_process').exec;
var Youtube=require('youtube-node');
var youtube=new Youtube();

// API 지정 (내것으로 교체)
youtube.setKey('AIzaSyBwaKbXc6tWvKypTi-cXSDRa10OdgQf7W8');

// var keyword='cat';
// var limit=2;
// // 조건 설정

// 	youtube.addParam('order','ViewCount');
// 	youtube.addParam('type','video');
// 	youtube.addParam('videoLicense','creativeCommon');
// 	youtube.addParam('videoDuration','short');
// 	youtube.search(keyword,limit,function(err,result){
// 		if (err){console.log(err);return;}
// 		var items=result['items'];
// 		for(var i in items){
// 			var it=items[i];
// 			var title=it['snippet']['title'];
// 			var video_id=it['id']['videoId'];
// 			console.log(title,video_id);
// 			// 다운로드 수행
// 			downloadVideo(video_id);
// 		}
// 	});


	// youtube-dl사용하여 다운로드 원본
	// function downloadVideo(video_id){
	// 	var url='https://www.youtube.com/watch?v='+video_id;
	// 	exec('youtube-dl '+url,function(err,stdout,stderr){
	// 		if(err){console.log(err);return;}
	// 		if(stdout) console.log(stdout);
	// 		if(stderr) console.log(stderr);
	// 	});
	// }

	// youtube-dl사용하여 다운로드 원본
	function downloadVideo(url){
		exec('youtube-dl '+url,function(err,stdout,stderr){
			if(err){console.log(err);return;}
			if(stdout) console.log(stdout);
			if(stderr) console.log(stderr);
		});
	}


router.get('/', function(req, res, next) {
	res.render('youtube',{});
});

router.post('/', function(req, res, next) {
	var url=req.body.url;
	res.send({url:url});
	downloadVideo(url);
});


module.exports = router;

