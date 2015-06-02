var _ = require('lodash');
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
var execMode = 'public/execMode.txt';
var adslconfig = __dirname + '/../public/adslconfig.json';
var fem;
if(fs.existsSync(execMode)){
	fem = fs.openSync(execMode , 'r+');
}else{
	fem = fs.openSync(execMode , 'w+');
	fs.writeSync(fem , '1');
}
Object.keys(scConfig).map(function(value, index) {
   	if(!fs.existsSync(scConfig[value])){
   		scf = fs.openSync(scConfig[value] , 'w+');
   		fs.writeSync(scf, '{}', 'utf-8'); 
   	}
});
router.get('/', function(req, res, next) {
	var modes = seoConfig.mode;
	var v;
	console.log(fs.readFileSync(execMode , {encoding:'utf-8'}));
  	res.render('index' , { 
  		mode: seoConfig.mode,
  		currentMode: fs.readFileSync(execMode , {encoding:'utf-8'})
  	});
});
router.post('/', function(req, res, next) {
  	if(!_.isUndefined(req.body.mode)){
  		fs.write(fem , req.body.mode , 0);
  	}
  	res.send(req.body.mode);
});

//adslaccount
router.get('/adslaccount', function(req, res, next) {
	var content = fs.readFileSync(adslconfig , {encoding:'utf-8'});
	var config = JSON.parse( content );
	if(config === null){
		config = {
			name: '',
			id: '',
			password: ''
		}
	}
  	res.render('adslconfig' , { 
  		adsl: config
  	});
});
router.post('/adslaccount', function(req, res, next) {
  	var newConfig = {
		name: req.body.name, 
		id: req.body.id, 
		password: req.body.password
	};
	console.log(req.body);
	console.log(newConfig);
	var f = fs.openSync(adslconfig , 'w+');
	fs.writeSync(f, JSON.stringify(newConfig) , 'utf-8');
  	res.render('adslconfig' , { adsl: newConfig });
});
//adslaccount
router.get("/" + seo.yahoo, function(req, res, next) {
	var data = JSON.parse(fs.readFileSync(scConfig.yahoo, {encoding:'utf-8'}));
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
	var data = JSON.parse(fs.readFileSync(scConfig.google, {encoding:'utf-8'}));
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
	var data = JSON.parse(fs.readFileSync(scConfig.asYahoo, {encoding:'utf-8'}));
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
	var data = JSON.parse(fs.readFileSync(scConfig.asGoogle, {encoding:'utf-8'}));
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
