var express = require('express');
var router = express.Router();

var fs = require('fs');
//var asConfig = require('../config/asConfig');
var seoConfig = require('../config/seoConfig');
var seo = seoConfig.seo;
var assassin = seoConfig.as;
var scConfig = seoConfig.scConfig;
var scf;
var commonTemplate = "editConfig" ;
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
  	res.render(commonTemplate , {sdata:data});
});
router.post("/" + seo.yahoo, function (req, res) {
	var newData = {
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.yahoo , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(commonTemplate , { sdata: newData });
});
router.get("/" + seo.google, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.google));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
  	res.render(commonTemplate , {sdata:data});
});
router.post("/" + seo.google, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.google , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(commonTemplate , { sdata: newData });
});
router.get("/" + assassin.yahoo, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.asYahoo));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
  	res.render(commonTemplate , {sdata:data});
});
router.post("/" + assassin.yahoo, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.asYahoo , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(commonTemplate , { sdata: newData });
});
router.get("/" + assassin.google, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.asGoogle));
	if(data === null){
		data = {
			keyword: '',
			url: ''
		}
	}
  	res.render(commonTemplate , {sdata:data});
});
router.post("/" + assassin.google, function (req, res) {
	var newData ={
		keyword: req.body.keyword, 
		url: req.body.url
	};
	var f = fs.openSync(scConfig.asGoogle , 'w+');
	fs.writeSync(f, JSON.stringify(newData) , 'utf-8');
  	res.render(commonTemplate , { sdata: newData });
});
module.exports = router;
