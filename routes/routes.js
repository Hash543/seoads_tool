var express = require('express');
var router = express.Router();

var fs = require('fs');
var seoConfig = require('../config/seoConfig');
var seo = seoConfig.seo;
var scConfig = seoConfig.scConfig;
var scf;
Object.keys(scConfig).map(function(value, index) {
   	if(!fs.existsSync(scConfig[value])){
   		scf = fs.openSync(scConfig[value] , 'w+');
   		fs.writeSync(scf, '{}', 'utf-8'); 
   	}
});
router.get('/', function(req, res, next) {
  	res.render('index');
});
router.get("/" + seo.yahoo, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.yahoo));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
  	res.render(seo.yahoo,{sdata:data});
});
router.post("/" + seo.yahoo, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.yahoo , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(seo.yahoo, { sdata: newData });
});
router.get("/" + seo.google, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.google));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
  	res.render(seo.google,{sdata:data});
});
router.post("/" + seo.google, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.google , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(seo.google, { sdata: newData });
});
module.exports = router;
