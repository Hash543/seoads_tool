var express = require('express');
var router = express.Router();
var fs = require('fs');
var seo ={
	yahoo: 'seoyahoo',
	google: 'seogoogle'
}
console.log(seo);
router.get('/', function(req, res, next) {
  	res.render('index');
});
router.get("/" + seo.yahoo, function(req, res, next) {
	var f = fs.openSync('./public/' + seo.yahoo , 'a+');
	var data = JSON.parse(fs.readFileSync('./public/' + seo.yahoo));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
	console.log(seo);
  	res.render(seo.yahoo,{sdata:data});
});
router.post("/" + seo.yahoo, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync('./public/' + seo.yahoo , 'a+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(seo.yahoo, { sdata: newData });
});

module.exports = router;
